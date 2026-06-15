'use client'

import { useEffect, useRef, useCallback } from 'react'

export function RobotMonitor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const txRef = useRef(0)
  const tyRef = useRef(0)
  const cxRef = useRef(0)
  const cyRef = useRef(0)
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const statsTimerRef = useRef<ReturnType<typeof setInterval>>()
  const dblBlinkRef = useRef<ReturnType<typeof setInterval>>()

  const schedBlink = useCallback(() => {
    const robot = robotRef.current
    if (!robot) return
    robot.classList.add('rm-blink')
    setTimeout(() => robot.classList.remove('rm-blink'), 140)
    blinkTimerRef.current = setTimeout(schedBlink, 2600 + Math.random() * 3200)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const robot = robotRef.current
    if (!container || !robot) return

    // ── Eye tracking ──
    const MAX = 5
    function onMove(e: MouseEvent) {
      const r = container.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (e.clientY - (r.top + r.height * 0.45)) / (r.height / 2)
      txRef.current = Math.max(-1, Math.min(1, dx)) * MAX
      tyRef.current = Math.max(-1, Math.min(1, dy)) * MAX
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    function loop() {
      cxRef.current += (txRef.current - cxRef.current) * 0.12
      cyRef.current += (tyRef.current - cyRef.current) * 0.12
      container.querySelectorAll<SVGElement>('.rm-pupil-wrap').forEach(p => {
        p.style.transform = `translate(${cxRef.current}px,${cyRef.current}px)`
      })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // ── Blink ──
    blinkTimerRef.current = setTimeout(schedBlink, 1800)

    // ── Double-blink ──
    dblBlinkRef.current = setInterval(() => {
      if (Math.random() < 0.4) {
        robot.classList.add('rm-blink')
        setTimeout(() => robot.classList.remove('rm-blink'), 110)
        setTimeout(() => {
          robot.classList.add('rm-blink')
          setTimeout(() => robot.classList.remove('rm-blink'), 110)
        }, 200)
      }
    }, 7000)

    // ── Happy on hover ──
    const onEnter = () => robot.classList.add('rm-happy')
    const onLeave = () => robot.classList.remove('rm-happy')
    robot.addEventListener('mouseenter', onEnter)
    robot.addEventListener('mouseleave', onLeave)

    // ── Sparklines ──
    function buildSpark(el: Element, n: number) {
      el.innerHTML = ''
      for (let i = 0; i < n; i++) {
        const bar = document.createElement('i')
        bar.style.height = (3 + Math.random() * 11) + 'px'
        el.appendChild(bar)
      }
      return [...el.children] as HTMLElement[]
    }
    const sparks: Record<string, HTMLElement[]> = {}
    container.querySelectorAll<HTMLElement>('[data-spark]').forEach(el => {
      sparks[el.dataset.spark!] = buildSpark(el, 11)
    })
    function pushSpark(key: string) {
      const bars = sparks[key]
      if (!bars) return
      for (let i = 0; i < bars.length - 1; i++) bars[i].style.height = bars[i + 1].style.height
      bars[bars.length - 1].style.height = (3 + Math.random() * 11) + 'px'
    }

    // ── Live stats ──
    let cpu = 97, mem = 4.2, net = 1.2
    statsTimerRef.current = setInterval(() => {
      cpu = Math.max(82, Math.min(99, cpu + (Math.random() - 0.5) * 5))
      mem = Math.max(3.6, Math.min(5.4, mem + (Math.random() - 0.5) * 0.4))
      net = Math.max(0.6, Math.min(2.4, net + (Math.random() - 0.5) * 0.6))
      const cpuEl = container.querySelector('#rm-cpu')
      const memEl = container.querySelector('#rm-mem')
      const netEl = container.querySelector('#rm-net')
      if (cpuEl) cpuEl.innerHTML = Math.round(cpu) + '<small>%</small>'
      if (memEl) memEl.innerHTML = mem.toFixed(1) + '<small>GB</small>'
      if (netEl) netEl.innerHTML = net.toFixed(1) + '<small>Gbps</small>'
      pushSpark('cpu'); pushSpark('mem'); pushSpark('net')
    }, 1400)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(blinkTimerRef.current)
      clearInterval(dblBlinkRef.current)
      clearInterval(statsTimerRef.current)
      robot.removeEventListener('mouseenter', onEnter)
      robot.removeEventListener('mouseleave', onLeave)
    }
  }, [schedBlink])

  return (
    <div ref={containerRef} className="rm-wrap">
      <style>{`
        .rm-wrap {
          position: relative; width: 100%; height: 100%; overflow: hidden;
          --rm-accent:       #6172f3;
          --rm-accent-deep:  #3f4fe0;
          --rm-accent-soft:  #e7ebfe;
          --rm-accent-softer:#f0f3ff;
          --rm-outline:      #cdd6f7;
          --rm-eye:          #4456ef;
          --rm-robot-fill:   #fbfcff;
          --rm-eye-bg:       #ffffff;
          --rm-shine:        #ffffff;
          --rm-stat-top:     #fdfdff;
          --rm-dots:         rgba(126,140,210,0.20);
          --rm-orbit:        rgba(150,164,225,0.62);
          --rm-orbit-soft:   rgba(150,164,225,0.34);
          --rm-glow:         rgba(108,124,245,0.18);
          --rm-label:        #9aa3c8;
          --rm-value:        #4a5cf0;
          --rm-rshadow:      rgba(90,106,200,0.22);
        }
        [data-theme="dark"] .rm-wrap {
          --rm-accent:       #7c8bff;
          --rm-accent-deep:  #5d6df5;
          --rm-accent-soft:  #262b46;
          --rm-accent-softer:#191c2d;
          --rm-outline:      #2f3560;
          --rm-eye:          #5566f0;
          --rm-robot-fill:   #20243a;
          --rm-eye-bg:       #eef1ff;
          --rm-shine:        #ffffff;
          --rm-stat-top:     #1f2336;
          --rm-dots:         rgba(140,154,230,0.20);
          --rm-orbit:        rgba(150,164,240,0.5);
          --rm-orbit-soft:   rgba(150,164,240,0.26);
          --rm-glow:         rgba(120,136,255,0.24);
          --rm-label:        #727da8;
          --rm-value:        #93a0ff;
          --rm-rshadow:      rgba(0,0,0,0.55);
        }

        /* dots texture */
        .rm-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(var(--rm-dots) 1.4px, transparent 1.5px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(420px 360px at 6% 4%, #000 0%, transparent 70%);
          mask-image: radial-gradient(420px 360px at 6% 4%, #000 0%, transparent 70%);
        }

        /* glow behind robot */
        .rm-glow {
          position: absolute; left: 50%; top: 52%;
          width: 320px; height: 320px;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, var(--rm-glow) 0%, transparent 62%);
          filter: blur(6px); pointer-events: none;
          animation: rm-breathe 6s ease-in-out infinite;
        }
        @keyframes rm-breathe {
          0%,100%{opacity:.65;transform:translate(-50%,-50%) scale(1)}
          50%{opacity:1;transform:translate(-50%,-50%) scale(1.12)}
        }

        /* orbit rings */
        .rm-orbit-wrap {
          position: absolute; left: 50%; top: 46%;
          width: 380px; height: 380px;
          transform: translate(-50%,-50%);
          z-index: 2; pointer-events: none;
        }
        .rm-orbit-wrap svg { width: 100%; height: 100%; overflow: visible; }
        .rm-orbit-ring {
          fill: none; stroke: var(--rm-orbit);
          stroke-width: 2.4; stroke-linecap: round;
          stroke-dasharray: 0 1;
          animation: rm-spin 72s linear infinite;
          transform-origin: 190px 190px;
        }
        .rm-orbit-ring.inner {
          stroke: var(--rm-orbit-soft); stroke-width: 2;
          animation: rm-spin 52s linear infinite reverse;
        }
        @keyframes rm-spin { to { transform: rotate(360deg); } }
        .rm-sat { transform-origin: 190px 190px; animation: rm-spin 11s linear infinite; }
        .rm-sat .pip { fill: var(--rm-accent); filter: drop-shadow(0 0 7px var(--rm-accent)); }
        .rm-sat-2 { animation-duration: 18s; animation-direction: reverse; }
        .rm-sat-2 .pip { fill: var(--rm-accent-deep); }

        /* robot shadow */
        .rm-rshadow {
          position: absolute; left: 50%; top: 76%;
          width: 130px; height: 22px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, var(--rm-rshadow) 0%, transparent 70%);
          animation: rm-sh 5s ease-in-out infinite; z-index: 1;
        }
        @keyframes rm-sh {
          0%,100%{transform:translateX(-50%) scale(1);opacity:.7}
          50%{transform:translateX(-50%) scale(.86);opacity:.5}
        }

        /* robot */
        .rm-robot {
          position: absolute; left: 50%; top: 48%;
          width: 160px;
          transform: translate(-50%,-54%);
          animation: rm-bob 5s ease-in-out infinite; z-index: 3;
        }
        @keyframes rm-bob {
          0%,100%{transform:translate(-50%,-54%) rotate(-1deg)}
          50%{transform:translate(-50%,-58%) rotate(1deg)}
        }
        .rm-robot svg { width: 100%; height: auto; overflow: visible; display: block; }
        .rm-rstroke { stroke: var(--rm-accent); stroke-width: 2.4; fill: var(--rm-robot-fill); }
        .rm-rfill-soft { fill: var(--rm-accent-soft); stroke: var(--rm-accent); stroke-width: 2.4; }
        .rm-antenna-line { stroke: var(--rm-accent); stroke-width: 2.4; stroke-linecap: round; }
        .rm-antenna-ball { fill: var(--rm-accent); animation: rm-blink-ball 1.6s ease-in-out infinite; }
        @keyframes rm-blink-ball { 0%,100%{opacity:.4;r:5px} 50%{opacity:1;r:6.5px} }
        .rm-pupil { fill: var(--rm-eye); transition: transform .12s ease-out; }
        .rm-eye-white { fill: var(--rm-eye-bg); stroke: var(--rm-accent); stroke-width: 2.2; }
        .rm-eye-shine { fill: var(--rm-shine); opacity: .95; }
        .rm-lid {
          fill: var(--rm-accent-soft);
          transform-box: fill-box; transform-origin: center;
          transform: scaleY(0); transition: transform .08s ease;
        }
        .rm-robot.rm-blink .rm-lid { transform: scaleY(1.08); }
        .rm-mouth { fill: var(--rm-eye-bg); stroke: var(--rm-accent); stroke-width: 2.2; }
        .rm-mouth-bar {
          fill: var(--rm-accent);
          transform-box: fill-box; transform-origin: left center;
          animation: rm-talk 3.4s ease-in-out infinite;
        }
        @keyframes rm-talk {
          0%,60%,100%{transform:scaleX(.5);opacity:.9}
          70%{transform:scaleX(.9)}
          80%{transform:scaleX(.35)}
          90%{transform:scaleX(.75)}
        }
        .rm-cheek { fill: #ff9bbd; opacity: 0; transition: opacity .4s ease; }
        .rm-robot.rm-happy .rm-cheek { opacity: .55; }

        /* stat cards */
        .rm-stat {
          position: absolute; z-index: 4;
          background: linear-gradient(180deg, var(--rm-stat-top) 0%, var(--rm-accent-softer) 100%);
          border: 1px solid var(--rm-outline);
          border-radius: 14px; padding: 10px 13px; min-width: 80px;
          box-shadow: 0 10px 22px -14px rgba(74,92,200,0.45);
          animation: rm-float-card 7s ease-in-out infinite;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
          cursor: default;
        }
        .rm-stat:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 18px 34px -16px rgba(74,92,200,0.6); }
        .rm-stat .k {
          font-size: 9px; font-weight: 600; letter-spacing: 0.22em;
          color: var(--rm-label); display: block; margin-bottom: 3px;
          font-variant-numeric: tabular-nums;
        }
        .rm-stat .v {
          font-size: 18px; font-weight: 800; color: var(--rm-value);
          letter-spacing: -0.01em; line-height: 1; font-variant-numeric: tabular-nums;
        }
        .rm-stat .v small { font-size: 11px; font-weight: 700; margin-left: 1px; }
        .rm-stat .spark { display: flex; align-items: flex-end; gap: 2px; height: 12px; margin-top: 6px; }
        .rm-stat .spark i {
          width: 3px; border-radius: 2px;
          background: linear-gradient(var(--rm-accent), #9aa6f8);
          opacity: .85; transition: height .5s cubic-bezier(.16,1,.3,1);
        }
        @keyframes rm-float-card {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)}
        }
        .rm-tl { top: 16px; left: 16px;  animation-delay: -.5s; }
        .rm-tr { top: 16px; right: 16px; animation-delay: -2.4s; text-align: right; }
        .rm-bl { bottom: 16px; left: 16px;  animation-delay: -3.8s; }
        .rm-br { bottom: 16px; right: 16px; animation-delay: -1.6s; text-align: right; min-width: 60px; }
        .rm-tr .spark { justify-content: flex-end; }
        .rm-br .v { display: flex; align-items: center; justify-content: flex-end; gap: 5px; }

        .rm-infinity { width: 26px; height: 14px; }
        .rm-infinity path {
          fill: none; stroke: var(--rm-value); stroke-width: 3.2; stroke-linecap: round;
          stroke-dasharray: 44; stroke-dashoffset: 0;
          animation: rm-trace 2.6s linear infinite;
        }
        @keyframes rm-trace { to { stroke-dashoffset: -88; } }

        @media (prefers-reduced-motion: reduce) {
          .rm-glow, .rm-robot, .rm-rshadow, .rm-orbit-ring, .rm-sat,
          .rm-mouth-bar, .rm-antenna-ball, .rm-stat { animation: none !important; }
        }
      `}</style>

      <div className="rm-dots" />
      <div className="rm-glow" />

      {/* Orbit rings */}
      <div className="rm-orbit-wrap">
        <svg viewBox="0 0 380 380">
          <circle className="rm-orbit-ring" cx="190" cy="190" r="170" pathLength="82" />
          <circle className="rm-orbit-ring inner" cx="190" cy="190" r="124" pathLength="60" />
          <g className="rm-sat"><circle className="pip" cx="190" cy="20" r="4.5" /></g>
          <g className="rm-sat rm-sat-2"><circle className="pip" cx="190" cy="66" r="3" /></g>
        </svg>
      </div>

      {/* Robot shadow */}
      <div className="rm-rshadow" />

      {/* Robot */}
      <div className="rm-robot" id="rm-robot" ref={robotRef}>
        <svg viewBox="0 0 200 210">
          {/* antenna */}
          <line className="rm-antenna-line" x1="100" y1="48" x2="100" y2="18" />
          <circle className="rm-antenna-ball" cx="100" cy="14" r="5.5" />
          {/* ears */}
          <rect className="rm-rfill-soft" x="34" y="92" width="16" height="40" rx="7" />
          <rect className="rm-rfill-soft" x="150" y="92" width="16" height="40" rx="7" />
          <circle className="rm-rstroke" cx="42" cy="112" r="3.5" style={{ fill: 'var(--rm-accent)' }} />
          <circle className="rm-rstroke" cx="158" cy="112" r="3.5" style={{ fill: 'var(--rm-accent)' }} />
          {/* head */}
          <rect className="rm-rstroke" x="48" y="58" width="104" height="92" rx="22" />
          {/* cheeks */}
          <circle className="rm-cheek" cx="68" cy="118" r="8" />
          <circle className="rm-cheek" cx="132" cy="118" r="8" />
          {/* left eye */}
          <g>
            <rect className="rm-eye-white" x="63" y="82" width="30" height="34" rx="13" />
            <g className="rm-pupil-wrap">
              <circle className="rm-pupil" cx="78" cy="99" r="9" />
              <circle className="rm-eye-shine" cx="81.5" cy="95.5" r="2.6" />
            </g>
            <rect className="rm-lid" x="61" y="80" width="34" height="38" rx="13" />
          </g>
          {/* right eye */}
          <g>
            <rect className="rm-eye-white" x="107" y="82" width="30" height="34" rx="13" />
            <g className="rm-pupil-wrap">
              <circle className="rm-pupil" cx="122" cy="99" r="9" />
              <circle className="rm-eye-shine" cx="125.5" cy="95.5" r="2.6" />
            </g>
            <rect className="rm-lid" x="105" y="80" width="34" height="38" rx="13" />
          </g>
          {/* mouth */}
          <rect className="rm-mouth" x="74" y="126" width="52" height="16" rx="8" />
          <rect className="rm-mouth-bar" x="80" y="131" width="40" height="6" rx="3" />
          {/* neck */}
          <rect className="rm-rstroke" x="92" y="150" width="16" height="14" />
          {/* chest */}
          <rect className="rm-rstroke" x="62" y="162" width="76" height="30" rx="13" />
          <rect x="86" y="173" width="28" height="8" rx="4" style={{ fill: 'var(--rm-accent)' }} />
        </svg>
      </div>

      {/* Stat cards */}
      <div className="rm-stat rm-tl">
        <span className="k">CPU</span>
        <span className="v" id="rm-cpu">97<small>%</small></span>
        <div className="spark" data-spark="cpu" />
      </div>
      <div className="rm-stat rm-tr">
        <span className="k">MEM</span>
        <span className="v" id="rm-mem">4.2<small>GB</small></span>
        <div className="spark" data-spark="mem" />
      </div>
      <div className="rm-stat rm-bl">
        <span className="k">NET</span>
        <span className="v" id="rm-net">1.2<small>Gbps</small></span>
        <div className="spark" data-spark="net" />
      </div>
      <div className="rm-stat rm-br">
        <span className="k">OPS</span>
        <span className="v">
          <svg className="rm-infinity" viewBox="0 0 40 22">
            <path d="M6 11 C6 4, 16 4, 20 11 C24 18, 34 18, 34 11 C34 4, 24 4, 20 11 C16 18, 6 18, 6 11 Z" />
          </svg>
        </span>
      </div>
    </div>
  )
}
