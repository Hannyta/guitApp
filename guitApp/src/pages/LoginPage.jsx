import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { GoogleIcon } from '../components/icons/GoogleIcon'
import { Logo } from '../components/branding/Logo'
import { AppShowcase } from '../components/branding/AppShowcase'

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
      <aside className="auth-hero">
        <div className="auth-hero-content">
          <div className="auth-hero-brand">
            <Logo size={40} />
            <span className="auth-hero-wordmark">GuitApp</span>
          </div>
          <h2 className="auth-hero-title">Controlá tu guita sin vueltas.</h2>
          <AppShowcase className="auth-hero-showcase" />
          <p className="auth-hero-description">
            Registrá tus gastos e ingresos, armá presupuestos por categoría y seguí tu progreso
            con gráficos interactivos.
          </p>
        </div>
      </aside>

      <div className="auth-panel">
        <div className="auth-panel-main">
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
        <p className="auth-legal">
          Al registrarte o conectarte con los servicios anteriores aceptas nuestros Términos de
          servicio y reconocés nuestra Política de privacidad que describe cómo manejamos tus
          datos personales.
        </p>
      </div>
    </div>
  )
}
