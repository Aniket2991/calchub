import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";
import { calculators, getCalculator } from "../../../lib/calculators";
import { calculatorContent } from "../../../lib/calculator-content";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://calchub-blond.vercel.app";

export function generateStaticParams() {
  return calculators.map((calculator) => ({
    slug: calculator.slug,
  }));
}

const categorySlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function cleanDescription(text: string, maxLength = 155) {
  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  return `${clean.slice(0, maxLength - 3).trimEnd()}...`;
}

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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const content = calculatorContent[calculator.slug];
  const description = cleanDescription(
    content?.intro || calculator.description
  );
  const canonicalUrl = `${SITE_URL}/calculator/${calculator.slug}`;

  return {
    title: `${calculator.name} — Free Online Calculator`,
    keywords: [
      calculator.name,
      `${calculator.name} online`,
      `free ${calculator.name.toLowerCase()}`,
      "online calculator",
      "CalcHub",
    ],
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${calculator.name} — Free Online Calculator`,
      description,
      url: canonicalUrl,
      siteName: "CalcHub",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${calculator.name} — Free Online Calculator`,
      description,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator) {
    return <CalculatorClient slug={slug} />;
  }

  const calculatorUrl = `${SITE_URL}/calculator/${calculator.slug}`;
  const content = calculatorContent[calculator.slug];

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
        item: SITE_URL + "/category/" + categorySlug(calculator.category),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculator.name,
        item: calculatorUrl,
      },
    ],
  };

  const faqSchema =
    content?.faqs?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const howToSchema = content?.tips?.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use the ${calculator.name}`,
        description: `Step-by-step instructions for using the ${calculator.name} on CalcHub.`,
        totalTime: "PT2M",
        tool: [
          {
            "@type": "HowToTool",
            name: "CalcHub calculator",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Enter values",
            text: "Enter the required values in the calculator fields.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Review inputs",
            text: "Check the values and options you entered.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Calculate",
            text: "Press Calculate to see the result and supporting details.",
          },
        ],
      }
    : null;

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    url: calculatorUrl,
    description: calculator.description,
    applicationCategory:
      calculator.category === "Finance"
        ? "FinanceApplication"
        : calculator.category === "Health"
          ? "HealthApplication"
          : "UtilitiesApplication",
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

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      )}

      <CalculatorClient slug={slug} />
    </>
  );
}
