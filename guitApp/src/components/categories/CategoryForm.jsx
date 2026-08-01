import { useState } from 'react'
import { CATEGORY_COLOR_OPTIONS } from '../../lib/categories'
import { CATEGORY_ICON_KEYS } from '../../lib/categoryIcons'
import { CategoryIcon } from './CategoryIcon'

export function CategoryForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('expense')
  const [color, setColor] = useState(CATEGORY_COLOR_OPTIONS[0])
  const [icon, setIcon] = useState(CATEGORY_ICON_KEYS[0])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ name: name.trim(), type, color, icon })
      setName('')
      setType('expense')
      setColor(CATEGORY_COLOR_OPTIONS[0])
      setIcon(CATEGORY_ICON_KEYS[0])
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>Nueva categoría</h2>
      {error && <p className="form-error">{error}</p>}

      <div className="type-toggle">
        <button
          type="button"
          className={type === 'expense' ? 'active' : ''}
          onClick={() => setType('expense')}
        >
          Gasto
        </button>
        <button
          type="button"
          className={type === 'income' ? 'active' : ''}
          onClick={() => setType('income')}
        >
          Ingreso
        </button>
      </div>

      <label>
        Nombre
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. Mascotas"
          required
        />
      </label>

      <div className="picker-group">
        <span className="picker-label">Color</span>
        <div className="color-swatch-grid">
          {CATEGORY_COLOR_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={option === color ? 'color-swatch active' : 'color-swatch'}
              style={{ backgroundColor: option }}
              aria-label={`Elegir color ${option}`}
              aria-pressed={option === color}
              onClick={() => setColor(option)}
            >
              {option === color && <span className="color-swatch-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="picker-group">
        <span className="picker-label">Ícono</span>
        <div className="icon-picker-grid">
          {CATEGORY_ICON_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={key === icon ? 'icon-picker-button active' : 'icon-picker-button'}
              style={key === icon ? { backgroundColor: color } : undefined}
              aria-label={`Elegir ícono ${key}`}
              aria-pressed={key === icon}
              onClick={() => setIcon(key)}
            >
              <CategoryIcon icon={key} width={18} height={18} />
            </button>
          ))}
        </div>
      </div>

      <button type="submit" disabled={submitting || !name.trim()}>
        {submitting ? 'Creando...' : 'Crear categoría'}
      </button>
    </form>
  )
}
