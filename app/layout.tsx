import type { Metadata } from "next";
import "./globals.css";
import AIChat from "./components/AIChat";

export const metadata: Metadata = {
  title: {
    default: "CalcHub — Free Online Calculators",
    template: "%s | CalcHub"
  },
  description:
    "Fast, free and easy-to-use online calculators for finance, math, health, dates and everyday conversions.",
  keywords: [
    "online calculator",
    "EMI calculator",
    "SIP calculator",
    "GST calculator",
    "age calculator",
    "BMI calculator",
    "percentage calculator"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<AIChat /></body>
    </html>
  );
}