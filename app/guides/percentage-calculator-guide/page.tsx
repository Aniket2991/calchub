import Link from "next/link";

export const metadata = {
  title: "Percentage Calculator Guide",
  description:
    "Learn common percentage calculations including percentage of a number, increases, decreases and comparisons.",
};

export default function PercentageGuide() {
  return (
    <main className="container section">
      <Link href="/guides">← All guides</Link>
      <h1>Percentage Calculator Guide</h1>
      <p className="lead">
        Percentages are used for discounts, marks, growth, tax, commissions
        and many everyday comparisons.
      </p>

      <h2>Percentage of a number</h2>
      <p>
        To find a percentage of a number, convert the percentage to a decimal
        and multiply it by the number. For example, 20% of 500 is 100.
      </p>

      <h2>Percentage increase</h2>
      <p>
        Compare the change with the original value. If a value moves from 100
        to 120, the increase is 20%.
      </p>

      <h2>Percentage decrease</h2>
      <p>
        The same principle applies to decreases: divide the reduction by the
        original value and multiply by 100.
      </p>

      <h2>Why the original value matters</h2>
      <p>
        Percentage change depends on the starting value. A ₹100 increase from
        ₹500 is 20%, while the same ₹100 increase from ₹1,000 is 10%.
      </p>

      <p>
        <Link href="/calculator/percentage-calculator">
          Open the Percentage Calculator →
        </Link>
      </p>
    </main>
  );
}
