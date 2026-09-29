 "use client";
import Link from "next/link";
import { useState } from "react";
import { calculators, getCalculator } from "../../../lib/calculators";
import { calculatorContent } from "../../../lib/calculator-content";
type Values = Record<string,string>;

function money(n:number) { return "₹" + n.toLocaleString("en-IN",{maximumFractionDigits:2}); }
function num(v:string) { return Number(v) || 0; }

export default function CalculatorClient({ slug }: { slug: string }) {
  const calc = getCalculator(slug);
  const [v,setV] = useState<Values>({});
  const [result,setResult] = useState<string>("Enter values and calculate.");
  const [rows,setRows] = useState<[string,string][]>([]);

  if (!calc) return <main className="container section"><h1>Calculator not found</h1><Link href="/">Back to CalcHub</Link></main>;

  const calculator = calc;
const content = calculatorContent[calculator.slug];
const related = calculators
  .filter(
    c =>
      c.category === calculator.category &&
      c.slug !== calculator.slug
  )
  .slice(0, 3);
  
  const set = (k: string, x: string) =>
  setV((p) => ({ ...p, [k]: x }));
  const field = (label:string,key:string,type="number",placeholder="") => (
<div className="field"><label>{label}</label><input type={type} value={v[key]||""} placeholder={placeholder} onChange={e=>set(key,e.target.value)} /></div>
  );

  function calculate() {
    let r=""; let rr:[string,string][]=[];
    switch(calculator.slug) {
      case "emi-calculator": {
        const P=num(v.p), annual=num(v.rate), n=num(v.months), m=annual/12/100;
        const emi = m===0 ? P/n : P*m*Math.pow(1+m,n)/(Math.pow(1+m,n)-1);
        r=money(emi); rr=[["Loan amount",money(P)],["Total payment",money(emi*n)],["Total interest",money(emi*n-P)]]; break;
      }
     case "loan-calculator": {
  const P = num(v.p);
  const annual = num(v.rate);
  const n = num(v.months);
  const monthlyRate = annual / 12 / 100;

  const payment =
    monthlyRate === 0
      ? P / n
      : P *
        monthlyRate *
        Math.pow(1 + monthlyRate, n) /
        (Math.pow(1 + monthlyRate, n) - 1);

  const totalPayment = payment * n;
  const totalInterest = totalPayment - P;

  r = money(payment);

  rr = [
    ["Loan amount", money(P)],
    ["Total payment", money(totalPayment)],
    ["Total interest", money(totalInterest)],
  ];

  break;
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
      case "salary-calculator": {
  const gross = num(v.gross);
  const deductions = num(v.deductions);

  const takeHome = gross - deductions;

  r = money(takeHome);

  rr = [
    ["Gross monthly salary", money(gross)],
    ["Total deductions", money(deductions)],
    ["Estimated annual take-home", money(takeHome * 12)],
  ];

  break;
}

case "income-tax-calculator": {
  const income = num(v.income);
  const regime = v.regime || "new";

  function calculateNewTax(x: number) {
    let tax = 0;

    if (x > 2400000) {
      tax += (x - 2400000) * 0.30;
      x = 2400000;
    }

    if (x > 2000000) {
      tax += (x - 2000000) * 0.25;
      x = 2000000;
    }

    if (x > 1600000) {
      tax += (x - 1600000) * 0.20;
      x = 1600000;
    }

    if (x > 1200000) {
      tax += (x - 1200000) * 0.15;
      x = 1200000;
    }

    if (x > 800000) {
      tax += (x - 800000) * 0.10;
      x = 800000;
    }

    if (x > 400000) {
      tax += (x - 400000) * 0.05;
    }

    return tax;
  }

  function calculateOldTax(x: number) {
    let tax = 0;

    if (x > 1000000) {
      tax += (x - 1000000) * 0.30;
      x = 1000000;
    }

    if (x > 500000) {
      tax += (x - 500000) * 0.20;
      x = 500000;
    }

    if (x > 250000) {
      tax += (x - 250000) * 0.05;
    }

    return tax;
  }

  let tax =
    regime === "new"
      ? calculateNewTax(income)
      : calculateOldTax(income);

  if (regime === "new" && income <= 1200000) {
    tax = 0;
  }

  if (regime === "old" && income <= 500000) {
    tax = Math.max(0, tax - 12500);
  }

  const cess = tax * 0.04;
  const totalTax = tax + cess;

  r = money(totalTax);

  rr = [
    ["Tax before cess", money(tax)],
    ["Health & education cess", money(cess)],
    ["Estimated total tax", money(totalTax)],
  ];

  break;
}

case "profit-loss-calculator": {
  const cost = num(v.cost);
  const selling = num(v.selling);

  const difference = selling - cost;

  if (difference >= 0) {
    const profitPercent = cost ? (difference / cost) * 100 : 0;

    r = money(difference);

    rr = [
      ["Status", "Profit"],
      ["Profit", money(difference)],
      ["Profit percentage", profitPercent.toFixed(2) + "%"],
    ];
  } else {
    const loss = Math.abs(difference);
    const lossPercent = cost ? (loss / cost) * 100 : 0;

    r = money(loss);

    rr = [
      ["Status", "Loss"],
      ["Loss", money(loss)],
      ["Loss percentage", lossPercent.toFixed(2) + "%"],
    ];
  }

  break;
}

case "percentage-change-calculator": {
  const original = num(v.original);
  const current = num(v.current);

  if (original === 0) {
    r = "Original value cannot be 0.";
    break;
  }

  const change = ((current - original) / Math.abs(original)) * 100;

  r = change.toFixed(2) + "%";

  rr = [
    ["Original value", original.toLocaleString("en-IN")],
    ["New value", current.toLocaleString("en-IN")],
    ["Change", change >= 0 ? "Increase" : "Decrease"],
  ];

  break;
}

case "ratio-calculator": {
  const a = Math.abs(Math.round(num(v.a)));
  const b = Math.abs(Math.round(num(v.b)));

  if (!a || !b) {
    r = "Enter two positive numbers.";
    break;
  }

  function gcd(x: number, y: number): number {
    while (y) {
      const temp = y;
      y = x % y;
      x = temp;
    }

    return x;
  }

  const divisor = gcd(a, b);

  r = `${a / divisor}:${b / divisor}`;

  rr = [
    ["Original ratio", `${a}:${b}`],
    ["Simplified ratio", r],
  ];

  break;
}

case "fraction-calculator": {
  const n1 = Math.round(num(v.n1));
  const d1 = Math.round(num(v.d1));
  const n2 = Math.round(num(v.n2));
  const d2 = Math.round(num(v.d2));
  const operation = v.operation || "add";

  if (d1 === 0 || d2 === 0) {
    r = "Denominator cannot be 0.";
    break;
  }

  let numerator = 0;
  let denominator = 1;

  if (operation === "add") {
    numerator = n1 * d2 + n2 * d1;
    denominator = d1 * d2;
  } else if (operation === "subtract") {
    numerator = n1 * d2 - n2 * d1;
    denominator = d1 * d2;
  } else if (operation === "multiply") {
    numerator = n1 * n2;
    denominator = d1 * d2;
  } else {
    if (n2 === 0) {
      r = "Cannot divide by zero.";
      break;
    }

    numerator = n1 * d2;
    denominator = d1 * n2;
  }

  const divisor = Math.abs(
    (() => {
      let a = Math.abs(numerator);
      let b = Math.abs(denominator);

      while (b) {
        const temp = b;
        b = a % b;
        a = temp;
      }

      return a || 1;
    })()
  );

  numerator /= divisor;
  denominator /= divisor;

  if (denominator < 0) {
    numerator *= -1;
    denominator *= -1;
  }

  r =
    denominator === 1
      ? String(numerator)
      : `${numerator}/${denominator}`;

  rr = [["Result", r]];

  break;
}

case "time-calculator": {
  const h1 = num(v.h1);
  const m1 = num(v.m1);
  const h2 = num(v.h2);
  const m2 = num(v.m2);
  const operation = v.operation || "add";

  const first = h1 * 60 + m1;
  const second = h2 * 60 + m2;

  let total =
    operation === "subtract"
      ? first - second
      : first + second;

  total = ((total % 1440) + 1440) % 1440;

  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  r = `${hours} hours ${minutes} minutes`;

  rr = [
    ["Total minutes", String(total)],
  ];

  break;
}

case "hours-calculator": {
  const start = v.startTime || "";
  const end = v.endTime || "";

  if (!start || !end) {
    r = "Enter both times.";
    break;
  }

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  if (endMinutes < startMinutes) {
    endMinutes += 1440;
  }

  const duration = endMinutes - startMinutes;

  r = `${Math.floor(duration / 60)} hours ${
    duration % 60
  } minutes`;

  rr = [
    ["Total minutes", String(duration)],
  ];

  break;
}

case "age-difference-calculator": {
  if (!v.dob1 || !v.dob2) {
    r = "Select both dates.";
    break;
  }

  const first = new Date(v.dob1 + "T00:00:00");
  const second = new Date(v.dob2 + "T00:00:00");

  const older = first < second ? first : second;
  const newer = first < second ? second : first;

  let years = newer.getFullYear() - older.getFullYear();
  let months = newer.getMonth() - older.getMonth();
  let days = newer.getDate() - older.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      newer.getFullYear(),
      newer.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  r = `${years} years, ${months} months, ${days} days`;

  rr = [
    ["Earlier date", older.toLocaleDateString("en-IN")],
    ["Later date", newer.toLocaleDateString("en-IN")],
  ];

  break;
}

case "area-calculator": {
  const shape = v.shape || "rectangle";
  const a = num(v.a);
  const b = num(v.b);

  let area = 0;

  if (shape === "rectangle") {
    area = a * b;
  } else if (shape === "triangle") {
    area = 0.5 * a * b;
  } else {
    area = Math.PI * a * a;
  }

  r = area.toLocaleString("en-IN", {
    maximumFractionDigits: 6,
  });

  rr = [
    ["Shape", shape],
    ["Area", "square units"],
  ];

  break;
}

case "volume-calculator": {
  const shape = v.shape || "cuboid";
  const a = num(v.a);
  const b = num(v.b);
  const c = num(v.c);

  let volume = 0;

  if (shape === "cuboid") {
    volume = a * b * c;
  } else if (shape === "cylinder") {
    volume = Math.PI * a * a * b;
  } else {
    volume = (4 / 3) * Math.PI * Math.pow(a, 3);
  }

  r = volume.toLocaleString("en-IN", {
    maximumFractionDigits: 6,
  });

  rr = [
    ["Shape", shape],
    ["Volume", "cubic units"],
  ];

  break;
}

case "speed-calculator": {
  const distance = num(v.distance);
  const time = num(v.time);

  if (time === 0) {
    r = "Time cannot be 0.";
    break;
  }

  const speed = distance / time;

  r = speed.toLocaleString("en-IN", {
    maximumFractionDigits: 4,
  });

  rr = [
    ["Distance", distance.toLocaleString("en-IN")],
    ["Time", time.toLocaleString("en-IN")],
    ["Average speed", r],
  ];

  break;
}

case "fuel-cost-calculator": {
  const distance = num(v.distance);
  const mileage = num(v.mileage);
  const fuelPrice = num(v.fuelPrice);

  if (mileage === 0) {
    r = "Mileage cannot be 0.";
    break;
  }

  const fuelUsed = distance / mileage;
  const cost = fuelUsed * fuelPrice;

  r = money(cost);

  rr = [
    ["Distance", distance + " km"],
    ["Fuel required", fuelUsed.toFixed(2) + " L"],
    ["Fuel price", money(fuelPrice) + "/L"],
  ];

  break;
}
      default: r="This calculator is being expanded. Try one of the available calculators from the home page.";
    }
    setResult(r); setRows(rr);
  }

  function reset(){setV({});setResult("Enter values and calculate.");setRows([]);}

  const common = () => {
    switch(calculator.slug) {
      case "emi-calculator": return <>{field("Loan amount","p")} {field("Annual interest rate (%)","rate")} {field("Loan tenure (months)","months")}</>;
      case "loan-calculator":
  return (
    <>
      {field("Loan amount", "p")}
      {field("Annual interest rate (%)", "rate")}
      {field("Loan tenure (months)", "months")}
    </>
  );
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
      case "salary-calculator":
  return (
    <>
      {field("Gross monthly salary", "gross")}
      {field("Monthly deductions", "deductions")}
    </>
  );

case "income-tax-calculator":
  return (
    <>
      {field("Annual taxable income", "income")}

      <div className="field">
        <label>Tax regime</label>
        <select
          value={v.regime || "new"}
          onChange={(e) => set("regime", e.target.value)}
        >
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>
      </div>
    </>
  );

case "profit-loss-calculator":
  return (
    <>
      {field("Cost price", "cost")}
      {field("Selling price", "selling")}
    </>
  );

case "percentage-change-calculator":
  return (
    <>
      {field("Original value", "original")}
      {field("New value", "current")}
    </>
  );

case "ratio-calculator":
  return (
    <>
      {field("First number", "a")}
      {field("Second number", "b")}
    </>
  );

case "fraction-calculator":
  return (
    <>
      {field("Numerator 1", "n1")}
      {field("Denominator 1", "d1")}
      {field("Numerator 2", "n2")}
      {field("Denominator 2", "d2")}

      <div className="field full">
        <label>Operation</label>

        <select
          value={v.operation || "add"}
          onChange={(e) => set("operation", e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>
    </>
  );

case "time-calculator":
  return (
    <>
      {field("First hours", "h1")}
      {field("First minutes", "m1")}
      {field("Second hours", "h2")}
      {field("Second minutes", "m2")}

      <div className="field full">
        <label>Operation</label>

        <select
          value={v.operation || "add"}
          onChange={(e) => set("operation", e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
        </select>
      </div>
    </>
  );

case "hours-calculator":
  return (
    <>
      {field("Start time", "startTime", "time")}
      {field("End time", "endTime", "time")}
    </>
  );

case "age-difference-calculator":
  return (
    <>
      {field("First date", "dob1", "date")}
      {field("Second date", "dob2", "date")}
    </>
  );

case "area-calculator":
  return (
    <>
      <div className="field full">
        <label>Shape</label>

        <select
          value={v.shape || "rectangle"}
          onChange={(e) => set("shape", e.target.value)}
        >
          <option value="rectangle">Rectangle</option>
          <option value="triangle">Triangle</option>
          <option value="circle">Circle</option>
        </select>
      </div>

      {field("First dimension / radius", "a")}
      {field("Second dimension", "b")}
    </>
  );

case "volume-calculator":
  return (
    <>
      <div className="field full">
        <label>Shape</label>

        <select
          value={v.shape || "cuboid"}
          onChange={(e) => set("shape", e.target.value)}
        >
          <option value="cuboid">Cuboid</option>
          <option value="cylinder">Cylinder</option>
          <option value="sphere">Sphere</option>
        </select>
      </div>

      {field("First dimension / radius", "a")}
      {field("Second dimension / height", "b")}
      {field("Third dimension", "c")}
    </>
  );

case "speed-calculator":
  return (
    <>
      {field("Distance", "distance")}
      {field("Time", "time")}
    </>
  );

case "fuel-cost-calculator":
  return (
    <>
      {field("Distance (km)", "distance")}
      {field("Mileage (km/L)", "mileage")}
      {field("Fuel price (₹/L)", "fuelPrice")}
    </>
  );
     default: return <div className="notice">This calculator page is ready for expansion. More formulas can be added without changing the site design.</div>;
    }
  };

  return (
    <>
      <header className="header"><div className="container nav"><Link className="logo" href="/"><span className="logoMark">+</span>CalcHub</Link><nav className="navLinks"><Link href="/">All calculators</Link><Link href="/about">About</Link></nav></div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / {calculator.category} / {calculator.name}</div>
        <section className="calcHero"><div className="eyebrow">{calculator.category}</div></section>
        <div className="calcLayout">
          <section className="panel">
            <h1>{calculator.name}</h1><p className="lead">{calculator.description}</p>
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
  <p>{content?.intro}</p>

  {content?.formula && (
    <>
      <h2>Formula</h2>
      <p>{content.formula}</p>
    </>
  )}

  {content?.example && (
    <>
      <h2>Example</h2>
      <p>{content.example}</p>
    </>
  )}

  <h2>How to use it</h2>

  <ol>
    <li>Enter the required values.</li>
    <li>Review the inputs.</li>
    <li>Press Calculate to see the result.</li>
  </ol>

  {content?.tips?.length ? (
    <>
      <h2>Tips</h2>
      <ul>
        {content.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </>
  ) : null}

  {content?.faqs?.length ? (
    <>
      <h2>Frequently asked questions</h2>

      <div className="faq">
        {content.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </>
  ) : null}
</section>

        {related.length>0 && <section className="section"><div className="sectionHead"><div><h2>Related calculators</h2><p>More tools from {calculator.category}.</p></div></div><div className="related">{related.map(c=><Link className="card" href={`/calculator/${c.slug}`} key={c.slug}><div className="icon">{c.icon}</div><h3>{c.name}</h3><p>{c.description}</p></Link>)}</div></section>}
      </main>
    <footer className="footer">
  <div className="container footerGrid">
    <div>
      <div className="logo">
        <span className="logoMark">+</span>CalcHub
      </div>
      <p style={{ color: "#777", fontSize: 13 }}>
        Useful calculations, made simple.
      </p>
    </div>

    <div className="footerLinks">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/privacy">Privacy</Link>
      <Link href="/terms">Terms</Link>
    </div>
  </div>
</footer>  
    </>
  );
}
