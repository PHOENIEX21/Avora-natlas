import {NextResponse} from 'next/server';
import {getStudentAccessTier} from '@/lib/billing';
import type {Session} from '@/lib/auth';

export function competitionDevelopmentAccessEnabled(){
 return process.env.NATLAS_EVIDENCE_MODE==='DEVELOPMENT' && process.env.VERCEL_ENV==='preview';
}

export async function requirePremiumFeature(session:Session|null,feature:string){
 if(!session||session.role!=='STUDENT')return null;
 // The isolated N-ATLAS development deployment may exercise the tutor without
 // changing AVORA's normal production entitlement rules. Official PILOT and
 // VALIDATION modes never use this bypass.
 if(competitionDevelopmentAccessEnabled())return null;
 const access=await getStudentAccessTier(session.userId);
 if(access.tier!=='FREE')return null;
 return NextResponse.json({error:`${feature} is included with AVORA Premium. Your learning history is safe and AVORA Free remains available.`,code:'PREMIUM_REQUIRED',tier:'FREE',upgradeHref:'/access'},{status:402});
}
