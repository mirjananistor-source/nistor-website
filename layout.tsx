"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Lang = "SR" | "EN"

export const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
}>({ lang: "SR", setLang: () => {} })

export function useLang() {
  return useContext(LangContext)
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("SR")
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}
