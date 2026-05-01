import { motion } from 'framer-motion';
import { hero, images } from '../data/content';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cream pt-28 md:pt-36"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />

      <div className="container-site relative px-6 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <p className="eyebrow mb-5">{hero.eyebrow}</p>
            <h1 className="display text-5xl text-charcoal md:text-6xl lg:text-7xl">
              {hero.title.split('brillar').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="italic text-orange">brillar</span>}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a href={hero.ctaPrimary.href} className="btn-primary">{hero.ctaPrimary.label}</a>
              <a href={hero.ctaSecondary.href} className="btn-secondary">{hero.ctaSecondary.label}</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto aspect-[4/5] max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-[2rem] bg-wine"></div>
              <img
                src={images.hero}
                alt="Sculpt Society — clase de Yoga Sculpt"
                className="relative h-full w-full rounded-[2rem] object-cover shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-full bg-gold/80 md:block" />
              <div className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-full bg-pink md:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
