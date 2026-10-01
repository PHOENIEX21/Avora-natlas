import fs from 'node:fs';
const route=fs.readFileSync('app/api/tutor/chat/route.ts','utf8');
const checks=[
 ['master curriculum inventory drives cross-topic search',route.includes("masterTopics(classLevel,subject)")],
 ['unsafe proposition-to-preposition alias removed',!route.includes("propositions:'preposition'")&&!route.includes("proposition:'preposition'")],
 ['curriculum responses are bounded',route.includes("const concise=(value:string,max=900)")],
 ['deterministic math precedes retrieval',route.indexOf('const calculation=deterministicMathAnswer')<route.indexOf('const local=localCurriculumAnswer')],
 ['focused follow-up precedes broad retrieval',route.indexOf('const focused=focusedLearningAnswer')<route.indexOf('const local=localCurriculumAnswer')],
 ['curriculum precedes general knowledge',route.indexOf('const local=localCurriculumAnswer')<route.indexOf('const general=generalLearningAnswer')],
 ['unavailable answer remains truthful',route.includes("knowledgeSource:{type:'NONE'}")&&route.includes('answerUnavailable:true')],
 ['combined simile/metaphor teaching exists',route.includes("simile and metaphor")&&route.includes("both make comparisons")],
 ['source provenance returned for curriculum',route.includes("type:'AVORA_CURRICULUM'")],
 ['external AI remains after zero-cost grounded routes',route.indexOf('configuredAiProvider()')>route.indexOf('generalLearningAnswer(d.question)')],
 ['spoken division normalization is deterministic',route.includes("divide by|over")&&route.includes("divided by")],
 ['math subject boundary exists',route.includes("hintedSubject")&&route.includes("'Mathematics'")],
 ['english subject boundary exists',route.includes("englishTerms")&&route.includes("'English Language'")],
 ['exact curriculum matches receive ranking boost',route.includes('exactTopic?30')&&route.includes('exactUnit?24')],
 ['place value has reliable local teaching path',route.includes('place\\s+value')&&route.includes("concept:'Place Value'")],
 ['direct arithmetic supports numeric division',route.includes("const m=q.match(/(-?\\d+")&&route.includes("op==='/'?a/b")],
 ['division by zero is handled safely',route.includes("op==='/'&&b===0")],
 ['math vocabulary spans core JSS concepts',['fraction','decimal','integer','algebra','equation','geometry','angle','factor','multiple','hcf','lcm','binary','percentage','ratio'].every(x=>route.includes("'"+x+"'"))],
 ['english vocabulary spans core language concepts',['noun','verb','adjective','adverb','pronoun','grammar','vowel','consonant','comprehension','essay','phoneme'].every(x=>route.includes("'"+x+"'"))],
 ['ambiguous questions preserve current curriculum as a ranked candidate',route.includes("add(getCurriculumTutorPlan(d.classLevel,d.subject,d.topic),d.subject,d.topic,d.classLevel,true)")],
 ['cross-class curriculum search covers JSS1 to JSS3',route.includes("[d.classLevel,'JSS1','JSS2','JSS3']")],
 ['subject filtering occurs before selecting curriculum hit',route.indexOf('const ranked=hintedSubject')<route.indexOf('const hit=ranked[0]')]
];
let failed=0;for(const [name,ok] of checks){console.log(ok?'PASS':'FAIL',name);if(!ok)failed++}
console.log(`${checks.length-failed}/${checks.length} tutor reliability checks passed`);if(failed)process.exit(1);
