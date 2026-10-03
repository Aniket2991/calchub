import Link from "next/link";

export const metadata = {
  title: "Loan Calculator Guide",
  description:
    "Learn how loan amount, interest rate and tenure affect EMI, total repayment and total interest.",
};

export default function LoanGuide() {
  return (
    <main className="container section">
      <Link href="/guides">← All guides</Link>
      <h1>Loan Calculator Guide</h1>
      <p className="lead">
        A loan calculator helps estimate monthly repayment and the total cost
        of borrowing from the values you enter.
      </p>

      <h2>The three main inputs</h2>
      <ul>
        <li><strong>Principal:</strong> the amount borrowed.</li>
        <li><strong>Interest rate:</strong> the annual borrowing rate.</li>
        <li><strong>Tenure:</strong> how long the loan is repaid.</li>
      </ul>

      <h2>How tenure changes the result</h2>
      <p>
        Increasing the tenure generally spreads repayment over more months.
        This can reduce the monthly payment while increasing the amount of
        interest paid over the full repayment period.
      </p>

      <h2>What the calculator cannot know</h2>
      <p>
        An estimate does not automatically include every lender-specific fee,
        insurance charge, processing fee, rate reset, penalty or other loan
        condition. Check the lender's actual offer before making a decision.
      </p>

      <p>
        <Link href="/calculator/loan-calculator">Open the Loan Calculator →</Link>
      </p>
    </main>
  );
}
