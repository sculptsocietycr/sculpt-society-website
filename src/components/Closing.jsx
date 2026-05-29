import { motion } from 'framer-motion';
import { closing } from '../data/content';
import Butterfly from './Butterfly.jsx';

export default function Closing() {
  return (
    <section className="relative overflow-hidden bg-wine text-cream">
      {/* Y2K background glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-bubblegum/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet/40 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-denim/20 blur-3xl" />

      {/* Stickers */}
      <span className="pointer-events-none absolute left-8 top-12 text-3xl floaty text-pink md:left-20 md:text-5xl">✦</span>
      <span className="pointer-events-none absolute left-12 bottom-16 text-4xl text-pink floaty md:left-32" style={{ animationDelay: '2s' }}>♡</span>
      <span className="pointer-events-none absolute right-8 bottom-10 text-3xl text-gold floaty md:right-28 md:text-4xl" style={{ animationDelay: '0.5s' }}>✧</span>

      {/* Mariposas brand volando (drifts positivos en Y para que “vuelen hacia abajo” cuando llegan al cierre) */}
      <Butterfly color="#F4BABB" size={48} className="right-6 top-14 md:right-24 md:top-16"
                 rotate={12} driftX={-50} driftY={-120} spin={-20} flapMs={520} />
      <Butterfly color="#D6C774" size={32} className="left-6 top-1/3 md:left-24"
                 rotate={-10} driftX={70} driftY={-160} spin={25} flapMs={580} delay={0.15} flip />
      <Butterfly color="#ED8889" size={28} className="right-1/4 bottom-20 hidden md:block"
                 rotate={5} driftX={-40} driftY={-140} spin={-15} flapMs={620} delay={0.3} />
      <Butterfly color="#E7552C" size={26} className="left-1/3 bottom-12 hidden md:block"
                 rotate={-15} driftX={60} driftY={-180} spin={20} flapMs={560} delay={0.45} flip />

      <div className="container-site relative px-6 py-24 text-center md:px-10 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold"
        >
          ✦ {closing.eyebrow} ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 display text-5xl text-cream md:text-7xl lg:text-[6rem]"
        >
          <span className="block">{closing.bigText}</span>
          <span className="mt-1 block italic text-pink">
            {closing.bigTextItalic}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-7 max-w-xl text-lg text-white/90 md:text-xl"
        >
          {closing.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a href={closing.cta.href} className="btn-light text-base px-9 py-4">
            ✦ {closing.cta.label}
          </a>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/85">
            {closing.micro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
