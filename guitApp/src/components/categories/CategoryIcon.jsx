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
      <rect x="11" y="2" width="2" height="20" rx="1" transform="rotate(-18 12 12)" />
      <rect x="11" y="2" width="2" height="20" rx="1" transform="rotate(18 12 12)" />
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
      <path d="M12 2 21 7.5H3L12 2Z" />
      <rect x="4" y="9" width="2.4" height="9" />
      <rect x="9.3" y="9" width="2.4" height="9" />
      <rect x="12.3" y="9" width="2.4" height="9" />
      <rect x="17.6" y="9" width="2.4" height="9" />
      <rect x="3" y="19" width="18" height="2" rx="1" />
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
      <path d="M9 9a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8v.5h-2v-.6c0-1.5.8-2.4 1.8-2.9A1 1 0 1 0 10 9H9Z" />
      <circle cx="12" cy="17.5" r="1.3" />
    </svg>
  )
}

function DeliveryIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4.5L21 13.5V16h-8v-6Z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  )
}

function FamilyIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="8" cy="7" r="3" />
      <path d="M2 19c0-3.3 2.7-5 6-5s6 1.7 6 5v1H2v-1Z" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M13 20c.4-2.8 2-4.5 4.5-4.5S21.6 17.2 22 20v.3h-9Z" />
    </svg>
  )
}

function GiftIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="4" y="10" width="7" height="10" rx="1" />
      <rect x="13" y="10" width="7" height="10" rx="1" />
      <path d="M9 6a2 2 0 1 1 3 1.7V10h-3V7.7A2 2 0 0 1 9 6Z" />
      <path d="M15 6a2 2 0 1 0-3 1.7V10h3V7.7A2 2 0 0 0 15 6Z" />
    </svg>
  )
}

function TravelIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M21 3 3 10.5l6.5 2L11 19l3-6L21 3Z" />
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
      <path d="M3 16v-4l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v4H3Z" />
      <circle cx="7.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
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
      <rect x="10" y="9" width="4" height="6" rx="1" />
      <rect x="3" y="8" width="3" height="8" rx="1" />
      <rect x="18" y="8" width="3" height="8" rx="1" />
      <rect x="6" y="10.5" width="2" height="3" />
      <rect x="16" y="10.5" width="2" height="3" />
    </svg>
  )
}

function LeisureIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12 3 2.5 5.5 6 .6-4.4 4 1.3 6-5.4-3.1L6.6 19l1.3-6-4.4-4 6-.6L12 3Z" />
    </svg>
  )
}

function EducationIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 6c-2-1.3-5-1.3-8-.7v12c3-.6 6-.6 8 .7 2-1.3 5-1.3 8-.7v-12c-3-.6-6-.6-8 .7Z" />
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
      <path d="M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm5 17a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
    </svg>
  )
}

function CoinIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
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
