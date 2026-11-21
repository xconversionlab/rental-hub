import type { PlateKind } from "@/domain/present";

export function PropertyPlate({ kind, label }: { kind: PlateKind; label?: string }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-navy text-paper">
      <svg viewBox="0 0 360 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="360" height="240" fill="currentColor" className="text-navy" />
        <rect x="0" y="168" width="360" height="72" className="text-navy-deep" fill="currentColor" />
        {kind === "condo" ? <Condo /> : null}
        {kind === "house" ? <House /> : null}
        {kind === "town" ? <Town /> : null}
        {kind === "suite" ? <Suite /> : null}
        {kind === "office" ? <Office /> : null}
        {kind === "retail" ? <Retail /> : null}
        {kind === "industrial" ? <Industrial /> : null}
      </svg>
      {label ? (
        <p className="absolute right-3 bottom-3 left-3 text-xs tracking-widest text-paper/80 uppercase">{label}</p>
      ) : null}
    </div>
  );
}

function windowGrid(x: number, y: number, cols: number, rows: number, w = 10, h = 14, gap = 6) {
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      cells.push(
        <rect
          key={`${x}-${y}-${row}-${col}`}
          x={x + col * (w + gap)}
          y={y + row * (h + gap)}
          width={w}
          height={h}
          fill="currentColor"
          className="text-brass-soft"
          opacity={0.85}
        />,
      );
    }
  }
  return cells;
}

function Condo() {
  return (
    <g>
      <rect x="78" y="46" width="70" height="150" fill="currentColor" className="text-paper" opacity="0.12" />
      <rect x="158" y="24" width="86" height="172" fill="currentColor" className="text-paper" opacity="0.18" />
      <rect x="254" y="70" width="54" height="126" fill="currentColor" className="text-paper" opacity="0.1" />
      {windowGrid(172, 40, 3, 6)}
      <rect x="188" y="168" width="26" height="28" fill="currentColor" className="text-brass" />
    </g>
  );
}

function House() {
  return (
    <g>
      <polygon points="70,150 180,58 290,150" fill="currentColor" className="text-paper" opacity="0.16" />
      <rect x="104" y="148" width="152" height="72" fill="currentColor" className="text-paper" opacity="0.14" />
      <rect x="166" y="176" width="28" height="44" fill="currentColor" className="text-brass" />
      {windowGrid(118, 164, 1, 1, 22, 22, 0)}
      {windowGrid(214, 164, 1, 1, 22, 22, 0)}
      <circle cx="286" cy="150" r="22" fill="currentColor" className="text-brass" opacity="0.8" />
    </g>
  );
}

function Town() {
  return (
    <g>
      {[0, 1, 2].map((index) => (
        <g key={index}>
          <polygon
            points={`${48 + index * 96},132 ${96 + index * 96},78 ${144 + index * 96},132`}
            fill="currentColor"
            className="text-paper"
            opacity="0.16"
          />
          <rect x={58 + index * 96} y={132} width={76} height={72} fill="currentColor" className="text-paper" opacity={0.1 + index * 0.04} />
          <rect x={84 + index * 96} y={168} width={22} height={36} fill="currentColor" className="text-brass" />
        </g>
      ))}
    </g>
  );
}

function Suite() {
  return (
    <g>
      <rect x="70" y="54" width="220" height="150" fill="currentColor" className="text-paper" opacity="0.08" />
      <rect x="70" y="132" width="220" height="72" fill="currentColor" className="text-paper" opacity="0.16" />
      <rect x="92" y="150" width="86" height="36" fill="currentColor" className="text-brass-soft" opacity="0.9" />
      <rect x="196" y="158" width="64" height="28" fill="currentColor" className="text-brass" />
      <line x1="70" y1="132" x2="290" y2="132" stroke="currentColor" className="text-brass" strokeWidth="2" />
    </g>
  );
}

function Office() {
  return (
    <g>
      <rect x="48" y="48" width="264" height="140" fill="currentColor" className="text-paper" opacity="0.12" />
      {[0, 1, 2, 3].map((row) => (
        <rect key={row} x="64" y={64 + row * 28} width="232" height="10" fill="currentColor" className="text-brass-soft" opacity="0.75" />
      ))}
      <rect x="168" y="156" width="40" height="32" fill="currentColor" className="text-brass" />
    </g>
  );
}

function Retail() {
  return (
    <g>
      <rect x="54" y="78" width="252" height="22" fill="currentColor" className="text-brass" />
      <rect x="64" y="110" width="232" height="78" fill="currentColor" className="text-paper" opacity="0.14" />
      <rect x="154" y="124" width="52" height="64" fill="currentColor" className="text-brass-soft" />
      <rect x="82" y="124" width="52" height="40" fill="currentColor" className="text-paper" opacity="0.2" />
      <rect x="226" y="124" width="52" height="40" fill="currentColor" className="text-paper" opacity="0.2" />
    </g>
  );
}

function Industrial() {
  return (
    <g>
      <polygon points="36,168 120,96 330,96 330,168" fill="currentColor" className="text-paper" opacity="0.12" />
      <rect x="36" y="168" width="294" height="28" fill="currentColor" className="text-paper" opacity="0.08" />
      <rect x="70" y="124" width="78" height="72" fill="currentColor" className="text-brass" />
      <rect x="176" y="112" width="120" height="16" fill="currentColor" className="text-brass-soft" opacity="0.8" />
    </g>
  );
}
