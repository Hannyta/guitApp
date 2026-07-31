import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Brand } from '../components/branding/Brand'

export function SignupPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setInfo(null)

    const { data, error: signUpError } = await signUp(email, password)

    setSubmitting(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      navigate('/', { replace: true })
    } else {
      setInfo('Cuenta creada. Revisa tu email para confirmar antes de iniciar sesión.')
    }
  }

  return (
    <div className="auth-page">
      <Brand size={56} withTagline />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        {error && <p className="form-error">{error}</p>}
        {info && <p className="form-info">{info}</p>}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creando...' : 'Crear cuenta'}
        </button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}
