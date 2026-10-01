"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalculationHistoryItem,
  clearHistory,
  readHistory,
} from "../components/UserTools";
import { calculators } from "../../lib/calculators";

const FAVORITES_KEY = "calchub-favorites";
const RECENT_KEY = "calchub-recent";

function readSlugs(key: string): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export default function MyCalculatorsPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  function refresh() {
    setFavorites(readSlugs(FAVORITES_KEY));
    setRecent(readSlugs(RECENT_KEY));
    setHistory(readHistory());
  }

  useEffect(() => {
    refresh();
    window.addEventListener("calchub-favorites-changed", refresh);
    window.addEventListener("calchub-recent-changed", refresh);
    window.addEventListener("calchub-history-changed", refresh);

    return () => {
      window.removeEventListener("calchub-favorites-changed", refresh);
      window.removeEventListener("calchub-recent-changed", refresh);
      window.removeEventListener("calchub-history-changed", refresh);
    };
  }, []);

  const favoriteItems = favorites
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is (typeof calculators)[number] => Boolean(calculator));

  const recentItems = recent
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is (typeof calculators)[number] => Boolean(calculator));

  return (
    <>
      <header className="header">
        <div className="container nav">
          <Link className="logo" href="/">
            <span className="logoMark">+</span>CalcHub
          </Link>
          <nav className="navLinks" aria-label="Main navigation">
            <Link href="/">All calculators</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container section">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <span aria-current="page">My Calculators</span>
        </div>

        <div className="sectionHead dashboardHead">
          <div>
            <div className="eyebrow">Your private workspace</div>
            <h1>My Calculators</h1>
            <p>Favorites, recently used calculators and saved results stored on this device.</p>
          </div>
          <Link className="primary" href="/">Browse calculators</Link>
        </div>

        <section className="dashboardSection">
          <div className="sectionHead">
            <div>
              <h2>⭐ Favorites</h2>
              <p>Your saved calculators.</p>
            </div>
          </div>
          {favoriteItems.length ? (
            <div className="grid">
              {favoriteItems.map((calculator) => (
                <Link className="card dashboardCard" href={`/calculator/${calculator.slug}`} key={calculator.slug}>
                  <div className="icon">{calculator.icon}</div>
                  <h3>{calculator.name}</h3>
                  <p>{calculator.description}</p>
                  <span className="dashboardArrow">Open →</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="dashboardEmpty">No favorites yet. Open a calculator and tap ☆ Add to favorites.</div>
          )}
        </section>

        <section className="dashboardSection">
          <div className="sectionHead">
            <div>
              <h2>🕘 Recently Used</h2>
              <p>Your latest calculator visits.</p>
            </div>
          </div>
          {recentItems.length ? (
            <div className="grid">
              {recentItems.map((calculator) => (
                <Link className="card dashboardCard" href={`/calculator/${calculator.slug}`} key={calculator.slug}>
                  <div className="icon">{calculator.icon}</div>
                  <h3>{calculator.name}</h3>
                  <p>{calculator.description}</p>
                  <span className="dashboardArrow">Open →</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="dashboardEmpty">Your recently used calculators will appear here.</div>
          )}
        </section>

        <section className="dashboardSection">
          <div className="sectionHead">
            <div>
              <h2>📜 Saved Calculations</h2>
              <p>Open a saved calculation to restore its original inputs and result.</p>
            </div>
            {history.length ? (
              <button className="secondary historyClear" type="button" onClick={clearHistory}>
                Clear history
              </button>
            ) : null}
          </div>

          {history.length ? (
            <div className="historyList">
              {history.map((item) => (
                <details className="historyItem" key={item.id}>
                  <summary>
                    <span>
                      <strong>{item.calculatorName}</strong>
                      <small>{new Date(item.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</small>
                    </span>
                    <b>{item.result}</b>
                  </summary>
                  <div className="historyDetails">
                    {Object.entries(item.values).map(([key, value]) => value ? (
                      <div className="historyRow" key={key}>
                        <span>{key}</span>
                        <strong>{value}</strong>
                      </div>
                    ) : null)}
                    {item.rows.map(([label, value], index) => (
                      <div className="historyRow" key={`${item.id}-${label}-${index}`}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                    <Link className="historyOpenButton" href={`/calculator/${item.slug}?restore=${encodeURIComponent(item.id)}`}>
                      Open calculation →
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="dashboardEmpty">Your successful calculations will appear here after you calculate.</div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div>
            <div className="logo"><span className="logoMark">+</span>CalcHub</div>
            <p style={{ color: "#777", fontSize: 13 }}>Useful calculations, made simple.</p>
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
