 "use client";

import { useMemo, useState } from "react";

type Calc = {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: string;
};

const calculators: Calc[] = [
  { id: "basic", name: "Basic Calculator", desc: "Fast everyday arithmetic", icon: "＋", category: "Math" },
  { id: "scientific", name: "Scientific Calculator", desc: "Advanced mathematical functions", icon: "√", category: "Math" },
  { id: "percentage", name: "Percentage Calculator", desc: "Percent, increase & decrease", icon: "%", category: "Math" },
  { id: "emi", name: "EMI Calculator", desc: "Monthly loan payment & interest", icon: "₹", category: "Finance" },
  { id: "sip", name: "SIP Calculator", desc: "Estimate mutual fund SIP growth", icon: "↗", category: "Finance" },
  { id: "gst", name: "GST Calculator", desc: "Add or remove GST instantly", icon: "▣", category: "Finance" },
  { id: "discount", name: "Discount Calculator", desc: "Sale price & savings", icon: "−", category: "Finance" },
  { id: "bmi", name: "BMI Calculator", desc: "BMI and healthy range", icon: "♥", category: "Health" },
  { id: "age", name: "Age Calculator", desc: "Exact age from date of birth", icon: "◷", category: "Date & Time" },
  { id: "converter", name: "Unit Converter", desc: "Length, weight & temperature", icon: "⇄", category: "Conversion" },
];

const categories = ["All", "Math", "Finance", "Health", "Date & Time", "Conversion"];

const money = (n: number) =>
  Number.isFinite(n)
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n)
    : "—";

function Num({ value, onChange, label, suffix }: { value: string; onChange: (v: string) => void; label: string; suffix?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0" />
        {suffix && <b>{suffix}</b>}
      </div>
    </label>
  );
}

function CalculatorPanel({ calc, onClose }: { calc: Calc; onClose: () => void }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("km");
  const [unitTo, setUnitTo] = useState("mi");
  const [op, setOp] = useState("+");

  const A = Number(a), B = Number(b), C = Number(c);
  let result = "Enter values to calculate";
  let note = "";

  if (calc.id === "percentage") {
    result = a && b ? `${((A * B) / 100).toFixed(2)} (${B}% of ${A})` : result;
  } else if (calc.id === "emi") {
    const r = B / 12 / 100, n = C * 12;
    const emi = r && n ? A * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : (n ? A / n : 0);
    result = emi > 0 ? money(emi) : result;
    note = emi > 0 ? `Principal ${money(A)} • ${B}% p.a. • ${C} years` : "";
  } else if (calc.id === "sip") {
    const months = C * 12, mr = B / 12 / 100;
    const fv = A && months ? A * (((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr || 1)) : 0;
    const invested = A * months;
    result = fv > 0 ? money(fv) : result;
    note = fv > 0 ? `Invested ${money(invested)} • Estimated gain ${money(fv - invested)}` : "";
  } else if (calc.id === "gst") {
    const rate = B || 0;
    const gst = A * rate / 100;
    result = a ? money(A + gst) : result;
    note = a ? `GST ${money(gst)} • Base ${money(A)}` : "";
  } else if (calc.id === "discount") {
    const discount = A * B / 100;
    result = a && b ? money(A - discount) : result;
    note = a && b ? `You save ${money(discount)}` : "";
  } else if (calc.id === "bmi") {
    const bmi = A && B ? A / Math.pow(B / 100, 2) : 0;
    result = bmi ? bmi.toFixed(1) : result;
    note = bmi ? (bmi < 18.5 ? "Underweight range" : bmi < 25 ? "Healthy range" : bmi < 30 ? "Overweight range" : "Obesity range") : "";
  } else if (calc.id === "age") {
    if (date) {
      const dob = new Date(date + "T00:00:00"), now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      const before = now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
      if (before) years--;
      result = years >= 0 ? `${years} years` : "Invalid date";
      note = years >= 0 ? `Born ${dob.toLocaleDateString("en-IN")}` : "";
    }
  } else if (calc.id === "converter") {
    if (a) {
      const v = A;
      if (unit === "km" && unitTo === "mi") result = `${(v * 0.621371).toFixed(4)} mi`;
      else if (unit === "mi" && unitTo === "km") result = `${(v * 1.609344).toFixed(4)} km`;
      else if (unit === "kg" && unitTo === "lb") result = `${(v * 2.20462).toFixed(4)} lb`;
      else if (unit === "lb" && unitTo === "kg") result = `${(v / 2.20462).toFixed(4)} kg`;
      else if (unit === "c" && unitTo === "f") result = `${(v * 9/5 + 32).toFixed(2)} °F`;
      else if (unit === "f" && unitTo === "c") result = `${((v - 32) * 5/9).toFixed(2)} °C`;
      else result = `${v} ${unit}`;
    }
  } else if (calc.id === "basic") {
    const r = op === "+" ? A + B : op === "−" ? A - B : op === "×" ? A * B : B !== 0 ? A / B : NaN;
    result = a && b && Number.isFinite(r) ? String(r) : result;
  } else if (calc.id === "scientific") {
    const r = a ? (op === "√" ? Math.sqrt(A) : op === "x²" ? A * A : op === "sin" ? Math.sin(A * Math.PI / 180) : op === "cos" ? Math.cos(A * Math.PI / 180) : Math.log10(A)) : NaN;
    result = Number.isFinite(r) ? String(Number(r.toFixed(10))) : result;
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal">
        <div className="modal-head">
          <div><span className="mini-icon">{calc.icon}</span><div><h2>{calc.name}</h2><p>{calc.desc}</p></div></div>
          <button className="close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="ad-slot small">ADVERTISEMENT</div>

        {calc.id === "age" ? (
          <Num value={date} onChange={setDate} label="Date of birth" />
        ) : calc.id === "converter" ? (
          <div className="grid2">
            <Num value={a} onChange={setA} label="Value" />
            <label className="field"><span>From</span><select value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="km">Kilometres</option><option value="mi">Miles</option><option value="kg">Kilograms</option><option value="lb">Pounds</option><option value="c">°C</option><option value="f">°F</option>
            </select></label>
            <label className="field"><span>To</span><select value={unitTo} onChange={e => setUnitTo(e.target.value)}>
              <option value="mi">Miles</option><option value="km">Kilometres</option><option value="lb">Pounds</option><option value="kg">Kilograms</option><option value="f">°F</option><option value="c">°C</option>
            </select></label>
          </div>
        ) : calc.id === "bmi" ? (
          <div className="grid2"><Num value={a} onChange={setA} label="Weight" suffix="kg" /><Num value={b} onChange={setB} label="Height" suffix="cm" /></div>
        ) : calc.id === "emi" ? (
          <div className="grid2"><Num value={a} onChange={setA} label="Loan amount" suffix="₹" /><Num value={b} onChange={setB} label="Interest rate" suffix="%" /><Num value={c} onChange={setC} label="Loan tenure" suffix="years" /></div>
        ) : calc.id === "sip" ? (
          <div className="grid2"><Num value={a} onChange={setA} label="Monthly investment" suffix="₹" /><Num value={b} onChange={setB} label="Expected return" suffix="%" /><Num value={c} onChange={setC} label="Time" suffix="years" /></div>
        ) : calc.id === "gst" ? (
          <div className="grid2"><Num value={a} onChange={setA} label="Amount" suffix="₹" /><Num value={b} onChange={setB} label="GST rate" suffix="%" /></div>
        ) : calc.id === "discount" ? (
          <div className="grid2"><Num value={a} onChange={setA} label="Original price" suffix="₹" /><Num value={b} onChange={setB} label="Discount" suffix="%" /></div>
        ) : (
          <div className="grid2">
            <Num value={a} onChange={setA} label="First value" />
            {calc.id === "scientific" ? <label className="field"><span>Function</span><select value={op} onChange={e => setOp(e.target.value)}><option>√</option><option>x²</option><option>sin</option><option>cos</option><option>log</option></select></label> :
              <><label className="field"><span>Operation</span><select value={op} onChange={e => setOp(e.target.value)}><option>+</option><option>−</option><option>×</option><option>÷</option></select></label><Num value={b} onChange={setB} label="Second value" /></>}
          </div>
        )}

        <div className="result"><span>RESULT</span><strong>{result}</strong>{note && <small>{note}</small>}</div>
      </section>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Calc | null>(null);

  const filtered = useMemo(() => calculators.filter(c =>
    (category === "All" || c.category === category) &&
    (c.name + c.desc).toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  return (
    <main>
      <header className="nav">
        <div className="brand"><span>✦</span> Calc<span>Hub</span></div>
        <div className="nav-links"><a href="#calculators">Calculators</a><a href="#why">Why CalcHub</a></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="pill">FREE • FAST • MOBILE FRIENDLY</div>
          <h1>Every calculator<br /><em>you actually need.</em></h1>
          <p>Finance, math, health, dates and conversions — simple answers without the clutter.</p>
          <a className="hero-btn" href="#calculators">Explore calculators ↓</a>
        </div>
        <div className="hero-card">
          <div className="display"><small>CALCHUB</small><strong>12,500.00</strong><span>Quick calculations, made easy.</span></div>
          <div className="fake-keys"><i>AC</i><i>÷</i><i>×</i><i>−</i><i>+</i><i>7</i><i>8</i><i>9</i><i>4</i><i>5</i><i>6</i><i>1</i><i>2</i><i>3</i><i>0</i></div>
        </div>
      </section>

      <div className="ad-slot">ADVERTISEMENT</div>

      <section id="calculators" className="section">
        <div className="section-top">
          <div><span className="eyebrow">THE TOOLBOX</span><h2>Choose a calculator</h2></div>
          <div className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search calculators..." /></div>
        </div>
        <div className="chips">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="cards">{filtered.map(c => <button className="calc-card" key={c.id} onClick={() => setSelected(c)}>
          <span className="calc-icon">{c.icon}</span><div><small>{c.category}</small><h3>{c.name}</h3><p>{c.desc}</p></div><b>→</b>
        </button>)}</div>
      </section>

      <section id="why" className="why">
        <span className="eyebrow">BUILT FOR EVERYDAY USE</span>
        <h2>Fast answers. No unnecessary steps.</h2>
        <div className="why-grid"><div><b>01</b><h3>Simple</h3><p>Clean interfaces designed for quick calculations on mobile and desktop.</p></div><div><b>02</b><h3>Useful</h3><p>Practical calculators for money, math, health and everyday decisions.</p></div><div><b>03</b><h3>Free</h3><p>Core calculators stay free and are supported by carefully placed advertising.</p></div></div>
      </section>

      <footer><div><div className="brand">✦ Calc<span>Hub</span></div><p>Free calculators for everyday life.</p></div><nav><a href="/about">About</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></nav><span>© 2026 CalcHub</span></footer>

      {selected && <CalculatorPanel calc={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}