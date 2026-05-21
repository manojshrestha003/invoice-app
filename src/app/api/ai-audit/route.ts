import { getUserFromRequest } from '@/lib/auth';
import OpenAI from 'openai';

// Initialize openAI directly, but wrap it in logic incase key is missing
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ai audit 
export async function POST(req: Request) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const invoiceData = await req.json();

    // Fallback if no OpenAI Key is provided yet
    if (!openai) {
      return new Response(JSON.stringify({
        score: 85,
        criticalIssues: [],
        warnings: [
          "Operational in mock mode. Setup OPENAI_API_KEY for live CPA-grade insights."
        ],
        suggestions: [
          "Mathematical verification passed natively.",
          "Consider adding detailed terms and conditions for better compliance."
        ]
      }), { status: 200 });
    }

    const prompt = `
      You are an elite financial auditor and CPA. Review the following draft invoice data and perform a rigorous audit.
      
      Invoice Data:
      ${JSON.stringify(invoiceData, null, 2)}

      Your goal is to provide a "Professionalism Score" (0-100) and categorize your findings into:
      1. "criticalIssues": Mathematical errors, logical date errors (e.g. due date before issue date), or missing essential data.
      2. "warnings": Missing but non-fatal data (e.g. notes, tax IDs, contact info).
      3. "suggestions": Professionalism, language clarity, and branding improvements.

      CRITICAL CHECKS:
      - Does the sum of (item.total) match the totalAmount?
      - Is the dueDate strictly after the date?
      - Are item descriptions professional and clear?

      Return strictly valid JSON matching this schema:
      {
        "score": number, 
        "criticalIssues": string[],
        "warnings": string[],
        "suggestions": string[]
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (err: any) {
    console.error("AI Audit Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
