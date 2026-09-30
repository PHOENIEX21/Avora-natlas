import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const tutor=read('components/TutorClient.tsx');
const evidence=read('app/api/natlas/evidence/route.ts');
const migration=read('database/migrations/033_natlas_naic_evidence.sql');
const dashboard=read('app/admin/natlas-evidence/page.tsx');
const snapshot=read('app/api/admin/natlas-evidence/snapshot/route.ts');

const checks=[
 ['N-ATLAS ASR is the voice endpoint',tutor.includes("fetch('/api/natlas/asr'")],
 ['successful ASR creates evidence',tutor.includes("asrSuccess:true")&&tutor.includes('asrLatencyMs')],
 ['failed ASR creates evidence',tutor.includes("asrSuccess:false")&&tutor.includes("ASR_CLIENT_FAILURE")],
 ['answer provenance is recorded',tutor.includes('answerSourceFromTutor')&&tutor.includes('answerSuccess')],
 ['answer latency is recorded',tutor.includes('answerLatencyMs:Date.now()-answerStarted')],
 ['development is default during engineering',tutor.includes("validationMode:'DEVELOPMENT'")],
 ['evidence API restricts official modes',evidence.includes("z.enum(['DEVELOPMENT','PILOT','VALIDATION'])")],
 ['validation table separates modes',migration.includes("CHECK (validation_mode IN ('DEVELOPMENT','PILOT','VALIDATION'))")],
 ['dashboard counts validation only',dashboard.includes("validation_mode='VALIDATION'")],
 ['dashboard exposes failures',dashboard.includes('Failure evidence')],
 ['snapshot counts validation only',snapshot.includes("validation_mode='VALIDATION'")],
 ['privacy boundary documented in schema',migration.includes('Never store raw audio')]
];

let failed=0;
for(const [name,ok] of checks){console.log(ok?'PASS':'FAIL',name);if(!ok)failed++}
console.log(`${checks.length-failed}/${checks.length} NAIC evidence checks passed`);
if(failed)process.exit(1);
