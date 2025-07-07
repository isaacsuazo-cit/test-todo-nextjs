import { Card, CardContent } from '@/components/ui/card'
import { ThemeUtils } from '@/utils/theme.utils'

interface StatsProps {
  darkMode: boolean
  total: number
  completed: number
  pending: number
}

/** Componente que muestra las estadísticas de los todos */
export const Stats = ({ darkMode, total, completed, pending }: StatsProps) => {
  const statsData = [
    { value: total, label: 'Total Tasks', color: 'cyan' as const },
    { value: completed, label: 'Completed', color: 'green' as const },
    { value: pending, label: 'Pending', color: 'pink' as const },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statsData.map(({ value, label, color }) => (
        <Card key={label} className={ThemeUtils.getStatsCardClasses(darkMode, color)}>
          <CardContent className="p-4">
            <div className={`text-2xl font-bold ${darkMode ? `text-${color}-400` : `text-${color}-600`}`}>
              {value}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
