"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ThemeCtx {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} });

/**
 * SSR-safe theme provider. The stored/system preference is read in an effect
 * (never during render) so the server and first client render agree.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // Default to light for first-time visitors (the site's design is white-based).
    // A visitor who picks dark keeps dark on their next visit.
    setDark(stored === "dark");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, ready]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
