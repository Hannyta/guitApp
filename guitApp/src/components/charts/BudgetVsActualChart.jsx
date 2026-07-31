import '../../lib/chartSetup'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { chartTheme, statusColors, useIsDarkMode } from '../../lib/chartTheme'
import { useCurrency } from '../../hooks/useCurrency'
import { isInPeriod } from '../../lib/dateHelpers'

export function BudgetVsActualChart({ budgets, transactions, year, month, onCategorySelect }) {
  const isDark = useIsDarkMode()
  const theme = isDark ? chartTheme.dark : chartTheme.light
  const { format } = useCurrency()

  const { labels, budgetAmounts, spentAmounts, spentColors, categories } = useMemo(() => {
    // En modo "año" (month = null) sumamos todos los presupuestos mensuales
    // de cada categoría en ese año, en vez de esperar un único presupuesto.
    const relevantBudgets = budgets.filter(
      (budget) => budget.year === year && (month == null || budget.month === month),
    )

    const rowsByCategory = new Map()
    relevantBudgets.forEach((budget) => {
      const key = budget.category_id
      const current = rowsByCategory.get(key) ?? {
        name: budget.category?.name ?? 'Sin categoría',
        category: budget.category,
        budgetAmount: 0,
      }
      current.budgetAmount += Number(budget.amount)
      rowsByCategory.set(key, current)
    })

    const rows = Array.from(rowsByCategory.entries()).map(([categoryId, row]) => {
      const spent = transactions
        .filter(
          (transaction) =>
            transaction.category_id === categoryId &&
            transaction.type === 'expense' &&
            isInPeriod(transaction.occurred_on, year, month),
        )
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

      return {
        ...row,
        spent,
        color: spent > row.budgetAmount ? statusColors.critical : statusColors.good,
      }
    })

    return {
      labels: rows.map((row) => row.name),
      budgetAmounts: rows.map((row) => row.budgetAmount),
      spentAmounts: rows.map((row) => row.spent),
      spentColors: rows.map((row) => row.color),
      categories: rows.map((row) => row.category),
    }
  }, [budgets, transactions, year, month])

  if (labels.length === 0) {
    return <p className="empty-state">Define un presupuesto para este período para ver la comparación.</p>
  }

  function handleSelect(index) {
    if (onCategorySelect && categories[index]) {
      onCategorySelect(categories[index])
    }
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
        onClick: (_event, elements) => {
          if (elements.length > 0) handleSelect(elements[0].index)
        },
        onHover: (event, elements) => {
          event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default'
        },
        plugins: {
          legend: { position: 'bottom', labels: { color: theme.textSecondary, boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${format(context.parsed.y)}`,
              footer: () => (onCategorySelect ? 'Click para ver los movimientos' : ''),
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
