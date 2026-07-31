export function BudgetIcon(props) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Teléfono */}
      <rect x="11" y="2" width="18" height="36" rx="4" />
      <circle cx="20" cy="6.2" r="0.9" fill="currentColor" stroke="none" />
      <line x1="17" y1="35" x2="23" y2="35" />

      {/* Tarjeta superpuesta */}
      <rect x="3" y="13" width="34" height="16" rx="3" fill="var(--income)" />

      {/* Grilla de categorías, a color */}
      <rect x="8" y="17" width="3.4" height="3.4" rx="1" fill="#eb6834" stroke="none" />
      <rect x="12.4" y="17" width="3.4" height="3.4" rx="1" fill="#2a78d6" stroke="none" />
      <rect x="8" y="21.4" width="3.4" height="3.4" rx="1" fill="#e87ba4" stroke="none" />
      <rect x="12.4" y="21.4" width="3.4" height="3.4" rx="1" fill="#eda100" stroke="none" />

      {/* Líneas de texto */}
      <line x1="8" y1="27.3" x2="17" y2="27.3" />
      <line x1="8" y1="29.6" x2="14" y2="29.6" />
      <line x1="8" y1="31.9" x2="17" y2="31.9" />

      {/* Moneda dorada con signo $ */}
      <circle cx="27.5" cy="21" r="6.5" fill="#eda100" stroke="#c98500" />
      <path d="M27.5 17v8.5" stroke="#ffffff" />
      <path
        d="M29.8 18.9c0-1-1.1-1.7-2.3-1.7s-2.3.6-2.3 1.6c0 2 4.6.9 4.6 2.9 0 1-1.1 1.7-2.3 1.7s-2.3-.6-2.3-1.7"
        stroke="#ffffff"
      />
    </svg>
  )
}
