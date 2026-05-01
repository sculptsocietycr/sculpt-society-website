import { motion } from 'framer-motion';
import { nextEvent } from '../data/content';

const InfoRow = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-cream/15 py-4">
    <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/60">{label}</span>
    <span className="text-right text-base font-medium text-cream md:text-lg">{value}</span>
  </div>
);

export default function NextEvent() {
  return (
    <section id="proximo-evento" className="bg-cream section-pad">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2.5rem] bg-wine p-8 md:p-14 lg:p-20"
        >
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4 text-gold">{nextEvent.eyebrow}</p>
              <h2 className="display text-4xl text-cream md:text-5xl lg:text-6xl">
                {nextEvent.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
                {nextEvent.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={nextEvent.ctaPrimary.href} className="btn-wine">
                  {nextEvent.ctaPrimary.label}
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                  {nextEvent.spots}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* Image placeholder */}
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl bg-pink/20">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl text-gold">✦</span>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-cream/70">
                    {nextEvent.imagePlaceholderText}
                  </p>
                </div>
              </div>

              <div>
                <InfoRow label="Fecha" value={nextEvent.date} />
                <InfoRow label="Hora" value={nextEvent.time} />
                <InfoRow label="Lugar" value={nextEvent.location} />
                <InfoRow label="Inversión" value={nextEvent.price} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
