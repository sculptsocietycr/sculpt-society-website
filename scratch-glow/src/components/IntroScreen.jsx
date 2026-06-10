import { motion } from 'framer-motion';
import { COPY } from '../data/copy.js';

export default function IntroScreen({ status, onStart }) {
  const full = status?.full;

  return (
    <section className="screen relative flex flex-1 flex-col justify-center pt-10">
      {/* Logo Sculpt Society — grande, centrado */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col items-center gap-3"
      >
        <img
          src={COPY.brand.logo}
          alt={COPY.brand.name}
          className="h-24 w-24 rounded-2xl object-cover shadow-card"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'block';
          }}
        />
        <span
          className="hidden font-display text-2xl font-bold text-wine"
          aria-hidden="true"
        >
          {COPY.brand.name}
        </span>

        {/* Chip de edición — mismo estilo que la landing */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-hannah px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider3 text-wine shadow-sm">
          ✦ {COPY.brand.edition} ✦
        </span>
      </motion.div>

      {/* Título dual con gradient — patrón de la landing */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="display text-center text-[3.5rem] text-charcoal leading-[0.95]"
      >
        Scratch
        <br />
        <span className="italic bg-gradient-miley bg-clip-text text-transparent">
          & Glow
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto mt-6 max-w-sm text-center text-base leading-relaxed text-charcoal/80"
      >
        {COPY.intro.subtitle}
        <br />
        {COPY.intro.body}
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        {full ? (
          <div className="rounded-3xl border border-pink/30 bg-white px-6 py-5 text-center shadow-card">
            <p className="display text-xl text-wine">{COPY.full.title}</p>
            <p className="mt-1 text-sm text-charcoal/80">{COPY.full.body}</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onStart}
            className="btn-primary px-10 py-4 text-base"
          >
            ✦ {COPY.intro.cta}
          </button>
        )}

        {status && !full && Number.isFinite(status.remaining) && (
          <p className="text-[10px] uppercase tracking-wider3 text-charcoal/55">
            {status.remaining} {status.remaining === 1 ? 'cupo' : 'cupos'}
            {Number.isFinite(status.prizesRemaining) && (
              <> · {status.prizesRemaining} premios</>
            )}
          </p>
        )}
      </motion.div>
    </section>
  );
}
