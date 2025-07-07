import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'
import { TodoStorageService } from '@/services/storage.service'
import { TodoService } from '@/services/todo.service'

/** Hook personalizado para manejar la lista de todos */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  /** Carga los todos desde localStorage al montar el componente */
  useEffect(() => {
    const savedTodos = TodoStorageService.loadTodos()
    setTodos(savedTodos)
  }, [])

  /** Guarda los todos en localStorage cada vez que cambian */
  useEffect(() => {
    TodoStorageService.saveTodos(todos)
  }, [todos])

  /** Añade un nuevo todo a la lista */
  const addTodo = (formData: { title: string; content: string; imageUrl: string }) => {
    if (!formData.title.trim()) return false
    
    const newTodo = TodoService.createTodo(formData)
    setTodos(prev => [newTodo, ...prev])
    return true
  }

  /** Actualiza un todo existente */
  const updateTodo = (todoId: string, formData: { title: string; content: string; imageUrl: string }) => {
    if (!formData.title.trim()) return false

    setTodos(prev => prev.map(todo => 
      todo.id === todoId ? TodoService.updateTodo(todo, formData) : todo
    ))
    return true
  }

  /** Elimina un todo por su ID */
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  /** Cambia el estado de completado de un todo */
  const toggleComplete = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? TodoService.toggleComplete(todo) : todo
    ))
  }

  /** Obtiene las estadísticas de los todos */
  const getStats = () => TodoService.getStats(todos)

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    getStats
  }
}
