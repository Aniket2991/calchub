 "use client";

import { useMemo, useState } from "react";
import { calculatorCatalog } from "../lib/calculators";

function Field({ label, value, setValue, suffix }: { label: string; value: string; setValue: (v:string)=>void; suffix?:string }) {
  return <label className="field"><span>{label}</span><div className="input-wrap"><input inputMode="decimal" value={value} onChange={e=>setValue(e.target.value)} placeholder="0"/>{suffix && <b>{suffix}</b>}</div></label>;
}

function gcd(a:number,b:number){a=Math.abs(a);b=Math.abs(b);while(b){const t=b;b=a%b;a=t}return a||1}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = calculatorCatalog.find(c => c.slug === params.slug);
  const [a,setA]=useState(""); const [b,setB]=useState(""); const [c,setC]=useState("");
  const [d,setD]=useState(""); const [result,setResult]=useState("Enter values and calculate");
  const [unit,setUnit]=useState("km"); const [to,setTo]=useState("mi");
  const [shape,setShape]=useState("circle");

  const calculate = () => {
    const A=Number(a), B=Number(b), C=Number(c), D=Number(d);
    if (!calc) return;
    let r = "";
    switch(calc.slug){
      case "emi-calculator": { const rate=B/12/100,n=C*12; const emi=rate&&n?A*rate*Math.pow(1+rate,n)/(Math.pow(1+rate,n)-1):n?A/n:0; r=emi>0?`₹${emi.toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break; }
      case "sip-calculator": { const n=C*12, rate=B/12/100; const fv=rate&&n?A*((Math.pow(1+rate,n)-1)/rate)*(1+rate):A*n; r=fv>0?`₹${fv.toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break; }
      case "gst-calculator": r=A?`₹${(A + A*B/100).toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break;
      case "discount-calculator": r=A&&B?`₹${(A-A*B/100).toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break;
      case "simple-interest-calculator": r=A&&B&&C?`₹${(A+A*B*C/100).toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break;
      case "compound-interest-calculator": { const n=D||1; const x=A*Math.pow(1+B/(100*n),n*C); r=x>0?`₹${x.toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break; }
      case "fd-calculator": { const n=4; const x=A*Math.pow(1+B/(100*n),n*C); r=x>0?`₹${x.toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break; }
      case "rd-calculator": { const months=C*12; const x=A*months + A*(B/100)*(months*(months+1)/24); r=x>0?`₹${x.toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break; }
      case "profit-loss-calculator": { const diff=B-A; r=A&&B?`${diff>=0?"Profit":"Loss"}: ₹${Math.abs(diff).toLocaleString("en-IN",{maximumFractionDigits:2})} (${(Math.abs(diff)/A*100).toFixed(2)}%)`:"Enter valid values"; break; }
      case "inflation-calculator": r=A&&B&&C?`₹${(A*Math.pow(1+B/100,C)).toLocaleString("en-IN",{maximumFractionDigits:2})}`:"Enter valid values"; break;
      case "percentage-calculator": r=A&&B?`${(A*B/100).toFixed(2)}`:"Enter valid values"; break;
      case "ratio-calculator": { const g=gcd(A,B); r=A&&B?`${A/g} : ${B/g}`:"Enter valid values"; break; }
      case "average-calculator": { const nums=a.split(",").map(Number).filter(Number.isFinite); r=nums.length?`${nums.reduce((x,y)=>x+y,0)/nums.length}`:"Enter comma-separated numbers"; break; }
      case "lcm-hcf-calculator": { const g=gcd(A,B); const l=Math.abs(A*B)/g; r=A&&B?`HCF: ${g} • LCM: ${l}`:"Enter valid integers"; break; }
      case "probability-calculator": r=A&&B?`${(A/B*100).toFixed(2)}%`:"Enter valid values"; break;
      case "bmi-calculator": { const bmi=A/Math.pow(B/100,2); r=A&&B?`${bmi.toFixed(1)} — ${bmi<18.5?"Underweight":bmi<25?"Healthy range":bmi<30?"Overweight":"Obesity range"}`:"Enter valid values"; break; }
      case "bmr-calculator": { const sex=C===2? -161:5; const bmr=10*A+6.25*B-5*D+sex; r=A&&B&&D?`${bmr.toFixed(0)} kcal/day`:"Use weight, height, age and select sex (1 male / 2 female)"; break; }
      case "calorie-calculator": { const bmr=A, factor=B||1.2; r=bmr?`${(bmr*factor).toFixed(0)} kcal/day`:"Enter BMR and activity factor"; break; }
      case "ideal-weight-calculator": r=B?`~${(B-100).toFixed(1)} kg reference estimate`:"Enter height in cm"; break;
      case "age-calculator": { const dob=new Date(a+"T00:00:00"), now=new Date(); let y=now.getFullYear()-dob.getFullYear(); if(now.getMonth()<dob.getMonth()||(now.getMonth()===dob.getMonth()&&now.getDate()<dob.getDate()))y--; r=a&&!Number.isNaN(dob.getTime())?`${Math.max(0,y)} years`:"Choose a date"; break; }
      case "length-converter": case "weight-converter": case "temperature-converter": case "area-converter": case "volume-converter": case "speed-converter": {
        if(!a){r="Enter a value";break}
        const key=calc.slug;
        if(key==="length-converter") r=unit==="km"&&to==="mi"?`${(A*.621371).toFixed(4)} mi`:unit==="mi"&&to==="km"?`${(A*1.609344).toFixed(4)} km`:`${A} ${to}`;
        else if(key==="weight-converter") r=unit==="kg"&&to==="lb"?`${(A*2.20462).toFixed(4)} lb`:unit==="lb"&&to==="kg"?`${(A/2.20462).toFixed(4)} kg`:`${A} ${to}`;
        else if(key==="temperature-converter") r=unit==="c"&&to==="f"?`${(A*9/5+32).toFixed(2)} °F`:unit==="f"&&to==="c"?`${((A-32)*5/9).toFixed(2)} °C`:`${A} ${to}`;
        else r=`${A} ${to}`;
        break;
      }
      default: r="This calculator page is ready; add the specific formula in the calculator engine.";
    }
    setResult(r);
  };

  if(!calc) return <main className="legal"><h1>Calculator not found</h1><a href="/">← Back to CalcHub</a></main>;

  const isConv = calc.category==="Conversion";
  const fields = {
    Finance: calc.slug==="emi-calculator"?["Loan amount","Annual interest rate","Tenure years"]:calc.slug==="sip-calculator"?["Monthly investment","Expected return","Years"]:calc.slug==="gst-calculator"?["Amount","GST rate"]:calc.slug==="discount-calculator"?["Original price","Discount"]:calc.slug==="simple-interest-calculator"?["Principal","Rate","Time"]:calc.slug==="compound-interest-calculator"?["Principal","Rate","Years","Compounds/year"]:calc.slug==="fd-calculator"?["Principal","Rate","Years"]:calc.slug==="rd-calculator"?["Monthly deposit","Rate","Years"]:calc.slug==="profit-loss-calculator"?["Cost price","Selling price"]:["Present value","Rate","Years"],
    Math: calc.slug==="average-calculator"?["Numbers separated by commas"]:calc.slug==="percentage-calculator"?["Number","Percentage"]:calc.slug==="ratio-calculator"||calc.slug==="lcm-hcf-calculator"||calc.slug==="probability-calculator"?["First / favorable","Second / total"]:["Value","Second value"],
    Health: calc.slug==="bmi-calculator"?["Weight","Height"]:calc.slug==="bmr-calculator"?["Weight","Height","Sex (1 male / 2 female)","Age"]:calc.slug==="calorie-calculator"?["BMR","Activity factor"]:["Height"],
  } as Record<string,string[]>;
  const labels = isConv?["Value","From unit","To unit"]:calc.slug==="age-calculator"?["Date of birth"]:fields[calc.category]||["Value","Second value"];

  return <main>
    <header className="nav"><div className="brand"><span>✦</span> Calc<span>Hub</span></div><div className="nav-links"><a href="/">Home</a><a href="/#calculators">All calculators</a></div></header>
    <section className="calculator-page">
      <div className="breadcrumbs"><a href="/">CalcHub</a> / {calc.category} / {calc.name}</div>
      <div className="seo-head"><span className="eyebrow">{calc.category.toUpperCase()}</span><h1>{calc.name}</h1><p>{calc.description}</p></div>
      <div className="ad-slot">ADVERTISEMENT</div>
      <div className="calculator-box">
        <div className="form-area">
          {calc.slug==="age-calculator"?<Field label={labels[0]} value={a} setValue={setA}/>:
           isConv?<><Field label="Value" value={a} setValue={setA}/><div className="grid2"><label className="field"><span>From</span><select value={unit} onChange={e=>setUnit(e.target.value)}><option value="km">Kilometres</option><option value="mi">Miles</option><option value="kg">Kilograms</option><option value="lb">Pounds</option><option value="c">°C</option><option value="f">°F</option></select></label><label className="field"><span>To</span><select value={to} onChange={e=>setTo(e.target.value)}><option value="mi">Miles</option><option value="km">Kilometres</option><option value="lb">Pounds</option><option value="kg">Kilograms</option><option value="f">°F</option><option value="c">°C</option></select></label></div></>:
           calc.slug==="average-calculator"?<Field label={labels[0]} value={a} setValue={setA}/>:
           <div className="grid2">{labels.map((label,i)=><Field key={label} label={label} value={[a,b,c,d][i]} setValue={[setA,setB,setC,setD][i]}/>)}</div>}
          <button className="hero-btn calc-submit" onClick={calculate}>Calculate</button>
        </div>
        <div className="result result-large"><span>RESULT</span><strong>{result}</strong><small>For informational purposes. Verify important financial or health decisions with appropriate professional sources.</small></div>
      </div>
      <article className="seo-content"><h2>How to use the {calc.name}</h2><p>Enter the required values above and select <strong>Calculate</strong>. CalcHub performs the calculation instantly in your browser.</p><h2>Formula</h2><p>{calc.formula}</p><h2>Frequently asked questions</h2><h3>Is this calculator free?</h3><p>Yes. CalcHub's core calculators are designed to be free to use.</p><h3>Are the results exact?</h3><p>Results depend on the inputs, assumptions and rounding used. Financial and health calculations are estimates unless otherwise stated.</p></article>
    </section>
    <footer><div className="brand">✦ Calc<span>Hub</span></div><nav><a href="/about">About</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></nav><span>© 2026 CalcHub</span></footer>
  </main>;
}