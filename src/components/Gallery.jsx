import { motion } from 'framer-motion';
import { gallery } from '../data/content';

const TONE_STYLES = {
  pink: 'bg-pink/60 text-wine',
  gold: 'bg-gold/40 text-wine',
  wine: 'bg-wine text-cream',
  cream: 'bg-cream text-wine border border-charcoal/10',
};

export default function Gallery() {
  return (
    <section className="bg-cream pb-20 md:pb-28">
      <div className="container-site px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">{gallery.eyebrow}</p>
          <h2 className="display text-4xl text-wine md:text-5xl">{gallery.title}</h2>
          <p className="mt-4 text-sm italic text-charcoal/60">{gallery.note}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {gallery.items.map((item, i) => (
            <motion.div
              key={item.word + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative aspect-square overflow-hidden rounded-2xl ${TONE_STYLES[item.tone]} flex items-center justify-center p-6 transition-transform duration-500 hover:-translate-y-1`}
            >
              <span className={`absolute right-4 top-4 text-xl ${item.tone === 'wine' ? 'text-gold' : 'text-gold'}`}>
                {item.symbol}
              </span>
              <span className={`absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.25em] ${item.tone === 'wine' ? 'text-cream/60' : 'text-wine/50'}`}>
                ✦ vibe
              </span>
              <span className="display text-3xl italic md:text-5xl">
                {item.word}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
