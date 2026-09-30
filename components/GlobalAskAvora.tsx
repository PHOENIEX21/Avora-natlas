'use client';
import {useRef,useState} from 'react';

type Turn={role:'student'|'teacher';text:string};
export default function GlobalAskAvora({classLevel='JSS1',exam='BECE'}:{classLevel?:string;exam?:string}){
 const [open,setOpen]=useState(false),[ask,setAsk]=useState(''),[busy,setBusy]=useState(false),[recording,setRecording]=useState(false),[status,setStatus]=useState('');
 const [transcript,setTranscript]=useState(''),[turns,setTurns]=useState<Turn[]>([]);
 const recorder=useRef<MediaRecorder|null>(null),chunks=useRef<Blob[]>([]);
 async function send(question=ask){
  const q=question.trim();if(!q||busy)return;setBusy(true);setAsk('');setTurns(x=>[...x,{role:'student',text:q}].slice(-12));
  try{const r=await fetch('/api/tutor/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:'General Learning',topic:'Ask AVORA',classLevel,exam,question:q,recent:turns.slice(-6)})});const d=await r.json();if(!r.ok)throw new Error(d.error||'AVORA could not answer.');setTurns(x=>[...x,{role:'teacher',text:String(d.reply||'I do not have a reliable answer yet.')}].slice(-12))}
  catch(e:any){setTurns(x=>[...x,{role:'teacher',text:e?.message||'AVORA could not answer just now.'}].slice(-12))}
  finally{setBusy(false)}
 }
 async function toggleVoice(){
  if(recording){recorder.current?.stop();return}
  if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined'){setStatus('Voice recording is not supported in this browser.');return}
  try{const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:{ideal:1},echoCancellation:{ideal:true},noiseSuppression:{ideal:true},autoGainControl:{ideal:true}}});const type=['audio/webm;codecs=opus','audio/ogg;codecs=opus','audio/webm'].find(x=>MediaRecorder.isTypeSupported(x))||'';const r=new MediaRecorder(stream,type?{mimeType:type,audioBitsPerSecond:128000}:{audioBitsPerSecond:128000});chunks.current=[];r.ondataavailable=e=>{if(e.data.size)chunks.current.push(e.data)};r.onstop=async()=>{setRecording(false);stream.getTracks().forEach(t=>t.stop());const blob=new Blob(chunks.current,{type:r.mimeType||'audio/webm'});if(!blob.size){setStatus('No recording was captured.');return}setBusy(true);setStatus('N-ATLAS is transcribing…');try{const form=new FormData();form.append('audio',blob,'avora-question.webm');const res=await fetch('/api/natlas/asr',{method:'POST',body:form});const d=await res.json();if(!res.ok)throw new Error(d.error||'N-ATLAS could not transcribe.');const text=String(d.transcript||'').trim();setTranscript(text);setAsk(text);setStatus('N-ATLAS heard your question.');setBusy(false);await send(text)}catch(e:any){setStatus(e?.message||'Voice transcription failed.');setBusy(false)}};recorder.current=r;r.start(250);setRecording(true);setStatus('Listening… tap Stop when you finish.')}catch{setStatus('Allow microphone access to ask by voice.')}
 }
 return <div className="global-ask-avora">
  <button type="button" className="global-ask-trigger" aria-expanded={open} onClick={()=>setOpen(x=>!x)}><span>Ask AVORA</span><small>Text or voice</small></button>
  {open&&<div className="global-ask-layer" role="dialog" aria-label="Ask AVORA"><header><div><small>AVORA LEARNING ASSISTANT</small><strong>What do you want to learn?</strong></div><button type="button" aria-label="Close Ask AVORA" onClick={()=>setOpen(false)}>×</button></header>
   <div className="global-ask-conversation">{turns.length?turns.map((t,i)=><div key={i} className={'global-ask-turn '+t.role}><small>{t.role==='student'?'You':'AVORA'}</small><p>{t.text}</p></div>):<div className="global-ask-empty"><b>Ask from anywhere in AVORA.</b><p>Use your voice or type a learning question. Inside a lesson, the lesson tutor still has the strongest topic context.</p></div>}</div>
   {transcript&&<div className="global-ask-transcript"><small>N-ATLAS heard</small><span>“{transcript}”</span></div>}
   {status&&<p className="global-ask-status" role="status">{status}</p>}
   <div className="global-ask-compose"><textarea rows={2} value={ask} onChange={e=>setAsk(e.target.value)} placeholder="Ask a learning question…"/><div><button type="button" onClick={toggleVoice} disabled={busy}>{recording?'Stop':'🎙 Voice'}</button><button type="button" onClick={()=>send()} disabled={busy||!ask.trim()}>{busy?'Working…':'Ask AVORA'}</button></div></div>
  </div>}
 </div>
}