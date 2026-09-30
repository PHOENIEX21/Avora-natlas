import fs from 'node:fs';
const asr=fs.readFileSync('app/api/natlas/asr/route.ts','utf8');
const client=fs.readFileSync('components/TutorClient.tsx','utf8');
const evidence=fs.readFileSync('app/api/natlas/evidence/route.ts','utf8');
const checks=[
 ['ASR requires signed-in AVORA session',asr.includes('getSession()')&&asr.includes("code:'UNAUTHORIZED'")],
 ['audio has upper bound',asr.includes('MAX_AUDIO_BYTES=8*1024*1024')],
 ['tiny/empty recordings are rejected',asr.includes('MIN_AUDIO_BYTES=900')&&asr.includes('audio.size<MIN_AUDIO_BYTES')],
 ['audio MIME allowlist exists',asr.includes('ALLOWED_TYPES')&&asr.includes('Unsupported audio format')],
 ['N-ATLAS upstream token stays server-side',asr.includes('process.env.NATLAS_ASR_TOKEN')&&!client.includes('NATLAS_ASR_TOKEN')],
 ['ASR upstream has bounded timeout',asr.includes('AbortSignal.timeout(120_000)')],
 ['ASR upstream bypasses response cache',asr.includes("cache:'no-store'")],
 ['provider is reported as N-ATLAS',asr.includes("provider:'N-ATLAS'")],
 ['evidence endpoint requires session',evidence.includes('getSession()')&&evidence.includes("status:401")],
 ['evidence endpoint accepts learner sessions only',evidence.includes("session.role!=='STUDENT'")&&evidence.includes('status:403')],
 ['evidence does not accept transcript text',!evidence.includes('transcript:z.')],
 ['evidence does not accept raw audio',!evidence.includes('audio:z.')],
 ['client records failures without raw learner content',client.includes("failureCode:'ASR_CLIENT_FAILURE'")&&!client.includes('transcript:transcript')]
];
let failed=0;for(const [name,ok] of checks){console.log(ok?'PASS':'FAIL',name);if(!ok)failed++}
console.log(`${checks.length-failed}/${checks.length} N-ATLAS boundary checks passed`);if(failed)process.exit(1);
