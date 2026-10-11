/** Compact thematic glyphs for clearance platforms — not decorative icon spam. */

type BlockGlyphProps = {
  blockId: string;
  className?: string;
};

export function BlockGlyph({ blockId, className }: BlockGlyphProps) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    className,
    "aria-hidden": true as const,
  };

  switch (blockId) {
    case "00":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
          <path d="M24 12 V24 L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "01":
      return (
        <svg {...common}>
          <rect x="10" y="14" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 36 H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "02":
      return (
        <svg {...common}>
          <circle cx="14" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="34" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="34" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M19 22 L29 18 M19 26 L29 30" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "03":
      return (
        <svg {...common}>
          <rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M14 22 L20 26 L14 30 M24 30 H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "04":
      return (
        <svg {...common}>
          <rect x="12" y="10" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M18 34 H30 M24 30 V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "05":
      return (
        <svg {...common}>
          <path d="M14 16 L8 24 L14 32 M34 16 L40 24 L34 32 M28 14 L20 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "06":
      return (
        <svg {...common}>
          <path d="M10 18 H38 V34 H10 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M10 18 L24 10 L38 18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "07":
      return (
        <svg {...common}>
          <path d="M24 8 L36 14 V24 C36 32 30 38 24 40 C18 38 12 32 12 24 V14 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "08":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
          <path d="M24 10 V16 M24 32 V38 M10 24 H16 M32 24 H38" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "09":
      return (
        <svg {...common}>
          <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 20 H40 M16 28 H28" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "10":
      return (
        <svg {...common}>
          <path d="M12 16 H36 V32 H12 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M18 22 H30 M18 28 H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "11":
      return (
        <svg {...common}>
          <rect x="14" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M18 24 V30 H30 V24 M22 30 V36 M26 30 V36" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "12":
      return (
        <svg {...common}>
          <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="34" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="34" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="36" cy="34" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M24 19 V30 M20 30 L12 30 M24 30 L36 30" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "13":
      return (
        <svg {...common}>
          <path d="M8 28 L16 16 H32 L40 28 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M16 28 V36 H32 V28" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "14":
      return (
        <svg {...common}>
          <circle cx="20" cy="22" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M27 29 L38 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "15":
      return (
        <svg {...common}>
          <path d="M14 12 H34 V36 H14 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M18 20 H30 M18 26 H30 M18 32 H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="14" y="14" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}
