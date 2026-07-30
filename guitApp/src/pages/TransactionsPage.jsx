import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { TransactionList } from '../components/transactions/TransactionList'

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
          onEdit={setEditingTransaction}
          onDelete={deleteTransaction}
        />
      </section>
    </div>
  )
}
