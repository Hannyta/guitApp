import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAccounts } from '../hooks/useAccounts'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { useTransactionsModal } from '../hooks/useTransactionsModal'
import { formatAmount } from '../lib/currency'
import { AccountIcon } from '../components/accounts/AccountIcon'
import { AccountForm } from '../components/accounts/AccountForm'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { TransactionList } from '../components/transactions/TransactionList'
import { TransactionsModal } from '../components/shared/TransactionsModal'
import { PencilIcon } from '../components/icons/PencilIcon'
import { TrashIcon } from '../components/icons/TrashIcon'

export function AccountDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { accounts, loading: accountsLoading, updateAccount, deleteAccount } = useAccounts()
  const { categories, loading: categoriesLoading } = useCategories()
  const { transactions, loading: transactionsLoading, updateTransaction, deleteTransaction } = useTransactions()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [accountError, setAccountError] = useState(null)
  const { modalData, openTransactionsModal, closeTransactionsModal } = useTransactionsModal()

  const account = accounts.find((a) => a.id === id)

  const accountTransactions = useMemo(
    () => transactions.filter((t) => t.account_id === id),
    [transactions, id],
  )

  const balance = useMemo(
    () =>
      accountTransactions.reduce(
        (sum, t) => sum + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)),
        0,
      ),
    [accountTransactions],
  )

  if (accountsLoading || categoriesLoading || transactionsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  if (!account) {
    return (
      <div className="account-detail-page">
        <p className="empty-state">No encontramos esa cuenta.</p>
        <button type="button" className="secondary-button" onClick={() => navigate('/accounts')}>
          Volver a Cuentas
        </button>
      </div>
    )
  }

  async function handleSubmit({ id: transactionId, ...values }) {
    if (transactionId) {
      await updateTransaction(transactionId, values)
      setEditingTransaction(null)
    }
  }

  async function handleUpdateAccount({ id: accountId, ...values }) {
    await updateAccount(accountId, values)
    setIsEditingAccount(false)
  }

  async function handleDeleteAccount() {
    setIsDeletingAccount(false)
    setAccountError(null)
    try {
      await deleteAccount(account.id)
      navigate('/accounts')
    } catch {
      setAccountError(`No se pudo eliminar "${account.name}": puede tener movimientos asociados.`)
    }
  }

  function handleCategoryClick(category) {
    openTransactionsModal({
      title: `${category.name} · ${account.name}`,
      badgeColor: category.color,
      transactions: accountTransactions.filter((transaction) => transaction.category_id === category.id),
    })
  }

  return (
    <div className="account-detail-page">
      <button type="button" className="secondary-button account-detail-back" onClick={() => navigate('/accounts')}>
        ← Volver a Cuentas
      </button>

      {accountError && <p className="form-error">{accountError}</p>}

      <div className="account-detail-header">
        <span className="category-icon-circle account-detail-icon" style={{ backgroundColor: account.color }}>
          <AccountIcon icon={account.icon} width={32} height={32} />
        </span>
        <div className="account-detail-info">
          <h1>{account.name}</h1>
          <span className="entity-card-meta">{account.currency}</span>
        </div>
        <strong
          className={balance >= 0 ? 'account-detail-balance amount-income' : 'account-detail-balance amount-expense'}
        >
          {formatAmount(balance, account.currency)}
        </strong>
        <div className="row-actions">
          <button
            type="button"
            className="icon-button"
            aria-label={`Editar ${account.name}`}
            onClick={() => setIsEditingAccount((value) => !value)}
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            className="icon-button icon-button-danger"
            aria-label={`Eliminar ${account.name}`}
            onClick={() => setIsDeletingAccount(true)}
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {isEditingAccount && (
        <AccountForm editingAccount={account} onSubmit={handleUpdateAccount} onCancel={() => setIsEditingAccount(false)} />
      )}

      {editingTransaction && (
        <TransactionForm
          key={editingTransaction.id}
          categories={categories}
          accounts={accounts}
          onSubmit={handleSubmit}
          editingTransaction={editingTransaction}
          onCancel={() => setEditingTransaction(null)}
        />
      )}

      <section className="transactions-section">
        <div className="section-header">
          <h2>Movimientos</h2>
        </div>
        <TransactionList
          transactions={accountTransactions}
          onCategoryClick={handleCategoryClick}
          onEdit={setEditingTransaction}
          onDelete={deleteTransaction}
          showAccount={false}
        />
      </section>
      {modalData && <TransactionsModal {...modalData} onClose={closeTransactionsModal} />}
      {isDeletingAccount && (
        <ConfirmDialog
          title="Eliminar cuenta"
          message={`¿Eliminar la cuenta "${account.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDeleteAccount}
          onCancel={() => setIsDeletingAccount(false)}
        />
      )}
    </div>
  )
}
