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
  },

    "loan-calculator": {
    intro:
      "The Loan Calculator estimates the monthly payment, total repayment and total interest for a loan using the loan amount, annual interest rate and repayment period.",
    formula:
      "Monthly payment = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate and n is the number of monthly payments.",
    example:
      "For example, enter a loan amount of ₹5,00,000, an annual interest rate of 9% and a repayment period of 60 months to estimate the monthly payment and total interest.",
    tips: [
      "Enter the loan amount you plan to borrow.",
      "Enter the annual interest rate as a percentage.",
      "Enter the repayment period in months.",
      "Compare both monthly payment and total interest.",
      "Actual loan costs may include processing fees, insurance, taxes or other lender charges."
    ],
    faqs: [
      {
        question: "What does a loan calculator calculate?",
        answer:
          "It estimates the regular loan payment, total repayment and total interest using the values you enter."
      },
      {
        question: "Does a longer loan period reduce the monthly payment?",
        answer:
          "A longer repayment period can reduce the monthly payment, but it may increase the total interest paid."
      }
    ]
  },

  "salary-calculator": {
    intro:
      "The Salary Calculator helps estimate monthly salary and take-home pay from annual salary and estimated deductions.",
    formula:
      "Estimated monthly salary = Annual salary ÷ 12. Estimated take-home pay depends on the deductions entered or assumptions used by the calculator.",
    example:
      "Enter an annual salary to estimate the corresponding monthly salary and review the estimated deductions and take-home amount.",
    tips: [
      "Enter annual salary in rupees.",
      "Review deductions carefully because actual payroll deductions vary.",
      "Take-home salary can differ from CTC because CTC may include employer contributions and other benefits."
    ],
    faqs: [
      {
        question: "Is take-home salary the same as CTC?",
        answer:
          "No. CTC can include employer contributions and benefits that are not directly paid as monthly take-home salary."
      },
      {
        question: "Why can actual salary differ from the calculator?",
        answer:
          "Actual salary can depend on income tax, provident fund, professional tax, benefits and employer-specific payroll rules."
      }
    ]
  },

  "income-tax-calculator": {
    intro:
      "The Income Tax Calculator provides an estimate of income tax based on the income and tax-regime inputs you provide. Tax calculations can depend on deductions, exemptions, rebates, surcharge, cess and the nature of income.",
    formula:
      "Estimated tax is calculated by applying the applicable tax rates to taxable income, followed by applicable rebate, surcharge and cess rules.",
    example:
      "Enter your taxable income and select the applicable tax regime to estimate the income tax liability.",
    tips: [
      "Use taxable income rather than automatically assuming gross salary is taxable income.",
      "Check whether deductions or exemptions apply to your situation.",
      "Tax rules can change between tax years, so verify important calculations against official Income Tax Department guidance.",
      "This calculator is an estimate and is not tax advice."
    ],
    faqs: [
      {
        question: "Does this calculator provide an exact tax liability?",
        answer:
          "No. It provides an estimate based on the information and assumptions entered. Actual tax liability can depend on income sources, deductions, exemptions, rebates, surcharge and other applicable rules."
      },
      {
        question: "Can tax rules change?",
        answer:
          "Yes. Tax rates, rebates, deductions and other provisions can change between tax years. Always verify important tax calculations using current official guidance."
      }
    ]
  },

  "profit-loss-calculator": {
    intro:
      "The Profit & Loss Calculator calculates profit or loss and the corresponding percentage from cost price and selling price.",
    formula:
      "Profit = Selling Price − Cost Price. Loss = Cost Price − Selling Price. Profit percentage = Profit ÷ Cost Price × 100.",
    example:
      "Enter a cost price of ₹1,000 and a selling price of ₹1,200 to calculate the profit and profit percentage.",
    tips: [
      "Enter the original cost price accurately.",
      "Enter the actual selling price.",
      "Use the profit or loss percentage to compare different transactions."
    ],
    faqs: [
      {
        question: "How is profit calculated?",
        answer:
          "Profit is calculated by subtracting the cost price from the selling price when the selling price is higher."
      },
      {
        question: "How is loss calculated?",
        answer:
          "Loss is calculated by subtracting the selling price from the cost price when the selling price is lower."
      }
    ]
  },

  "percentage-change-calculator": {
    intro:
      "The Percentage Change Calculator calculates the percentage increase or decrease between an original value and a new value.",
    formula:
      "Percentage change = (New value − Original value) ÷ Original value × 100.",
    example:
      "If an original value is 100 and the new value is 120, the percentage change is a 20% increase.",
    tips: [
      "Enter the original value first.",
      "Enter the new value second.",
      "A positive result indicates an increase and a negative result indicates a decrease."
    ],
    faqs: [
      {
        question: "What does a positive percentage change mean?",
        answer:
          "A positive percentage change means the new value is higher than the original value."
      },
      {
        question: "What does a negative percentage change mean?",
        answer:
          "A negative percentage change means the new value is lower than the original value."
      }
    ]
  },

  "ratio-calculator": {
    intro:
      "The Ratio Calculator helps simplify ratios and calculate equivalent ratio values.",
    formula:
      "A ratio can be simplified by dividing all parts by their greatest common divisor.",
    example:
      "A ratio of 20:30 can be simplified to 2:3 by dividing both values by 10.",
    tips: [
      "Enter positive ratio values.",
      "Keep the order of the ratio values correct.",
      "Simplifying a ratio does not change the relationship between its parts."
    ],
    faqs: [
      {
        question: "How do you simplify a ratio?",
        answer:
          "Divide all parts of the ratio by their greatest common divisor."
      },
      {
        question: "What is an equivalent ratio?",
        answer:
          "An equivalent ratio represents the same relationship using different numbers."
      }
    ]
  },

  "fraction-calculator": {
    intro:
      "The Fraction Calculator performs common operations such as addition, subtraction, multiplication and division of fractions.",
    formula:
      "For addition and subtraction, fractions are converted to a common denominator. Multiplication multiplies numerators and denominators. Division multiplies by the reciprocal of the second fraction.",
    example:
      "For example, 1/2 + 1/4 equals 3/4 after converting the fractions to a common denominator.",
    tips: [
      "Enter valid numerator and denominator values.",
      "Do not use zero as a denominator.",
      "Simplify the final fraction when needed."
    ],
    faqs: [
      {
        question: "Can fractions with different denominators be added?",
        answer:
          "Yes. They are first converted to equivalent fractions with a common denominator."
      },
      {
        question: "Can you divide by a fraction?",
        answer:
          "Yes. Division by a fraction is performed by multiplying by its reciprocal, provided the divisor is not zero."
      }
    ]
  },

  "time-calculator": {
    intro:
      "The Time Calculator adds or subtracts hours and minutes to help with everyday time calculations.",
    formula:
      "Time values are converted into total minutes, the selected operation is performed, and the result is converted back into hours and minutes.",
    example:
      "For example, adding 2 hours 30 minutes and 1 hour 45 minutes gives 4 hours 15 minutes.",
    tips: [
      "Enter hours and minutes separately.",
      "Keep minutes between 0 and 59 for standard time notation.",
      "Check whether you want to add or subtract the entered times."
    ],
    faqs: [
      {
        question: "Can this calculator subtract time?",
        answer:
          "Yes. Select the subtract operation and enter the two time values."
      },
      {
        question: "Can minutes exceed 59?",
        answer:
          "The calculator uses hours and minutes as separate time units, so standard minute values should normally be between 0 and 59."
      }
    ]
  },

  "hours-calculator": {
    intro:
      "The Hours Calculator calculates the elapsed time between a start time and an end time.",
    formula:
      "Elapsed time is calculated from the difference between the end time and start time.",
    example:
      "Enter a start time of 9:00 AM and an end time of 5:00 PM to calculate the elapsed duration.",
    tips: [
      "Enter the correct start time.",
      "Enter the correct end time.",
      "Check whether the period crosses midnight when interpreting the result."
    ],
    faqs: [
      {
        question: "What does the Hours Calculator measure?",
        answer:
          "It calculates the elapsed duration between the selected start and end times."
      },
      {
        question: "Can it be used for work hours?",
        answer:
          "Yes. It can help estimate the duration between a work start time and end time."
      }
    ]
  },

  "age-difference-calculator": {
    intro:
      "The Age Difference Calculator calculates the difference between two dates of birth in years, months and days.",
    formula:
      "The calculator compares the two dates and determines the calendar difference between the earlier and later date.",
    example:
      "Select two dates of birth to calculate the approximate age difference between them.",
    tips: [
      "Enter both dates correctly.",
      "The order of the dates does not affect which person is identified as older.",
      "Calendar differences can vary depending on month lengths and leap years."
    ],
    faqs: [
      {
        question: "Can I compare two dates of birth?",
        answer:
          "Yes. Enter both dates to calculate the calendar difference between them."
      },
      {
        question: "Does the calculator account for different month lengths?",
        answer:
          "Yes. The calculation uses calendar dates rather than assuming every month has the same number of days."
      }
    ]
  },

  "area-calculator": {
    intro:
      "The Area Calculator calculates the area of common geometric shapes including rectangles, triangles and circles.",
    formula:
      "Rectangle: Area = length × width. Triangle: Area = ½ × base × height. Circle: Area = π × radius².",
    example:
      "For a rectangle measuring 10 units by 5 units, the area is 50 square units.",
    tips: [
      "Use the same unit for all dimensions.",
      "For a circle, enter the radius rather than the diameter.",
      "The result is expressed in square units."
    ],
    faqs: [
      {
        question: "How is the area of a rectangle calculated?",
        answer:
          "Multiply the length by the width."
      },
      {
        question: "How is the area of a circle calculated?",
        answer:
          "Multiply π by the square of the radius."
      }
    ]
  },

  "volume-calculator": {
    intro:
      "The Volume Calculator calculates the volume of common three-dimensional shapes including cuboids, cylinders and spheres.",
    formula:
      "Cuboid: Volume = length × width × height. Cylinder: Volume = π × radius² × height. Sphere: Volume = 4/3 × π × radius³.",
    example:
      "A cuboid measuring 5 units × 4 units × 3 units has a volume of 60 cubic units.",
    tips: [
      "Use consistent units for all dimensions.",
      "For cylinders and spheres, enter the radius.",
      "The result is expressed in cubic units."
    ],
    faqs: [
      {
        question: "How is the volume of a cuboid calculated?",
        answer:
          "Multiply its length, width and height."
      },
      {
        question: "How is the volume of a sphere calculated?",
        answer:
          "Use the formula 4/3 × π × radius³."
      }
    ]
  },

  "speed-calculator": {
    intro:
      "The Speed Calculator estimates speed from distance and travel time.",
    formula:
      "Speed = Distance ÷ Time.",
    example:
      "If a vehicle travels 120 kilometres in 2 hours, its average speed is 60 kilometres per hour.",
    tips: [
      "Use compatible distance and time units.",
      "Enter a time greater than zero.",
      "The result represents average speed based on the values entered."
    ],
    faqs: [
      {
        question: "How is speed calculated?",
        answer:
          "Speed is calculated by dividing distance by the time taken."
      },
      {
        question: "Is this the same as instantaneous speed?",
        answer:
          "No. The calculator estimates average speed over the distance and time entered."
      }
    ]
  },

  "fuel-cost-calculator": {
    intro:
      "The Fuel Cost Calculator estimates fuel usage and travel cost from distance, vehicle mileage and fuel price.",
    formula:
      "Fuel required = Distance ÷ Mileage. Fuel cost = Fuel required × Fuel price.",
    example:
      "If a vehicle travels 300 km, gives 15 km/L mileage and fuel costs ₹100/L, the estimated fuel requirement is 20 litres and the estimated cost is ₹2,000.",
    tips: [
      "Enter the total travel distance in kilometres.",
      "Enter the vehicle mileage in kilometres per litre.",
      "Use the current fuel price per litre for a more relevant estimate.",
      "Actual mileage can vary with traffic, driving style, vehicle load and road conditions."
    ],
    faqs: [
      {
        question: "How is fuel cost calculated?",
        answer:
          "Fuel required is estimated by dividing distance by mileage, then multiplying the fuel required by the fuel price."
      },
      {
        question: "Why can actual fuel cost be different?",
        answer:
          "Actual fuel consumption can vary because of traffic, speed, driving conditions, vehicle condition and changes in fuel price."
      }
    ]
  },

  "fd-calculator": {
    intro: "Use this FD Calculator to estimate the maturity amount and interest earned on a fixed deposit using the deposit, annual interest rate and tenure.",
    formula: "For quarterly compounding, maturity = principal × (1 + annual rate ÷ 4)^(4 × years). Actual bank FD returns can vary by product, tenure and compounding rules.",
    example: "Enter your deposit amount, expected annual FD rate and tenure to estimate the maturity value and total interest.",
    tips: ["Compare the maturity value with the total amount invested.", "Check the bank's actual FD rate and compounding frequency before investing.", "Senior-citizen rates and premature-withdrawal rules may differ by bank."],
    faqs: [
      { question: "What does an FD calculator show?", answer: "It estimates the maturity value and interest earned on a fixed deposit based on the values entered." },
      { question: "Is the FD result guaranteed?", answer: "No. The result is an estimate. Check the bank's current rate, compounding method, taxes and product terms." }
    ]
  },
  "ppf-calculator": {
    intro: "Estimate the potential maturity value of a Public Provident Fund investment using yearly deposits, an assumed interest rate and investment period.",
    formula: "This calculator applies the entered annual rate to the balance after each yearly deposit. PPF rules, interest rates and deposit limits are subject to government notifications.",
    example: "Enter your planned yearly deposit, assumed interest rate and number of years to estimate total deposits, interest and maturity value.",
    tips: ["Use the current official PPF interest rate when making an estimate.", "PPF has government-defined rules for tenure and deposits.", "Treat the result as an estimate and verify current rules before investing."],
    faqs: [
      { question: "Is the PPF interest rate fixed forever?", answer: "No. The PPF interest rate is notified by the government and can change." },
      { question: "Does this calculator replace official PPF information?", answer: "No. It is an estimation tool. Check official government or bank information for current rules." }
    ]
  },
  "home-loan-emi-calculator": {
    intro: "Calculate estimated monthly EMI, total interest and total repayment for a home loan using the loan amount, annual interest rate and tenure.",
    formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is principal, r is the monthly rate and n is the number of monthly payments.",
    example: "Enter the home-loan amount, annual interest rate and tenure to see the estimated monthly EMI and total repayment.",
    tips: ["Compare total interest, not only the monthly EMI.", "A longer tenure can lower EMI but increase total interest.", "Actual home-loan costs can include processing fees, insurance and other charges."],
    faqs: [
      { question: "Can I use this for a home loan?", answer: "Yes. Enter the principal, annual interest rate and tenure in months." },
      { question: "Does the result include processing fees?", answer: "No. The calculator estimates principal and interest repayment only." }
    ]
  },
  "personal-loan-emi-calculator": {
    intro: "Estimate the monthly EMI, total interest and total repayment for a personal loan.",
    formula: "The calculator uses the standard reducing-balance EMI formula based on principal, monthly interest rate and number of payments.",
    example: "Enter the personal-loan amount, annual rate and repayment tenure to estimate your monthly instalment.",
    tips: ["Compare APR or total borrowing cost where available, not just the advertised rate.", "Check processing fees and other lender charges.", "Avoid choosing a longer tenure only because the EMI looks smaller."],
    faqs: [
      { question: "What does a personal-loan EMI include?", answer: "The calculated EMI represents principal and interest under the assumptions entered. Fees and other charges are not included." },
      { question: "Can I compare different loan rates?", answer: "Yes. Run the calculator with different rates and tenures to compare estimated repayment costs." }
    ]
  },
  "car-loan-emi-calculator": {
    intro: "Estimate your monthly car-loan EMI, total interest and total repayment from the financed amount, annual interest rate and tenure.",
    formula: "The calculator uses the standard reducing-balance EMI formula. The financed amount should reflect the amount actually borrowed rather than the vehicle's full on-road price.",
    example: "Enter the financed car-loan amount, annual interest rate and tenure to estimate your monthly EMI.",
    tips: ["Include your down payment when determining the actual financed amount.", "Compare total repayment across loan offers.", "Remember that insurance, registration and other ownership costs are separate from EMI."],
    faqs: [
      { question: "Should I enter the car's full price?", answer: "No. Enter the amount you actually plan to finance through the loan." },
      { question: "Does this include the down payment?", answer: "No. A down payment reduces the amount borrowed and therefore should be deducted before entering the financed amount." }
    ]
  },
};