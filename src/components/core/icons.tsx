type Props = { className?: string };

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const PinIcon = ({ className = "h-5 w-5" }: Props) => (
  <svg {...base} className={className}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const PhoneIcon = ({ className = "h-5 w-5" }: Props) => (
  <svg {...base} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const InstagramIcon = ({ className = "h-8 w-8" }: Props) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

export const BottleIcon = ({ className = "h-24 w-24" }: Props) => (
  <svg {...base} className={className} viewBox="0 0 48 48">
    <path d="M20 4h8v8l3 5c.6 1 1 2.1 1 3.2V42a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V20.2c0-1.1.4-2.2 1-3.2l3-5V4Z" />
    <path d="M16 26h16M16 36h16" />
  </svg>
);
