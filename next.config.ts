import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    // Desactiva la optimización para URLs externas problemáticas
    unoptimized: false,
    // Formatos de imagen soportados
    formats: ['image/webp', 'image/avif'],
    // Configuración adicional para permitir cualquier origen
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
