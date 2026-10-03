import Link from "next/link";

export const metadata = {
  title: "BMI Calculator Guide",
  description:
    "Learn how BMI is calculated, how to use a BMI calculator and why the result is only one health measure.",
};

export default function BmiGuide() {
  return (
    <main className="container section">
      <Link href="/guides">← All guides</Link>
      <h1>BMI Calculator Guide</h1>
      <p className="lead">
        BMI is a screening measure based on height and weight. It can provide
        a simple numerical reference, but it does not describe every aspect
        of a person's health.
      </p>

      <h2>How BMI is calculated</h2>
      <p>
        For measurements in metres and kilograms, BMI is calculated by
        dividing weight in kilograms by height in metres squared.
      </p>

      <h2>Example</h2>
      <p>
        A person weighing 70 kg and measuring 1.75 m has a BMI of about 22.9.
      </p>

      <h2>What BMI does not measure</h2>
      <p>
        BMI does not directly measure body-fat distribution, muscle mass,
        fitness, age-related factors or individual medical conditions.
        Athletes and other people with higher muscle mass can illustrate why
        BMI should not be interpreted on its own.
      </p>

      <h2>Use the result carefully</h2>
      <p>
        Treat BMI as general information rather than a diagnosis. If you have
        health concerns, discuss them with a qualified healthcare professional.
      </p>

      <p>
        <Link href="/calculator/bmi-calculator">Open the BMI Calculator →</Link>
      </p>
    </main>
  );
}
