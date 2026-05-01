import { motion } from 'framer-motion';
import { faq } from '../data/content';

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream section-pad">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{faq.eyebrow}</p>
            <h2 className="display text-4xl text-wine md:text-5xl">{faq.title}</h2>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
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
                    <span className="text-base font-medium text-charcoal md:text-lg">
                      {item.q}
                    </span>
                    <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal/70 md:text-base">
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
