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
    description: "Calculate an estimated monthly EMI, compare loan tenures and understand how interest changes the total cost of borrowing.",
    calculator: "/calculator/emi-calculator",
    sections: [
      { heading: "What is EMI?", body: "EMI stands for Equated Monthly Instalment. It is the regular payment used to repay a loan over a chosen tenure. The estimate is mainly driven by the principal, annual interest rate and number of monthly payments." },
      { heading: "How to use the EMI calculator", body: "Enter the loan amount, annual interest rate and tenure in months. CalcHub shows the estimated monthly EMI, total repayment and total interest so you can compare the cost of different loan scenarios." },
      { heading: "Example: ₹5 lakh at 9% for 5 years", body: "For illustration, a ₹5,00,000 loan at 9% annual interest over 60 months gives an estimated EMI of about ₹10,379. The estimated total repayment is about ₹6.23 lakh, with roughly ₹1.23 lakh of interest." },
      { heading: "How tenure changes the cost", body: "A longer tenure can reduce the monthly EMI, but it usually increases the total interest paid. Compare both EMI and total repayment before choosing a tenure." },
      { heading: "Common mistakes", body: "Check that the rate is annual, tenure is entered in the expected unit, and any processing fees, insurance or other charges are considered separately. A calculator result is not a lender quote." },
      { heading: "Before you borrow", body: "Use the calculator to compare scenarios rather than treating one result as a recommendation. Check the lender's actual rate, fees, repayment schedule and terms before accepting a loan." },
    ],
  },
  "gst-calculator-guide": {
    title: "GST Calculator Guide",
    description: "Calculate GST-inclusive and GST-exclusive amounts, understand reverse GST calculations and check the maths behind a tax-inclusive price.",
    calculator: "/calculator/gst-calculator",
    sections: [
      { heading: "What does a GST calculator do?", body: "A GST calculator helps estimate the GST amount and final price when you know the taxable amount and rate. It can also work backwards from a GST-inclusive amount." },
      { heading: "Adding GST", body: "To add GST, calculate the selected GST percentage on the base amount and add it to that amount. For example, ₹10,000 at 18% GST gives ₹1,800 GST and a total of ₹11,800." },
      { heading: "Removing GST", body: "If a displayed price already includes GST, subtracting 18% directly is not the correct reverse calculation. At 18%, an inclusive price is divided by 1.18 to estimate the taxable base." },
      { heading: "Example: reverse GST", body: "If the GST-inclusive price is ₹11,800 at 18%, the estimated base amount is ₹10,000 and the GST component is ₹1,800." },
      { heading: "Important limitation", body: "CalcHub performs the mathematical add/remove calculation. It does not decide the legally applicable GST rate, classification, exemptions, input-tax-credit treatment or filing obligation." },
      { heading: "Check the result before invoicing", body: "For business invoices, verify the applicable rate and tax treatment against current official GST guidance or a qualified tax professional. The calculator is a maths tool, not tax advice." },
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
    description: "Calculate compound growth, compare compounding frequencies and understand how rate and time affect an estimated final amount.",
    calculator: "/calculator/compound-interest",
    sections: [
      { heading: "What is compound interest?", body: "Compound interest is calculated on the principal plus previously accumulated interest. As a result, the balance can grow faster over time than under simple interest when the other assumptions are comparable." },
      { heading: "How to use the calculator", body: "Enter the principal, annual rate, time period and compounding frequency. Keep the assumptions consistent when comparing different scenarios." },
      { heading: "Example", body: "Suppose ₹1,00,000 grows at an assumed 8% annual rate for 5 years with annual compounding. The estimated final amount is about ₹1,46,933 before taxes or fees." },
      { heading: "Why compounding frequency matters", body: "With the same nominal rate and period, changing how often interest is compounded can change the estimated final amount. Product terms may use conventions that differ from a basic textbook calculation." },
      { heading: "Compound versus simple interest", body: "Simple interest applies the rate to the original principal for the stated period. Compound interest also allows previously accumulated interest to contribute to later growth." },
      { heading: "Use consistent assumptions", body: "When comparing scenarios, change one variable at a time where possible. Actual deposits, investments or loans may also involve taxes, fees, variable rates or other terms that the calculator does not model." },
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
    description: "Estimate SIP investment values, compare return assumptions and understand why projected returns are not guaranteed.",
    calculator: "/calculator/sip-calculator",
    sections: [
      { heading: "What is a SIP?", body: "A systematic investment plan (SIP) is a way to invest a fixed amount regularly. A SIP calculator estimates a future value from the contribution, assumed return and investment period." },
      { heading: "How to use the SIP calculator", body: "Enter the regular investment amount, expected annual return and investment period. Compare the projected value with the total amount you contribute to understand the effect of the assumed return." },
      { heading: "Example projection", body: "If you invest ₹5,000 every month for 10 years, your total contribution is ₹6,00,000. The projected final value depends on the assumed return and is not guaranteed." },
      { heading: "Why projections can differ from reality", body: "Market returns do not arrive at a fixed rate every month. Actual performance, fees, taxes, contribution timing and market volatility can make real results different from a calculator projection." },
      { heading: "Compare scenarios", body: "Try conservative, moderate and higher return assumptions while keeping the contribution and time period constant. This makes it easier to see how sensitive the projection is to the return assumption." },
      { heading: "Important investment limitation", body: "The calculator is an educational projection tool. It does not recommend a fund, guarantee a return or account for every product-specific charge or tax rule. Review current product information before investing." },
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
    description: "Estimate take-home salary from gross salary and deductions, and understand why an actual payslip can differ.",
    calculator: "/calculator/salary-calculator",
    sections: [
      { heading: "What is a salary calculator?", body: "A salary calculator can estimate take-home pay from the salary and deductions you enter. It is useful for comparing scenarios, but an employer's actual payroll calculation can contain additional components." },
      { heading: "How to use it", body: "Enter the gross salary and the deductions supported by the calculator. Review the estimated net or take-home amount and check each input against your salary structure." },
      { heading: "Example", body: "If gross monthly salary is ₹30,000 and you enter ₹0 deductions, the estimated take-home is ₹30,000. Real payroll can differ when statutory or employer-specific deductions apply." },
      { heading: "Salary structure matters", body: "CTC, gross salary, basic salary and take-home salary are different concepts. Employer contributions and benefits may be part of CTC without being paid as monthly cash in hand." },
      { heading: "Why your payslip may differ", body: "PF, professional tax, TDS, insurance, variable pay, reimbursements and other payroll components can change the actual amount received." },
      { heading: "Use your payslip for the final figure", body: "For employment or tax decisions, use the employer's offer letter and payslip as the authoritative source. CalcHub is a quick estimation tool." },
    ],
  },
  "income-tax-calculator-guide": {
    title: "Income Tax Calculator Guide",
    description: "Estimate Indian income tax from taxable annual income and compare the result with the assumptions used by the calculator.",
    calculator: "/calculator/income-tax-calculator",
    sections: [
      { heading: "What this calculator estimates", body: "CalcHub's Income Tax Calculator provides an estimate from the taxable annual income and selected tax regime. It is intended to make the calculation easier to understand." },
      { heading: "How to use it", body: "Enter your annual taxable income and select the applicable regime option. Review the estimated tax and cess shown by the calculator." },
      { heading: "Example: income just above ₹12 lakh", body: "For an example around ₹12.10 lakh under the new regime, the estimate can be affected by marginal-relief logic. This is why simply applying a tax slab to every rupee above a threshold can produce a misleading result." },
      { heading: "Why the final tax bill can differ", body: "Your actual liability can depend on deductions, exemptions, special-rate income, surcharge, cess, rebates, capital gains and other rules that may not be represented by a simple calculator input." },
      { heading: "Use current-year rules", body: "Tax rules and thresholds can change. Treat the result as an estimate and verify the applicable assessment-year rules using official Income Tax Department information before filing." },
      { heading: "Before filing", body: "Use the calculator as a planning and checking aid, not as a substitute for a return-preparation system or professional tax advice. Keep supporting documents for the figures you report." },
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
    description: "Estimate loan EMI, total repayment and interest, then compare different borrowing scenarios before making a decision.",
    calculator: "/calculator/loan-calculator",
    sections: [
      { heading: "What does a loan calculator show?", body: "A loan calculator estimates the regular repayment and total borrowing cost from the loan amount, interest rate and tenure you enter." },
      { heading: "How to use it", body: "Enter the principal, annual interest rate and loan tenure. Review the estimated EMI, total repayment and interest rather than looking only at the monthly payment." },
      { heading: "Example: ₹5 lakh loan", body: "For a ₹5,00,000 loan at 9% annual interest over 60 months, the estimated EMI is about ₹10,379 and total interest is about ₹1.23 lakh." },
      { heading: "Compare tenure options", body: "A shorter tenure generally means a higher monthly payment but less total interest. A longer tenure generally lowers the monthly payment while increasing the total interest cost." },
      { heading: "What the estimate may not include", body: "Actual borrowing costs can include processing fees, insurance, taxes, penalties, variable-rate changes and other lender-specific charges that are outside a basic EMI calculation." },
      { heading: "Before accepting a loan", body: "Use the calculator for comparison and budgeting, then check the lender's sanction letter, rate type, fees and repayment schedule. Do not treat the calculator as a lender offer." },
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
    "sip-calculator-guide": ["sip-calculator", "compound-interest", "loan-calculator"],
    "date-difference-guide": ["date-difference", "age-calculator", "age-difference-calculator"],
    "length-converter-guide": ["length-converter", "area-calculator", "speed-calculator"],
    "weight-converter-guide": ["weight-converter", "bmi-calculator", "fuel-cost-calculator"],
    "temperature-converter-guide": ["temperature-converter", "length-converter", "weight-converter"],
    "salary-calculator-guide": ["salary-calculator", "income-tax-calculator", "loan-calculator"],
    "income-tax-calculator-guide": ["income-tax-calculator", "salary-calculator", "percentage-calculator"],
    "profit-loss-calculator-guide": ["profit-loss-calculator", "percentage-change-calculator", "discount-calculator"],
    "percentage-change-guide": ["percentage-change-calculator", "percentage-calculator", "profit-loss-calculator"],
    "ratio-calculator-guide": ["ratio-calculator", "fraction-calculator", "percentage-calculator"],
    "fraction-calculator-guide": ["fraction-calculator", "ratio-calculator", "percentage-calculator"],
    "time-calculator-guide": ["time-calculator", "hours-calculator", "date-difference"],
    "hours-calculator-guide": ["hours-calculator", "time-calculator", "date-difference"],
    "age-difference-guide": ["age-difference-calculator", "age-calculator", "date-difference"],
    "area-calculator-guide": ["area-calculator", "volume-calculator", "length-converter"],
    "volume-calculator-guide": ["volume-calculator", "area-calculator", "length-converter"],
    "speed-calculator-guide": ["speed-calculator", "fuel-cost-calculator", "time-calculator"],
    "fuel-cost-guide": ["fuel-cost-calculator", "speed-calculator", "time-calculator"],
  };

  const relatedCalculators = (relatedSlugs[slug] ?? [])
    .map((relatedSlug) => calculators.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  const guideByCalculator = Object.fromEntries(
    Object.entries(guides).map(([guideSlug, guide]) => [
      guide.calculator.replace("/calculator/", ""),
      guideSlug,
    ])
  ) as Record<string, string>;

  const relatedGuideSlugs = (relatedSlugs[slug] ?? [])
    .map((calculatorSlug) => guideByCalculator[calculatorSlug])
    .filter((guideSlug): guideSlug is string => Boolean(guideSlug) && guideSlug !== slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: "https://calchub-blond.vercel.app/guides/" + slug,
    publisher: { "@type": "Organization", name: "CalcHub" },
    dateModified: "2026-10-04",
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
        <p className="muted">Updated October 4, 2026 · For general informational use</p>

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

      {relatedGuideSlugs.length > 0 && (
        <section className="relatedGuides" aria-labelledby="more-guides-title">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">CALCHUB / LEARN</div>
              <h2 id="more-guides-title">More calculator guides</h2>
              <p className="lead">Explore related topics before choosing your next calculation.</p>
            </div>
          </div>
          <div className="grid">
            {relatedGuideSlugs.map((guideSlug) => {
              const relatedGuide = guides[guideSlug];
              return (
                <Link className="card cardMainLink" href={"/guides/" + guideSlug} key={guideSlug}>
                  <div className="icon">?</div>
                  <h3>{relatedGuide.title}</h3>
                  <p>{relatedGuide.description}</p>
                  <span className="textLink">Read guide →</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
