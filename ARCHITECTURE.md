# Todo for Devs - Arquitectura Limpia

## 📋 Descripción

Aplicación Todo moderna con arquitectura limpia siguiendo principios SOLID. Implementa separación de responsabilidades y código mantenible.

## 🏗️ Arquitectura

### Principios SOLID Aplicados

- **S** - Single Responsibility: Cada clase/hook tiene una responsabilidad específica
- **O** - Open/Closed: Servicios extensibles sin modificar código existente
- **L** - Liskov Substitution: Interfaces consistentes y predecibles
- **I** - Interface Segregation: Interfaces específicas por funcionalidad
- **D** - Dependency Inversion: Dependencias por abstracción, no por implementación

### Estructura de Carpetas

```
src/
├── app/
│   └── page.tsx              # Componente principal (orchestrator)
├── components/
│   └── todo/                 # Componentes específicos de UI
│       ├── Header.tsx        # Encabezado con controles
│       ├── Stats.tsx         # Estadísticas de todos
│       ├── TodoForm.tsx      # Formulario crear/editar
│       ├── TodoCard.tsx      # Tarjeta individual
│       └── TodoList.tsx      # Lista de todos
├── hooks/                    # Hooks personalizados (lógica de estado)
│   ├── useTodos.ts          # Estado y operaciones de todos
│   ├── useTheme.ts          # Estado del tema
│   └── useTodoForm.ts       # Estado del formulario
├── services/                 # Lógica de negocio
│   ├── storage.service.ts    # Persistencia localStorage
│   └── todo.service.ts       # Operaciones de todo
├── types/                    # Definiciones de tipos
│   └── todo.ts              # Interfaces principales
└── utils/                    # Utilidades
    └── theme.utils.ts        # Helpers de CSS/tema
```

## 🔧 Servicios

### TodoService
Maneja la lógica de negocio de los todos:
- `createTodo()` - Crea nuevo todo desde formulario
- `updateTodo()` - Actualiza todo existente
- `toggleComplete()` - Cambia estado completado
- `getStats()` - Calcula estadísticas
- `truncateContent()` - Trunca contenido largo

### StorageService
Responsable de la persistencia en localStorage:
- `TodoStorageService` - Maneja guardado/carga de todos
- `ThemeStorageService` - Maneja preferencias de tema

## 🎣 Hooks Personalizados

### useTodos
Hook principal para manejo de estado de todos:
- Carga inicial desde localStorage
- Operaciones CRUD (crear, leer, actualizar, eliminar)
- Persistencia automática
- Cálculo de estadísticas

### useTheme
Hook para manejo del tema de la aplicación:
- Estado del modo oscuro/claro
- Persistencia de preferencia
- Toggle entre temas

### useTodoForm
Hook para manejo del formulario:
- Estado del formulario (crear/editar)
- Validación básica
- Reset y actualización de campos

## 🎨 Componentes

### Header
Encabezado con título y controles principales:
- Toggle de tema
- Botón para abrir formulario
- Título animado

### Stats
Componente de estadísticas:
- Total de tareas
- Tareas completadas
- Tareas pendientes

### TodoForm
Formulario reutilizable para crear/editar:
- Validación de campos requeridos
- Soporte para Markdown
- Carga de imágenes opcionales

### TodoCard
Tarjeta individual de todo:
- Vista previa de contenido
- Acciones (editar, eliminar, completar)
- Expansión para contenido largo
- Animaciones de hover

### TodoList
Lista de todos con estado vacío:
- Grid responsivo
- Estado vacío con mensaje
- Animaciones escalonadas

## 🛠️ Utilidades

### ThemeUtils
Helpers para generar clases CSS dinámicas:
- Backgrounds según tema
- Clases de botones
- Estilos de tarjetas
- Inputs del formulario

## 🚀 Beneficios de la Arquitectura

1. **Mantenibilidad**: Código organizado y fácil de mantener
2. **Testabilidad**: Servicios y hooks fáciles de testear
3. **Reutilización**: Componentes y hooks reutilizables
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Separación de responsabilidades**: Cada archivo tiene un propósito específico
6. **Legibilidad**: Código autodocumentado y bien comentado

## 📦 Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Markdown** - Renderizado de markdown
- **Lucide React** - Iconos
- **shadcn/ui** - Componentes de UI

## 💡 Próximas Mejoras

- Tests unitarios para servicios y hooks
- Implementación de Context API para estado global
- Integración con base de datos externa
- PWA (Progressive Web App)
- Sincronización entre dispositivos
