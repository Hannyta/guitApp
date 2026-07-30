import { useCurrency } from '../../hooks/useCurrency'
import { SUPPORTED_CURRENCIES } from '../../lib/currency'

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <select
      className="currency-selector"
      value={currency}
      onChange={(event) => setCurrency(event.target.value)}
      aria-label="Moneda"
    >
      {SUPPORTED_CURRENCIES.map((option) => (
        <option key={option.code} value={option.code}>
          {option.code}
        </option>
      ))}
    </select>
  )
}
