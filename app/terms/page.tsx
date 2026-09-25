import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for CalcHub online calculators and services.",
};

export default function Terms() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <h1>Terms of Use</h1>

      <p className="lead">
        By using CalcHub, you agree to these Terms of Use. Please read them
        before using our calculators and other website features.
      </p>

      <h2>Use of CalcHub</h2>

      <p>
        CalcHub provides online calculators and related information for
        general informational and educational purposes. You may use the
        website for lawful personal or business purposes.
      </p>

      <h2>Calculator Results</h2>

      <p>
        Calculator results are estimates based on the information and
        assumptions entered by the user. Results may differ from actual
        amounts, rates, dates or outcomes.
      </p>

      <p>
        You are responsible for checking your inputs and verifying important
        information before relying on a result.
      </p>

      <h2>Financial Information</h2>

      <p>
        Financial calculators on CalcHub are provided for general
        informational purposes and are not financial, investment, tax or
        legal advice.
      </p>

      <p>
        Actual loan terms, interest rates, fees, taxes and investment returns
        may vary. Consult an appropriate qualified professional when making
        important financial decisions.
      </p>

      <h2>Health Information</h2>

      <p>
        Health-related calculators are intended for general informational
        purposes and are not a substitute for professional medical advice,
        diagnosis or treatment.
      </p>

      <h2>Accuracy of Information</h2>

      <p>
        We aim to provide useful and accurate calculators and information,
        but we do not guarantee that every result or piece of information
        will always be complete, current or error-free.
      </p>

      <h2>Availability</h2>

      <p>
        We may add, modify, suspend or remove calculators, features or other
        parts of the website at any time.
      </p>

      <h2>Third-Party Services</h2>

      <p>
        CalcHub may use third-party services such as hosting, analytics,
        advertising and AI services. Your use of those services may also be
        subject to their respective terms and policies.
      </p>

      <h2>Limitation of Liability</h2>

      <p>
        To the extent permitted by applicable law, CalcHub is not responsible
        for losses or damages resulting from reliance on calculator results,
        website information or temporary unavailability of the service.
      </p>

      <h2>Changes to These Terms</h2>

      <p>
        We may update these Terms of Use when the website or its services
        change. Updated terms will be published on this page.
      </p>

      <h2>Contact</h2>

      <p>
        If you have questions about these Terms of Use, please visit our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>

      <p>
        <strong>Last updated:</strong> September 25, 2026
      </p>
    </main>
  );
}