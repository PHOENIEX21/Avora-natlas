import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';

function csvCell(value:unknown){const s=value==null?'':String(value);return '"'+s.replaceAll('"','""')+'"'}
export async function GET(req:Request){
 await requireAdmin();
 const url=new URL(req.url);const format=url.searchParams.get('format')==='json'?'json':'csv';
 try{
  const rows=await withDbRetry(()=>sql`SELECT interaction_key,session_key,language,class_level,subject,topic,asr_provider,asr_model,asr_success,asr_latency_ms,transcript_corrected,answer_source,answer_success,answer_latency_ms,mastery_checked,mastery_success,feedback_rating,failure_code,created_at FROM natlas_validation_interactions WHERE validation_mode='VALIDATION' AND created_at >= COALESCE((SELECT MAX(started_at) FROM natlas_validation_runs WHERE status='ACTIVE'),'infinity'::timestamptz) ORDER BY created_at ASC`,1);
  const exportedAt=new Date().toISOString();
  if(format==='json')return NextResponse.json({scope:'VALIDATION_ONLY',exportedAt,count:rows.length,interactions:rows},{headers:{'Cache-Control':'no-store','Content-Disposition':'attachment; filename="avora-natlas-validation-evidence.json"'}});
  const headers=['interaction_key','session_key','language','class_level','subject','topic','asr_provider','asr_model','asr_success','asr_latency_ms','transcript_corrected','answer_source','answer_success','answer_latency_ms','mastery_checked','mastery_success','feedback_rating','failure_code','created_at'];
  const body=[headers.join(','),...rows.map((row:any)=>headers.map(h=>csvCell(row[h])).join(','))].join('\n');
  return new NextResponse(body,{headers:{'Content-Type':'text/csv; charset=utf-8','Cache-Control':'no-store','Content-Disposition':'attachment; filename="avora-natlas-validation-evidence.csv"'}});
 }catch(e){console.error('N-ATLAS evidence export failed',e);return NextResponse.json({error:'Could not export validation evidence'},{status:500})}
}
