import Link from "next/link";

export const metadata = {
  title: "Calculator Guides",
  description:
    "Practical guides explaining how to use common calculators and understand the results.",
};

const guides = [
  {
    slug: "emi-calculator-guide",
    title: "EMI Calculator Guide",
    description:
      "Learn how EMI is calculated, what affects your monthly payment, and how to read the result.",
  },
  {
    slug: "gst-calculator-guide",
    title: "GST Calculator Guide",
    description:
      "Understand GST-inclusive and GST-exclusive calculations with simple examples.",
  },
  {
    slug: "percentage-calculator-guide",
    title: "Percentage Calculator Guide",
    description:
      "Learn the common percentage formulas for discounts, increases, decreases and comparisons.",
  },
  {
    slug: "bmi-calculator-guide",
    title: "BMI Calculator Guide",
    description:
      "Understand BMI, the calculation formula and what the result can and cannot tell you.",
  },
  {
    slug: "loan-calculator-guide",
    title: "Loan Calculator Guide",
    description:
      "See how loan amount, interest rate and tenure affect repayment and total interest.",
  },
  {
    slug: "discount-calculator-guide",
    title: "Discount Calculator Guide",
    description:
      "Learn how to calculate discounts, savings and final sale prices.",
  },
  {
    slug: "simple-interest-guide",
    title: "Simple Interest Guide",
    description:
      "Understand simple interest, the formula and how to interpret the result.",
  },
  {
    slug: "compound-interest-guide",
    title: "Compound Interest Guide",
    description:
      "Learn how compounding frequency, rate and time affect growth.",
  },
  {
    slug: "age-calculator-guide",
    title: "Age Calculator Guide",
    description:
      "Learn how age is calculated from a date of birth and the current date.",
  },
  {
    slug: "average-calculator-guide",
    title: "Average Calculator Guide",
    description:
      "Learn how to calculate an arithmetic average and avoid common input mistakes.",
  },
];

export default function GuidesPage() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <div className="sectionHead" style={{ marginTop: 28 }}>
        <div>
          <div className="eyebrow">CALCHUB / GUIDES</div>
          <h1>Calculator Guides</h1>
          <p className="lead">
            Short, practical explanations to help you choose the right
            calculator, enter the right values and understand the result.
          </p>
        </div>
      </div>

      <div className="grid">
        {guides.map((guide) => (
          <Link
            className="card cardMainLink"
            href={"/guides/" + guide.slug}
            key={guide.slug}
          >
            <div className="icon">?</div>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <span className="textLink">Read guide →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
