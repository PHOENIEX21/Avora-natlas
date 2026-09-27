import bankJson from '@/data/jss1-jss2-assessment-bank.json';
import {revised2025CurrentTopics} from './revised2025Curriculum';
import {evidenceIdsForOfficialTopic} from './nerdc2025TopicMap';
import {nerdc2025EvidenceForTopic} from './nerdc2025Teaching';
import {officialNerdc2025Topic,officialNerdc2025Topics} from './nerdc2025Official';
import {authoredNerdc2025EnglishQuestions} from './nerdc2025AuthoredEnglishExercises';
import {wholeNumbersAuthoredQuestions} from './wholeNumbersAuthored';

export type NerdcExerciseQuestion={
 id:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';topic:string;
 prompt:string;type:'MULTIPLE_CHOICE';options:string[];correctAnswer:string;explanation:string;hint:string;
 difficulty:number;skill:string;source:'AVORA_REVIEWED_BANK'|'AVORA_AUTHORED_NERDC_BANK'|'NERDC_DEEP_LESSON_CONCEPT_CHECK';
};
export type PublicNerdcExerciseQuestion=Omit<NerdcExerciseQuestion,'correctAnswer'>;

type BankQuestion={id:string;curriculumTopicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';topic:string;prompt:string;questionType:string;options:string[];correctAnswer:string;explanation:string;difficulty:number;qualityStatus:string};
const bank=(bankJson.questions as BankQuestion[]).filter(q=>q.qualityStatus==='REVIEWED'&&q.questionType==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length===4);

function norm(text:string){return String(text||'').replace(/\s+/g,' ').trim().replace(/[.;]+$/,'')}
function cap(text:string){const v=norm(text);return v?`${v[0].toUpperCase()}${v.slice(1)}`:v}
function rotate<T>(items:T[],offset:number){if(!items.length)return items;const n=((offset%items.length)+items.length)%items.length;return [...items.slice(n),...items.slice(0,n)]}
function stableHash(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

function compatibleBankQuestions(classLevel:'JSS1'|'JSS2',subject:'Mathematics'|'English Language',topic:string){
 const evidence=new Set(evidenceIdsForOfficialTopic(classLevel,subject,topic));
 const oldIds=new Set(revised2025CurrentTopics.filter(t=>t.classLevel===classLevel&&t.subject===subject&&t.evidenceLessonIds.some(id=>evidence.has(id))).map(t=>t.id));
 return bank.filter(q=>q.classLevel===classLevel&&q.subject===subject&&oldIds.has(q.curriculumTopicId));
}

function misconceptionOptions(values:string[],seed:number){
 const base=values.map(cap).filter(Boolean);const unique=[...new Set(base)];
 const fallback=[
  'Choose a shortcut from the appearance of the question without checking the governing rule',
  'Use the first familiar operation or language pattern even when the conditions do not match',
  'Accept the result without checking it against the original task or evidence',
 ];
 for(const item of fallback)if(unique.length<3&&!unique.includes(item))unique.push(item);
 return rotate(unique,seed).slice(0,3);
}

function conceptQuestions(classLevel:'JSS1'|'JSS2',subject:'Mathematics'|'English Language',topic:string,count:number):NerdcExerciseQuestion[]{
 const evidence=nerdc2025EvidenceForTopic(classLevel,subject,topic);
 const official=officialNerdc2025Topic(classLevel,subject,topic);
 if(!official||!evidence.length||count<=0)return [];
 const facts=evidence.flatMap(x=>x.teaching).map(norm).filter(x=>x.length>=24);
 const examples=evidence.flatMap(x=>x.workedExamples).map(norm).filter(x=>x.length>=18);
 const misconceptions=evidence.flatMap(x=>x.misconceptions).map(norm).filter(Boolean);
 const objectives=official.objectives.map(norm).filter(Boolean);
 const seeds=[...facts,...objectives.map(x=>`A learner should be able to ${x.replace(/^to\s+/i,'')}`),...examples.map(x=>`This worked example is valid evidence for the topic: ${x}`)];
 const out:NerdcExerciseQuestion[]=[];
 for(let i=0;i<count;i++){
  const correct=cap(seeds[i%seeds.length]||facts[0]||objectives[0]);
  const wrong=misconceptionOptions(misconceptions,i);
  let options=[correct,...wrong];
  const offset=stableHash(`${classLevel}|${subject}|${topic}|${i}`)%4; options=rotate(options,offset);
  const kind=i%3;
  const prompt=kind===0?`Concept check ${i+1}: Which statement most accurately reflects the correct idea or method for ${topic}?`:kind===1?`Reasoning check ${i+1}: A learner is reviewing ${topic}. Which statement should the learner rely on?`:`Misconception check ${i+1}: Which statement is consistent with the NERDC-aligned teaching of ${topic}?`;
  out.push({
   id:`nerdc25-${classLevel.toLowerCase()}-${subject==='Mathematics'?'math':'eng'}-${stableHash(topic).toString(36)}-${String(i+1).padStart(2,'0')}`,
   classLevel,subject,topic,prompt,type:'MULTIPLE_CHOICE',options,correctAnswer:correct,
   explanation:`${correct}. This is part of the verified teaching evidence used for the official NERDC topic “${topic}”.`,
   hint:subject==='Mathematics'?'Check the definition, relationship or rule before choosing; do not select an operation merely because it looks familiar.':'Check the exact language function, evidence or rule the lesson established; avoid choosing by a single familiar word.',
   difficulty:i<3?1:i<7?2:3,skill:topic,source:'NERDC_DEEP_LESSON_CONCEPT_CHECK'
  });
 }
 return out;
}

const factorsAndMultiplesFoundationQuestions:NerdcExerciseQuestion[]=[
 {id:'jss1-math-lcm-foundation-01',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which statement correctly describes a factor of a whole number?',type:'MULTIPLE_CHOICE',options:['It divides the number exactly with no remainder','It must be greater than the number','It is found only by addition','It always leaves a remainder'],correctAnswer:'It divides the number exactly with no remainder',explanation:'A factor divides a number exactly. If a remainder is left, that divisor is not a factor.',hint:'Use the exact-division test.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-02',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which of these is NOT a factor of 24?',type:'MULTIPLE_CHOICE',options:['3','4','5','6'],correctAnswer:'5',explanation:'24 ÷ 5 is not a whole number, so 5 is not a factor of 24.',hint:'Divide 24 by each option and look for a remainder.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-03',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which list contains all the positive factors of 18?',type:'MULTIPLE_CHOICE',options:['1, 2, 3, 6, 9, 18','1, 2, 3, 6, 18','2, 3, 6, 9','1, 3, 6, 9, 18'],correctAnswer:'1, 2, 3, 6, 9, 18',explanation:'The factor pairs of 18 are 1×18, 2×9 and 3×6, giving 1, 2, 3, 6, 9 and 18.',hint:'Build factor pairs from 1 upward.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-04',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'When finding factors in pairs from 1 upward, when can you stop testing new divisors?',type:'MULTIPLE_CHOICE',options:['When the two sides of the factor pairs meet or would cross','Immediately after finding 1','Only after testing the number itself','As soon as one divisor leaves a remainder'],correctAnswer:'When the two sides of the factor pairs meet or would cross',explanation:'After the pair values meet or cross, later exact divisions only repeat factor pairs already found in reverse.',hint:'Think about what happens after the pair 6×6 for 36.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-05',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which list shows the first five positive multiples of 7?',type:'MULTIPLE_CHOICE',options:['7, 14, 21, 28, 35','1, 7, 14, 21, 28','7, 8, 9, 10, 11','7, 21, 35, 49, 63'],correctAnswer:'7, 14, 21, 28, 35',explanation:'Positive multiples of 7 are 7×1, 7×2, 7×3, 7×4, 7×5 and so on.',hint:'Multiply 7 by 1, 2, 3, 4 and 5.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-06',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Because 8 × 5 = 40, which statement is correct?',type:'MULTIPLE_CHOICE',options:['8 is a factor of 40 and 40 is a multiple of 8','40 is a factor of 8 and 8 is a multiple of 40','8 and 40 are both factors of 5','40 is not related to 8 by factors or multiples'],correctAnswer:'8 is a factor of 40 and 40 is a multiple of 8',explanation:'If a×b=c, then a and b are factors of c, while c is a multiple of each factor.',hint:'Ask which number divides the other exactly.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-07',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'What are the common factors of 12 and 18?',type:'MULTIPLE_CHOICE',options:['1, 2, 3, 6','1, 2, 6, 12','2, 3, 6, 9','1, 3, 9, 18'],correctAnswer:'1, 2, 3, 6',explanation:'The factors shared by both 12 and 18 are 1, 2, 3 and 6.',hint:'Write both complete factor lists, then keep only shared values.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-08',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which number is a common multiple of both 4 and 6?',type:'MULTIPLE_CHOICE',options:['12','8','18','20'],correctAnswer:'12',explanation:'12 appears in both multiple lists: 4×3=12 and 6×2=12.',hint:'Check whether each number can be divided exactly by both 4 and 6.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-09',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'A teacher has 30 counters. Which group size will NOT divide all 30 counters into equal groups with none left over?',type:'MULTIPLE_CHOICE',options:['4','2','5','6'],correctAnswer:'4',explanation:'30 ÷ 4 leaves a remainder, while 2, 5 and 6 are factors of 30.',hint:'Use exact division; any remainder means the group size is not a factor.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-10',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Two lights flash every 3 seconds and every 4 seconds. Which sequence shows their first three positive common flash times?',type:'MULTIPLE_CHOICE',options:['12, 24, 36 seconds','3, 4, 7 seconds','6, 12, 18 seconds','4, 8, 12 seconds'],correctAnswer:'12, 24, 36 seconds',explanation:'Common multiples of 3 and 4 begin at 12 and continue 24, 36, and so on. This prepares the idea of LCM.',hint:'List multiples of 3 and 4 and identify values appearing in both lists.',difficulty:3,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'}
];

const countingInBaseTwoQuestions:NerdcExerciseQuestion[]=[
 {id:'jss1-math-base2-01',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which digits are used in the base-two (binary) number system?',type:'MULTIPLE_CHOICE',options:['0 and 1','1 and 2','0, 1 and 2','0 to 9'],correctAnswer:'0 and 1',explanation:'Base two has exactly two digits: 0 and 1.',hint:'The number of available digits matches the base.',difficulty:1,skill:'Meaning and digits of base two',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-02',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which list shows the first binary place values from right to left?',type:'MULTIPLE_CHOICE',options:['1, 2, 4, 8','1, 10, 100, 1000','1, 2, 3, 4','2, 4, 6, 8'],correctAnswer:'1, 2, 4, 8',explanation:'Binary place values are powers of 2: 1, 2, 4, 8, 16 and so on.',hint:'Each place is twice the place immediately to its right.',difficulty:1,skill:'Binary place value',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-03',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What comes immediately after 1₂ when counting in base two?',type:'MULTIPLE_CHOICE',options:['10₂','2₂','11₂','100₂'],correctAnswer:'10₂',explanation:'Binary has no digit 2. Two units regroup as one group of two and zero units, written 10₂.',hint:'Regroup two units into the next binary place.',difficulty:1,skill:'Counting in base two',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-04',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What comes immediately after 11₂ when counting in base two?',type:'MULTIPLE_CHOICE',options:['100₂','12₂','20₂','101₂'],correctAnswer:'100₂',explanation:'Adding one to 11₂ causes regrouping: two units make one two, then two twos make one four, giving 100₂.',hint:'A binary place cannot contain the digit 2.',difficulty:2,skill:'Binary regrouping',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-05',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which of these is NOT a valid binary numeral?',type:'MULTIPLE_CHOICE',options:['102₂','101₂','111₂','1000₂'],correctAnswer:'102₂',explanation:'A binary numeral may contain only the digits 0 and 1, so 102₂ is invalid.',hint:'Inspect every digit.',difficulty:1,skill:'Valid binary numerals',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-06',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What ordinary quantity is represented by 101₂?',type:'MULTIPLE_CHOICE',options:['5','4','6','101'],correctAnswer:'5',explanation:'101₂ has one 4, zero 2s and one unit: 4+1=5.',hint:'Use place values 4, 2, 1.',difficulty:2,skill:'Reading binary place value',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-07',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What ordinary quantity is represented by 110₂?',type:'MULTIPLE_CHOICE',options:['6','5','3','110'],correctAnswer:'6',explanation:'110₂ means one 4, one 2 and zero units: 4+2=6.',hint:'Read the digits against 4, 2, 1.',difficulty:2,skill:'Reading binary place value',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-08',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What is the main job of the 0 in 101₂?',type:'MULTIPLE_CHOICE',options:['It shows that there are no twos and keeps the other digits in their correct places','It changes the number to base ten','It means the numeral has no value','It tells us to multiply by 10'],correctAnswer:'It shows that there are no twos and keeps the other digits in their correct places',explanation:'Zero is a placeholder. In 101₂ it records zero groups of 2 while preserving the 4-place and 1-place.',hint:'Think about the middle place value.',difficulty:2,skill:'Zero as a binary placeholder',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-09',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which sequence counts correctly forward in base two?',type:'MULTIPLE_CHOICE',options:['1₂, 10₂, 11₂, 100₂, 101₂','1₂, 2₂, 3₂, 4₂, 5₂','1₂, 10₂, 20₂, 30₂, 40₂','0₂, 1₂, 10₂, 12₂, 100₂'],correctAnswer:'1₂, 10₂, 11₂, 100₂, 101₂',explanation:'Binary counting uses only 0 and 1 and regroups whenever two collect in one place.',hint:'Reject any sequence containing a digit other than 0 or 1.',difficulty:2,skill:'Counting sequence',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-10',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What comes immediately after 111₂?',type:'MULTIPLE_CHOICE',options:['1000₂','112₂','100₂','1110₂'],correctAnswer:'1000₂',explanation:'111₂ represents 4+2+1=7. Adding one causes regrouping through all three occupied places, producing one 8: 1000₂.',hint:'Add one and regroup every pair.',difficulty:2,skill:'Binary regrouping',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-11',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'A learner says 1000₂ means one thousand. What is the best correction?',type:'MULTIPLE_CHOICE',options:['1000₂ means one 8 and no 4s, 2s or units','The learner is correct because it has four digits','1000₂ means one hundred','1000₂ has no value because it contains zeros'],correctAnswer:'1000₂ means one 8 and no 4s, 2s or units',explanation:'The subscript 2 tells us to use binary place values 8, 4, 2 and 1, so 1000₂ represents 8.',hint:'The appearance of the digits does not determine the base.',difficulty:3,skill:'Reasoning about number bases',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-12',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Thirteen counters are grouped into binary place-value groups. Which description matches 1101₂?',type:'MULTIPLE_CHOICE',options:['One 8, one 4, zero 2s and one unit','One 8, one 4, one 2 and zero units','One 4, one 2 and one unit','Eleven tens and one unit'],correctAnswer:'One 8, one 4, zero 2s and one unit',explanation:'1101₂ uses place values 8,4,2,1: 8+4+0+1=13.',hint:'Match each digit to 8, 4, 2, 1.',difficulty:3,skill:'Grouping in twos',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-13',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Why does moving a binary 1 one place to the left double its place value?',type:'MULTIPLE_CHOICE',options:['Each binary place is twice the value of the place to its right','Binary numbers are always even','A zero automatically adds 10','The digit 1 changes its value to 2'],correctAnswer:'Each binary place is twice the value of the place to its right',explanation:'Binary place values are successive powers of 2, so 1, 2, 4, 8, 16... each doubles the previous place.',hint:'Look at the pattern 1, 2, 4, 8.',difficulty:3,skill:'Binary place-value reasoning',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-14',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which statement best explains why the digit 2 never appears in a binary numeral?',type:'MULTIPLE_CHOICE',options:['Two units in any place are regrouped as one unit in the next place','The number 2 does not exist in mathematics','Binary skips every even number','Only odd quantities can be written in binary'],correctAnswer:'Two units in any place are regrouped as one unit in the next place',explanation:'Base two permits 0 or 1 in a place. When two units accumulate, they are exchanged for one unit of the next place.',hint:'Think about why 1₂ is followed by 10₂.',difficulty:3,skill:'Meaning of base two',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-15',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'A learner writes the count as 101₂, 110₂, 111₂, 1000₂. Is this part of the binary counting sequence correct?',type:'MULTIPLE_CHOICE',options:['Yes, it represents consecutive quantities 5, 6, 7 and 8','No, 110₂ must come before 101₂','No, 111₂ is not a binary numeral','No, 1000₂ must come immediately after 101₂'],correctAnswer:'Yes, it represents consecutive quantities 5, 6, 7 and 8',explanation:'101₂=5, 110₂=6, 111₂=7 and 1000₂=8, so the sequence is correct.',hint:'Use 4,2,1 and then 8,4,2,1 to check the values.',difficulty:3,skill:'Binary counting mastery',source:'AVORA_AUTHORED_NERDC_BANK'}
];

function isJss1CountingBaseTwo(classLevel:string,subject:string,topic:string){
 const t=topic.toLowerCase().trim();
 return classLevel==='JSS1'&&subject==='Mathematics'&&(t==='counting in base two'||t==='counting in base 2');
}

function isJss1Lcm(classLevel:string,subject:string,topic:string){
 const t=topic.toLowerCase();
 return classLevel==='JSS1'&&subject==='Mathematics'&&(t==='lcm'||t.includes('lowest common multiple'));
}

export function nerdc2025ExerciseQuestions(classLevel:string,subject:string,topic:string,count=15):NerdcExerciseQuestion[]{
 if((classLevel!=='JSS1'&&classLevel!=='JSS2')||(subject!=='Mathematics'&&subject!=='English Language'))return [];
 const official=officialNerdc2025Topic(classLevel,subject,topic);if(!official)return [];
 if(classLevel==='JSS1'&&subject==='Mathematics'&&topic.toLowerCase()==='whole numbers')return wholeNumbersAuthoredQuestions.slice(0,count).map((q,i)=>({id:q.id,classLevel:'JSS1' as const,subject:'Mathematics' as const,topic,prompt:q.prompt,type:'MULTIPLE_CHOICE' as const,options:Array.from(q.options),correctAnswer:q.correctAnswer,explanation:q.explanation,hint:'Return to the matching lesson section, identify the place-value or number-line rule, then try again.',difficulty:i<3?1:i<7?2:3,skill:'Whole Numbers',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(isJss1CountingBaseTwo(classLevel,subject,topic))return countingInBaseTwoQuestions.slice(0,count).map(q=>({...q,topic}));
 const authored=classLevel==='JSS2'&&subject==='English Language'?authoredNerdc2025EnglishQuestions(topic):[];
 if(authored.length){
  return authored.slice(0,count).map(q=>({
   ...q,type:'MULTIPLE_CHOICE' as const,
   hint:'Use the exact rule, purpose or evidence established in the NERDC-aligned lesson; eliminate options that contradict the taught meaning or context.',
   source:'AVORA_AUTHORED_NERDC_BANK' as const,
  }));
 }
 const baseCount=isJss1Lcm(classLevel,subject,topic)&&count>15?15:count;
 const existing=compatibleBankQuestions(classLevel,subject,topic).map(q=>({
  id:`nerdc25-bank-${q.id}`,classLevel:q.classLevel,subject:q.subject,topic,
  prompt:q.prompt,type:'MULTIPLE_CHOICE' as const,options:q.options.map(String),correctAnswer:String(q.correctAnswer),
  explanation:q.explanation||`The correct answer is ${q.correctAnswer}.`,
  hint:subject==='Mathematics'?'Identify the governing rule and work carefully before choosing.':'Use the sentence, passage or language rule—not a guess—to eliminate the distractors.',
  difficulty:Number(q.difficulty||1),skill:topic,source:'AVORA_REVIEWED_BANK' as const,
 }));
 const unique: NerdcExerciseQuestion[]=[];const prompts=new Set<string>();
 for(const q of existing){const k=q.prompt.toLowerCase().trim();if(prompts.has(k))continue;prompts.add(k);unique.push(q);if(unique.length>=baseCount)break}
 const needed=Math.max(0,baseCount-unique.length);
 for(const q of conceptQuestions(classLevel,subject,topic,needed)){if(!prompts.has(q.prompt.toLowerCase())){prompts.add(q.prompt.toLowerCase());unique.push(q)}}
 const base=unique.slice(0,baseCount);
 if(isJss1Lcm(classLevel,subject,topic)&&count>15)return [...base,...factorsAndMultiplesFoundationQuestions.slice(0,Math.min(10,count-15)).map(q=>({...q,topic}))];
 return base;
}

export function publicNerdc2025ExerciseQuestions(classLevel:string,subject:string,topic:string,count=15):PublicNerdcExerciseQuestion[]{
 return nerdc2025ExerciseQuestions(classLevel,subject,topic,count).map(({correctAnswer,...q})=>q);
}

export function checkNerdc2025Exercise(questionId:string,answer:string){
 for(const official of officialNerdc2025Topics('JSS1','Mathematics').concat(officialNerdc2025Topics('JSS1','English Language'),officialNerdc2025Topics('JSS2','Mathematics'),officialNerdc2025Topics('JSS2','English Language'))){
  const q=nerdc2025ExerciseQuestions(official.classLevel,official.subject,official.topic,isJss1Lcm(official.classLevel,official.subject,official.topic)?25:15).find(item=>item.id===questionId);
  if(!q)continue;const correct=norm(answer).toLowerCase()===norm(q.correctAnswer).toLowerCase();
  return {correct,correctAnswer:q.correctAnswer,explanation:q.explanation,hint:correct?'Explain why the rule or evidence makes this answer valid.':q.hint,topic:q.topic,skill:q.skill};
 }
 return undefined;
}

export function nerdc2025ExerciseAudit(){
 const rows=[] as Array<{classLevel:string;subject:string;topic:string;count:number;bank:number;authored:number;concept:number}>;
 for(const classLevel of ['JSS1','JSS2'] as const)for(const subject of ['Mathematics','English Language'] as const)for(const topic of officialNerdc2025Topics(classLevel,subject)){
  const q=nerdc2025ExerciseQuestions(classLevel,subject,topic.topic,15);rows.push({classLevel,subject,topic:topic.topic,count:q.length,bank:q.filter(x=>x.source==='AVORA_REVIEWED_BANK').length,authored:q.filter(x=>x.source==='AVORA_AUTHORED_NERDC_BANK').length,concept:q.filter(x=>x.source==='NERDC_DEEP_LESSON_CONCEPT_CHECK').length});
 }
 return rows;
}
