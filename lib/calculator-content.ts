export type CalculatorContent = {
  intro: string;
  formula?: string;
  example?: string;
  tips: string[];
  faqs: { question: string; answer: string }[];
};

export const calculatorContent: Record<string, CalculatorContent> = {
  "emi-calculator": {
    intro:
      "The EMI Calculator helps estimate the monthly payment for a loan using the loan amount, annual interest rate and loan tenure. It also shows the estimated total payment and total interest.",
    formula:
      "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate and n is the number of monthly payments.",
    example:
      "For example, a loan of ₹5,00,000 at an annual interest rate of 9% for 60 months can be entered into the calculator to estimate the monthly EMI.",
    tips: [
      "Enter the annual interest rate as a percentage.",
      "Enter the loan tenure in months.",
      "Check the total interest as well as the monthly EMI.",
      "Actual loan payments can vary depending on lender terms, fees and other charges."
    ],
    faqs: [
      {
        question: "What is EMI?",
        answer:
          "EMI stands for Equated Monthly Instalment. It is the regular amount paid toward a loan according to the applicable repayment schedule."
      },
      {
        question: "Does a longer loan tenure reduce EMI?",
        answer:
          "A longer tenure can reduce the monthly payment, but it can also increase the total interest paid over the life of the loan."
      },
      {
        question: "Is the EMI result exact?",
        answer:
          "The result is an estimate based on the values entered. Actual repayment amounts can differ because of lender-specific terms, fees and other charges."
      }
    ]
  },

  "sip-calculator": {
    intro:
      "The SIP Calculator estimates the future value of regular monthly investments based on the investment amount, expected annual return and investment period.",
    formula:
      "The estimate uses the monthly investment, monthly rate of return and number of investment periods to calculate the projected future value.",
    example:
      "Enter a monthly investment amount, expected annual return and investment period to estimate the potential future value.",
    tips: [
      "Use the expected annual return as a percentage.",
      "Enter the investment period in months.",
      "The result is an estimate, not a guaranteed investment return."
    ],
    faqs: [
      {
        question: "What is a SIP?",
        answer:
          "SIP stands for Systematic Investment Plan and refers to investing a fixed amount at regular intervals."
      },
      {
        question: "Are SIP returns guaranteed?",
        answer:
          "No. Investment returns can vary and the actual outcome may be different from the estimate."
      }
    ]
  },

  "gst-calculator": {
    intro:
      "The GST Calculator helps estimate an amount after adding or removing a specified GST percentage.",
    formula:
      "When GST is added, the total is calculated from the base amount and GST rate. When GST is removed, the GST-inclusive amount is used to estimate the original base amount.",
    example:
      "Enter the amount and GST rate, then choose whether you want to add GST or remove GST.",
    tips: [
      "Check whether the amount you enter is before or after GST.",
      "Select Add GST when calculating a GST-inclusive amount.",
      "Select Remove GST when working backward from a GST-inclusive amount."
    ],
    faqs: [
      {
        question: "Can this calculator add GST?",
        answer:
          "Yes. Select Add GST and enter the amount and GST rate."
      },
      {
        question: "Can this calculator remove GST?",
        answer:
          "Yes. Select Remove GST to estimate the base amount and GST component from a GST-inclusive amount."
      }
    ]
  },

  "discount-calculator": {
    intro:
      "The Discount Calculator helps you find the sale price and the amount saved when a percentage discount is applied to an original price.",
    formula:
      "Discount amount = Original price × Discount percentage ÷ 100. Sale price = Original price − Discount amount.",
    example:
      "Enter the original price and discount percentage to find the discounted price and your estimated savings.",
    tips: [
      "Enter the original listed price.",
      "Enter the discount as a percentage.",
      "Compare the calculated savings with the final selling price."
    ],
    faqs: [
      {
        question: "How is the discount amount calculated?",
        answer:
          "The discount amount is the original price multiplied by the discount percentage divided by 100."
      }
    ]
  },

  "simple-interest": {
    intro:
      "The Simple Interest Calculator estimates interest and the maturity amount using the principal, annual interest rate and time period.",
    formula:
      "Simple Interest = Principal × Rate × Time ÷ 100.",
    example:
      "Enter the principal amount, annual interest rate and time in years to estimate the interest and total amount.",
    tips: [
      "Enter the annual rate as a percentage.",
      "Enter the time period in years.",
      "Verify the applicable rate and terms before making financial decisions."
    ],
    faqs: [
      {
        question: "What is simple interest?",
        answer:
          "Simple interest is calculated only on the original principal amount."
      }
    ]
  },

  "compound-interest": {
    intro:
      "The Compound Interest Calculator estimates the future amount when interest is compounded periodically over a specified period.",
    formula:
      "A = P(1 + r/n)ⁿᵗ, where P is principal, r is the annual rate, n is the number of compounding periods per year and t is time in years.",
    example:
      "Enter the principal, annual interest rate, time and compounding frequency to estimate the accumulated amount.",
    tips: [
      "Enter the annual interest rate as a percentage.",
      "Choose the appropriate compounding frequency.",
      "Use the result as an estimate based on the assumptions entered."
    ],
    faqs: [
      {
        question: "What is compound interest?",
        answer:
          "Compound interest is interest calculated on the principal and previously accumulated interest."
      }
    ]
  },

  "percentage-calculator": {
    intro:
      "The Percentage Calculator helps calculate a percentage of a number quickly.",
    formula:
      "Percentage result = Number × Percentage ÷ 100.",
    example:
      "Enter a number and the percentage you want to calculate to get the result.",
    tips: [
      "Enter the percentage without the percent symbol.",
      "Check both values before calculating."
    ],
    faqs: [
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percentage and divide the result by 100."
      }
    ]
  },

  "average-calculator": {
    intro:
      "The Average Calculator finds the arithmetic mean of a list of numbers.",
    formula:
      "Average = Sum of all numbers ÷ Number of values.",
    example:
      "Enter numbers separated by commas, such as 10, 20, 30, 40.",
    tips: [
      "Separate each number with a comma.",
      "Check that all intended values are included."
    ],
    faqs: [
      {
        question: "How is an average calculated?",
        answer:
          "Add all the values together and divide the total by the number of values."
      }
    ]
  },

  "bmi-calculator": {
    intro:
      "The BMI Calculator estimates Body Mass Index using weight and height.",
    formula:
      "BMI = Weight in kilograms ÷ Height in metres squared.",
    example:
      "Enter your weight in kilograms and height in centimetres to calculate an estimated BMI.",
    tips: [
      "Enter height in centimetres.",
      "Enter weight in kilograms.",
      "BMI is a general screening measure and does not provide a medical diagnosis."
    ],
    faqs: [
      {
        question: "What does BMI measure?",
        answer:
          "BMI is a numerical measure based on height and weight that is commonly used as a general screening measure."
      }
    ]
  },

  "age-calculator": {
    intro:
      "The Age Calculator calculates age from a date of birth and the current date.",
    example:
      "Select your date of birth and calculate your current age in years, months and days.",
    tips: [
      "Select the correct date of birth.",
      "Check the date before calculating."
    ],
    faqs: [
      {
        question: "Can the calculator show age in years, months and days?",
        answer:
          "Yes. The calculator estimates age using the selected date of birth and the current date."
      }
    ]
  },

  "date-difference": {
    intro:
      "The Date Difference Calculator finds the number of days between two dates.",
    example:
      "Select a start date and an end date to calculate the difference between them.",
    tips: [
      "Choose the correct start date.",
      "Choose the correct end date.",
      "The result is shown as a number of days."
    ],
    faqs: [
      {
        question: "What does the date difference calculator calculate?",
        answer:
          "It calculates the number of days between the two selected dates."
      }
    ]
  },

  "length-converter": {
    intro:
      "The Length Converter converts common units of length including millimetres, centimetres, metres, kilometres, inches, feet, yards and miles.",
    example:
      "Enter a value, choose the source unit and choose the unit you want to convert to.",
    tips: [
      "Select the correct source unit.",
      "Select the desired target unit.",
      "Check the converted value and unit together."
    ],
    faqs: [
      {
        question: "Which length units are supported?",
        answer:
          "The calculator supports millimetres, centimetres, metres, kilometres, inches, feet, yards and miles."
      }
    ]
  },

  "weight-converter": {
    intro:
      "The Weight Converter converts between grams, kilograms, pounds and ounces.",
    example:
      "Enter a value and select the source and target units.",
    tips: [
      "Select the correct source unit.",
      "Select the desired target unit."
    ],
    faqs: [
      {
        question: "Which weight units are supported?",
        answer:
          "The calculator supports grams, kilograms, pounds and ounces."
      }
    ]
  },

  "temperature-converter": {
    intro:
      "The Temperature Converter converts temperatures between Celsius, Fahrenheit and Kelvin.",
    example:
      "Enter a temperature and select the source and target temperature scales.",
    tips: [
      "Choose the correct source scale.",
      "Choose the desired target scale.",
      "Check the unit shown with the result."
    ],
    faqs: [
      {
        question: "Which temperature scales are supported?",
        answer:
          "The calculator supports Celsius, Fahrenheit and Kelvin."
      }
    ]
  }
};