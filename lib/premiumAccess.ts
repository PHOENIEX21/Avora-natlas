import {NextResponse} from 'next/server';
import {getStudentAccessTier} from '@/lib/billing';
import type {Session} from '@/lib/auth';

export function competitionPreviewAccessEnabled(){
 const mode=String(process.env.NATLAS_EVIDENCE_MODE||'DEVELOPMENT').toUpperCase();
 const env=String(process.env.VERCEL_ENV||'').toLowerCase();
 if(mode==='VALIDATION')return env==='production'||env==='preview';
 return env==='preview' && ['DEVELOPMENT','PILOT'].includes(mode);
}

export async function requirePremiumFeature(session:Session|null,feature:string){
 if(!session||session.role!=='STUDENT')return null;
 if(competitionPreviewAccessEnabled())return null;
 const access=await getStudentAccessTier(session.userId);
 if(access.tier!=='FREE')return null;
 return NextResponse.json({error:feature+' is included with AVORA Premium. Your learning history is safe and AVORA Free remains available.',code:'PREMIUM_REQUIRED',tier:'FREE',upgradeHref:'/access'},{status:402});
}
