import { motion } from 'framer-motion';
import { forWho } from '../data/content';

export default function ForWho() {
  return (
    <section id="paraquien" className="relative overflow-hidden bg-offwhite section-pad">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-candy/30 blur-3xl" />

      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{forWho.eyebrow}</p>
          <h2 className="mt-4 display text-4xl text-ink md:text-5xl lg:text-6xl">
            <span className="bg-gradient-y2k bg-clip-text text-transparent">
              {forWho.title}
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
            {forWho.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forWho.bullets.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative rounded-3xl border border-violet/10 bg-white p-6 shadow-sm transition-all hover:border-violet/25 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-candy text-violet">
                  {b.icon}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {b.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
