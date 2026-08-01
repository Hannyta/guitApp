import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCurrency } from '../hooks/useCurrency'
import { useCategories } from '../hooks/useCategories'
import { useAccounts } from '../hooks/useAccounts'
import { useTransactions } from '../hooks/useTransactions'
import { SUPPORTED_CURRENCIES } from '../lib/currency'
import { detectCountryCode } from '../lib/geolocation'
import { currencyForCountry } from '../lib/geoCurrency'
import { CategoryIcon } from '../components/categories/CategoryIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { BudgetIcon } from '../components/icons/BudgetIcon'
import { AmountInput } from '../components/shared/AmountInput'

const today = () => new Date().toISOString().slice(0, 10)

export function OnboardingPage() {
  const { updateProfile } = useAuth()
  const { currency, setCurrency } = useCurrency()
  const { categories } = useCategories()
  const { accounts, addAccount } = useAccounts()
  const { addTransaction } = useTransactions()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [balance, setBalance] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const userChangedCurrency = useRef(false)

  useEffect(() => {
    // Sugiere la moneda según el país detectado por IP, salvo que el
    // usuario ya haya elegido una a mano en el select de abajo.
    detectCountryCode().then((countryCode) => {
      if (!countryCode || userChangedCurrency.current) return
      const suggested = currencyForCountry(countryCode)
      if (suggested) setSelectedCurrency(suggested)
    })
  }, [])

  function handleCurrencyChange(event) {
    userChangedCurrency.current = true
    setSelectedCurrency(event.target.value)
  }

  async function handleConfirmCurrency(event) {
    event.preventDefault()
    setSubmitting(true)
    await setCurrency(selectedCurrency)
    setSubmitting(false)
    setStep(2)
  }

  async function handleConfirmBalance(event) {
    event.preventDefault()
    setSubmitting(true)

    const cashAccount =
      accounts.find((account) => account.name === 'Efectivo') ??
      (await addAccount({ name: 'Efectivo', currency: selectedCurrency, color: '#2a78d6', icon: 'cash' }))

    const amount = Number(balance)
    if (amount > 0) {
      const incomeCategory =
        categories.find((category) => category.name === 'Saldo inicial') ??
        categories.find((category) => category.type === 'income') ??
        categories[0]

      if (incomeCategory) {
        await addTransaction({
          categoryId: incomeCategory.id,
          accountId: cashAccount.id,
          type: 'income',
          amount,
          description: 'Saldo inicial',
          occurredOn: today(),
        })
      }
    }

    setSubmitting(false)
    setStep(3)
  }

  async function handleFinish() {
    setSubmitting(true)
    await updateProfile({ onboarded: true })
    navigate('/', { replace: true })
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-steps">
        <div className={`onboarding-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
          <span className="onboarding-step-circle">{step > 1 ? <CheckIcon width={14} height={14} /> : 1}</span>
          <span className="onboarding-step-label">Elegí tu moneda</span>
        </div>
        <div className="onboarding-step-line" />
        <div className={`onboarding-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
          <span className="onboarding-step-circle">{step > 2 ? <CheckIcon width={14} height={14} /> : 2}</span>
          <span className="onboarding-step-label">Configura tu saldo</span>
        </div>
        <div className="onboarding-step-line" />
        <div className={`onboarding-step ${step >= 3 ? 'active' : ''}`}>
          <span className="onboarding-step-circle">3</span>
          <span className="onboarding-step-label">¡Listo!</span>
        </div>
      </div>

      {step === 1 && (
        <form className="onboarding-content" onSubmit={handleConfirmCurrency}>
          <div className="onboarding-icon">
            <CategoryIcon icon="coin" width={56} height={56} />
          </div>
          <h1>Elegí tu moneda base</h1>
          <label className="onboarding-field">
            <strong>Moneda</strong>
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
              {SUPPORTED_CURRENCIES.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <p className="onboarding-hint">
            Tu moneda base idealmente debe ser la que usas con más frecuencia, vas a ver todos tus
            montos en esta moneda. Podés cambiarla más adelante desde el encabezado.
          </p>
          <button type="submit" className="onboarding-button" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Confirmar moneda'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="onboarding-content" onSubmit={handleConfirmBalance}>
          <div className="onboarding-icon">
            <BudgetIcon width={90} height={90} />
          </div>
          <h1>Configura tu saldo</h1>
          <label className="onboarding-field">
            <strong>Saldo actual ({selectedCurrency})</strong>
            <AmountInput value={balance} onChange={setBalance} placeholder="0" />
          </label>
          <p className="onboarding-hint">
            Ingresá cuánta plata tenés disponible en tu billetera. 
            <br />
            La vamos a registrar como tu saldo inicial en Movimientos. Si preferís, dejalo en blanco y empezá desde cero.
          </p>
          <div className="onboarding-actions">
            <button type="button" className="secondary-button" onClick={() => setStep(1)}>
              Atrás
            </button>
            <button type="submit" className="onboarding-button" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Confirmar saldo'}
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="onboarding-content">
          <div className="onboarding-icon onboarding-icon-success">
            <CheckIcon width={56} height={56} />
          </div>
          <h1>¡Todo listo!</h1>
          <p className="onboarding-hint">
            Ya podés empezar a registrar tus ingresos y gastos, armar presupuestos y ver tu progreso
            en el Dashboard.
          </p>
          <button type="button" className="onboarding-button" onClick={handleFinish} disabled={submitting}>
            Ir al Dashboard
          </button>
        </div>
      )}
    </div>
  )
}
