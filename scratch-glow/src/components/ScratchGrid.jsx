import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import ScratchCard from './ScratchCard.jsx';
import { COPY } from '../data/copy.js';
import { MEMES_BY_ID } from '../data/memes.js';
import { PRIZES_BY_ID } from '../data/prizes.js';

// =====================================================
// ScratchGrid — 6 tarjetas + lógica de cierre
// =====================================================
// Reglas:
//   - Ganadora: cuando rasca la casilla con premio, confetti + onFinish().
//   - No ganadora: al rascar 3 casillas, onFinish() (cierre amigable).

const MIN_LOSER_REVEALS = 3;

export default function ScratchGrid({ participant, onFinish }) {
  const cells = participant.cells || [];
  const [revealed, setRevealed] = useState(() => cells.map(() => false));
  const [foundPrize, setFoundPrize] = useState(false);

  const won = Boolean(participant.won);

  const handleReveal = useCallback(
    (index) => {
      setRevealed((prev) => {
        if (prev[index]) return prev;
        const next = [...prev];
        next[index] = true;
        return next;
      });

      const cell = cells[index];
      if (cell?.kind === 'prize') {
        setFoundPrize(true);
        fireBrandConfetti();
        setTimeout(() => onFinish?.(), 1300);
      }
    },
    [cells, onFinish]
  );

  useEffect(() => {
    if (won) return;
    const count = revealed.filter(Boolean).length;
    if (count >= MIN_LOSER_REVEALS) {
      const t = setTimeout(() => onFinish?.(), 700);
      return () => clearTimeout(t);
    }
  }, [revealed, won, onFinish]);

  return (
    <section className="screen relative flex-1 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="eyebrow mb-3">{COPY.scratch.label}</p>
        <h1 className="display text-[2.4rem] text-charcoal md:text-5xl leading-[1]">
          {COPY.scratch.title}
          <span className="text-orange">.</span>
        </h1>
        <p className="mt-3 text-sm text-charcoal/75">{COPY.scratch.subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-7 grid grid-cols-2 gap-4"
      >
        {cells.map((cell, i) => (
          <Card
            key={i}
            cell={cell}
            revealed={revealed[i]}
            disabled={foundPrize && !revealed[i]}
            onReveal={() => handleReveal(i)}
          />
        ))}
      </motion.div>

      <p className="mt-6 text-center text-[11px] uppercase tracking-wider3 text-charcoal/55">
        {won
          ? 'Una de las 6 esconde tu premio'
          : foundPrize
          ? 'Casi…'
          : 'Rascá hasta que pase algo'}
      </p>
    </section>
  );
}

function Card({ cell, revealed, disabled, onReveal }) {
  return (
    <ScratchCard
      width={156}
      height={196}
      revealed={revealed}
      disabled={disabled}
      threshold={0.45}
      brushRadius={22}
      onReveal={onReveal}
      label="rascá"
    >
      <CardContent cell={cell} isWinning={cell.kind === 'prize' && revealed} />
    </ScratchCard>
  );
}

function CardContent({ cell, isWinning }) {
  if (cell.kind === 'prize') {
    const prize = PRIZES_BY_ID[cell.prizeId];
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-y2k p-3 text-center ${
          isWinning ? 'glow-pulse' : ''
        }`}
      >
        <img
          src={prize?.logo}
          alt={prize?.sponsor}
          className="max-h-16 max-w-[75%] object-contain"
          onError={(e) => {
            e.currentTarget.style.opacity = 0;
          }}
        />
        <p className="font-display text-[11px] font-semibold uppercase tracking-wider2 text-wine">
          {prize?.sponsor}
        </p>
        <p className="text-[10px] leading-tight text-charcoal/85 px-1">
          {prize?.prize}
        </p>
      </div>
    );
  }

  // Meme cell
  const meme = MEMES_BY_ID[cell.memeId];
  return (
    <div className="relative h-full w-full overflow-hidden bg-pink/15">
      <img
        src={meme?.src}
        alt={meme?.alt || 'meme'}
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fb = e.currentTarget.nextElementSibling;
          if (fb) fb.style.display = 'flex';
        }}
      />
      <div className="hidden h-full w-full flex-col items-center justify-center bg-pink/30 text-center text-xs text-wine">
        <span className="font-display italic text-2xl">no premio</span>
        <span className="mt-1 text-[10px] uppercase tracking-wider3">
          {cell.memeId}
        </span>
      </div>
    </div>
  );
}

// Confetti brand (rosado / wine / orange / dorado / cream).
function fireBrandConfetti() {
  const colors = ['#F4BABB', '#E7552C', '#811D16', '#D6C774', '#F9F5ED', '#ED8889'];
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.55 },
    colors,
    scalar: 0.9,
  });
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  }, 180);
}
