import { motion } from 'framer-motion';
import { logos, brand } from '../data/content';

/**
 * Logo stamp como divisor entre secciones.
 * Variantes:
 *   - 'cream' (fondo crema) → logo wine-on-cream
 *   - 'pink' (fondo rosado) → logo wine-on-pink
 *   - 'wine' (fondo vino) → logo gold-on-wine
 */
export default function LogoDivider({ variant = 'cream' }) {
  const config = {
    cream: { bg: 'bg-cream', logo: logos.wineOnCream, line: 'bg-gold/60', sparkle: 'text-gold', label: 'text-charcoal/50' },
    pink: { bg: 'bg-pink/40', logo: logos.wineOnPink, line: 'bg-wine/30', sparkle: 'text-wine/70', label: 'text-wine/60' },
    wine: { bg: 'bg-wine', logo: logos.goldOnWine, line: 'bg-gold/40', sparkle: 'text-gold', label: 'text-cream/60' },
  }[variant];

  return (
    <section className={`${config.bg} py-16 md:py-20`}>
      <div className="container-site px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-6 md:gap-10">
            <span className={`h-px w-16 md:w-28 ${config.line}`} />
            <span className={`text-2xl ${config.sparkle}`}>✦</span>
            <img
              src={config.logo}
              alt={brand.name}
              className="h-24 w-24 rounded-2xl object-cover shadow-sm md:h-28 md:w-28"
            />
            <span className={`text-2xl ${config.sparkle}`}>✦</span>
            <span className={`h-px w-16 md:w-28 ${config.line}`} />
          </div>
          <p className={`mt-5 text-[10px] font-medium uppercase tracking-[0.4em] ${config.label}`}>
            Sculpt Society · Costa Rica
          </p>
        </motion.div>
      </div>
    </section>
  );
}
