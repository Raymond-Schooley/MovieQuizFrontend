import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { themes, defaultThemeId, type Theme } from './themes'

const STORAGE_KEY = 'movie-quiz-theme'

interface ThemeContextValue {
  theme: Theme
  themeId: string
  setThemeId: (id: string) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function kebabCase(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--color-${kebabCase(key)}`, value)
  }
  root.setAttribute('data-theme', theme.id)
}

function readStoredThemeId() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && themes.some((t) => t.id === stored)) return stored
  } catch {
    // localStorage unavailable (e.g. private mode) - fall back to default
  }
  return defaultThemeId
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(readStoredThemeId)
  const theme = themes.find((t) => t.id === themeId) ?? themes[0]

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function setThemeId(id: string) {
    setThemeIdState(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // localStorage unavailable - theme just won't persist across reloads
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, themes }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
