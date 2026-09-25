"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  calculator?: string;
  result?: string;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  calculator?: string | null;
};

const calculatorNames: Record<string, string> = {
  "emi-calculator": "EMI Calculator",
  "sip-calculator": "SIP Calculator",
  "gst-calculator": "GST Calculator",
  "discount-calculator": "Discount Calculator",
  "simple-interest": "Simple Interest",
  "compound-interest": "Compound Interest",
  "percentage-calculator": "Percentage Calculator",
  "average-calculator": "Average Calculator",
  "bmi-calculator": "BMI Calculator",
  "age-calculator": "Age Calculator",
  "date-difference": "Date Difference",
  "length-converter": "Length Converter",
  "weight-converter": "Weight Converter",
  "temperature-converter": "Temperature Converter"
};

export default function AIChat({
  calculator = "CalcHub",
  result = ""
}: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        "Hi! I’m CalcHub AI. Ask me to explain a result, a formula, or which calculator you should use."
    }
  ]);

  async function send(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    setInput("");

    setMessages((m) => [
      ...m,
      {
        role: "user",
        text: question
      }
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          calculator,
          result
        })
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            data.answer ||
            data.error ||
            "Something went wrong.",
          calculator: data.calculator || null
        }
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            "I couldn’t connect to the AI service. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="aiFab"
        onClick={() => setOpen(true)}
        aria-label="Open CalcHub AI"
      >
        <span>✦</span> CalcHub AI
      </button>

      {open && (
        <div
          className="aiOverlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="aiPanel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aiHeader">
              <div>
                <strong>✦ CalcHub AI</strong>
                <span>Ask. Understand. Calculate.</span>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close CalcHub AI"
              >
                ×
              </button>
            </div>

            <div className="aiQuick">
              <button
                onClick={() =>
                  send(
                    "Explain my current result in simple words."
                  )
                }
              >
                Explain result
              </button>

              <button
                onClick={() =>
                  send("Explain the formula used here.")
                }
              >
                Explain formula
              </button>

              <button
                onClick={() =>
                  send(
                    "Which CalcHub calculator should I use for my problem?"
                  )
                }
              >
                Find a calculator
              </button>
            </div>

            <div className="aiMessages">
              {messages.map((m, i) => (
                <div
                  className={`aiMsg ${m.role}`}
                  key={i}
                >
                  <div>{m.text}</div>

                  {m.role === "assistant" &&
                    m.calculator &&
                    calculatorNames[m.calculator] && (
                      <div className="aiCalculatorCard">
                        <strong>
                          {calculatorNames[m.calculator]}
                        </strong>

                        <span>
                          This calculator matches your request.
                        </span>

                        <Link
                          href={`/calculator/${m.calculator}`}
                          onClick={() => setOpen(false)}
                        >
                          Open Calculator →
                        </Link>
                      </div>
                    )}
                </div>
              ))}

              {loading && (
                <div className="aiMsg assistant">
                  Thinking…
                </div>
              )}
            </div>

            <form
              className="aiInput"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask CalcHub AI…"
              />

              <button disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}