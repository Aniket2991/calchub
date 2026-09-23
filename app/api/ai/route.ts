import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "CalcHub AI is not configured yet. Please add OPENAI_API_KEY in Vercel Environment Variables."
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

    const client = new OpenAI({
      apiKey
    });

    const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

    const response = await client.responses.create({
      model,
      instructions: `
You are CalcHub AI, a helpful assistant inside the CalcHub calculator website.

Your job is to:
- Explain calculator results clearly.
- Explain formulas in simple language.
- Help users choose the appropriate calculator.
- Help users understand calculations.
- Be concise and practical.
- Do not invent calculation results.
- For financial or health topics, clearly distinguish estimates from professional advice.

Current calculator context:
${JSON.stringify(context)}
      `,
      input: message
    });

    return NextResponse.json({
      answer: response.output_text
    });
  } catch (error) {
    console.error("CalcHub AI error:", error);

    return NextResponse.json(
      {
        error: "CalcHub AI could not process your request."
      },
      { status: 500 }
    );
  }
}
