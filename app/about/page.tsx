import Link from "next/link";

export const metadata = {
  title: "About CalcHub",
  description:
    "Learn how CalcHub builds practical online calculators, explains formulas and handles corrections.",
};

export default function About() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <h1>About CalcHub</h1>

      <p className="lead">
        CalcHub is a free collection of online calculators for everyday
        financial, mathematical, date, health and unit-conversion tasks. Our
        aim is to make common calculations easier to perform and easier to
        check—not to replace professional advice or official sources.
      </p>

      <h2>What CalcHub helps you do</h2>
      <p>
        The site brings related tools together so you can compare scenarios
        without repeatedly working through formulas by hand. For example,
        you can compare monthly loan instalments and total interest, calculate
        a GST-inclusive price, estimate savings from a discount, or convert
        between temperature and length units.
      </p>
      <ul>
        <li><Link href="/category/finance">Finance calculators</Link> for loan estimates, interest, SIP projections, salary estimates and tax calculations.</li>
        <li><Link href="/category/math">Math calculators</Link> for percentages, averages, ratios, fractions, area and volume.</li>
        <li><Link href="/category/date-and-time">Date and time calculators</Link> for age, date differences and elapsed time.</li>
        <li><Link href="/category/conversion">Conversion calculators</Link> for length, weight, temperature and everyday quantities.</li>
        <li><Link href="/category/health">Health calculators</Link> for general calculations such as body mass index.</li>
      </ul>

      <h2>How to use a result responsibly</h2>
      <p>
        Start by checking the units and assumptions requested by the tool.
        Enter the values in the units shown, calculate, then compare the
        displayed result with the supporting details. When comparing two
        scenarios, change one input at a time so you can see what caused the
        difference.
      </p>
      <p>
        Calculator outputs are estimates based on the inputs and formula used.
        A loan estimate may not include lender fees or insurance; an investment
        projection is not a promise of returns; a GST calculation does not
        determine the legally applicable tax rate; and BMI is not a diagnosis.
        Check official information or consult a qualified professional before
        making important financial, tax or health decisions.
      </p>

      <h2>Calculation approach and limitations</h2>
      <p>
        CalcHub uses explicit mathematical formulas for its calculators. For
        example, a standard reducing-balance EMI estimate uses the principal,
        monthly interest rate and number of monthly payments. Simple interest
        uses principal, rate and time, while a basic unit converter applies
        defined conversion relationships. The relevant formula and practical
        guidance are provided on calculator pages where available.
      </p>
      <p>
        Different providers may use different rounding rules, compounding
        conventions, tax assumptions or date-counting conventions. Results
        can therefore differ from a bank quote, invoice, official assessment
        or another calculator. Always review the assumptions that apply to
        your specific situation.
      </p>

      <h2>Content and maintenance</h2>
      <p>
        We aim to keep calculator instructions understandable and to explain
        common input mistakes and limitations. The site and its calculations
        may be updated as issues are identified or features change. We do not
        claim that every calculation has been independently audited or that
        every rule is automatically current for every jurisdiction.
      </p>
      <p>
        If a result appears incorrect, please send the calculator name, the
        input values, the result shown and what you expected to see. Do not
        include passwords, account numbers or other sensitive information.
        This information helps us reproduce and investigate a possible issue.
      </p>

      <h2>Free access and privacy</h2>
      <p>
        CalcHub is intended to be free to use. Website operation may be
        supported by advertising. Read our <Link href="/privacy">Privacy Policy</Link>
        to understand the use of analytics and advertising services, and our
        <Link href="/terms"> Terms of Use</Link> for important limitations.
      </p>

      <h2>Contact and corrections</h2>
      <p>
        Suggestions, correction reports and feature requests are welcome.
        Visit our <Link href="/contact">Contact page</Link> to submit an issue.
        Include enough non-sensitive detail to help us reproduce the problem.
      </p>

      <p>
        <strong>Last updated:</strong> October 18, 2026
      </p>
    </main>
  );
}