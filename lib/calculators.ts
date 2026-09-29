export type Calculator = {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
};

export const calculators: Calculator[] = [
  { slug:"emi-calculator", name:"EMI Calculator", description:"Calculate monthly loan payments and total interest.", category:"Finance", icon:"₹" },
  {
  slug: "loan-calculator",
  name: "Loan Calculator",
  description: "Calculate loan payments, total interest and total repayment.",
  category: "Finance",
  icon: "L",
},
  {
  slug: "salary-calculator",
  name: "Salary Calculator",
  description: "Estimate monthly salary, deductions and take-home pay.",
  category: "Finance",
  icon: "₹",
},
{
  slug: "income-tax-calculator",
  name: "Income Tax Calculator",
  description: "Estimate income tax under India's current tax regimes.",
  category: "Finance",
  icon: "₹",
},
{
  slug: "profit-loss-calculator",
  name: "Profit & Loss Calculator",
  description: "Calculate profit, loss, profit percentage and loss percentage.",
  category: "Finance",
  icon: "P",
},
{
  slug: "percentage-change-calculator",
  name: "Percentage Change",
  description: "Calculate the percentage increase or decrease between two values.",
  category: "Math",
  icon: "%",
},
{
  slug: "ratio-calculator",
  name: "Ratio Calculator",
  description: "Simplify ratios and calculate equivalent ratio values.",
  category: "Math",
  icon: ":",
},
{
  slug: "fraction-calculator",
  name: "Fraction Calculator",
  description: "Add, subtract, multiply and divide fractions.",
  category: "Math",
  icon: "½",
},
{
  slug: "time-calculator",
  name: "Time Calculator",
  description: "Add or subtract hours and minutes.",
  category: "Date & Time",
  icon: "⏱",
},
{
  slug: "hours-calculator",
  name: "Hours Calculator",
  description: "Calculate the number of hours between two times.",
  category: "Date & Time",
  icon: "H",
},
{
  slug: "age-difference-calculator",
  name: "Age Difference Calculator",
  description: "Calculate the difference between two dates of birth.",
  category: "Date & Time",
  icon: "Δ",
},
{
  slug: "area-calculator",
  name: "Area Calculator",
  description: "Calculate the area of common geometric shapes.",
  category: "Math",
  icon: "A",
},
{
  slug: "volume-calculator",
  name: "Volume Calculator",
  description: "Calculate the volume of common three-dimensional shapes.",
  category: "Math",
  icon: "V",
},
{
  slug: "speed-calculator",
  name: "Speed Calculator",
  description: "Calculate speed, distance or travel time.",
  category: "Conversion",
  icon: "S",
},
{
  slug: "fuel-cost-calculator",
  name: "Fuel Cost Calculator",
  description: "Estimate fuel cost from distance, mileage and fuel price.",
  category: "Finance",
  icon: "⛽",
},
  { slug:"sip-calculator", name:"SIP Calculator", description:"Estimate returns from regular mutual fund investments.", category:"Finance", icon:"↗" },
  { slug:"gst-calculator", name:"GST Calculator", description:"Add or remove GST from any amount.", category:"Finance", icon:"%" },
  { slug:"discount-calculator", name:"Discount Calculator", description:"Find sale price and savings instantly.", category:"Finance", icon:"−" },
  { slug:"simple-interest", name:"Simple Interest", description:"Calculate interest and maturity amount.", category:"Finance", icon:"I" },
  { slug:"compound-interest", name:"Compound Interest", description:"Calculate growth with compounding.", category:"Finance", icon:"CI" },
  { slug:"percentage-calculator", name:"Percentage Calculator", description:"Solve common percentage problems quickly.", category:"Math", icon:"%" },
  { slug:"average-calculator", name:"Average Calculator", description:"Find the mean of a set of numbers.", category:"Math", icon:"x̄" },
  { slug:"bmi-calculator", name:"BMI Calculator", description:"Calculate body mass index from height and weight.", category:"Health", icon:"♥" },
  { slug:"age-calculator", name:"Age Calculator", description:"Calculate exact age from date of birth.", category:"Date & Time", icon:"◷" },
  { slug:"date-difference", name:"Date Difference", description:"Find the exact difference between two dates.", category:"Date & Time", icon:"▣" },
  { slug:"length-converter", name:"Length Converter", description:"Convert common length units.", category:"Conversion", icon:"↔" },
  { slug:"weight-converter", name:"Weight Converter", description:"Convert kg, grams, pounds and more.", category:"Conversion", icon:"⚖" },
  { slug:"temperature-converter", name:"Temperature Converter", description:"Convert Celsius, Fahrenheit and Kelvin.", category:"Conversion", icon:"°" }
];

export const getCalculator = (slug: string) => calculators.find(c => c.slug === slug);
