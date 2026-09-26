export interface ThemeColors {
  bg: string
  text: string
  surface: string
  surfaceAlt: string
  border: string
  accent: string
  accentText: string
  success: string
  successBg: string
  successText: string
  error: string
  errorBg: string
  errorText: string
  tableBorder: string
}

export interface Theme {
  id: string
  name: string
  colors: ThemeColors
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default Light',
    colors: {
      bg: '#f5f5f7',
      text: '#1a1a1a',
      surface: '#ffffff',
      surfaceAlt: '#fafafa',
      border: '#cccccc',
      accent: '#2b6cb0',
      accentText: '#ffffff',
      success: '#2f855a',
      successBg: '#f0fff4',
      successText: '#2f855a',
      error: '#c53030',
      errorBg: '#fff5f5',
      errorText: '#c53030',
      tableBorder: '#dddddd',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    colors: {
      bg: '#0f1117',
      text: '#e6e6ea',
      surface: '#1a1d27',
      surfaceAlt: '#232735',
      border: '#343a4a',
      accent: '#7c9eff',
      accentText: '#0f1117',
      success: '#4ade80',
      successBg: '#12291d',
      successText: '#86efac',
      error: '#f87171',
      errorBg: '#2c1416',
      errorText: '#fca5a5',
      tableBorder: '#343a4a',
    },
  },
  {
    id: 'colorado',
    name: 'Colorado',
    colors: {
      bg: '#002868',
      text: '#FFD700 ',
      surface: '#BF0A30',
      surfaceAlt: '#F2244F',
      border: '#7F061F',
      accent: '#FFD700',
      accentText: '#2c1416',
      success: '#4ade80',
      successBg: '#FFD700',
      successText: '#2c1416',
      error: '#f87171',
      errorBg: '#2c1416',
      errorText: '#fca5a5',
      tableBorder: '#343a4a',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      bg: '#f1f7f0',
      text: '#1c2e1a',
      surface: '#ffffff',
      surfaceAlt: '#eaf3e6',
      border: '#bcd8b4',
      accent: '#2f7d4f',
      accentText: '#ffffff',
      success: '#256d3f',
      successBg: '#e2f5e6',
      successText: '#1f6b3a',
      error: '#b3441f',
      errorBg: '#fbe9e0',
      errorText: '#9c3a19',
      tableBorder: '#cfe3c8',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      bg: '#fff5eb',
      text: '#3a1f10',
      surface: '#ffffff',
      surfaceAlt: '#ffe9d6',
      border: '#f3c199',
      accent: '#e0692a',
      accentText: '#ffffff',
      success: '#2f855a',
      successBg: '#e9f8ee',
      successText: '#23694a',
      error: '#c0392b',
      errorBg: '#fceae7',
      errorText: '#a5301f',
      tableBorder: '#f0c9a8',
    },
  },
]

export const defaultThemeId = themes[0].id
