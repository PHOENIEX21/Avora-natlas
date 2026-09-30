import {NextResponse} from 'next/server';
import {getSession} from '@/lib/auth';

export const runtime='nodejs';
export const dynamic='force-dynamic';

const MAX_AUDIO_BYTES=8*1024*1024;
const MIN_AUDIO_BYTES=900;
const ASR_MODEL=process.env.NATLAS_ASR_MODEL||'NCAIR1/NigerianAccentedEnglish';
const ALLOWED_TYPES=new Set(['audio/webm','audio/webm;codecs=opus','audio/ogg','audio/ogg;codecs=opus','audio/wav','audio/x-wav','audio/mpeg','audio/mp4','audio/flac','audio/x-flac','application/ogg']);

export async function POST(req:Request){
 let started:number|undefined;
 try{
  const session=await getSession();
  if(!session)return NextResponse.json({error:'Please sign in again.',code:'UNAUTHORIZED'},{status:401});
  const form=await req.formData();
  const audio=form.get('audio');
  if(!(audio instanceof File))return NextResponse.json({error:'Record or attach an audio sample first.'},{status:400});
  if(audio.size<MIN_AUDIO_BYTES||audio.size>MAX_AUDIO_BYTES)return NextResponse.json({error:'Recording is too short or too large. Record a clear question and try again.'},{status:400});
  const audioType=(audio.type||'').toLowerCase().replace(/\s/g,'');
  const baseAudioType=audioType.split(';')[0];
  if(audioType&&!ALLOWED_TYPES.has(audioType)&&!ALLOWED_TYPES.has(baseAudioType))return NextResponse.json({error:`Unsupported audio format: ${audio.type}`},{status:415});
  const endpoint=process.env.NATLAS_ASR_ENDPOINT?.trim();
  if(!endpoint)return NextResponse.json({error:'N-ATLAS ASR runtime is not configured yet.',code:'NATLAS_NOT_CONFIGURED',provider:'N-ATLAS',model:ASR_MODEL},{status:503});
  const headers:Record<string,string>={'Content-Type':baseAudioType||'application/octet-stream','Accept':'application/json'};
  const token=process.env.NATLAS_ASR_TOKEN?.trim();
  if(token)headers.Authorization=`Bearer ${token}`;
  started=Date.now();
  const response=await fetch(endpoint,{method:'POST',headers,body:await audio.arrayBuffer(),signal:AbortSignal.timeout(120_000),cache:'no-store'});
  const latencyMs=Date.now()-started;
  const contentType=response.headers.get('content-type')||'';
  const payload:any=contentType.includes('application/json')?await response.json():{text:await response.text()};
  if(!response.ok){console.error('N-ATLAS ASR upstream failure',{status:response.status,latencyMs});return NextResponse.json({error:'N-ATLAS could not transcribe this recording.',code:'NATLAS_UPSTREAM_ERROR',provider:'N-ATLAS',model:ASR_MODEL,latencyMs,upstreamStatus:response.status},{status:502});}
  const transcript=String(payload?.text??payload?.transcript??payload?.result?.text??'').trim();
  if(!transcript)return NextResponse.json({error:'N-ATLAS returned no transcript.',code:'NATLAS_EMPTY_TRANSCRIPT',provider:'N-ATLAS',model:ASR_MODEL,latencyMs},{status:502});
  return NextResponse.json({transcript,provider:'N-ATLAS',model:ASR_MODEL,language:'en-NG',latencyMs});
 }catch(error){
  const timeout=error instanceof Error&&(error.name==='TimeoutError'||error.name==='AbortError');
  const latencyMs=started?Date.now()-started:undefined;
  console.error('N-ATLAS ASR route',error);
  return NextResponse.json({error:timeout?'N-ATLAS transcription timed out. Please retry.':'Voice transcription failed. Please retry.',code:timeout?'NATLAS_TIMEOUT':'NATLAS_ASR_ERROR',provider:'N-ATLAS',model:ASR_MODEL,latencyMs},{status:timeout?504:500});
 }
}
