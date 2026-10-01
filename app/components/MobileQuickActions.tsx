"use client";

import Link from "next/link";
import { useMemo } from "react";
import { calculators } from "../../lib/calculators";

export default function MobileQuickActions() {
  const popular = useMemo(() => {
    const slugs = [
      "emi-calculator",
      "percentage-calculator",
      "gst-calculator",
      "age-calculator",
      "bmi-calculator",
      "loan-calculator",
    ];

    return slugs
      .map((slug) => calculators.find((calculator) => calculator.slug === slug))
      .filter(Boolean)
      .slice(0, 6);
  }, []);

  return (
    <section className="mobileQuickActions" aria-label="Quick calculators">
      <div className="mobileQuickHead">
        <div>
          <span className="mobileQuickEyebrow">CALCHUB</span>
          <h2>Quick calculators</h2>
        </div>
        <Link href="/my-calculators">My Calc →</Link>
      </div>

      <div className="mobileQuickGrid">
        {popular.map((calculator) => (
          <Link
            key={calculator!.slug}
            href={`/calculator/${calculator!.slug}`}
            className="mobileQuickCard"
          >
            <span className="mobileQuickIcon">{calculator!.icon}</span>
            <strong>{calculator!.name}</strong>
            <small>{calculator!.category}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
