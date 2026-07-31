export function AppShowcase(props) {
  return (
    <svg viewBox="0 0 360 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      {/* Laptop screen + bezel */}
      <rect x="10" y="8" width="300" height="208" rx="16" fill="#12211a" />
      <rect x="10" y="8" width="300" height="208" rx="16" fill="none" stroke="#26392f" strokeWidth="1" />
      <circle cx="160" cy="19" r="1.7" fill="#3a4a42" />
      <rect x="19" y="20" width="282" height="184" rx="4" fill="#fcfcfb" />

      {/* Hinge */}
      <rect x="146" y="214" width="28" height="5" rx="2" fill="#0a1410" />

      {/* Base / keyboard deck, in perspective */}
      <path d="M-8 219h336l16 24H-24Z" fill="#17281f" />
      <path d="M-8 219h336l3 6H-11Z" fill="#1f3529" />
      <rect x="34" y="230" width="252" height="1.5" fill="#0f1d16" opacity="0.5" />
      <rect x="34" y="235" width="252" height="1.5" fill="#0f1d16" opacity="0.5" />
      <rect x="136" y="231" width="48" height="9" rx="2" fill="#0a1410" opacity="0.55" />

      {/* Header bar */}
      <rect x="26" y="27" width="10" height="10" rx="3" fill="#0ea968" />
      <rect x="44" y="30" width="26" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="76" y="30" width="26" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="108" y="30" width="26" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="270" y="25" width="24" height="10" rx="5" fill="#e1e0d9" />
      <line x1="18" y1="46" x2="302" y2="46" stroke="#e1e0d9" strokeWidth="1" />

      {/* Summary cards */}
      <g>
        <rect x="26" y="56" width="82" height="42" rx="6" fill="#fcfcfb" stroke="#e1e0d9" />
        <rect x="26" y="56" width="82" height="3" rx="1.5" fill="#0ea968" />
        <rect x="34" y="68" width="30" height="3" fill="#c3c2b7" />
        <rect x="34" y="77" width="46" height="6" rx="1" fill="#0b0b0b" />
      </g>
      <g>
        <rect x="119" y="56" width="82" height="42" rx="6" fill="#fcfcfb" stroke="#e1e0d9" />
        <rect x="119" y="56" width="82" height="3" rx="1.5" fill="#e34948" />
        <rect x="127" y="68" width="30" height="3" fill="#c3c2b7" />
        <rect x="127" y="77" width="46" height="6" rx="1" fill="#0b0b0b" />
      </g>
      <g>
        <rect x="212" y="56" width="82" height="42" rx="6" fill="#fcfcfb" stroke="#e1e0d9" />
        <rect x="212" y="56" width="82" height="3" rx="1.5" fill="#898781" />
        <rect x="220" y="68" width="30" height="3" fill="#c3c2b7" />
        <rect x="220" y="77" width="46" height="6" rx="1" fill="#0b0b0b" />
      </g>

      {/* Doughnut chart card */}
      <rect x="26" y="108" width="130" height="86" rx="6" fill="#fcfcfb" stroke="#e1e0d9" />
      <rect x="34" y="116" width="46" height="3" fill="#c3c2b7" />
      <path d="M91 137 L91 111 A26 26 0 0 1 117 137 Z" fill="#eb6834" />
      <path d="M91 137 L117 137 A26 26 0 0 1 91 163 Z" fill="#e87ba4" />
      <path d="M91 137 L91 163 A26 26 0 0 1 65 137 Z" fill="#4a3aa7" />
      <path d="M91 137 L65 137 A26 26 0 0 1 91 111 Z" fill="#2a78d6" />
      <circle cx="91" cy="137" r="11" fill="#fcfcfb" />

      {/* Line chart card */}
      <rect x="164" y="108" width="130" height="86" rx="6" fill="#fcfcfb" stroke="#e1e0d9" />
      <rect x="172" y="116" width="46" height="3" fill="#c3c2b7" />
      <polyline
        points="174,168 196,150 218,158 240,132 262,140 284,120"
        fill="none"
        stroke="#0ea968"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="174" cy="168" r="2.6" fill="#0ea968" />
      <circle cx="218" cy="158" r="2.6" fill="#0ea968" />
      <circle cx="262" cy="140" r="2.6" fill="#0ea968" />
      <circle cx="284" cy="120" r="2.6" fill="#0ea968" />

      {/* Phone */}
      <rect x="222" y="146" width="118" height="222" rx="22" fill="#0f1a15" />
      <rect x="230" y="168" width="102" height="178" rx="10" fill="#fcfcfb" />
      <rect x="266" y="155" width="30" height="6" rx="3" fill="#0f1a15" />
      <rect x="270" y="336" width="22" height="4" rx="2" fill="#4b4b4b" />

      {/* Phone content: mini transaction list */}
      <rect x="240" y="178" width="8" height="8" rx="2.5" fill="#0ea968" />
      <rect x="252" y="180" width="30" height="4" rx="1.5" fill="#0b0b0b" />

      <circle cx="244" cy="204" r="7" fill="#eb6834" />
      <rect x="256" y="199" width="34" height="3.5" rx="1.5" fill="#52514e" />
      <rect x="256" y="207" width="20" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="308" y="201" width="18" height="4" rx="1.5" fill="#e34948" />

      <circle cx="244" cy="232" r="7" fill="#2a78d6" />
      <rect x="256" y="227" width="34" height="3.5" rx="1.5" fill="#52514e" />
      <rect x="256" y="235" width="20" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="308" y="229" width="18" height="4" rx="1.5" fill="#0ea968" />

      <circle cx="244" cy="260" r="7" fill="#4a3aa7" />
      <rect x="256" y="255" width="34" height="3.5" rx="1.5" fill="#52514e" />
      <rect x="256" y="263" width="20" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="308" y="257" width="18" height="4" rx="1.5" fill="#e34948" />

      <circle cx="244" cy="288" r="7" fill="#e87ba4" />
      <rect x="256" y="283" width="34" height="3.5" rx="1.5" fill="#52514e" />
      <rect x="256" y="291" width="20" height="3" rx="1.5" fill="#c3c2b7" />
      <rect x="308" y="285" width="18" height="4" rx="1.5" fill="#0ea968" />
    </svg>
  )
}
