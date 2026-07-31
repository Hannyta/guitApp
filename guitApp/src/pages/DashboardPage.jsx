import { useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useBudgets } from '../hooks/useBudgets'
import { useCurrency } from '../hooks/useCurrency'
import { useTransactionsModal } from '../hooks/useTransactionsModal'
import { usePeriodSelector } from '../hooks/usePeriodSelector'
import { availableMonthsFromTransactions, availableYearsFromTransactions, isInPeriod } from '../lib/dateHelpers'
import { CategoryBreakdownChart } from '../components/charts/CategoryBreakdownChart'
import { MonthlyTrendChart } from '../components/charts/MonthlyTrendChart'
import { BudgetVsActualChart } from '../components/charts/BudgetVsActualChart'
import { TransactionsModal } from '../components/shared/TransactionsModal'
import { PeriodSelector } from '../components/shared/PeriodSelector'

export function DashboardPage() {
  const { transactions, loading: transactionsLoading } = useTransactions()
  const { budgets, loading: budgetsLoading } = useBudgets()
  const { format } = useCurrency()
  const { modalData, openTransactionsModal, closeTransactionsModal } = useTransactionsModal()

  const availableMonths = useMemo(() => availableMonthsFromTransactions(transactions), [transactions])
  const availableYears = useMemo(() => availableYearsFromTransactions(transactions), [transactions])
  const period = usePeriodSelector(availableMonths, availableYears)
  const { activePeriod } = period

  const summary = useMemo(() => {
    const periodTransactions = transactions.filter((t) =>
      isInPeriod(t.occurred_on, activePeriod.year, activePeriod.month),
    )
    const incomeTransactions = periodTransactions.filter((t) => t.type === 'income')
    const expenseTransactions = periodTransactions.filter((t) => t.type === 'expense')
    const income = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const expense = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0)

    return { income, expense, balance: income - expense, incomeTransactions, expenseTransactions }
  }, [transactions, activePeriod.year, activePeriod.month])

  if (transactionsLoading || budgetsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  function handleCategorySelect(category) {
    openTransactionsModal({
      title: `${category.name} · ${activePeriod.label}`,
      badgeColor: category.color,
      transactions: transactions.filter(
        (transaction) =>
          transaction.category_id === category.id &&
          isInPeriod(transaction.occurred_on, activePeriod.year, activePeriod.month),
      ),
    })
  }

  const periodNoun = period.periodMode === 'month' ? 'mes' : 'año'

  return (
    <div className="dashboard-page">
      <div className="dashboard-toolbar">
        <PeriodSelector period={period} />
      </div>

      <section className="summary-cards">
        <button
          type="button"
          className="summary-card"
          onClick={() =>
            openTransactionsModal({
              title: `Ingresos · ${activePeriod.label}`,
              badgeColor: 'var(--income)',
              transactions: summary.incomeTransactions,
            })
          }
        >
          <span>Ingresos del {periodNoun}</span>
          <strong className="amount-income">{format(summary.income)}</strong>
        </button>
        <button
          type="button"
          className="summary-card"
          onClick={() =>
            openTransactionsModal({
              title: `Gastos · ${activePeriod.label}`,
              badgeColor: 'var(--expense)',
              transactions: summary.expenseTransactions,
            })
          }
        >
          <span>Gastos del {periodNoun}</span>
          <strong className="amount-expense">{format(summary.expense)}</strong>
        </button>
        <div className="summary-card summary-card-static">
          <span>Balance</span>
          <strong className={summary.balance >= 0 ? 'amount-income' : 'amount-expense'}>
            {format(summary.balance)}
          </strong>
        </div>
      </section>

      <section className="chart-grid">
        <div className="chart-card">
          <h2>
            Gastos por categoría <span className="chart-period">· {activePeriod.label}</span>
          </h2>
          <CategoryBreakdownChart
            transactions={transactions}
            year={activePeriod.year}
            month={activePeriod.month}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        <div className="chart-card">
          <h2>Ingresos vs gastos (últimos 6 meses)</h2>
          <MonthlyTrendChart transactions={transactions} />
        </div>
        <div className="chart-card chart-card-wide">
          <h2>
            Presupuesto vs gasto real <span className="chart-period">· {activePeriod.label}</span>
          </h2>
          <BudgetVsActualChart
            budgets={budgets}
            transactions={transactions}
            year={activePeriod.year}
            month={activePeriod.month}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>
      {modalData && <TransactionsModal {...modalData} onClose={closeTransactionsModal} />}
    </div>
  )
}
