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
      "The EMI Calculator estimates the monthly instalment for a loan using the loan amount, annual interest rate and repayment tenure. It also estimates the total amount repaid and total interest over the selected loan period.",

    formula:
      "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the principal loan amount, r is the monthly interest rate expressed as a decimal, and n is the total number of monthly payments.",

    example:
      "For example, a loan of ₹5,00,000 at an annual interest rate of 9% for 60 months gives an estimated EMI of about ₹10,379 per month. The estimated total repayment is about ₹6,22,741, including about ₹1,22,741 in interest. Actual repayment amounts can vary depending on lender terms, fees and other charges.",

    tips: [
      "Enter the loan amount you plan to borrow.",
      "Enter the annual interest rate as a percentage, such as 9%.",
      "Enter the loan tenure in months. For example, 5 years is 60 months.",
      "Compare both the monthly EMI and total interest when evaluating a loan.",
      "A longer tenure can reduce the monthly EMI but may increase the total interest paid.",
      "Actual loan costs can vary because of lender-specific rates, processing fees, taxes, insurance and other charges."
    ],

    faqs: [
      {
        question: "What is EMI?",
        answer:
          "EMI stands for Equated Monthly Instalment. It is the scheduled payment made toward a loan, generally covering both principal and interest."
      },
      {
        question: "How is EMI calculated?",
        answer:
          "The EMI is calculated using the loan amount, monthly interest rate and total number of monthly payments using a standard reducing-balance EMI formula."
      },
      {
        question: "Does a longer loan tenure reduce EMI?",
        answer:
          "A longer tenure can reduce the monthly EMI because repayment is spread over more months. However, it can increase the total interest paid."
      },
      {
        question: "Does a lower interest rate reduce EMI?",
        answer:
          "Generally, a lower interest rate can reduce the EMI when the loan amount and repayment tenure remain the same."
      },
      {
        question: "Is the EMI result exact?",
        answer:
          "The result is an estimate based on the values entered. Actual repayment can differ because of lender-specific rates, fees, rounding and other charges."
      }
    ]
  },

  "loan-calculator": {
  intro:
    "The Loan Calculator estimates your monthly loan payment, total repayment amount, and total interest based on the loan amount, interest rate, and repayment period.",
  formula:
    "For a reducing-balance loan, EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly payments.",
  example:
    "For example, if you borrow ₹5,00,000 at an annual interest rate of 9% for 5 years, the calculator estimates the monthly payment and shows the total amount repaid and total interest.",
  tips: [
    "Enter the actual loan amount you plan to borrow.",
    "Check the lender's actual interest rate and fees before making a financial decision.",
    "A longer repayment period can reduce the monthly payment but may increase total interest.",
  ],
  faqs: [
    {
      question: "What does the Loan Calculator calculate?",
      answer:
        "It estimates the monthly payment, total repayment amount, and total interest based on the values you enter.",
    },
    {
      question: "Is the result guaranteed to match my lender?",
      answer:
        "No. Actual loan payments can differ because lenders may use different rates, fees, taxes, insurance, or calculation methods.",
    },
    {
      question: "What is the difference between a Loan Calculator and an EMI Calculator?",
      answer:
        "Both can estimate loan repayments. A Loan Calculator is presented as a general loan-payment tool, while an EMI Calculator focuses specifically on equated monthly instalments.",
    },
  ],
},
  
  "sip-calculator": {
    intro:
      "The SIP Calculator estimates the potential future value of regular investments made at fixed intervals. It uses the investment amount, expected annual return and investment period to estimate the future value of the investment.",

    formula:
      "Future Value = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r), where P is the regular investment amount, r is the periodic rate of return and n is the total number of investment periods.",

    example:
      "For example, investing ₹5,000 per month for 5 years with an assumed annual return of 12% can be used to estimate a potential future value. The actual investment value may be higher or lower because market returns are not fixed.",

    tips: [
      "Enter the amount you plan to invest regularly.",
      "Enter the expected annual return as a percentage.",
      "Enter the investment period in months.",
      "Try different investment amounts and periods to compare projections.",
      "A longer investment period can give compounding more time to affect the projected value.",
      "The result is an estimate and does not guarantee future investment performance."
    ],

    faqs: [
      {
        question: "What is a SIP?",
        answer:
          "SIP stands for Systematic Investment Plan. It is a method of investing a fixed amount at regular intervals, commonly used for mutual fund investments."
      },
      {
        question: "How does a SIP calculator work?",
        answer:
          "It uses the regular investment amount, expected rate of return and investment period to estimate the potential future value."
      },
      {
        question: "Are SIP returns guaranteed?",
        answer:
          "No. SIP returns are not guaranteed. Actual results depend on the performance of the underlying investment and market conditions."
      },
      {
        question: "Can a longer investment period affect the result?",
        answer:
          "A longer investment period gives regular contributions and potential compounding more time to affect the projected value, although actual returns can vary."
      },
      {
        question: "Is the SIP calculator result exact?",
        answer:
          "No. It is a projection based on an assumed rate of return. Actual investment performance may differ significantly."
      }
    ]
  },

  "gst-calculator": {
    intro:
      "The GST Calculator helps you calculate an amount after adding GST or work backward from a GST-inclusive amount to estimate the original amount and GST component.",

    formula:
      "When GST is added, GST = Base Amount × GST Rate ÷ 100 and Total = Base Amount + GST. When GST is removed from an inclusive amount, the calculator estimates the base amount and GST component from the selected rate.",

    example:
      "For example, if the base amount is ₹10,000 and the GST rate is 18%, adding GST gives ₹1,800 in GST and a total of ₹11,800.",

    tips: [
      "Check whether the amount you enter is before or after GST.",
      "Select Add GST when calculating a GST-inclusive amount.",
      "Select Remove GST when working backward from a GST-inclusive amount.",
      "Enter the applicable GST rate as a percentage.",
      "Use the result as a calculation aid and verify applicable tax requirements for actual transactions."
    ],

    faqs: [
      {
        question: "Can this calculator add GST?",
        answer:
          "Yes. Select Add GST and enter the base amount and applicable GST rate."
      },
      {
        question: "Can this calculator remove GST?",
        answer:
          "Yes. Select Remove GST to estimate the base amount and GST component from a GST-inclusive amount."
      },
      {
        question: "What GST rate should I enter?",
        answer:
          "Enter the GST rate applicable to the transaction you are calculating. Tax rates can vary depending on the goods or services and applicable rules."
      },
      {
        question: "Does this calculator provide tax advice?",
        answer:
          "No. It performs mathematical calculations based on the values entered and should not be treated as tax or professional advice."
      }
    ]
  },

  "discount-calculator": {
    intro:
      "The Discount Calculator helps you find the discount amount, final sale price and estimated savings when a percentage discount is applied to an original price.",

    formula:
      "Discount Amount = Original Price × Discount Percentage ÷ 100. Sale Price = Original Price − Discount Amount.",

    example:
      "For example, if an item costs ₹2,000 and has a 20% discount, the discount amount is ₹400 and the estimated sale price is ₹1,600.",

    tips: [
      "Enter the original listed price before the discount.",
      "Enter the discount percentage.",
      "Check the calculated savings and final sale price.",
      "For multiple discounts, calculate each discount according to the way the seller applies it.",
      "Taxes, shipping charges and other fees may not be included unless they are part of the price you enter."
    ],

    faqs: [
      {
        question: "How is the discount amount calculated?",
        answer:
          "The discount amount is calculated by multiplying the original price by the discount percentage and dividing by 100."
      },
      {
        question: "How do I calculate the final sale price?",
        answer:
          "Subtract the discount amount from the original price to get the estimated sale price."
      },
      {
        question: "Can I use this for shopping discounts?",
        answer:
          "Yes. You can use it to estimate savings and the discounted price of products or services."
      },
      {
        question: "Does the calculator include taxes or delivery charges?",
        answer:
          "No. The calculator works with the amount you enter. Additional taxes, delivery charges or fees may need to be considered separately."
      }
    ]
  },

  "simple-interest": {
    intro:
      "The Simple Interest Calculator estimates the interest earned or charged and the total maturity amount using the principal amount, annual interest rate and time period.",

    formula:
      "Simple Interest = Principal × Rate × Time ÷ 100. Total Amount = Principal + Simple Interest.",

    example:
      "For example, ₹10,000 at 8% annual simple interest for 2 years produces ₹1,600 in interest and a total amount of ₹11,600.",

    tips: [
      "Enter the principal amount.",
      "Enter the annual interest rate as a percentage.",
      "Enter the time period in years.",
      "Check whether the applicable financial product actually uses simple interest.",
      "Verify the applicable rate and terms before making financial decisions."
    ],

    faqs: [
      {
        question: "What is simple interest?",
        answer:
          "Simple interest is calculated only on the original principal amount and does not add previously earned interest to the principal for subsequent calculations."
      },
      {
        question: "What is the simple interest formula?",
        answer:
          "The standard formula is Principal × Rate × Time ÷ 100 when the rate is expressed as a percentage and time is measured in years."
      },
      {
        question: "Does simple interest compound?",
        answer:
          "No. Simple interest is calculated on the original principal rather than on accumulated interest."
      },
      {
        question: "Is the result guaranteed?",
        answer:
          "The mathematical result follows the values entered, but actual financial products may have different terms, fees or calculation methods."
      }
    ]
  },

  "compound-interest": {
    intro:
      "The Compound Interest Calculator estimates how an amount can grow when interest is added to the balance and future interest is calculated on the accumulated amount.",

    formula:
      "A = P(1 + r/n)ⁿᵗ, where P is the principal, r is the annual interest rate expressed as a decimal, n is the number of compounding periods per year, and t is time in years.",

    example:
      "For example, entering a principal amount, annual interest rate, time period and compounding frequency allows the calculator to estimate the accumulated amount and the effect of compounding.",

    tips: [
      "Enter the annual interest rate as a percentage.",
      "Choose the compounding frequency that matches your assumption.",
      "Enter the investment or borrowing period in years.",
      "Compare different rates and periods to understand how compounding affects growth.",
      "Use the result as an estimate based on the assumptions entered."
    ],

    faqs: [
      {
        question: "What is compound interest?",
        answer:
          "Compound interest is interest calculated on the principal and previously accumulated interest."
      },
      {
        question: "Why does compounding matter?",
        answer:
          "Compounding can cause previously accumulated interest to become part of the balance used for future interest calculations."
      },
      {
        question: "What does compounding frequency mean?",
        answer:
          "It describes how often interest is added to the balance during a year, such as monthly, quarterly, half-yearly or annually."
      },
      {
        question: "Is compound interest always better?",
        answer:
          "The effect depends on whether you are earning or paying interest, as well as the rate, compounding frequency, fees and time period."
      }
    ]
  },

  "percentage-calculator": {
    intro:
      "The Percentage Calculator helps solve common percentage calculations quickly, such as finding a percentage of a number.",

    formula:
      "Percentage Result = Number × Percentage ÷ 100.",

    example:
      "For example, 20% of 500 is calculated as 500 × 20 ÷ 100, giving a result of 100.",

    tips: [
      "Enter the percentage value without the percent symbol.",
      "Check that you have entered the correct number.",
      "Use the result as a quick way to verify everyday percentage calculations.",
      "For percentage increases or decreases, make sure you understand which value is being used as the base."
    ],

    faqs: [
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percentage and divide the result by 100."
      },
      {
        question: "What is 10% of 500?",
        answer:
          "Ten percent of 500 is 50."
      },
      {
        question: "Can I use this for everyday calculations?",
        answer:
          "Yes. It can be useful for discounts, marks, business calculations and other situations involving percentages."
      },
      {
        question: "Does percentage mean the same as decimal?",
        answer:
          "A percentage expresses a value out of 100. For example, 25% is equivalent to 0.25 as a decimal."
      }
    ]
  },

  "average-calculator": {
    intro:
      "The Average Calculator finds the arithmetic mean of a list of numbers by adding the values and dividing their total by the number of values.",

    formula:
      "Average = Sum of all numbers ÷ Number of values.",

    example:
      "For example, the average of 10, 20, 30 and 40 is 25 because their total is 100 and there are 4 values.",

    tips: [
      "Separate each number with a comma.",
      "Check that all intended values are included.",
      "Make sure the values are entered correctly before calculating.",
      "The arithmetic mean can be affected by unusually large or small values."
    ],

    faqs: [
      {
        question: "How is an average calculated?",
        answer:
          "Add all the values together and divide the total by the number of values."
      },
      {
        question: "What is the difference between average and median?",
        answer:
          "The arithmetic average uses the sum of values divided by their count, while the median is the middle value after the numbers are ordered."
      },
      {
        question: "Can I calculate the average of decimal numbers?",
        answer:
          "Yes. Decimal values can be included as long as they are entered in the format accepted by the calculator."
      },
      {
        question: "Can an extreme value affect an average?",
        answer:
          "Yes. Very large or very small values can significantly affect the arithmetic mean."
      }
    ]
  },

  "bmi-calculator": {
    intro:
      "The BMI Calculator estimates Body Mass Index using your weight and height. BMI is a general screening measure based on height and weight and should not be treated as a medical diagnosis.",

    formula:
      "BMI = Weight in kilograms ÷ Height in metres squared.",

    example:
      "For example, a person weighing 70 kg with a height of 1.75 metres has an estimated BMI of about 22.9.",

    tips: [
      "Enter height in centimetres.",
      "Enter weight in kilograms.",
      "Use reasonably accurate height and weight measurements.",
      "BMI is a general screening measure and does not directly measure body fat or overall health.",
      "For health concerns or interpretation of your results, consult a qualified healthcare professional."
    ],

    faqs: [
      {
        question: "What does BMI measure?",
        answer:
          "BMI is a numerical measure calculated from height and weight and is commonly used as a general screening measure."
      },
      {
        question: "Is BMI a medical diagnosis?",
        answer:
          "No. BMI is a screening measure and should not be used by itself to diagnose a health condition."
      },
      {
        question: "Can BMI be used for everyone?",
        answer:
          "BMI has limitations and may not accurately represent body composition for every person or population. Professional interpretation may be appropriate."
      },
      {
        question: "What should I do with my BMI result?",
        answer:
          "Use it as general information rather than a diagnosis. If you have concerns about your weight or health, discuss them with a qualified healthcare professional."
      }
    ]
  },

  "age-calculator": {
    intro:
      "The Age Calculator calculates age from a date of birth and the current date. It can help estimate age in years, months and days.",

    example:
      "Select your date of birth and calculate your current age using today's date. The result is based on the dates entered and the current date used by the calculator.",

    tips: [
      "Select the correct date of birth.",
      "Check the selected date before calculating.",
      "Make sure the date format and calendar date are correct.",
      "For official documents, use the date of birth recorded in the relevant official records."
    ],

    faqs: [
      {
        question: "Can the calculator show age in years, months and days?",
        answer:
          "Yes. The calculator estimates age using the selected date of birth and the current date."
      },
      {
        question: "Does the calculator use today's date?",
        answer:
          "Yes. The age calculation is based on the date of birth you enter and the current date available to the calculator."
      },
      {
        question: "Can I calculate the age of someone born in the past?",
        answer:
          "Yes. Enter the person's date of birth to calculate their age relative to the current date."
      },
      {
        question: "Is the result suitable for official purposes?",
        answer:
          "It is a calculation tool. For official applications or legal purposes, use the date recorded in the relevant official documents."
      }
    ]
  },

  "date-difference": {
    intro:
      "The Date Difference Calculator finds the number of days between two selected dates. It can be useful for checking durations between dates and planning periods.",

    example:
      "Select a start date and an end date to calculate the difference between them. The result represents the number of days between the selected dates.",

    tips: [
      "Choose the correct start date.",
      "Choose the correct end date.",
      "Check whether you want the elapsed difference between the dates or an inclusive count for your particular use case.",
      "Make sure both dates are entered correctly before using the result."
    ],

    faqs: [
      {
        question: "What does the Date Difference Calculator calculate?",
        answer:
          "It calculates the number of days between the two selected dates."
      },
      {
        question: "Can the calculator compare dates in different years?",
        answer:
          "Yes. You can select dates from different years to calculate the number of days between them."
      },
      {
        question: "Does it account for leap years?",
        answer:
          "Date calculations account for the calendar dates used by the calculator, including the additional day in a leap year."
      },
      {
        question: "Are the start and end dates counted as full days?",
        answer:
          "The result represents the date difference according to the calculator's calculation method. For applications requiring inclusive counting, check the dates and counting convention carefully."
      }
    ]
  },

  "length-converter": {
    intro:
      "The Length Converter converts common units of length including millimetres, centimetres, metres, kilometres, inches, feet, yards and miles.",

    example:
      "For example, enter a value in metres, select metres as the source unit and choose centimetres as the target unit to convert the measurement.",

    tips: [
      "Select the correct source unit.",
      "Select the desired target unit.",
      "Check the converted value and unit together.",
      "Be careful when switching between metric and imperial units.",
      "Use the same measurement reference when comparing converted values."
    ],

    faqs: [
      {
        question: "Which length units are supported?",
        answer:
          "The calculator supports millimetres, centimetres, metres, kilometres, inches, feet, yards and miles."
      },
      {
        question: "Can I convert metres to feet?",
        answer:
          "Yes. Select metres as the source unit and feet as the target unit."
      },
      {
        question: "Can I convert kilometres to miles?",
        answer:
          "Yes. Select kilometres as the source unit and miles as the target unit."
      },
      {
        question: "Are the conversion results exact?",
        answer:
          "The calculator uses standard unit conversion relationships. Displayed results may be rounded for readability."
      }
    ]
  },

  "weight-converter": {
    intro:
      "The Weight Converter converts between common units including grams, kilograms, pounds and ounces.",

    example:
      "Enter a value, select the source unit and select the target unit to get the converted measurement.",

    tips: [
      "Select the correct source unit.",
      "Select the desired target unit.",
      "Check the converted value and unit together.",
      "Use consistent units when comparing measurements."
    ],

    faqs: [
      {
        question: "Which weight units are supported?",
        answer:
          "The calculator supports grams, kilograms, pounds and ounces."
      },
      {
        question: "Can I convert kilograms to pounds?",
        answer:
          "Yes. Select kilograms as the source unit and pounds as the target unit."
      },
      {
        question: "Can I convert grams to ounces?",
        answer:
          "Yes. Select grams as the source unit and ounces as the target unit."
      },
      {
        question: "Are weight conversion results rounded?",
        answer:
          "The underlying conversion uses standard unit relationships, while the displayed result may be rounded for readability."
      }
    ]
  },

  "temperature-converter": {
    intro:
      "The Temperature Converter converts temperatures between Celsius, Fahrenheit and Kelvin.",

    example:
      "Enter a temperature and select the source and target temperature scales to convert the value.",

    tips: [
      "Choose the correct source scale.",
      "Choose the desired target scale.",
      "Check the temperature unit shown with the result.",
      "Remember that Celsius, Fahrenheit and Kelvin use different reference points and scales."
    ],

    faqs: [
      {
        question: "Which temperature scales are supported?",
        answer:
          "The calculator supports Celsius, Fahrenheit and Kelvin."
      },
      {
        question: "Can I convert Celsius to Fahrenheit?",
        answer:
          "Yes. Select Celsius as the source scale and Fahrenheit as the target scale."
      },
      {
        question: "Can Celsius temperatures be converted to Kelvin?",
        answer:
          "Yes. The calculator can convert between Celsius and Kelvin."
      },
      {
        question: "Can temperature values be negative?",
        answer:
          "Yes. Celsius and Fahrenheit can have negative values. Kelvin is an absolute temperature scale and does not use temperatures below absolute zero."
      }
    ]
  }
};
