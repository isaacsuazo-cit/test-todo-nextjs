import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para GitHub Pages
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/test-todo-nextjs' : '',
  
  images: {
    // Desactiva la optimización de imágenes para static export
    unoptimized: true,
    // Permite imágenes de cualquier dominio usando remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Formatos de imagen soportados
    formats: ['image/webp', 'image/avif'],
    // Configuración adicional para permitir cualquier origen
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;