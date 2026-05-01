import { useEffect, useState } from 'react';
import { brand, logos, nav } from '../data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 shadow-sm backdrop-blur-md'
          : 'bg-cream/40 backdrop-blur-sm'
      }`}
    >
      <div className="container-site flex items-center justify-between px-6 py-4 md:px-10">
        <a href="#inicio" className="flex items-center gap-3" aria-label={brand.name}>
          <img
            src={logos.primary}
            alt={brand.name}
            className="h-10 w-10 rounded-lg object-cover md:h-11 md:w-11"
          />
          <span className="hidden text-sm font-semibold tracking-wide text-charcoal md:inline">
            {brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 transition-colors hover:text-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={nav.cta.href} className="btn-primary hidden sm:inline-flex">
            {nav.cta.label}
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full bg-charcoal transition-transform duration-300 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-charcoal transition-transform duration-300 ${
                  open ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ top: '72px' }}
      >
        <nav className="flex flex-col gap-1 px-8 py-10">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-charcoal/10 py-4 text-2xl font-medium text-charcoal transition-colors hover:text-orange"
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="btn-primary mt-8 w-full"
          >
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
