import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAutoDetectLocale } from '../../hooks/useAutoDetectLocale'
import { CurrencySelector } from './CurrencySelector'
import { Brand } from '../branding/Brand'

export function AppLayout() {
  const { user, signOut } = useAuth()
  useAutoDetectLocale()

  return (
    <div className="app-shell">
      <header className="app-header">
        <Brand size={30} />
        <nav className="app-nav">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/transactions">Movimientos</NavLink>
          <NavLink to="/budgets">Presupuestos</NavLink>
          <NavLink to="/categories">Categorías</NavLink>
          <NavLink to="/accounts">Cuentas</NavLink>
        </nav>
        <div className="app-user">
          <CurrencySelector />
          <span>{user?.email}</span>
          <button type="button" onClick={() => signOut()}>
            Salir
          </button>
        </div>
      </header>
      <main className="app-content">
        <div className="app-content-inner">
          <Outlet />
        </div>
      </main>
      <footer className="app-footer">
        <span>© {new Date().getFullYear()} GuitApp</span> · <span>Todos los derechos reservados.</span>
        <nav className="app-footer-links">
          <Link to="/terms">Términos y condiciones</Link>
          <Link to="/privacy">Política de privacidad</Link>
          <Link to="/help">Ayuda o contáctanos</Link>
        </nav>
      </footer>
    </div>
  )
}
