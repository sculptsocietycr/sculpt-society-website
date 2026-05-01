import { motion } from 'framer-motion';
import { beliefs } from '../data/content';

const Icon = ({ index }) => {
  const icons = ['◇', '✿', '☼', '❋', '◯', '✦'];
  return (
    <span className="text-2xl text-gold" aria-hidden="true">
      {icons[index % icons.length]}
    </span>
  );
};

export default function Beliefs() {
  return (
    <section className="bg-cream section-pad">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">{beliefs.eyebrow}</p>
          <h2 className="display text-4xl text-wine md:text-5xl">{beliefs.title}</h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          {beliefs.list.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-cream p-8 transition-colors duration-300 hover:bg-pink/30 md:p-10"
            >
              <Icon index={i} />
              <h3 className="mt-5 text-2xl font-semibold text-charcoal">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
