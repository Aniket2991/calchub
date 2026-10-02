"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculators } from "../../lib/calculators";

function parseNumber(value: string) {
  const cleaned = value.toLowerCase().replace(/,/g, "").trim();
  const match = cleaned.match(/([0-9]*\.?[0-9]+)\s*(lakh|lac|crore|cr|k)?/);
  if (!match) return null;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return null;
  const unit = match[2];
  if (unit === "lakh" || unit === "lac") return base * 100000;
  if (unit === "crore" || unit === "cr") return base * 10000000;
  if (unit === "k") return base * 1000;
  return base;
}

function smartTarget(query: string) {
  const q = query.toLowerCase();
  const pick = (slug: string) => calculators.find((c) => c.slug === slug)?.slug;
  const nums = [...q.matchAll(/([0-9]*\.?[0-9]+(?:\s*(?:lakh|lac|crore|cr|k))?)/g)].map((m) => m[1]);
  const values = nums.map(parseNumber).filter((n): n is number => n !== null);
  const percent = [...q.matchAll(/([0-9]*\.?[0-9]+)\s*%/g)].map((m) => Number(m[1]));
  const years = q.match(/([0-9]*\.?[0-9]+)\s*(?:years?|yrs?)/)?.[1];
  const params = new URLSearchParams();

  const link = (slug: string) => `/calculator/${pick(slug)}?${params.toString()}`;

  if (/\bemi\b|\bloan\b/.test(q) && values[0] && percent[0] !== undefined && years) {
    params.set("p", String(values[0])); params.set("rate", String(percent[0])); params.set("months", String(Number(years) * 12));
    return link(/\bemi\b/.test(q) ? "emi-calculator" : "loan-calculator");
  }
  if (/\bsip\b/.test(q) && values[0] !== undefined && percent[0] !== undefined && years) {
    params.set("p", String(values[0])); params.set("rate", String(percent[0])); params.set("months", String(Number(years) * 12));
    return link("sip-calculator");
  }
  if (/\bgst\b/.test(q) && values[0] !== undefined && percent[0] !== undefined) {
    params.set("amount", String(values[0])); params.set("gst", String(percent[0]));
    if (/\bremove\b|\bexclusive\b/.test(q)) params.set("mode", "remove");
    return link("gst-calculator");
  }
  if (/\bdiscount\b/.test(q) && values[0] !== undefined && percent[0] !== undefined) {
    params.set("price", String(values[0])); params.set("discount", String(percent[0]));
    return link("discount-calculator");
  }
  if (/\bbmi\b/.test(q) && values.length >= 2) {
    params.set("weight", String(values[0])); params.set("height", String(values[1]));
    return link("bmi-calculator");
  }
  if (/\bpercentage\b|\bpercent\b/.test(q) && values.length >= 2) {
    params.set("a", String(values[0])); params.set("b", String(values[1]));
    return link("percentage-calculator");
  }
  if (/\bprofit\b|\bloss\b/.test(q) && values.length >= 2) {
    params.set("cost", String(values[0])); params.set("selling", String(values[1]));
    return link("profit-loss-calculator");
  }
  if (/\bchange\b/.test(q) && /\bpercentage\b|\bpercent\b/.test(q) && values.length >= 2) {
    params.set("original", String(values[0])); params.set("current", String(values[1]));
    return link("percentage-change-calculator");
  }
  if (/\bratio\b/.test(q)) {
    const ratio = q.match(/([0-9]+(?:\.[0-9]+)?)\s*[:/]\s*([0-9]+(?:\.[0-9]+)?)/);
    if (ratio) {
      params.set("a", ratio[1]); params.set("b", ratio[2]);
      return link("ratio-calculator");
    }
  }
  if (/\barea\b/.test(q) && values.length >= 2) {
    params.set("a", String(values[0])); params.set("b", String(values[1]));
    if (/\bcircle\b/.test(q)) params.set("shape", "circle");
    if (/\btriangle\b/.test(q)) params.set("shape", "triangle");
    return link("area-calculator");
  }
  if (/\bvolume\b/.test(q) && values.length >= 2) {
    params.set("a", String(values[0])); params.set("b", String(values[1]));
    if (values[2] !== undefined) params.set("c", String(values[2]));
    if (/\bcylinder\b/.test(q)) params.set("shape", "cylinder");
    if (/\bsphere\b/.test(q)) params.set("shape", "sphere");
    return link("volume-calculator");
  }
  if (/\bspeed\b/.test(q) && values.length >= 2) {
    params.set("distance", String(values[0])); params.set("time", String(values[1]));
    return link("speed-calculator");
  }
  if (/\bfuel\b|\bmileage\b/.test(q) && values.length >= 3) {
    params.set("distance", String(values[0])); params.set("mileage", String(values[1])); params.set("fuelPrice", String(values[2]));
    return link("fuel-cost-calculator");
  }
  if (/\bsalary\b/.test(q) && values.length >= 1) {
    params.set("gross", String(values[0])); if (values[1] !== undefined) params.set("deductions", String(values[1]));
    return link("salary-calculator");
  }
  return null;
}

export default function CalculatorCommandBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calculators.slice(0, 6);

    const words = q.split(/\s+/).filter(Boolean);

    return calculators
      .map((calculator) => {
        const haystack = [
          calculator.name,
          calculator.description,
          calculator.category,
          calculator.slug.replaceAll("-", " "),
        ]
          .join(" ")
          .toLowerCase();

        const exactName = calculator.name.toLowerCase() === q;
        const startsName = calculator.name.toLowerCase().startsWith(q);
        const score =
          (exactName ? 100 : 0) +
          (startsName ? 40 : 0) +
          words.reduce((total, word) => total + (haystack.includes(word) ? 10 : 0), 0);

        return { calculator, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.calculator);
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("calchub-searches") || "[]");
      if (Array.isArray(saved)) {
        setRecentSearches(saved.filter((item): item is string => typeof item === "string").slice(0, 5));
      }
    } catch {}
  }, []);

  const rememberSearch = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    const next = [clean, ...recentSearches.filter((item) => item !== clean)].slice(0, 5);
    setRecentSearches(next);
    try { window.localStorage.setItem("calchub-searches", JSON.stringify(next)); } catch {}
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }

      if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const first = results[0];
  const activeCalculator = results[activeIndex] ?? first;

  return (
    <div className="commandBarWrap">
      <div className={open ? "commandBar commandBarOpen" : "commandBar"}>
        <span className="commandIcon" aria-hidden="true">⌕</span>

        <input
          ref={inputRef}
          aria-label="Find a calculator"
          placeholder="Try: EMI 5 lakh 9% 5 years…"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (!open || results.length === 0) return;

            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((index) => (index + 1) % results.length);
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => (index - 1 + results.length) % results.length);
            }

            if (event.key === "Enter") {
              event.preventDefault();
              const selected = results[activeIndex] ?? first;
              if (selected) { rememberSearch(query); window.location.href = smartTarget(query) ?? `/calculator/${selected.slug}`; }
            }
          }}
        />

        <kbd>Ctrl K</kbd>
      </div>

      {open && (
        <div className="commandResults">
          {!query.trim() && recentSearches.length > 0 && (
            <div className="commandRecent">
              <div className="commandRecentHead">
                <span>Recent searches</span>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => {
                  setRecentSearches([]);
                  try { window.localStorage.removeItem("calchub-searches"); } catch {}
                }}>Clear</button>
              </div>
              {recentSearches.map((search) => (
                <button type="button" className="commandRecentItem" key={search} onMouseDown={(event) => event.preventDefault()} onClick={() => {
                  setQuery(search);
                  setOpen(true);
                  inputRef.current?.focus();
                }}>
                  <span>↗</span>{search}
                </button>
              ))}
            </div>
          )}
          {results.length > 0 ? (
            results.map((calculator, index) => (
              <Link
                key={calculator.slug}
                href={calculator.slug === activeCalculator?.slug ? (smartTarget(query) ?? `/calculator/${calculator.slug}`) : `/calculator/${calculator.slug}`}
                className={index === activeIndex ? "commandResult commandResultActive" : "commandResult"}
                aria-current={calculator.slug === activeCalculator?.slug ? "true" : undefined}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  rememberSearch(query);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span className="commandResultIcon">{calculator.icon}</span>
                <span className="commandResultText">
                  <strong>{calculator.name}</strong>
                  <small>{calculator.category} · {calculator.description}</small>
                </span>
                <span className="commandArrow">↵</span>
              </Link>
            ))
          ) : (
            <div className="commandEmpty">
              No calculator found. Try EMI, GST, BMI, loan or percentage.
            </div>
          )}

          <div className="commandFooter">
            <span>↑ ↓ Navigate · Enter Open</span>
            <span>Esc Close</span>
          </div>
        </div>
      )}
    </div>
  );
}
