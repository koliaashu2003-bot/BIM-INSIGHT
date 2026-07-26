'use client';

import { useState } from 'react';
import { Clock, User, Check } from 'lucide-react';
import { classes, schedule, scheduleDays, type Session } from '@/lib/data';
import { cn } from '@/lib/utils';

const classMap = Object.fromEntries(classes.map((c) => [c.id, c]));

export default function ScheduleGrid() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
  const [day, setDay] = useState(todayIdx);
  const [booked, setBooked] = useState<Set<string>>(new Set());

  const sessions = schedule[day] ?? [];

  const toggle = (s: Session) => {
    const key = `${day}-${s.time}-${s.classId}`;
    setBooked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="container-luxe">
      {/* Day selector */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {scheduleDays.map((d, i) => (
          <button
            key={d}
            onClick={() => setDay(i)}
            className={cn(
              'shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300',
              i === day
                ? 'bg-gold text-ink-900'
                : 'border border-white/10 text-bone-muted hover:text-bone',
            )}
          >
            {d.slice(0, 3)}
            {i === todayIdx && <span className="ml-1.5 text-[0.6rem] opacity-70">Today</span>}
          </button>
        ))}
      </div>

      {/* Sessions */}
      <div className="space-y-3">
        {sessions.map((s) => {
          const c = classMap[s.classId];
          const key = `${day}-${s.time}-${s.classId}`;
          const isBooked = booked.has(key);
          const low = s.spots <= 3;
          return (
            <div
              key={key}
              className="glass grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl p-4 md:gap-6 md:p-5"
            >
              <div className="flex items-center gap-2 text-bone">
                <Clock className="hidden h-4 w-4 text-gold sm:block" />
                <span className="font-display text-lg font-semibold tabular-nums">{s.time}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-bone">{c?.name}</p>
                <p className="flex items-center gap-3 text-xs text-bone-dim">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {s.coach}
                  </span>
                  <span>{c?.duration} min</span>
                  <span className={low ? 'text-gold' : ''}>
                    {s.spots} {low ? 'spots left' : 'spots'}
                  </span>
                </p>
              </div>
              <button
                onClick={() => toggle(s)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                  isBooked
                    ? 'bg-gold/15 text-gold'
                    : 'bg-gradient-to-b from-gold-light to-gold text-ink-900 hover:scale-[1.03]',
                )}
              >
                {isBooked ? (
                  <>
                    <Check className="h-4 w-4" /> Booked
                  </>
                ) : (
                  'Reserve'
                )}
              </button>
            </div>
          );
        })}
      </div>

      {booked.size > 0 && (
        <div className="glass mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl p-5 sm:flex-row">
          <p className="text-sm text-bone">
            <span className="font-semibold text-gold">{booked.size}</span> session
            {booked.size > 1 ? 's' : ''} reserved this week.
          </p>
          <a
            href="/contact"
            className="rounded-full bg-gradient-to-b from-gold-light to-gold px-6 py-2.5 text-sm font-semibold text-ink-900"
          >
            Confirm with concierge
          </a>
        </div>
      )}
    </div>
  );
}
