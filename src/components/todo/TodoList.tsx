import { Todo } from '@/types/todo'
import { TodoCard } from './TodoCard'

interface TodoListProps {
  todos: Todo[]
  darkMode: boolean
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

/** Componente que renderiza la lista de todos */
export const TodoList = ({ todos, darkMode, onEdit, onDelete, onToggleComplete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`text-6xl mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>📝</div>
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No todos yet
        </h3>
        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
          Create your first todo to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          darkMode={darkMode}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}
