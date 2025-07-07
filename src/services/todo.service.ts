import { Todo, TodoFormData } from '@/types/todo'

/** Servicio que maneja la lógica de negocio de los todos */
export class TodoService {
  /** Crea un nuevo todo a partir de los datos del formulario */
  static createTodo(formData: TodoFormData): Todo {
    return {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      imageUrl: formData.imageUrl || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    }
  }

  /** Actualiza un todo existente con nuevos datos */
  static updateTodo(todo: Todo, formData: TodoFormData): Todo {
    return {
      ...todo,
      title: formData.title,
      content: formData.content,
      imageUrl: formData.imageUrl || undefined,
    }
  }

  /** Cambia el estado de completado de un todo */
  static toggleComplete(todo: Todo): Todo {
    return { ...todo, completed: !todo.completed }
  }

  /** Calcula estadísticas de los todos */
  static getStats(todos: Todo[]): { total: number; completed: number; pending: number } {
    const completed = todos.filter(todo => todo.completed).length
    return {
      total: todos.length,
      completed,
      pending: todos.length - completed
    }
  }

  /** Trunca el contenido si excede la longitud máxima */
  static truncateContent(content: string, maxLength: number = 100): string {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content
  }
}
