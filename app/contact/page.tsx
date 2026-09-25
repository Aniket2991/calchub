import Link from "next/link";

export const metadata = {
  title: "Contact CalcHub",
  description:
    "Contact CalcHub for questions, suggestions, feedback and calculator issues.",
};

export default function Contact() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <h1>Contact CalcHub</h1>

      <p className="lead">
        Have a question, suggestion or found an issue with one of our
        calculators? We would be happy to hear from you.
      </p>

      <h2>Questions and Feedback</h2>

      <p>
        You can contact the CalcHub team regarding calculator issues,
        suggestions, feedback, corrections or general questions about the
        website.
      </p>

      <h2>Email</h2>

      <p>
        Email us at:
      </p>

      <p>
        <a href="mailto:contact@calchub.com">
          contact@calchub.com
        </a>
      </p>

      <p>
        Please replace this email address with the email address you want to
        use for CalcHub before publishing the website.
      </p>

      <h2>Calculator Issues</h2>

      <p>
        If you believe a calculator is producing an incorrect result, please
        include the calculator name, the values you entered and the result
        you received. This will help us investigate the issue.
      </p>

      <h2>Suggestions</h2>

      <p>
        If there is a calculator or feature you would like to see on CalcHub,
        feel free to send us your suggestion.
      </p>

      <p>
        We appreciate feedback that helps us make CalcHub more useful and
        easier to use.
      </p>
    </main>
  );
}