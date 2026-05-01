import { motion } from 'framer-motion';
import { bedazzlingBar, images } from '../data/content';

export default function BedazzlingBar() {
  return (
    <section className="bg-pink/40 section-pad">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src={images.bedazzlingBar}
                alt="Cepillos personalizados con cristales — Bedazzling Bar"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-5 top-5 text-3xl text-cream drop-shadow-lg">✦</span>
              <span className="absolute bottom-5 left-5 text-xs font-medium uppercase tracking-[0.25em] text-cream drop-shadow">Sparkle moment</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-4">{bedazzlingBar.eyebrow}</p>
            <h2 className="display text-4xl text-wine md:text-5xl lg:text-6xl">
              <span className="italic">{bedazzlingBar.title}</span>
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-charcoal md:text-2xl">
              "{bedazzlingBar.description}"
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75">
              {bedazzlingBar.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
