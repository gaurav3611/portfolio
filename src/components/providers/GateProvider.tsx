"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

/**
 * The entry gate blocks the portfolio until the visitor breaks the core.
 * `entered` flips once, and the hero/navbar entrance animations key off it.
 */
const GateContext = createContext<{ entered: boolean; enter: () => void }>({
  entered: true,
  enter: () => {},
});

export function useGate() {
  return useContext(GateContext);
}

export function GateProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const enter = useCallback(() => setEntered(true), []);
  return (
    <GateContext.Provider value={{ entered, enter }}>
      {children}
    </GateContext.Provider>
  );
}
