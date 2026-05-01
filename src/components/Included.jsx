import { motion } from 'framer-motion';
import { nextEvent } from '../data/content';

export default function Included() {
  return (
    <section className="bg-cream pb-20 md:pb-28">
      <div className="container-site px-6 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Qué incluye</p>
          <h2 className="display text-3xl text-charcoal md:text-4xl">
            Tu cupo incluye una mañana completa.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {nextEvent.includes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-pink/30"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-pink/40 text-sm font-medium text-wine">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
