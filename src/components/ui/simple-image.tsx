import { useState } from 'react'
import { ImageUtils } from '@/utils/image.utils'

interface SimpleImageProps {
  /** URL de la imagen */
  src?: string
  /** Texto alternativo para la imagen */
  alt: string
  /** Clase CSS adicional */
  className?: string
  /** Título para generar placeholder si falla la carga */
  fallbackTitle?: string
}

/** Componente simple de imagen usando elemento HTML img estándar para máxima compatibilidad */
export const SimpleImage = ({
  src,
  alt,
  className = '',
  fallbackTitle
}: SimpleImageProps) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  /** Maneja errores de carga de imagen */
  const handleImageError = () => {
    console.log('Error loading image with simple img:', src)
    setImageError(true)
    setIsLoading(false)
  }

  /** Maneja la carga exitosa de imagen */
  const handleImageLoad = () => {
    console.log('Image loaded successfully with simple img:', src)
    setIsLoading(false)
  }

  // Si hay error o no hay src, usa placeholder
  const displaySrc = imageError || !src 
    ? ImageUtils.getPlaceholderUrl(fallbackTitle || alt, 400, 300)
    : src

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-gray-400 text-sm">Cargando...</div>
        </div>
      )}
      
      <img
        src={displaySrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
        loading="lazy"
      />
    </div>
  )
}
