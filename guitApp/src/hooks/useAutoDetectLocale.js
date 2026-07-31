import { useEffect, useRef } from 'react'
import { useAuth } from './useAuth'
import { detectCountryCode } from '../lib/geolocation'
import { currencyForCountry } from '../lib/geoCurrency'

export function useAutoDetectLocale() {
  const { user, updateProfile } = useAuth()
  const attempted = useRef(false)

  useEffect(() => {
    if (!user || attempted.current || user.user_metadata?.country) return
    attempted.current = true

    detectCountryCode().then((countryCode) => {
      if (!countryCode) return
      const hasCurrency = Boolean(user.user_metadata?.currency)
      const currency = hasCurrency ? null : currencyForCountry(countryCode)
      updateProfile(currency ? { country: countryCode, currency } : { country: countryCode })
    })
  }, [user, updateProfile])
}
