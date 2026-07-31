import { useMemo, useState } from 'react'
import { AmountInput } from '../shared/AmountInput'

const today = () => new Date().toISOString().slice(0, 10)

export function TransactionForm({ categories, onSubmit, editingTransaction = null, onCancel }) {
  const [type, setType] = useState(editingTransaction?.type ?? 'expense')
  const [categoryId, setCategoryId] = useState(editingTransaction?.category_id ?? '')
  const [amount, setAmount] = useState(editingTransaction ? editingTransaction.amount : '')
  const [description, setDescription] = useState(editingTransaction?.description ?? '')
  const [occurredOn, setOccurredOn] = useState(editingTransaction?.occurred_on ?? today())
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === type),
    [categories, type],
  )

  async function handleSubmit(event) {
    event.preventDefault()
    const selectedCategory = categoryId || filteredCategories[0]?.id
    if (!selectedCategory) {
      setError('Primero crea una categoría de este tipo.')
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
        id: editingTransaction?.id,
        categoryId: selectedCategory,
        type,
        amount: Number(amount),
        description,
        occurredOn,
      })
      if (!editingTransaction) {
        setAmount('')
        setDescription('')
        setOccurredOn(today())
      }
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>{editingTransaction ? 'Editar movimiento' : 'Nuevo movimiento'}</h2>
      {error && <p className="form-error">{error}</p>}

      <div className="type-toggle">
        <button
          type="button"
          className={type === 'expense' ? 'active' : ''}
          onClick={() => {
            setType('expense')
            setCategoryId('')
          }}
        >
          Gasto
        </button>
        <button
          type="button"
          className={type === 'income' ? 'active' : ''}
          onClick={() => {
            setType('income')
            setCategoryId('')
          }}
        >
          Ingreso
        </button>
      </div>

      <label>
        Categoría
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="">Selecciona una categoría</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Monto
        <AmountInput value={amount} onChange={setAmount} required />
      </label>

      <label>
        Descripción
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Opcional"
        />
      </label>

      <label>
        Fecha
        <input
          type="date"
          value={occurredOn}
          onChange={(event) => setOccurredOn(event.target.value)}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : editingTransaction ? 'Guardar cambios' : 'Guardar movimiento'}
        </button>
        {editingTransaction && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
