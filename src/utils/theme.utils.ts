/** Utilidades para generar clases CSS dinámicas basadas en el tema */
export class ThemeUtils {
  /** Genera clases para el fondo principal de la aplicación */
  static getMainBackground(isDark: boolean): string {
    return isDark
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
      : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
  }

  /** Genera clases para el título principal */
  static getTitleClasses(isDark: boolean): string {
    const gradient = isDark 
      ? 'from-cyan-400 via-purple-400 to-pink-400' 
      : 'from-purple-600 via-pink-600 to-blue-600'
    return `text-4xl md:text-6xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-pulse`
  }

  /** Genera clases para el botón de tema */
  static getThemeButtonClasses(isDark: boolean): string {
    return `transition-all duration-300 hover:scale-110 ${
      isDark
        ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
        : 'border-purple-600 text-purple-600 hover:bg-purple-600/10'
    }`
  }

  /** Genera clases para el botón principal de agregar */
  static getAddButtonClasses(isDark: boolean): string {
    return `transition-all duration-300 hover:scale-105 ${
      isDark
        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400'
        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
    } text-white border-0 shadow-lg hover:shadow-xl`
  }

  /** Genera clases para las tarjetas de estadísticas */
  static getStatsCardClasses(isDark: boolean, color: 'cyan' | 'green' | 'pink'): string {
    const baseClasses = 'transition-all duration-300 hover:scale-105'
    const bgClasses = isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm'
    const borderClasses = isDark 
      ? `border-${color}-500/30` 
      : `border-${color}-200`
    
    return `${baseClasses} ${bgClasses} ${borderClasses}`
  }

  /** Genera clases para el contenido del diálogo */
  static getDialogClasses(isDark: boolean): string {
    return isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'
  }

  /** Genera clases para los inputs del formulario */
  static getInputClasses(isDark: boolean): string {
    return isDark
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300'
  }
}
