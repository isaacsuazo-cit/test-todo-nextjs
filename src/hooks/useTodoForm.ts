import { useState } from 'react'
import { Todo, TodoFormData } from '@/types/todo'

/** Hook personalizado para manejar el formulario de todos */
export const useTodoForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    content: '',
    imageUrl: '',
  })

  /** Abre el formulario para crear un nuevo todo */
  const openCreateForm = () => {
    resetForm()
    setIsFormOpen(true)
  }

  /** Abre el formulario para editar un todo existente */
  const openEditForm = (todo: Todo) => {
    setEditingTodo(todo)
    setFormData({
      title: todo.title,
      content: todo.content,
      imageUrl: todo.imageUrl || '',
    })
    setIsFormOpen(true) // ¡Esta línea faltaba!
  }

  /** Reinicia el formulario a su estado inicial */
  const resetForm = () => {
    setFormData({ title: '', content: '', imageUrl: '' })
    setEditingTodo(null)
    setIsFormOpen(false)
  }

  /** Actualiza un campo específico del formulario */
  const updateField = (field: keyof TodoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return {
    isFormOpen,
    editingTodo,
    formData,
    openCreateForm,
    openEditForm,
    resetForm,
    updateField,
    setIsFormOpen
  }
}
