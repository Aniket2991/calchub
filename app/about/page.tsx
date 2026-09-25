import Link from "next/link";

export const metadata = {
  title: "About CalcHub",
  description:
    "Learn about CalcHub and our goal of providing simple, useful online calculators.",
};

export default function About() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <h1>About CalcHub</h1>

      <p className="lead">
        CalcHub is a collection of simple online calculators designed to help
        with everyday calculations quickly and easily.
      </p>

      <h2>What is CalcHub?</h2>

      <p>
        CalcHub brings commonly used calculators together in one place.
        Instead of searching for a different tool for every calculation,
        users can find finance, math, health, date and conversion calculators
        from a single website.
      </p>

      <h2>Our Goal</h2>

      <p>
        Our goal is to make everyday calculations easier to understand and
        simpler to perform. We focus on clean interfaces, straightforward
        inputs and clearly presented results.
      </p>

      <h2>What You Can Calculate</h2>

      <p>
        CalcHub currently provides tools for areas such as:
      </p>

      <ul>
        <li>Finance and loan calculations</li>
        <li>Investment and SIP calculations</li>
        <li>GST and discount calculations</li>
        <li>Percentage and mathematical calculations</li>
        <li>BMI and other everyday health calculations</li>
        <li>Age and date calculations</li>
        <li>Length, weight and temperature conversions</li>
      </ul>

      <h2>Our Approach</h2>

      <p>
        We aim to keep CalcHub simple, fast and accessible. Calculators are
        intended to provide estimates based on the information entered by the
        user. For financial, health or other important decisions, users
        should verify the relevant information with appropriate sources.
      </p>

      <h2>Free to Use</h2>

      <p>
        CalcHub is designed to provide its calculators free of charge.
        Advertising and other website features may help support the continued
        development and maintenance of the service.
      </p>

      <h2>Contact</h2>

      <p>
        If you have a question, suggestion or notice an issue with a
        calculator, please visit our Contact page.
      </p>
    </main>
  );
}