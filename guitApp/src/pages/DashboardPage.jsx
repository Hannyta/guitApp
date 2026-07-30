import { useMemo } from 'react'
import dayjs from 'dayjs'
import { useTransactions } from '../hooks/useTransactions'
import { useBudgets } from '../hooks/useBudgets'
import { useCurrency } from '../hooks/useCurrency'
import { CategoryBreakdownChart } from '../components/charts/CategoryBreakdownChart'
import { MonthlyTrendChart } from '../components/charts/MonthlyTrendChart'
import { BudgetVsActualChart } from '../components/charts/BudgetVsActualChart'

export function DashboardPage() {
  const { transactions, loading: transactionsLoading } = useTransactions()
  const { budgets, loading: budgetsLoading } = useBudgets()
  const { format } = useCurrency()

  const summary = useMemo(() => {
    const now = dayjs()
    const currentMonthTransactions = transactions.filter(
      (t) => dayjs(t.occurred_on).year() === now.year() && dayjs(t.occurred_on).month() === now.month(),
    )
    const income = currentMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)
    const expense = currentMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    return { income, expense, balance: income - expense }
  }, [transactions])

  if (transactionsLoading || budgetsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  return (
    <div className="dashboard-page">
      <section className="summary-cards">
        <div className="summary-card">
          <span>Ingresos del mes</span>
          <strong className="amount-income">{format(summary.income)}</strong>
        </div>
        <div className="summary-card">
          <span>Gastos del mes</span>
          <strong className="amount-expense">{format(summary.expense)}</strong>
        </div>
        <div className="summary-card">
          <span>Balance</span>
          <strong className={summary.balance >= 0 ? 'amount-income' : 'amount-expense'}>
            {format(summary.balance)}
          </strong>
        </div>
      </section>

      <section className="chart-grid">
        <div className="chart-card">
          <h2>Gastos por categoría (mes actual)</h2>
          <CategoryBreakdownChart transactions={transactions} />
        </div>
        <div className="chart-card">
          <h2>Ingresos vs gastos (últimos 6 meses)</h2>
          <MonthlyTrendChart transactions={transactions} />
        </div>
        <div className="chart-card chart-card-wide">
          <h2>Presupuesto vs gasto real (mes actual)</h2>
          <BudgetVsActualChart budgets={budgets} transactions={transactions} />
        </div>
      </section>
    </div>
  )
}
