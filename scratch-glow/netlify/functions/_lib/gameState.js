// =====================================================
// Lógica pura del juego (sin I/O).
// =====================================================
//
// Estas funciones no tocan el blob — operan sobre objetos plain JS.
// Los handlers de las funciones serverless las orquestan dentro de
// una transacción `transact()` del store.

import {
  MAX_PARTICIPANTS,
  MAX_WINNERS,
  CELLS_PER_GAME,
  PRIZE_IDS,
  MEME_IDS,
} from './gameConfig.js';

/**
 * Construye el estado inicial del juego con el pool ya barajado.
 * Se llama una sola vez en la primera participación.
 */
export function buildInitialState() {
  const pool = buildInitialPool();
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    pool,                       // [{kind:'winning'|'losing'} x MAX_PARTICIPANTS]
    cursor: 0,                  // próximo índice a entregar
    prizesAssigned: [],         // ids de premios ya entregados
    participants: {},           // { telefonoNormalizado: participantResult }
  };
}

/**
 * Pool de 25 slots: MAX_WINNERS ganadores, resto perdedores. Barajado.
 * Cada slot decide si la siguiente participante gana o no.
 */
export function buildInitialPool() {
  const arr = [];
  for (let i = 0; i < MAX_WINNERS; i++) arr.push({ kind: 'winning' });
  for (let i = MAX_WINNERS; i < MAX_PARTICIPANTS; i++) arr.push({ kind: 'losing' });
  return shuffle(arr);
}

/**
 * Fisher–Yates shuffle.
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Toma un sample de N memes únicos.
 */
export function pickUniqueMemes(n) {
  if (MEME_IDS.length < n) {
    throw new Error(
      `Necesitás al menos ${n} memes en MEME_IDS para llenar todas las casillas.`
    );
  }
  return shuffle(MEME_IDS).slice(0, n);
}

/**
 * Construye las 6 casillas de una participante ganadora:
 * 5 memes + 1 premio en posición aleatoria.
 */
export function buildWinningCells(prizeId) {
  const memes = pickUniqueMemes(CELLS_PER_GAME - 1);
  const cells = memes.map((memeId) => ({ kind: 'meme', memeId }));
  const winningCellIndex = Math.floor(Math.random() * CELLS_PER_GAME);
  cells.splice(winningCellIndex, 0, { kind: 'prize', prizeId });
  return { cells, winningCellIndex };
}

/**
 * Construye las 6 casillas de una participante NO ganadora:
 * 6 memes diferentes.
 */
export function buildLosingCells() {
  const memes = pickUniqueMemes(CELLS_PER_GAME);
  return {
    cells: memes.map((memeId) => ({ kind: 'meme', memeId })),
    winningCellIndex: null,
  };
}

/**
 * Procesa la participación. Asume que el teléfono ya está normalizado
 * y que no hay duplicado (el handler lo verifica antes). Devuelve el
 * nuevo estado + el resultado de la participante.
 */
export function applyParticipation(state, { id, nombre, telefono, instagram, userAgent }) {
  if (Object.keys(state.participants).length >= MAX_PARTICIPANTS) {
    const err = new Error('El juego ya alcanzó el máximo de participantes.');
    err.code = 'GAME_FULL';
    throw err;
  }

  const slot = state.pool[state.cursor];
  if (!slot) {
    const err = new Error('No quedan slots disponibles en el pool.');
    err.code = 'GAME_FULL';
    throw err;
  }

  let result;
  if (slot.kind === 'winning' && state.prizesAssigned.length < MAX_WINNERS) {
    // Asignar el próximo premio disponible (en orden de PRIZE_IDS).
    const nextPrizeId = PRIZE_IDS.find((pid) => !state.prizesAssigned.includes(pid));
    if (!nextPrizeId) {
      // Edge case: pool dice winning pero no quedan premios. Degradar.
      result = { won: false, ...buildLosingCells(), prizeId: null };
    } else {
      const { cells, winningCellIndex } = buildWinningCells(nextPrizeId);
      result = { won: true, prizeId: nextPrizeId, cells, winningCellIndex };
      state.prizesAssigned = [...state.prizesAssigned, nextPrizeId];
    }
  } else {
    result = { won: false, ...buildLosingCells(), prizeId: null };
  }

  const participant = {
    id,
    nombre,
    telefono,
    instagram: instagram || '',
    userAgent: userAgent || '',
    createdAt: new Date().toISOString(),
    won: result.won,
    prizeId: result.prizeId,
    winningCellIndex: result.winningCellIndex,
    cells: result.cells,
    claimed: false,
  };

  state.participants = { ...state.participants, [telefono]: participant };
  state.cursor = state.cursor + 1;

  return { state, participant };
}

/**
 * Construye un id corto único para la participación.
 */
export function newParticipantId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}
