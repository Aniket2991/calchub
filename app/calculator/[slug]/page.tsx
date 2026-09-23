import CalculatorClient from "./CalculatorClient";

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CalculatorClient slug={slug} />;
}
