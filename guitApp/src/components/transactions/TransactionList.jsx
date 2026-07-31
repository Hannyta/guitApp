import { useCurrency } from '../../hooks/useCurrency'
import { PencilIcon } from '../icons/PencilIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { CategoryBadge } from '../categories/CategoryBadge'

const dateFormatter = new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', year: 'numeric' })

export function TransactionList({ transactions, onCategoryClick, onEdit, onDelete }) {
  const { format } = useCurrency()

  if (transactions.length === 0) {
    return <p className="empty-state">No hay movimientos en este período.</p>
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Monto</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{dateFormatter.format(new Date(`${transaction.occurred_on}T00:00:00`))}</td>
            <td>
              <CategoryBadge category={transaction.category} onClick={() => onCategoryClick(transaction.category)} />
            </td>
            <td>{transaction.description || '—'}</td>
            <td className={transaction.type === 'income' ? 'amount-income' : 'amount-expense'}>
              {transaction.type === 'income' ? '+' : '-'}
              {format(transaction.amount)}
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
