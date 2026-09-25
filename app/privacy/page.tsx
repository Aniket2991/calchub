import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for CalcHub.",
};

export default function Privacy() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <h1>Privacy Policy</h1>

      <p className="lead">
        Your privacy is important to us. This Privacy Policy explains how
        CalcHub may collect, use and protect information when you use our
        website.
      </p>

      <h2>Information We Collect</h2>
      <p>
        CalcHub is designed to provide online calculators without requiring
        users to create an account. Depending on how you use the website,
        limited technical information such as browser type, device type,
        approximate location and pages visited may be processed by our
        website infrastructure, analytics services or advertising partners.
      </p>

      <h2>Calculator Information</h2>
      <p>
        The numbers you enter into calculators are used to perform the
        requested calculation. You should avoid entering passwords,
        financial account credentials or other sensitive personal information
        into calculator fields.
      </p>

      <h2>Cookies</h2>
      <p>
        CalcHub and third-party services may use cookies or similar
        technologies to remember preferences, measure website usage and
        provide or personalize advertising.
      </p>

      <h2>Advertising</h2>
      <p>
        CalcHub may display advertisements from third-party advertising
        providers. These providers may use cookies or similar technologies
        to provide advertisements and measure advertising performance.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use analytics tools to understand how visitors use CalcHub,
        which pages are useful and how we can improve the website.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        CalcHub may use third-party services for hosting, analytics,
        advertising, AI features and other website functionality. These
        services may process information according to their own privacy
        policies.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        CalcHub is not specifically directed toward children. We do not
        knowingly request personal information from children.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy when our website, services or
        practices change. Any updated version will be published on this page.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy, you can contact us
        through the contact information provided on our Contact page.
      </p>

      <p>
        <strong>Last updated:</strong> September 25, 2026
      </p>
    </main>
  );
}