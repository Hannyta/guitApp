import { useMemo, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { useTransactionsModal } from '../hooks/useTransactionsModal'
import { usePeriodSelector } from '../hooks/usePeriodSelector'
import { availableMonthsFromTransactions, availableYearsFromTransactions, isInPeriod } from '../lib/dateHelpers'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { TransactionList } from '../components/transactions/TransactionList'
import { TransactionsModal } from '../components/shared/TransactionsModal'
import { PeriodSelector } from '../components/shared/PeriodSelector'

export function TransactionsPage() {
  const { categories, loading: categoriesLoading } = useCategories()
  const {
    transactions,
    loading: transactionsLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const { modalData, openTransactionsModal, closeTransactionsModal } = useTransactionsModal()

  const availableMonths = useMemo(() => availableMonthsFromTransactions(transactions), [transactions])
  const availableYears = useMemo(() => availableYearsFromTransactions(transactions), [transactions])
  const period = usePeriodSelector(availableMonths, availableYears)
  const { activePeriod } = period

  const filteredTransactions = useMemo(
    () => transactions.filter((t) => isInPeriod(t.occurred_on, activePeriod.year, activePeriod.month)),
    [transactions, activePeriod.year, activePeriod.month],
  )

  if (categoriesLoading || transactionsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  async function handleSubmit({ id, ...values }) {
    if (id) {
      await updateTransaction(id, values)
      setEditingTransaction(null)
    } else {
      await addTransaction(values)
    }
  }

  function handleCategoryClick(category) {
    openTransactionsModal({
      title: `${category.name} · ${activePeriod.label}`,
      badgeColor: category.color,
      transactions: filteredTransactions.filter((transaction) => transaction.category_id === category.id),
    })
  }

  return (
    <div className="transactions-page">
      <TransactionForm
        key={editingTransaction?.id ?? 'new'}
        categories={categories}
        onSubmit={handleSubmit}
        editingTransaction={editingTransaction}
        onCancel={() => setEditingTransaction(null)}
      />
      <section className="transactions-section">
        <div className="section-header">
          <h2>Historial</h2>
          <PeriodSelector period={period} />
        </div>
        <TransactionList
          transactions={filteredTransactions}
          onCategoryClick={handleCategoryClick}
          onEdit={setEditingTransaction}
          onDelete={deleteTransaction}
        />
      </section>
      {modalData && <TransactionsModal {...modalData} onClose={closeTransactionsModal} />}
    </div>
  )
}
