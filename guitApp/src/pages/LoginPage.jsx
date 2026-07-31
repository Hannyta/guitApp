import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Brand } from '../components/branding/Brand'
import { GoogleIcon } from '../components/icons/GoogleIcon'

export function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error: signInError } = await signIn(email, password)

    setSubmitting(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    navigate('/', { replace: true })
  }

  async function handleOAuth(signInFn) {
    setError(null)
    const { error: oauthError } = await signInFn()
    if (oauthError) setError(oauthError.message)
  }

  return (
    <div className="auth-page">
      <Brand size={56} withTagline />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        {error && <p className="form-error">{error}</p>}

        <div className="oauth-buttons">
          <button type="button" className="oauth-button" onClick={() => handleOAuth(signInWithGoogle)}>
            <GoogleIcon />
            Continuar con Google
          </button>
        </div>

        <div className="oauth-divider">
          <span>o con tu email</span>
        </div>

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
          {submitting ? 'Ingresando...' : 'Ingresar'}
        </button>
        <p>
          ¿No tienes cuenta? <Link to="/signup">Crear una</Link>
        </p>
      </form>
    </div>
  )
}
