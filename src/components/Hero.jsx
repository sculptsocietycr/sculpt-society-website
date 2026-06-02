import { motion } from 'framer-motion';
import { hero, nextEvent } from '../data/content';
import Butterfly from './Butterfly.jsx';
import { useEventStatus } from '../data/eventStatus.jsx';

const Sticker = ({ children, className = '', rot = 0, delay = 0 }) => (
  <span
    style={{ '--rot': `${rot}deg`, animationDelay: `${delay}s` }}
    className={`floaty pointer-events-none absolute select-none ${className}`}
  >
    {children}
  </span>
);

export default function Hero() {
  const { soldOut } = useEventStatus();
  return (
    <section
      id="evento"
      className="relative overflow-hidden bg-gradient-y2k pt-28 md:pt-32"
    >
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-bubblegum/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-violet/30 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-60 w-60 rounded-full bg-denim/20 blur-3xl" />

      {/* Stickers + mariposas brand volando */}
      <Sticker className="left-6 top-32 text-3xl text-wine md:left-16 md:text-4xl" rot={-12}>✦</Sticker>
      <Sticker className="left-10 bottom-24 text-3xl text-orange md:left-24 md:text-4xl" rot={20} delay={0.6}>♡</Sticker>
      <Sticker className="right-12 bottom-32 text-3xl text-bubblegum md:right-32 md:text-4xl" rot={-8} delay={2}>✧</Sticker>

      {/* Butterfly field — brand colors, distintos tamaños, distintos drifts */}
      <Butterfly color="#E7552C" size={46} className="right-6 top-28 md:right-20 md:top-32"
                 rotate={12} driftX={-40} driftY={-160} spin={-20} flapMs={520} delay={0} />
      <Butterfly color="#F4BABB" size={32} className="left-1/4 top-24"
                 rotate={-15} driftX={60} driftY={-220} spin={25} flapMs={580} delay={0.1} />
      <Butterfly color="#811D16" size={28} className="right-1/3 top-44 hidden md:block"
                 rotate={5} driftX={-30} driftY={-200} spin={-15} flapMs={640} delay={0.25} flip />
      <Butterfly color="#D6C774" size={36} className="left-8 top-1/2 hidden sm:block"
                 rotate={-8} driftX={80} driftY={-260} spin={20} flapMs={560} delay={0.35} />
      <Butterfly color="#ED8889" size={26} className="right-10 bottom-40 md:right-24"
                 rotate={18} driftX={-50} driftY={-140} spin={-25} flapMs={500} delay={0.15} flip />
      <Butterfly color="#E7552C" size={22} className="left-1/2 bottom-16 hidden md:block"
                 rotate={0} driftX={40} driftY={-180} spin={30} flapMs={620} delay={0.45} />

      <div className="container-site relative px-6 py-12 md:px-10 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-violet"
          >
            {hero.eyebrow}
          </motion.p>

          {/* Edition badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 inline-flex items-center gap-3"
          >
            <span className="chip-hannah">Hannah</span>
            <span className="font-display text-xl italic text-ink/80">vs</span>
            <span className="chip-miley">Miley</span>
          </motion.div>

          {/* Big title — split Hannah / Miley */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 display text-5xl text-charcoal md:text-7xl lg:text-[5.5rem]"
          >
            <span className="block">{hero.titleLines[0]}</span>
            <span className="mt-1 block italic bg-gradient-miley bg-clip-text text-transparent">
              {hero.titleLines[1]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/85 md:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href="#inscripcion"
              className="btn-primary w-full sm:w-auto"
              aria-label={soldOut ? 'Cupos agotados — ver lista de espera' : hero.ctaPrimary.label}
            >
              {soldOut ? '✦ Sold out — lista de espera' : `✦ ${hero.ctaPrimary.label}`}
            </a>
            <a href={hero.ctaSecondary.href} className="btn-secondary w-full sm:w-auto">
              {hero.ctaSecondary.label}
            </a>
          </motion.div>

          {/* Info card — fecha / hora / lugar / precio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="glow-card relative grid grid-cols-2 gap-y-5 md:grid-cols-4 md:gap-y-0">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-violet shadow-sm">
                ✦ Save the date ✦
              </span>
              <Info label="Fecha" value={hero.date} />
              <Info label="Hora" value={hero.time} />
              <Info label="Lugar" value={hero.location} />
              <Info label="Inversión" value={hero.price} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee tipo concierto */}
      <div className="relative overflow-hidden border-y border-violet/20 bg-white/40 py-3 backdrop-blur">
        <div className="flex animate-[shine_30s_linear_infinite] whitespace-nowrap">
          {[...hero.marquee, ...hero.marquee, ...hero.marquee].map((word, i) => (
            <span
              key={i}
              className="mx-6 font-display text-lg italic text-violet md:text-xl"
            >
              {word} <span className="ml-6 text-bubblegum">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="px-2 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet/90">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-ink md:text-base">{value}</p>
    </div>
  );
}
