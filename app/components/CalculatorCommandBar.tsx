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

  if (/\bemi\b/.test(q) || /\bloan\b/.test(q)) {
    const slug = pick(/\bemi\b/.test(q) ? "emi-calculator" : "loan-calculator");
    if (slug && values[0] && percent[0] !== undefined && years) {
      params.set("p", String(values[0])); params.set("rate", String(percent[0])); params.set("months", String(Number(years) * 12));
      return `/calculator/${slug}?${params}`;
    }
  }
  if (/\bsip\b/.test(q) && values.length >= 1 && percent[0] !== undefined && years) {
    params.set("p", String(values[0])); params.set("rate", String(percent[0])); params.set("months", String(Number(years) * 12));
    return `/calculator/${pick("sip-calculator")}?${params}`;
  }
  if (/\bgst\b/.test(q) && values[0] !== undefined && percent[0] !== undefined) {
    params.set("amount", String(values[0])); params.set("gst", String(percent[0]));
    return `/calculator/${pick("gst-calculator")}?${params}`;
  }
  if (/\bdiscount\b/.test(q) && values[0] !== undefined && percent[0] !== undefined) {
    params.set("price", String(values[0])); params.set("discount", String(percent[0]));
    return `/calculator/${pick("discount-calculator")}?${params}`;
  }
  if (/\bbmi\b/.test(q) && values.length >= 2) {
    params.set("weight", String(values[0])); params.set("height", String(values[1]));
    return `/calculator/${pick("bmi-calculator")}?${params}`;
  }
  if (/\bpercentage\b|\bpercent\b/.test(q) && values.length >= 2) {
    params.set("a", String(values[0])); params.set("b", String(values[1]));
    return `/calculator/${pick("percentage-calculator")}?${params}`;
  }
  return null;
}

export default function CalculatorCommandBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
              if (selected) window.location.href = smartTarget(query) ?? `/calculator/${selected.slug}`;
            }
          }}
        />

        <kbd>Ctrl K</kbd>
      </div>

      {open && (
        <div className="commandResults">
          {results.length > 0 ? (
            results.map((calculator, index) => (
              <Link
                key={calculator.slug}
                href={calculator.slug === activeCalculator?.slug ? (smartTarget(query) ?? `/calculator/${calculator.slug}`) : `/calculator/${calculator.slug}`}
                className={index === activeIndex ? "commandResult commandResultActive" : "commandResult"}
                aria-current={calculator.slug === activeCalculator?.slug ? "true" : undefined}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
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
