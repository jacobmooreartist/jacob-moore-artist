const SPAN = 2880;

function sine(amp: number, mid: number, waves: number, phase: number) {
  let d = "";
  const steps = waves * 24;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * SPAN;
    const y = mid + Math.sin((i / steps) * Math.PI * 2 * waves + phase) * amp;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function shore(amp: number, mid: number, phase: number, height: number) {
  return `${sine(amp, mid, 6, phase)} L${SPAN} ${height} L0 ${height} Z`;
}

const lines = [
  { amp: 10, mid: 28, phase: 0.2, cls: "is-1" },
  { amp: 16, mid: 36, phase: 1.4, cls: "is-2" },
  { amp: 8, mid: 22, phase: 2.6, cls: "is-3" },
  { amp: 14, mid: 40, phase: 4.1, cls: "is-4" },
];

export function TideWash() {
  return (
    <div className="tide-wash" aria-hidden="true">
      {lines.map((line) => (
        <svg
          key={line.cls}
          className={`tide-line ${line.cls}`}
          viewBox={`0 0 ${SPAN} 72`}
          preserveAspectRatio="none"
        >
          <path d={sine(line.amp, line.mid, 6, line.phase)} />
        </svg>
      ))}
      <div className="tide-shore">
        <svg viewBox={`0 0 ${SPAN} 120`} preserveAspectRatio="none">
          <path className="shore-deep" d={shore(18, 48, 0.4, 120)} />
          <path className="shore-thin" d={shore(12, 36, 2.2, 120)} />
          <path className="shore-line" d={sine(14, 34, 6, 1.1)} />
        </svg>
      </div>
    </div>
  );
}
