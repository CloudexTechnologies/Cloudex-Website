/**
 * Animated explainer scenes for the service detail rows (`ServiceDetails`).
 *
 * One small SVG scene per kind of offer, picked from the card's icon. Everything is drawn
 * here and animated by `service-details.css` (keyframes prefixed `svx-`), so there are no
 * image assets and no per-frame JavaScript. Timing is set per element with the `--d`
 * (delay) custom property. The scenes are decorative: the row's text carries the meaning,
 * so each `<svg>` is `aria-hidden`.
 *
 * The one exception to CSS animation is movement along a path (`Traveller`), which uses
 * SMIL `<animateMotion>` because CSS `offset-path` is unreliable on SVG elements.
 */

import * as React from "react";

import type { EnterpriseIconName } from "./EnterpriseIcon";

type Scene =
  | "agent" | "chat" | "flow" | "records" | "team" | "shield" | "lock" | "key"
  | "radar" | "magnify" | "checklist" | "commerce" | "stack" | "code" | "chart"
  | "gauge" | "cloud" | "cycle" | "server" | "globe";

const SCENE_FOR_ICON: Partial<Record<EnterpriseIconName, Scene>> = {
  bot: "agent",
  phone: "chat",
  flow: "flow",
  link: "flow",
  database: "records",
  users: "team",
  shield: "shield",
  lock: "lock",
  key: "key",
  compass: "radar",
  eye: "radar",
  search: "magnify",
  clipboard: "checklist",
  cart: "commerce",
  layers: "stack",
  code: "code",
  chart: "chart",
  gauge: "gauge",
  cloud: "cloud",
  refresh: "cycle",
  server: "server",
  globe: "globe",
};

/** Inline delay for an element's animation. */
const d = (seconds: number): React.CSSProperties => ({ ["--d" as string]: `${seconds}s` });

/** Rotation about a fixed point in the 400×280 scene rather than the element's own box. */
const pivot = (x: number, y: number): React.CSSProperties => ({
  transformBox: "view-box",
  transformOrigin: `${x}px ${y}px`,
});

function Traveller({ path, dur, begin = 0, r = 6 }: { path: string; dur: number; begin?: number; r?: number }) {
  return (
    <circle r={r} className="b">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

function Check({ x, y, className = "ck" }: { x: number; y: number; className?: string }) {
  return <path d={`M${x - 5} ${y} l4 4 l7 -8`} className={className} />;
}

/* -------------------------------------------------------------------------- */
/* Scenes                                                                      */
/* -------------------------------------------------------------------------- */

function AgentScene() {
  return (
    <>
      <circle cx="200" cy="130" r="64" className="ring svx-ring" />
      <g className="svx-float">
        <line x1="200" y1="80" x2="200" y2="62" className="s" strokeWidth="4" />
        <circle cx="200" cy="56" r="7" className="b svx-pulse" />
        <rect x="150" y="80" width="100" height="100" rx="26" className="b" />
        <rect x="170" y="110" width="18" height="26" rx="9" className="w svx-blink" />
        <rect x="212" y="110" width="18" height="26" rx="9" className="w svx-blink" />
        <rect x="178" y="152" width="44" height="8" rx="4" className="w" opacity="0.7" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={`in${i}`} className="svx-feed" style={d(i * 2)}>
          <rect x="22" y={78 + i * 48} width="98" height="32" rx="10" className="card" />
          <rect x="34" y={90 + i * 48} width="54" height="8" rx="4" className="t" />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={`out${i}`} className="svx-pop" style={d(1.3 + i * 2)}>
          <rect x="280" y={78 + i * 48} width="98" height="32" rx="10" className="card" />
          <circle cx="298" cy={94 + i * 48} r="9" className="b" />
          <Check x={298} y={94 + i * 48} />
          <rect x="314" y={90 + i * 48} width="50" height="8" rx="4" className="t" />
        </g>
      ))}
    </>
  );
}

function ChatScene() {
  const bubbles = [
    { x: 74, y: 62, w: 72, cls: "t" },
    { x: 100, y: 98, w: 60, cls: "b" },
    { x: 74, y: 134, w: 82, cls: "t" },
    { x: 94, y: 170, w: 66, cls: "b" },
  ];
  return (
    <>
      <rect x="60" y="30" width="112" height="220" rx="24" className="card" />
      <rect x="98" y="42" width="36" height="6" rx="3" className="t" />
      {bubbles.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height="26" rx="12" className={`${b.cls} svx-pop`} style={d(i * 0.9)} />
      ))}
      <path d="M172 120 C 205 120 212 110 238 110" className="flowline svx-dash" />
      <circle cx="286" cy="110" r="48" className="b" />
      <circle cx="286" cy="110" r="48" className="ring svx-ring" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={255 + i * 10} y="92" width="5" height="36" rx="2.5" className="w svx-wave" style={d(i * 0.12)} />
      ))}
      <g className="svx-pop" style={d(3.2)}>
        <rect x="232" y="186" width="120" height="44" rx="14" className="card" />
        <circle cx="254" cy="208" r="11" className="b" />
        <rect x="272" y="198" width="60" height="7" rx="3.5" className="ink" opacity="0.8" />
        <rect x="272" y="211" width="40" height="6" rx="3" className="t" />
      </g>
    </>
  );
}

function FlowScene({ variant }: { variant: "flow" | "link" }) {
  const path = "M60 200 C 100 200 100 80 140 80 C 190 80 210 190 260 190 C 300 190 300 80 340 80";
  const nodes = [
    [60, 200],
    [140, 80],
    [260, 190],
    [340, 80],
  ] as const;
  return (
    <>
      <path d={path} className="track" />
      <path d={path} className="flowline svx-dash" />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="30" className="ring svx-ring" style={d(i * 0.75)} />
          <rect x={x - 24} y={y - 24} width="48" height="48" rx="14" className="card" />
          {variant === "link" ? (
            <circle cx={x} cy={y} r="9" className={i % 2 ? "b" : "t2"} />
          ) : (
            <rect x={x - 10} y={y - 10} width="20" height="20" rx="6" className={i % 2 ? "b" : "t2"} />
          )}
        </g>
      ))}
      <Traveller path={path} dur={3} />
      <Traveller path={path} dur={3} begin={1.5} r={5} />
    </>
  );
}

function RecordsScene() {
  return (
    <>
      <path d="M130 130 H166" className="flowline svx-dash" />
      <path d="M234 130 H276" className="flowline svx-dash svx-rev" />
      {/* Data: a database cylinder. */}
      <path d="M50 72 V188 A40 12 0 0 0 130 188 V72" className="t" />
      <ellipse cx="90" cy="72" rx="40" ry="12" className="b" />
      {[110, 150, 188].map((y, i) => (
        <path key={y} d={`M50 ${y} A40 12 0 0 0 130 ${y}`} className="s svx-led" strokeWidth="3" fill="none" style={d(i * 0.6)} />
      ))}
      <text x="90" y="226" className="lbl">Data</text>
      {/* Knowledge: a stack of documents. */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="svx-float" style={d(i * 0.3)}>
          <rect x={280 + i * 10} y={62 + i * 16} width="74" height="96" rx="10" className="card" />
          <rect x={292 + i * 10} y={80 + i * 16} width="40" height="6" rx="3" className="t" />
          <rect x={292 + i * 10} y={94 + i * 16} width="50" height="6" rx="3" className="t" />
        </g>
      ))}
      <text x="327" y="226" className="lbl">Knowledge</text>
      <circle cx="200" cy="130" r="34" className="b" />
      <circle cx="200" cy="130" r="34" className="ring svx-ring" />
      <path d="M200 112 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 l13 -5 z" className="w svx-pulse" />
    </>
  );
}

function Person({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r="28" className="card" />
      <circle cx={x} cy={y - 7} r="8" className="b" />
      <path d={`M${x - 14} ${y + 16} a14 12 0 0 1 28 0`} className="b" />
    </>
  );
}

function TeamScene() {
  const people = [
    [70, 70],
    [70, 210],
    [330, 70],
    [330, 210],
  ] as const;
  return (
    <>
      {people.map(([x, y], i) => (
        <path key={`l${i}`} d={`M${x} ${y} L200 140`} className="flowline svx-dash" />
      ))}
      <rect x="160" y="100" width="80" height="80" rx="22" className="b" />
      <g className="svx-spin" style={pivot(200, 140)}>
        <circle cx="200" cy="140" r="14" className="gear" />
        {[0, 45, 90, 135].map((a) => (
          <rect key={a} x="196" y="116" width="8" height="48" rx="3" className="w" transform={`rotate(${a} 200 140)`} />
        ))}
        <circle cx="200" cy="140" r="7" className="b" />
      </g>
      {people.map(([x, y], i) => (
        <g key={`p${i}`} className="svx-float" style={d(i * 0.5)}>
          <Person x={x} y={y} />
        </g>
      ))}
    </>
  );
}

const SHIELD = "M200 40 L268 66 V128 C268 178 240 208 200 228 C160 208 132 178 132 128 V66 Z";

function ShieldScene({ glyph }: { glyph: "check" | "lock" | "key" }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="34" y={52 + i * 62} width="64" height="44" rx="10" className="card" />
          <rect x="302" y={52 + i * 62} width="64" height="44" rx="10" className="card" />
          <rect x="46" y={66 + i * 62} width="30" height="6" rx="3" className="t" />
          <rect x="314" y={66 + i * 62} width="30" height="6" rx="3" className="t" />
        </g>
      ))}
      <path d={SHIELD} className="t" />
      <path d={SHIELD} pathLength={1} className="draw svx-draw" />
      {glyph === "check" ? (
        <path d="M172 132 l20 20 l38 -40" pathLength={1} className="draw thick svx-draw" style={d(0.8)} />
      ) : glyph === "lock" ? (
        <g className="svx-pop" style={d(0.8)}>
          <path d="M184 124 v-14 a16 16 0 0 1 32 0 v14" className="s" strokeWidth="7" fill="none" />
          <rect x="172" y="122" width="56" height="46" rx="10" className="b" />
          <circle cx="200" cy="142" r="6" className="w" />
          <rect x="197" y="144" width="6" height="12" rx="3" className="w" />
        </g>
      ) : (
        <g className="svx-pop" style={d(0.8)}>
          <circle cx="182" cy="136" r="18" className="s" strokeWidth="7" fill="none" />
          <path d="M200 136 H236 M226 136 V150 M214 136 V146" className="s" strokeWidth="7" fill="none" strokeLinecap="round" />
        </g>
      )}
      <rect x="126" y="40" width="148" height="4" rx="2" className="b svx-scan" opacity="0.45" />
    </>
  );
}

function RadarScene({ glyph }: { glyph: "compass" | "eye" }) {
  return (
    <>
      {[40, 80, 112].map((r) => (
        <circle key={r} cx="200" cy="140" r={r} className="track" />
      ))}
      <path d="M200 28 V252 M88 140 H312" className="track" />
      <path d="M200 140 L200 28 A112 112 0 0 1 297 84 Z" className="b sweep svx-spin" style={pivot(200, 140)} />
      {[
        [252, 96, 0.4],
        [150, 190, 1.6],
        [270, 184, 2.6],
        [134, 92, 3.4],
      ].map(([x, y, t], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" className="b svx-blip" style={d(t)} />
          <circle cx={x} cy={y} r="7" className="ring svx-ring" style={d(t)} />
        </g>
      ))}
      <circle cx="200" cy="140" r="24" className="card" />
      {glyph === "eye" ? (
        <g className="svx-blink">
          <path d="M184 140 Q200 124 216 140 Q200 156 184 140 Z" className="b" />
          <circle cx="200" cy="140" r="5" className="w" />
        </g>
      ) : (
        <g className="svx-wobble" style={pivot(200, 140)}>
          <path d="M200 124 L206 140 L200 156 L194 140 Z" className="b" />
          <circle cx="200" cy="140" r="3" className="w" />
        </g>
      )}
    </>
  );
}

function MagnifyScene() {
  return (
    <>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={64 + col * 72}
            y={48 + row * 64}
            width="56"
            height="44"
            rx="10"
            className={(row + col) % 3 === 0 ? "card svx-hit" : "card"}
            style={d((row + col) * 0.5)}
          />
        )),
      )}
      <g className="svx-roam">
        <circle cx="120" cy="104" r="34" className="lens" />
        <circle cx="120" cy="104" r="34" className="s" strokeWidth="7" fill="none" />
        <path d="M145 129 L170 154" className="s" strokeWidth="11" strokeLinecap="round" />
      </g>
    </>
  );
}

function ChecklistScene() {
  return (
    <>
      <rect x="116" y="36" width="168" height="214" rx="18" className="card" />
      <rect x="168" y="24" width="64" height="22" rx="8" className="b" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="140" y={72 + i * 38} width="24" height="24" rx="7" className="box" />
          <path d={`M146 ${84 + i * 38} l5 5 l9 -10`} pathLength={1} className="draw svx-draw" style={d(i * 0.8)} />
          <rect x="176" y={80 + i * 38} width={i % 2 ? 64 : 84} height="8" rx="4" className="t" />
        </g>
      ))}
      <rect x="140" y="226" width="120" height="8" rx="4" className="t" />
      <rect x="140" y="226" width="120" height="8" rx="4" className="b svx-bar" />
    </>
  );
}

function CommerceScene() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} className="svx-float" style={d(i * 0.4)}>
          <rect x={72 + i * 96} y="34" width="64" height="76" rx="14" className="card" />
          <rect x={84 + i * 96} y="46" width="40" height="32" rx="8" className={i === 1 ? "b" : "t2"} />
          <rect x={84 + i * 96} y="88" width="30" height="6" rx="3" className="t" />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`drop${i}`} x={186 + (i - 1) * 16} y="124" width="22" height="22" rx="6" className={i === 1 ? "b svx-drop" : "t2 svx-drop"} style={d(i * 2)} />
      ))}
      <path d="M126 170 H148 L166 232 H258 L278 186 H158" className="s" strokeWidth="8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="176" cy="250" r="9" className="b" />
      <circle cx="250" cy="250" r="9" className="b" />
      <g className="svx-pop" style={d(1.2)}>
        <circle cx="286" cy="170" r="15" className="b" />
        <Check x={286} y={170} />
      </g>
    </>
  );
}

function StackScene() {
  const plane = (y: number) => `M200 ${y} L292 ${y + 32} L200 ${y + 64} L108 ${y + 32} Z`;
  const labels = ["Sales", "Stock", "Finance"];
  return (
    <>
      {[46, 104, 162].map((y, i) => (
        <g key={y} className="svx-float" style={d(i * 0.4)}>
          <path d={plane(y)} className={i === 0 ? "t" : i === 1 ? "t2" : "b"} />
          <path d={`M292 ${y + 32} H318`} className="flowline svx-dash" />
          <rect x="318" y={y + 20} width="66" height="24" rx="12" className="card" />
          <text x="351" y={y + 36} className="lbl">{labels[i]}</text>
        </g>
      ))}
    </>
  );
}

function CodeScene() {
  const lines = [
    { x: 64, w: 90, cls: "b" },
    { x: 80, w: 120, cls: "t" },
    { x: 80, w: 70, cls: "code2" },
    { x: 96, w: 104, cls: "t" },
    { x: 80, w: 56, cls: "b" },
    { x: 64, w: 40, cls: "code2" },
  ];
  return (
    <>
      <rect x="36" y="40" width="236" height="196" rx="18" className="ink" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={58 + i * 16} cy="60" r="5" className="code2" />
      ))}
      {lines.map((l, i) => (
        <rect key={i} x={l.x} y={84 + i * 22} width={l.w} height="9" rx="4.5" className={`${l.cls} svx-type`} style={d(i * 0.45)} />
      ))}
      <rect x="64" y="216" width="3" height="12" className="w svx-caret" />
      <rect x="292" y="66" width="80" height="150" rx="18" className="card" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="304" y={84 + i * 38} width="56" height="28" rx="8" className={`${i === 1 ? "b" : "t"} svx-pop`} style={d(2.7 + i * 0.4)} />
      ))}
    </>
  );
}

function ChartScene() {
  const bars = [70, 100, 88, 140, 170];
  return (
    <>
      <path d="M60 236 H350 M60 236 V40" className="track" />
      {bars.map((h, i) => (
        <rect key={i} x={78 + i * 54} y={236 - h} width="32" height={h} rx="8" className={`${i === 4 ? "b" : "t2"} svx-grow`} style={d(i * 0.15)} />
      ))}
      <path d="M94 150 L148 126 L202 136 L256 92 L310 58" pathLength={1} className="draw svx-draw" style={d(0.6)} />
      {[
        [94, 150],
        [148, 126],
        [202, 136],
        [256, 92],
        [310, 58],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="b svx-pop" style={d(0.9 + i * 0.25)} />
      ))}
    </>
  );
}

function GaugeScene() {
  const arc = "M110 200 A90 90 0 0 1 290 200";
  return (
    <>
      <path d={arc} className="gauge-track" />
      <path d={arc} pathLength={1} className="gauge-fill svx-fill" />
      <line x1="200" y1="200" x2="200" y2="128" className="needle svx-needle" style={pivot(200, 200)} />
      <circle cx="200" cy="200" r="12" className="b" />
      {[0, 1, 2].map((i) => (
        <g key={i} className="svx-pop" style={d(1 + i * 0.5)}>
          <rect x={86 + i * 80} y="226" width="68" height="30" rx="12" className="card" />
          <rect x={98 + i * 80} y="238" width={i === 1 ? 44 : 32} height="6" rx="3" className={i === 1 ? "b" : "t"} />
        </g>
      ))}
    </>
  );
}

function CloudScene() {
  return (
    <>
      <g className="svx-float">
        <circle cx="156" cy="104" r="36" className="t" />
        <circle cx="206" cy="84" r="46" className="t" />
        <circle cx="256" cy="106" r="34" className="t" />
        <rect x="120" y="100" width="172" height="44" rx="22" className="t" />
        <path d="M206 124 V92 M192 104 L206 90 L220 104" className="s" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {[110, 180, 250].map((x, i) => (
        <g key={x}>
          <rect x={x} y="214" width="44" height="34" rx="9" className="card" />
          <circle cx={x + 12} cy="231" r="3.5" className="b svx-led" style={d(i * 0.4)} />
          <rect x={x + 20} y="228" width="16" height="6" rx="3" className="t" />
          <rect x={x + 14} y="188" width="16" height="16" rx="5" className={`${i === 1 ? "b" : "t2"} svx-rise`} style={d(i * 0.9)} />
        </g>
      ))}
    </>
  );
}

function CycleScene() {
  return (
    <>
      <g className="svx-spin" style={pivot(200, 140)}>
        <path d="M200 58 A82 82 0 0 1 282 140" className="s" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M282 140 l-12 -14 M282 140 l14 -12" className="s" strokeWidth="8" strokeLinecap="round" />
        <path d="M200 222 A82 82 0 0 1 118 140" className="s" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M118 140 l12 14 M118 140 l-14 12" className="s" strokeWidth="8" strokeLinecap="round" />
      </g>
      <path d="M170 116 V164 A30 9 0 0 0 230 164 V116" className="t" />
      <ellipse cx="200" cy="116" rx="30" ry="9" className="b" />
      <path d="M170 140 A30 9 0 0 0 230 140" className="s" strokeWidth="3" fill="none" />
      {[
        [48, 60],
        [316, 60],
        [48, 196],
        [316, 196],
      ].map(([x, y], i) => (
        <g key={i} className="svx-pop" style={d(i * 1.2)}>
          <rect x={x} y={y} width="40" height="28" rx="8" className="card" />
          <rect x={x + 8} y={y + 11} width="24" height="6" rx="3" className={i % 2 ? "b" : "t"} />
        </g>
      ))}
    </>
  );
}

function ServerScene() {
  return (
    <>
      <rect x="110" y="34" width="150" height="212" rx="18" className="ink" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="126" y={52 + i * 64} width="118" height="48" rx="10" className="unit" />
          <circle cx="146" cy={76 + i * 64} r="6" className="led-ok svx-led" style={d(i * 0.35)} />
          <circle cx="164" cy={76 + i * 64} r="6" className="b svx-led" style={d(0.6 + i * 0.35)} />
          <rect x="182" y={72 + i * 64} width="46" height="8" rx="4" className="code2" />
        </g>
      ))}
      <path d="M268 140 H292 L304 108 L318 172 L330 124 L340 140 H378" pathLength={1} className="draw svx-draw fast" />
    </>
  );
}

function GlobeScene() {
  return (
    <>
      <circle cx="200" cy="140" r="96" className="t" />
      <circle cx="200" cy="140" r="96" className="s" strokeWidth="3" fill="none" />
      <path d="M104 140 H296 M122 92 H278 M122 188 H278" className="track" />
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx="200" cy="140" rx="96" ry="96" className="meridian svx-meridian" style={d(i * 1.2)} />
      ))}
      <path d="M150 96 Q200 60 256 108" className="flowline svx-dash" />
      <path d="M256 108 Q280 170 214 196" className="flowline svx-dash" />
      <path d="M214 196 Q150 190 150 96" className="flowline svx-dash" />
      {[
        [150, 96],
        [256, 108],
        [214, 196],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="b" />
          <circle cx={x} cy={y} r="9" className="ring svx-ring" style={d(i * 0.8)} />
        </g>
      ))}
    </>
  );
}

function SceneFor({ scene, icon }: { scene: Scene; icon: EnterpriseIconName }) {
  switch (scene) {
    case "agent": return <AgentScene />;
    case "chat": return <ChatScene />;
    case "flow": return <FlowScene variant={icon === "link" ? "link" : "flow"} />;
    case "records": return <RecordsScene />;
    case "team": return <TeamScene />;
    case "shield": return <ShieldScene glyph="check" />;
    case "lock": return <ShieldScene glyph="lock" />;
    case "key": return <ShieldScene glyph="key" />;
    case "radar": return <RadarScene glyph={icon === "eye" ? "eye" : "compass"} />;
    case "magnify": return <MagnifyScene />;
    case "checklist": return <ChecklistScene />;
    case "commerce": return <CommerceScene />;
    case "stack": return <StackScene />;
    case "code": return <CodeScene />;
    case "chart": return <ChartScene />;
    case "gauge": return <GaugeScene />;
    case "cloud": return <CloudScene />;
    case "cycle": return <CycleScene />;
    case "server": return <ServerScene />;
    case "globe": return <GlobeScene />;
  }
}

export function ServiceVisual({ icon }: { icon: EnterpriseIconName }): React.ReactElement {
  const scene = SCENE_FOR_ICON[icon] ?? "flow";
  return (
    <svg className="svx" viewBox="0 0 400 280" aria-hidden="true" focusable="false">
      <SceneFor scene={scene} icon={icon} />
    </svg>
  );
}
