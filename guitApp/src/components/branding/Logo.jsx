import { useId } from 'react'

export function Logo({ size = 28 }) {
  const gradientId = `guitapp-logo-gradient-${useId()}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1ac47f" />
          <stop offset="1" stopColor="#0ea968" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${gradientId})`} />
      <path
        d="M11 30 L20 21 L27 26 L37 13"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="37" cy="13" r="4" fill="#ffffff" />
    </svg>
  )
}
