import { formatAmount } from '../../lib/currency'
import { PencilIcon } from '../icons/PencilIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { CategoryBadge } from '../categories/CategoryBadge'
import { AccountBadge } from '../accounts/AccountBadge'

const dateFormatter = new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', year: 'numeric' })

export function TransactionList({ transactions, onCategoryClick, onEdit, onDelete, showAccount = true }) {
  if (transactions.length === 0) {
    return <p className="empty-state">No hay movimientos en este período.</p>
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Categoría</th>
          {showAccount && <th>Cuenta</th>}
          <th>Descripción</th>
          <th>Monto</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="transaction-table-small">
              {dateFormatter.format(new Date(`${transaction.occurred_on}T00:00:00`))}
            </td>
            <td>
              <CategoryBadge category={transaction.category} onClick={() => onCategoryClick(transaction.category)} />
            </td>
            {showAccount && (
              <td className="transaction-table-small">
                <AccountBadge account={transaction.account} hideCurrency />
              </td>
            )}
            <td className="transaction-table-small">{transaction.description || '—'}</td>
            <td className={transaction.type === 'income' ? 'amount-income' : 'amount-expense'}>
              {transaction.type === 'income' ? '+' : '-'}
              {formatAmount(transaction.amount, transaction.account?.currency)}
            </td>
            <td className="row-actions">
              <button
                type="button"
                className="icon-button"
                aria-label="Editar movimiento"
                onClick={() => onEdit(transaction)}
              >
                <PencilIcon />
              </button>
              <button
                type="button"
                className="icon-button icon-button-danger"
                aria-label="Eliminar movimiento"
                onClick={() => onDelete(transaction.id)}
              >
                <TrashIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
