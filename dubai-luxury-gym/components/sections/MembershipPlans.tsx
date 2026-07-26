'use client';

import { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { plans } from '@/lib/data';
import { cn } from '@/lib/utils';
import PlanCard from '@/components/cards/PlanCard';
import Reveal from '@/components/ui/Reveal';

const matrix: { feature: string; values: (boolean | string)[] }[] = [
  { feature: 'Members-floor access', values: [true, true, true] },
  { feature: 'Signature group classes', values: ['All', 'All', 'All'] },
  { feature: 'Recovery suite', values: [true, true, true] },
  { feature: 'Personal training / month', values: ['—', '4', '12'] },
  { feature: 'Nutrition & macro plan', values: [false, true, true] },
  { feature: 'Priority booking window', values: ['48h', '7 days', 'Unlimited'] },
  { feature: 'InBody scans', values: ['Monthly', 'Monthly', 'Weekly'] },
  { feature: 'Bloodwork & diagnostics', values: [false, false, true] },
  { feature: 'Physio & massage', values: [false, 'Add-on', 'On demand'] },
  { feature: 'Guest passes / month', values: ['—', '2', 'Unlimited'] },
  { feature: 'Private floor hours', values: [false, false, true] },
  { feature: 'Valet parking', values: [true, true, true] },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-gold" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-white/20" />;
  return <span className="text-sm text-bone">{v}</span>;
}

export default function MembershipPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="container-luxe">
      {/* Billing toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span className={cn('text-sm', !annual ? 'text-bone' : 'text-bone-dim')}>Monthly</span>
        <button
          onClick={() => setAnnual((a) => !a)}
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          className="relative h-8 w-14 rounded-full border border-white/10 bg-white/5 transition-colors"
        >
          <span
            className={cn(
              'absolute top-1 h-6 w-6 rounded-full bg-gradient-to-b from-gold-light to-gold transition-transform duration-300 ease-expo',
              annual ? 'translate-x-7' : 'translate-x-1',
            )}
          />
        </button>
        <span className={cn('text-sm', annual ? 'text-bone' : 'text-bone-dim')}>
          Annual <span className="text-gold">· save 2 months</span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} annual={annual} />
        ))}
      </div>

      {/* Comparison table */}
      <Reveal className="mt-24">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold md:text-4xl">
          Compare every detail
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="w-2/5 py-4 text-left text-sm font-medium text-bone-muted">
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    className={cn(
                      'py-4 text-center font-display text-lg font-semibold',
                      p.featured ? 'text-gold' : 'text-bone',
                    )}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.feature} className="border-t border-white/5">
                  <td className="py-4 text-sm text-bone-muted">{row.feature}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="py-4 text-center">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Payment methods */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <p className="text-xs uppercase tracking-luxe text-bone-dim">Secure payment</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Stripe'].map((m) => (
            <span
              key={m}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-bone-muted"
            >
              {m}
            </span>
          ))}
        </div>
        <p className="max-w-md text-center text-[0.7rem] text-bone-dim">
          Checkout integrates with Stripe (Apple Pay & Google Pay via Payment Request API).
          Connect your Stripe keys to enable live billing.
        </p>
      </div>
    </div>
  );
}
