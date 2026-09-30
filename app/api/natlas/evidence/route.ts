import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';

const serverEvidenceMode=()=>{const raw=String(process.env.NATLAS_EVIDENCE_MODE||'DEVELOPMENT').toUpperCase();return raw==='PILOT'||raw==='VALIDATION'?raw:'DEVELOPMENT'};

const schema=z.object({
 validationMode:z.enum(['DEVELOPMENT','PILOT','VALIDATION']).optional(),
 sessionKey:z.string().min(8).max(100),
 interactionKey:z.string().min(8).max(100),
 language:z.string().min(2).max(20).default('en-NG'),
 classLevel:z.string().max(40).optional(),
 subject:z.string().max(80).optional(),
 topic:z.string().max(120).optional(),
 asrProvider:z.literal('N-ATLAS').default('N-ATLAS'),
 asrModel:z.string().max(160).optional(),
 asrSuccess:z.boolean(),
 asrLatencyMs:z.number().int().min(0).max(300000).optional(),
 transcriptCorrected:z.boolean().optional(),
 answerSource:z.enum(['AVORA_CURRICULUM','AVORA_CONTEXT','GENERAL_LEARNING','DETERMINISTIC_MATH','EXTERNAL_AI','NONE']).optional(),
 answerSuccess:z.boolean().optional(),
 answerLatencyMs:z.number().int().min(0).max(300000).optional(),
 masteryChecked:z.boolean().default(false),
 masterySuccess:z.boolean().optional(),
 feedbackRating:z.number().int().min(1).max(5).optional(),
 failureCode:z.string().max(80).optional()
});

export async function POST(req:Request){
 const session=await getSession();
 if(!session)return NextResponse.json({error:'Unauthorized'},{status:401});
 let d:z.infer<typeof schema>;
 try{d=schema.parse(await req.json())}catch{return NextResponse.json({error:'Invalid evidence payload'},{status:400})}
 const validationMode=serverEvidenceMode();
 if(d.validationMode&&d.validationMode!==validationMode)console.warn('Ignoring client evidence mode',{requested:d.validationMode,server:validationMode});
 try{
  await withDbRetry(()=>sql`INSERT INTO natlas_validation_interactions
   (user_id,validation_mode,session_key,interaction_key,language,class_level,subject,topic,asr_provider,asr_model,asr_success,asr_latency_ms,transcript_corrected,answer_source,answer_success,answer_latency_ms,mastery_checked,mastery_success,feedback_rating,failure_code)
   VALUES(${session.userId},${validationMode},${d.sessionKey},${d.interactionKey},${d.language},${d.classLevel||null},${d.subject||null},${d.topic||null},'N-ATLAS',${d.asrModel||null},${d.asrSuccess},${d.asrLatencyMs??null},${d.transcriptCorrected??null},${d.answerSource||null},${d.answerSuccess??null},${d.answerLatencyMs??null},${d.masteryChecked},${d.masterySuccess??null},${d.feedbackRating??null},${d.failureCode||null})
   ON CONFLICT(interaction_key) DO UPDATE SET
    language=EXCLUDED.language,
    class_level=COALESCE(EXCLUDED.class_level,natlas_validation_interactions.class_level),
    subject=COALESCE(EXCLUDED.subject,natlas_validation_interactions.subject),
    topic=COALESCE(EXCLUDED.topic,natlas_validation_interactions.topic),
    asr_model=COALESCE(EXCLUDED.asr_model,natlas_validation_interactions.asr_model),
    asr_success=EXCLUDED.asr_success,
    asr_latency_ms=COALESCE(EXCLUDED.asr_latency_ms,natlas_validation_interactions.asr_latency_ms),
    transcript_corrected=COALESCE(EXCLUDED.transcript_corrected,natlas_validation_interactions.transcript_corrected),
    answer_source=COALESCE(EXCLUDED.answer_source,natlas_validation_interactions.answer_source),
    answer_success=COALESCE(EXCLUDED.answer_success,natlas_validation_interactions.answer_success),
    answer_latency_ms=COALESCE(EXCLUDED.answer_latency_ms,natlas_validation_interactions.answer_latency_ms),
    mastery_checked=EXCLUDED.mastery_checked OR natlas_validation_interactions.mastery_checked,
    mastery_success=COALESCE(EXCLUDED.mastery_success,natlas_validation_interactions.mastery_success),
    feedback_rating=COALESCE(EXCLUDED.feedback_rating,natlas_validation_interactions.feedback_rating),
    failure_code=CASE WHEN EXCLUDED.failure_code IS NOT NULL THEN EXCLUDED.failure_code WHEN EXCLUDED.answer_success=true THEN NULL ELSE natlas_validation_interactions.failure_code END`);
  return NextResponse.json({ok:true,validationMode});
 }catch(e){console.error('N-ATLAS evidence insert failed',e);return NextResponse.json({error:'Could not record N-ATLAS evidence'},{status:500})}
}
