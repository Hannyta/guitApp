import { useEffect, useState } from 'react'

export const chartTheme = {
  light: {
    surface: '#fcfcfb',
    textPrimary: '#0b0b0b',
    textSecondary: '#52514e',
    muted: '#898781',
    gridline: '#e1e0d9',
    baseline: '#c3c2b7',
  },
  dark: {
    surface: '#1a1a19',
    textPrimary: '#ffffff',
    textSecondary: '#c3c2b7',
    muted: '#898781',
    gridline: '#2c2c2a',
    baseline: '#383835',
  },
}

export const statusColors = {
  good: '#0ca30c',
  critical: '#d03b3b',
}

export function useIsDarkMode() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event) => setIsDark(event.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return isDark
}
