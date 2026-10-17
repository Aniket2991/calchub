import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "How CalcHub handles website usage information, analytics, cookies, and advertising.",
};

export default function Privacy() {
  return (
    <main className="container section">
      <Link href="/">← Back to CalcHub</Link>

      <h1>Privacy Policy</h1>

      <p className="lead">
        This policy describes how CalcHub handles information when you visit
        or use our free online calculators. We do not require an account to
        use the calculators.
      </p>

      <h2>Information and Calculator Inputs</h2>
      <p>
        Our hosting and security systems may process technical information
        such as IP address, browser and device details, requested pages, and
        request timestamps to deliver and protect the website. Calculator
        fields are intended for calculation inputs. Do not enter passwords,
        payment-card details, financial-account credentials, or other
        sensitive personal information.
      </p>
      <p>
        We do not ask you to submit personal information to use the
        calculators. Depending on the feature or third-party service used,
        technical or usage information may be processed by service providers
        as described below.
      </p>

      <h2>Analytics</h2>
      <p>
        CalcHub uses Google Analytics to understand aggregate website usage,
        including pages visited and interactions. Google Analytics may use
        cookies or similar technologies and may process online identifiers,
        device information, and usage data. Learn more in
        {" "}<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
          Google's Privacy Policy
        </a>.
      </p>

      <h2>Advertising and Cookies</h2>
      <p>
        CalcHub loads Google AdSense advertising technology. Google and its
        partners may use cookies or similar technologies to serve, measure,
        and personalize ads where permitted by your settings, consent, and
        applicable law. Advertising availability and personalization depend
        on Google's review and configuration; this policy does not mean that
        ads are currently being served.
      </p>
      <p>
        You can review or change Google's ad-personalization settings at
        {" "}<a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">
          Google Ads Settings
        </a>{" "}and review Google's information about
        {" "}<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
          advertising technologies
        </a>. Your browser may also provide controls for cookies, although
        disabling cookies can affect some website features.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use third-party providers for hosting, analytics, and advertising.
        Those providers process information under their own terms and privacy
        policies. CalcHub does not control the independent privacy practices
        of those providers.
      </p>

      <h2>Data Security and Retention</h2>
      <p>
        We take reasonable steps to operate and maintain the website securely.
        Technical logs and information handled by third-party providers may
        be retained for periods determined by operational needs, provider
        policies, and applicable requirements. No internet transmission or
        storage system can be guaranteed to be completely secure.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        CalcHub is a general-purpose calculator website and is not specifically
        directed toward children. Please do not submit personal or sensitive
        information through calculator fields.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can control cookies through your browser and review Google's
        available advertising settings. Options may vary by region and
        applicable law.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy as the website, services, or applicable
        requirements change. The latest version will be published on this page.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, use the contact information provided on our
        {" "}<Link href="/contact">Contact page</Link>.
      </p>

      <p>
        <strong>Last updated:</strong> October 17, 2026
      </p>
    </main>
  );
}
