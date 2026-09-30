import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";
import { getCalculator } from "../../../lib/calculators";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://calchub-blond.vercel.app";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator) {
    return {
      title: "Calculator | CalcHub",
      description:
        "Use free online calculators for finance, math, health, dates and everyday conversions.",
    };
  }

  return {
    title: `${calculator.name} — Free Online Calculator`,
    description: `${calculator.description} Use the free ${calculator.name.toLowerCase()} on CalcHub for quick and easy calculations.`,
    alternates: {
      canonical: `${SITE_URL}/calculator/${slug}`,
    },
    openGraph: {
      title: `${calculator.name} — Free Online Calculator`,
      description: calculator.description,
      url: `${SITE_URL}/calculator/${slug}`,
      siteName: "CalcHub",
      type: "website",
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator) {
    return <CalculatorClient slug={slug} />;
  }

  const calculatorUrl = `${SITE_URL}/calculator/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CalcHub",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: calculator.category,
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculator.name,
        item: calculatorUrl,
      },
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    url: calculatorUrl,
    description: calculator.description,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    publisher: {
      "@type": "Organization",
      name: "CalcHub",
      url: `${SITE_URL}/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />

      <CalculatorClient slug={slug} />
    </>
  );
}
