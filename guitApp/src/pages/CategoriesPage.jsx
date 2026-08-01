import { useMemo, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useTransactions } from '../hooks/useTransactions'
import { CategoryForm } from '../components/categories/CategoryForm'
import { CategoryIcon } from '../components/categories/CategoryIcon'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import { TrashIcon } from '../components/icons/TrashIcon'

export function CategoriesPage() {
  const { categories, loading, addCategory, deleteCategory } = useCategories()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [deleteError, setDeleteError] = useState(null)
  const [categoryPendingDelete, setCategoryPendingDelete] = useState(null)

  const categoryIdsInUse = useMemo(
    () => new Set(transactions.map((transaction) => transaction.category_id)),
    [transactions],
  )

  if (loading || transactionsLoading) {
    return <p className="page-loading">Cargando...</p>
  }

  async function confirmDelete() {
    const category = categoryPendingDelete
    setCategoryPendingDelete(null)
    setDeleteError(null)
    try {
      await deleteCategory(category.id)
    } catch {
      setDeleteError(`No se pudo eliminar "${category.name}": puede tener movimientos asociados.`)
    }
  }

  return (
    <div className="categories-page">
      <CategoryForm onSubmit={addCategory} />
      <section className="accounts-section">
        <h2>Tus categorías</h2>
        {deleteError && <p className="form-error">{deleteError}</p>}
        {categories.length === 0 ? (
          <p className="empty-state">Todavía no tenés categorías.</p>
        ) : (
          <ul className="entity-card-list-columns">
            {categories.map((category) => {
              const hasTransactions = categoryIdsInUse.has(category.id)
              return (
                <li className="entity-card" key={category.id}>
                  <span
                    className="category-icon-circle entity-card-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    <CategoryIcon icon={category.icon} width={24} height={24} />
                  </span>
                  <div className="entity-card-info">
                    <span className="entity-card-name">{category.name}</span>
                    <span className="entity-card-meta">{category.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
                  </div>
                  {!hasTransactions && (
                    <div className="entity-card-actions">
                      <button
                        type="button"
                        className="icon-button icon-button-danger"
                        aria-label={`Eliminar ${category.name}`}
                        onClick={() => setCategoryPendingDelete(category)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </section>
      {categoryPendingDelete && (
        <ConfirmDialog
          title="Eliminar categoría"
          message={`¿Eliminar la categoría "${categoryPendingDelete.name}"? Esta acción no se puede deshacer.`}
          onConfirm={confirmDelete}
          onCancel={() => setCategoryPendingDelete(null)}
        />
      )}
    </div>
  )
}
