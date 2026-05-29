import { motion } from 'framer-motion';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experiencia" className="relative overflow-hidden bg-gradient-chrome section-pad">
      <div className="pointer-events-none absolute right-10 top-10 text-5xl text-violet/30 floaty">✦</div>
      <div className="pointer-events-none absolute left-8 bottom-10 text-5xl text-bubblegum/40 floaty" style={{ animationDelay: '1.2s' }}>♡</div>

      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{experience.eyebrow}</p>
          <h2 className="mt-4 display text-4xl text-ink md:text-5xl lg:text-6xl">
            {experience.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
            {experience.description}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experience.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glow-card group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-y2k text-2xl text-white shadow-sm">
                {item.icon}
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
