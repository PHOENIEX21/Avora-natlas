'use client';
import {useState} from 'react';

export default function EvidenceSnapshotButton(){
 const [state,setState]=useState<'idle'|'saving'|'saved'|'error'>('idle');
 const [message,setMessage]=useState('');
 async function capture(){
  setState('saving');setMessage('');
  try{
   const r=await fetch('/api/admin/natlas-evidence/snapshot',{method:'POST'});
   const d=await r.json().catch(()=>({}));
   if(!r.ok)throw new Error(d.error||'Snapshot failed');
   setState('saved');setMessage('Immutable VALIDATION snapshot captured.');
  }catch(e:any){setState('error');setMessage(e?.message||'Could not capture snapshot.')}
 }
 return <div className="evidence-snapshot-action"><button type="button" className="btn" disabled={state==='saving'} onClick={capture}>{state==='saving'?'Capturing…':'Capture immutable snapshot'}</button>{message&&<small role="status">{message}</small>}</div>
}
