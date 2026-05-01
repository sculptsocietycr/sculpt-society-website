import { motion } from 'framer-motion';
import { futureEvents, brand } from '../data/content';

const TONE_BG = {
  pink: 'bg-pink/60',
  gold: 'bg-gold/40',
  wine: 'bg-wine',
};
const TONE_TEXT = {
  pink: 'text-wine',
  gold: 'text-wine',
  wine: 'text-cream',
};

export default function Events() {
  return (
    <section id="eventos" className="bg-cream section-pad">
      <div className="container-site">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">{futureEvents.eyebrow}</p>
            <h2 className="display text-4xl text-wine md:text-5xl">{futureEvents.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              {futureEvents.description}
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Seguinos en Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {futureEvents.list.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-wine/30 hover:shadow-lg"
            >
              {/* Top gráfico — color block + símbolo */}
              <div className={`relative flex aspect-video items-center justify-center ${TONE_BG[e.tone]}`}>
                <span className={`text-7xl ${TONE_TEXT[e.tone]} transition-transform duration-500 group-hover:scale-110`}>
                  {e.symbol}
                </span>
                <span className={`absolute right-4 top-4 text-base ${e.tone === 'wine' ? 'text-gold' : 'text-gold'}`}>✦</span>
                <span className={`absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.25em] ${e.tone === 'wine' ? 'text-cream/60' : 'text-wine/50'}`}>
                  Sculpt Society
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-semibold text-charcoal">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{e.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
