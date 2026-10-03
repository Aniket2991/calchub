import Link from "next/link";

export const metadata = {
  title: "EMI Calculator Guide",
  description:
    "Learn how EMI is calculated, what affects your monthly payment and how to use an EMI calculator.",
};

export default function EmiGuide() {
  return (
    <main className="container section">
      <Link href="/guides">← All guides</Link>
      <h1>EMI Calculator Guide</h1>
      <p className="lead">
        An EMI calculator estimates the fixed monthly payment for a loan when
        you know the principal, annual interest rate and repayment tenure.
      </p>

      <h2>How EMI is calculated</h2>
      <p>
        The standard reducing-balance EMI formula uses the loan principal,
        monthly interest rate and number of monthly payments. The calculator
        applies the formula and shows the estimated monthly EMI, total
        repayment and total interest.
      </p>

      <h2>What to enter</h2>
      <ul>
        <li><strong>Loan amount:</strong> the amount borrowed.</li>
        <li><strong>Interest rate:</strong> the annual rate in percent.</li>
        <li><strong>Tenure:</strong> the repayment period in months.</li>
      </ul>

      <h2>Example</h2>
      <p>
        For a ₹5,00,000 loan at 9% annual interest over 60 months, the
        estimated EMI is about ₹10,379.18. The actual lender quote can differ
        because of fees, rate changes, insurance or other terms.
      </p>

      <h2>How to use the result</h2>
      <p>
        Compare the EMI with your budget, then look at total interest rather
        than only the monthly payment. A longer tenure can reduce the monthly
        payment while increasing total interest.
      </p>

      <p>
        <Link href="/calculator/emi-calculator">Open the EMI Calculator →</Link>
      </p>
    </main>
  );
}
