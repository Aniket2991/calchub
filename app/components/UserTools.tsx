"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { calculators } from "../../lib/calculators";

const FAVORITES_KEY = "calchub-favorites";
const RECENT_KEY = "calchub-recent";
const HISTORY_KEY = "calchub-history";

function readSlugs(key: string): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}


export type CalculationHistoryItem = {
  id: string;
  slug: string;
  calculatorName: string;
  result: string;
  values: Record<string, string>;
  rows: [string, string][];
  createdAt: number;
};

export function readHistory(): CalculationHistoryItem[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item) => item && typeof item.id === "string") : [];
  } catch {
    return [];
  }
}

export function saveHistory(item: Omit<CalculationHistoryItem, "id" | "createdAt">) {
  const history = readHistory();
  const next: CalculationHistoryItem[] = [
    { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: Date.now() },
    ...history,
  ].slice(0, 30);

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("calchub-history-changed"));
}

export function clearHistory() {
  window.localStorage.removeItem(HISTORY_KEY);
  window.dispatchEvent(new Event("calchub-history-changed"));
}

export function FavoriteButton({ slug }: { slug: string }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(readSlugs(FAVORITES_KEY).includes(slug));
  }, [slug]);

  function toggle() {
    const current = readSlugs(FAVORITES_KEY);
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [slug, ...current].slice(0, 20);

    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setFavorite(next.includes(slug));
    window.dispatchEvent(new Event("calchub-favorites-changed"));
  }

  return (
    <button
      className={`favoriteButton${favorite ? " active" : ""}`}
      type="button"
      onClick={toggle}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <span aria-hidden="true">{favorite ? "★" : "☆"}</span>
      {favorite ? "Favorite" : "Add to favorites"}
    </button>
  );
}


export function CalculationHistory() {
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  function refresh() {
    setHistory(readHistory());
  }

  useEffect(() => {
    refresh();
    window.addEventListener("calchub-history-changed", refresh);
    return () => window.removeEventListener("calchub-history-changed", refresh);
  }, []);

  if (!history.length) return null;

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section className="section historySection">
      <div className="container">
        <div className="sectionHead">
          <div>
            <h2>Calculation History</h2>
            <p>Your latest results are saved privately on this device.</p>
          </div>
          <button className="secondary historyClear" type="button" onClick={clearHistory}>
            Clear history
          </button>
        </div>

        <div className="historyList">
          {history.slice(0, 10).map((item) => (
            <details className="historyItem" key={item.id}>
              <summary>
                <span>
                  <strong>{item.calculatorName}</strong>
                  <small>{formatDate(item.createdAt)}</small>
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
                {item.rows.map(([label, value]) => (
                  <div className="historyRow" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentCalculators() {
  const [recent, setRecent] = useState<string[]>([]);

  function refresh() {
    setRecent(readSlugs(RECENT_KEY));
  }

  useEffect(() => {
    refresh();
    window.addEventListener("calchub-recent-changed", refresh);
    return () => window.removeEventListener("calchub-recent-changed", refresh);
  }, []);

  const items = recent
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is (typeof calculators)[number] => Boolean(calculator))
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <section className="section recentSection">
      <div className="container">
        <div className="sectionHead">
          <div>
            <h2>Recently Used</h2>
            <p>Your latest calculators are saved on this device.</p>
          </div>
        </div>

        <div className="grid recentGrid">
          {items.map((calculator) => (
            <Link className="card recentCard" href={`/calculator/${calculator.slug}`} key={calculator.slug}>
              <div className="icon">{calculator.icon}</div>
              <h3>{calculator.name}</h3>
              <p>{calculator.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
