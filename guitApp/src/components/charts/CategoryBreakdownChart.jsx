import '../../lib/chartSetup'
import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { chartTheme, useIsDarkMode } from '../../lib/chartTheme'
import { useCurrency } from '../../hooks/useCurrency'

export function CategoryBreakdownChart({ transactions }) {
  const isDark = useIsDarkMode()
  const theme = isDark ? chartTheme.dark : chartTheme.light
  const { format } = useCurrency()

  const { labels, values, colors, total } = useMemo(() => {
    const now = dayjs()
    const totalsByCategory = new Map()

    transactions
      .filter(
        (transaction) =>
          transaction.type === 'expense' &&
          dayjs(transaction.occurred_on).year() === now.year() &&
          dayjs(transaction.occurred_on).month() === now.month(),
      )
      .forEach((transaction) => {
        const key = transaction.category?.name ?? 'Sin categoría'
        const color = transaction.category?.color ?? '#898781'
        const current = totalsByCategory.get(key) ?? { amount: 0, color }
        current.amount += Number(transaction.amount)
        totalsByCategory.set(key, current)
      })

    const entries = Array.from(totalsByCategory.entries())
    return {
      labels: entries.map(([name]) => name),
      values: entries.map(([, value]) => value.amount),
      colors: entries.map(([, value]) => value.color),
      total: entries.reduce((sum, [, value]) => sum + value.amount, 0),
    }
  }, [transactions])

  if (labels.length === 0) {
    return <p className="empty-state">No hay gastos este mes todavía.</p>
  }

  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderColor: theme.surface,
            borderWidth: 2,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: theme.textSecondary, boxWidth: 12 },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0
                return ` ${context.label}: ${format(value)} (${percentage}%)`
              },
            },
          },
        },
      }}
    />
  )
}
