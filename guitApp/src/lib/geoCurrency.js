export const COUNTRY_OPTIONS = [
  { code: 'AR', name: 'Argentina', currency: 'ARS' },
  { code: 'MX', name: 'México', currency: 'MXN' },
  { code: 'CO', name: 'Colombia', currency: 'COP' },
  { code: 'CL', name: 'Chile', currency: 'CLP' },
  { code: 'PE', name: 'Perú', currency: 'PEN' },
  { code: 'BR', name: 'Brasil', currency: 'BRL' },
  { code: 'US', name: 'Estados Unidos', currency: 'USD' },
  { code: 'GB', name: 'Reino Unido', currency: 'GBP' },
  { code: 'ES', name: 'España', currency: 'EUR' },
]

// Países de la eurozona que no tienen su propia opción en el selector,
// pero igual deberían sugerir EUR si los detecta la geolocalización.
const EXTRA_EURO_COUNTRIES = ['DE', 'FR', 'IT', 'PT', 'NL', 'IE', 'BE', 'AT', 'FI', 'GR']

export function currencyForCountry(countryCode) {
  const match = COUNTRY_OPTIONS.find((option) => option.code === countryCode)
  if (match) return match.currency
  if (EXTRA_EURO_COUNTRIES.includes(countryCode)) return 'EUR'
  return null
}
