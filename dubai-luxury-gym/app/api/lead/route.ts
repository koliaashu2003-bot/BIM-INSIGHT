import { NextResponse } from 'next/server';

/**
 * CRM lead intake. Currently logs and echoes success.
 * To go live, forward the payload to your CRM:
 *   - HubSpot: POST https://api.hubapi.com/crm/v3/objects/contacts
 *   - Salesforce: sObject Lead insert
 *   - Zoho: /crm/v2/Leads
 * Keep API keys server-side (process.env.CRM_API_KEY).
 */
export async function POST(req: Request) {
  try {
    const lead = await req.json();
    // eslint-disable-next-line no-console
    console.log('[lead]', {
      name: lead?.name,
      email: lead?.email,
      phone: lead?.phone,
      goal: lead?.goal,
      plan: lead?.plan,
      source: lead?.source,
    });
    // TODO: await sendToCrm(lead)
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }
}
