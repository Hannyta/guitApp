import '../../lib/chartSetup'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { chartTheme, useIsDarkMode } from '../../lib/chartTheme'
import { isSameMonth, lastNMonths } from '../../lib/dateHelpers'
import { useCurrency } from '../../hooks/useCurrency'

const INCOME_COLOR = '#0ea968'
const EXPENSE_COLOR = '#e34948'

export function MonthlyTrendChart({ transactions }) {
  const isDark = useIsDarkMode()
  const theme = isDark ? chartTheme.dark : chartTheme.light
  const { format } = useCurrency()

  const { labels, income, expense } = useMemo(() => {
    const months = lastNMonths(6)
    return {
      labels: months.map((month) => month.label),
      income: months.map(({ year, month }) =>
        transactions
          .filter((t) => t.type === 'income' && isSameMonth(t.occurred_on, year, month))
          .reduce((sum, t) => sum + Number(t.amount), 0),
      ),
      expense: months.map(({ year, month }) =>
        transactions
          .filter((t) => t.type === 'expense' && isSameMonth(t.occurred_on, year, month))
          .reduce((sum, t) => sum + Number(t.amount), 0),
      ),
    }
  }, [transactions])

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Ingresos',
            data: income,
            borderColor: INCOME_COLOR,
            backgroundColor: INCOME_COLOR,
            borderWidth: 2,
            pointRadius: 4,
            tension: 0.25,
          },
          {
            label: 'Gastos',
            data: expense,
            borderColor: EXPENSE_COLOR,
            backgroundColor: EXPENSE_COLOR,
            borderWidth: 2,
            pointRadius: 4,
            tension: 0.25,
          },
        ],
      }}
      options={{
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom', labels: { color: theme.textSecondary, boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${format(context.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: theme.muted },
            grid: { color: theme.gridline },
          },
          y: {
            ticks: { color: theme.muted },
            grid: { color: theme.gridline },
            beginAtZero: true,
          },
        },
      }}
    />
  )
}
