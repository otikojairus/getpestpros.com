import type { buildTrustPoints } from "@/lib/pseo";

type TrustPoint = ReturnType<typeof buildTrustPoints>[number];

const ACCENT_COLORS: Record<string, string> = {
  shield: "#3d7a5a",
  clock: "#8b5e3c",
  check: "#6bbf8a",
  leaf: "#5a8f6e",
};

export function TrustBadges({ points }: { points: TrustPoint[] }) {
  return (
    <div className="trust-badges">
      {points.map((point) => (
        <div key={point.label} className="trust-badge">
          <span className="trust-dot" style={{ background: ACCENT_COLORS[point.icon] ?? "#3d7a5a" }} />
          <div>
            <p className="trust-label">{point.label}</p>
            <p className="trust-detail">{point.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
