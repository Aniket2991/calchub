import Link from "next/link";

export const metadata = {
  title: "GST Calculator Guide",
  description:
    "Learn how to calculate GST, add tax to a price and find the GST component in an inclusive amount.",
};

export default function GstGuide() {
  return (
    <main className="container section">
      <Link href="/guides">← All guides</Link>
      <h1>GST Calculator Guide</h1>
      <p className="lead">
        A GST calculator helps you quickly work out tax amounts and the final
        price when a GST rate is known.
      </p>

      <h2>GST on a price</h2>
      <p>
        For an amount before GST, multiply the taxable amount by the GST rate
        and divide by 100. Add that tax amount to the original price to get
        the GST-inclusive total.
      </p>

      <h2>Finding GST from an inclusive price</h2>
      <p>
        When a displayed price already includes GST, the GST component is not
        simply the stated percentage of the displayed total. The calculation
        must first separate the tax portion from the inclusive amount.
      </p>

      <h2>Example</h2>
      <p>
        If a service costs ₹10,000 before GST and the applicable rate is 18%,
        GST is ₹1,800 and the total is ₹11,800.
      </p>

      <h2>Important note</h2>
      <p>
        The correct GST treatment depends on the transaction and applicable
        tax rules. Use the calculator for estimation and verify the applicable
        rate for your transaction.
      </p>

      <p>
        <Link href="/calculator/gst-calculator">Open the GST Calculator →</Link>
      </p>
    </main>
  );
}
