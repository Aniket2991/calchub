export type Calculator = {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
};

export const calculators: Calculator[] = [
  { slug:"emi-calculator", name:"EMI Calculator", description:"Calculate monthly loan payments and total interest.", category:"Finance", icon:"₹" },
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
