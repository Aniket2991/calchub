import type { Metadata } from "next";
import "./globals.css";
import AIChat from "./components/AIChat";

export const metadata: Metadata = {
  metadataBase: new URL("https://calchub-blond.vercel.app"),

  title: {
    default: "CalcHub — Free Online Calculators",
    template: "%s | CalcHub",
  },

  description:
    "Free online calculators for EMI, SIP, GST, percentage, BMI, age, interest, discounts, conversions and more. Fast and easy to use.",

  keywords: [
    "online calculators",
    "free online calculator",
    "EMI calculator",
    "SIP calculator",
    "GST calculator",
    "percentage calculator",
    "BMI calculator",
    "age calculator",
    "compound interest calculator",
    "simple interest calculator",
    "discount calculator",
    "unit converter",
  ],

  alternates: {
    canonical: "https://calchub-blond.vercel.app/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "CalcHub — Free Online Calculators",
    description:
      "Free calculators for finance, math, health, dates, and everyday conversions.",
    url: "https://calchub-blond.vercel.app/",
    siteName: "CalcHub",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "CalcHub — Free Online Calculators",
    description:
      "Free calculators for finance, math, health, dates, and everyday conversions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6788658995256013"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        {children}
        <AIChat />
      </body>
    </html>
  );
}
