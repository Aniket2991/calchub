import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "AI is not configured yet. Add OPENAI_API_KEY in your Vercel environment variables." }, { status: 503 });
    }

    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const calculator = typeof body.calculator === "string" ? body.calculator : "CalcHub";
    const result = typeof body.result === "string" ? body.result : "";

    if (!message) return NextResponse.json({ error: "Please enter a question." }, { status: 400 });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions: `You are CalcHub AI, a concise and helpful assistant inside an online calculator website.\n\nRules:\n- Explain calculations in simple language.\n- Never invent numerical inputs or results.\n- If a user asks for a calculation, ask for missing values or explain how to use the relevant CalcHub calculator.\n- For financial or health topics, provide general educational information and clearly say when professional advice may be appropriate.\n- Do not claim a calculator result is guaranteed.\n- Keep answers practical and reasonably short.\n- Current calculator: ${calculator}. Current displayed result: ${result || "none"}.`,
      input: message
    });

    return NextResponse.json({ answer: response.output_text });
  } catch (error) {
    console.error("CalcHub AI error", error);
    return NextResponse.json({ error: "Sorry, CalcHub AI could not answer right now. Please try again." }, { status: 500 });
  }
}
