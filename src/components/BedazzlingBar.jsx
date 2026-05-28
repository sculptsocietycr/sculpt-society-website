import { motion } from 'framer-motion';
import { bedazzlingBar, images } from '../data/content';

export default function BedazzlingBar() {
  return (
    <section className="relative overflow-hidden bg-candy/60 section-pad">
      <span className="pointer-events-none absolute left-10 top-10 text-4xl text-violet/40 floaty">✦</span>
      <span className="pointer-events-none absolute right-12 bottom-10 text-4xl floaty" style={{ animationDelay: '1s' }}>💎</span>

      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white">
              <img
                src={images.bedazzlingBar}
                alt="Cepillos personalizados con cristales — Bedazzling Bar"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet/20 via-transparent to-bubblegum/20" />
              <span className="absolute right-5 top-5 text-3xl text-white drop-shadow-lg">✦</span>
              <span className="absolute bottom-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-violet backdrop-blur">
                ✦ Sparkle moment
              </span>
            </div>
            {/* sticker overlay */}
            <span className="absolute -top-3 -right-3 rotate-12 rounded-full bg-gradient-y2k px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              Hannah ♡ Miley
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="eyebrow">{bedazzlingBar.eyebrow}</p>
            <h2 className="mt-4 display text-4xl text-ink md:text-5xl lg:text-6xl">
              <span className="bg-gradient-y2k bg-clip-text text-transparent italic">
                {bedazzlingBar.title}
              </span>
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-ink md:text-2xl">
              “{bedazzlingBar.description}”
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75">
              {bedazzlingBar.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Cristales', 'Charms', 'Rhinestones', 'Perlas', 'Glow'].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-violet/20 bg-white/80 px-3.5 py-1 text-xs font-medium text-violet"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
