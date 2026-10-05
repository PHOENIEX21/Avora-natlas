import {NextResponse} from 'next/server';
import {sql,withDbRetry} from '@/lib/db';

export const dynamic='force-dynamic';

export async function GET(){
  if(process.env.VERCEL_ENV==='production'){
    return NextResponse.json({error:'Not available in production'},{status:404});
  }
  try{
    const run=await withDbRetry(()=>sql`
      SELECT run_key,started_at,ended_at,status
      FROM natlas_validation_runs
      ORDER BY started_at DESC LIMIT 1
    `,1);
    if(!run.length)return NextResponse.json({run:null,summary:null,recent:[]},{headers:{'Cache-Control':'no-store'}});
    const r:any=run[0];
    const summary=await withDbRetry(()=>sql`
      SELECT COUNT(*)::int interactions,
             COUNT(DISTINCT session_key)::int sessions,
             COUNT(DISTINCT user_id)::int users_with_id,
             COUNT(*) FILTER (WHERE asr_success IS TRUE)::int asr_success,
             COUNT(*) FILTER (WHERE asr_success IS FALSE)::int asr_failure,
             COUNT(*) FILTER (WHERE transcript_corrected IS TRUE)::int transcript_corrections,
             COUNT(*) FILTER (WHERE answer_success IS TRUE)::int answer_success,
             COUNT(*) FILTER (WHERE answer_success IS FALSE)::int answer_failure,
             COUNT(*) FILTER (WHERE mastery_checked IS TRUE)::int mastery_checked,
             COUNT(*) FILTER (WHERE mastery_success IS TRUE)::int mastery_success,
             COUNT(*) FILTER (WHERE feedback_rating IS NOT NULL)::int rated,
             ROUND(AVG(feedback_rating)::numeric,2) avg_rating,
             ROUND(AVG(asr_latency_ms)::numeric,0) avg_asr_latency_ms,
             ROUND(AVG(answer_latency_ms)::numeric,0) avg_answer_latency_ms,
             MIN(created_at) first_interaction,
             MAX(created_at) latest_interaction
      FROM natlas_validation_interactions
      WHERE validation_mode='VALIDATION'
        AND created_at>=${r.started_at}
        AND (${r.ended_at}::timestamptz IS NULL OR created_at<=${r.ended_at})
    `,1);
    const coverage=await withDbRetry(()=>sql`
      SELECT class_level,subject,COUNT(*)::int interactions
      FROM natlas_validation_interactions
      WHERE validation_mode='VALIDATION'
        AND created_at>=${r.started_at}
        AND (${r.ended_at}::timestamptz IS NULL OR created_at<=${r.ended_at})
      GROUP BY class_level,subject ORDER BY class_level,subject
    `,1);
    const failures=await withDbRetry(()=>sql`
      SELECT COALESCE(failure_code,'NONE') failure_code,COUNT(*)::int interactions
      FROM natlas_validation_interactions
      WHERE validation_mode='VALIDATION'
        AND created_at>=${r.started_at}
        AND (${r.ended_at}::timestamptz IS NULL OR created_at<=${r.ended_at})
      GROUP BY failure_code ORDER BY interactions DESC
    `,1);
    const recent=await withDbRetry(()=>sql`
      SELECT interaction_key,created_at,class_level,subject,topic,asr_provider,asr_model,
             asr_success,asr_latency_ms,transcript_corrected,answer_source,answer_success,
             answer_latency_ms,answer_provider,answer_model,ai_fallback_used,
             mastery_checked,mastery_success,feedback_rating,failure_code,session_key
      FROM natlas_validation_interactions
      WHERE validation_mode='VALIDATION'
        AND created_at>=${r.started_at}
        AND (${r.ended_at}::timestamptz IS NULL OR created_at<=${r.ended_at})
      ORDER BY created_at DESC LIMIT 20
    `,1);
    return NextResponse.json({run:r,summary:summary[0]??null,coverage,failures,recent},{headers:{'Cache-Control':'no-store'}});
  }catch(e){
    console.error('Temporary evidence diagnostics failed',e);
    return NextResponse.json({error:'Diagnostics failed'},{status:500});
  }
}
