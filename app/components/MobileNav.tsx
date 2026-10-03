"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMyCalculators = pathname.startsWith("/my-calculators");

  const items = [
    { href: "/", label: "Home", icon: "⌂" },
    { href: "/#popular", label: "Popular", icon: "★" },
    { href: "/my-calculators", label: "My Calc", icon: "▣" },
    { href: "/#categories", label: "Categories", icon: "☷" },
  ];

  return (
    <nav className="mobileNav" aria-label="Mobile navigation">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            (item.href === "/" && isHome) ||
            (item.href === "/my-calculators" && isMyCalculators)
              ? "mobileNavItem active"
              : "mobileNavItem"
          }
        >
          <span aria-hidden="true">{item.icon}</span>
          <small>{item.label}</small>
        </Link>
      ))}
    </nav>
  );
}
