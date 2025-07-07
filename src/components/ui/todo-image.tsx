import { useState } from 'react'
import Image from 'next/image'
import { ImageUtils } from '@/utils/image.utils'

interface TodoImageProps {
  /** URL de la imagen */
  src?: string
  /** Texto alternativo para la imagen */
  alt: string
  /** Ancho del contenedor */
  width?: number
  /** Alto del contenedor */
  height?: number
  /** Clase CSS adicional */
  className?: string
  /** Si debe llenar el contenedor padre */
  fill?: boolean
  /** Título para generar placeholder si falla la carga */
  fallbackTitle?: string
}

/** Componente para renderizar imágenes de todos con fallback automático */
export const TodoImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  fill = false,
  fallbackTitle
}: TodoImageProps) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  /** Maneja errores de carga de imagen */
  const handleImageError = () => {
    console.log('Error loading image:', src)
    setImageError(true)
    setIsLoading(false)
  }

  /** Maneja la carga exitosa de imagen */
  const handleImageLoad = () => {
    console.log('Image loaded successfully:', src)
    setIsLoading(false)
  }

  // Si hay error, usa placeholder
  if (imageError || !src) {
    const placeholderSrc = ImageUtils.getPlaceholderUrl(fallbackTitle || alt, width, height)
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={placeholderSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className="object-cover"
          unoptimized={true}
        />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-gray-400 text-sm">Cargando...</div>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized={true} // Desactiva optimización para URLs externas complejas
        priority={false}
      />
    </div>
  )
}
