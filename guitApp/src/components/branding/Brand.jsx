import { Logo } from './Logo'

const TAGLINE = 'Controlá tu guita sin vueltas.'

export function Brand({ size = 28, withTagline = false }) {
  return (
    <div className="brand">
      <Logo size={size} />
      <div className="brand-text">
        <span className="brand-name">GuitApp</span>
        {withTagline && <span className="brand-tagline">{TAGLINE}</span>}
      </div>
    </div>
  )
}
