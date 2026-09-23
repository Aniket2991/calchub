export type CalculatorDef = {
  slug: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  formula: string;
};

export const calculatorCatalog: CalculatorDef[] = [
  ["emi-calculator","EMI Calculator","Finance","Calculate monthly loan EMI, total interest and total payment.","loan EMI, home loan EMI, personal loan EMI","EMI = P × r × (1+r)^n / ((1+r)^n − 1)"],
  ["sip-calculator","SIP Calculator","Finance","Estimate SIP maturity value, invested amount and potential gains.","SIP calculator, mutual fund SIP","FV = P × [((1+r)^n − 1) / r] × (1+r)"],
  ["gst-calculator","GST Calculator","Finance","Add or remove GST from an amount and see the tax component.","GST calculator, GST inclusive price","GST = Base × Rate / 100"],
  ["discount-calculator","Discount Calculator","Finance","Find sale price and savings from an original price and discount.","discount calculator, sale price calculator","Discount = Original Price × Rate / 100"],
  ["simple-interest-calculator","Simple Interest Calculator","Finance","Calculate simple interest and total amount.","simple interest calculator","SI = P × R × T / 100"],
  ["compound-interest-calculator","Compound Interest Calculator","Finance","Calculate compound interest and final amount.","compound interest calculator","A = P × (1 + r/n)^(nt)"],
  ["fd-calculator","FD Calculator","Finance","Estimate fixed deposit maturity value using principal, rate and tenure.","FD calculator, fixed deposit calculator","Uses compound-interest calculation"],
  ["rd-calculator","RD Calculator","Finance","Estimate recurring deposit maturity from monthly deposits and rate.","RD calculator, recurring deposit calculator","Uses periodic-compounding estimate"],
  ["profit-loss-calculator","Profit & Loss Calculator","Finance","Calculate profit, loss and percentage from cost and selling price.","profit loss calculator","Profit = SP − CP"],
  ["inflation-calculator","Inflation Calculator","Finance","Estimate the future value of money using an inflation rate.","inflation calculator","Future Value = Present Value × (1 + inflation)^years"],
  ["salary-calculator","Salary Calculator","Finance","Estimate take-home salary from basic salary and deductions.","salary calculator, take home salary","Estimate only; customize deductions for actual payroll"],
  ["percentage-calculator","Percentage Calculator","Math","Calculate percentages, percentage change and percentage values.","percentage calculator","Percentage = Part / Whole × 100"],
  ["fraction-calculator","Fraction Calculator","Math","Add, subtract, multiply or divide fractions.","fraction calculator","Standard fraction arithmetic"],
  ["ratio-calculator","Ratio Calculator","Math","Simplify ratios and calculate proportional values.","ratio calculator","Uses greatest common divisor"],
  ["average-calculator","Average Calculator","Math","Calculate the mean of a list of numbers.","average calculator","Average = Sum / Count"],
  ["scientific-calculator","Scientific Calculator","Math","Perform common scientific and trigonometric calculations.","scientific calculator","Supports common scientific functions"],
  ["area-calculator","Area Calculator","Math","Calculate areas for common geometric shapes.","area calculator","Shape-specific geometry formulas"],
  ["perimeter-calculator","Perimeter Calculator","Math","Calculate perimeter for common geometric shapes.","perimeter calculator","Shape-specific geometry formulas"],
  ["lcm-hcf-calculator","LCM & HCF Calculator","Math","Find the lowest common multiple and highest common factor.","LCM HCF calculator","Uses integer factor relationships"],
  ["probability-calculator","Probability Calculator","Math","Calculate basic probability from favorable and total outcomes.","probability calculator","P = Favorable Outcomes / Total Outcomes"],
  ["bmi-calculator","BMI Calculator","Health","Calculate body mass index from weight and height.","BMI calculator","BMI = Weight / Height²"],
  ["bmr-calculator","BMR Calculator","Health","Estimate basal metabolic rate from basic body measurements.","BMR calculator","Uses a standard BMR estimation formula"],
  ["calorie-calculator","Calorie Calculator","Health","Estimate daily calorie needs from BMR and activity level.","calorie calculator, TDEE calculator","Uses BMR × activity factor"],
  ["ideal-weight-calculator","Ideal Weight Calculator","Health","Estimate a reference healthy-weight range from height.","ideal weight calculator","Reference estimate; not medical advice"],
  ["age-calculator","Age Calculator","Date & Time","Calculate age from date of birth.","age calculator","Calendar-date calculation"],
  ["date-difference-calculator","Date Difference Calculator","Date & Time","Find the number of days between two dates.","date difference calculator","Calendar-day difference"],
  ["days-between-dates","Days Between Dates Calculator","Date & Time","Count days between two calendar dates.","days between dates","Calendar-day difference"],
  ["time-difference-calculator","Time Difference Calculator","Date & Time","Calculate the duration between two times.","time difference calculator","Time interval calculation"],
  ["length-converter","Length Converter","Conversion","Convert common length units.","length converter, km to miles","Unit conversion"],
  ["weight-converter","Weight Converter","Conversion","Convert common mass and weight units.","weight converter, kg to pounds","Unit conversion"],
  ["temperature-converter","Temperature Converter","Conversion","Convert Celsius, Fahrenheit and Kelvin.","temperature converter","Temperature conversion"],
  ["area-converter","Area Converter","Conversion","Convert common area units.","area converter","Unit conversion"],
  ["volume-converter","Volume Converter","Conversion","Convert common volume units.","volume converter","Unit conversion"],
  ["speed-converter","Speed Converter","Conversion","Convert km/h, mph and other speed units.","speed converter","Unit conversion"],
].map(([slug,name,category,description,keywords,formula]) => ({slug,name,category,description,keywords: keywords.split(", "),formula}));
