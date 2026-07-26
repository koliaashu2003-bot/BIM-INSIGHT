'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: POST to CRM / ESP (Mailchimp, Klaviyo, HubSpot) via /api/newsletter.
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-gold">
        <Check className="h-4 w-4" /> You’re on the list. Welcome to AURUM.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      {!compact && (
        <label htmlFor="nl-email" className="mb-2 block text-sm text-bone-muted">
          Join the inner circle
        </label>
      )}
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pl-4 focus-within:border-gold/50">
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full bg-transparent text-sm text-bone outline-none placeholder:text-bone-dim"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-gold-light to-gold text-ink-900 transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
