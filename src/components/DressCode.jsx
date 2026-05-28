import { motion } from 'framer-motion';
import { dressCode } from '../data/content';
import Butterfly from './Butterfly.jsx';

export default function DressCode() {
  const [hannah, miley] = dressCode.cards;

  return (
    <section
      id="dresscode"
      className="relative overflow-hidden bg-gradient-y2k section-pad"
    >
      {/* Decorative stickers + mariposas */}
      <span className="pointer-events-none absolute left-10 bottom-16 text-4xl floaty" style={{ animationDelay: '1s' }}>💋</span>
      <span className="pointer-events-none absolute right-10 bottom-10 text-3xl text-wine floaty" style={{ animationDelay: '2s' }}>✦</span>
      <span className="pointer-events-none absolute left-8 top-20 text-3xl text-orange floaty" style={{ animationDelay: '0.5s' }}>♡</span>

      <Butterfly color="#E7552C" size={40} className="right-6 top-10 md:right-16 md:top-14"
                 rotate={15} driftX={-60} driftY={-100} spin={-20} flapMs={540} />
      <Butterfly color="#D6C774" size={30} className="left-6 top-12 md:left-20"
                 rotate={-10} driftX={50} driftY={-120} spin={20} flapMs={600} delay={0.2} flip />
      <Butterfly color="#F4BABB" size={36} className="right-1/4 bottom-12 hidden md:block"
                 rotate={5} driftX={-40} driftY={-80} spin={-15} flapMs={580} delay={0.4} />

      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{dressCode.eyebrow}</p>
          <h2 className="mt-4 display text-4xl text-ink md:text-5xl lg:text-6xl">
            {dressCode.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/75 md:text-lg">
            {dressCode.intro}
          </p>
        </div>

        {/* Pills marquee */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {dressCode.pills.map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-medium text-violet backdrop-blur"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Two style cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <StyleCard card={hannah} variant="hannah" delay={0} />
          <StyleCard card={miley} variant="miley" delay={0.1} />
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm italic leading-relaxed text-ink/70">
          {dressCode.note}
        </p>
      </div>
    </section>
  );
}

function StyleCard({ card, variant, delay }) {
  const isHannah = variant === 'hannah';
  const ribbonBg = isHannah ? 'bg-gradient-hannah' : 'bg-gradient-miley';
  const dot = isHannah ? 'bg-bubblegum' : 'bg-violet';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className="group relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-lg md:p-9"
    >
      {/* Ribbon header */}
      <div className={`absolute inset-x-0 top-0 h-2 ${ribbonBg}`} />
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet/70">
        {isHannah ? 'Hannah · sweet girl' : 'Miley · bold girl'}
      </p>
      <h3 className="mt-2 display text-3xl text-ink md:text-4xl">
        {card.title}
      </h3>

      <ul className="mt-6 space-y-3">
        {card.list.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {isHannah ? (
        <Butterfly
          color="#F4BABB"
          size={32}
          className="bottom-4 right-5"
          rotate={-12}
          driftX={20}
          driftY={-40}
          spin={20}
          flapMs={620}
          delay={0.2}
        />
      ) : (
        <span className="pointer-events-none absolute bottom-4 right-5 text-3xl text-wine/40">★</span>
      )}
    </motion.div>
  );
}
