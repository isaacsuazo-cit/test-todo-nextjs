import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SimpleImage } from '@/components/ui/simple-image'
import { TodoFormData } from '@/types/todo'
import { ThemeUtils } from '@/utils/theme.utils'
import { ImageUtils } from '@/utils/image.utils'
import { ImageExamples } from '@/utils/image-examples.utils'

interface TodoFormProps {
  isOpen: boolean
  darkMode: boolean
  isEditing: boolean
  formData: TodoFormData
  onSubmit: () => void
  onCancel: () => void
  onFieldChange: (field: keyof TodoFormData, value: string) => void
  onOpenChange: (open: boolean) => void
}

/** Componente del formulario para crear/editar todos */
export const TodoForm = ({
  isOpen,
  darkMode,
  isEditing,
  formData,
  onSubmit,
  onCancel,
  onFieldChange,
  onOpenChange,
}: TodoFormProps) => {
  /** Determina si la URL de imagen es válida */
  const isImageValid = ImageUtils.isValidImageUrl(formData.imageUrl)
  const hasImageUrl = formData.imageUrl.trim().length > 0

  /** Usa una URL de ejemplo aleatoria */
  const handleUseExampleUrl = () => {
    const exampleUrl = ImageExamples.getRandomExampleUrl()
    onFieldChange('imageUrl', exampleUrl)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`${ThemeUtils.getDialogClasses(darkMode)} max-w-2xl max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
            {isEditing ? 'Edit Todo' : 'Add New Todo'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onFieldChange('title', e.target.value)}
              placeholder="Enter todo title..."
              className={`mt-1 ${ThemeUtils.getInputClasses(darkMode)}`}
            />
          </div>

          <div>
            <Label htmlFor="content" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
              Content (Markdown supported)
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => onFieldChange('content', e.target.value)}
              placeholder="Enter todo content... You can use **markdown** here!"
              rows={6}
              className={`mt-1 ${ThemeUtils.getInputClasses(darkMode)}`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="imageUrl" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                Image URL (opcional)
              </Label>
              <Button
                type="button"
                onClick={handleUseExampleUrl}
                size="sm"
                variant="ghost"
                className={`text-xs ${
                  darkMode 
                    ? 'text-cyan-400 hover:bg-cyan-400/10' 
                    : 'text-purple-600 hover:bg-purple-600/10'
                }`}
              >
                Usar ejemplo
              </Button>
            </div>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => onFieldChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg o cualquier URL de imagen"
              className={`mt-1 ${ThemeUtils.getInputClasses(darkMode)} ${
                hasImageUrl && !isImageValid 
                  ? 'border-red-500 focus:border-red-500' 
                  : ''
              }`}
            />
            {hasImageUrl && !isImageValid && (
              <p className="text-red-500 text-sm mt-1">
                URL de imagen no válida
              </p>
            )}
            {hasImageUrl && isImageValid && (
              <p className="text-green-500 text-sm mt-1">
                ✓ URL de imagen válida - Acepta cualquier origen
              </p>
            )}
          </div>

          {hasImageUrl && (
            <div>
              <Label className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                Vista previa de imagen
              </Label>
              <div className="mt-2 relative w-full h-32 rounded-lg border overflow-hidden">
                <SimpleImage
                  src={formData.imageUrl}
                  alt={formData.title || "Vista previa"}
                  className=""
                  fallbackTitle={formData.title || "Vista previa"}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              onClick={onSubmit}
              className={`flex-1 ${
                darkMode
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500'
              } text-white`}
            >
              {isEditing ? 'Update Todo' : 'Add Todo'}
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className={
                darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
