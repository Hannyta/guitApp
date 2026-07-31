import { useState } from 'react'
import { amountToDisplay, formatAmountInput, parseAmountInput } from '../../lib/amountFormat'

export function AmountInput({ value, onChange, ...props }) {
  const [display, setDisplay] = useState(() => amountToDisplay(value))

  function handleChange(event) {
    const raw = event.target.value

    // El teclado numérico (celular o numpad) suele escribir "." para el
    // decimal en vez de ",". Si el usuario acaba de tipear ese separador
    // al final y todavía no había uno, lo normalizamos a coma.
    const justTypedSeparator = raw.length > display.length && /[.,]$/.test(raw) && !/[.,]/.test(display)
    const normalized = justTypedSeparator ? `${raw.slice(0, -1)},` : raw

    const formatted = formatAmountInput(normalized)
    setDisplay(formatted)
    onChange(parseAmountInput(formatted))
  }

  return (
    <input type="text" inputMode="decimal" value={display} onChange={handleChange} {...props} />
  )
}
