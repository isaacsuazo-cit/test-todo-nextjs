import { Todo } from '@/types/todo'

/** Servicio responsable de la persistencia de todos en localStorage */
export class TodoStorageService {
  private static readonly TODOS_KEY = 'todos-for-devs'
  
  /** Guarda la lista de todos en localStorage */
  static saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.TODOS_KEY, JSON.stringify(todos))
  }
  
  /** Carga la lista de todos desde localStorage */
  static loadTodos(): Todo[] {
    const saved = localStorage.getItem(this.TODOS_KEY)
    return saved ? JSON.parse(saved) : []
  }
}

/** Servicio responsable de la persistencia del tema en localStorage */
export class ThemeStorageService {
  private static readonly THEME_KEY = 'dark-mode-todos'
  
  /** Guarda la preferencia de tema oscuro en localStorage */
  static saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(isDark))
  }
  
  /** Carga la preferencia de tema desde localStorage */
  static loadTheme(): boolean {
    const saved = localStorage.getItem(this.THEME_KEY)
    return saved ? JSON.parse(saved) : false
  }
}
