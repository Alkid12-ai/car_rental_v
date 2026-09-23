"use client";

import { createContext, useContext, type ReactNode } from "react";

import { defaultLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/sq";

interface I18nValue {
  locale: Locale;
  /** The active dictionary. Only one locale ever ships to the browser. */
  t: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Makes the active dictionary available to Client Components.
 *
 * The dictionary is passed in as a prop from the server layout rather than
 * imported by client code. That matters: `getDictionary` pulls in every
 * locale, so importing it from a client component would ship all four
 * dictionaries to the browser. Passing only the active one keeps the bundle
 * at 1x.
 */
export function I18nProvider({
  locale = defaultLocale,
  dict,
  children,
}: {
  locale?: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, t: dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n() must be used inside <I18nProvider>");
  }

  return context;
}

/** Convenience hook when only the strings are needed. */
export function useDict(): Dictionary {
  return useI18n().t;
}

/** Convenience hook when only the locale tag is needed. */
export function useLocale(): Locale {
  return useI18n().locale;
}
