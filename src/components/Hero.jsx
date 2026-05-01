import { motion } from 'framer-motion';
import { hero } from '../data/content';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cream pt-28 md:pt-36"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />

      <div className="container-site relative px-6 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6"
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

          {/* Composición editorial — typography + shapes, sin foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6"
          >
            <div className="relative mx-auto aspect-[4/5] max-w-md md:max-w-none">
              {/* fondo principal */}
              <div className="absolute inset-0 rounded-[2rem] bg-wine"></div>

              {/* arch SVG decorativo */}
              <svg
                className="absolute left-1/2 top-10 -translate-x-1/2 text-pink/30"
                width="80%" height="60%" viewBox="0 0 200 240" fill="none" preserveAspectRatio="xMidYMin meet"
                aria-hidden="true"
              >
                <path d="M10 240 Q10 10 100 10 Q190 10 190 240" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>

              {/* sparkles sutiles */}
              <span className="absolute left-10 top-16 text-2xl text-gold/80">✦</span>
              <span className="absolute bottom-24 right-12 text-xl text-gold/60">✦</span>
              <span className="absolute left-1/3 top-1/2 text-base text-gold/40">✦</span>

              {/* manifesto text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
                  Una mañana ✦
                </p>
                <div className="mt-6 space-y-2">
                  {hero.manifestoWords.map((word, i) => (
                    <div
                      key={word}
                      className={`display text-5xl md:text-6xl ${
                        i % 2 === 1 ? 'italic text-pink' : 'text-cream'
                      }`}
                    >
                      {word}
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-px w-12 bg-gold/60" />
                <p className="mt-6 text-xs italic tracking-wide text-cream/70">
                  Movernos · conectar · brillar
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
