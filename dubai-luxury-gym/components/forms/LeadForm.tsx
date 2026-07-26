'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const goals = ['Fat loss', 'Build muscle', 'Athletic performance', 'General health', 'Personal training'];
const plans = ['Signature', 'Elite', 'Private Reserve', 'Not sure yet'];

/**
 * CRM-ready lead form. Fields map 1:1 to a typical CRM contact schema
 * (name/email/phone/goal/plan/source). Submits to /api/lead — wire that
 * route to HubSpot / Salesforce / Zoho.
 */
export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    goal: goals[0],
    plan: plans[0],
    consent: false,
  });

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      // CRM payload — source & UTM would be captured here for attribution.
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'website:contact', ts: Date.now() }),
      }).catch(() => {});
    } finally {
      // Optimistic success — the demo endpoint may not exist yet.
      setTimeout(() => setStatus('done'), 600);
    }
  }

  if (status === 'done') {
    return (
      <div className="glass flex flex-col items-center gap-4 rounded-4xl p-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold">Request received</h3>
        <p className="max-w-sm text-sm text-bone-muted">
          Our concierge will call you within one business hour to schedule your
          complimentary trial. Welcome to AURUM.
        </p>
      </div>
    );
  }

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-bone outline-none transition-colors placeholder:text-bone-dim focus:border-gold/50';

  return (
    <form onSubmit={onSubmit} className="glass rounded-4xl p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="lf-name" className="mb-2 block text-xs text-bone-muted">
            Full name
          </label>
          <input
            id="lf-name"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="lf-email" className="mb-2 block text-xs text-bone-muted">
            Email
          </label>
          <input
            id="lf-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@email.com"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className="mb-2 block text-xs text-bone-muted">
            Phone / WhatsApp
          </label>
          <input
            id="lf-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+971 ..."
            className={field}
          />
        </div>
        <div>
          <label htmlFor="lf-goal" className="mb-2 block text-xs text-bone-muted">
            Primary goal
          </label>
          <select
            id="lf-goal"
            value={form.goal}
            onChange={(e) => set('goal', e.target.value)}
            className={field}
          >
            {goals.map((g) => (
              <option key={g} value={g} className="bg-ink-800">
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lf-plan" className="mb-2 block text-xs text-bone-muted">
            Plan of interest
          </label>
          <select
            id="lf-plan"
            value={form.plan}
            onChange={(e) => set('plan', e.target.value)}
            className={field}
          >
            {plans.map((p) => (
              <option key={p} value={p} className="bg-ink-800">
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs text-bone-muted">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-gold"
        />
        I agree to be contacted about my trial and consent to the privacy policy.
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold py-4 text-sm font-semibold text-ink-900 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          'Claim My Free Trial'
        )}
      </button>
      <p className="mt-3 text-center text-[0.7rem] text-bone-dim">
        No card required · Concierge callback within 1 hour
      </p>
    </form>
  );
}
