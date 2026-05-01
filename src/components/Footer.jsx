import { brand, logos, footer, nav } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-site px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={logos.primary}
                alt={brand.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <span className="text-lg font-semibold tracking-wide">{brand.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              {footer.tagline}
            </p>
            <a href={nav.cta.href} className="btn-primary mt-8">
              {nav.cta.label}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Navegá
            </p>
            <ul className="space-y-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-cream/80 transition-colors hover:text-orange"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-cream/80">
              <li>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  Instagram {brand.instagram}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="transition-colors hover:text-orange"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${brand.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  WhatsApp {brand.whatsapp}
                </a>
              </li>
              <li className="text-cream/60">{brand.domain}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p className="flex items-center gap-2">
            <span className="text-gold">✦</span>
            Hecho con cariño desde Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}
