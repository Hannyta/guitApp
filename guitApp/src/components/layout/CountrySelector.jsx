import { useCountry } from '../../hooks/useCountry'

export function CountrySelector() {
  const { country, setCountry, options } = useCountry()

  return (
    <select
      className="currency-selector"
      value={country}
      onChange={(event) => setCountry(event.target.value)}
      aria-label="País"
    >
      <option value="">País</option>
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
