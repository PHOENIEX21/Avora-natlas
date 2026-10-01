import {requirePremiumFeature} from '@/lib/premiumAccess';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {getCurriculumTutorPlan} from '@/lib/curriculumTutor';
import {masterTopics} from '@/lib/masterCurriculum';
import {deepExamples} from '@/lib/deepTeaching';
import {claimAiRequest,completeAiRequest} from '@/lib/aiCostGuard';
import {aiStructured,configuredAiProvider} from '@/lib/aiGateway';

export const dynamic='force-dynamic';

const schema=z.object({
  subject:z.string().min(2).max(80),
  topic:z.string().min(2).max(120),
  classLevel:z.string().min(2).max(40),
  exam:z.string().min(2).max(40),
  unitIndex:z.number().int().min(0).max(50).default(0),
  question:z.string().min(1).max(1200),
  board:z.array(z.string().max(500)).max(20).default([]),
  recent:z.array(z.object({role:z.enum(['student','teacher']),text:z.string().max(1200)})).max(8).default([]),
  currentStepId:z.string().max(120).optional(),
  lessonSteps:z.array(z.object({id:z.string().max(120),label:z.string().max(180),kind:z.string().max(40),summary:z.string().max(500)})).max(120).default([])
});

function safeReguideStep(d:z.infer<typeof schema>,candidate?:string|null){
 const allowed=new Set(d.lessonSteps.map(x=>x.id));
 if(candidate&&allowed.has(candidate))return candidate;
 if(d.currentStepId&&allowed.has(d.currentStepId))return d.currentStepId;
 return d.lessonSteps[0]?.id||null;
}
function withGuidanceMeta(d:z.infer<typeof schema>,value:{reply:string;board:string[]},level:'HINT'|'RETEACH'|'ANSWER'='HINT'){
 return {...value,reguideStepId:safeReguideStep(d),assistanceLevel:level,requiresFreshEvidence:level!=='HINT'};
}

function deterministicMathAnswer(question:string){
 let q=question.toLowerCase().replace(/[–—]/g,'-').replace(/(?<=[a-z])-(?=[a-z])/g,' ').replace(/×/g,'*').replace(/÷/g,'/');
 const nums:Record<string,string>={zero:'0',one:'1',two:'2',three:'3',four:'4',five:'5',six:'6',seven:'7',eight:'8',nine:'9',ten:'10',eleven:'11',twelve:'12',thirteen:'13',fourteen:'14',fifteen:'15',sixteen:'16',seventeen:'17',eighteen:'18',nineteen:'19',twenty:'20'};
 for(const [w,n] of Object.entries(nums))q=q.replace(new RegExp('\\b'+w+'\\b','g'),n);
 q=q.replace(/\b(plus|add|added to)\b/g,'+').replace(/\b(minus|subtract|take away)\b/g,'-').replace(/\b(times|multiplied by|multiply by)\b/g,'*').replace(/\b(divided by|divide by|over)\b/g,'/');
 const eq=q.match(/\b([a-z])\s*([+\-])\s*(-?\d+(?:\.\d+)?)\s*(?:=|equals?)\s*(-?\d+(?:\.\d+)?)/i);
 if(eq){
  const variable=eq[1],n=Number(eq[3]),rhs=Number(eq[4]),op=eq[2];
  const value=op==='+'?rhs-n:rhs+n;
  return {reply:`${variable} ${op} ${n} = ${rhs}. Undo ${op==='+'?'adding':'subtracting'} ${n} by ${op==='+'?'subtracting':'adding'} ${n} on both sides. Therefore ${variable} = ${value}. Check: ${value} ${op} ${n} = ${rhs}.`,board:[`${variable} ${op} ${n} = ${rhs}`,`${variable} = ${value}`,`Check ✓`],source:{type:'DETERMINISTIC_MATH'}};
 }
 const m=q.match(/(-?\d+(?:\.\d+)?)\s*([+\-*\/])\s*(-?\d+(?:\.\d+)?)/);
 if(!m)return null;
 const a=Number(m[1]),b=Number(m[3]),op=m[2];
 if(op==='/'&&b===0)return {reply:'Division by zero is undefined. You cannot divide a number by 0.',board:['Division by 0 → undefined']};
 const value=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;
 if(!Number.isFinite(value))return null;
 const symbol=op==='*'?'×':op==='/'?'÷':op;
 return {reply:`${a} ${symbol} ${b} = ${value}. ${op==='+'?'Add the two numbers together.':op==='-'?'Subtract the second number from the first.':op==='*'?'Multiply the two numbers.':'Divide the first number by the second.'}`,board:[`${a} ${symbol} ${b} = ${value}`],source:{type:'DETERMINISTIC_MATH'}};
}

function localCurriculumAnswer(d:z.infer<typeof schema>){
 const normalize=(v:string)=>v.toLowerCase().replace(/[^a-z0-9°]+/g,' ').replace(/\s+/g,' ').trim();
 const aliases:Record<string,string>={questions:'equation',equations:'equation',fractions:'fraction'};
 const stop=new Set(['what','whats','which','this','that','about','please','tell','give','example','examples','define','explain','understand','carefully','with','from','into','does','mean','means','show','teach','could','would','should']);
 const stem=(x:string)=>aliases[x]||x.replace(/(ing|ed|es|s)$/,'');
 const tokens=(v:string)=>normalize(v).split(/\s+/).filter(x=>x.length>2&&!stop.has(x)).map(stem);
 const qwords=new Set(tokens(d.question));
 const lowerQuestion=d.question.toLowerCase();
 const mathTerms=['place value','digit','number','tens','hundreds','thousands','fraction','decimal','integer','algebra','equation','geometry','angle','shape','factor','multiple','hcf','lcm','binary','base two','addition','subtraction','multiplication','division','percentage','ratio'];
 const englishTerms=['noun','verb','adjective','adverb','pronoun','grammar','vowel','consonant','oral english','speech','pronunciation','comprehension','essay','letter writing','phoneme','sound contrast'];
 const hintedSubject=mathTerms.some(term=>lowerQuestion.includes(term))?'Mathematics':englishTerms.some(term=>lowerQuestion.includes(term))?'English Language':null;
 const candidates:any[]=[];
 const add=(plan:any,subject:string,topic:string,classLevel:string,current:boolean)=>{
  if(!plan)return;
  for(const unit of plan.units||[]){
   const terms=Array.isArray(unit.terms)?unit.terms:[];
   const searchable=[
    topic,unit.title,unit.explain,unit.example,unit.check,unit.why,
    ...(unit.prerequisites||[]),...(unit.outcomes||[]),...(unit.commonMistakes||[]),
    ...terms.flatMap((x:any)=>Array.isArray(x)?[x[0],x[1]]:[]),
    ...((unit.sourceSteps||[]) as string[])
   ].filter(Boolean).join(' ');
   const words=tokens(searchable);
   const overlap=[...new Set(words.filter((x:string)=>qwords.has(x)))];
   const topicWords=tokens(topic+' '+unit.title);
   const topicOverlap=[...new Set(topicWords.filter((x:string)=>qwords.has(x)))];
   const matchedTerm=terms.find((p:any)=>Array.isArray(p)&&typeof p[0]==='string'&&tokens(p[0]).some((x:string)=>qwords.has(x)));
   const exactTopic=normalize(topic).length>2&&normalize(d.question).includes(normalize(topic));
   const exactUnit=normalize(unit.title||'').length>2&&normalize(d.question).includes(normalize(unit.title||''));
   const score=overlap.length*4+topicOverlap.length*8+(matchedTerm?12:0)+(exactTopic?30:0)+(exactUnit?24:0)+(current&&overlap.length?2:0);
   if(score>0)candidates.push({score,unit,subject,topic,classLevel,matchedTerm,overlap});
  }
 };
 add(getCurriculumTutorPlan(d.classLevel,d.subject,d.topic),d.subject,d.topic,d.classLevel,true);
 for(const classLevel of Array.from(new Set([d.classLevel,'JSS1','JSS2','JSS3']))){
  for(const subject of ['Mathematics','English Language'] as const){
   for(const item of masterTopics(classLevel,subject)){
    const topic=item.topic;
    if(classLevel===d.classLevel&&subject===d.subject&&topic===d.topic)continue;
    add(getCurriculumTutorPlan(classLevel,subject,topic),subject,topic,classLevel,false);
   }
  }
 }
 candidates.sort((a,b)=>b.score-a.score);
 const ranked=hintedSubject?candidates.filter(x=>x.subject===hintedSubject):candidates;
 const hit=ranked[0]; if(!hit||hit.score<12)return null;
 const u=hit.unit,term=hit.matchedTerm;
 const definition=term?String(term[1]||'').trim():'';
 const explain=String(u.explain||'').trim(),example=String(u.example||'').trim();
 const concise=(value:string,max=900)=>{const clean=value.replace(/\s+/g,' ').trim();if(clean.length<=max)return clean;const cut=clean.slice(0,max);const stop=Math.max(cut.lastIndexOf('. '),cut.lastIndexOf('; '));return (stop>300?cut.slice(0,stop+1):cut).trim()};
 const reply=[definition?(String(term[0])+' means '+concise(definition,420)+'.'):'',concise(explain,900),example?('Example: '+concise(example,520)):''].filter(Boolean).join(' ');
 if(!reply)return null;
 return {reply,board:[term?(String(term[0])+' → '+definition):u.title,example].filter(Boolean).slice(0,3),source:{type:'AVORA_CURRICULUM',classLevel:hit.classLevel,subject:hit.subject,topic:hit.topic,unit:u.title}};
}
function focusedLearningAnswer(d:z.infer<typeof schema>){
 const q=d.question.toLowerCase();
 if(/\bplace\s+value\b/.test(q)){
  return {reply:'Place value tells us the value of a digit because of the position it occupies in a number. Starting from the right, the places are ones, tens, hundreds, thousands, ten-thousands, hundred-thousands, millions, and so on. For example, in 3,472: 2 is in the ones place, so its value is 2; 7 is in the tens place, so its value is 70; 4 is in the hundreds place, so its value is 400; and 3 is in the thousands place, so its value is 3,000. Therefore 3,472 = 3,000 + 400 + 70 + 2. Notice the difference between a digit and its place value: the digit is 4, but in 3,472 its place value is 400. To find any digit’s place value, identify its position, then multiply the digit by the value of that position. Example: in 58,216, the digit 8 is in the thousands place, so its place value is 8,000. Your turn: in 6,351, what is the place value of 3?',board:['3,472 → 3 thousands | 4 hundreds | 7 tens | 2 ones','3,472 = 3,000 + 400 + 70 + 2','Your turn: value of 3 in 6,351?'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Place Value'}};
 }
 if(/simultaneous/.test(q)&&/elimination/.test(q)){
  return {reply:'Elimination solves two equations together by removing one unknown. Example: x + y = 7 and x - y = 1. Add the equations: (x + y) + (x - y) = 7 + 1, so 2x = 8 and x = 4. Substitute x = 4 into x + y = 7: 4 + y = 7, so y = 3. Check in both original equations: 4 + 3 = 7 and 4 - 3 = 1. Therefore x = 4 and y = 3. If the coefficients do not already cancel, first multiply one or both equations so one variable has equal and opposite coefficients, then add the equations.',board:['x + y = 7','x - y = 1','Add → 2x = 8 → x = 4; then y = 3'],source:{type:'GENERAL_LEARNING'}};
 }
 const lastTeacher=[...d.recent].reverse().find(x=>x.role==='teacher')?.text.toLowerCase()||'';
 if(/\b(steps?|how)\b/.test(q)&&/binary|base two|powers of two/.test(lastTeacher)){
  return {reply:'For decimal to binary: 1) Divide the decimal number by 2. 2) Write down the remainder, 0 or 1. 3) Divide the new quotient by 2 again. 4) Continue until the quotient becomes 0. 5) Read the remainders from bottom to top. Example: 10 ÷ 2 = 5 r0; 5 ÷ 2 = 2 r1; 2 ÷ 2 = 1 r0; 1 ÷ 2 = 0 r1. Bottom to top gives 1010₂. For binary to decimal, multiply each digit by its power of 2 and add the results.',board:['Decimal → divide repeatedly by 2','Record remainders','Read bottom → top'],source:{type:'AVORA_CONTEXT'}};
 }
 return null;
}
function generalLearningAnswer(question:string){
 const q=question.toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
 const entries=[
  {keys:['noun'],reply:'A noun is a naming word. It names a person, animal, place, thing or idea. Examples are teacher, goat, Lagos, book and honesty.'},
  {keys:['verb'],reply:'A verb is a word that expresses an action, occurrence or state. Examples are run, write, become and is.'},
  {keys:['adverb'],reply:'An adverb gives more information about a verb, an adjective or another adverb. It can tell how, when, where or to what extent. In “Ada runs quickly,” quickly is the adverb.'},
  {keys:['adjective'],reply:'An adjective describes or gives more information about a noun or pronoun. In “a tall building,” tall is the adjective.'},
  {keys:['pronoun'],reply:'A pronoun is a word used in place of a noun or noun phrase. Examples include I, you, he, she, it, we and they.'},
  {keys:['norm'],reply:'A norm is an accepted standard or expected way of behaving in a group or society. For example, greeting people politely can be a social norm. In mathematics, “norm” can have a different technical meaning, so tell me the subject if that is what you mean.'},
  {keys:['simile'],reply:'A simile compares two unlike things using words such as “like” or “as”. Example: “Her smile is like sunshine.”'},
  {keys:['simile and metaphor','simile metaphor'],reply:'A simile and a metaphor both make comparisons. A simile uses words such as “like” or “as”: “Her smile is like sunshine.” A metaphor states the comparison directly: “Time is a thief.” The quick test is: if the comparison uses “like” or “as”, it is usually a simile; if it says one thing is another, it is a metaphor.'},
  {keys:['metaphor'],reply:'A metaphor compares by saying one thing is another, without using “like” or “as”. Example: “Time is a thief.” Compare it with a simile, which normally uses “like” or “as”.'},
  {keys:['photosynthesis'],reply:'Photosynthesis is the process by which green plants use light energy to make food from carbon dioxide and water. Oxygen is released as a product.'},
  {keys:['gravity'],reply:'Gravity is the force of attraction between masses. Near Earth, it pulls objects toward the ground and gives them weight.'},
  {keys:['computer'],reply:'A computer is an electronic device that accepts data, processes it according to instructions, stores data and produces information as output.'},
  {keys:['operating system'],reply:'An operating system is system software that manages a computer’s hardware and software resources and provides services for applications. Examples include Windows, Linux and Android.'},
  {keys:['mean','average'],reply:'The arithmetic mean is found by adding all the values and dividing the total by the number of values. For example, the mean of 2, 4 and 6 is (2 + 4 + 6) ÷ 3 = 4.'},
  {keys:['quadrilateral','total angle'],reply:'The sum of the interior angles of a quadrilateral is 360°. One way to see this is to draw a diagonal: it divides the quadrilateral into two triangles, and 180° + 180° = 360°.'},
  {keys:['triangle','total angle'],reply:'The sum of the interior angles of a triangle is 180°.'}
 ];
 const padded=' '+q+' ';
 const hit=entries.find(e=>e.keys.some(k=>padded.includes(' '+k+' ')));
 return hit?{reply:hit.reply,board:[],source:{type:'GENERAL_LEARNING'}}:null;
}
function isClearlyNonLearning(question:string){
 const q=question.toLowerCase();
 return /\b(president|celebrity|football score|weather|price of|latest news|girlfriend|boyfriend|joke)\b/.test(q);
}

function fallbackReply(d:z.infer<typeof schema>){
 const plan=getCurriculumTutorPlan(d.classLevel,d.subject,d.topic);
 const unit=plan?.units[d.unitIndex]||plan?.units[0];
 const q=d.question.toLowerCase();
 if(!unit)return {reply:`Tell me the exact part of ${d.topic} you are working on. I will start from the prerequisite, define every new term, demonstrate the idea slowly, then give you one small step to do before we continue.`,board:[]};
 const rich=deepExamples(unit.title);
 const first=rich[0];
 if(/ship.*sheep|sheep.*ship/.test(q))return {reply:`The main difference is the vowel sound. “ship” uses /ɪ/ and “sheep” uses /iː/. Keep the first sound /ʃ/ and the final /p/ unchanged and listen only to the middle. Say: ship /ʃɪp/; sheep /ʃiːp/. Now compare sit /sɪt/ and seat /siːt/. The purpose is not to memorise symbols; it is to hear the contrast. Your turn: say “leave” slowly. Which middle sound do you hear, /ɪ/ or /iː/?`,board:['ship → /ʃɪp/','sheep → /ʃiːp/','Same outer sounds; different vowel.']};
 if(/explain this practice question|what this question is asking|what this question wants|explain this teaching checkpoint/.test(q))return {reply:`This question is checking the ${unit.title} idea you have just been learning. In simple terms, do not try to write everything you know. First identify the exact thing the question asks for. Then use the rule or meaning from this section: ${unit.explain} A good first move is to look for the information given, name the rule that connects it to what is required, and do only that first step. If the wording still feels unclear, tell me which word or phrase is confusing.`,board:['What is the question asking for?',`Use: ${unit.title}`,'Do one justified step first.']};
 if(/show me a clear model answer|model answer/.test(q))return {reply:`Here is the kind of answer I would expect at this point in the lesson. ${first?`${first.problem} ${first.steps.slice(0,3).join(' ')} The important reason is: ${first.why}`:`Use this model: ${unit.example}`} The goal is not to copy the wording. Notice the rule or reason being used, then explain the same idea in your own words when you try again.`,board:[first?.problem||unit.example,...(first?.steps.slice(0,2)||[])]};
 const term=unit.terms.find(([t])=>q.includes(t.toLowerCase()));
 if(term)return {reply:`${term[0]} means ${term[1]}. Before using it, connect it to what you already know: ${(unit.prerequisites||[]).join(', ')||'the previous idea in this lesson'}. ${unit.explain} ${first?`Let us see it in a real example: ${first.problem} ${first.steps.slice(0,3).join(' ')}`:`For example: ${unit.example}`} I do not want you to copy the result. Tell me which rule or meaning justifies the first important step.`,board:[`${term[0]} → ${term[1]}`,first?.problem||unit.example,'Why is the first step valid?']};
 if(/why|reason|how come/.test(q))return {reply:`The reason matters more than the shortcut. ${unit.explain} ${first?`In ${first.problem}, ${first.steps.slice(0,2).join(' ')} The method works because ${first.why}`:`Look at ${unit.example}. Each step must preserve the rule or meaning we started with.`} Now explain the reason back to me in one sentence. If your explanation is incomplete, I will help you repair it.`,board:['Meaning / rule first',first?.why||unit.example,'Explain the reason back.']};
 if(/easier|simpl|confus|understand|again|slow/.test(q))return {reply:`I will slow it down and reduce the size of the task. First, forget the full question for a moment. ${unit.title} is really about this: ${unit.explain} ${first?`Use this example only: ${first.problem} We will do just the first step: ${first.steps[0]}`:`Use this example: ${unit.example}`} Do not move to the next step yet. Tell me what that first step means in your own words, or tell me the exact word or symbol that is unclear.`,board:[unit.title,first?.steps[0]||unit.example,'One step only — explain it.']};
 if(/example|show me|another|different/.test(q)){
  const ex=rich[1]||rich[0];
  return {reply:ex?`Yes. Here is a different example so you can see the same idea in another form. ${ex.problem} Step 1: ${ex.steps[0]} Step 2: ${ex.steps[1]||'check what the first step gives us'}. ${ex.steps[2]?`Step 3: ${ex.steps[2]}`:''} Why this method fits: ${ex.why} Now you do the next small piece: ${ex.check}`:`Yes. We will not just change numbers and pretend it is new teaching. Here is the same idea in a fresh situation: ${unit.example} First identify what is given, what must be found, and which rule connects them. Then try: ${unit.check}`,
   board:ex?[ex.problem,...ex.steps.slice(0,2),`Your turn → ${ex.check}`]:['What is given?',unit.example,`Your turn → ${unit.check}`]};
 }
 if(/wrong|mistake|error/.test(q)&&unit.commonMistakes?.length)return {reply:`A common mistake here is: ${unit.commonMistakes[0]}. The important question is why it fails. It breaks the meaning or rule behind ${unit.title}. Compare the correct method: ${first?first.steps.slice(0,3).join(' '):unit.example} Now tell me where the incorrect method first stops following the rule.`,board:['Common mistake',unit.commonMistakes[0],'Find the first broken step.']};
 return {reply:`Let us answer your exact question inside ${unit.title}. ${unit.explain} ${first?`Use this worked example: ${first.problem} ${first.steps.slice(0,3).join(' ')} The reason is: ${first.why}`:`Use this example: ${unit.example}`} I will not move on until you participate. Your turn: ${first?.check||unit.check}`,board:[unit.title,first?.problem||unit.example,`Your turn → ${first?.check||unit.check}`]};
}

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Please sign in again.'},{status:401});
 const premiumDenied=await requirePremiumFeature(session,'Interactive AVORA Tutor');if(premiumDenied)return premiumDenied;
 try{
  const d=schema.parse(await req.json());
  const plan=getCurriculumTutorPlan(d.classLevel,d.subject,d.topic);
  const unit=plan?.units[d.unitIndex]||plan?.units[0];
  const calculation=deterministicMathAnswer(d.question);
  if(calculation)return NextResponse.json({...withGuidanceMeta(d,{reply:calculation.reply,board:calculation.board},'HINT'),mode:'deterministic-math',knowledgeSource:calculation.source});
  const focused=focusedLearningAnswer(d);
  if(focused)return NextResponse.json({...withGuidanceMeta(d,{reply:focused.reply,board:focused.board},'HINT'),mode:'focused-learning-local',knowledgeSource:focused.source});
  const local=localCurriculumAnswer(d);
  if(local)return NextResponse.json({...withGuidanceMeta(d,{reply:local.reply,board:local.board},'HINT'),mode:'grounded-curriculum-local',curriculumSource:local.source});
  const general=generalLearningAnswer(d.question);
  if(general)return NextResponse.json({...withGuidanceMeta(d,{reply:general.reply,board:general.board},'HINT'),mode:'general-learning-local',knowledgeSource:general.source});
  if(isClearlyNonLearning(d.question))return NextResponse.json({...withGuidanceMeta(d,{reply:'AVORA is focused on learning. Ask me a school subject, study, exam, science, mathematics, English, computing or other educational question and I will help.',board:[]},'HINT'),mode:'learning-scope-local'});
  if(!configuredAiProvider())return NextResponse.json({...withGuidanceMeta(d,{reply:`I heard your question as: “${d.question}” I do not have a reliable answer for that yet. Try asking it in another way, or ask me another learning question.`,board:[]},'HINT'),mode:'reliable-answer-unavailable',answerUnavailable:true,knowledgeSource:{type:'NONE'}});
  const aiClaim=await claimAiRequest(session.userId,'TUTOR_CHAT');
  if(!aiClaim.allowed)return NextResponse.json({...withGuidanceMeta(d,{reply:`I heard your question as: “${d.question}” I do not have a reliable answer for that yet. Try asking it in another way, or ask me another learning question.`,board:[]},'HINT'),mode:'reliable-answer-unavailable',answerUnavailable:true,knowledgeSource:{type:'NONE'},aiLimit:aiClaim.reason});

  const context={learner:{classLevel:d.classLevel,exam:d.exam},lesson:{subject:d.subject,topic:d.topic,unit:unit?{title:unit.title,terms:unit.terms,explain:unit.explain,example:unit.example,check:unit.check,why:unit.why,prerequisites:unit.prerequisites,outcomes:unit.outcomes,commonMistakes:unit.commonMistakes}:null},board:d.board,recent:d.recent,currentStepId:d.currentStepId,lessonSteps:d.lessonSteps};
  const ai=await aiStructured<any>({
    name:'avora_teacher_turn',
    instructions:`You are AVORA, a warm, rigorous Nigerian digital teacher. Teach naturally like a skilled private tutor, not a chatbot and not a textbook reader. Use the supplied lesson context when the learner's question is about the current lesson. Answer the learner's exact question first. If the learner asks a different educational question, answer that question directly and do not force the current lesson into the answer. If the question is unrelated to learning, briefly say AVORA is focused on learning and invite an educational question. Use age-appropriate language for the class level. Explain reasoning, not just procedures. If the learner is confused, change approach. Do not falsely claim mastery. Teach with enough depth to satisfy a serious classroom teacher: define terms, connect prerequisites, explain the reason for each step, work at least one concrete example when useful, and then give the learner a meaningful turn. Do not dump long notes, but do not be shallow. If the learner asks about a worked problem, explicitly explain the working rather than merely state the answer. Keep the response focused enough for a live lesson. When the learner says they do not understand, reduce the task to one smaller prerequisite or step and use a different example. Never praise an answer as correct unless the reasoning supports it. If uncertain, ask a checking question. When the learner is confused or makes a mistake, choose reguideStepId ONLY from the supplied lessonSteps. Point to the earliest useful teaching step that repairs the misconception; do not invent an ID. assistanceLevel is HINT for a small prompt, RETEACH when you substantially re-explain or work through the idea, and ANSWER only when a full answer/solution has been revealed. If substantial help is given, requiresFreshEvidence must be true because assisted work cannot prove independent mastery. Return structured JSON only. board should contain at most 3 short lines that genuinely help the live whiteboard.`,
    input:`LESSON CONTEXT\n${JSON.stringify(context)}\n\nLEARNER: ${d.question}`,
    maxOutputTokens:1800,
    schema:{type:'object',additionalProperties:false,properties:{reply:{type:'string'},board:{type:'array',items:{type:'string'},maxItems:3},reguideStepId:{type:['string','null']},assistanceLevel:{type:'string',enum:['HINT','RETEACH','ANSWER']},requiresFreshEvidence:{type:'boolean'}},required:['reply','board','reguideStepId','assistanceLevel','requiresFreshEvidence']}
  });
  if(!ai.ok){await completeAiRequest(aiClaim.eventId,null,'FAILED');console.warn('AVORA AI tutor unavailable',ai.error,ai.status||'',ai.detail||'');return NextResponse.json({...withGuidanceMeta(d,{reply:`I heard your question as: “${d.question}” I do not have a reliable answer for that yet. Try asking it in another way, or ask me another learning question.`,board:[]},'HINT'),mode:'reliable-answer-unavailable',answerUnavailable:true,knowledgeSource:{type:'NONE'}});}
  await completeAiRequest(aiClaim.eventId,ai.usage,'COMPLETED');
  const parsed=ai.json as any;
  return NextResponse.json({...parsed,reguideStepId:safeReguideStep(d,parsed?.reguideStepId),mode:`ai-${ai.usage.provider}`});
 }catch(e){console.error('tutor chat',e);return NextResponse.json({error:'AVORA could not answer that just now. Please try again.'},{status:400});}
}
