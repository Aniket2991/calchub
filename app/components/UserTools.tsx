"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { calculators } from "../../lib/calculators";

const FAVORITES_KEY = "calchub-favorites";
const RECENT_KEY = "calchub-recent";

function readSlugs(key: string): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
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
