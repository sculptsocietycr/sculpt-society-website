import { motion } from 'framer-motion';
import { gallery } from '../data/content';

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
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative aspect-square overflow-hidden rounded-2xl ${
                i % 3 === 0 ? 'bg-pink/40' : i % 3 === 1 ? 'bg-gold/30' : 'bg-wine/15'
              }`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-center">
                  <span className="text-2xl text-wine/60">✦</span>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-wine/60 md:text-xs">
                    Próximamente
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
