import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme/ThemeContext'

export function ThemeSwitcher() {
  const { theme, themeId, setThemeId, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="theme-switcher" ref={containerRef}>
      <button
        type="button"
        className="theme-switcher__button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="theme-switcher__swatch" style={{ background: theme.colors.accent }} />
        Theme
      </button>

      {open && (
        <ul className="theme-switcher__menu" role="menu">
          {themes.map((t) => (
            <li key={t.id} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={t.id === themeId}
                className={
                  t.id === themeId
                    ? 'theme-switcher__option theme-switcher__option--active'
                    : 'theme-switcher__option'
                }
                onClick={() => {
                  setThemeId(t.id)
                  setOpen(false)
                }}
              >
                <span className="theme-switcher__swatch" style={{ background: t.colors.accent }} />
                {t.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
