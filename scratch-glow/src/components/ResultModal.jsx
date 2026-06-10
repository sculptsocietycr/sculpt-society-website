import { motion, AnimatePresence } from 'framer-motion';
import { COPY } from '../data/copy.js';
import { PRIZES_BY_ID } from '../data/prizes.js';

export default function ResultModal({ participant, open, onClose }) {
  const won = participant?.won;
  const prize = won ? PRIZES_BY_ID[participant.prizeId] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-wine/40 p-5 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-pink/30 bg-white shadow-2xl"
          >
            {won ? (
              <WinnerBody prize={prize} participant={participant} />
            ) : (
              <LoserBody />
            )}

            <div className="px-8 pb-8 pt-3">
              <button onClick={onClose} className="btn-primary w-full py-4 text-base">
                {won ? `✦ ${COPY.winner.cta}` : `✦ ${COPY.loser.cta}`}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WinnerBody({ prize, participant }) {
  return (
    <div className="bg-gradient-y2k px-8 pb-6 pt-10 text-center">
      <p className="eyebrow mb-3">✦ {COPY.winner.subtitle} ✦</p>
      <h2 className="display text-[3rem] text-charcoal leading-[0.95]">
        OMG{' '}
        <span className="italic bg-gradient-miley bg-clip-text text-transparent">
          ganaste
        </span>
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-charcoal/80 italic">
        {prize?.message}
      </p>

      <div className="mt-6 rounded-2xl border border-pink/30 bg-white p-5 shadow-card">
        <img
          src={prize?.logo}
          alt={prize?.sponsor}
          className="mx-auto max-h-14 max-w-[55%] object-contain"
          onError={(e) => {
            e.currentTarget.style.opacity = 0;
          }}
        />
        <p className="mt-3 font-display text-sm font-semibold uppercase tracking-wider2 text-wine">
          {prize?.sponsor}
        </p>
        <p className="mt-1 text-sm text-charcoal/85">{prize?.prize}</p>
      </div>

      <p className="mt-5 text-xs text-charcoal/75">{COPY.winner.claim}</p>
      <p className="mt-2 text-[10px] uppercase tracking-wider3 text-charcoal/50">
        ID · {participant?.id}
      </p>
    </div>
  );
}

function LoserBody() {
  return (
    <div className="bg-gradient-y2k px-8 pb-6 pt-10 text-center">
      <p className="eyebrow mb-3">✦ Pop star energy ✦</p>
      <h2 className="display text-[2.5rem] text-charcoal leading-[1]">
        {COPY.loser.title}
        <span className="text-orange">.</span>
      </h2>
      <p className="mt-4 text-base leading-relaxed text-charcoal/80">
        {COPY.loser.body}
      </p>
      <p className="mt-5 text-xs uppercase tracking-wider2 text-charcoal/65">
        {COPY.loser.sign}
      </p>
    </div>
  );
}
