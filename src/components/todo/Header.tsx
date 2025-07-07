import { Plus, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeUtils } from '@/utils/theme.utils'

interface HeaderProps {
  darkMode: boolean
  onToggleTheme: () => void
  onOpenForm: () => void
}

/** Componente del encabezado principal con título y controles */
export const Header = ({ darkMode, onToggleTheme, onOpenForm }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className={ThemeUtils.getTitleClasses(darkMode)}>
        Todo for Devs
      </h1>

      <div className="flex items-center gap-4">
        <Button
          onClick={onToggleTheme}
          variant="outline"
          size="icon"
          className={ThemeUtils.getThemeButtonClasses(darkMode)}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button
          onClick={onOpenForm}
          className={ThemeUtils.getAddButtonClasses(darkMode)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Todo
        </Button>
      </div>
    </div>
  )
}
