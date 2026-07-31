import { useMemo, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useBudgets } from '../hooks/useBudgets'
import { useTransactions } from '../hooks/useTransactions'
import { useTransactionsModal } from '../hooks/useTransactionsModal'
import { usePeriodSelector } from '../hooks/usePeriodSelector'
import { availableMonthsFromBudgets, availableYearsFromBudgets, isInPeriod } from '../lib/dateHelpers'
import { BudgetForm } from '../components/budgets/BudgetForm'
import { BudgetProgress } from '../components/budgets/BudgetProgress'
import { TransactionsModal } from '../components/shared/TransactionsModal'
import { PeriodSelector } from '../components/shared/PeriodSelector'

export function BudgetsPage() {
  const { categories, loading: categoriesLoading } = useCategories()
  const { budgets, loading: budgetsLoading, upsertBudget, updateBudget, deleteBudget } = useBudgets()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [editingBudget, setEditingBudget] = useState(null)
  const { modalData, openTransactionsModal, closeTransactionsModal } = useTransactionsModal()

  const availableMonths = useMemo(() => availableMonthsFromBudgets(budgets), [budgets])
  const availableYears = useMemo(() => availableYearsFromBudgets(budgets), [budgets])
  const period = usePeriodSelector(availableMonths, availableYears)
  const { activePeriod } = period

  const expenseCategories = useMemo(
    () => categories.filter((category) => category.type === 'expense'),
    [categories],
  )

  const filteredBudgets = useMemo(
    () =>
      budgets.filter(
        (budget) => budget.year === activePeriod.year && (activePeriod.month == null || budget.month === activePeriod.month),
      ),
    [budgets, activePeriod.year, activePeriod.month],
  )

  if (categoriesLoading || budgetsLoading || transactionsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  async function handleSubmit({ id, ...values }) {
    if (id) {
      await updateBudget(id, values)
      setEditingBudget(null)
    } else {
      await upsertBudget(values)
    }
  }

  function handleCategoryClick(category) {
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

  return (
    <div className="budgets-page">
      <BudgetForm
        key={editingBudget?.id ?? 'new'}
        categories={expenseCategories}
        onSubmit={handleSubmit}
        editingBudget={editingBudget}
        onCancel={() => setEditingBudget(null)}
      />
      <section className="budgets-section">
        <div className="section-header">
          <h2>Presupuestos</h2>
          <PeriodSelector period={period} />
        </div>
        <BudgetProgress
          budgets={filteredBudgets}
          transactions={transactions}
          onCategoryClick={handleCategoryClick}
          onEdit={setEditingBudget}
          onDelete={deleteBudget}
        />
      </section>
      {modalData && <TransactionsModal {...modalData} onClose={closeTransactionsModal} />}
    </div>
  )
}
