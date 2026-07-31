import { useState } from 'react'
import { AmountInput } from '../shared/AmountInput'

const now = new Date()

export function BudgetForm({ categories, onSubmit, editingBudget = null, onCancel }) {
  const [categoryId, setCategoryId] = useState(editingBudget?.category_id ?? '')
  const [year, setYear] = useState(editingBudget?.year ?? now.getFullYear())
  const [month, setMonth] = useState(editingBudget?.month ?? now.getMonth() + 1)
  const [amount, setAmount] = useState(editingBudget ? editingBudget.amount : '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const selectedCategory = categoryId || categories[0]?.id
    if (!selectedCategory) {
      setError('Primero crea una categoría de gasto.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError('Ingresá un monto mayor a 0.')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({
        id: editingBudget?.id,
        categoryId: selectedCategory,
        year: Number(year),
        month: Number(month),
        amount: Number(amount),
      })
      if (!editingBudget) {
        setAmount('')
      }
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <h2>{editingBudget ? 'Editar presupuesto' : 'Definir presupuesto mensual'}</h2>
      {error && <p className="form-error">{error}</p>}

      <label>
        Categoría
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="form-row">
        <label>
          Mes
          <select value={month} onChange={(event) => setMonth(event.target.value)}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((monthNumber) => (
              <option key={monthNumber} value={monthNumber}>
                {monthNumber}
              </option>
            ))}
          </select>
        </label>
        <label>
          Año
          <input type="number" value={year} onChange={(event) => setYear(event.target.value)} required />
        </label>
      </div>

      <label>
        Monto límite
        <AmountInput value={amount} onChange={setAmount} required />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : editingBudget ? 'Guardar cambios' : 'Guardar presupuesto'}
        </button>
        {editingBudget && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
