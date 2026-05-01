import { motion } from 'framer-motion';
import { agenda } from '../data/content';

export default function Agenda() {
  return (
    <section className="bg-cream section-pad">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{agenda.eyebrow}</p>
            <h2 className="display text-4xl text-wine md:text-5xl">{agenda.title}</h2>
            <p className="mt-5 text-sm italic text-charcoal/60">{agenda.note}</p>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative border-l-2 border-pink pl-8 md:pl-10">
              {agenda.list.map((item, i) => (
                <motion.li
                  key={item.time}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pb-8 last:pb-0"
                >
                  <span className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-pink bg-cream md:-left-[50px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  </span>
                  <p className="font-medium uppercase tracking-[0.15em] text-orange">
                    {item.time}
                  </p>
                  <p className="mt-1 text-xl text-charcoal md:text-2xl">{item.activity}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
