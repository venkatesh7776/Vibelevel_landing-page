import Image from "next/image";

// Abstract, pixel-built visuals for the two products. There are no product screenshots in the
// project yet, so these stay illustrative and show no interface or features.

const PITCH = 8;
const DOT = 4;

/** Grid cells whose centre sits within a ring of radius r around the centre. */
function ringDots(size: number, r: number, width = 4) {
  const out: [number, number][] = [];
  const c = size / 2;
  for (let y = 0; y < size; y += PITCH) {
    for (let x = 0; x < size; x += PITCH) {
      const d = Math.hypot(x + DOT / 2 - c, y + DOT / 2 - c);
      if (Math.abs(d - r) < width) out.push([x, y]);
    }
  }
  return out;
}

const AURA_SIZE = 264;
const RINGS = [44, 76, 108].map((r) => ringDots(AURA_SIZE, r));

/** The star mark from the brand raster, cropped the same way as the navbar. */
function StarMark() {
  return (
    <span className="relative block h-[52px] w-[65px] overflow-hidden">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={2167}
        height={725}
        sizes="380px"
        className="absolute left-[-27.87%] top-[-68.97%] h-[238.39%] w-[573.98%] max-w-none"
      />
    </span>
  );
}

/** Aura — the individual: pixel rings radiate out from the mark. */
export function AuraVisual() {
  return (
    <div className="relative flex size-[264px] items-center justify-center">
      {RINGS.map((dots, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox={`0 0 ${AURA_SIZE} ${AURA_SIZE}`}
          shapeRendering="crispEdges"
          className="aura-ring absolute inset-0 size-full fill-pixel"
          style={{ animationDelay: `${i * 1.4}s` }}
        >
          {dots.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={DOT} height={DOT} fillOpacity={0.75 - i * 0.18} />
          ))}
        </svg>
      ))}
      <span className="relative flex size-[104px] items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-20px_rgba(6,36,24,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
        <StarMark />
      </span>
    </div>
  );
}

const COLS = 15;
const ROWS = 8;
const CELL = 18;
/** The few cells that stay lit: the top performers. */
const TOP = new Set(["4-2", "10-5", "12-1"]);

/** Campus — a whole cohort: light sweeps across the grid; a few cells stay lit. */
export function CampusVisual() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      shapeRendering="crispEdges"
      className="w-full max-w-[300px] overflow-visible"
    >
      {Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
          const top = TOP.has(`${c}-${r}`);
          return (
            <g key={`${c}-${r}`}>
              {top && (
                <rect
                  x={c * CELL - 4}
                  y={r * CELL - 4}
                  width={CELL + 1}
                  height={CELL + 1}
                  rx={3}
                  className="fill-none stroke-brand-green/40"
                  strokeWidth={1}
                />
              )}
              <rect
                x={c * CELL}
                y={r * CELL}
                width={CELL - 7}
                height={CELL - 7}
                fillOpacity={top ? 1 : 0.1}
                className={top ? "campus-top fill-brand-green" : "campus-wave fill-brand-green"}
                style={top ? { animationDelay: `${-c * 0.3}s` } : { animationDelay: `${(c + r) * 0.09}s` }}
              />
            </g>
          );
        }),
      )}
    </svg>
  );
}
