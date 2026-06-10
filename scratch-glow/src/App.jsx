import { useEffect, useState, useCallback } from 'react';
import IntroScreen from './components/IntroScreen.jsx';
import ParticipantForm from './components/ParticipantForm.jsx';
import ScratchGrid from './components/ScratchGrid.jsx';
import ResultModal from './components/ResultModal.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import BrandDecor from './components/BrandDecor.jsx';
import { loadLocalState, saveLocalState, clearLocalState } from './utils/storage.js';
import { getStatus } from './utils/api.js';

// Estado de pantalla — máquina simple sin router para máxima fluidez mobile.
//   intro     → pantalla inicial
//   form      → formulario
//   scratch   → grid de 6 tarjetas
//   result    → modal final (ganador o no)
//   full      → juego cerrado (25 alcanzado)
//
// El admin vive en /admin (path-based) para no confundir el flujo.

export default function App() {
  // ¿Estamos en el panel admin?
  const [isAdmin] = useState(() =>
    typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/$/, '').endsWith('/admin')
  );

  const [screen, setScreen] = useState('intro');
  const [participant, setParticipant] = useState(null);   // resultado del backend
  const [status, setStatus] = useState(null);             // resumen público
  const [resultOpen, setResultOpen] = useState(false);    // si abrimos el modal final

  // Rehidratar localStorage al montar.
  useEffect(() => {
    if (isAdmin) return;
    const saved = loadLocalState();
    if (saved?.participant) {
      setParticipant(saved.participant);
      // Si la participante ya terminó (scratchedAll), saltar al result.
      if (saved.finished) {
        setScreen('result');
        setResultOpen(true);
      } else {
        // Mostrar grid con su resultado.
        setScreen('scratch');
      }
    }
  }, [isAdmin]);

  // Cargar status público.
  useEffect(() => {
    if (isAdmin) return;
    getStatus().then(setStatus).catch(() => setStatus(null));
  }, [isAdmin]);

  const handleStart = useCallback(() => {
    if (status?.full) {
      setScreen('full');
    } else {
      setScreen('form');
    }
  }, [status]);

  const handleParticipantReady = useCallback((p, { isNew }) => {
    setParticipant(p);
    saveLocalState({ participant: p, finished: false });
    if (isNew) {
      setScreen('scratch');
    } else {
      // Ya había participado — saltar directo al resultado.
      setScreen('result');
      setResultOpen(true);
    }
  }, []);

  const handleGameFull = useCallback(() => {
    setScreen('full');
  }, []);

  const handleFinishScratch = useCallback(() => {
    saveLocalState({ participant, finished: true });
    setScreen('result');
    setResultOpen(true);
  }, [participant]);

  const handleClose = useCallback(() => {
    setResultOpen(false);
    setScreen('result');
  }, []);

  // Reset solo en dev (botón escondido). En prod, las participantes
  // no tienen forma de empezar de cero.
  const devReset = useCallback(() => {
    clearLocalState();
    window.location.reload();
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <BrandDecor />

      <main className="relative z-10 flex min-h-[100dvh] flex-col">
        {screen === 'intro' && (
          <IntroScreen status={status} onStart={handleStart} />
        )}

        {screen === 'form' && (
          <ParticipantForm
            onReady={handleParticipantReady}
            onFull={handleGameFull}
          />
        )}

        {screen === 'scratch' && participant && (
          <ScratchGrid
            participant={participant}
            onFinish={handleFinishScratch}
          />
        )}

        {screen === 'full' && (
          <div className="screen relative flex flex-1 flex-col items-center justify-center text-center">
            <p className="eyebrow mb-4">Scratch cerrado</p>
            <h1 className="display text-5xl text-wine md:text-6xl">
              Ya cerramos
              <br />
              <span className="italic text-orange">el scratch.</span>
            </h1>
            <p className="mt-6 text-base text-charcoal/80">
              Gracias por ser parte de Sculpt Society.
            </p>
          </div>
        )}

        {screen === 'result' && participant && (
          <ResultModal
            participant={participant}
            open={resultOpen}
            onClose={handleClose}
            onReset={devReset}
          />
        )}
      </main>
    </div>
  );
}
