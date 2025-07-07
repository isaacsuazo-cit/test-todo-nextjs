import { useState, useEffect } from 'react'
import { ThemeStorageService } from '@/services/storage.service'

/** Hook personalizado para manejar el tema de la aplicación */
export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false)

  /** Carga la preferencia de tema desde localStorage al montar */
  useEffect(() => {
    const savedTheme = ThemeStorageService.loadTheme()
    setDarkMode(savedTheme)
  }, [])

  /** Guarda la preferencia de tema en localStorage cada vez que cambia */
  useEffect(() => {
    ThemeStorageService.saveTheme(darkMode)
  }, [darkMode])

  /** Alterna entre tema claro y oscuro */
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  return { darkMode, toggleTheme }
}
