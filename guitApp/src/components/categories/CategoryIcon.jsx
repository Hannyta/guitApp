const iconProps = {
  viewBox: '0 0 24 24',
  width: 16,
  height: 16,
  fill: 'currentColor',
  'aria-hidden': true,
}

function ShoppingIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5 9h14l-1.5 9.3A2 2 0 0 1 15.5 20h-7a2 2 0 0 1-2-1.7L5 9Z" />
      <path d="M8 9c0-3 1.8-5 4-5s4 2 4 5h-2c0-2-1-3-2-3s-2 1-2 3H8Z" />
    </svg>
  )
}

function FoodIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 8.5c1.6-1.9 4.1-2 5.4-.4 1.9 2.1 1.3 6.2-1 9.3-1.7 2.1-3.1 2.8-4.4 2.8s-2.7-.7-4.4-2.8c-2.3-3.1-2.9-7.2-1-9.3 1.3-1.6 3.8-1.5 5.4.4Z" />
      <rect x="11.3" y="3.6" width="1.5" height="3" rx="0.7" transform="rotate(20 12 5.1)" />
      <path d="M13.2 4c1.2-.9 2.6-.6 2.7.5.1 1-1 1.6-2 1.4-.8-.2-1.2-1.2-.7-1.9Z" />
    </svg>
  )
}

function HomeIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 3 3 11h2v9h5v-6h4v6h5v-9h2L12 3Z" />
    </svg>
  )
}

function BankIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 1.5 21.5 7.3a1 1 0 0 1-.5 1.9H3a1 1 0 0 1-.5-1.9L12 1.5Z" />
      <rect x="3.8" y="9.6" width="2.8" height="8.4" rx="1" />
      <rect x="9" y="9.6" width="2.8" height="8.4" rx="1" />
      <rect x="12.2" y="9.6" width="2.8" height="8.4" rx="1" />
      <rect x="17.4" y="9.6" width="2.8" height="8.4" rx="1" />
      <rect x="2.5" y="19" width="19" height="2.5" rx="1.2" />
    </svg>
  )
}

function HealthIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 20s-7-4.4-9.5-9C1 8 2 4.5 5.5 4A5 5 0 0 1 12 7a5 5 0 0 1 6.5-3c3.5.5 4.5 4 3 7-2.5 4.6-9.5 9-9.5 9Z" />
    </svg>
  )
}

function OtherIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <g transform="translate(12 11.5) scale(1.25) translate(-12 -11.5)">
        <path d="M9 9a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8v.5h-2v-.6c0-1.5.8-2.4 1.8-2.9A1 1 0 1 0 10 9H9Z" />
        <circle cx="12" cy="17.5" r="1.3" />
      </g>
    </svg>
  )
}

function DeliveryIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2" y="7" width="11" height="9" rx="1.2" />
      <path d="M13 10h4.5L21 13.5V16h-8v-6Z" />
      <circle cx="6.5" cy="17.5" r="1.9" />
      <circle cx="17.5" cy="17.5" r="1.9" />
    </svg>
  )
}

function FamilyIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="5" cy="7.5" r="2.3" />
      <path d="M1.3 19c0-2.9 1.8-4.4 3.7-4.4s3.7 1.5 3.7 4.4v.5H1.3v-.5Z" />
      <circle cx="19" cy="7.5" r="2.3" />
      <path d="M15.3 19c0-2.9 1.8-4.4 3.7-4.4s3.7 1.5 3.7 4.4v.5h-7.4v-.5Z" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M8.3 20.3c0-2.6 1.6-4 3.7-4s3.7 1.4 3.7 4v.2H8.3v-.2Z" />
    </svg>
  )
}

function GiftIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="4" y="9.8" width="7" height="10.7" rx="1.2" />
      <rect x="13" y="9.8" width="7" height="10.7" rx="1.2" />
      <path d="M12 8.6c-2.1-3.3-4.4-4.5-6.3-3.6-1.7.8-2.2 3-.6 4.1 1.2.9 3.6 1.3 6.9 1.3Zm0 0c2.1-3.3 4.4-4.5 6.3-3.6 1.7.8 2.2 3 .6 4.1-1.2.9-3.6 1.3-6.9 1.3Z" />
      <circle cx="12" cy="8.6" r="1.4" />
    </svg>
  )
}

function TravelIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M21 16v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  )
}

function PetsIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <ellipse cx="12" cy="15" rx="5" ry="4" />
      <circle cx="6" cy="9" r="2.2" />
      <circle cx="11" cy="6.5" r="2.2" />
      <circle cx="16.5" cy="7.5" r="2.2" />
      <circle cx="19.5" cy="12" r="2" />
    </svg>
  )
}

function UtilitiesIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  )
}

function TransportIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 17v-3.5l1.5-4A2 2 0 0 1 7.4 8.2H8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5v1.7h.6a2 2 0 0 1 1.9 1.3l1.5 4V17H4Z" />
      <circle cx="7.5" cy="18" r="2" />
      <circle cx="16.5" cy="18" r="2" />
    </svg>
  )
}

function BeautyIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="9" y="12" width="6" height="9" rx="1.5" />
      <path d="M9 12l1-6h4l1 6H9Z" />
    </svg>
  )
}

function FitnessIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="1" y="8" width="4" height="8" rx="1.5" />
      <rect x="19" y="8" width="4" height="8" rx="1.5" />
      <rect x="5" y="10.5" width="14" height="3" rx="1" />
    </svg>
  )
}

function LeisureIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        fillRule="evenodd"
        d="M7 8h10a5 5 0 0 1 5 5v3a2.5 2.5 0 0 1-4.5 1.5L16 16H8l-1.5 1.5A2.5 2.5 0 0 1 2 15v-3a5 5 0 0 1 5-5Zm-.8 3.4h1.6V13h1.6v1.6H7.8V16H6.2v-1.4H4.6V13h1.6v-1.6Zm10.7.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm-2.5 2.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
      />
    </svg>
  )
}

function EducationIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M3 5.3c2.8-1 6.2-1 8.3.3v13.1c-2.1-1.3-5.5-1.3-8.3-.3V5.3Z" />
      <path d="M21 5.3c-2.8-1-6.2-1-8.3.3v13.1c2.1-1.3 5.5-1.3 8.3-.3V5.3Z" />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4Zm2-1v1h2V5h-2Z" />
    </svg>
  )
}

function LaptopIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v9H4V5Z" />
      <path d="M2 16h20l-1.5 2.5a1 1 0 0 1-.9.5H4.4a1 1 0 0 1-.9-.5L2 16Z" />
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        fillRule="evenodd"
        d="M6.5 2A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 17.5 2h-11ZM10 4.2h4v1.1h-4V4.2Zm2 15.8a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z"
      />
    </svg>
  )
}

function CoinIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        fillRule="evenodd"
        d="M12 1.5A10.5 10.5 0 1 0 12 22.5 10.5 10.5 0 0 0 12 1.5Zm0 2.6a7.9 7.9 0 1 0 0 15.8 7.9 7.9 0 0 0 0-15.8Zm.9 2.9v1c1.3.3 2.2 1.2 2.3 2.4h-1.8c-.1-.5-.5-.8-1.1-.9v2c1.5.4 2.9 1 2.9 2.7 0 1.2-.9 2.1-2.2 2.4v1h-1.8v-1c-1.3-.3-2.2-1.2-2.3-2.4h1.8c.1.5.5.8 1.1.9v-2c-1.5-.4-2.8-1-2.8-2.7 0-1.2.8-2.1 2.1-2.4v-1h1.8Zm-1 3c-.5.1-.7.4-.7.7 0 .4.3.6.7.8v-1.5Zm.9 4v1.6c.6-.1.9-.4.9-.8 0-.4-.3-.6-.9-.8Z"
      />
    </svg>
  )
}

const CATEGORY_ICON_COMPONENTS = {
  shopping: ShoppingIcon,
  food: FoodIcon,
  home: HomeIcon,
  bank: BankIcon,
  health: HealthIcon,
  other: OtherIcon,
  delivery: DeliveryIcon,
  family: FamilyIcon,
  gift: GiftIcon,
  travel: TravelIcon,
  pets: PetsIcon,
  utilities: UtilitiesIcon,
  transport: TransportIcon,
  beauty: BeautyIcon,
  fitness: FitnessIcon,
  leisure: LeisureIcon,
  education: EducationIcon,
  briefcase: BriefcaseIcon,
  laptop: LaptopIcon,
  phone: PhoneIcon,
  coin: CoinIcon,
}

export function CategoryIcon({ icon, ...props }) {
  const Icon = CATEGORY_ICON_COMPONENTS[icon] ?? OtherIcon
  return <Icon {...props} />
}
