import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p className="page-loading">Cargando...</p>
  if (!user) return <Navigate to="/login" replace />

  const needsOnboarding = !user.user_metadata?.onboarded && !user.user_metadata?.currency
  if (needsOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}
