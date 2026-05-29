import { motion } from 'framer-motion';
import { concept } from '../data/content';
import Butterfly from './Butterfly.jsx';

export default function Concept() {
  const [hannah, miley] = concept.sides;

  return (
    <section id="concepto" className="relative overflow-hidden bg-offwhite section-pad">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-candy/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-lilac/40 blur-3xl" />

      <div className="container-site relative">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{concept.eyebrow}</p>
          <h2 className="mt-4 display text-4xl text-ink md:text-5xl lg:text-6xl">
            {concept.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
            {concept.intro}
          </p>
        </div>

        {/* Split Hannah / VS / Miley */}
        <div className="relative mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <SideCard side={hannah} variant="hannah" delay={0} />

          {/* VS divider */}
          <div className="relative flex items-center justify-center py-4 md:py-0">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-bubblegum/30"
            >
              <span className="font-display text-3xl font-bold italic text-violet">
                {concept.vs}
              </span>
              <span className="absolute -right-2 -top-2 text-xl">✦</span>
              <span className="absolute -bottom-1 -left-2 text-xl">✧</span>
            </motion.div>
          </div>

          <SideCard side={miley} variant="miley" delay={0.15} />
        </div>

        {/* Closing line */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-base italic leading-relaxed text-ink/85 md:text-lg">
          {concept.closing}
        </p>
      </div>
    </section>
  );
}

function SideCard({ side, variant, delay }) {
  const isHannah = variant === 'hannah';
  const bg = isHannah ? 'bg-gradient-hannah' : 'bg-gradient-miley';
  const accent = isHannah ? 'bg-white/85' : 'bg-white/85';
  const numberLabel = isHannah ? 'A·side' : 'B·side';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={`group relative overflow-hidden rounded-[2rem] ${bg} p-1 shadow-xl`}
    >
      {/* Inner card */}
      <div className={`relative rounded-[1.7rem] ${accent} p-7 md:p-9`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet/90">
            {numberLabel}
          </span>
          <span className="text-2xl text-violet/80">{isHannah ? '♡' : '★'}</span>
        </div>

        <h3 className="mt-4 display text-5xl text-ink md:text-6xl">
          {side.name}
        </h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-violet">
          {side.tagline}
        </p>

        <p className="mt-5 text-base leading-relaxed text-ink/85">
          {side.vibe}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {side.words.map((w) => (
            <li
              key={w}
              className={`rounded-full px-3.5 py-1 text-xs font-medium ${
                isHannah
                  ? 'bg-bubblegum/15 text-bubblegum'
                  : 'bg-violet/10 text-violet'
              }`}
            >
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Floating decorative element */}
      {isHannah ? (
        <Butterfly
          color="#ED8889"
          size={36}
          className="-right-3 -top-3"
          rotate={15}
          driftX={-25}
          driftY={-60}
          spin={-15}
          flapMs={560}
        />
      ) : (
        <span className="pointer-events-none absolute -right-3 -top-3 text-3xl text-gold">✦</span>
      )}
    </motion.div>
  );
}
