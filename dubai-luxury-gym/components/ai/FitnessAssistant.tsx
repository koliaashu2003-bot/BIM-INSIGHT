'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

type Msg = { role: 'user' | 'ai'; text: string };

const SUGGESTIONS = [
  'Which membership is right for me?',
  'How much is personal training?',
  'Do you have a free trial?',
  'What classes do beginners start with?',
];

/**
 * AURA — AI concierge. Ships with a lightweight rule-based responder so the UX
 * is fully functional offline. To make it a real LLM assistant, replace
 * `respond()` with a call to /api/assistant that proxies the Claude Messages API
 * (keep the key server-side).
 */
function respond(q: string): string {
  const s = q.toLowerCase();
  if (/(price|cost|how much|fee|aed|dirham)/.test(s))
    return 'Memberships start at AED 899/month (Signature), AED 1,899 (Elite, includes 4 PT sessions), and AED 4,900 (Private Reserve). Your first trial session is complimentary — shall I book it?';
  if (/(trial|free|try)/.test(s))
    return 'Yes — every prospective member gets one complimentary trial: full floor access, a class, and the recovery suite. Head to Contact or tap “Book Free Trial” and our concierge calls you within the hour.';
  if (/(personal|pt|trainer|coach)/.test(s))
    return 'Personal training is included in Elite (4/mo) and Private Reserve (12/mo), or booked à la carte from AED 350/session. Our coaches specialise in strength, conditioning, physique, and mobility — see the Trainers page.';
  if (/(beginner|start|new|first)/.test(s))
    return 'Great starting points are Still Point (mobility & breathwork) and Gold Cycle. Your trial includes a movement assessment so a coach can place you correctly. No experience needed.';
  if (/(class|session|schedule|book)/.test(s))
    return 'We run strength, HIIT, cycle, combat, Hyrox and recovery classes daily from 05:00. Check the Schedule page for the live weekly grid and reserve a spot.';
  if (/(location|where|address|dubai|map)/.test(s))
    return 'We’re in DIFC, Gate Avenue (Podium Level), open daily 05:00–24:00 with valet parking. The Contact page has directions and a live map.';
  return 'Happy to help — I can advise on memberships, personal training, classes, or booking a free trial. What matters most to you right now?';
}

export default function FitnessAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'ai', text: 'Hi, I’m AURA — your AI training concierge. How can I help you today?' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => setMsgs((m) => [...m, { role: 'ai', text: respond(q) }]), 500);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-40 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-gold-light to-gold text-ink-900 shadow-[0_10px_40px_-8px_rgba(212,175,55,0.6)] transition-transform hover:scale-105 md:bottom-24"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-56 right-5 z-40 flex h-[26rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl glass md:bottom-40">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-bone">AURA</p>
              <p className="text-[0.65rem] text-bone-dim">AI Training Concierge</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'ai'
                    ? 'bg-white/5 text-bone'
                    : 'ml-auto bg-gold text-ink-900'
                }`}
              >
                {m.text}
              </div>
            ))}
            {msgs.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-bone-muted transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about training…"
              className="w-full bg-transparent px-2 text-sm text-bone outline-none placeholder:text-bone-dim"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-ink-900"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
