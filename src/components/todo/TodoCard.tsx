import { Trash2, Edit3, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SimpleImage } from '@/components/ui/simple-image'
import ReactMarkdown from 'react-markdown'
import { Todo } from '@/types/todo'
import { TodoService } from '@/services/todo.service'

interface TodoCardProps {
  todo: Todo
  darkMode: boolean
  index: number
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

/** Componente que renderiza una tarjeta individual de todo */
export const TodoCard = ({
  todo,
  darkMode,
  index,
  onEdit,
  onDelete,
  onToggleComplete,
}: TodoCardProps) => {
  const truncatedContent = TodoService.truncateContent(todo.content, 100)
  const hasLongContent = todo.content.length > 100

  return (
    <Card
      className={`group transition-all duration-500 hover:scale-105 hover:rotate-1 ${
        darkMode
          ? 'bg-gray-800/70 border-gray-700 backdrop-blur-sm hover:border-cyan-400/50'
          : 'bg-white/80 border-gray-200 backdrop-blur-sm hover:border-purple-400/50'
      } ${todo.completed ? 'opacity-75' : ''}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle
            className={`text-lg font-bold ${
              todo.completed
                ? `line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`
                : darkMode
                  ? 'text-white'
                  : 'text-gray-900'
            } transition-all duration-300`}
          >
            {todo.title}
          </CardTitle>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={(e) => {
                e.stopPropagation() // Previene propagación del evento
                onEdit(todo)
              }}
              size="sm"
              variant="ghost"
              className={`h-8 w-8 p-0 ${
                darkMode ? 'hover:bg-blue-500/20 text-blue-400' : 'hover:bg-blue-500/20 text-blue-600'
              }`}
              title="Editar todo" // Tooltip para accesibilidad
            >
              <Edit3 className="h-4 w-4" />
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation() // Previene propagación del evento
                onDelete(todo.id)
              }}
              size="sm"
              variant="ghost"
              className={`h-8 w-8 p-0 ${
                darkMode ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-500/20 text-red-600'
              }`}
              title="Eliminar todo" // Tooltip para accesibilidad
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {todo.imageUrl && (
          <div className="relative w-full h-32 rounded-lg overflow-hidden">
            <SimpleImage
              src={todo.imageUrl}
              alt={todo.title}
              className="transition-transform duration-300 group-hover:scale-110"
              fallbackTitle={todo.title}
            />
          </div>
        )}

        {todo.content && (
          <div
            className={`prose prose-sm max-w-none ${
              darkMode ? 'prose-invert prose-headings:text-gray-200 prose-p:text-gray-300' : 'prose-gray'
            }`}
          >
            <ReactMarkdown>{truncatedContent}</ReactMarkdown>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            onClick={() => onToggleComplete(todo.id)}
            variant={todo.completed ? 'default' : 'outline'}
            size="sm"
            className={`transition-all duration-300 ${
              todo.completed
                ? darkMode
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : 'bg-green-600 hover:bg-green-500 text-white'
                : darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {todo.completed ? 'Completed' : 'Mark Complete'}
          </Button>

          {hasLongContent && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className={
                    darkMode ? 'text-cyan-400 hover:bg-cyan-400/10' : 'text-purple-600 hover:bg-purple-600/10'
                  }
                >
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Expand
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} max-w-4xl max-h-[80vh] overflow-y-auto`}
              >
                <DialogHeader>
                  <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl`}>
                    {todo.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  {todo.imageUrl && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <SimpleImage
                        src={todo.imageUrl}
                        alt={todo.title}
                        className=""
                        fallbackTitle={todo.title}
                      />
                    </div>
                  )}

                  <div
                    className={`prose max-w-none ${
                      darkMode
                        ? 'prose-invert prose-headings:text-gray-200 prose-p:text-gray-300'
                        : 'prose-gray'
                    }`}
                  >
                    <ReactMarkdown>{todo.content}</ReactMarkdown>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
