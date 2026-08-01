import { useState } from 'react'
import { SUPPORTED_CURRENCIES } from '../../lib/currency'
import { CATEGORY_COLOR_OPTIONS } from '../../lib/categories'
import { ACCOUNT_ICON_KEYS } from '../../lib/accountIcons'
import { useCurrency } from '../../hooks/useCurrency'
import { AccountIcon } from './AccountIcon'

export function AccountForm({ onSubmit, editingAccount = null, onCancel }) {
  const { currency: baseCurrency } = useCurrency()
  const [name, setName] = useState(editingAccount?.name ?? '')
  const [currency, setCurrency] = useState(editingAccount?.currency ?? baseCurrency)
  const [color, setColor] = useState(editingAccount?.color ?? CATEGORY_COLOR_OPTIONS[0])
  const [icon, setIcon] = useState(editingAccount?.icon ?? ACCOUNT_ICON_KEYS[0])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ id: editingAccount?.id, name: name.trim(), currency, color, icon })
      if (!editingAccount) {
        setName('')
        setCurrency(baseCurrency)
        setColor(CATEGORY_COLOR_OPTIONS[0])
        setIcon(ACCOUNT_ICON_KEYS[0])
      }
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>{editingAccount ? 'Editar cuenta' : 'Nueva cuenta'}</h2>
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
              <AccountIcon icon={key} width={18} height={18} />
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={submitting || !name.trim()}>
          {submitting ? 'Guardando...' : editingAccount ? 'Guardar cambios' : '+ Agregar'}
        </button>
        {editingAccount && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
