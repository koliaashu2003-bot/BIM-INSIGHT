import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';
import PageHero from '@/components/ui/PageHero';
import LeadForm from '@/components/forms/LeadForm';
import Calculators from '@/components/tools/Calculators';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Book a Free Trial',
  description:
    'Book your complimentary trial at AURUM Dubai. Visit us in DIFC, call our concierge, or message on WhatsApp. Open daily 05:00–24:00.',
};

const mapSrc = `https://maps.google.com/maps?q=${site.address.lat},${site.address.lng}&z=15&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Free Trial"
        title="Your first session is on us."
        subtitle="Tell us your goal and our concierge will call within one business hour to schedule your complimentary trial."
      />

      <section className="pb-20">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Contact details */}
          <div className="space-y-4">
            <div className="glass rounded-4xl p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold">Visit the club</h2>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    Icon: MapPin,
                    label: 'Location',
                    value: `${site.address.street}, ${site.address.city}`,
                  },
                  { Icon: Phone, label: 'Call', value: site.phoneDisplay, href: `tel:${site.phone}` },
                  { Icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
                  { Icon: Clock, label: 'Hours', value: site.hours },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-luxe text-bone-dim">{label}</p>
                      {href ? (
                        <a href={href} className="text-bone transition-colors hover:text-gold">
                          {value}
                        </a>
                      ) : (
                        <p className="text-bone">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              >
                <MessageCircle className="h-4 w-4" /> Message on WhatsApp
              </a>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-4xl border border-white/10">
              <iframe
                title="AURUM location map"
                src={mapSrc}
                className="h-[300px] w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Lead form */}
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="pb-24">
        <div className="container-luxe">
          <SectionHeading
            align="center"
            eyebrow="Free Tools"
            title={<>Know your <span className="text-gilded">numbers.</span></>}
            subtitle="Use our calculators to benchmark where you are — then let a coach build the plan to get where you're going."
            className="mb-12"
          />
          <Reveal className="mx-auto max-w-3xl">
            <Calculators />
          </Reveal>
        </div>
      </section>
    </>
  );
}
