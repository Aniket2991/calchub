 "use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { calculators, getCalculator } from "../../../lib/calculators";

type Values = Record<string,string>;

function money(n:number) { return "₹" + n.toLocaleString("en-IN",{maximumFractionDigits:2}); }
function num(v:string) { return Number(v) || 0; }

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = getCalculator(params.slug);
  const [v,setV] = useState<Values>({});
  const [result,setResult] = useState<string>("Enter values and calculate.");
  const [rows,setRows] = useState<[string,string][]>([]);

  const related = useMemo(() => calculators.filter(c => c.category === calc?.category && c.slug !== calc?.slug).slice(0,3), [calc]);

  if (!calc) return <main className="container section"><h1>Calculator not found</h1><Link href="/">Back to CalcHub</Link></main>;

  const set = (k:string,x:string) => setV(p=>({...p,[k]:x}));
  const field = (label:string,key:string,type="number",placeholder="") => (
    <div className="field"><label>{label}</label><input type={type} value={v[key]||""} placeholder={placeholder} onChange={e=>set(key,e.target.value)} /></div>
  );

  function calculate() {
    let r=""; let rr:[string,string][]=[];
    switch(calc.slug) {
      case "emi-calculator": {
        const P=num(v.p), annual=num(v.rate), n=num(v.months), m=annual/12/100;
        const emi = m===0 ? P/n : P*m*Math.pow(1+m,n)/(Math.pow(1+m,n)-1);
        r=money(emi); rr=[["Loan amount",money(P)],["Total payment",money(emi*n)],["Total interest",money(emi*n-P)]]; break;
      }
      case "sip-calculator": {
        const p=num(v.p), rate=num(v.rate)/100/12, n=num(v.months);
        const fv = rate===0 ? p*n : p*((Math.pow(1+rate,n)-1)/rate)*(1+rate);
        r=money(fv); rr=[["Invested amount",money(p*n)],["Estimated gain",money(fv-p*n)]]; break;
      }
      case "gst-calculator": {
        const a=num(v.amount), g=num(v.gst)/100, mode=v.mode||"add";
        const total=mode==="add"?a*(1+g):a/(1+g);
        const gst=mode==="add"?a*g:a-total;
        r=money(total); rr=[["GST amount",money(gst)],["Base amount",money(mode==="add"?a:total)]]; break;
      }
      case "discount-calculator": {
        const p=num(v.price), d=num(v.discount), save=p*d/100;
        r=money(p-save); rr=[["Original price",money(p)],["You save",money(save)],["Discount",d+"%"]]; break;
      }
      case "simple-interest": {
        const p=num(v.p), rate=num(v.rate), years=num(v.years), interest=p*rate*years/100;
        r=money(p+interest); rr=[["Principal",money(p)],["Interest",money(interest)]]; break;
      }
      case "compound-interest": {
        const p=num(v.p), rate=num(v.rate)/100, years=num(v.years), n=num(v.frequency)||1;
        const a=p*Math.pow(1+rate/n,n*years);
        r=money(a); rr=[["Principal",money(p)],["Interest",money(a-p)]]; break;
      }
      case "percentage-calculator": {
        const a=num(v.a), b=num(v.b); r=(a*b/100).toLocaleString("en-IN",{maximumFractionDigits:4}); rr=[["Percentage",b+"% of "+a]]; break;
      }
      case "average-calculator": {
        const nums=(v.numbers||"").split(",").map(Number).filter(x=>!Number.isNaN(x));
        const avg=nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:0;
        r=avg.toLocaleString("en-IN",{maximumFractionDigits:4}); rr=[["Numbers",String(nums.length)]]; break;
      }
      case "bmi-calculator": {
        const kg=num(v.weight), cm=num(v.height), bmi=kg/Math.pow(cm/100,2);
        const status=bmi<18.5?"Underweight":bmi<25?"Healthy range":bmi<30?"Overweight":"Obesity";
        r=bmi.toFixed(1); rr=[["Category",status]]; break;
      }
      case "age-calculator": {
        if(!v.dob){r="Select your date of birth.";break;}
        const birth=new Date(v.dob+"T00:00:00"), now=new Date();
        let years=now.getFullYear()-birth.getFullYear(), months=now.getMonth()-birth.getMonth(), days=now.getDate()-birth.getDate();
        if(days<0){months--; const prev=new Date(now.getFullYear(),now.getMonth(),0); days+=prev.getDate();}
        if(months<0){years--;months+=12;}
        r=`${years} years, ${months} months, ${days} days`; rr=[["Date of birth",birth.toLocaleDateString("en-IN")]]; break;
      }
      case "date-difference": {
        const a=new Date((v.start||"")+"T00:00:00"), b=new Date((v.end||"")+"T00:00:00");
        const days=Math.round(Math.abs(b.getTime()-a.getTime())/86400000);
        r=days+" days"; rr=[["Approx. weeks",(days/7).toFixed(1)]]; break;
      }
      case "length-converter": {
        const x=num(v.value), from=v.from||"m", to=v.to||"ft";
        const m:{[k:string]:number}={mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344};
        r=(x*m[from]/m[to]).toLocaleString("en-IN",{maximumFractionDigits:6})+" "+to; break;
      }
      case "weight-converter": {
        const x=num(v.value), from=v.from||"kg", to=v.to||"lb";
        const kg:{[k:string]:number}={g:.001,kg:1,lb:.45359237,oz:.0283495231};
        r=(x*kg[from]/kg[to]).toLocaleString("en-IN",{maximumFractionDigits:6})+" "+to; break;
      }
      case "temperature-converter": {
        const x=num(v.value), from=v.from||"C", to=v.to||"F";
        let c=from==="C"?x:from==="F"?(x-32)*5/9:x-273.15;
        let out=to==="C"?c:to==="F"?c*9/5+32:c+273.15;
        r=out.toLocaleString("en-IN",{maximumFractionDigits:4})+" °"+to; break;
      }
      default: r="This calculator is being expanded. Try one of the available calculators from the home page.";
    }
    setResult(r); setRows(rr);
  }

  function reset(){setV({});setResult("Enter values and calculate.");setRows([]);}

  const common = () => {
    switch(calc.slug) {
      case "emi-calculator": return <>{field("Loan amount","p")} {field("Annual interest rate (%)","rate")} {field("Loan tenure (months)","months")}</>;
      case "sip-calculator": return <>{field("Monthly investment","p")} {field("Expected annual return (%)","rate")} {field("Number of months","months")}</>;
      case "gst-calculator": return <>{field("Amount","amount")} {field("GST rate (%)","gst")} <div className="field"><label>Mode</label><select value={v.mode||"add"} onChange={e=>set("mode",e.target.value)}><option value="add">Add GST</option><option value="remove">Remove GST</option></select></div></>;
      case "discount-calculator": return <>{field("Original price","price")} {field("Discount (%)","discount")}</>;
      case "simple-interest": return <>{field("Principal","p")} {field("Rate (%)","rate")} {field("Time (years)","years")}</>;
      case "compound-interest": return <>{field("Principal","p")} {field("Rate (%)","rate")} {field("Time (years)","years")} {field("Compounding per year","frequency")}</>;
      case "percentage-calculator": return <>{field("Number","a")} {field("Percentage (%)","b")}</>;
      case "average-calculator": return <div className="field full"><label>Numbers (comma separated)</label><input value={v.numbers||""} placeholder="10, 20, 30, 40" onChange={e=>set("numbers",e.target.value)} /></div>;
      case "bmi-calculator": return <>{field("Weight (kg)","weight")} {field("Height (cm)","height")}</>;
      case "age-calculator": return <div className="field full"><label>Date of birth</label><input type="date" value={v.dob||""} onChange={e=>set("dob",e.target.value)} /></div>;
      case "date-difference": return <>{field("Start date","start","date")} {field("End date","end","date")}</>;
      case "length-converter": return <>{field("Value","value")} <div className="field"><label>From</label><select value={v.from||"m"} onChange={e=>set("from",e.target.value)}>{["mm","cm","m","km","in","ft","yd","mi"].map(x=><option key={x}>{x}</option>)}</select></div><div className="field"><label>To</label><select value={v.to||"ft"} onChange={e=>set("to",e.target.value)}>{["mm","cm","m","km","in","ft","yd","mi"].map(x=><option key={x}>{x}</option>)}</select></div></>;
      case "weight-converter": return <>{field("Value","value")} <div className="field"><label>From</label><select value={v.from||"kg"} onChange={e=>set("from",e.target.value)}>{["g","kg","lb","oz"].map(x=><option key={x}>{x}</option>)}</select></div><div className="field"><label>To</label><select value={v.to||"lb"} onChange={e=>set("to",e.target.value)}>{["g","kg","lb","oz"].map(x=><option key={x}>{x}</option>)}</select></div></>;
      case "temperature-converter": return <>{field("Value","value")} <div className="field"><label>From</label><select value={v.from||"C"} onChange={e=>set("from",e.target.value)}>{["C","F","K"].map(x=><option key={x}>{x}</option>)}</select></div><div className="field"><label>To</label><select value={v.to||"F"} onChange={e=>set("to",e.target.value)}>{["C","F","K"].map(x=><option key={x}>{x}</option>)}</select></div></>;
      default: return <div className="notice">This calculator page is ready for expansion. More formulas can be added without changing the site design.</div>;
    }
  };

  return (
    <>
      <header className="header"><div className="container nav"><Link className="logo" href="/"><span className="logoMark">+</span>CalcHub</Link><nav className="navLinks"><Link href="/">All calculators</Link><Link href="/about">About</Link></nav></div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / {calc.category} / {calc.name}</div>
        <section className="calcHero"><div className="eyebrow">{calc.category}</div></section>
        <div className="calcLayout">
          <section className="panel">
            <h1>{calc.name}</h1><p className="lead">{calc.description}</p>
            <div className="fields">{common()}</div>
            <div className="actions"><button className="primary" onClick={calculate}>Calculate</button><button className="secondary" onClick={reset}>Reset</button></div>
          </section>
          <aside className="result">
            <div className="resultLabel">Your result</div>
            <div className="resultValue">{result}</div>
            <div className="resultNote">Use the result as an estimate. Check the assumptions and inputs before relying on it for an important decision.</div>
            {rows.length>0 && <div className="resultRows">{rows.map(([a,b])=><div className="resultRow" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>}
          </aside>
        </div>

        <section className="panel contentSection">
          <h2>About this calculator</h2>
          <p>{calc.name} is designed to give you a quick estimate from the values you enter. Keep your inputs accurate and use the result as a reference.</p>
          <h2>How to use it</h2>
          <ol><li>Enter the required values.</li><li>Review the inputs.</li><li>Press Calculate to see the result.</li></ol>
        </section>

        {related.length>0 && <section className="section"><div className="sectionHead"><div><h2>Related calculators</h2><p>More tools from {calc.category}.</p></div></div><div className="related">{related.map(c=><Link className="card" href={`/calculator/${c.slug}`} key={c.slug}><div className="icon">{c.icon}</div><h3>{c.name}</h3><p>{c.description}</p></Link>)}</div></section>}
      </main>
      <footer className="footer"><div className="container footerGrid"><div className="logo"><span className="logoMark">+</span>CalcHub</div><div className="footerLinks"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div></footer>
    </>
  );
}