import { motion } from 'framer-motion';
import { founders } from '../data/content';
import Butterfly from './Butterfly.jsx';

export default function Founders() {
  return (
    <section
      id="fundadoras"
      className="relative overflow-hidden bg-cream section-pad"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />

      {/* Mariposas decorativas */}
      <Butterfly
        color="#E7552C"
        size={36}
        className="right-6 top-10 md:right-16 md:top-14"
        rotate={12}
        driftX={-40}
        driftY={-100}
        spin={-15}
        flapMs={560}
      />
      <Butterfly
        color="#F4BABB"
        size={28}
        className="left-8 bottom-12 hidden md:block"
        rotate={-10}
        driftX={50}
        driftY={-120}
        spin={20}
        flapMs={620}
        delay={0.3}
        flip
      />

      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{founders.eyebrow}</p>
          <h2 className="mt-4 display text-4xl text-charcoal md:text-5xl lg:text-6xl">
            {founders.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal/70 md:text-lg">
            {founders.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {founders.list.map((f, i) => (
            <FounderCard key={f.key} founder={f} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderCard({ founder, delay }) {
  const isHannah = founder.vibe === 'hannah';
  const ribbon = isHannah ? 'bg-gradient-hannah' : 'bg-gradient-miley';
  const stickerColor = isHannah ? 'text-orange' : 'text-gold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className="group relative overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-pink/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Top ribbon */}
      <div className={`absolute inset-x-0 top-0 z-10 h-1.5 ${ribbon}`} />

      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-pink/20">
        <img
          src={founder.image}
          alt={`${founder.name} — ${founder.role}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(e) => {
            // Si la foto aún no se ha subido, mostramos un placeholder
            // tipográfico para no romper el layout.
            e.currentTarget.style.display = 'none';
            const ph = e.currentTarget.nextElementSibling;
            if (ph) ph.style.display = 'flex';
          }}
        />
        {/* Placeholder (oculto si la imagen carga) */}
        <div
          className="absolute inset-0 hidden flex-col items-center justify-center gap-2 bg-gradient-y2k px-4 text-center"
        >
          <span className="text-3xl text-wine/60">✦</span>
          <p className="font-display text-2xl font-semibold text-wine">
            {founder.name}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            Foto próximamente
          </p>
        </div>

        {/* Sticker en la esquina */}
        <span
          className={`pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur ${stickerColor}`}
        >
          {founder.sticker} {founder.name}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6 md:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-orange">
          {founder.role}
        </p>
        <h3 className="mt-2 display text-3xl text-charcoal">
          {founder.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
          {founder.bio}
        </p>
      </div>
    </motion.div>
  );
}
