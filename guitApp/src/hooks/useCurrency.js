import { useMemo } from 'react'
import { useAuth } from './useAuth'
import { DEFAULT_CURRENCY } from '../lib/currency'

export function useCurrency() {
  const { user, updateCurrency } = useAuth()
  const currency = user?.user_metadata?.currency ?? DEFAULT_CURRENCY

  const formatter = useMemo(
    () => new Intl.NumberFormat('es', { style: 'currency', currency }),
    [currency],
  )

  return { currency, setCurrency: updateCurrency, format: formatter.format }
}
