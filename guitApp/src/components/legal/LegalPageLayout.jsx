import { Link } from 'react-router-dom'
import { Brand } from '../branding/Brand'

export function LegalPageLayout({ title, updatedAt, children }) {
  return (
    <div className="legal-page">
      <header className="legal-page-header">
        <Link to="/login" className="legal-page-brand">
          <Brand size={26} />
        </Link>
      </header>
      <article className="legal-page-content">
        <h1>{title}</h1>
        <p className="legal-page-updated">Última actualización: {updatedAt}</p>
        {children}
      </article>
    </div>
  )
}
