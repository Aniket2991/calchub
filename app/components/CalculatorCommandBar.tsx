"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculators } from "../../lib/calculators";

export default function CalculatorCommandBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
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

  return (
    <div className="commandBarWrap">
      <div className={open ? "commandBar commandBarOpen" : "commandBar"}>
        <span className="commandIcon" aria-hidden="true">⌕</span>

        <input
          ref={inputRef}
          aria-label="Find a calculator"
          placeholder="Find a calculator…"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && first) {
              window.location.href = `/calculator/${first.slug}`;
            }
          }}
        />

        <kbd>Ctrl K</kbd>
      </div>

      {open && (
        <div className="commandResults">
          {results.length > 0 ? (
            results.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/calculator/${calculator.slug}`}
                className="commandResult"
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
            <span>Press Enter to open</span>
            <span>Esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
