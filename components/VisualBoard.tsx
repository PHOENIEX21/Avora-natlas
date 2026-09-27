'use client';
import type {VisualSpec} from '@/lib/visualTeaching';

function Axes(){
  return <svg viewBox="0 0 360 220" role="img" aria-label="Coordinate axes">
    <line x1="35" y1="110" x2="335" y2="110" className="v-stroke"/><line x1="180" y1="15" x2="180" y2="205" className="v-stroke"/>
    <path d="M335 110l-10-5v10zM180 15l-5 10h10z" className="v-fill"/><text x="340" y="105">x</text><text x="188" y="22">y</text>
    {[80,130,230,280].map(x=><line key={x} x1={x} y1="106" x2={x} y2="114" className="v-thin"/> )}
    {[55,165].map(y=><line key={y} x1="176" y1={y} x2="184" y2={y} className="v-thin"/> )}
  </svg>
}
function Triangle(){return <svg viewBox="0 0 360 220" role="img" aria-label="Labelled geometry figure"><path d="M65 180 L285 180 L115 45 Z" className="v-shape"/><text x="50" y="198">A</text><text x="292" y="198">B</text><text x="105" y="36">C</text><path d="M65 180h18v-18" className="v-thin"/><text x="155" y="205">base</text><text x="72" y="108">height</text></svg>}
function Polygon(){return <svg viewBox="0 0 360 220" role="img" aria-label="Polygon divided into triangles"><path d="M75 175 L45 85 L130 30 L260 55 L315 145 L210 195 Z" className="v-shape"/><line x1="75" y1="175" x2="130" y2="30" className="v-guide"/><line x1="75" y1="175" x2="260" y2="55" className="v-guide"/><line x1="75" y1="175" x2="315" y2="145" className="v-guide"/></svg>}

function PlaneShapes({caption}:{caption:string}){
 const t=caption.toLowerCase();
 const common=<><defs><marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L6,3.5 L0,7" className="v-fill"/></marker></defs></>;
 if(/circle|radius|diameter|chord|sector|segment|tangent|circumference/.test(t))return <svg viewBox="0 0 360 250" role="img" aria-label="Exact labelled circle showing centre, radius, diameter, chord, tangent, sector and segment"><title>Circle properties</title>{common}<circle cx="180" cy="125" r="82" className="v-shape"/><circle cx="180" cy="125" r="4" className="v-fill"/><text x="188" y="130">O</text><line x1="180" y1="125" x2="262" y2="125" className="v-accent"/><text x="218" y="116">radius</text><line x1="98" y1="125" x2="262" y2="125" className="v-stroke"/><text x="145" y="145">diameter</text><line x1="125" y1="74" x2="235" y2="74" className="v-guide"/><text x="164" y="65">chord</text><line x1="262" y1="35" x2="262" y2="215" className="v-stroke"/><circle cx="262" cy="125" r="3" className="v-fill"/><text x="270" y="94">tangent</text><path d="M180 125 L180 43 A82 82 0 0 1 250 83 Z" className="v-soft"/><text x="205" y="78">sector</text><path d="M125 74 A82 82 0 0 1 235 74 L125 74" className="v-arc"/><text x="146" y="42">arc / segment boundary</text></svg>;
 if(/triangle/.test(t))return <svg viewBox="0 0 360 230" role="img" aria-label="Equilateral, isosceles and scalene triangles with standard equality marks"><title>Triangle classification by side properties</title><g transform="translate(15 35)"><path d="M10 145L70 35l60 110z" className="v-shape"/><path d="M37 91l10 5M93 91l10-5M65 145v-11" className="v-accent"/><text x="29" y="172">equilateral</text></g><g transform="translate(125 35)"><path d="M10 145L70 35l75 110z" className="v-shape"/><path d="M37 91l10 5M101 91l10-5" className="v-accent"/><text x="38" y="172">isosceles</text></g><g transform="translate(245 35)"><path d="M5 145L50 45l92 100z" className="v-shape"/><text x="28" y="172">scalene</text></g></svg>;
 if(/rotation|rotated/.test(t))return <svg viewBox="0 0 360 230" role="img" aria-label="The same square shown upright and rotated, retaining equal-side and right-angle properties"><title>Rotation does not change a square</title><rect x="55" y="65" width="90" height="90" className="v-shape"/><g transform="rotate(45 255 110)"><rect x="210" y="65" width="90" height="90" className="v-shape"/></g><path d="M55 65h16v16M210 65h16v16" className="v-accent"/><text x="64" y="184">square</text><text x="213" y="184">same square, rotated</text></svg>;
 return <svg viewBox="0 0 360 285" role="img" aria-label="Accurate comparison of square, rectangle, parallelogram, rhombus, trapezium and kite with standard property markings"><title>Quadrilateral property comparison</title>{common}<g transform="translate(12 18)"><rect x="5" y="5" width="72" height="72" className="v-shape"/><path d="M5 5h12v12M39 5v9M39 77v-9M5 41h9M77 41h-9" className="v-accent"/><text x="18" y="98">square</text></g><g transform="translate(105 18)"><rect x="5" y="12" width="105" height="58" className="v-shape"/><path d="M5 12h12v12" className="v-accent"/><text x="25" y="98">rectangle</text></g><g transform="translate(235 18)"><path d="M25 12h92L97 72H5z" className="v-shape"/><text x="16" y="98">parallelogram</text></g><g transform="translate(10 150)"><path d="M45 5l42 42-42 42L3 47z" className="v-shape"/><path d="M23 26l8 8M59 26l8-8M23 68l8-8M59 68l8 8" className="v-accent"/><text x="20" y="112">rhombus</text></g><g transform="translate(120 150)"><path d="M25 8h75l20 78H5z" className="v-shape"/><text x="24" y="112">trapezium</text></g><g transform="translate(260 150)"><path d="M45 5l40 48-40 38L5 53z" className="v-shape"/><path d="M22 31l8 6M60 31l8-6M23 72l8-6M59 72l8 6" className="v-accent"/><text x="30" y="112">kite</text></g></svg>;
}

function NumberLine(){return <svg viewBox="0 0 360 150" role="img" aria-label="Number line"><line x1="35" y1="75" x2="330" y2="75" className="v-stroke"/><path d="M330 75l-10-5v10zM35 75l10-5v10z" className="v-fill"/>{[-3,-2,-1,0,1,2,3].map((n,i)=>{const x=60+i*42;return <g key={n}><line x1={x} y1="68" x2={x} y2="82" className="v-thin"/><text x={x-6} y="105">{n}</text></g>})}</svg>}
function Fraction(){return <svg viewBox="0 0 360 190" role="img" aria-label="Fraction area model"><rect x="55" y="45" width="250" height="90" rx="4" className="v-shape"/>{[1,2,3].map(i=><line key={i} x1={55+i*62.5} y1="45" x2={55+i*62.5} y2="135" className="v-thin"/>)}<rect x="55" y="45" width="125" height="90" className="v-soft"/><text x="115" y="165">equal parts of one whole</text></svg>}
function Place({binary=false}:{binary?:boolean}){const labels=binary?['8','4','2','1']:['1000','100','10','1'];return <div className="visual-place-grid">{labels.map((x,i)=><div key={x}><small>{binary?'2'+['³','²','¹','⁰'][i]:x}</small><strong>{x}</strong></div>)}</div>}
function Equations(){return <div className="visual-equations" aria-label="Aligned equation board"><div><span>Equation (1)</span><b>ax + by = c</b></div><div><span>Equation (2)</span><b>dx + ey = f</b></div><i/><p>Keep x-terms under x-terms and y-terms under y-terms before adding or subtracting.</p></div>}
function Construction(){return <svg viewBox="0 0 360 220" role="img" aria-label="Compass construction diagram"><line x1="55" y1="165" x2="305" y2="165" className="v-stroke"/><circle cx="110" cy="165" r="75" className="v-arc"/><circle cx="250" cy="165" r="75" className="v-arc"/><line x1="180" y1="35" x2="180" y2="205" className="v-guide"/><circle cx="110" cy="165" r="3" className="v-fill"/><circle cx="250" cy="165" r="3" className="v-fill"/></svg>}
function Bearing(){return <svg viewBox="0 0 360 220" role="img" aria-label="Bearing and reference line diagram"><line x1="180" y1="195" x2="180" y2="25" className="v-stroke"/><line x1="75" y1="110" x2="285" y2="110" className="v-thin"/><text x="170" y="20">N</text><text x="292" y="115">E</text><text x="170" y="215">S</text><text x="58" y="115">W</text><line x1="180" y1="110" x2="275" y2="55" className="v-accent"/><path d="M180 63 A47 47 0 0 1 220 86" className="v-arc"/><text x="214" y="61">θ</text></svg>}
function Angle(){return <svg viewBox="0 0 360 190" role="img" aria-label="Angle diagram"><line x1="85" y1="145" x2="300" y2="145" className="v-stroke"/><line x1="85" y1="145" x2="215" y2="45" className="v-stroke"/><path d="M145 145 A60 60 0 0 0 132 108" className="v-accent"/><circle cx="85" cy="145" r="4" className="v-fill"/><text x="140" y="118">θ</text><text x="72" y="165">vertex</text></svg>}
function Solid(){return <svg viewBox="0 0 360 220" role="img" aria-label="Three dimensional cuboid"><path d="M85 75h150v105H85zM85 75l45-35h150l-45 35M235 75l45-35v105l-45 35M85 180l45-35h150" className="v-shape"/><text x="145" y="203">length</text><text x="43" y="130">height</text></svg>}
function DataChart(){return <svg viewBox="0 0 360 220" role="img" aria-label="Data chart framework"><line x1="55" y1="180" x2="325" y2="180" className="v-stroke"/><line x1="55" y1="180" x2="55" y2="35" className="v-stroke"/><rect x="85" y="125" width="42" height="55" className="v-soft"/><rect x="155" y="85" width="42" height="95" className="v-soft"/><rect x="225" y="55" width="42" height="125" className="v-soft"/><text x="83" y="202">categories</text><text x="12" y="28">value</text></svg>}
function BarModel(){return <div className="visual-bar-model" aria-label="Equal-part ratio bar model">{[0,1,2,3,4].map(i=><span key={i}>{i+1}</span>)}</div>}

export default function VisualBoard({spec}:{spec:VisualSpec}){
 if(spec.kind==='none') return null;
 let body:React.ReactNode=null;
 if(spec.kind==='coordinate-plane') body=<Axes/>;
 else if(spec.kind==='number-line') body=<NumberLine/>;
 else if(spec.kind==='fraction-model') body=<Fraction/>;
 else if(spec.kind==='place-value') body=<Place/>;
 else if(spec.kind==='binary-place-value') body=<Place binary/>;
 else if(spec.kind==='aligned-equations') body=<Equations/>;
 else if(spec.kind==='triangle') body=<Triangle/>;
 else if(spec.kind==='polygon') body=<Polygon/>;
 else if(spec.kind==='plane-shapes') body=<PlaneShapes caption={`${spec.title} ${spec.caption}`}/>;
 else if(spec.kind==='construction') body=<Construction/>;
 else if(spec.kind==='bearing') body=<Bearing/>;
 else if(spec.kind==='angle') body=<Angle/>;
 else if(spec.kind==='solid') body=<Solid/>;
 else if(spec.kind==='data-chart') body=<DataChart/>;
 else if(spec.kind==='bar-model') body=<BarModel/>;
 return <section className="avora-visual-board"><header><b>{spec.title}</b><span>LIVE VISUAL</span></header><div className="avora-visual-stage">{body}</div><p>{spec.caption}</p></section>
}
