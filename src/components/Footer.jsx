import { brand, logos, footer, nav } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-ink text-white/85">
      <div className="container-site px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img
                src={logos.creamOnCharcoal}
                alt={brand.name}
                className="h-16 w-16 rounded-xl object-cover md:h-20 md:w-20"
              />
              <div>
                <span className="block text-xl font-semibold tracking-wide text-white">
                  {brand.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-lilac">
                  ✦ Hannah vs Miley Edition ✦
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
              {footer.tagline}
            </p>
            <a href={nav.cta.href} className="btn-primary mt-8">
              ✦ {nav.cta.label}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-lilac">
              Navegá
            </p>
            <ul className="space-y-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/90 transition-colors hover:text-bubblegum"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-lilac">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-bubblegum"
                >
                  Instagram {brand.instagram}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="transition-colors hover:text-bubblegum"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${brand.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-bubblegum"
                >
                  WhatsApp {brand.whatsapp}
                </a>
              </li>
              <li className="text-white/85">{brand.domain}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/80 md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <p className="flex items-center gap-2">
            <span className="text-bubblegum">✦</span>
            Pop star morning · 13.06.26
            <span className="text-lilac">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
