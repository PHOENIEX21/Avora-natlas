export const OFFICIAL_VALIDATION_START_ENV='NATLAS_OFFICIAL_VALIDATION_START';

export function officialValidationStart(){
 const raw=String(process.env[OFFICIAL_VALIDATION_START_ENV]||'').trim();
 if(!raw)return null;
 const d=new Date(raw);
 return Number.isNaN(d.getTime())?null:d;
}

export function officialValidationStartIso(){return officialValidationStart()?.toISOString()||null;}
