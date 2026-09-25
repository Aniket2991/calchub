import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
        message?: string;
      };

      // Retry only temporary server/rate-limit errors.
      if (
        err.status !== 503 &&
        err.status !== 429 &&
        err.status !== 500
      ) {
        throw error;
      }

      // 1s → 2s → 4s
      await sleep(1000 * Math.pow(2, attempt));
    }
  }

  throw lastError;
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
You are CalcHub AI, the intelligent assistant inside the CalcHub calculator website.

Your job is to:
- Explain calculator results clearly.
- Explain formulas in simple language.
- Help users choose the correct calculator.
- Help users understand calculations.
- Answer basic mathematics and finance questions.
- Be concise, friendly and practical.
- Never invent calculation results.
- If numbers are provided, calculate carefully.
- For financial topics, explain that results are estimates and not professional financial advice.
- If the user asks about a CalcHub calculator, guide them toward the appropriate calculator.

Current calculator context:
${JSON.stringify(context)}

User question:
${message}
`;

    let response;

    try {
      // Primary model
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

      // Fallback model
      response = await generateWithRetry(
        ai,
        "gemini-3.5-flash-lite",
        prompt
      );
    }

    return NextResponse.json({
      answer:
        response.text ||
        "I couldn't generate a response."
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