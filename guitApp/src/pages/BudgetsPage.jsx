import { useMemo, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useBudgets } from '../hooks/useBudgets'
import { useTransactions } from '../hooks/useTransactions'
import { BudgetForm } from '../components/budgets/BudgetForm'
import { BudgetProgress } from '../components/budgets/BudgetProgress'

export function BudgetsPage() {
  const { categories, loading: categoriesLoading } = useCategories()
  const { budgets, loading: budgetsLoading, upsertBudget, updateBudget, deleteBudget } = useBudgets()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [editingBudget, setEditingBudget] = useState(null)

  const expenseCategories = useMemo(
    () => categories.filter((category) => category.type === 'expense'),
    [categories],
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
        <h2>Presupuestos</h2>
        <BudgetProgress
          budgets={budgets}
          transactions={transactions}
          onEdit={setEditingBudget}
          onDelete={deleteBudget}
        />
      </section>
    </div>
  )
}
