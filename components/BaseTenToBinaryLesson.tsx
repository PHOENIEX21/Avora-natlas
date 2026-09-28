'use client';

type LessonUnit={title?:string;outcomes?:string[];sourceSteps?:string[];commonMistakes?:string[]};

function splitHeading(text:string){
 const m=text.match(/^((?:\d+\.\s*)?[^.]+\.)\s*(.*)$/s);
 return m?[m[1],m[2]]:[null,text];
}
function tableFromDivision(text:string){
 const lines=text.split('\n').map(x=>x.trim()).filter(x=>/\d+\s*÷\s*2\s*=/.test(x));
 if(!lines.length)return null;
 return <div className="wn-examples"><b>Repeated-division working</b>{lines.map((x,i)=><p key={i}>{x.replace(/[│┐┘┌└─]+/g,' ').trim()}</p>)}</div>;
}
export default function BaseTenToBinaryLesson({unit,onExercise}:{unit:LessonUnit;onExercise:()=>void}){
 const raw=(unit.sourceSteps||[]).filter(Boolean);
 const objectives=unit.outcomes||[];
 const steps=raw.filter(x=>x!=='What you will learn'&&!objectives.includes(x));
 return <article className="wn-lesson base-ten-binary-lesson">
  <header className="wn-hero"><span>JSS1 MATHEMATICS · NERDC-ALIGNED LESSON</span><h2>Conversion of Base 10 Numerals to Binary Numbers</h2><p>Learn two reliable conversion methods, understand why they work, and verify every answer using binary place value.</p></header>
  <section className="wn-objectives"><h3>What you will learn</h3><ul>{objectives.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section className="wn-section"><h3>Before you begin</h3><p>You should already understand binary counting, powers of two such as 1, 2, 4, 8 and 16, and division with remainders.</p></section>
  {steps.map((text,i)=>{
   const clean=String(text).trim(); const [heading,body]=splitHeading(clean);
   const isExample=/^Worked example/i.test(clean); const isMistake=/^Common mistake/i.test(clean); const isMastery=/^MASTERY/i.test(clean);
   const table=clean.includes('÷2')||clean.includes('÷ 2')?tableFromDivision(clean):null;
   if(isMastery)return <section key={i} className="wn-finish"><b>Mastery Check</b><p>{body||clean}</p></section>;
   if(isExample)return <section key={i} className="wn-section"><div className="wn-examples"><b>{heading||'Worked example'}</b>{body&&<p>{body.replace(/\`\`\`[\s\S]*?\`\`\`/g,'').trim()}</p>}{table}</div></section>;
   if(isMistake)return <section key={i} className="wn-section"><div className="wn-examples"><b>{heading||'Common misconception'}</b>{body&&<p>{body}</p>}</div></section>;
   if(heading&&(/^\d+\./.test(heading)||/^[A-Z][A-Z\s—-]+\./.test(heading)))return <section key={i} className="wn-section"><h3>{heading}</h3>{body&&<p>{body}</p>}{table}</section>;
   return <section key={i} className="wn-section"><p>{clean}</p>{table}</section>;
  })}
  <section className="wn-finish"><b>Ready to practise?</b><p>Use the exercise to prove that you can convert correctly and check your answer independently.</p><button type="button" onClick={onExercise}>Start conversion exercise →</button></section>
 </article>
}
