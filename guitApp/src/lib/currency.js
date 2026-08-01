export const DEFAULT_CURRENCY = 'USD'

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', label: 'Dólar estadounidense (US$)' },
  { code: 'EUR', label: 'Euro (€)' },
  { code: 'MXN', label: 'Peso mexicano (MX$)' },
  { code: 'COP', label: 'Peso colombiano (COP$)' },
  { code: 'ARS', label: 'Peso argentino (AR$)' },
  { code: 'CLP', label: 'Peso chileno (CL$)' },
  { code: 'PEN', label: 'Sol peruano (S/)' },
  { code: 'BRL', label: 'Real brasileño (R$)' },
  { code: 'GBP', label: 'Libra esterlina (£)' },
]

// Formatea un monto en una moneda puntual (ej. la de una cuenta específica),
// a diferencia de useCurrency().format() que usa la moneda base del usuario.
export function formatAmount(amount, currencyCode) {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency: currencyCode || DEFAULT_CURRENCY,
  }).format(amount)
}
