import { useAuth } from './useAuth'
import { COUNTRY_OPTIONS, currencyForCountry } from '../lib/geoCurrency'

export function useCountry() {
  const { user, updateProfile } = useAuth()
  const country = user?.user_metadata?.country ?? ''

  function setCountry(countryCode) {
    const currency = currencyForCountry(countryCode)
    return updateProfile(currency ? { country: countryCode, currency } : { country: countryCode })
  }

  return { country, setCountry, options: COUNTRY_OPTIONS }
}
