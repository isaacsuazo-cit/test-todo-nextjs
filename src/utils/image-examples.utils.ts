/**
 * URLs de ejemplo para testing de imágenes de diferentes orígenes
 */
export class ImageExamples {
  /** URLs de ejemplo de diferentes servicios de imágenes */
  static getExampleUrls(): { name: string; url: string; description: string }[] {
    return [
      {
        name: "Dev.to CDN",
        url: "https://media2.dev.to/dynamic/image/width=1000%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1stb1455infpu039mycv.png",
        description: "CDN dinámico con parámetros complejos"
      },
      {
        name: "Unsplash",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "Servicio de fotografías de stock"
      },
      {
        name: "Picsum",
        url: "https://picsum.photos/400/300",
        description: "Generador de imágenes aleatorias"
      },
      {
        name: "Placeholder",
        url: "https://via.placeholder.com/400x300/4F46E5/ffffff?text=Todo+Example",
        description: "Placeholder con texto personalizado"
      },
      {
        name: "GitHub Raw",
        url: "https://raw.githubusercontent.com/vercel/next.js/canary/examples/image-component/public/mountains.jpg",
        description: "Imagen desde repositorio de GitHub"
      },
      {
        name: "Pixabay",
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
        description: "Banco de imágenes gratuitas"
      },
      {
        name: "Cloudinary",
        url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        description: "CDN de gestión de imágenes"
      },
      {
        name: "Simple URL",
        url: "https://httpbin.org/image/jpeg",
        description: "URL simple que devuelve JPEG"
      }
    ]
  }

  /** Obtiene una URL aleatoria de ejemplo */
  static getRandomExampleUrl(): string {
    const examples = this.getExampleUrls()
    const randomIndex = Math.floor(Math.random() * examples.length)
    return examples[randomIndex].url
  }

  /** URLs comunes de CDN que deben funcionar */
  static getReliableUrls(): string[] {
    return [
      "https://via.placeholder.com/400x300/FF5733/ffffff?text=Test+Image",
      "https://picsum.photos/400/300",
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=400&h=300&fit=crop",
      "https://httpbin.org/image/jpeg",
    ]
  }

  /** URL específica para testing de CDN complejos */
  static getComplexCdnUrl(): string {
    return "https://media2.dev.to/dynamic/image/width=1000%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1stb1455infpu039mycv.png"
  }
}
