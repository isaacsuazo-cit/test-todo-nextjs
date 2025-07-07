/**
 * Utilidades para el manejo y validación de imágenes
 */
export class ImageUtils {
  /** Valida si una URL de imagen es válida */
  static isValidImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false
    
    // Permite URLs que contengan parámetros de query complejos
    const trimmedUrl = url.trim()
    if (trimmedUrl.length === 0) return false
    
    try {
      new URL(trimmedUrl)
      return true
    } catch {
      // Si la URL completa falla, verifica si es una URL relativa válida
      return trimmedUrl.startsWith('/') || trimmedUrl.startsWith('./') || trimmedUrl.startsWith('../')
    }
  }

  /** Obtiene extensiones de imagen soportadas */
  static getSupportedImageExtensions(): string[] {
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif', '.bmp', '.tiff']
  }

  /** Verifica si la URL contiene indicadores de imagen */
  static looksLikeImage(url: string): boolean {
    if (!url) return false
    
    const lowercaseUrl = url.toLowerCase()
    const extensions = this.getSupportedImageExtensions()
    
    // Verifica extensiones
    const hasExtension = extensions.some(ext => lowercaseUrl.includes(ext))
    
    // Verifica palabras clave comunes en URLs de imagen
    const imageKeywords = ['image', 'img', 'photo', 'picture', 'pic', 'avatar', 'thumb', 'upload']
    const hasImageKeyword = imageKeywords.some(keyword => lowercaseUrl.includes(keyword))
    
    // Verifica parámetros de formato de imagen
    const formatParams = ['format=auto', 'format=webp', 'format=jpg', 'format=png']
    const hasFormatParam = formatParams.some(param => lowercaseUrl.includes(param))
    
    return hasExtension || hasImageKeyword || hasFormatParam
  }

  /** Genera una URL de placeholder basada en el título */
  static getPlaceholderUrl(title: string, width = 400, height = 300): string {
    const encodedTitle = encodeURIComponent(title.substring(0, 20)) // Limita la longitud
    return `https://via.placeholder.com/${width}x${height}/6366f1/ffffff?text=${encodedTitle}`
  }

  /** Valida y procesa una URL de imagen */
  static processImageUrl(url: string, fallbackTitle?: string): string {
    if (!url) {
      return fallbackTitle 
        ? this.getPlaceholderUrl(fallbackTitle)
        : '/placeholder.svg'
    }

    const trimmedUrl = url.trim()
    
    if (this.isValidImageUrl(trimmedUrl)) {
      return trimmedUrl
    }

    return fallbackTitle 
      ? this.getPlaceholderUrl(fallbackTitle)
      : '/placeholder.svg'
  }

  /** Obtiene configuración optimizada para Next.js Image */
  static getNextImageConfig(url: string) {
    const isExternal = url.startsWith('http')
    
    return {
      src: url,
      unoptimized: true, // Desactiva optimización para mejor compatibilidad
      crossOrigin: isExternal ? 'anonymous' as const : undefined,
    }
  }

  /** Simplifica URL compleja para logging */
  static simplifyUrlForLogging(url: string): string {
    try {
      const urlObj = new URL(url)
      return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname.substring(0, 30)}...`
    } catch {
      return url.substring(0, 50) + '...'
    }
  }
}
