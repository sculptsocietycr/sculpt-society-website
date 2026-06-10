import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';

// =====================================================
// ScratchCard — efecto rasca y gana real con canvas.
// =====================================================
//
// La capa dorada/foil cubre el contenido (`children`). El usuario rasca
// con touch/mouse y cuando supera el threshold (default 45%), llamamos a
// `onReveal()`. Después del reveal, la capa desaparece con un fade.
//
// Diseño:
//   - Pointer events para uniformizar mouse + touch.
//   - `globalCompositeOperation = 'destination-out'` para "borrar" píxeles.
//   - Sample periódico (cada 200ms mientras se rasca) del % rascado para
//     no matar la perf con cálculos en cada movimiento.

export default function ScratchCard({
  children,
  width = 280,
  height = 280,
  threshold = 0.45,
  brushRadius = 26,
  revealed: revealedProp = false,
  disabled = false,
  onReveal,
  onScratchStart,
  label = 'rascá ✦',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDownRef = useRef(false);
  const lastPosRef = useRef(null);
  const lastSampleRef = useRef(0);
  const revealedRef = useRef(false);

  const [revealed, setRevealed] = useState(revealedProp);
  const [scratchedPct, setScratchedPct] = useState(0);

  // Inicializar la capa dorada SINCRÓNICAMENTE antes del primer paint,
  // así no hay flash del contenido mientras useEffect aún no corrió.
  useLayoutEffect(() => {
    if (revealedProp) {
      setRevealed(true);
      revealedRef.current = true;
      return;
    }
    paintCover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  // Si el caller fuerza revealed → animar fade out.
  useEffect(() => {
    if (revealedProp) doReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealedProp]);

  function paintCover() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // Capa base dorada con gradiente foil.
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D6C774');
    grad.addColorStop(0.3, '#EFE7D0');
    grad.addColorStop(0.55, '#D6C774');
    grad.addColorStop(0.8, '#B59E4A');
    grad.addColorStop(1, '#D6C774');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Highlights satinados — líneas oblicuas sutiles.
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    for (let y = -height; y < height * 2; y += 14) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + width);
      ctx.stroke();
    }

    // Texto sutil "RASCÁ ✦"
    ctx.fillStyle = 'rgba(129, 29, 22, 0.55)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 12px Poppins, system-ui, sans-serif';
    const text = String(label).toUpperCase();
    ctx.fillText('✦ ' + text + ' ✦', width / 2, height / 2 - 7);
    ctx.font = '500 10px Poppins, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(55, 51, 48, 0.5)';
    ctx.fillText('con el dedo', width / 2, height / 2 + 12);

    revealedRef.current = false;
    setRevealed(false);
    setScratchedPct(0);
  }

  // Pintar borrado en un círculo entre dos puntos.
  function eraseLine(from, to) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushRadius * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  // Eraser tipo "punto" para el primer click.
  function eraseDot(p) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(p.x, p.y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  // Sample del % rascado (downsampled para perf).
  function samplePercent() {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    const stride = 12; // muestreo cada 12px
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;
    for (let y = 0; y < canvas.height; y += stride) {
      for (let x = 0; x < canvas.width; x += stride) {
        const i = (y * canvas.width + x) * 4 + 3;
        if (data[i] < 32) cleared++;
        total++;
      }
    }
    return total ? cleared / total : 0;
  }

  // Coords relativas al canvas.
  function getCoords(e) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  const onPointerDown = useCallback(
    (e) => {
      if (disabled || revealedRef.current) return;
      e.preventDefault();
      const pos = getCoords(e);
      if (!pos) return;
      isDownRef.current = true;
      lastPosRef.current = pos;
      eraseDot(pos);
      onScratchStart?.();
      canvasRef.current?.setPointerCapture?.(e.pointerId);
    },
    [disabled, onScratchStart]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDownRef.current || revealedRef.current) return;
      e.preventDefault();
      const pos = getCoords(e);
      if (!pos) return;
      const last = lastPosRef.current || pos;
      eraseLine(last, pos);
      lastPosRef.current = pos;

      // Throttle del sample
      const now = Date.now();
      if (now - lastSampleRef.current > 180) {
        lastSampleRef.current = now;
        const pct = samplePercent();
        setScratchedPct(pct);
        if (pct >= threshold && !revealedRef.current) {
          doReveal();
        }
      }
    },
    [threshold]
  );

  const onPointerUp = useCallback((e) => {
    isDownRef.current = false;
    lastPosRef.current = null;
    try {
      canvasRef.current?.releasePointerCapture?.(e.pointerId);
    } catch { /* noop */ }
    // Sample final una vez al levantar.
    if (!revealedRef.current) {
      const pct = samplePercent();
      setScratchedPct(pct);
      if (pct >= threshold) doReveal();
    }
  }, [threshold]);

  function doReveal() {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    // Limpiar el canvas con un fade visual (CSS opacity controla la capa).
    onReveal?.();
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl bg-cream shadow-scratch"
      style={{ width, height }}
    >
      {/* Contenido revelable */}
      <div className="absolute inset-0">{children}</div>

      {/* Capa scratch */}
      <canvas
        ref={canvasRef}
        className={`scratch-canvas absolute inset-0 h-full w-full transition-opacity duration-500 ${
          revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Tarjeta para rascar"
      />
    </div>
  );
}
