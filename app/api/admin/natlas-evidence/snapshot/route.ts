import {NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/admin/access';
import {sql,withDbRetry} from '@/lib/db';

export async function POST(){
 const admin=await requireAdmin();
 try{
  const [m]=await withDbRetry(()=>sql`SELECT
   COUNT(*)::int validation_interactions,
   COUNT(DISTINCT session_key)::int validation_sessions,
   COUNT(DISTINCT user_id)::int validation_users,
   COUNT(*) FILTER (WHERE asr_success=true)::int asr_successes,
   COUNT(*) FILTER (WHERE asr_success=false)::int asr_failures,
   COALESCE(ROUND(AVG(asr_latency_ms)),0)::int avg_asr_latency_ms,
   COUNT(*) FILTER (WHERE answer_success=true)::int answer_successes,
   COUNT(*) FILTER (WHERE answer_success=false)::int answer_failures,
   COALESCE(ROUND(AVG(answer_latency_ms)),0)::int avg_answer_latency_ms,
   COALESCE(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY asr_latency_ms),0)::int median_asr_latency_ms,
   COALESCE(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY asr_latency_ms),0)::int p95_asr_latency_ms,
   COALESCE(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY answer_latency_ms),0)::int median_answer_latency_ms,
   COALESCE(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY answer_latency_ms),0)::int p95_answer_latency_ms,
   COUNT(*) FILTER (WHERE transcript_corrected=true)::int transcript_corrections,
   COUNT(*) FILTER (WHERE mastery_checked=true)::int mastery_checks,
   COUNT(*) FILTER (WHERE mastery_success=true)::int mastery_successes,
   COALESCE(ROUND(AVG(feedback_rating)::numeric,2),0)::numeric avg_feedback
   FROM natlas_validation_interactions WHERE validation_mode='VALIDATION' AND created_at >= COALESCE((SELECT MAX(started_at) FROM natlas_validation_runs WHERE status='ACTIVE'),'infinity'::timestamptz)`,1);
  const payload={capturedAt:new Date().toISOString(),scope:'VALIDATION_ONLY',...m};
  const label='NAIC evidence '+payload.capturedAt;
  const rows=await withDbRetry(()=>sql`INSERT INTO natlas_evidence_snapshots
   (created_by,label,validation_interactions,validation_sessions,validation_users,asr_successes,asr_failures,avg_asr_latency_ms,answer_successes,answer_failures,avg_answer_latency_ms,payload)
   VALUES(${admin.userId},${label},${Number(m?.validation_interactions||0)},${Number(m?.validation_sessions||0)},${Number(m?.validation_users||0)},${Number(m?.asr_successes||0)},${Number(m?.asr_failures||0)},${Number(m?.avg_asr_latency_ms||0)},${Number(m?.answer_successes||0)},${Number(m?.answer_failures||0)},${Number(m?.avg_answer_latency_ms||0)},${sql.json(payload)})
   RETURNING id,label,created_at`);
  return NextResponse.json({ok:true,snapshot:rows[0],metrics:payload});
 }catch(e){console.error('N-ATLAS evidence snapshot failed',e);return NextResponse.json({error:'Could not capture evidence snapshot'},{status:500})}
}
