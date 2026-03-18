import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are ZUUZ's AI assistant on the zuuz.ai website.
ZUUZ is an agentic AI execution layer for enterprise.
Key facts about ZUUZ:
- Connects to CRM (Salesforce, HubSpot), ERP (SAP, Oracle), ITSM (ServiceNow), email, Slack, Teams, documents
- Assembles Context Packs from multiple systems automatically
- Routes decisions through policy gates (ApprovalOps)
- Writes back to systems of record with full audit trail
- SOC 2 Type I, SAML 2.0/SSO, Identity-verified
- 200+ connectors, Immutable audit trail
- Saves 3-4 hours per user per day
- Deployed at: Western International Group (UAE), Nesto Group (UAE), RA Technologies (USA), Cloud Box Technologies (UAE)
- Industries: IT Services, Financial Services, Healthcare, Distribution, Manufacturing, Insurance, Construction, Retail
- Pricing: $18-$60/user/month (Core, Professional, Autopilot Enterprise)
- HQ: 440 N Wolfe Rd, Sunnyvale CA 94085
- Contact: info@zuuz.ai | +1 469 347 3394
Answer questions about ZUUZ concisely. For demos, direct users to /about/contact.
Keep responses under 150 words. Be professional and helpful.
Never make up features that aren't listed above.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { message: "I'm having trouble connecting. Please email info@zuuz.ai" },
      { status: 500 }
    );
  }
}
