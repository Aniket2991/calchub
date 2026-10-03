"use client";

import Link from "next/link";
import { use } from "react";

const guides: Record<string, {
  title: string;
  description: string;
  calculator: string;
  sections: { heading: string; body: string }[];
}> = {
  "emi-calculator-guide": {
    title: "EMI Calculator Guide",
    description: "A practical guide to estimating monthly loan payments and understanding the main inputs behind an EMI calculation.",
    calculator: "/calculator/emi-calculator",
    sections: [
      { heading: "What is EMI?", body: "EMI stands for Equated Monthly Instalment. It is a regular payment used to repay a loan over a chosen tenure. A typical EMI calculation uses the principal amount, annual interest rate and number of monthly payments." },
      { heading: "What affects your EMI?", body: "A larger loan generally increases the payment. A higher interest rate generally increases both the payment and total interest. A longer tenure usually reduces the monthly payment but can increase the total interest paid over the full loan period." },
      { heading: "How to use CalcHub", body: "Enter the loan amount, annual interest rate and tenure in months. Select Calculate to see the estimated EMI, total repayment and total interest. The result is an estimate and actual lender terms can differ." },
    ],
  },
  "gst-calculator-guide": {
    title: "GST Calculator Guide",
    description: "Understand the difference between adding GST to a base amount and removing GST from a GST-inclusive price.",
    calculator: "/calculator/gst-calculator",
    sections: [
      { heading: "Adding GST", body: "When GST is added, the GST amount is calculated from the base amount and the selected GST rate. The final amount is the base amount plus GST." },
      { heading: "Removing GST", body: "When a displayed price already includes GST, simply subtracting the GST percentage is not the correct reverse calculation. The GST-inclusive amount is divided by one plus the applicable GST rate to estimate the underlying base amount." },
      { heading: "How to use CalcHub", body: "Enter the amount and GST rate, then choose Add GST or Remove GST. Check the base amount, GST amount and final amount shown in the result panel." },
    ],
  },
  "percentage-calculator-guide": {
    title: "Percentage Calculator Guide",
    description: "Learn the most common percentage calculations for everyday maths, discounts and comparisons.",
    calculator: "/calculator/percentage-calculator",
    sections: [
      { heading: "Finding a percentage of a number", body: "To find B percent of A, multiply A by B and divide by 100. For example, 20% of 500 is 100." },
      { heading: "Percentage change", body: "Percentage change compares an original value with a new value. CalcHub also has a dedicated Percentage Change calculator when you want to see the increase or decrease between two values." },
      { heading: "Avoid a common mistake", body: "A percentage and a percentage-point difference are not always the same thing. When comparing rates or percentages, make sure you know which comparison you actually need." },
    ],
  },
  "bmi-calculator-guide": {
    title: "BMI Calculator Guide",
    description: "Understand the BMI formula and why a BMI result should be treated as a screening measure rather than a diagnosis.",
    calculator: "/calculator/bmi-calculator",
    sections: [
      { heading: "What is BMI?", body: "Body mass index (BMI) is a calculation based on weight and height. It is commonly used as a screening measure for weight categories, but it does not directly measure body fat or overall health." },
      { heading: "How is BMI calculated?", body: "For metric units, BMI is calculated as weight in kilograms divided by height in metres squared. Enter your weight in kilograms and height in centimetres in CalcHub; the calculator converts the height before calculating BMI." },
      { heading: "Use the result carefully", body: "BMI can be less informative for some people, including highly muscular individuals and certain groups where different reference ranges may be appropriate. Use the result as general information, not as a medical diagnosis." },
    ],
  },
  "loan-calculator-guide": {
    title: "Loan Calculator Guide",
    description: "Understand how loan amount, interest rate and tenure influence monthly repayment and total interest.",
    calculator: "/calculator/loan-calculator",
    sections: [
      { heading: "The three main inputs", body: "A loan estimate normally starts with the principal, annual interest rate and repayment tenure. Changing any one of these inputs changes the estimated payment." },
      { heading: "Monthly payment versus total cost", body: "A longer tenure can make the monthly payment smaller while increasing the number of interest-bearing payments. Looking only at the monthly figure can therefore hide the total repayment cost." },
      { heading: "Use the estimate responsibly", body: "CalcHub provides a mathematical estimate. Actual loans can include processing fees, insurance, floating rates, prepayment rules, taxes or other lender-specific terms that are not represented by this simple calculator." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = guides[params.slug];
  if (!guide) return { title: "Guide Not Found | CalcHub" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: "/guides/" + params.slug },
  };
}

export default function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const guide = guides[slug];

  if (!guide) {
    return (
      <main className="container section">
        <h1>Guide not found</h1>
        <Link href="/guides">← Back to guides</Link>
      </main>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: "https://calchub-blond.vercel.app/guides/" + slug,
    publisher: { "@type": "Organization", name: "CalcHub" },
  };

  return (
    <main className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / <span>{guide.title}</span>
      </nav>

      <article className="panel contentSection">
        <div className="eyebrow">CALCHUB / GUIDE</div>
        <h1>{guide.title}</h1>
        <p className="lead">{guide.description}</p>

        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <div className="guideCta">
          <h2>Try the calculator</h2>
          <p>Put the guide into practice with the interactive CalcHub calculator.</p>
          <Link className="primary" href={guide.calculator}>Open calculator →</Link>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
