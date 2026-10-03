"use client";

import Link from "next/link";
import { calculators } from "../lib/calculators";
import { CalculationHistory, FavoriteButton, MyCalculators, RecentCalculators } from "./components/UserTools";
import InstallAppButton from "./components/InstallAppButton";
import MobileQuickActions from "./components/MobileQuickActions";
import CalculatorCommandBar from "./components/CalculatorCommandBar";

const categorySlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const popular = [
  "emi-calculator",
  "sip-calculator",
  "gst-calculator",
  "age-calculator",
  "bmi-calculator",
  "percentage-calculator",
  "discount-calculator",
  "temperature-converter",
];

export default function Home() {
  const popularCalcs = popular
    .map((s) => calculators.find((c) => c.slug === s)!)
    .filter(Boolean);

  const categories = [...new Set(calculators.map((c) => c.category))];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CalcHub",
    url: "https://calchub-blond.vercel.app/",
    description:
      "Free online calculators for finance, math, health, dates and everyday conversions.",
  };

  const calculatorListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CalcHub Online Calculators",
    numberOfItems: calculators.length,
    itemListElement: calculators.map((calculator, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: calculator.name,
      url: "https://calchub-blond.vercel.app/calculator/" + calculator.slug,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorListSchema),
        }}
      />

      <header className="header">
        <div className="container nav">
          <Link className="logo" href="/">
            <span className="logoMark">+</span>CalcHub
          </Link>

          <nav className="navLinks" aria-label="Main navigation">
            <Link href="/#popular">Popular</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/my-calculators">My Calculators</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="eyebrow">Simple • Fast • Free</div>

              <div className="heroInstall"><InstallAppButton /></div>

              <h1>Free Online Calculators for Everyday Use</h1>

              <p>
                CalcHub provides easy-to-use calculators for finance, math,
                health, dates, and everyday unit conversions. Get clear
                results quickly without complicated tools.
              </p>

              <CalculatorCommandBar />
            </div>

            <div className="heroCard">
              <div className="mini">CALCHUB / QUICK START</div>

              <h2>Pick a calculator. Get an answer.</h2>

              <div className="miniCalc">
                <Link className="miniBox" href="/calculator/emi-calculator">
                  <span>Finance</span>
                  EMI · SIP · GST
                </Link>

                <Link
                  className="miniBox"
                  href="/calculator/percentage-calculator"
                >
                  <span>Math</span>
                  % · Average
                </Link>

                <Link className="miniBox" href="/calculator/bmi-calculator">
                  <span>Health</span>
                  BMI
                </Link>

                <Link className="miniBox" href="/calculator/age-calculator">
                  <span>Everyday</span>
                  Age · Units
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="ad">ADVERTISEMENT</div>
        </div>

        <MyCalculators />
        <RecentCalculators />
        <CalculationHistory />

        <MobileQuickActions />

        <section className="section" id="popular">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Popular Calculators</h2>
                <p>
                  Quickly calculate common financial, mathematical, health,
                  and everyday values.
                </p>
              </div>
            </div>

            <div className="grid">
              {popularCalcs.map((c) => (
                <div className="card cardWithFavorite" key={c.slug}>
                  <Link className="cardMainLink" href={`/calculator/${c.slug}`}>
                    <div className="icon">{c.icon}</div>
                    <h3>{c.name}</h3>
                    <p>{c.description}</p>
                  </Link>
                  <FavoriteButton slug={c.slug} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="categories">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Browse Calculators by Category</h2>
                <p>
                  Find the right calculator by choosing a category below.
                </p>
              </div>
            </div>

            <div className="categoryRow">
              {categories.map((c) => (
                <a
                  className="chip"
                  href={`/category/${categorySlug(c)}`}
                  key={c}
                >
                  {c}
                </a>
              ))}
            </div>
          </div>
        </section>

        {categories.map((cat) => (
          <section
            className="section"
            id={cat.toLowerCase().replaceAll(" ", "-").replace("&", "and")}
            key={cat}
          >
            <div className="container">
              <div className="sectionHead">
                <div>
                  <h2>{cat} Calculators</h2>
                  <p>
                    Free {cat.toLowerCase()} calculators designed for quick
                    and simple calculations.
                  </p>
                </div>
              </div>

              <div className="grid">
                {calculators
                  .filter((c) => c.category === cat)
                  .map((c) => (
                    <div className="card cardWithFavorite" key={c.slug}>
                      <Link className="cardMainLink" href={`/calculator/${c.slug}`}>
                        <div className="icon">{c.icon}</div>
                        <h3>{c.name}</h3>
                        <p>{c.description}</p>
                      </Link>
                      <FavoriteButton slug={c.slug} />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ))}

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Why Use CalcHub?</h2>
                <p>
                  Designed to make everyday calculations simple and
                  straightforward.
                </p>
              </div>
            </div>

            <div className="featureGrid">
              <div className="feature">
                <strong>Fast to use</strong>
                <span>
                  Focused calculator interfaces with important inputs easy to
                  find.
                </span>
              </div>

              <div className="feature">
                <strong>Mobile friendly</strong>
                <span>
                  Responsive layouts designed for phones, tablets, and
                  desktops.
                </span>
              </div>

              <div className="feature">
                <strong>Clear results</strong>
                <span>
                  Results are presented in a simple format that is easy to
                  understand.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">LEARN / CALCULATE</div>
                <h2>Calculator Guides</h2>
                <p>
                  Learn the formulas, inputs and practical meaning behind
                  common calculations.
                </p>
              </div>
              <Link href="/guides" className="textLink">View all guides →</Link>
            </div>

            <div className="featureGrid">
              <Link className="feature" href="/guides/emi-calculator-guide">
                <strong>EMI Calculator Guide</strong>
                <span>Understand EMI, tenure, interest and total repayment.</span>
              </Link>
              <Link className="feature" href="/guides/gst-calculator-guide">
                <strong>GST Calculator Guide</strong>
                <span>Learn GST-inclusive and GST-exclusive calculations.</span>
              </Link>
              <Link className="feature" href="/guides/percentage-calculator-guide">
                <strong>Percentage Calculator Guide</strong>
                <span>Use percentages for change, discounts and comparisons.</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>Frequently Asked Questions</h2>
                <p>Common questions about using CalcHub.</p>
              </div>
            </div>

            <div className="faq">
              <details>
                <summary>Are CalcHub calculators free?</summary>
                <p>
                  Yes. CalcHub calculators are designed to be free to use.
                </p>
              </details>

              <details>
                <summary>Can I use CalcHub on my phone?</summary>
                <p>
                  Yes. CalcHub uses a responsive interface designed for
                  mobile screens as well as desktops.
                </p>
              </details>

              <details>
                <summary>Are financial calculator results guaranteed?</summary>
                <p>
                  No. Financial calculators provide estimates based on the
                  values and assumptions you enter. Always check actual
                  interest rates, fees, taxes, and terms before making
                  financial decisions.
                </p>
              </details>

              <details>
                <summary>Does CalcHub provide medical advice?</summary>
                <p>
                  No. Health-related calculators are provided for general
                  informational purposes and should not replace professional
                  medical advice.
                </p>
              </details>
            </div>
          </div>
        </section>
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
            <Link href="/guides">Guides</Link>
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
