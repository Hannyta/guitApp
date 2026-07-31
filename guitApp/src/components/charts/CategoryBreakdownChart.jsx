import '../../lib/chartSetup'
import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { chartTheme, useIsDarkMode } from '../../lib/chartTheme'
import { useCurrency } from '../../hooks/useCurrency'
import { isInPeriod } from '../../lib/dateHelpers'

export function CategoryBreakdownChart({ transactions, year, month, onCategorySelect }) {
  const isDark = useIsDarkMode()
  const theme = isDark ? chartTheme.dark : chartTheme.light
  const { format } = useCurrency()

  const { labels, values, colors, categories, total } = useMemo(() => {
    const totalsByCategory = new Map()

    transactions
      .filter(
        (transaction) => transaction.type === 'expense' && isInPeriod(transaction.occurred_on, year, month),
      )
      .forEach((transaction) => {
        const key = transaction.category_id ?? 'none'
        const current = totalsByCategory.get(key) ?? {
          id: transaction.category_id,
          name: transaction.category?.name ?? 'Sin categoría',
          color: transaction.category?.color ?? '#898781',
          type: 'expense',
          amount: 0,
        }
        current.amount += Number(transaction.amount)
        totalsByCategory.set(key, current)
      })

    const entries = Array.from(totalsByCategory.values())
    return {
      labels: entries.map((entry) => entry.name),
      values: entries.map((entry) => entry.amount),
      colors: entries.map((entry) => entry.color),
      categories: entries,
      total: entries.reduce((sum, entry) => sum + entry.amount, 0),
    }
  }, [transactions, year, month])

  if (labels.length === 0) {
    return <p className="empty-state">No hay gastos en este período.</p>
  }

  function handleSelect(index) {
    if (onCategorySelect && categories[index]) {
      onCategorySelect(categories[index])
    }
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
        onClick: (_event, elements) => {
          if (elements.length > 0) handleSelect(elements[0].index)
        },
        onHover: (event, elements) => {
          event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default'
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: theme.textSecondary, boxWidth: 12 },
            onClick: (_event, legendItem) => handleSelect(legendItem.index),
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0
                return ` ${context.label}: ${format(value)} (${percentage}%)`
              },
              footer: () => (onCategorySelect ? 'Click para ver los movimientos' : ''),
            },
          },
        },
      }}
    />
  )
}
