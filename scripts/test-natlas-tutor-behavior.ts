import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
const source=fs.readFileSync('app/api/tutor/chat/route.ts','utf8');
const extract=(name:string,endMarker:string)=>{const s=source.indexOf('export function '+name);const e=source.indexOf(endMarker,s);if(s<0||e<0)throw new Error('handler '+name+' not found');return source.slice(s,e).replace('export function ','function ')};
const block=extract('deterministicMathAnswer','function localCurriculumAnswer')+extract('focusedLearningAnswer','function isClearlyNonLearning')+extract('generalLearningAnswer','export async function POST');
const js=ts.transpileModule(block,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const sandbox:any={};vm.createContext(sandbox);vm.runInContext(js+';this.deterministicMathAnswer=deterministicMathAnswer;this.focusedLearningAnswer=focusedLearningAnswer;this.generalLearningAnswer=generalLearningAnswer;',sandbox);
const {deterministicMathAnswer,focusedLearningAnswer,generalLearningAnswer}=sandbox;
const d=(question:string)=>({question,subject:'Mathematics',topic:'Algebra',classLevel:'JSS2',exam:'BECE',unitIndex:0,board:[],recent:[],lessonSteps:[]});
const cases:[string,()=>boolean][]=[
 ['70 x 80 = 5600',()=>deterministicMathAnswer('what is 70 x 80?')?.reply.includes('5600')===true],
 ['100 divided by 20 = 5',()=>deterministicMathAnswer('what is 100 divided by 20?')?.reply.includes('= 5')===true],
 ['word explain survives x normalization',()=>deterministicMathAnswer('explain 12 x 8')?.reply.includes('96')===true],
 ['5 x 8 = 40',()=>deterministicMathAnswer('5 x 8')?.reply.includes('40')===true],
 ['spoken equal-to equation',()=>focusedLearningAnswer(d('2x plus 5 equal to 40. what is the answer?'))?.reply.includes('17.5')===true],
 ['noisy spoken equation',()=>focusedLearningAnswer(d('6x-2 equal to 10 is worth a short step.'))?.reply.includes('x = 2')===true],
 ['noun definition',()=>generalLearningAnswer('what is a noun?')?.reply.toLowerCase().includes('naming')===true],
 ['non-math text is not arithmetic',()=>deterministicMathAnswer('king sunny ade rhythms are the heartbeat of nigeria')===null],
 ['garbled text is not arithmetic',()=>deterministicMathAnswer('what is 45-valued fashion into rich soil')===null],
 ['division by zero truthful',()=>deterministicMathAnswer('12 divided by 0')?.reply.toLowerCase().includes('undefined')===true]
];
let failed=0;for(const [name,test] of cases){let ok=false;try{ok=test()}catch{}console.log(ok?'PASS':'FAIL',name);if(!ok)failed++}console.log(`${cases.length-failed}/${cases.length} behavioral tutor checks passed`);if(failed)process.exit(1);
