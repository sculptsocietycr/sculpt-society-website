import Butterfly from './Butterfly.jsx';

// Decoración brand alineada con sculptsocietycr.com:
// fondo liso cream + blobs sutiles + 3 mariposas volando.
// Sin scrapbook chaos — minimal y editorial.

export default function BrandDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {/* Blobs decorativos suaves — mismo patrón que la landing */}
      <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-pink/35 blur-3xl" />
      <div className="absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
      <div className="absolute -left-16 bottom-20 h-64 w-64 rounded-full bg-candy/40 blur-3xl" />
      <div className="absolute -right-20 -bottom-10 h-72 w-72 rounded-full bg-pink/30 blur-3xl" />

      {/* Mariposas brand-colored volando (mismas que en la landing) */}
      <Butterfly
        color="#E7552C"
        size={42}
        className="right-4 top-24 sm:right-8 sm:top-28"
        rotate={12}
        driftX={-50}
        driftY={-160}
        spin={-20}
        flapMs={520}
      />
      <Butterfly
        color="#F4BABB"
        size={32}
        className="left-5 top-1/3 sm:left-10"
        rotate={-12}
        driftX={50}
        driftY={-180}
        spin={20}
        flapMs={580}
        delay={0.2}
        flip
      />
      <Butterfly
        color="#D6C774"
        size={28}
        className="right-6 bottom-1/3 sm:right-12"
        rotate={8}
        driftX={-30}
        driftY={-140}
        spin={-15}
        flapMs={620}
        delay={0.4}
      />
    </div>
  );
}
