import { motion } from 'framer-motion';
import { about, images } from '../data/content';

export default function About() {
  return (
    <section id="sobre" className="bg-cream section-pad">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              {/* foto espejada vía CSS scaleX(-1) */}
              <img
                src={images.about}
                alt="Sculpt Society — wellness y comunidad"
                className="h-full w-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              {/* sparkle decorativo */}
              <span className="absolute right-6 top-6 text-3xl text-gold">✦</span>
            </div>
            {/* círculo dorado decorativo */}
            <div className="relative">
              <div className="absolute -top-6 right-6 h-16 w-16 rounded-full bg-gold/70" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-4">{about.eyebrow}</p>
            <h2 className="display text-4xl text-wine md:text-5xl">{about.title}</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/80 md:text-lg">
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-3 border-t border-gold/60 pt-6">
              <span className="text-2xl text-gold">✦</span>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal/60">
                Hecho con cariño desde Costa Rica
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
