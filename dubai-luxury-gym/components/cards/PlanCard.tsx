'use client';

import { Check } from 'lucide-react';
import type { Plan } from '@/lib/data';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

export default function PlanCard({
  plan,
  annual,
}: {
  plan: Plan;
  annual: boolean;
}) {
  const price = annual ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly;
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-4xl border p-7 md:p-8',
        plan.featured
          ? 'border-gold/40 bg-gradient-to-b from-gold/[0.08] to-transparent shadow-[0_40px_120px_-40px_rgba(212,175,55,0.4)]'
          : 'border-white/10 glass',
      )}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-light to-gold px-4 py-1 text-xs font-semibold text-ink-900">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-2xl font-semibold text-bone">{plan.name}</h3>
      <p className="mt-2 min-h-[2.5rem] text-sm text-bone-muted">{plan.blurb}</p>
      <div className="mt-5 flex items-end gap-1.5">
        <span className="text-sm text-bone-dim">AED</span>
        <span className="font-display text-5xl font-semibold text-gilded">
          {price.toLocaleString()}
        </span>
        <span className="mb-1.5 text-sm text-bone-dim">/mo</span>
      </div>
      {annual && (
        <p className="mt-1 text-xs text-gold">Billed annually · save 2 months</p>
      )}

      <ul className="mt-7 space-y-3">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3 text-sm text-bone-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <MagneticButton
          href="/contact"
          variant={plan.featured ? 'gold' : 'ghost'}
          className="w-full"
        >
          Choose {plan.name}
        </MagneticButton>
      </div>
    </div>
  );
}
