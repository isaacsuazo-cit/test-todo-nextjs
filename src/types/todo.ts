/** Interface que define la estructura de un Todo */
export interface Todo {
  id: string
  title: string
  content: string
  imageUrl?: string
  completed: boolean
  createdAt: string
}

/** Interface para los datos del formulario de Todo */
export interface TodoFormData {
  title: string
  content: string
  imageUrl: string
}

/** Tipo para el estado del tema */
export type ThemeMode = 'light' | 'dark'
