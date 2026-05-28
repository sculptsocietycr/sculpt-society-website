import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Mariposa SVG con:
 *  - aleteo continuo (CSS keyframes)
 *  - parallax al scrollear (framer-motion useScroll)
 *  - colores 100% brand Sculpt Society
 *
 * Props:
 *   color      → cualquier color brand (orange, wine, pink, blush, gold, candy, cream)
 *   size       → px (default 40)
 *   className  → para posicionar con Tailwind (absolute, top, left, etc.)
 *   flapMs     → velocidad de aleteo (default 600)
 *   driftX     → desplazamiento horizontal acumulado en todo el scroll (px)
 *   driftY     → desplazamiento vertical (negativo = "vuela hacia arriba")
 *   rotate     → rotación inicial
 *   spin       → grados de rotación adicional con el scroll
 *   flip       → espejar horizontalmente
 *   delay      → desfase para el aleteo (s) — para que el grupo no aletee en sync
 */
export default function Butterfly({
  color = '#F4BABB',
  size = 40,
  className = '',
  flapMs = 600,
  driftX = 30,
  driftY = -120,
  rotate = 0,
  spin = 15,
  flip = false,
  delay = 0,
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // distancia de scroll para alcanzar el drift máximo
  const range = [0, 3500];
  const x = useTransform(scrollY, range, reduce ? [0, 0] : [0, driftX]);
  const y = useTransform(scrollY, range, reduce ? [0, 0] : [0, driftY]);
  const rot = useTransform(scrollY, range, reduce ? [rotate, rotate] : [rotate, rotate + spin]);

  return (
    <motion.span
      aria-hidden="true"
      className={`butterfly pointer-events-none absolute inline-block ${className}`}
      style={{
        x,
        y,
        rotate: rot,
        color,
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{
          '--flap-duration': `${flapMs}ms`,
          '--flap-delay': `${delay}s`,
          transform: flip ? 'scaleX(-1)' : 'none',
          overflow: 'visible',
        }}
      >
        {/* Sombra suave debajo */}
        <ellipse cx="50" cy="92" rx="22" ry="3" fill="#373330" opacity="0.06" />

        {/* Ala izquierda */}
        <g className="wing wing-left">
          <ellipse cx="32" cy="40" rx="24" ry="20" fill="currentColor" />
          <ellipse cx="34" cy="64" rx="18" ry="15" fill="currentColor" opacity="0.85" />
          {/* sparkle en ala */}
          <circle cx="24" cy="38" r="2" fill="#F9F5ED" opacity="0.8" />
          <circle cx="32" cy="65" r="1.3" fill="#F9F5ED" opacity="0.6" />
        </g>

        {/* Ala derecha */}
        <g className="wing wing-right">
          <ellipse cx="68" cy="40" rx="24" ry="20" fill="currentColor" />
          <ellipse cx="66" cy="64" rx="18" ry="15" fill="currentColor" opacity="0.85" />
          <circle cx="76" cy="38" r="2" fill="#F9F5ED" opacity="0.8" />
          <circle cx="68" cy="65" r="1.3" fill="#F9F5ED" opacity="0.6" />
        </g>

        {/* Cuerpo */}
        <ellipse cx="50" cy="55" rx="2.5" ry="22" fill="#373330" />
        <circle cx="50" cy="32" r="2.6" fill="#373330" />
        {/* Antenas */}
        <path
          d="M50 31 Q47 24 43 20"
          stroke="#373330"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 31 Q53 24 57 20"
          stroke="#373330"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.span>
  );
}
