import { motion } from 'framer-motion';
import { community } from '../data/content';

export default function Community() {
  return (
    <section id="comunidad" className="relative overflow-hidden bg-wine section-pad text-cream">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-orange/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-pink/20 blur-3xl" />

      {/* sparkles decorativos de fondo */}
      <span className="pointer-events-none absolute right-16 top-24 text-3xl text-gold/40">✦</span>
      <span className="pointer-events-none absolute bottom-24 left-12 text-2xl text-gold/30">✦</span>

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-4 text-gold">{community.eyebrow}</p>
            <h2 className="display text-4xl text-cream md:text-5xl">{community.title}</h2>
            <p className="mt-6 max-w-md text-cream/80">Sculpt Society es para vos si querés:</p>
            <a href={community.cta.href} className="btn-wine mt-8">{community.cta.label}</a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-1 lg:col-span-7"
          >
            {community.bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-baseline gap-5 border-b border-cream/15 py-5 text-xl text-cream/95 md:text-2xl"
              >
                <span className="font-light text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
