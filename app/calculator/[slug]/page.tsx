import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";
import { getCalculator } from "../../../lib/calculators";

type Props = {
  params: Promise<{ slug: string }>;
};

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
      canonical: `https://calchub-blond.vercel.app/calculator/${slug}`,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;

  return <CalculatorClient slug={slug} />;
}
