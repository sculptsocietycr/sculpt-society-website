// =====================================================
// localStorage helpers
// =====================================================
//
// El backend es la fuente de verdad (de-duplica por teléfono).
// localStorage es solo un respaldo UX: cuando la participante vuelve
// al sitio en el mismo dispositivo, no tiene que volver a poner el
// teléfono. Pero si limpia el caché o juega desde otro dispositivo,
// el backend sigue protegiendo el límite.

const KEY = 'scratch-glow:state';

export function loadLocalState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLocalState(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota / privacy mode: ignoramos */
  }
}

export function clearLocalState() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
