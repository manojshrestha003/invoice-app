import { getUserFromRequest } from '@/lib/auth';
import OpenAI from 'openai';

// Initialize openAI directly, but wrap it in logic incase key is missing
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function POST(req: Request) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const invoiceData = await req.json();

    // Fallback if no OpenAI Key is provided yet
    if (!openai) {
      return new Response(JSON.stringify({
        score: 85,
        feedback: [
          "No OPENAI_API_KEY provided in environment variables.",
          "This is a mock response. Setup your key to get raw AI feedback.",
          "Your total looks to be calculated correctly natively."
        ]
      }), { status: 200 });
    }

    const prompt = `
      You are an expert financial auditor. Review the following draft invoice data and provide a professionalism score (0-100) and an array of brief, actionable feedback points.
      Invoice Data:
      ${JSON.stringify(invoiceData, null, 2)}

      Please return strictly valid JSON matching this schema:
      {
        "score": 95,
        "feedback": ["Suggestion 1", "Suggestion 2"]
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (err: any) {
    console.error("AI Audit Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
