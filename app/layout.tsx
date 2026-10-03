import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AIChat from "./components/AIChat";
import ThemeToggle from "./components/ThemeToggle";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import MobileNav from "./components/MobileNav";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: "/icon-192.svg",
  },

  appleWebApp: {
    capable: true,
    title: "CalcHub",
    statusBarStyle: "default",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("calchub-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6788658995256013"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>

      <body>
        {children}
        <ThemeToggle />
        <AIChat />
        <ServiceWorkerRegister />
        <MobileNav />
      </body>
    </html>
  );
}
