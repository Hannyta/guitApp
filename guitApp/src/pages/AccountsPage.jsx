import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccounts } from '../hooks/useAccounts'
import { useTransactions } from '../hooks/useTransactions'
import { AccountForm } from '../components/accounts/AccountForm'
import { AccountIcon } from '../components/accounts/AccountIcon'
import { formatAmount } from '../lib/currency'

export function AccountsPage() {
  const navigate = useNavigate()
  const { accounts, loading: accountsLoading, addAccount } = useAccounts()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [showMobileForm, setShowMobileForm] = useState(false)

  const accountBalances = useMemo(
    () =>
      accounts.map((account) => ({
        account,
        balance: transactions
          .filter((t) => t.account_id === account.id)
          .reduce((sum, t) => sum + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)), 0),
      })),
    [accounts, transactions],
  )

  if (accountsLoading || transactionsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  return (
    <div className="categories-page">
      <div className={`account-form-wrapper${showMobileForm ? ' is-open' : ''}`}>
        <AccountForm onSubmit={addAccount} />
      </div>
      <button
        type="button"
        className="mobile-add-account-button"
        onClick={() => setShowMobileForm(true)}
      >
        + Agregar cuenta
      </button>
      <section className="accounts-section">
        <h2>Cuentas</h2>
        {accountBalances.length === 0 ? (
          <p className="empty-state">Todavía no tenés cuentas.</p>
        ) : (
          <ul className="entity-card-list">
            {accountBalances.map(({ account, balance }) => (
              <li
                className="entity-card entity-card-clickable"
                key={account.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/accounts/${account.id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') navigate(`/accounts/${account.id}`)
                }}
              >
                <span
                  className="category-icon-circle entity-card-icon"
                  style={{ backgroundColor: account.color }}
                >
                  <AccountIcon icon={account.icon} width={24} height={24} />
                </span>
                <div className="entity-card-info">
                  <span className="entity-card-name">{account.name}</span>
                  <span className="entity-card-meta">{account.currency}</span>
                </div>
                <strong className="entity-card-value">{formatAmount(balance, account.currency)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
