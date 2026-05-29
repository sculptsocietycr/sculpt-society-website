import { motion } from 'framer-motion';
import { details, nextEvent } from '../data/content';

export default function Details() {
  return (
    <section id="detalles" className="relative overflow-hidden bg-offwhite section-pad">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-lilac/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-candy/40 blur-3xl" />

      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{details.eyebrow}</p>
          <h2 className="mt-4 display text-4xl text-ink md:text-5xl lg:text-6xl">
            {details.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Big event card with key data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-y2k p-1 shadow-xl lg:col-span-5"
          >
            <div className="rounded-[1.7rem] bg-white p-7 md:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet/90">
                Sculpt Society
              </p>
              <h3 className="mt-2 display text-3xl text-ink md:text-4xl">
                <span className="bg-gradient-y2k bg-clip-text text-transparent">
                  {nextEvent.shortTitle}
                </span>
              </h3>

              <div className="mt-7 divide-y divide-violet/10 border-y border-violet/10">
                {details.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet/90">
                      {row.label}
                    </span>
                    <span className="text-right text-sm font-semibold text-ink md:text-base">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#inscripcion" className="btn-primary mt-7 w-full">
                ✦ Reservar mi spot
              </a>
            </div>

            <span className="pointer-events-none absolute -right-4 -top-4 text-5xl">✦</span>
          </motion.div>

          {/* Includes / Bring / Reserve */}
          <div className="grid gap-5 lg:col-span-7">
            <InfoBlock title={details.includes.title} items={details.includes.items} accent="hannah" />
            <InfoBlock title={details.bring.title} items={details.bring.items} accent="miley" />
            <InfoBlock
              title={details.reserve.title}
              items={details.reserve.steps}
              accent="hannah"
              numbered
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, items, accent, numbered = false }) {
  const ribbon = accent === 'hannah' ? 'bg-gradient-hannah' : 'bg-gradient-miley';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-sm md:p-8"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${ribbon}`} />
      <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
            {numbered ? (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-y2k text-[10px] font-bold text-white">
                {i + 1}
              </span>
            ) : (
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
