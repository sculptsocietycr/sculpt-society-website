import { motion } from 'framer-motion';
import { founders } from '../data/content';

export default function Founders() {
  return (
    <section className="bg-pink/30 section-pad">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">{founders.eyebrow}</p>
          <h2 className="display text-4xl text-wine md:text-5xl">{founders.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal/75 md:text-lg">
            {founders.description}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {founders.list.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <div className="flex h-56 w-56 items-center justify-center rounded-full border border-gold/40 bg-cream shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-sans text-7xl font-light text-wine">
                      {f.initial}
                    </span>
                  )}
                </div>
                <span className="absolute -right-2 -top-2 text-xl text-gold">✦</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-charcoal">{f.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-charcoal/50">
                Co-fundadora
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
