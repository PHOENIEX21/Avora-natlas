import fs from 'node:fs';
const required=[
 ['app/api/natlas/asr/route.ts',["provider:'N-ATLAS'","NATLAS_ASR_ENDPOINT","getSession()"]],
 ['app/api/natlas/evidence/route.ts',["DEVELOPMENT","PILOT","VALIDATION","answerSource"]],
 ['components/TutorClient.tsx',["fetch('/api/natlas/asr'","askTeacher(transcript)","/api/natlas/evidence","N-ATLAS heard","transcriptCorrected:true","markLatestVoiceMastery"]],
 ['app/admin/natlas-evidence/page.tsx',["validation_mode='VALIDATION'","Failure evidence","Answer provenance","ASR median / p95","Mastery success","Export validation CSV"]],
 ['app/api/admin/natlas-evidence/export/route.ts',["validation_mode='VALIDATION'","VALIDATION_ONLY","Content-Disposition"]],
 ['database/migrations/033_natlas_naic_evidence.sql',["natlas_validation_interactions","validation_mode","asr_latency_ms"]],
 ['database/migrations/034_natlas_evidence_snapshots.sql',["natlas_evidence_snapshots"]],
 ['NAIC-REQUIREMENT-TRACEABILITY.md',["minimum 50 genuine","3–5 minute","Seven submission components"]]
];
let failed=0;
for(const [file,needles] of required){const body=fs.readFileSync(file,'utf8');for(const needle of needles){const ok=body.includes(needle);console.log(ok?'PASS':'FAIL',file,'→',needle);if(!ok)failed++}}
console.log(failed?'NAIC flow contract has gaps.':'NAIC flow contract is structurally complete.');if(failed)process.exit(1);
