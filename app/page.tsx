"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculators } from "../lib/calculators";

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
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return calculators
      .filter((calculator) =>
        [calculator.name, calculator.description, calculator.category]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 6);
  }, [searchQuery]);

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
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="eyebrow">Simple • Fast • Free</div>

              <h1>Free Online Calculators for Everyday Use</h1>

              <p>
                CalcHub provides easy-to-use calculators for finance, math,
                health, dates, and everyday unit conversions. Get clear
                results quickly without complicated tools.
              </p>

              <div className="search">
                <input
                  aria-label="Search calculators"
                  placeholder="What do you want to calculate?"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && searchResults[0]) {
                      window.location.href = `/calculator/${searchResults[0].slug}`;
                    }
                  }}
                />
                <a className="primary" href="#popular">
                  Explore Calculators
                </a>
              </div>

              {searchQuery.trim() && (
                <div
                  style={{
                    marginTop: 8,
                    background: "rgba(255,255,255,0.96)",
                    border: "1px solid rgba(15,23,42,0.08)",
                    borderRadius: 16,
                    boxShadow: "0 18px 40px rgba(15,23,42,0.12)",
                    overflow: "hidden",
                  }}
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((calculator) => (
                      <Link
                        key={calculator.slug}
                        href={`/calculator/${calculator.slug}`}
                        style={{
                          display: "block",
                          padding: "14px 16px",
                          color: "inherit",
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(15,23,42,0.06)",
                        }}
                        onClick={() => setSearchQuery("")}
                      >
                        <strong>{calculator.name}</strong>
                        <span
                          style={{
                            display: "block",
                            marginTop: 3,
                            color: "#64748b",
                            fontSize: 13,
                          }}
                        >
                          {calculator.category} · {calculator.description}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "15px 16px",
                        color: "#64748b",
                        fontSize: 14,
                      }}
                    >
                      No calculator found. Try “EMI”, “GST”, “BMI” or
                      “percentage”.
                    </div>
                  )}
                </div>
              )}
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

        {/* Popular */}
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
                <Link
                  className="card"
                  href={`/calculator/${c.slug}`}
                  key={c.slug}
                >
                  <div className="icon">{c.icon}</div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
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

        {/* Category calculator sections */}
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
                    <Link
                      className="card"
                      href={`/calculator/${c.slug}`}
                      key={c.slug}
                    >
                      <div className="icon">{c.icon}</div>
                      <h3>{c.name}</h3>
                      <p>{c.description}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        ))}

        {/* Why CalcHub */}
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

        {/* FAQ */}
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