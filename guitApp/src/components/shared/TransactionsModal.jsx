import { useEffect } from 'react'
import { useCurrency } from '../../hooks/useCurrency'
import { CloseIcon } from '../icons/CloseIcon'
import { CategoryIcon } from '../categories/CategoryIcon'

const dateFormatter = new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', year: 'numeric' })

export function TransactionsModal({ title, badgeColor, transactions, onClose }) {
  const { format } = useCurrency()

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const sorted = [...transactions].sort((a, b) => (a.occurred_on < b.occurred_on ? 1 : -1))
  const total = sorted.reduce(
    (sum, transaction) =>
      sum + (transaction.type === 'income' ? Number(transaction.amount) : -Number(transaction.amount)),
    0,
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <span className="category-badge" style={{ backgroundColor: badgeColor }}>
            {title}
          </span>
          <button type="button" className="icon-button" aria-label="Cerrar" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <p className="modal-summary">
          {sorted.length} movimiento{sorted.length === 1 ? '' : 's'} ·{' '}
          <span className={total >= 0 ? 'amount-income' : 'amount-expense'}>
            {total >= 0 ? '+' : '-'}
            {format(Math.abs(total))}
          </span>
        </p>

        {sorted.length === 0 ? (
          <p className="empty-state">No hay movimientos para mostrar.</p>
        ) : (
          <ul className="modal-transaction-list">
            {sorted.map((transaction) => (
              <li key={transaction.id}>
                <span className="modal-transaction-date">
                  {dateFormatter.format(new Date(`${transaction.occurred_on}T00:00:00`))}
                </span>
                <span
                  className="category-badge"
                  style={{ backgroundColor: transaction.category?.color ?? '#898781' }}
                >
                  <CategoryIcon icon={transaction.category?.icon} />
                  {transaction.category?.name ?? 'Sin categoría'}
                </span>
                <span className="modal-transaction-description">{transaction.description || '—'}</span>
                <span className={transaction.type === 'income' ? 'amount-income' : 'amount-expense'}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {format(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
