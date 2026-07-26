'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

const tabBtn =
  'flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300';
const input =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-bone outline-none focus:border-gold/50';
const labelCls = 'mb-2 block text-xs text-bone-muted';

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={input}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-bone-dim">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Result({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-gold/[0.06] p-5 text-center">
      <p className="text-xs uppercase tracking-luxe text-gold">{label}</p>
      <p className="mt-2 font-display text-4xl font-semibold text-gilded">{value}</p>
      {hint && <p className="mt-1 text-xs text-bone-muted">{hint}</p>}
    </div>
  );
}

function BMI() {
  const [h, setH] = useState(178);
  const [w, setW] = useState(78);
  const bmi = useMemo(() => (w && h ? w / Math.pow(h / 100, 2) : NaN), [h, w]);
  const cat =
    bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese';
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Height" value={h} onChange={setH} suffix="cm" />
        <Field label="Weight" value={w} onChange={setW} suffix="kg" />
      </div>
      <Result
        label="Body Mass Index"
        value={Number.isFinite(bmi) ? bmi.toFixed(1) : '—'}
        hint={Number.isFinite(bmi) ? cat : 'Enter your details'}
      />
    </div>
  );
}

function BodyFat() {
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [height, setHeight] = useState(178);
  const [neck, setNeck] = useState(38);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(95);

  // U.S. Navy method
  const bf = useMemo(() => {
    if (gender === 'm') {
      const v = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      return v;
    }
    const v = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    return v;
  }, [gender, height, neck, waist, hip]);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex gap-2 rounded-full border border-white/10 p-1">
          {(['m', 'f'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={cn(tabBtn, gender === g ? 'bg-gold text-ink-900' : 'text-bone-muted')}
            >
              {g === 'm' ? 'Male' : 'Female'}
            </button>
          ))}
        </div>
        <Field label="Height" value={height} onChange={setHeight} suffix="cm" />
        <Field label="Neck" value={neck} onChange={setNeck} suffix="cm" />
        <Field label="Waist" value={waist} onChange={setWaist} suffix="cm" />
        {gender === 'f' && <Field label="Hip" value={hip} onChange={setHip} suffix="cm" />}
      </div>
      <Result
        label="Body Fat"
        value={Number.isFinite(bf) && bf > 0 ? `${bf.toFixed(1)}%` : '—'}
        hint="U.S. Navy circumference method"
      />
    </div>
  );
}

function Macros() {
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(78);
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState(0); // -1 cut, 0 maintain, +1 gain

  const data = useMemo(() => {
    // Mifflin-St Jeor
    const bmr =
      10 * weight + 6.25 * height - 5 * age + (gender === 'm' ? 5 : -161);
    let cals = bmr * activity;
    cals += goal * 400;
    const protein = Math.round(weight * 2.0);
    const fat = Math.round((cals * 0.25) / 9);
    const carbs = Math.round((cals - protein * 4 - fat * 9) / 4);
    return { cals: Math.round(cals), protein, fat, carbs };
  }, [gender, age, height, weight, activity, goal]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex gap-2 rounded-full border border-white/10 p-1">
          {(['m', 'f'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={cn(tabBtn, gender === g ? 'bg-gold text-ink-900' : 'text-bone-muted')}
            >
              {g === 'm' ? 'Male' : 'Female'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Age" value={age} onChange={setAge} />
          <Field label="Height" value={height} onChange={setHeight} suffix="cm" />
          <Field label="Weight" value={weight} onChange={setWeight} suffix="kg" />
        </div>
        <div>
          <label className={labelCls}>Activity</label>
          <select value={activity} onChange={(e) => setActivity(+e.target.value)} className={input}>
            <option value={1.2} className="bg-ink-800">Sedentary</option>
            <option value={1.375} className="bg-ink-800">Light (1-3 days)</option>
            <option value={1.55} className="bg-ink-800">Moderate (3-5 days)</option>
            <option value={1.725} className="bg-ink-800">Very active (6-7 days)</option>
            <option value={1.9} className="bg-ink-800">Athlete</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Goal</label>
          <div className="flex gap-2 rounded-full border border-white/10 p-1">
            {[
              { v: -1, l: 'Cut' },
              { v: 0, l: 'Maintain' },
              { v: 1, l: 'Gain' },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => setGoal(o.v)}
                className={cn(tabBtn, goal === o.v ? 'bg-gold text-ink-900' : 'text-bone-muted')}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Result label="Daily Calories" value={`${data.cals}`} hint="kcal / day" />
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: 'Protein', v: data.protein },
            { l: 'Carbs', v: data.carbs },
            { l: 'Fat', v: data.fat },
          ].map((m) => (
            <div key={m.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-[0.65rem] uppercase tracking-luxe text-bone-muted">{m.l}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-bone">{m.v}g</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'bmi', label: 'BMI', el: <BMI /> },
  { id: 'bodyfat', label: 'Body Fat', el: <BodyFat /> },
  { id: 'macros', label: 'Macros', el: <Macros /> },
];

export default function Calculators() {
  const [tab, setTab] = useState('bmi');
  return (
    <div className="glass rounded-4xl p-6 md:p-8">
      <div className="mx-auto mb-8 flex max-w-md gap-2 rounded-full border border-white/10 p-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(tabBtn, tab === t.id ? 'bg-gold text-ink-900' : 'text-bone-muted hover:text-bone')}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.find((t) => t.id === tab)?.el}
      <p className="mt-6 text-center text-[0.7rem] text-bone-dim">
        Estimates for guidance only — your coach will run a precise InBody scan on your trial.
      </p>
    </div>
  );
}
