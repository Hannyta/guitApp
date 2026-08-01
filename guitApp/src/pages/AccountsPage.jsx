import { useState } from 'react'
import { useAccounts } from '../hooks/useAccounts'
import { AccountForm } from '../components/accounts/AccountForm'
import { AccountBadge } from '../components/accounts/AccountBadge'
import { TrashIcon } from '../components/icons/TrashIcon'

export function AccountsPage() {
  const { accounts, loading, addAccount, deleteAccount } = useAccounts()
  const [deleteError, setDeleteError] = useState(null)

  if (loading) {
    return <p className="page-loading">Cargando...</p>
  }

  async function handleDelete(account) {
    setDeleteError(null)
    try {
      await deleteAccount(account.id)
    } catch {
      setDeleteError(`No se pudo eliminar "${account.name}": puede tener movimientos asociados.`)
    }
  }

  return (
    <div className="categories-page">
      <AccountForm onSubmit={addAccount} />
      <section className="categories-section">
        <h2>Tus cuentas</h2>
        {deleteError && <p className="form-error">{deleteError}</p>}
        <ul className="categories-list">
          {accounts.map((account) => (
            <li key={account.id} className="categories-list-item">
              <AccountBadge account={account} />
              <button
                type="button"
                className="icon-button icon-button-danger"
                aria-label={`Eliminar ${account.name}`}
                onClick={() => handleDelete(account)}
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
