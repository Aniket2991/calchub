import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalcHub — Free All-in-One Calculators",
  description: "Fast, free online calculators for finance, math, health, dates and everyday conversions.",
  keywords: ["calculator", "EMI calculator", "GST calculator", "SIP calculator", "BMI calculator", "age calculator"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}