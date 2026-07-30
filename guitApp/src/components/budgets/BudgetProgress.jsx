import { useCurrency } from '../../hooks/useCurrency'
import { PencilIcon } from '../icons/PencilIcon'
import { TrashIcon } from '../icons/TrashIcon'

export function BudgetProgress({ budgets, transactions, onEdit, onDelete }) {
  const { format } = useCurrency()

  if (budgets.length === 0) {
    return <p className="empty-state">Todavía no hay presupuestos definidos.</p>
  }

  return (
    <ul className="budget-progress-list">
      {budgets.map((budget) => {
        const spent = transactions
          .filter(
            (transaction) =>
              transaction.category_id === budget.category_id &&
              transaction.type === 'expense' &&
              new Date(`${transaction.occurred_on}T00:00:00`).getFullYear() === budget.year &&
              new Date(`${transaction.occurred_on}T00:00:00`).getMonth() + 1 === budget.month,
          )
          .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

        const percentage = Math.min(100, Math.round((spent / budget.amount) * 100))
        const isOverBudget = spent > budget.amount

        return (
          <li key={budget.id} className="budget-progress-item">
            <div className="budget-progress-header">
              <span
                className="category-badge"
                style={{ backgroundColor: budget.category?.color ?? '#6b7280' }}
              >
                {budget.category?.name ?? 'Sin categoría'}
              </span>
              <span>
                {budget.month}/{budget.year}
              </span>
              <span className="row-actions">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Editar presupuesto"
                  onClick={() => onEdit(budget)}
                >
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  className="icon-button icon-button-danger"
                  aria-label="Eliminar presupuesto"
                  onClick={() => onDelete(budget.id)}
                >
                  <TrashIcon />
                </button>
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={isOverBudget ? 'progress-fill over-budget' : 'progress-fill'}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="budget-progress-footer">
              <span>
                {format(spent)} de {format(budget.amount)}
              </span>
              <span>{percentage}%</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
