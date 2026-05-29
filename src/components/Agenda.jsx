import { motion } from 'framer-motion';
import { agenda } from '../data/content';

export default function Agenda() {
  return (
    <section className="relative overflow-hidden bg-offwhite section-pad">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-candy/40 blur-3xl" />

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{agenda.eyebrow}</p>
            <h2 className="mt-4 display text-4xl text-ink md:text-5xl">
              {agenda.title}
            </h2>
            <p className="mt-5 text-sm italic text-ink/80">{agenda.note}</p>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative border-l-2 border-bubblegum/60 pl-8 md:pl-10">
              {agenda.list.map((item, i) => (
                <motion.li
                  key={item.time}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pb-8 last:pb-0"
                >
                  <span className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-y2k shadow md:-left-[50px]">
                    <span className="text-[10px] text-white">✦</span>
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                    {item.time}
                  </p>
                  <p className="mt-1 font-display text-xl text-ink md:text-2xl">
                    {item.activity}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
