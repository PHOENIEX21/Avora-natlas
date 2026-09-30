import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const tutor=read('components/TutorClient.tsx');
const evidence=read('app/api/natlas/evidence/route.ts');
const migration=read('database/migrations/033_natlas_naic_evidence.sql');
const dashboard=read('app/admin/natlas-evidence/page.tsx');
const snapshot=read('app/api/admin/natlas-evidence/snapshot/route.ts');
const globalAsk=read('components/GlobalAskAvora.tsx');
const exportRoute=read('app/api/admin/natlas-evidence/export/route.ts');

const checks=[
 ['N-ATLAS ASR is the voice endpoint',tutor.includes("fetch('/api/natlas/asr'")],
 ['successful ASR creates evidence',tutor.includes("asrSuccess:true")&&tutor.includes('asrLatencyMs')],
 ['failed ASR creates evidence',tutor.includes("asrSuccess:false")&&tutor.includes("ASR_CLIENT_FAILURE")],
 ['answer provenance is recorded',tutor.includes('answerSourceFromTutor')&&tutor.includes('answerSuccess')],
 ['answer latency is recorded',tutor.includes('answerLatencyMs:Date.now()-answerStarted')],
 ['development is default during engineering',read('.env.natlas.example').includes('NATLAS_EVIDENCE_MODE="DEVELOPMENT"')],
 ['evidence API restricts official modes',evidence.includes("z.enum(['DEVELOPMENT','PILOT','VALIDATION'])")],
 ['official mode is assigned by server environment',evidence.includes('NATLAS_EVIDENCE_MODE')&&evidence.includes('const validationMode=serverEvidenceMode()')],
 ['client cannot promote its own validation row',evidence.includes('Ignoring client evidence mode')&&evidence.includes('${validationMode}')],
 ['validation table separates modes',migration.includes("CHECK (validation_mode IN ('DEVELOPMENT','PILOT','VALIDATION'))")],
 ['dashboard counts validation only',dashboard.includes("validation_mode='VALIDATION'")],
 ['dashboard exposes failures',dashboard.includes('Failure evidence')],
 ['snapshot counts validation only',snapshot.includes("validation_mode='VALIDATION'")],
 ['voice evidence uses anonymous browser session key',tutor.includes("avora:natlas:evidence-session")&&tutor.includes('evidenceSessionKey()')],
 ['learner can flag corrected N-ATLAS transcript',tutor.includes('transcriptCorrected:true')&&tutor.includes('Use my correction')],
 ['voice interaction can receive mastery outcome',tutor.includes('markLatestVoiceMastery')&&tutor.includes('masteryChecked:true')],
 ['lesson transcript correction reattaches answer evidence',tutor.includes('natlasEvidenceRef.current=evidence')&&tutor.includes('transcriptCorrected:true')],
 ['global Ask AVORA uses N-ATLAS and evidence',globalAsk.includes("fetch('/api/natlas/asr'")&&globalAsk.includes("'/api/natlas/evidence'")],
 ['global Ask AVORA preserves transcript correction and feedback',globalAsk.includes('transcriptCorrected:true')&&globalAsk.includes('feedbackRating:n')],
 ['global Ask AVORA retries evidence after network failure',globalAsk.includes("addEventListener('online'")&&globalAsk.includes('evidence-queue')],
 ['dashboard exposes latency quality',dashboard.includes('ASR median / p95')&&dashboard.includes('Answer median / p95')],
 ['dashboard exposes learning outcome',dashboard.includes('Mastery success')&&dashboard.includes('Transcript corrections')],
 ['validation export is validation-only',exportRoute.includes("validation_mode='VALIDATION'")],
 ['validation export excludes raw transcript and audio',!exportRoute.includes('raw_audio')&&!exportRoute.includes('transcript_text')],
 ['privacy boundary documented in schema',migration.includes('Never store raw audio')]
];

let failed=0;
for(const [name,ok] of checks){console.log(ok?'PASS':'FAIL',name);if(!ok)failed++}
console.log(`${checks.length-failed}/${checks.length} NAIC evidence checks passed`);
if(failed)process.exit(1);
