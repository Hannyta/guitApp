import '../../lib/chartSetup'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { chartTheme, statusColors, useIsDarkMode } from '../../lib/chartTheme'
import { useCurrency } from '../../hooks/useCurrency'

export function BudgetVsActualChart({ budgets, transactions }) {
  const isDark = useIsDarkMode()
  const theme = isDark ? chartTheme.dark : chartTheme.light
  const { format } = useCurrency()

  const { labels, budgetAmounts, spentAmounts, spentColors } = useMemo(() => {
    const now = dayjs()
    const currentBudgets = budgets.filter(
      (budget) => budget.year === now.year() && budget.month === now.month() + 1,
    )

    const rows = currentBudgets.map((budget) => {
      const spent = transactions
        .filter(
          (transaction) =>
            transaction.category_id === budget.category_id &&
            transaction.type === 'expense' &&
            dayjs(transaction.occurred_on).year() === budget.year &&
            dayjs(transaction.occurred_on).month() + 1 === budget.month,
        )
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

      return {
        name: budget.category?.name ?? 'Sin categoría',
        budgetAmount: Number(budget.amount),
        spent,
        color: spent > Number(budget.amount) ? statusColors.critical : statusColors.good,
      }
    })

    return {
      labels: rows.map((row) => row.name),
      budgetAmounts: rows.map((row) => row.budgetAmount),
      spentAmounts: rows.map((row) => row.spent),
      spentColors: rows.map((row) => row.color),
    }
  }, [budgets, transactions])

  if (labels.length === 0) {
    return <p className="empty-state">Define un presupuesto para este mes para ver la comparación.</p>
  }

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: 'Presupuesto',
            data: budgetAmounts,
            backgroundColor: theme.baseline,
          },
          {
            label: 'Gastado',
            data: spentAmounts,
            backgroundColor: spentColors,
          },
        ],
      }}
      options={{
        plugins: {
          legend: { position: 'bottom', labels: { color: theme.textSecondary, boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${format(context.parsed.y)}`,
            },
          },
        },
        scales: {
          x: { ticks: { color: theme.muted }, grid: { display: false } },
          y: { ticks: { color: theme.muted }, grid: { color: theme.gridline }, beginAtZero: true },
        },
      }}
    />
  )
}
