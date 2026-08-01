import { useState } from 'react'
import { SUPPORTED_CURRENCIES } from '../../lib/currency'
import { CATEGORY_COLOR_OPTIONS } from '../../lib/categories'
import { ACCOUNT_ICON_KEYS } from '../../lib/accountIcons'
import { useCurrency } from '../../hooks/useCurrency'
import { AccountIcon } from './AccountIcon'

export function AccountForm({ onSubmit }) {
  const { currency: baseCurrency } = useCurrency()
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState(baseCurrency)
  const [color, setColor] = useState(CATEGORY_COLOR_OPTIONS[0])
  const [icon, setIcon] = useState(ACCOUNT_ICON_KEYS[0])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ name: name.trim(), currency, color, icon })
      setName('')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>Nueva cuenta</h2>
      {error && <p className="form-error">{error}</p>}

      <label>
        Nombre
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. Banco Santander"
          required
        />
      </label>

      <label>
        Moneda
        <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
          {SUPPORTED_CURRENCIES.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
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
          {ACCOUNT_ICON_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={key === icon ? 'icon-picker-button active' : 'icon-picker-button'}
              style={key === icon ? { backgroundColor: color } : undefined}
              aria-label={`Elegir ícono ${key}`}
              aria-pressed={key === icon}
              onClick={() => setIcon(key)}
            >
              <AccountIcon icon={key} width={22} height={22} />
            </button>
          ))}
        </div>
      </div>

      <button type="submit" disabled={submitting || !name.trim()}>
        {submitting ? 'Creando...' : '+ Agregar'}
      </button>
    </form>
  )
}
