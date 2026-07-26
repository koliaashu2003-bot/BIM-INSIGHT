'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ar';

/** Minimal translation dictionary. Extend per section as content grows. */
const dict = {
  en: {
    'nav.book': 'Book Free Trial',
    'nav.join': 'Become a Member',
    'hero.eyebrow': 'Dubai · Members Only',
    'hero.title1': 'Train Like',
    'hero.title2': 'The One Percent',
    'hero.sub':
      "A private performance club engineered for Dubai's founders, athletes, and high performers. Elite coaching. Cinematic space. Zero compromise.",
    'hero.cta': 'Book a Free Trial',
    'hero.secondary': 'Take the Virtual Tour',
    'cta.title': 'Your first session is on us.',
    'cta.sub':
      'Book a complimentary trial and experience the floor, the coaching, and the recovery suite for yourself.',
    'lang.toggle': 'العربية',
  },
  ar: {
    'nav.book': 'احجز تجربة مجانية',
    'nav.join': 'كن عضواً',
    'hero.eyebrow': 'دبي · للأعضاء فقط',
    'hero.title1': 'تدرّب مثل',
    'hero.title2': 'الواحد بالمئة',
    'hero.sub':
      'نادٍ خاص للأداء الرياضي مصمّم لروّاد الأعمال والرياضيين وأصحاب الأداء العالي في دبي. تدريب نخبوي. مساحة سينمائية. بلا تنازلات.',
    'hero.cta': 'احجز تجربة مجانية',
    'hero.secondary': 'جولة افتراضية',
    'cta.title': 'جلستك الأولى على حسابنا.',
    'cta.sub': 'احجز تجربة مجانية واختبر الصالة والتدريب وجناح الاستشفاء بنفسك.',
    'lang.toggle': 'English',
  },
} as const;

type Key = keyof (typeof dict)['en'];

const LangContext = createContext<{
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: (k: Key) => string;
  toggle: () => void;
}>({ lang: 'en', dir: 'ltr', t: (k) => k, toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = (localStorage.getItem('aurum-lang') as Lang) || 'en';
    setLang(saved);
  }, []);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('aurum-lang', lang);
  }, [lang]);

  const value = {
    lang,
    dir: (lang === 'ar' ? 'rtl' : 'ltr') as 'ltr' | 'rtl',
    t: (k: Key) => dict[lang][k] ?? dict.en[k] ?? k,
    toggle: () => setLang((l) => (l === 'en' ? 'ar' : 'en')),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
