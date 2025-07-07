# Documentación de Funciones - Todo for Devs

## 📚 Servicios

### TodoService

#### `createTodo(formData: TodoFormData): Todo`
Crea un nuevo todo a partir de los datos del formulario
- `formData` - Datos del formulario (title, content, imageUrl)
- Retorna: Nuevo objeto Todo con ID único y timestamp

#### `updateTodo(todo: Todo, formData: TodoFormData): Todo`
Actualiza un todo existente con nuevos datos
- `todo` - Todo original a actualizar
- `formData` - Nuevos datos del formulario
- Retorna: Todo actualizado con nuevos datos

#### `toggleComplete(todo: Todo): Todo`
Cambia el estado de completado de un todo
- `todo` - Todo a modificar
- Retorna: Todo con estado completed invertido

#### `getStats(todos: Todo[]): { total: number; completed: number; pending: number }`
Calcula estadísticas de los todos
- `todos` - Array de todos para analizar
- Retorna: Objeto con total, completados y pendientes

#### `truncateContent(content: string, maxLength: number = 100): string`
Trunca el contenido si excede la longitud máxima
- `content` - Texto a truncar
- `maxLength` - Longitud máxima (default: 100)
- Retorna: Contenido truncado con "..." si es necesario

### TodoStorageService

#### `saveTodos(todos: Todo[]): void`
Guarda la lista de todos en localStorage
- `todos` - Array de todos a guardar

#### `loadTodos(): Todo[]`
Carga la lista de todos desde localStorage
- Retorna: Array de todos guardados o array vacío

### ThemeStorageService

#### `saveTheme(isDark: boolean): void`
Guarda la preferencia de tema oscuro en localStorage
- `isDark` - Estado del tema oscuro

#### `loadTheme(): boolean`
Carga la preferencia de tema desde localStorage
- Retorna: Estado del tema oscuro o false por defecto

## 🎣 Hooks

### useTodos()

#### Retorna objeto con:
- `todos: Todo[]` - Lista actual de todos
- `addTodo(formData): boolean` - Añade nuevo todo, retorna éxito
- `updateTodo(todoId, formData): boolean` - Actualiza todo, retorna éxito
- `deleteTodo(id): void` - Elimina todo por ID
- `toggleComplete(id): void` - Cambia estado de completado
- `getStats(): StatsObject` - Obtiene estadísticas actuales

### useTheme()

#### Retorna objeto con:
- `darkMode: boolean` - Estado actual del tema oscuro
- `toggleTheme(): void` - Alterna entre tema claro y oscuro

### useTodoForm()

#### Retorna objeto con:
- `isFormOpen: boolean` - Estado de apertura del formulario
- `editingTodo: Todo | null` - Todo siendo editado o null
- `formData: TodoFormData` - Datos actuales del formulario
- `openCreateForm(): void` - Abre formulario para crear
- `openEditForm(todo): void` - Abre formulario para editar
- `resetForm(): void` - Reinicia formulario
- `updateField(field, value): void` - Actualiza campo específico
- `setIsFormOpen(open): void` - Controla apertura del formulario

## 🎨 Componentes

### Header

#### Props:
- `darkMode: boolean` - Estado del tema oscuro
- `onToggleTheme: () => void` - Callback para cambiar tema
- `onOpenForm: () => void` - Callback para abrir formulario

### Stats

#### Props:
- `darkMode: boolean` - Estado del tema oscuro
- `total: number` - Total de tareas
- `completed: number` - Tareas completadas
- `pending: number` - Tareas pendientes

### TodoForm

#### Props:
- `isOpen: boolean` - Estado de apertura del diálogo
- `darkMode: boolean` - Estado del tema oscuro
- `isEditing: boolean` - Si está en modo edición
- `formData: TodoFormData` - Datos del formulario
- `onSubmit: () => void` - Callback al enviar formulario
- `onCancel: () => void` - Callback al cancelar
- `onFieldChange: (field, value) => void` - Callback cambio de campo
- `onOpenChange: (open) => void` - Callback cambio de apertura

### TodoCard

#### Props:
- `todo: Todo` - Datos del todo a mostrar
- `darkMode: boolean` - Estado del tema oscuro
- `index: number` - Índice para animación escalonada
- `onEdit: (todo) => void` - Callback para editar
- `onDelete: (id) => void` - Callback para eliminar
- `onToggleComplete: (id) => void` - Callback para completar

### TodoList

#### Props:
- `todos: Todo[]` - Lista de todos a mostrar
- `darkMode: boolean` - Estado del tema oscuro
- `onEdit: (todo) => void` - Callback para editar
- `onDelete: (id) => void` - Callback para eliminar
- `onToggleComplete: (id) => void` - Callback para completar

## 🛠️ Utilidades

### ThemeUtils

#### `getMainBackground(isDark: boolean): string`
Genera clases para el fondo principal de la aplicación
- `isDark` - Estado del tema oscuro
- Retorna: String con clases CSS del fondo

#### `getTitleClasses(isDark: boolean): string`
Genera clases para el título principal
- `isDark` - Estado del tema oscuro
- Retorna: String con clases CSS del título

#### `getThemeButtonClasses(isDark: boolean): string`
Genera clases para el botón de tema
- `isDark` - Estado del tema oscuro
- Retorna: String con clases CSS del botón

#### `getAddButtonClasses(isDark: boolean): string`
Genera clases para el botón principal de agregar
- `isDark` - Estado del tema oscuro
- Retorna: String con clases CSS del botón

#### `getStatsCardClasses(isDark: boolean, color: 'cyan' | 'green' | 'pink'): string`
Genera clases para las tarjetas de estadísticas
- `isDark` - Estado del tema oscuro
- `color` - Color de la tarjeta
- Retorna: String con clases CSS de la tarjeta

#### `getDialogClasses(isDark: boolean): string`
Genera clases para el contenido del diálogo
- `isDark` - Estado del tema oscuro
- Retorna: String con clases CSS del diálogo

#### `getInputClasses(isDark: boolean): string`
Genera clases para los inputs del formulario
- `isDark` - Estado del tema oscuro
- Retorna: String con clases CSS de los inputs

## 📝 Tipos

### Todo
```typescript
interface Todo {
  id: string          // ID único del todo
  title: string       // Título del todo
  content: string     // Contenido en markdown
  imageUrl?: string   // URL de imagen opcional
  completed: boolean  // Estado de completado
  createdAt: string   // Timestamp de creación
}
```

### TodoFormData
```typescript
interface TodoFormData {
  title: string      // Título del formulario
  content: string    // Contenido del formulario
  imageUrl: string   // URL de imagen del formulario
}
```

### ThemeMode
```typescript
type ThemeMode = 'light' | 'dark'  // Tipo para el tema
```
