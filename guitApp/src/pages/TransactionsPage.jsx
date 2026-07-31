import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { useTransactionsModal } from '../hooks/useTransactionsModal'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { TransactionList } from '../components/transactions/TransactionList'
import { TransactionsModal } from '../components/shared/TransactionsModal'

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
      title: category.name,
      badgeColor: category.color,
      transactions: transactions.filter((transaction) => transaction.category_id === category.id),
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
        <h2>Historial</h2>
        <TransactionList
          transactions={transactions}
          onCategoryClick={handleCategoryClick}
          onEdit={setEditingTransaction}
          onDelete={deleteTransaction}
        />
      </section>
      {modalData && <TransactionsModal {...modalData} onClose={closeTransactionsModal} />}
    </div>
  )
}
