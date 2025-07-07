# Todo for Devs - Design Doc

## Resumen Ejecutivo

**Todo for Devs** es una aplicación web moderna de gestión de tareas diseñada específicamente para desarrolladores. Construida con Next.js 15, React 19 y TypeScript, implementa una arquitectura limpia y patrones de diseño modernos para ofrecer una experiencia de usuario fluida y eficiente.

## Estado del Documento

- **Estado**: En desarrollo activo
- **Autor**: Isaac Suazo
- **Última actualización**: Enero 2025
- **Versión**: 0.1.0

## Tabla de Contenidos

1. [Contexto y Alcance](#contexto-y-alcance)
2. [Objetivos y No-Objetivos](#objetivos-y-no-objetivos)
3. [Diseño de Alto Nivel](#diseño-de-alto-nivel)
4. [Arquitectura del Sistema](#arquitectura-del-sistema)
5. [Diseño Detallado](#diseño-detallado)
6. [Consideraciones](#consideraciones)
7. [Instalación y Configuración](#instalación-y-configuración)
8. [Despliegue](#despliegue)
9. [Pruebas](#pruebas)
10. [Métricas de Éxito](#métricas-de-éxito)

## Contexto y Alcance

### Problema

Los desarrolladores necesitan una herramienta simple pero poderosa para gestionar sus tareas diarias, que se integre bien con su flujo de trabajo y que ofrezca características específicas para sus necesidades.

### Solución Propuesta

Una aplicación web de gestión de tareas con:
- Interfaz moderna y responsiva con modo oscuro
- Soporte para contenido enriquecido (Markdown)
- Capacidad de adjuntar imágenes a las tareas
- Persistencia local de datos
- Animaciones fluidas y experiencia de usuario optimizada

## Objetivos y No-Objetivos

### Objetivos

1. **Experiencia de Usuario Superior**
   - Interfaz intuitiva y moderna
   - Transiciones y animaciones fluidas
   - Modo oscuro/claro adaptativo

2. **Funcionalidad Core**
   - CRUD completo de tareas
   - Marcado de tareas como completadas
   - Estadísticas en tiempo real
   - Búsqueda y filtrado (próxima versión)

3. **Calidad del Código**
   - Arquitectura limpia y mantenible
   - Separación de responsabilidades
   - Hooks personalizados reutilizables
   - TypeScript para type safety

### No-Objetivos

- Sincronización multi-dispositivo (por ahora)
- Colaboración en tiempo real
- Backend complejo o base de datos remota
- Autenticación de usuarios

## Diseño de Alto Nivel

### Stack Tecnológico

- **Framework**: Next.js 15.3.5 (App Router)
- **UI Library**: React 19
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: Radix UI + shadcn/ui
- **Iconos**: Lucide React
- **Markdown**: react-markdown
- **Build**: Turbopack

### Arquitectura General

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   UI Components │ ──> │  Business Logic  │ ──> │  Data Storage   │
│   (React/TSX)   │     │    (Hooks)       │     │  (LocalStorage) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         ↑                       ↓                         ↓
         │                       ↓                         ↓
         │              ┌──────────────────┐              ↓
         └──────────────│      Utils       │←─────────────┘
                        │   (Helpers)      │
                        └──────────────────┘
```

## Arquitectura del Sistema

### Estructura de Directorios

```
src/
├── app/                  # Next.js App Router
│   ├── page.tsx         # Página principal
│   ├── layout.tsx       # Layout raíz
│   └── globals.css      # Estilos globales
├── components/          # Componentes React
│   ├── ui/             # Componentes base (shadcn/ui)
│   └── todo/           # Componentes específicos de Todo
├── hooks/              # Custom React Hooks
│   ├── useTodos.ts     # Lógica de gestión de todos
│   ├── useTheme.ts     # Gestión del tema
│   └── useTodoForm.ts  # Lógica del formulario
├── services/           # Capa de servicios
│   └── todo.service.ts # Operaciones de datos
├── types/              # TypeScript interfaces
│   └── todo.ts         # Tipos de Todo
├── utils/              # Utilidades
│   ├── theme.utils.ts  # Helpers de tema
│   └── todo.utils.ts   # Helpers de Todo
└── lib/                # Configuraciones
    └── utils.ts        # Utilidad cn()
```

### Flujo de Datos

1. **Componentes UI** → Emiten eventos de usuario
2. **Custom Hooks** → Procesan la lógica de negocio
3. **Services** → Gestionan la persistencia
4. **Utils** → Proveen funciones auxiliares
5. **State** → Se actualiza y re-renderiza UI

## Diseño Detallado

### Componentes Principales

#### TodoList
- Renderiza la lista de tareas
- Implementa animaciones de entrada/salida
- Maneja acciones de editar/eliminar/completar

#### TodoForm
- Modal para crear/editar tareas
- Validación de formularios
- Soporte para Markdown preview

#### Stats
- Muestra estadísticas en tiempo real
- Animaciones de contador
- Diseño responsivo

### Hooks Personalizados

#### useTodos
```typescript
interface UseTodosReturn {
  todos: Todo[]
  addTodo: (data: TodoFormData) => boolean
  updateTodo: (id: string, data: Partial<TodoFormData>) => boolean
  deleteTodo: (id: string) => void
  toggleComplete: (id: string) => void
  getStats: () => TodoStats
}
```

#### useTheme
```typescript
interface UseThemeReturn {
  darkMode: boolean
  toggleTheme: () => void
}
```

### Modelo de Datos

```typescript
interface Todo {
  id: string          // UUID único
  title: string       // Título de la tarea
  content: string     // Contenido en Markdown
  imageUrl?: string   // URL de imagen opcional
  completed: boolean  // Estado de completado
  createdAt: string   // Timestamp ISO
}
```

## Consideraciones

### Rendimiento

- **Lazy Loading**: Componentes pesados se cargan bajo demanda
- **Memoización**: Uso de `useMemo` y `useCallback` para optimizar re-renders
- **LocalStorage**: Operaciones asíncronas para no bloquear UI
- **Animaciones**: CSS transitions para mejor performance

### Seguridad

- **XSS Prevention**: Sanitización automática por React
- **Type Safety**: TypeScript previene errores en tiempo de compilación
- **Validación**: Inputs validados antes de procesamiento

### Accesibilidad

- **ARIA Labels**: Componentes con labels descriptivos
- **Keyboard Navigation**: Soporte completo de teclado
- **Focus Management**: Estados de focus visibles
- **Screen Reader**: Textos alternativos y roles semánticos

### Escalabilidad

- **Arquitectura Modular**: Fácil agregar nuevas características
- **Separación de Responsabilidades**: Lógica desacoplada de UI
- **Hooks Reutilizables**: Lógica compartible entre componentes

## Instalación y Configuración

### Requisitos Previos

- Node.js 18.x o superior
- npm 8.x o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/isaacsuazo-cit/test-todo-nextjs.git
cd test-todo-nextjs

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts Disponibles

```json
{
  "dev": "next dev --turbopack",    // Desarrollo con Turbopack
  "build": "next build",             // Build de producción
  "start": "next start",             // Servidor de producción
  "lint": "next lint"                // Linting del código
}
```

### Variables de Entorno

No se requieren variables de entorno para la versión actual.

## Despliegue

### GitHub Pages

La aplicación está configurada para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

### Configuración de Next.js para GitHub Pages

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  basePath: '/test-todo-nextjs',
  images: {
    unoptimized: true
  }
}
```

## Pruebas

### Estrategia de Pruebas

1. **Unit Tests**: Para hooks y utilidades
2. **Integration Tests**: Para flujos completos
3. **E2E Tests**: Para casos de uso críticos

### Ejecución de Pruebas

```bash
# Próximamente
npm run test
npm run test:e2e
```

## Métricas de Éxito

### KPIs Técnicos

- **Performance Score**: > 90 en Lighthouse
- **Accessibility Score**: > 95 en Lighthouse
- **Build Time**: < 30 segundos
- **Bundle Size**: < 200KB gzipped

### KPIs de Usuario

- **Time to Interactive**: < 2 segundos
- **Operaciones CRUD**: < 100ms de respuesta
- **Animaciones**: 60 FPS constantes

## Roadmap

### v0.2.0 (Q1 2025)
- [ ] Búsqueda y filtrado de tareas
- [ ] Categorías y etiquetas
- [ ] Exportación de datos

### v0.3.0 (Q2 2025)
- [ ] Sincronización con backend
- [ ] Autenticación de usuarios
- [ ] Compartir listas

### v1.0.0 (Q3 2025)
- [ ] App móvil con React Native
- [ ] API pública
- [ ] Integraciones con terceros

## Contribuir

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Isaac Suazo - [@isaacsuazo-cit](https://github.com/isaacsuazo-cit)

Link del Proyecto: [https://github.com/isaacsuazo-cit/test-todo-nextjs](https://github.com/isaacsuazo-cit/test-todo-nextjs)