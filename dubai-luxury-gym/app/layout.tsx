import type { Metadata, Viewport } from 'next';
import { Inter, Sora, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { LanguageProvider } from '@/lib/i18n';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import FitnessAssistant from '@/components/ai/FitnessAssistant';
import MouseGlow from '@/components/ui/MouseGlow';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const arabic = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'luxury gym Dubai',
    'private fitness club Dubai',
    'personal training Dubai',
    'premium gym DIFC',
    'elite fitness Dubai',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url, languages: { 'en-AE': site.url, 'ar-AE': `${site.url}/ar` } },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
};

/** JSON-LD: HealthClub + LocalBusiness for rich results. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['HealthClub', 'LocalBusiness'],
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: 'AED 899 – 4900 / month',
  openingHours: 'Mo-Su 05:00-24:00',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: 'AE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${sora.variable} ${arabic.variable}`}>
      <body className="noise antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink-900"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <SmoothScroll>
            <MouseGlow />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <FitnessAssistant />
            <MobileBookingBar />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
