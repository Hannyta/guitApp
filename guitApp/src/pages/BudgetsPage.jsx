import { useMemo, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useBudgets } from '../hooks/useBudgets'
import { useTransactions } from '../hooks/useTransactions'
import { useTransactionsModal } from '../hooks/useTransactionsModal'
import { BudgetForm } from '../components/budgets/BudgetForm'
import { BudgetProgress } from '../components/budgets/BudgetProgress'
import { TransactionsModal } from '../components/shared/TransactionsModal'

export function BudgetsPage() {
  const { categories, loading: categoriesLoading } = useCategories()
  const { budgets, loading: budgetsLoading, upsertBudget, updateBudget, deleteBudget } = useBudgets()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [editingBudget, setEditingBudget] = useState(null)
  const { modalData, openTransactionsModal, closeTransactionsModal } = useTransactionsModal()

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

  function handleCategoryClick(category) {
    openTransactionsModal({
      title: category.name,
      badgeColor: category.color,
      transactions: transactions.filter((transaction) => transaction.category_id === category.id),
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
        <h2>Presupuestos</h2>
        <BudgetProgress
          budgets={budgets}
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
