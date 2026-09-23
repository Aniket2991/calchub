import Link from "next/link";
import { calculators } from "../lib/calculators";

const popular = ["emi-calculator","sip-calculator","gst-calculator","age-calculator","bmi-calculator","percentage-calculator","discount-calculator","temperature-converter"];

export default function Home() {
  const popularCalcs = popular.map(s => calculators.find(c => c.slug === s)!).filter(Boolean);
  const categories = [...new Set(calculators.map(c => c.category))];

  return (
    <>
      <header className="header">
        <div className="container nav">
          <Link className="logo" href="/"><span className="logoMark">+</span>CalcHub</Link>
          <nav className="navLinks">
            <Link href="/#popular">Popular</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="eyebrow">Simple • Fast • Free</div>
              <h1>Calculations, without the clutter.</h1>
              <p>CalcHub brings everyday finance, math, health, date and conversion calculators into one clean place.</p>
              <div className="search">
                <input aria-label="Search calculators" placeholder="What do you want to calculate?" />
                <a className="primary" href="#popular">Explore</a>
              </div>
            </div>
            <div className="heroCard">
              <div className="mini">CALCHUB / QUICK START</div>
              <h3>Pick a calculator. Get an answer.</h3>
              <div className="miniCalc">
                <div className="miniBox"><span>Finance</span>EMI · SIP · GST</div>
                <div className="miniBox"><span>Math</span>% · Average</div>
                <div className="miniBox"><span>Health</span>BMI</div>
                <div className="miniBox"><span>Everyday</span>Age · Units</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container"><div className="ad">ADVERTISEMENT</div></div>

        <section className="section" id="popular">
          <div className="container">
            <div className="sectionHead">
              <div><h2>Popular calculators</h2><p>Useful tools for everyday decisions.</p></div>
            </div>
            <div className="grid">
              {popularCalcs.map(c => (
                <Link className="card" href={`/calculator/${c.slug}`} key={c.slug}>
                  <div className="icon">{c.icon}</div><h3>{c.name}</h3><p>{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="categories">
          <div className="container">
            <div className="sectionHead"><div><h2>Browse by category</h2><p>Everything organized in one place.</p></div></div>
            <div className="categoryRow">
              {categories.map(c => <a className="chip" href={`#${c.toLowerCase().replaceAll(" ","-").replace("&","and")}`} key={c}>{c}</a>)}
            </div>
          </div>
        </section>

        {categories.map(cat => (
          <section className="section" id={cat.toLowerCase().replaceAll(" ","-").replace("&","and")} key={cat}>
            <div className="container">
              <div className="sectionHead"><div><h2>{cat}</h2><p>Free calculators for {cat.toLowerCase()}.</p></div></div>
              <div className="grid">
                {calculators.filter(c => c.category === cat).map(c => (
                  <Link className="card" href={`/calculator/${c.slug}`} key={c.slug}>
                    <div className="icon">{c.icon}</div><h3>{c.name}</h3><p>{c.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="section">
          <div className="container">
            <div className="sectionHead"><div><h2>Why CalcHub?</h2><p>Designed to make small calculations feel effortless.</p></div></div>
            <div className="featureGrid">
              <div className="feature"><strong>Fast to use</strong><span>Focused interfaces with the important inputs up front.</span></div>
              <div className="feature"><strong>Mobile friendly</strong><span>Responsive layouts that work comfortably on phones and desktops.</span></div>
              <div className="feature"><strong>Clear results</strong><span>Results are presented in a simple format so they are easy to understand.</span></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead"><div><h2>Frequently asked questions</h2><p>Quick answers about CalcHub.</p></div></div>
            <div className="faq">
              <details><summary>Are CalcHub calculators free?</summary><p>Yes. The calculators are designed to be free to use.</p></details>
              <details><summary>Can I use CalcHub on my phone?</summary><p>Yes. The interface is responsive and designed for mobile screens as well as desktops.</p></details>
              <details><summary>Are financial results guaranteed?</summary><p>No. Financial calculators provide estimates based on the numbers and assumptions you enter. Check actual rates, fees and terms before making financial decisions.</p></details>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div><div className="logo"><span className="logoMark">+</span>CalcHub</div><p style={{color:"#777",fontSize:13}}>Useful calculations, made simple.</p></div>
          <div className="footerLinks"><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </footer>
    </>
  );
}