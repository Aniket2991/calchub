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
  {
    slug: "sip-calculator-guide",
    title: "SIP Calculator Guide",
    description: "Learn how monthly investments, expected returns and time can affect an estimated SIP value.",
  },
  {
    slug: "date-difference-guide",
    title: "Date Difference Guide",
    description: "Learn how to calculate the number of days between two dates and understand date-counting conventions.",
  },
  {
    slug: "length-converter-guide",
    title: "Length Converter Guide",
    description: "Learn how to convert metric and imperial length units accurately.",
  },
  {
    slug: "weight-converter-guide",
    title: "Weight Converter Guide",
    description: "Learn how to convert kilograms, grams, pounds and ounces.",
  },
  {
    slug: "temperature-converter-guide",
    title: "Temperature Converter Guide",
    description: "Learn how Celsius, Fahrenheit and Kelvin conversions work.",
  },
  {
    slug: "salary-calculator-guide",
    title: "Salary Calculator Guide",
    description: "Understand estimated salary deductions and take-home pay.",
  },
  {
    slug: "income-tax-calculator-guide",
    title: "Income Tax Calculator Guide",
    description: "Learn how an income tax estimate is calculated and why tax-year rules matter.",
  },
  {
    slug: "profit-loss-calculator-guide",
    title: "Profit Loss Calculator Guide",
    description: "Learn how to calculate profit, loss and the corresponding percentage.",
  },
  {
    slug: "percentage-change-guide",
    title: "Percentage Change Guide",
    description: "Learn how to calculate percentage increases and decreases between two values.",
  },
  {
    slug: "ratio-calculator-guide",
    title: "Ratio Calculator Guide",
    description: "Learn how to simplify ratios and compare equivalent relationships.",
  },
  {
    slug: "fraction-calculator-guide",
    title: "Fraction Calculator Guide",
    description: "Learn how to add, subtract, multiply and divide fractions.",
  },
  {
    slug: "time-calculator-guide",
    title: "Time Calculator Guide",
    description: "Learn how to add and subtract hours and minutes correctly.",
  },
  {
    slug: "hours-calculator-guide",
    title: "Hours Calculator Guide",
    description: "Learn how to calculate elapsed hours between two times.",
  },
  {
    slug: "age-difference-guide",
    title: "Age Difference Calculator Guide",
    description: "Learn how to calculate the difference between two dates of birth.",
  },
  {
    slug: "area-calculator-guide",
    title: "Area Calculator Guide",
    description: "Learn how to calculate the area of common geometric shapes.",
  },
  {
    slug: "volume-calculator-guide",
    title: "Volume Calculator Guide",
    description: "Learn how to calculate the volume of common three-dimensional shapes.",
  },
  {
    slug: "speed-calculator-guide",
    title: "Speed Calculator Guide",
    description: "Learn how speed, distance and travel time are related.",
  },
  {
    slug: "fuel-cost-guide",
    title: "Fuel Cost Calculator Guide",
    description: "Learn how to estimate fuel cost from distance, mileage and fuel price.",
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
