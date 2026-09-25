import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const calculators = [
  "emi-calculator",
  "sip-calculator",
  "gst-calculator",
  "discount-calculator",
  "simple-interest",
  "compound-interest",
  "percentage-calculator",
  "average-calculator",
  "bmi-calculator",
  "age-calculator",
  "date-difference",
  "length-converter",
  "weight-converter",
  "temperature-converter"
];

async function generateWithRetry(
  ai: GoogleGenAI,
  model: string,
  prompt: string
) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await ai.models.generateContent({
        model,
        contents: prompt
      });
    } catch (error) {
      lastError = error;

      const err = error as {
        status?: number;
      };

      if (
        err.status !== 503 &&
        err.status !== 429 &&
        err.status !== 500
      ) {
        throw error;
      }

      await sleep(1000 * Math.pow(2, attempt));
    }
  }

  throw lastError;
}

function cleanJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "CalcHub AI is not configured yet. Please add GEMINI_API_KEY in Vercel Environment Variables."
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    const message = String(body?.message || "").trim();
    const context = body?.context || {};

    if (!message) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey
    });

    const prompt = `
You are CalcHub AI.

Your task is to understand the user's request and determine whether they are asking to use one of CalcHub's calculators.

Available calculators:
${calculators.join(", ")}

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside the JSON.

JSON format:

{
  "calculator": "calculator-slug-or-null",
  "values": {},
  "answer": "short helpful response"
}

Rules:

1. If the user clearly wants a calculation that matches a CalcHub calculator, identify it.
2. Extract the values from the user's message.
3. Convert units when necessary.
4. For EMI:
   - p = loan amount
   - rate = annual interest rate
   - months = loan tenure in months
5. For SIP:
   - p = monthly investment
   - rate = expected annual return
   - months = investment period in months
6. For GST:
   - amount = amount
   - gst = GST percentage
   - mode = "add" or "remove"
7. For discount:
   - price = original price
   - discount = discount percentage
8. For simple interest:
   - p = principal
   - rate = annual rate
   - years = time in years
9. For compound interest:
   - p = principal
   - rate = annual rate
   - years = time in years
   - frequency = compounds per year
10. For percentage:
   - a = number
   - b = percentage
11. For average:
   - numbers = comma-separated numbers
12. For BMI:
   - weight = kilograms
   - height = centimeters
13. For age:
   - dob = YYYY-MM-DD if a date of birth is provided
14. For date difference:
   - start = YYYY-MM-DD
   - end = YYYY-MM-DD
15. For length conversion:
   - value = number
   - from = source unit
   - to = target unit
16. For weight conversion:
   - value = number
   - from = source unit
   - to = target unit
17. For temperature conversion:
   - value = number
   - from = C, F, or K
   - to = C, F, or K
18. If required information is missing, keep the calculator identified but leave the missing value out.
19. If the request is not a calculator request, use:
   "calculator": null
20. Never invent missing values.

Current calculator context:
${JSON.stringify(context)}

User request:
${message}
`;

    let response;

    try {
      response = await generateWithRetry(
        ai,
        "gemini-3.8-flash",
        prompt
      );
    } catch (primaryError) {
      console.error(
        "Primary Gemini model failed:",
        primaryError
      );

      response = await generateWithRetry(
        ai,
        "gemini-3.5-flash-lite",
        prompt
      );
    }

    const rawText = response.text || "";

    let parsed;

    try {
      parsed = cleanJson(rawText);
    } catch {
      return NextResponse.json({
        answer: rawText,
        calculator: null,
        values: {}
      });
    }

    return NextResponse.json({
      answer: parsed.answer || "",
      calculator: calculators.includes(parsed.calculator)
        ? parsed.calculator
        : null,
      values: parsed.values || {}
    });
  } catch (error) {
    console.error(
      "CalcHub Gemini AI error:",
      error
    );

    const err = error as {
      message?: string;
      status?: number;
    };

    return NextResponse.json(
      {
        error: "Gemini API error",
        status: err.status || 500,
        details:
          err.message ||
          "Unknown Gemini API error"
      },
      { status: 500 }
    );
  }
}