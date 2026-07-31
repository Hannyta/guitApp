// Formatea mientras se escribe, estilo "es": punto para miles, coma para decimales.
export function formatAmountInput(rawValue) {
  let cleaned = rawValue.replace(/[^\d,]/g, '')

  const firstComma = cleaned.indexOf(',')
  if (firstComma !== -1) {
    cleaned = cleaned.slice(0, firstComma + 1) + cleaned.slice(firstComma + 1).replace(/,/g, '')
  }

  const [intPart, decPart] = cleaned.split(',')
  const formattedInt = (intPart || '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return decPart !== undefined ? `${formattedInt},${decPart.slice(0, 2)}` : formattedInt
}

// "1.234,56" -> 1234.56 (number). Cadena vacía -> ''.
export function parseAmountInput(formatted) {
  if (!formatted) return ''
  const normalized = formatted.replace(/\./g, '').replace(',', '.')
  const value = Number(normalized)
  return Number.isNaN(value) ? '' : value
}

// Convierte un número guardado (ej. 1234.56) al texto que debe mostrar el input.
export function amountToDisplay(value) {
  if (value === '' || value === null || value === undefined) return ''
  return formatAmountInput(String(value).replace('.', ','))
}
