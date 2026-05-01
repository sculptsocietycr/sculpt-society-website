import { motion } from 'framer-motion';
import { bedazzlingBar } from '../data/content';

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
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream">
              <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center">
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-2xl text-gold"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      ✦
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-charcoal/60">
                  Sparkle moment
                </p>
              </div>
            </div>
            <span className="absolute -bottom-3 -right-3 hidden h-20 w-20 rounded-full bg-gold/80 lg:block" />
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
