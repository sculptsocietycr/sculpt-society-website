// Hook + provider para el status del cupo del evento.
//
// Hace una única llamada GET /api/inscripciones/status al montar
// y comparte el resultado con todos los componentes que lo necesiten
// (Hero CTA, Header CTA, Details, RegistrationForm).
//
// Si el endpoint falla, defaultea a "abierto" (soldOut: false) — preferimos
// errar del lado de mostrar el form que bloquearlo por un fallo de red.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

const DEFAULT_CAPACITY = 26;

const EventStatusContext = createContext({
  loading: true,
  count: 0,
  capacity: DEFAULT_CAPACITY,
  remaining: DEFAULT_CAPACITY,
  soldOut: false,
  refresh: () => {},
});

export function EventStatusProvider({ children }) {
  // Override de QA: `?soldout=1` en la URL fuerza el estado sold out
  // para preview/QA sin tocar el backend. En prod sigue mandando el server.
  const initialSoldOut =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('soldout') === '1';

  const [state, setState] = useState({
    loading: !initialSoldOut,
    count: initialSoldOut ? DEFAULT_CAPACITY : 0,
    capacity: DEFAULT_CAPACITY,
    remaining: initialSoldOut ? 0 : DEFAULT_CAPACITY,
    soldOut: initialSoldOut,
  });

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/inscripciones/status', {
        // Permitir cache-busting en submit; el server ya hace s-maxage=15
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setState({
        loading: false,
        count: Number(data.count) || 0,
        capacity: Number(data.capacity) || DEFAULT_CAPACITY,
        remaining: Number(data.remaining) || 0,
        soldOut: Boolean(data.soldOut),
      });
    } catch (err) {
      // Falla silenciosa: dejamos abierto el form.
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    // Respetar el override de QA — si está, no consultamos el backend.
    if (initialSoldOut) return;
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus]);

  const value = useMemo(
    () => ({ ...state, refresh: fetchStatus }),
    [state, fetchStatus]
  );

  return (
    <EventStatusContext.Provider value={value}>
      {children}
    </EventStatusContext.Provider>
  );
}

export function useEventStatus() {
  return useContext(EventStatusContext);
}
