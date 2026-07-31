import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { CategoryForm } from '../components/categories/CategoryForm'
import { CategoryBadge } from '../components/categories/CategoryBadge'
import { TrashIcon } from '../components/icons/TrashIcon'

export function CategoriesPage() {
  const { categories, loading, addCategory, deleteCategory } = useCategories()
  const [deleteError, setDeleteError] = useState(null)

  if (loading) {
    return <p className="page-loading">Cargando...</p>
  }

  async function handleDelete(category) {
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
      <section className="categories-section">
        <h2>Tus categorías</h2>
        {deleteError && <p className="form-error">{deleteError}</p>}
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category.id} className="categories-list-item">
              <CategoryBadge category={category} />
              <span className="category-type-label">
                {category.type === 'income' ? 'Ingreso' : 'Gasto'}
              </span>
              <button
                type="button"
                className="icon-button icon-button-danger"
                aria-label={`Eliminar ${category.name}`}
                onClick={() => handleDelete(category)}
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
