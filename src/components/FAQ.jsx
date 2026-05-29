import { motion } from 'framer-motion';
import { faq } from '../data/content';

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-offwhite section-pad">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-lilac/25 blur-3xl" />
      <span className="pointer-events-none absolute right-10 top-10 text-4xl text-violet/30 floaty">✦</span>

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{faq.eyebrow}</p>
            <h2 className="mt-4 display text-4xl text-ink md:text-5xl">
              <span className="bg-gradient-y2k bg-clip-text text-transparent">
                {faq.title}
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/80">
              ¿Te quedó alguna duda? Escribinos por WhatsApp y te respondemos al toque.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-violet/10 rounded-3xl border border-violet/10 bg-white px-6 md:px-8">
              {faq.list.map((item, i) => (
                <motion.details
                  key={item.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group py-5"
                >
                  <summary className="flex items-center justify-between gap-6">
                    <span className="text-base font-medium text-ink md:text-lg">
                      {item.q}
                    </span>
                    <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-y2k text-white transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/85 md:text-base">
                    {item.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
