import {NextResponse} from 'next/server';

export const runtime='nodejs';
export const dynamic='force-dynamic';

const MAX_AUDIO_BYTES=8*1024*1024;
const ALLOWED_TYPES=new Set(['audio/webm','audio/wav','audio/x-wav','audio/mpeg','audio/mp4','audio/ogg','audio/flac','audio/x-flac']);

export async function POST(req:Request){
 try{
  const form=await req.formData();
  const audio=form.get('audio');
  if(!(audio instanceof File))return NextResponse.json({error:'Record or attach an audio sample first.'},{status:400});
  if(audio.size===0||audio.size>MAX_AUDIO_BYTES)return NextResponse.json({error:'Audio must be between 1 byte and 8 MB.'},{status:400});
  if(audio.type&&!ALLOWED_TYPES.has(audio.type))return NextResponse.json({error:'Unsupported audio format.'},{status:415});
  const endpoint=process.env.NATLAS_ASR_ENDPOINT?.trim();
  if(!endpoint)return NextResponse.json({error:'N-ATLAS ASR runtime is not configured yet.',code:'NATLAS_NOT_CONFIGURED',model:'NCAIR1/NigerianAccentedEnglish'},{status:503});
  const headers:Record<string,string>={'Content-Type':audio.type||'application/octet-stream','Accept':'application/json'};
  const token=process.env.NATLAS_ASR_TOKEN?.trim();
  if(token)headers.Authorization=`Bearer ${token}`;
  const started=Date.now();
  const response=await fetch(endpoint,{method:'POST',headers,body:await audio.arrayBuffer(),signal:AbortSignal.timeout(120_000)});
  const latencyMs=Date.now()-started;
  const contentType=response.headers.get('content-type')||'';
  const payload:any=contentType.includes('application/json')?await response.json():{text:await response.text()};
  if(!response.ok){console.error('N-ATLAS ASR upstream failure',{status:response.status,latencyMs});return NextResponse.json({error:'N-ATLAS could not transcribe this recording.',code:'NATLAS_UPSTREAM_ERROR',status:response.status},{status:502});}
  const transcript=String(payload?.text??payload?.transcript??payload?.result?.text??'').trim();
  if(!transcript)return NextResponse.json({error:'N-ATLAS returned no transcript.',code:'NATLAS_EMPTY_TRANSCRIPT'},{status:502});
  return NextResponse.json({transcript,provider:'N-ATLAS',model:process.env.NATLAS_ASR_MODEL||'NCAIR1/NigerianAccentedEnglish',language:'en-NG',latencyMs});
 }catch(error){
  const timeout=error instanceof Error&&(error.name==='TimeoutError'||error.name==='AbortError');
  console.error('N-ATLAS ASR route',error);
  return NextResponse.json({error:timeout?'N-ATLAS transcription timed out. Please retry.':'Voice transcription failed. Please retry.',code:timeout?'NATLAS_TIMEOUT':'NATLAS_ASR_ERROR'},{status:timeout?504:500});
 }
}
