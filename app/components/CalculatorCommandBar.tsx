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
  const q = query.toLowerCase().trim();
  const pick = (slug: string) => calculators.find((c) => c.slug === slug)?.slug;

  const params = new URLSearchParams();
  const link = (slug: string) => {
    const target = pick(slug);
    return target ? `/calculator/${target}?${params.toString()}` : null;
  };

  const parseDate = (value: string) => {
    const iso = value.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
    if (iso) return value;

    const dmy = value.match(/^(\\d{1,2})[\\/-](\\d{1,2})[\\/-](\\d{4})$/);
    if (!dmy) return null;

    return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
  };

  const numberPattern = /([0-9]*\\.?[0-9]+)\\s*(lakh|lac|crore|cr|k)?/gi;
  const parseNumber = (value: string) => {
    const match = value.toLowerCase().replace(/,/g, "").match(/([0-9]*\\.?[0-9]+)\\s*(lakh|lac|crore|cr|k)?/);
    if (!match) return null;
    const base = Number(match[1]);
    if (!Number.isFinite(base)) return null;

    switch (match[2]) {
      case "lakh":
      case "lac":
        return base * 100000;
      case "crore":
      case "cr":
        return base * 10000000;
      case "k":
        return base * 1000;
      default:
        return base;
    }
  };

  const rawNumbers = [...q.matchAll(numberPattern)].map((m) => m[0]);
  const values = rawNumbers
    .map(parseNumber)
    .filter((n): n is number => n !== null);
  const percent = [...q.matchAll(/([0-9]*\\.?[0-9]+)\\s*%/g)].map((m) => Number(m[1]));
  const yearsMatch = q.match(/([0-9]*\\.?[0-9]+)\\s*(?:years?|yrs?)/);
  const years = yearsMatch ? Number(yearsMatch[1]) : null;

  if (/\\bemi\\b/.test(q) && values[0] !== undefined && percent[0] !== undefined && years) {
    params.set("p", String(values[0]));
    params.set("rate", String(percent[0]));
    params.set("months", String(years * 12));
    return link("emi-calculator");
  }

  if (/\\bloan\\b/.test(q) && values[0] !== undefined && percent[0] !== undefined && years) {
    params.set("p", String(values[0]));
    params.set("rate", String(percent[0]));
    params.set("months", String(years * 12));
    return link("loan-calculator");
  }

  if (/\\bsip\\b/.test(q) && values[0] !== undefined && percent[0] !== undefined && years) {
    params.set("p", String(values[0]));
    params.set("rate", String(percent[0]));
    params.set("months", String(years * 12));
    return link("sip-calculator");
  }

  if (/\\bgst\\b/.test(q) && values[0] !== undefined && percent[0] !== undefined) {
    params.set("amount", String(values[0]));
    params.set("gst", String(percent[0]));
    params.set("mode", /\\b(remove|exclusive|excluding)\\b/.test(q) ? "remove" : "add");
    return link("gst-calculator");
  }

  if (/\\bdiscount\\b/.test(q) && values[0] !== undefined && percent[0] !== undefined) {
    params.set("price", String(values[0]));
    params.set("discount", String(percent[0]));
    return link("discount-calculator");
  }

  if (/\\bbmi\\b/.test(q) && values.length >= 2) {
    params.set("weight", String(values[0]));
    params.set("height", String(values[1]));
    return link("bmi-calculator");
  }

  if (/\\bincome\\s+tax\\b|\\btax\\b/.test(q) && values[0] !== undefined) {
    params.set("income", String(values[0]));
    params.set("regime", /\\bold\\b/.test(q) ? "old" : "new");
    return link("income-tax-calculator");
  }

  if (/\\bsalary\\b/.test(q) && values[0] !== undefined) {
    params.set("gross", String(values[0]));
    if (values[1] !== undefined) params.set("deductions", String(values[1]));
    return link("salary-calculator");
  }

  if (/\\bprofit\\b|\\bloss\\b/.test(q) && values.length >= 2) {
    params.set("cost", String(values[0]));
    params.set("selling", String(values[1]));
    return link("profit-loss-calculator");
  }

  if (/\\bpercentage\\s+change\\b|\\bpercent\\s+change\\b/.test(q) && values.length >= 2) {
    params.set("original", String(values[0]));
    params.set("current", String(values[1]));
    return link("percentage-change-calculator");
  }

  if (/\\bpercentage\\b|\\bpercent\\b/.test(q) && values.length >= 2) {
    params.set("a", String(values[0]));
    params.set("b", String(values[1]));
    return link("percentage-calculator");
  }

  if (/\\bcompound\\s+interest\\b|\\bcompound\\b/.test(q) && values.length >= 3) {
    params.set("p", String(values[0]));
    params.set("rate", String(values[1]));
    params.set("years", String(values[2]));
    params.set("frequency", String(values[3] ?? 12));
    return link("compound-interest");
  }

  if (/\\bsimple\\s+interest\\b|\\bsimple\\s+interest\\b/.test(q) && values.length >= 3) {
    params.set("p", String(values[0]));
    params.set("rate", String(values[1]));
    params.set("years", String(values[2]));
    return link("simple-interest");
  }

  if (/\\bratio\\b/.test(q)) {
    const ratio = q.match(/([0-9]+(?:\\.[0-9]+)?)\\s*[:\\/]\\s*([0-9]+(?:\\.[0-9]+)?)/);
    if (ratio) {
      params.set("a", ratio[1]);
      params.set("b", ratio[2]);
      return link("ratio-calculator");
    }
  }

  if (/\\bfraction\\b/.test(q)) {
    const fraction = q.match(/(\\d+)\\s*\\/\\s*(\\d+)\\s*([+\\-*])\\s*(\\d+)\\s*\\/\\s*(\\d+)/);
    if (fraction) {
      params.set("n1", fraction[1]);
      params.set("d1", fraction[2]);
      params.set("n2", fraction[4]);
      params.set("d2", fraction[5]);
      params.set("operation", fraction[3] === "+" ? "add" : fraction[3] === "-" ? "subtract" : "multiply");
      return link("fraction-calculator");
    }
  }

  if (/\\baverage\\b|\\bmean\\b/.test(q) && values.length >= 2) {
    params.set("numbers", values.join(","));
    return link("average-calculator");
  }

  if (/\\btime\\b/.test(q)) {
    const times = [...q.matchAll(/(\\d{1,2})\\s*(?:hours?|h)\\s*(\\d{1,2})?\\s*(?:minutes?|m)?/g)];
    if (times.length >= 2) {
      params.set("h1", times[0][1]);
      params.set("m1", times[0][2] ?? "0");
      params.set("h2", times[1][1]);
      params.set("m2", times[1][2] ?? "0");
      params.set("operation", /\\bsubtract|minus|difference\\b/.test(q) ? "subtract" : "add");
      return link("time-calculator");
    }
  }

  if (/\\bhours?\\b/.test(q)) {
    const times = [...q.matchAll(/(\\d{1,2}):([0-5]\\d)/g)];
    if (times.length >= 2) {
      params.set("startTime", `${times[0][1].padStart(2, "0")}:${times[0][2]}`);
      params.set("endTime", `${times[1][1].padStart(2, "0")}:${times[1][2]}`);
      return link("hours-calculator");
    }
  }

  if (/\\barea\\b/.test(q) && values.length >= 1) {
    const shape = /\\bcircle\\b/.test(q) ? "circle" : /\\btriangle\\b/.test(q) ? "triangle" : "rectangle";
    params.set("shape", shape);
    params.set("a", String(values[0]));
    if (shape !== "circle") params.set("b", String(values[1] ?? 0));
    return link("area-calculator");
  }

  if (/\\bvolume\\b/.test(q) && values.length >= 1) {
    const shape = /\\bcylinder\\b/.test(q) ? "cylinder" : /\\bsphere\\b/.test(q) ? "sphere" : "cuboid";
    params.set("shape", shape);
    params.set("a", String(values[0]));
    if (values[1] !== undefined) params.set("b", String(values[1]));
    if (values[2] !== undefined) params.set("c", String(values[2]));
    return link("volume-calculator");
  }

  if (/\\bspeed\\b/.test(q) && values.length >= 2) {
    params.set("distance", String(values[0]));
    params.set("time", String(values[1]));
    return link("speed-calculator");
  }

  if (/\\bfuel\\b|\\bmileage\\b/.test(q) && values.length >= 3) {
    params.set("distance", String(values[0]));
    params.set("mileage", String(values[1]));
    params.set("fuelPrice", String(values[2]));
    return link("fuel-cost-calculator");
  }

  if (/\\btemperature\\b|\\bconvert\\b.*\\b(c|f|k)\\b/.test(q)) {
    const match = q.match(/([0-9]*\\.?[0-9]+)\\s*(?:degrees?\\s*)?(c|f|k)\\s*(?:to|in)\\s*(c|f|k)/);
    if (match) {
      params.set("value", match[1]);
      params.set("from", match[2].toUpperCase());
      params.set("to", match[3].toUpperCase());
      return link("temperature-converter");
    }
  }

  if (/\\bconvert\\b/.test(q) && /\\b(mm|cm|m|km|in|ft|yd|mi)\\b/.test(q) && values[0] !== undefined) {
    const match = q.match(/(?:convert\\s+)?[0-9]*\\.?[0-9]+\\s*(mm|cm|m|km|in|ft|yd|mi)\\s+(?:to|in)\\s+(mm|cm|m|km|in|ft|yd|mi)/);
    if (match) {
      params.set("value", String(values[0]));
      params.set("from", match[1]);
      params.set("to", match[2]);
      return link("length-converter");
    }
  }

  if (/\\bconvert\\b/.test(q) && /\\b(g|kg|lb|oz)\\b/.test(q) && values[0] !== undefined) {
    const match = q.match(/(?:convert\\s+)?[0-9]*\\.?[0-9]+\\s*(g|kg|lb|oz)\\s+(?:to|in)\\s+(g|kg|lb|oz)/);
    if (match) {
      params.set("value", String(values[0]));
      params.set("from", match[1]);
      params.set("to", match[2]);
      return link("weight-converter");
    }
  }

  if (/\\bage\\b/.test(q)) {
    const dateMatch = q.match(/(\\d{4}-\\d{2}-\\d{2}|\\d{1,2}[\\/-]\\d{1,2}[\\/-]\\d{4})/);
    if (dateMatch) {
      const date = parseDate(dateMatch[1]);
      if (date) {
        params.set("dob", date);
        return link("age-calculator");
      }
    }
  }

  if (/\\bdate\\s+diff|\\bdate\\s+difference/.test(q)) {
    const dates = [...q.matchAll(/(\\d{4}-\\d{2}-\\d{2}|\\d{1,2}[\\/-]\\d{1,2}[\\/-]\\d{4})/g)];
    if (dates.length >= 2) {
      const firstDate = parseDate(dates[0][1]);
      const secondDate = parseDate(dates[1][1]);
      if (firstDate && secondDate) {
        params.set("start", firstDate);
        params.set("end", secondDate);
        return link("date-difference");
      }
    }
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
        ].join(" ").toLowerCase();

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
  const listboxId = "calchub-calculator-results";
  const activeOptionId = activeCalculator ? `calchub-result-${activeCalculator.slug}` : undefined;

  return (
    <div className="commandBarWrap">
      <div className={open ? "commandBar commandBarOpen" : "commandBar"}>
        <span className="commandIcon" aria-hidden="true">⌕</span>

        <input
          ref={inputRef}
          aria-label="Find a calculator"
          aria-autocomplete="list"
          aria-controls={open ? listboxId : undefined}
          aria-expanded={open}
          aria-activedescendant={open ? activeOptionId : undefined}
          role="combobox"
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
              if (selected) {
                rememberSearch(query);
                window.location.href = smartTarget(query) ?? `/calculator/${selected.slug}`;
              }
            }
          }}
        />
        <kbd aria-hidden="true">Ctrl K</kbd>
      </div>

      {open && (
        <div className="commandResults" id={listboxId} role="listbox" aria-label="Calculator results">
          {!query.trim() && recentSearches.length > 0 && (
            <div className="commandRecent">
              <div className="commandRecentHead">
                <span>Recent searches</span>
                <button type="button" aria-label="Clear recent searches" onMouseDown={(event) => event.preventDefault()} onClick={() => {
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
                  <span aria-hidden="true">↗</span>{search}
                </button>
              ))}
            </div>
          )}

          {results.length > 0 ? (
            results.map((calculator, index) => (
              <Link
                key={calculator.slug}
                id={`calchub-result-${calculator.slug}`}
                role="option"
                aria-selected={index === activeIndex}
                href={calculator.slug === activeCalculator?.slug ? (smartTarget(query) ?? `/calculator/${calculator.slug}`) : `/calculator/${calculator.slug}`}
                className={index === activeIndex ? "commandResult commandResultActive" : "commandResult"}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  rememberSearch(query);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span className="commandResultIcon" aria-hidden="true">{calculator.icon}</span>
                <span className="commandResultText">
                  <strong>{calculator.name}</strong>
                  <small>{calculator.category} · {calculator.description}</small>
                </span>
                <span className="commandArrow" aria-hidden="true">↵</span>
              </Link>
            ))
          ) : (
            <div className="commandEmpty" role="status">
              No calculator found. Try EMI, GST, BMI, loan or percentage.
            </div>
          )}

          <div className="commandFooter" aria-hidden="true">
            <span>↑ ↓ Navigate · Enter Open</span>
            <span>Esc Close</span>
          </div>
        </div>
      )}
    </div>
  );
}
