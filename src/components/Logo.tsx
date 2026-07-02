import { siteName } from "@/lib/pseo";

type LogoProps = {
  showText?: boolean;
  size?: number;
  variant?: "light" | "dark";
};

export function LogoMark({ size = 36, variant = "dark" }: { size?: number; variant?: "light" | "dark" }) {
  const bg = variant === "light" ? "#ffffff" : "#1c2b24";
  const accent = "#3d7a5a";
  const mark = variant === "light" ? "#1c2b24" : "#ffffff";

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill={bg} />
      <path
        d="M20 6l11 5v8c0 7.2-4.7 13.4-11 15-6.3-1.6-11-7.8-11-15v-8l11-5z"
        fill={accent}
        opacity="0.95"
      />
      <path
        d="M14 18.5c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z"
        stroke={mark}
        strokeWidth="1.75"
        fill="none"
      />
      <path d="M20 14v9M17 17.5h6M17 20.5h6" stroke={mark} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ showText = true, size = 36, variant = "dark" }: LogoProps) {
  return (
    <span className="logo">
      <LogoMark size={size} variant={variant} />
      {showText && (
        <span className="logo-text">
          <span className="logo-name">{siteName}</span>
          <span className="logo-tag">Canada-wide help</span>
        </span>
      )}
    </span>
  );
}
