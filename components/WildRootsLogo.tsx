export default function WildRootsLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 130"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wild Roots Custom Landscaping logo"
    >
      {/* Canopy leaf clusters — amber/gold */}
      <ellipse cx="80" cy="26" rx="28" ry="20" fill="#D97706" />
      <ellipse cx="52" cy="34" rx="20" ry="15" fill="#F59E0B" />
      <ellipse cx="108" cy="34" rx="20" ry="15" fill="#F59E0B" />
      <ellipse cx="34" cy="46" rx="14" ry="10" fill="#D97706" opacity="0.85" />
      <ellipse cx="126" cy="46" rx="14" ry="10" fill="#D97706" opacity="0.85" />
      <ellipse cx="80" cy="18" rx="18" ry="13" fill="#FBBF24" />

      {/* Trunk */}
      <rect x="74" y="56" width="12" height="16" rx="3" fill="#92400E" />

      {/* Ground line */}
      <line x1="18" y1="74" x2="142" y2="74" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />

      {/* Roots — green spreading outward */}
      <path d="M80 74 Q58 82 38 92" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 74 Q66 86 58 100" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M80 74 Q80 88 80 104" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 74 Q94 86 102 100" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M80 74 Q102 82 122 92" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Outer root tips */}
      <path d="M38 92 Q26 96 18 100" stroke="#14532D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M122 92 Q134 96 142 100" stroke="#14532D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M58 100 Q52 106 48 114" stroke="#14532D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M102 100 Q108 106 112 114" stroke="#14532D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
