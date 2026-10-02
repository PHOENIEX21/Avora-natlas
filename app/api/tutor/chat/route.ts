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
 const raw=question.toLowerCase();
 const binaryExpr=raw.match(/\b([01]+)(?:\s*(?:x|×|times|multiplied by)\s*([01]+))(?:\s*(?:x|×|times|multiplied by)\s*([01]+))?\s*(?:in\s+binary|binary)\b/i)
   || raw.match(/\b(?:in\s+binary|binary).*?([01]+)\s*(?:x|×|times|multiplied by)\s*([01]+)(?:\s*(?:x|×|times|multiplied by)\s*([01]+))?/i);
 if(binaryExpr){
  const factors=binaryExpr.slice(1).filter(Boolean) as string[];
  const decimal=factors.map(x=>parseInt(x,2)).reduce((a,b)=>a*b,1);
  const result=decimal.toString(2);
  return {reply:`${factors.join(' × ')} = ${result}₂. In binary multiplication, multiply the base-two values and write the result in base two.`,board:[`${factors.join(' × ')} = ${result}₂`],source:{type:'DETERMINISTIC_MATH',concept:'Binary multiplication'}};
 }
 let q=question.toLowerCase().replace(/[–—]/g,'-').replace(/(?<=[a-z])-(?=[a-z])/g,' ').replace(/×/g,'*').replace(/(?<=\d)\s*x\s*(?=\d)/gi,'*').replace(/÷/g,'/');
 const nums:Record<string,string>={zero:'0',one:'1',two:'2',three:'3',four:'4',five:'5',six:'6',seven:'7',eight:'8',nine:'9',ten:'10',eleven:'11',twelve:'12',thirteen:'13',fourteen:'14',fifteen:'15',sixteen:'16',seventeen:'17',eighteen:'18',nineteen:'19',twenty:'20'};
 for(const [w,n] of Object.entries(nums))q=q.replace(new RegExp('\\b'+w+'\\b','g'),n);
 q=q.replace(/\b(plus|add|added to)\b/g,'+').replace(/\b(minus|subtract|take away)\b/g,'-').replace(/\b(times|multiplied by|multiply by)\b/g,'*').replace(/\b(divided by|divide by|divide|divided|diffide|define)(?:\s+by)?\b/g,'/').replace(/\bover\b/g,'/');
 const eq=q.match(/\b([a-z])\s*([+\-])\s*(-?\d+(?:\.\d+)?)\s*(?:=|equals?)\s*(-?\d+(?:\.\d+)?)/i);
 if(eq){
  const variable=eq[1],n=Number(eq[3]),rhs=Number(eq[4]),op=eq[2];
  const value=op==='+'?rhs-n:rhs+n;
  return {reply:`${variable} ${op} ${n} = ${rhs}. Undo ${op==='+'?'adding':'subtracting'} ${n} by ${op==='+'?'subtracting':'adding'} ${n} on both sides. Therefore ${variable} = ${value}. Check: ${value} ${op} ${n} = ${rhs}.`,board:[`${variable} ${op} ${n} = ${rhs}`,`${variable} = ${value}`,`Check ✓`],source:{type:'DETERMINISTIC_MATH'}};
 }
 const nonArithmeticWords=q.replace(/-?\d+(?:\.\d+)?/g,' ').replace(/[+*\/=\\-]/g,' ').split(/\s+/).filter(Boolean).filter(w=>!['what','whats','is','are','calculate','solve','find','please','the','answer','and','then','equals','equal','to','of','by'].includes(w));
 // A tiny calculator must never swallow a larger learning request just because it contains "7 + 2" somewhere inside it.
 if(nonArithmeticWords.length>0)return null;
 const m=q.match(/(-?\d+(?:\.\d+)?)\s*([+*\/\-])\s*(-?\d+(?:\.\d+)?)/);
 if(!m)return null;
 const a=Number(m[1]),b=Number(m[3]),op=m[2];
 if(op==='/'&&b===0)return {reply:'Division by zero is undefined. You cannot divide a number by 0.',board:['Division by 0 → undefined']};
 const value=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;
 if(!Number.isFinite(value))return null;
 const symbol=op==='*'?'×':op==='/'?'÷':op;
 return {reply:`${a} ${symbol} ${b} = ${value}. ${op==='+'?'Add the two numbers together.':op==='-'?'Subtract the second number from the first.':op==='*'?'Multiply the two numbers.':'Divide the first number by the second.'}`,board:[`${a} ${symbol} ${b} = ${value}`],source:{type:'DETERMINISTIC_MATH'}};
}

function curriculumEvidencePack(d:z.infer<typeof schema>,limit=6){
 const normalize=(v:string)=>v.toLowerCase().replace(/[^a-z0-9°]+/g,' ').replace(/\s+/g,' ').trim();
 const aliases:Record<string,string>={questions:'equation',equations:'equation',fractions:'fraction',nouns:'noun',verbs:'verb',adjectives:'adjective',pronouns:'pronoun',angles:'angle',triangles:'triangle',essays:'essay'};
 const stop=new Set(['what','whats','which','this','that','about','please','tell','give','example','examples','define','explain','understand','carefully','with','from','into','does','mean','means','show','teach','could','would','should','find','types','type']);
 const stem=(x:string)=>aliases[x]||x.replace(/(ing|ed|es|s)$/,'');
 const qwords=new Set(normalize(d.question).split(/\s+/).filter(x=>x.length>2&&!stop.has(x)).map(stem));
 const rows:any[]=[];
 for(const classLevel of ['JSS1','JSS2','JSS3']){
  for(const subject of ['Mathematics','English Language'] as const){
   for(const item of masterTopics(classLevel,subject)){
    const plan=getCurriculumTutorPlan(classLevel,subject,item.topic); if(!plan)continue;
    for(const unit of plan.units||[]){
     const terms=Array.isArray(unit.terms)?unit.terms:[];
     const structured=(unit.structuredSteps||[]).flatMap((x:any)=>[x?.title,x?.label,x?.spoken,x?.text,...(x?.lines||[])]).filter(Boolean);
     const fields=[item.topic,unit.title,unit.explain,unit.example,unit.check,unit.why,...(unit.prerequisites||[]),...(unit.outcomes||[]),...(unit.commonMistakes||[]),...terms.flatMap((x:any)=>Array.isArray(x)?[x[0],x[1]]:[]),...((unit.sourceSteps||[]) as string[]),...structured].filter(Boolean);
     const words=fields.flatMap((v:any)=>normalize(String(v)).split(/\s+/)).filter(x=>x.length>2).map(stem);
     const overlap=[...new Set(words.filter((x:string)=>qwords.has(x)))];
     const exact=normalize(item.topic).length>2&&normalize(d.question).includes(normalize(item.topic))||normalize(unit.title||'').length>2&&normalize(d.question).includes(normalize(unit.title||''));
     const score=overlap.length*6+(exact?30:0)+(classLevel===d.classLevel?2:0)+(subject===d.subject?2:0);
     if(score>0)rows.push({score,classLevel,subject,topic:item.topic,unit:unit.title,explain:unit.explain,example:unit.example,terms:terms.slice(0,8),structured:structured.slice(0,10),outcomes:(unit.outcomes||[]).slice(0,6),commonMistakes:(unit.commonMistakes||[]).slice(0,5)});
    }
   }
  }
 }
 return rows.sort((a,b)=>b.score-a.score).slice(0,limit);
}

function localCurriculumAnswer(d:z.infer<typeof schema>){
 const normalize=(v:string)=>v.toLowerCase().replace(/[^a-z0-9°]+/g,' ').replace(/\s+/g,' ').trim();
 const aliases:Record<string,string>={questions:'equation',equations:'equation',fractions:'fraction'};
 const stop=new Set(['what','whats','which','this','that','about','please','tell','give','example','examples','define','explain','understand','carefully','with','from','into','does','mean','means','show','teach','could','would','should']);
 const stem=(x:string)=>aliases[x]||x.replace(/(ing|ed|es|s)$/,'');
 const tokens=(v:string)=>normalize(v).split(/\s+/).filter(x=>x.length>2&&!stop.has(x)).map(stem);
 const qwords=new Set(tokens(d.question));
 const lowerQuestion=d.question.toLowerCase();
 const mathTerms=['place value','digit','number','tens','hundreds','thousands','fraction','decimal','integer','algebra','equation','geometry','angle','shape','factor','multiple','hcf','lcm','binary','base two','addition','subtraction','multiplication','division','percentage','ratio','interest','simple interest','compound interest','construction','triangle','quadrilateral','parallelogram','statistics','probability','bearing','perimeter','area','volume','square root','indices'];
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
    ...((unit.sourceSteps||[]) as string[]),...((unit.structuredSteps||[]) as any[]).flatMap((x:any)=>[x?.title,x?.label,x?.spoken,x?.text,...(x?.lines||[])])
   ].filter(Boolean).join(' ');
   const words=tokens(searchable);
   const overlap=[...new Set(words.filter((x:string)=>qwords.has(x)))];
   const topicWords=tokens(topic+' '+unit.title);
   const topicOverlap=[...new Set(topicWords.filter((x:string)=>qwords.has(x)))];
   const matchedTerm=terms.find((p:any)=>Array.isArray(p)&&typeof p[0]==='string'&&tokens(p[0]).some((x:string)=>qwords.has(x)));
   const exactTopic=normalize(topic).length>2&&normalize(d.question).includes(normalize(topic));
   const exactUnit=normalize(unit.title||'').length>2&&normalize(d.question).includes(normalize(unit.title||''));
   const score=overlap.length*4+topicOverlap.length*8+(matchedTerm?12:0)+(exactTopic?30:0)+(exactUnit?24:0)+(current&&overlap.length?2:0);
   if(score>0)candidates.push({score,unit,subject,topic,classLevel,matchedTerm,overlap,topicOverlap,exactTopic,exactUnit});
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
 const hit=ranked[0];
 if(!hit)return null;
 // Never let a few generic overlapping words hijack a learner's question.
 // Cross-topic retrieval must have a strong topic/unit/term signal; otherwise
 // defer to the general learning/AI layer or return a truthful unavailable answer.
 const strongTopic=Boolean(hit.exactTopic||hit.exactUnit||hit.matchedTerm||(hit.topicOverlap?.length>=2));
 // Generic word overlap is not enough to select a curriculum unit.
 if(!strongTopic)return null;
 const u=hit.unit,term=hit.matchedTerm;
 const definition=term?String(term[1]||'').trim():'';
 const explain=String(u.explain||'').trim(),example=String(u.example||'').trim();
 const concise=(value:string,max=900)=>{const clean=value.replace(/\s+/g,' ').trim();if(clean.length<=max)return clean;const cut=clean.slice(0,max);const stop=Math.max(cut.lastIndexOf('. '),cut.lastIndexOf('; '));return (stop>300?cut.slice(0,stop+1):cut).trim()};
 const titleLike=(value:string)=>{const v=value.trim();return v.length<180&&!/[.!?]/.test(v)&&/^(?:\d+(?:\.\d+)*\s+)?[A-Z]/.test(v)};
 const usefulExplain=explain&&!titleLike(explain)&&normalize(explain)!==normalize(u.title||'')?explain:'';
 const usefulExample=example&&!titleLike(example)&&normalize(example)!==normalize(u.title||'')?example:'';
 const reply=[definition?(String(term[0])+' means '+concise(definition,420)+'.'):'',usefulExplain?concise(usefulExplain,900):'',usefulExample?('Example: '+concise(usefulExample,520)):''].filter(Boolean).join(' ');
 if(!reply)return null;
 return {reply,board:[term?(String(term[0])+' → '+definition):u.title,example].filter(Boolean).slice(0,3),source:{type:'AVORA_CURRICULUM',classLevel:hit.classLevel,subject:hit.subject,topic:hit.topic,unit:u.title}};
}
function focusedLearningAnswer(d:z.infer<typeof schema>){
 const q=d.question.toLowerCase();
 const normalized=q.replace(/[’]/g,"'").replace(/[^a-z0-9°' .-]+/g,' ').replace(/\s+/g,' ').trim();
 const short=normalized.replace(/[?.!]/g,'').trim();
 // Voice can corrupt several academic terms in one utterance. Stop before curriculum retrieval
 // when the transcript strongly resembles a parts-of-speech question but the key terms are ambiguous.
 const possibleAdjective=/\\b(?:agenda|adjective)\\b/.test(normalized);
 const possibleNoun=/\\b(?:no|known|noun)\\b/.test(normalized);
 if(possibleAdjective&&possibleNoun&&/\\bwhat(?:'s| is)\\b/.test(normalized)&&(!/\\badjective\\b/.test(normalized)||!/\\bnoun\\b/.test(normalized)))return {reply:'I heard “'+d.question+'”. This sounds like it may be a parts-of-speech question, possibly “What is an adjective, and what is a noun?”, but N-ATLAS did not capture both key terms clearly. Please confirm or correct the transcript before I teach them. I will not silently change your words.',board:['Possible voice ambiguity','agenda → adjective?','no/known → noun?'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'ASR clarification'},answerUnavailable:true,failureCode:'AMBIGUOUS_TRANSCRIPT'};
 if(/^(?:what(?:'s| is) )?(?:a )?(?:no|known)$/.test(short)||/^(?:a )?(?:no|known) is what$/.test(short))return {reply:'I heard “'+d.question+'”. If you meant “noun”, say “noun” again or correct the transcript. A noun is a naming word, but I do not want to silently change what N-ATLAS heard.',board:['Possible voice ambiguity: no/known → noun?'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'ASR clarification'}};
 if(/^types of (?:known|no)$/.test(short))return {reply:'I heard “'+d.question+'”. Did you mean “types of noun”? If yes, I can explain common nouns, proper nouns, collective nouns, abstract nouns and other noun classes. Please confirm rather than having me silently change the transcript.',board:['Did you mean: types of noun?'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'ASR clarification'}};
 if(/augmentative (?:exercise|essay)/.test(normalized))return {reply:'I heard “'+d.question+'”. If you meant “argumentative essay” or “argumentative writing exercise”, I can teach that. An argumentative essay takes a clear position on an issue and supports it with reasons, evidence and examples, while considering an opposing view. Its basic structure is: introduction and position, organised argument paragraphs, counterargument/rebuttal where appropriate, then conclusion. If “augmentative” was intentional, correct the transcript so I do not silently replace your word.',board:['Argumentative writing?','Position → evidence → counterargument → conclusion'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Argumentative essay'}};
 if(/\b(?:program|programme)\b/.test(normalized)&&/^(?:what(?:'s| is) )?(?:a )?(?:program|programme)[?. ]*$/.test(normalized))return {reply:'The word “program” has more than one meaning. In computing, a program is a set of instructions written for a computer to perform a task. In ordinary English, a programme can also mean a planned series of activities or events. If you mean computer programming, I can explain how programs, algorithms and code work.',board:['Computing: program → instructions for a computer','General: programme → planned activities'],source:{type:'GENERAL_LEARNING',concept:'Program'}};
 if(/\\b(?:compound interest|simple interest|compare interest|compare interests)\\b/.test(normalized)){
  return {reply:'Start with the meaning. INTEREST is extra money paid or earned for using money. The PRINCIPAL (P) is the original amount, the RATE (R) is the percentage charged or earned per year, and TIME (T) is how long the money is used. SIMPLE INTEREST is always calculated on the original principal only. Formula: SI = P × R × T ÷ 100. Example: you invest ₦10,000 at 10% per year for 2 years. One year’s interest is 10% of ₦10,000 = ₦1,000. Because simple interest uses the same original ₦10,000 each year, two years gives ₦2,000. Total amount = ₦12,000. COMPOUND INTEREST is different: after each period, interest is added to the money, and the next interest is calculated on the new total. With the same ₦10,000 at 10% for 2 years: Year 1 gives ₦1,000 interest and a ₦11,000 balance. Year 2 gives 10% of ₦11,000 = ₦1,100, so the balance becomes ₦12,100. Compound interest = ₦2,100. Simple interest gave ₦2,000; compound interest gave ₦2,100 because the second year earned interest on earlier interest too. Annual compound formula: A = P(1 + R/100)^n; CI = A − P.',board:['Interest = extra money on principal','SI = PRT/100 → original principal only','Compound: interest is added, then earns interest'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Simple and compound interest'}};
 }
 if(/^(?:what(?:'s| is) )?grandma[?. ]*$/.test(normalized))return {reply:'I heard “grandma”. If you meant “grammar”, please confirm or correct the transcript. Grammar is the system of rules and patterns used to form meaningful sentences, but I will not silently replace the word N-ATLAS heard.',board:['Possible voice ambiguity: grandma → grammar?'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'ASR clarification'}};
 if(/simple dress/.test(normalized)&&/(?:compact|compound) pieces/.test(normalized))return {reply:'I heard “'+d.question+'”. This may be a voice rendering of “simple sentence and compound sentence”, but I do not want to change your words silently. If that is what you meant: a simple sentence has one independent clause, while a compound sentence joins two or more independent clauses. Please confirm and I can teach both fully with examples.',board:['Did you mean: simple sentence + compound sentence?'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'ASR clarification'}};
 if(/\\b(?:types? of essays?|essay types?|all (?:the )?types? of essays?)\\b/.test(normalized)||/competitive essay/.test(normalized)){
  return {reply:'If by “competitive essay” you meant a particular essay type, please confirm the word. The main school essay forms you should know include narrative, descriptive, expository and argumentative writing. Narrative writing tells a connected story or experience; descriptive writing creates a clear picture; expository writing explains or gives information logically; argumentative writing takes a position and supports it with reasons and evidence. Letter writing is usually taught as a related composition form, with formal and informal letters having different audiences, layouts and tones. For any essay, first understand the question, plan your main ideas, write a focused introduction, develop organised paragraphs, use transitions, and finish with a conclusion that fits the purpose.',board:['Narrative → tells a story','Descriptive/Expository → describes or explains','Argumentative → position + reasons + evidence'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Essay types'}};
 }
 if(/\bgrammar\b/.test(normalized)&&/\bintonation\b/.test(normalized))return {reply:'Grammar is the system of rules and patterns used to form meaningful sentences: it covers areas such as parts of speech, tense, agreement, phrases, clauses and sentence structure. Intonation is the rise and fall of the voice in speech. Falling intonation is common in statements and many WH-questions; rising intonation is common in yes/no questions and can also signal uncertainty or continuation. Example: “You finished.” usually falls; “Did you finish?” commonly rises.',board:['Grammar → structure and rules of language','Intonation → rise and fall of the voice','Falling: statements; Rising: many yes/no questions'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Grammar and intonation'}};
 if(/augmentative essay/.test(normalized))return {reply:'I heard “augmentative essay”. If you meant “argumentative essay”, it is an essay in which you take a clear position on an issue and support it with logical reasons, evidence and examples while addressing opposing views. A common structure is introduction with your position, body paragraphs with arguments and evidence, consideration of the opposing side, and a conclusion. If “augmentative” was intentional, tell me.',board:['Argumentative essay?','Position → reasons/evidence → opposing view → conclusion'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Argumentative essay'}};
 if(/\bprono\b/.test(normalized)||/\badjunctive\b/.test(normalized))return {reply:'I heard “'+d.question+'”. If you meant “pronoun and adjective”: a pronoun replaces a noun or noun phrase, for example he, she, it and they. An adjective describes a noun or pronoun, for example tall in “a tall boy”. If those were not the words you meant, correct the transcript and I will use the exact terms.',board:['Pronoun → replaces a noun','Adjective → describes a noun/pronoun'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Pronoun and adjective'}};
 if(/\bgrammar\b/.test(normalized)&&/^(?:what(?:'s| is) )?grammar[?. ]*$/.test(normalized))return {reply:'Grammar is the system of rules and patterns that shows how words change and combine to form meaningful sentences in a language. It includes areas such as parts of speech, sentence structure, tense, agreement and punctuation in written expression.',board:['Grammar → rules and patterns of language','Words → phrases → clauses → sentences'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Grammar'}};
 if(/\bparallelogram\b/.test(normalized))return {reply:'A parallelogram is a quadrilateral with both pairs of opposite sides parallel. Its opposite sides are equal, opposite angles are equal, and adjacent angles add up to 180°. Its diagonals bisect each other.',board:['Opposite sides → parallel and equal','Opposite angles → equal','Adjacent angles → 180°'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Parallelogram'}};
 if(/simultaneous equation/.test(normalized)&&(/explain|example|teach|what/.test(normalized))){
  return {reply:'Simultaneous equations are two or more equations involving the same unknowns that must be true at the same time. We solve them together to find one set of values that satisfies every equation. Example: x + y = 7 and x − y = 1. Add the equations: 2x = 8, so x = 4. Substitute x = 4 into x + y = 7: 4 + y = 7, so y = 3. Check: 4 + 3 = 7 and 4 − 3 = 1. Common methods are elimination, substitution and, where appropriate, graphical solution.',board:['x + y = 7','x − y = 1','Add → 2x=8 → x=4; then y=3'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Simultaneous equations'}};
 }
 if(/\b(?:cosine|cohesion)\b/.test(normalized)&&/\bhypotenuse\b/.test(normalized))return {reply:'The hypotenuse is the longest side of a right-angled triangle and lies opposite the 90° angle. Cosine connects an acute angle to the adjacent side and the hypotenuse: cos θ = adjacent ÷ hypotenuse. So if you know θ and the adjacent side, hypotenuse = adjacent ÷ cos θ. If you know the other two side lengths instead, use Pythagoras: h² = a² + b².',board:['cos θ = adjacent / hypotenuse','hypotenuse = adjacent / cos θ','Pythagoras: h² = a² + b²'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Cosine and hypotenuse'}};
 const looseRight=normalized.match(/angle.*?(\d+(?:\.\d+)?) ?(?:degrees?|°).*?(?:other|right angle)|(?:right angle).*?(\d+(?:\.\d+)?) ?(?:degrees?|°)/i);
 if(looseRight){const known=Number(looseRight[1]||looseRight[2]);if(known>0&&known<90){const other=90-known;return {reply:`If you mean a right-angled triangle with one acute angle of ${known}°, the other acute angle is ${other}°. A right angle itself is always 90°. The calculation is 180° − 90° − ${known}° = ${other}°.`,board:['Right angle = 90°',`180° − 90° − ${known}° = ${other}°`],source:{type:'DETERMINISTIC_MATH',concept:'Right-triangle angle sum'}};}}
 const quadText=normalized.replace(/\bx[- ]?square(?:d)?\b|\bx squared\b|\bx2\b/g,'x²').replace(/\bplus\b/g,'+').replace(/\bminus\b/g,'-').replace(/\b(?:is )?equal to\b/g,'=');
 const qm=quadText.match(/x²\s*([+-])\s*(\d+(?:\.\d+)?)\s*x\s*([+-])\s*(\d+(?:\.\d+)?)\s*=\s*0/);
 if(qm){
  const b=(qm[1]==='-'?-1:1)*Number(qm[2]),cc=(qm[3]==='-'?-1:1)*Number(qm[4]),disc=b*b-4*cc;
  if(disc<0)return {reply:`For x² ${b>=0?'+':'−'} ${Math.abs(b)}x ${cc>=0?'+':'−'} ${Math.abs(cc)} = 0, the discriminant is b² − 4ac = ${disc}, which is negative. So it has no real-number roots. Over complex numbers, x = ${(-b/2).toFixed(3)} ± ${(Math.sqrt(-disc)/2).toFixed(3)}i.`,board:[`D = ${disc} < 0`,'No real roots'],source:{type:'DETERMINISTIC_MATH',concept:'Quadratic equation'}};
  const r1=(-b+Math.sqrt(disc))/2,r2=(-b-Math.sqrt(disc))/2;
  return {reply:`Solve x² ${b>=0?'+':'−'} ${Math.abs(b)}x ${cc>=0?'+':'−'} ${Math.abs(cc)} = 0 using the quadratic formula x = (−b ± √(b²−4ac)) / 2a. Here a=1, b=${b}, c=${cc}. The discriminant is ${disc}. Therefore x = ${Number(r1.toFixed(6))} or x = ${Number(r2.toFixed(6))}.`,board:[`a=1, b=${b}, c=${cc}`,`D = ${disc}`,`x = ${Number(r1.toFixed(6))} or ${Number(r2.toFixed(6))}`],source:{type:'DETERMINISTIC_MATH',concept:'Quadratic equation'}};
 }
 if(/\b(?:[a-z])[- ]?square(?:d)?\b/.test(normalized)&&/(?:equal|=)/.test(normalized)&&!/^x[- ]?square/.test(normalized))return {reply:'I heard a squared-variable equation, but the variable terms are inconsistent in the transcript: “'+d.question+'”. Please correct or repeat the equation exactly before I solve it, because changing a variable would change the mathematics.',board:['Squared equation heard — confirm exact variables'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Equation clarification'}};

 if(/^(?:what(?:'s| is)|define|explain) (?:an? )?angle[?. ]*$/.test(normalized))return {reply:'An angle is the amount of turn between two rays or lines that meet at a point called the vertex. Angles are measured in degrees (°). A right angle measures 90°.',board:['Angle → amount of turn','Meeting point → vertex','Right angle = 90°'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Angle'}};
 if(/^(?:what(?:'s| is)|define|explain) (?:a )?right[- ]angle(?:d)? triangle[?. ]*$/.test(normalized))return {reply:'A right-angled triangle is a triangle with one angle equal to 90°. The side opposite the 90° angle is the hypotenuse, and it is the longest side.',board:['One angle = 90°','Opposite 90° → hypotenuse'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Right-angled triangle'}};
 const rightOne=normalized.match(/(?:right[- ]angle(?:d)? triangle|right angle).*?(\d+(?:\.\d+)?) ?(?:degrees?|°)/i);
 if(rightOne&&/other angle|remaining angle/.test(normalized)){const known=Number(rightOne[1]);if(known>0&&known<90){const other=90-known;return {reply:`A right-angled triangle already has one 90° angle. Since all three angles total 180°, the other two angles total 90°. So the missing angle is 90° − ${known}° = ${other}°.`,board:['Triangle total = 180°',`90° − ${known}° = ${other}°`],source:{type:'DETERMINISTIC_MATH',concept:'Right-triangle angle sum'}};}}
 if(/\bhypotenuse\b/.test(normalized)&&/\b(find|calculate|work out|what is|what's)\b/.test(normalized))return {reply:'The hypotenuse is the side opposite the 90° angle in a right-angled triangle. If you know the other two side lengths, use Pythagoras: h² = a² + b². If you know one acute angle and one side, tell me which side and its length so I can choose sine or cosine. An angle alone is not enough to calculate the hypotenuse length.',board:['Hypotenuse → opposite 90°','Two sides → h² = a² + b²','Angle + side → use trig'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Hypotenuse'}};

 const numberWords=q.match(/\b(\d{1,3}(?:,\d{3})+)\b.*\b(?:in words|to words|write.*words|read.*number)\b/i);
 if(numberWords){
  const n=Number(numberWords[1].replace(/,/g,''));
  const small=(v:number):string=>{const one=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];if(v<20)return one[v];if(v<100)return tens[Math.floor(v/10)]+(v%10?'-'+one[v%10]:'');if(v<1000)return one[Math.floor(v/100)]+' hundred'+(v%100?' and '+small(v%100):'');return ''};
  const parts:string[]=[];let rest=n;for(const [value,name] of [[1_000_000_000,'billion'],[1_000_000,'million'],[1000,'thousand']] as const){if(rest>=value){const chunk=Math.floor(rest/value);parts.push(small(chunk)+' '+name);rest%=value;}}if(rest)parts.push(small(rest));const words=parts.join(', ');
  return {reply:`${numberWords[1]} is written in words as: ${words}.`,board:[numberWords[1],words],source:{type:'DETERMINISTIC_MATH',concept:'Reading whole numbers'}};
 }
 const triangle=q.match(/triangle.*?(\d+(?:\.\d+)?)\s*(?:degrees?|°).*?(\d+(?:\.\d+)?)\s*(?:degrees?|°)/i);
 if(triangle){
  const a=Number(triangle[1]),b=Number(triangle[2]),third=180-a-b;
  return {reply:`The interior angles of every triangle add up to 180°. The two known angles are ${a}° and ${b}°. First add them: ${a}° + ${b}° = ${a+b}°. Then subtract that total from 180°: 180° − ${a+b}° = ${third}°. Therefore the third angle is ${third}°. Check: ${a}° + ${b}° + ${third}° = 180°.`,board:['Triangle angles = 180°',`${a}° + ${b}° = ${a+b}°`,`180° − ${a+b}° = ${third}° ✓`],source:{type:'DETERMINISTIC_MATH',concept:'Triangle angle sum'}};
 }
 const money=q.match(/(?:have|had|got|with)\s*(?:₦|\$|ngn|naira)?\s*(\d+(?:\.\d+)?).*?(?:spent|spend|used|paid)\s*(?:₦|\$|ngn|naira)?\s*(\d+(?:\.\d+)?)/i);
 if(money){
  const start=Number(money[1]),spent=Number(money[2]),left=start-spent;
  return {reply:`You started with ${start} and spent ${spent}. To find how much is left, subtract the amount spent from the starting amount: ${start} − ${spent} = ${left}. So you have ${left} left.`,board:[`Start: ${start}`,`Spent: ${spent}`,`Left: ${start} − ${spent} = ${left}`],source:{type:'DETERMINISTIC_MATH',concept:'Money subtraction'}};
 }
 const linear=q.match(/\b(\d*)\s*x\s*(plus|minus|\+|-)\s*(\d+(?:\.\d+)?)\s*(?:(?:is\s+)?equal(?:s)?\s+to|equals?|=)\s*(-?\d+(?:\.\d+)?)/i);
 if(linear){
  const a=Number(linear[1]||1),op=linear[2],b=Number(linear[3]),rhs=Number(linear[4]);
  const after=op==='minus'||op==='-'?rhs+b:rhs-b, x=after/a;
  return {reply:`Solve ${a}x ${op==='minus'||op==='-'?'−':'+'} ${b} = ${rhs}. First isolate the term containing x. ${op==='minus'||op==='-'?'Add':'Subtract'} ${b} on both sides, giving ${a}x = ${after}. Now divide both sides by ${a}: x = ${after} ÷ ${a} = ${x}. Check by substituting x = ${x} into the original equation: ${a}×${x} ${op==='minus'||op==='-'?'−':'+'} ${b} = ${rhs}. Therefore x = ${x}.`,board:[`${a}x ${op==='minus'||op==='-'?'−':'+'} ${b} = ${rhs}`,`${a}x = ${after}`,`x = ${x} ✓`],source:{type:'DETERMINISTIC_MATH',concept:'Linear equation'}};
 }
 if(/\b(binary|base two|base 2)\b/.test(q)){
  return {reply:'Binary, or base two, is a number system that uses only the digits 0 and 1. Each position has a place value that is a power of 2: from right to left, 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, and so on. To convert binary to decimal, multiply each binary digit by its place value and add. Example: 10001₂ = 1×2⁴ + 0×2³ + 0×2² + 0×2¹ + 1×2⁰ = 16 + 1 = 17₁₀. To convert decimal to binary, repeatedly divide by 2, record each remainder, and read the remainders from bottom to top. Binary arithmetic also includes addition, subtraction and multiplication. In binary addition: 0+0=0, 0+1=1, 1+0=1, and 1+1=10₂, so write 0 and carry 1. Example: 101₂ + 11₂ = 1000₂. The main skills are reading place values, converting between binary and decimal, and performing binary operations. We can take them one at a time.',board:['Binary uses 0 and 1','Place values: 1, 2, 4, 8, 16, ...','10001₂ = 16 + 1 = 17₁₀'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Binary / Base Two'}};
 }
 if(/simultaneous/.test(q)&&/fraction/.test(q)){
  return {reply:'These are two different Mathematics ideas. Simultaneous equations are two or more equations involving the same unknowns, solved together to find values that satisfy all the equations. For example, x+y=7 and x−y=1. Add them to eliminate y: 2x=8, so x=4; substitute back to get y=3. Fractions represent parts of a whole or quantities written as a/b, where b is not zero. For addition or subtraction with unlike denominators, first find the LCM of the denominators, convert to equivalent fractions with that common denominator, then combine the numerators. Example: 1/3 + 1/4. LCM(3,4)=12, so 1/3=4/12 and 1/4=3/12; therefore 1/3+1/4=7/12. We should study each topic separately for full depth.',board:['Simultaneous: solve equations together','Fractions: use common denominator','1/3 + 1/4 = 7/12'],source:{type:'GENERAL_LEARNING',subject:'Mathematics',concept:'Simultaneous Equations and Fractions'}};
 }
 if(/parts? of speech/.test(q)){
  return {reply:'Parts of speech are categories of words according to the jobs they perform in sentences. The traditional eight are: noun — names a person, place, thing or idea, e.g. teacher, Lagos, honesty; pronoun — replaces a noun, e.g. he, she, they; verb — expresses an action or state, e.g. run, write, is; adjective — describes a noun or pronoun, e.g. tall, beautiful; adverb — modifies a verb, adjective or another adverb, e.g. quickly, very; preposition — shows a relationship such as place, direction or time, e.g. in, on, under, before; conjunction — joins words, phrases or clauses, e.g. and, but, because; interjection — expresses sudden feeling or reaction, e.g. Oh!, Wow! In “The clever boy ran quickly to school,” boy is a noun, clever an adjective, ran a verb, quickly an adverb, and to a preposition.',board:['8 traditional parts of speech','noun • pronoun • verb • adjective','adverb • preposition • conjunction • interjection'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'Parts of Speech'}};
 }
 if(/figure of speech|simile|seemingly|intonation|prepositioning|preposition|vowel sound|forward sound|consonant sound/.test(q)&&((q.match(/\?/g)||[]).length>1||/intonation/.test(q))){
  return {reply:'You asked about several English concepts, so I will separate them. A figure of speech is an expression used in a special or imaginative way for effect; examples include simile, metaphor, personification and hyperbole. A simile compares unlike things using “like” or “as”, for example, “She runs like the wind.” Intonation is the rise and fall of the voice when speaking; it can help show meaning, attitude, emphasis, statements and questions. A preposition is a word that shows the relationship between a noun or pronoun and another part of a sentence, for example in, on, under, beside, before and after. A vowel sound is produced with the airflow relatively unobstructed in the mouth; English vowel sounds include sounds heard in words such as see, sit, bed and cup. A consonant sound is produced with some narrowing or obstruction of the airflow, as in /p/, /b/, /t/, /k/, /m/ and /s/. Your transcript says “seemingly” and “forward sound”; if you meant “simile” and “vowel sound”, those are the concepts explained here. I have kept the transcript unchanged rather than silently correcting what N-ATLAS heard.',board:['Figure of speech → special/imaginative expression','Intonation → rise and fall of voice','Vowel vs consonant → airflow difference'],source:{type:'GENERAL_LEARNING',subject:'English Language',concept:'English Grammar and Oral English'}};
 }
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
  {keys:['grammar'],reply:'Grammar is the system of rules and patterns for forming meaningful words, phrases, clauses and sentences in a language. It includes areas such as parts of speech, tense, agreement and sentence structure.'},
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
  const equationLike=/\b(?:\d*\s*x\s*(?:plus|minus|\+|-)\s*\d+|\d+\s*x\s*[+\-])\b/i.test(d.question)&&/\b(?:equal(?:s)?(?:\s+to)?|=)\b/i.test(d.question);
 const calculation=deterministicMathAnswer(d.question);
  if(calculation)return NextResponse.json({...withGuidanceMeta(d,{reply:calculation.reply,board:calculation.board},'HINT'),mode:'deterministic-math',knowledgeSource:calculation.source});
  const heard=d.question.toLowerCase().trim();
  if(/\b(?:sign|sine)\b.*\b(?:alangi|alange)\b/.test(heard))return NextResponse.json({reply:`I heard: “${d.question}” If you meant “sine of an angle”, say that again or correct the transcript and I will explain it. I will not silently change what N-ATLAS heard.`,board:['Possible voice ambiguity — confirm the term'],mode:'natlas-clarification',answerUnavailable:true,knowledgeSource:{type:'NONE'},failureCode:'AMBIGUOUS_TRANSCRIPT'});
  if(/^(?:what(?:'s| is) )?(?:the )?speech[?.! ]*$/.test(heard))return NextResponse.json({reply:'Do you mean speech work in English, a figure of speech, direct and indirect speech, or a particular speech sound? Tell me which one and I will explain it.',board:['Clarify the kind of speech'],mode:'learning-clarification',answerUnavailable:true,knowledgeSource:{type:'NONE'},failureCode:'AMBIGUOUS_QUESTION'});
  const focused=focusedLearningAnswer(d);
  if(focused)return NextResponse.json({...withGuidanceMeta(d,{reply:focused.reply,board:focused.board},'HINT'),mode:'focused-learning-local',knowledgeSource:focused.source});
  if(isClearlyNonLearning(d.question))return NextResponse.json({...withGuidanceMeta(d,{reply:'AVORA is focused on learning. Ask me a school subject, study, exam, science, mathematics, English, computing or other educational question and I will help.',board:[]},'HINT'),mode:'learning-scope-local'});
  const general=generalLearningAnswer(d.question);
  if(general)return NextResponse.json({...withGuidanceMeta(d,{reply:general.reply,board:general.board},'HINT'),mode:'general-learning-local',knowledgeSource:general.source});
  if(equationLike)return NextResponse.json({reply:'I heard a linear equation, but I could not parse it reliably. Please say it again in a form such as “2x plus 5 equals 40” or edit the transcript before I answer.',board:['Equation heard — clarification needed'],knowledgeSource:{type:'NONE'},answerUnavailable:true,failureCode:'AMBIGUOUS_EQUATION'});
 const local=localCurriculumAnswer(d);
  if(local)return NextResponse.json({...withGuidanceMeta(d,{reply:local.reply,board:local.board},'HINT'),mode:'grounded-curriculum-local',curriculumSource:local.source});
  if(!configuredAiProvider())return NextResponse.json({...withGuidanceMeta(d,{reply:`I heard your question as: “${d.question}” I do not have a reliable answer for that yet. Try asking it in another way, or ask me another learning question.`,board:[]},'HINT'),mode:'reliable-answer-unavailable',answerUnavailable:true,knowledgeSource:{type:'NONE'}});
  const aiClaim=await claimAiRequest(session.userId,'TUTOR_CHAT');
  if(!aiClaim.allowed)return NextResponse.json({...withGuidanceMeta(d,{reply:`I heard your question as: “${d.question}” I do not have a reliable answer for that yet. Try asking it in another way, or ask me another learning question.`,board:[]},'HINT'),mode:'reliable-answer-unavailable',answerUnavailable:true,knowledgeSource:{type:'NONE'},aiLimit:aiClaim.reason});

  const curriculumEvidence=curriculumEvidencePack(d);
  const context={learner:{classLevel:d.classLevel,exam:d.exam},currentLesson:{subject:d.subject,topic:d.topic,unit:unit?{title:unit.title,terms:unit.terms,explain:unit.explain,example:unit.example,check:unit.check,why:unit.why,prerequisites:unit.prerequisites,outcomes:unit.outcomes,commonMistakes:unit.commonMistakes}:null},curriculumEvidence,board:d.board,recent:d.recent,currentStepId:d.currentStepId,lessonSteps:d.lessonSteps};
  const ai=await aiStructured<any>({
    name:'avora_teacher_turn',
    instructions:`You are AVORA, a warm, rigorous Nigerian digital teacher. Teach naturally like a skilled private tutor, not a chatbot and not a textbook reader. The request includes the current lesson plus ranked evidence retrieved from AVORA's authored JSS1-JSS3 Mathematics and English curriculum. Answer the learner's exact educational question first. When curriculumEvidence supports the question, ground the answer in that evidence and preserve its academic meaning; synthesize an actual explanation instead of repeating a heading. The learner may ask from Home, Learn, or inside any lesson: do not force the current lesson, class or subject onto a different educational question. If the question is clearly educational but no retrieved evidence is relevant, you may answer from sound general school knowledge, while never claiming it came from AVORA curriculum. If the N-ATLAS transcript is ambiguous enough to change the academic meaning, explicitly ask the learner to confirm the likely term rather than silently rewriting it. If the question is unrelated to learning, briefly say AVORA is focused on learning and invite an educational question. Use age-appropriate language for the class level. Explain reasoning, not just procedures. If the learner is confused, change approach. Do not falsely claim mastery. Teach with enough depth to satisfy a serious classroom teacher: define terms, connect prerequisites, explain the reason for each step, work at least one concrete example when useful, and then give the learner a meaningful turn. Do not dump long notes, but do not be shallow. If the learner asks about a worked problem, explicitly explain the working rather than merely state the answer. Keep the response focused enough for a live lesson. When the learner says they do not understand, reduce the task to one smaller prerequisite or step and use a different example. Never praise an answer as correct unless the reasoning supports it. If uncertain, ask a checking question. When the learner is confused or makes a mistake, choose reguideStepId ONLY from the supplied lessonSteps. Point to the earliest useful teaching step that repairs the misconception; do not invent an ID. assistanceLevel is HINT for a small prompt, RETEACH when you substantially re-explain or work through the idea, and ANSWER only when a full answer/solution has been revealed. If substantial help is given, requiresFreshEvidence must be true because assisted work cannot prove independent mastery. Return structured JSON only. board should contain at most 3 short lines that genuinely help the live whiteboard.`,
    input:`LESSON CONTEXT\n${JSON.stringify(context)}\n\nLEARNER: ${d.question}`,
    maxOutputTokens:1800,
    schema:{type:'object',additionalProperties:false,properties:{reply:{type:'string'},board:{type:'array',items:{type:'string'},maxItems:3},reguideStepId:{type:['string','null']},assistanceLevel:{type:'string',enum:['HINT','RETEACH','ANSWER']},requiresFreshEvidence:{type:'boolean'},grounding:{type:'string',enum:['AVORA_CURRICULUM','GENERAL_KNOWLEDGE','CLARIFICATION']}},required:['reply','board','reguideStepId','assistanceLevel','requiresFreshEvidence','grounding']}
  });
  if(!ai.ok){await completeAiRequest(aiClaim.eventId,null,'FAILED');console.warn('AVORA AI tutor unavailable',ai.error,ai.status||'',ai.detail||'');return NextResponse.json({...withGuidanceMeta(d,{reply:`I heard your question as: “${d.question}” I do not have a reliable answer for that yet. Try asking it in another way, or ask me another learning question.`,board:[]},'HINT'),mode:'reliable-answer-unavailable',answerUnavailable:true,knowledgeSource:{type:'NONE'}});}
  await completeAiRequest(aiClaim.eventId,ai.usage,'COMPLETED');
  const parsed=ai.json as any;
  return NextResponse.json({...parsed,reguideStepId:safeReguideStep(d,parsed?.reguideStepId),mode:`ai-${ai.usage.provider}`,knowledgeSource:parsed?.grounding==='AVORA_CURRICULUM'?{type:'AVORA_CURRICULUM',provider:ai.usage.provider,model:ai.usage.model}:{type:'EXTERNAL_AI',provider:ai.usage.provider,model:ai.usage.model}});
 }catch(e){console.error('tutor chat',e);return NextResponse.json({error:'AVORA could not answer that just now. Please try again.'},{status:400});}
}