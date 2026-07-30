import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { CurrencySelector } from './CurrencySelector'

export function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-title">Finanzas</span>
        <nav className="app-nav">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/transactions">Movimientos</NavLink>
          <NavLink to="/budgets">Presupuestos</NavLink>
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
        <Outlet />
      </main>
    </div>
  )
}
