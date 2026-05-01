import { motion } from 'framer-motion';
import { futureEvents, brand } from '../data/content';

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
              <div className="aspect-video overflow-hidden bg-pink/30">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
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
