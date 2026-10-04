import Link from "next/link";
import { calculators } from "../../../lib/calculators";
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
      { heading: "Example: ₹5 lakh loan", body: "For illustration, a ₹5,00,000 loan at 9% annual interest over 60 months gives an estimated EMI of about ₹10,379. The actual lender schedule can differ because of fees, rate changes or different repayment conventions." },
      { heading: "Common mistakes", body: "Check whether the rate is annual, whether tenure is entered in months, and whether the quoted loan includes fees or insurance outside the EMI calculation." },
      { heading: "Compare before borrowing", body: "Compare the estimated total payment and total interest, not only the monthly EMI. A lower monthly payment can come from a longer tenure and may result in higher overall interest." },
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
      { heading: "Example: adding GST", body: "For a ₹10,000 taxable amount at 18% GST, the GST is ₹1,800 and the GST-inclusive amount is ₹11,800." },
      { heading: "Example: removing GST", body: "If ₹11,800 is already GST-inclusive at 18%, dividing by 1.18 gives a base amount of ₹10,000 and GST of ₹1,800." },
      { heading: "Important GST limitation", body: "The calculator performs the mathematical add/remove calculation. It does not determine whether a particular supply should use a specific GST rate or treatment." },
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
  "discount-calculator-guide": {
    title: "Discount Calculator Guide",
    description: "Learn how discounts affect the amount you pay and how to calculate your savings.",
    calculator: "/calculator/discount-calculator",
    sections: [
      { heading: "How a discount works", body: "A percentage discount reduces an original price. The discount amount is found by multiplying the original price by the discount percentage and dividing by 100." },
      { heading: "Finding the final sale price", body: "After finding the discount amount, subtract it from the original price. For example, a ₹2,000 item with a 20% discount has ₹400 in savings and an estimated sale price of ₹1,600." },
      { heading: "Check the final amount", body: "Use the calculator to compare the original price, discount percentage, savings and final price. Taxes, delivery charges and other fees may need to be considered separately." },
    ],
  },
  "simple-interest-guide": {
    title: "Simple Interest Guide",
    description: "Understand the simple interest formula and how principal, rate and time affect the result.",
    calculator: "/calculator/simple-interest",
    sections: [
      { heading: "What is simple interest?", body: "Simple interest is calculated on the original principal rather than adding previously earned interest to the principal for later periods." },
      { heading: "The formula", body: "The standard formula is Simple Interest = Principal × Rate × Time ÷ 100 when the rate is a percentage and time is measured in years. The total amount is the principal plus the interest." },
      { heading: "When using the result", body: "Check that the financial product actually uses simple interest and that the rate and time period match its terms. Fees and other charges may not be included." },
    ],
  },
  "compound-interest-guide": {
    title: "Compound Interest Guide",
    description: "Learn how compounding frequency, interest rate and time affect an estimated accumulated amount.",
    calculator: "/calculator/compound-interest",
    sections: [
      { heading: "What is compound interest?", body: "Compound interest is calculated on the principal and previously accumulated interest, so the balance can grow faster as interest is added over time." },
      { heading: "Why frequency matters", body: "The compounding frequency describes how often interest is added during a year. With the same nominal rate and time period, changing the frequency can change the estimated final amount." },
      { heading: "Compare scenarios", body: "Try different rates, periods and compounding frequencies to understand how the assumptions affect the estimate. Actual products can use different calculation conventions and fees." },
      { heading: "Example", body: "Suppose ₹1,00,000 is invested at an assumed 8% annual rate for 5 years with annual compounding. The estimated final amount is about ₹1,46,933 before taxes or fees." },
      { heading: "Compounding versus simple interest", body: "With compound interest, previously accumulated interest can itself earn interest. With simple interest, interest is calculated only on the original principal." },
      { heading: "Use consistent assumptions", body: "When comparing scenarios, keep the principal and time period consistent and change one assumption at a time so you can see what actually drives the difference." },
    ],
  },
  "age-calculator-guide": {
    title: "Age Calculator Guide",
    description: "Learn how an age calculator uses a date of birth and the current date to estimate age.",
    calculator: "/calculator/age-calculator",
    sections: [
      { heading: "How age is calculated", body: "An age calculation compares the date of birth with the current date and determines the completed years, with remaining months and days where applicable." },
      { heading: "Enter the correct date", body: "Select the person's actual date of birth carefully. A one-day difference can affect the months and days shown in the result." },
      { heading: "For official purposes", body: "Use the calculator as a convenience tool. For legal, government or other official purposes, rely on the date recorded in the relevant official documents." },
    ],
  },
  "average-calculator-guide": {
    title: "Average Calculator Guide",
    description: "Learn how the arithmetic average is calculated and how unusual values can affect it.",
    calculator: "/calculator/average-calculator",
    sections: [
      { heading: "What is an average?", body: "The arithmetic average, or mean, is calculated by adding all values and dividing the sum by the number of values." },
      { heading: "Example", body: "For 10, 20, 30 and 40, the sum is 100 and there are four values, so the average is 25." },
      { heading: "Check your inputs", body: "Separate values with commas and make sure every intended value is included. Very large or small values can have a strong effect on the arithmetic mean." },
    ],
  },
  "sip-calculator-guide": {
    title: "SIP Calculator Guide",
    description: "Learn how monthly investments, expected returns and time can affect an estimated SIP value.",
    calculator: "/calculator/sip-calculator",
    sections: [
      { heading: "What is a SIP?", body: "A systematic investment plan (SIP) is a way to invest a fixed amount regularly. The calculator estimates the future value using the inputs you provide." },
      { heading: "How the estimate works", body: "The result depends on the monthly investment, assumed annual return and investment period. Actual market returns can vary and are not guaranteed." },
      { heading: "Use the estimate carefully", body: "Use different return assumptions to compare scenarios rather than treating one projected value as a guaranteed outcome." },
      { heading: "Example projection", body: "If you invest ₹5,000 each month for 10 years, the total amount you contribute is ₹6,00,000. The projected final value depends on the assumed annual return and is not guaranteed." },
      { heading: "Why projections differ", body: "Changing the expected return or investment period can materially change the projected value. Actual market performance can be higher or lower than the assumption." },
      { heading: "What to compare", body: "Compare scenarios using the same contribution period and different return assumptions. This calculator is a projection tool, not a guarantee of investment performance." },
    ],
  },
  "date-difference-guide": {
    title: "Date Difference Guide",
    description: "Learn how to calculate the number of days between two dates and understand date-counting conventions.",
    calculator: "/calculator/date-difference",
    sections: [
      { heading: "What is date difference?", body: "Date difference is the elapsed number of days between a start date and an end date." },
      { heading: "Inclusive versus elapsed days", body: "Some applications count both boundary dates while others use elapsed difference. Check which convention your task requires." },
      { heading: "Check your dates", body: "Verify both dates before relying on the result, especially for deadlines, contracts or schedules." },
    ],
  },
  "length-converter-guide": {
    title: "Length Converter Guide",
    description: "Learn how to convert metric and imperial length units accurately.",
    calculator: "/calculator/length-converter",
    sections: [
      { heading: "Common length units", body: "CalcHub converts common units such as millimetres, centimetres, metres, kilometres, inches, feet, yards and miles." },
      { heading: "Choosing the right units", body: "Select the source unit and the target unit before reading the result. The number alone is not meaningful without its unit." },
      { heading: "Avoid unit mistakes", body: "Keep the same measurement reference when comparing converted values and check whether the original measurement was metric or imperial." },
    ],
  },
  "weight-converter-guide": {
    title: "Weight Converter Guide",
    description: "Learn how to convert kilograms, grams, pounds and ounces.",
    calculator: "/calculator/weight-converter",
    sections: [
      { heading: "Common weight units", body: "The calculator converts common units including grams, kilograms, pounds and ounces." },
      { heading: "How to convert", body: "Enter the value, choose its current unit and then choose the unit you want. The result is shown in the selected target unit." },
      { heading: "Check the unit", body: "Always read the unit alongside the number, especially when comparing product weights or measurements." },
    ],
  },
  "temperature-converter-guide": {
    title: "Temperature Converter Guide",
    description: "Learn how Celsius, Fahrenheit and Kelvin conversions work.",
    calculator: "/calculator/temperature-converter",
    sections: [
      { heading: "Temperature scales", body: "Celsius, Fahrenheit and Kelvin use different scales and reference points." },
      { heading: "Converting temperatures", body: "Select the source and target scales and enter the temperature. The calculator applies the appropriate conversion relationship." },
      { heading: "Check negative values", body: "Celsius and Fahrenheit can use negative values. Kelvin is an absolute scale and cannot represent temperatures below absolute zero." },
    ],
  },
  "salary-calculator-guide": {
    title: "Salary Calculator Guide",
    description: "Understand estimated salary deductions and take-home pay.",
    calculator: "/calculator/salary-calculator",
    sections: [
      { heading: "Gross versus take-home salary", body: "Gross salary is the amount before deductions, while take-home salary is the amount remaining after the deductions included in the calculation." },
      { heading: "How to use the estimate", body: "Enter the salary and applicable deductions supported by the calculator, then compare gross pay with the estimated take-home amount." },
      { heading: "Why actual pay can differ", body: "Employer-specific benefits, taxes, contributions and payroll rules can change the final amount shown on a payslip." },
      { heading: "Example", body: "If gross salary is ₹30,000 and the entered deductions total ₹3,000, the estimated take-home amount is ₹27,000." },
      { heading: "Salary structure matters", body: "CTC, gross salary, basic salary, allowances, employer contributions and employee deductions are different concepts. Make sure the figure you enter matches what the calculator expects." },
      { heading: "Use your payslip for final figures", body: "For actual payroll reconciliation, compare the estimate with your employment contract and payslip because employer-specific deductions and benefits may not be represented." },
    ],
  },
  "income-tax-calculator-guide": {
    title: "Income Tax Calculator Guide",
    description: "Learn how an income tax estimate is calculated and why tax-year rules matter.",
    calculator: "/calculator/income-tax-calculator",
    sections: [
      { heading: "What the estimate represents", body: "The calculator estimates income tax from the taxable income and regime assumptions entered." },
      { heading: "Tax rules can change", body: "Rates, rebates, deductions and other provisions can change between tax years. Check current official guidance for important decisions." },
      { heading: "Use it as an estimate", body: "The calculator is a planning aid, not tax advice. Special income types, surcharge and other rules may require a more detailed calculation." },
      { heading: "A simple planning example", body: "Enter the annual taxable income and select the applicable regime supported by the calculator. The result is an estimate, not a tax-return computation." },
      { heading: "Marginal relief and changing rules", body: "Tax calculations can involve rebates, marginal relief, deductions, special rates and other provisions. These can change with legislation, so verify the applicable financial year before relying on the result." },
      { heading: "Before filing", body: "Use current official income-tax guidance and your tax documents for filing. A calculator estimate should not replace professional advice when your situation includes complex income or deductions." },
    ],
  },
  "profit-loss-calculator-guide": {
    title: "Profit Loss Calculator Guide",
    description: "Learn how to calculate profit, loss and the corresponding percentage.",
    calculator: "/calculator/profit-loss-calculator",
    sections: [
      { heading: "Profit and loss", body: "Profit occurs when selling price is above cost price; loss occurs when selling price is below cost price." },
      { heading: "Percentage calculation", body: "Profit or loss percentage is generally measured against the cost price. Keep the cost and selling prices in the correct order." },
      { heading: "Business use", body: "Use the result to compare transactions, but remember that real business profitability may also include operating costs, taxes and other expenses." },
    ],
  },
  "percentage-change-guide": {
    title: "Percentage Change Guide",
    description: "Learn how to calculate percentage increases and decreases between two values.",
    calculator: "/calculator/percentage-change-calculator",
    sections: [
      { heading: "The basic formula", body: "Percentage change compares the difference between a new value and an original value with the original value." },
      { heading: "Reading the result", body: "A positive result represents an increase and a negative result represents a decrease." },
      { heading: "Choose the correct base", body: "Always identify the original value before calculating percentage change because changing the base changes the result." },
    ],
  },
  "ratio-calculator-guide": {
    title: "Ratio Calculator Guide",
    description: "Learn how to simplify ratios and compare equivalent relationships.",
    calculator: "/calculator/ratio-calculator",
    sections: [
      { heading: "What is a ratio?", body: "A ratio describes the relationship between quantities using an ordered comparison such as 2:3." },
      { heading: "Simplifying a ratio", body: "Divide every part by the greatest common divisor to get the simplest equivalent ratio." },
      { heading: "Keep the order", body: "2:3 and 3:2 represent different relationships, so keep the quantities in their intended order." },
    ],
  },
  "fraction-calculator-guide": {
    title: "Fraction Calculator Guide",
    description: "Learn how to add, subtract, multiply and divide fractions.",
    calculator: "/calculator/fraction-calculator",
    sections: [
      { heading: "Adding and subtracting", body: "Fractions with different denominators are converted to a common denominator before addition or subtraction." },
      { heading: "Multiplication and division", body: "Multiply numerators and denominators for multiplication. For division, multiply by the reciprocal of the second fraction." },
      { heading: "Check denominators", body: "A denominator cannot be zero. Simplify the final fraction when possible." },
    ],
  },
  "time-calculator-guide": {
    title: "Time Calculator Guide",
    description: "Learn how to add and subtract hours and minutes correctly.",
    calculator: "/calculator/time-calculator",
    sections: [
      { heading: "Working with time", body: "Time calculations can be easier when hours and minutes are treated as total minutes before converting the answer back." },
      { heading: "Adding time", body: "Add the hours and minutes, carrying every 60 minutes into an additional hour." },
      { heading: "Subtracting time", body: "When subtracting, make sure the earlier and later values are entered in the intended order and account for borrowing minutes when needed." },
    ],
  },
  "hours-calculator-guide": {
    title: "Hours Calculator Guide",
    description: "Learn how to calculate elapsed hours between two times.",
    calculator: "/calculator/hours-calculator",
    sections: [
      { heading: "Elapsed time", body: "Elapsed time is the duration between a start time and an end time." },
      { heading: "Work schedules", body: "The calculator can help estimate work or activity duration between two times." },
      { heading: "Crossing midnight", body: "If a period crosses midnight, interpret the start and end times carefully so the intended duration is clear." },
    ],
  },
  "age-difference-guide": {
    title: "Age Difference Calculator Guide",
    description: "Learn how to calculate the difference between two dates of birth.",
    calculator: "/calculator/age-difference-calculator",
    sections: [
      { heading: "What is age difference?", body: "Age difference compares two dates of birth and expresses the elapsed difference between them." },
      { heading: "Enter both dates", body: "Select both dates accurately. Even a one-day change can affect the months and days in the result." },
      { heading: "Use for general calculations", body: "For legal or official age requirements, rely on the relevant official records and rules rather than a calculator alone." },
    ],
  },
  "area-calculator-guide": {
    title: "Area Calculator Guide",
    description: "Learn how to calculate the area of common geometric shapes.",
    calculator: "/calculator/area-calculator",
    sections: [
      { heading: "What is area?", body: "Area measures the amount of two-dimensional surface inside a shape and is expressed in square units." },
      { heading: "Choose the correct shape", body: "Select the shape and enter its required dimensions. Different shapes use different formulas." },
      { heading: "Check your units", body: "Keep dimensions in consistent units so the resulting area is expressed in the expected square unit." },
    ],
  },
  "volume-calculator-guide": {
    title: "Volume Calculator Guide",
    description: "Learn how to calculate the volume of common three-dimensional shapes.",
    calculator: "/calculator/volume-calculator",
    sections: [
      { heading: "What is volume?", body: "Volume measures the amount of three-dimensional space occupied by an object and is expressed in cubic units." },
      { heading: "Enter the dimensions", body: "Choose the shape and provide the dimensions required by its formula." },
      { heading: "Use consistent units", body: "If dimensions are entered in metres, the resulting volume is in cubic metres; mixing units can produce incorrect results." },
    ],
  },
  "speed-calculator-guide": {
    title: "Speed Calculator Guide",
    description: "Learn how speed, distance and travel time are related.",
    calculator: "/calculator/speed-calculator",
    sections: [
      { heading: "The basic relationship", body: "Speed is distance divided by time. The other two values can be found by rearranging the same relationship." },
      { heading: "Check your units", body: "Make sure distance and time use compatible units, such as kilometres and hours for km/h." },
      { heading: "Travel estimates", body: "A calculated speed is a mathematical estimate and does not account for traffic, stops or changing travel conditions." },
    ],
  },
  "fuel-cost-guide": {
    title: "Fuel Cost Calculator Guide",
    description: "Learn how to estimate fuel cost from distance, mileage and fuel price.",
    calculator: "/calculator/fuel-cost-calculator",
    sections: [
      { heading: "The basic calculation", body: "Estimated fuel used is distance divided by mileage. Estimated fuel cost is fuel used multiplied by the price per litre." },
      { heading: "Example", body: "For 300 km at 15 km/L, estimated fuel use is 20 litres. At ₹100 per litre, the estimated fuel cost is ₹2,000." },
      { heading: "Real-world fuel use", body: "Actual mileage can vary with traffic, speed, road conditions, vehicle load and driving style." },
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
      { heading: "Example: ₹5 lakh loan", body: "As an illustration, ₹5,00,000 at 9% for 60 months gives an estimated monthly payment of about ₹10,379. Total repayment is about ₹6.23 lakh before any separate fees." },
      { heading: "Compare tenure options", body: "Try shorter and longer tenures. A shorter tenure generally raises the scheduled monthly payment but can reduce the total interest paid, subject to the same rate and calculation assumptions." },
      { heading: "What the calculator does not include", body: "Processing fees, insurance, penalties, prepayments, floating-rate changes and lender-specific charges may affect the real cost of borrowing." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return { title: "Guide Not Found | CalcHub" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: "/guides/" + slug },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    return (
      <main className="container section">
        <h1>Guide not found</h1>
        <Link href="/guides">← Back to guides</Link>
      </main>
    );
  }

  const relatedSlugs: Record<string, string[]> = {
    "emi-calculator-guide": ["emi-calculator", "loan-calculator", "salary-calculator"],
    "gst-calculator-guide": ["gst-calculator", "discount-calculator", "percentage-calculator"],
    "percentage-calculator-guide": ["percentage-calculator", "percentage-change-calculator", "discount-calculator"],
    "bmi-calculator-guide": ["bmi-calculator", "age-calculator", "percentage-calculator"],
    "loan-calculator-guide": ["loan-calculator", "emi-calculator", "compound-interest"],
    "discount-calculator-guide": ["discount-calculator", "percentage-calculator", "gst-calculator"],
    "simple-interest-guide": ["simple-interest", "compound-interest", "loan-calculator"],
    "compound-interest-guide": ["compound-interest", "simple-interest", "sip-calculator"],
    "age-calculator-guide": ["age-calculator", "age-difference-calculator", "date-difference"],
    "average-calculator-guide": ["average-calculator", "percentage-calculator", "percentage-change-calculator"],
    "sip-calculator-guide": ["sip-calculator"],
    "date-difference-guide": ["date-difference"],
    "length-converter-guide": ["length-converter"],
    "weight-converter-guide": ["weight-converter"],
    "temperature-converter-guide": ["temperature-converter"],
    "salary-calculator-guide": ["salary-calculator"],
    "income-tax-calculator-guide": ["income-tax-calculator"],
    "profit-loss-calculator-guide": ["profit-loss-calculator"],
    "percentage-change-guide": ["percentage-change-calculator"],
    "ratio-calculator-guide": ["ratio-calculator"],
    "fraction-calculator-guide": ["fraction-calculator"],
    "time-calculator-guide": ["time-calculator"],
    "hours-calculator-guide": ["hours-calculator"],
    "age-difference-guide": ["age-difference-calculator"],
    "area-calculator-guide": ["area-calculator"],
    "volume-calculator-guide": ["volume-calculator"],
    "speed-calculator-guide": ["speed-calculator"],
    "fuel-cost-guide": ["fuel-cost-calculator"],
  };

  const relatedCalculators = (relatedSlugs[slug] ?? [])
    .map((relatedSlug) => calculators.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

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

      <section className="relatedGuides" aria-labelledby="related-calculators-title">
        <div className="sectionHead">
          <div>
            <div className="eyebrow">CALCHUB / TOOLS</div>
            <h2 id="related-calculators-title">Related calculators</h2>
            <p className="lead">Use these calculators to continue with related calculations.</p>
          </div>
        </div>

        <div className="grid">
          {relatedCalculators.map((item) => (
            <Link className="card cardMainLink" href={"/calculator/" + item!.slug} key={item!.slug}>
              <div className="icon">{item!.icon}</div>
              <h3>{item!.name}</h3>
              <p>{item!.description}</p>
              <span className="textLink">Open calculator →</span>
            </Link>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
