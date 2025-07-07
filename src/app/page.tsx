"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Header } from "@/components/todo/Header"
import { Stats } from "@/components/todo/Stats"
import { TodoForm } from "@/components/todo/TodoForm"
import { TodoList } from "@/components/todo/TodoList"
import { useTodos } from "@/hooks/useTodos"
import { useTheme } from "@/hooks/useTheme"
import { useTodoForm } from "@/hooks/useTodoForm"
import { ThemeUtils } from "@/utils/theme.utils"

/**
 * Componente principal de la aplicación Todo for Devs
 * Implementa arquitectura limpia con separación de responsabilidades
 */
export default function TodoForDevs() {
  // Hooks personalizados que encapsulan la lógica de negocio
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, getStats } = useTodos()
  const { darkMode, toggleTheme } = useTheme()
  const {
    isFormOpen,
    editingTodo,
    formData,
    openCreateForm,
    openEditForm,
    resetForm,
    updateField,
    setIsFormOpen
  } = useTodoForm()

  /** Maneja el envío del formulario (crear o actualizar) */
  const handleFormSubmit = () => {
    const success = editingTodo 
      ? updateTodo(editingTodo.id, formData)
      : addTodo(formData)
    
    if (success) {
      resetForm()
    }
  }

  const stats = getStats()

  return (
    <div className={`min-h-screen transition-all duration-500 ${ThemeUtils.getMainBackground(darkMode)}`}>
      <div className="container mx-auto px-4 py-8">
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Header 
              darkMode={darkMode} 
              onToggleTheme={toggleTheme} 
              onOpenForm={openCreateForm} 
            />
          </DialogTrigger>
          
          <TodoForm
            isOpen={isFormOpen}
            darkMode={darkMode}
            isEditing={!!editingTodo}
            formData={formData}
            onSubmit={handleFormSubmit}
            onCancel={resetForm}
            onFieldChange={updateField}
            onOpenChange={setIsFormOpen}
          />
        </Dialog>

        <Stats 
          darkMode={darkMode}
          total={stats.total}
          completed={stats.completed}
          pending={stats.pending}
        />

        <TodoList
          todos={todos}
          darkMode={darkMode}
          onEdit={openEditForm}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
        />
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
