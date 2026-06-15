'use client'

import { Suspense, lazy, useState, useEffect, Component, type ReactNode } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function AiRobotFallback() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, var(--bg-2) 0%, var(--bg) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes spline-pulse { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.35;transform:scale(1.06)} }
        @keyframes spline-ring  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spline-ring2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes spline-blink { 0%,90%,100%{scaleY:1} 95%{scaleY:.08} }
        @keyframes spline-scan  { 0%{top:18%} 100%{top:82%} }
        @keyframes spline-dot   { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes spline-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      {/* Outer glow rings */}
      <div style={{
        position:'absolute', width:320, height:320, borderRadius:'50%',
        border:'1px solid rgba(37,99,235,0.12)',
        animation:'spline-pulse 3s ease-in-out infinite',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
      }}/>
      <div style={{
        position:'absolute', width:240, height:240, borderRadius:'50%',
        border:'1px solid rgba(37,99,235,0.18)',
        animation:'spline-pulse 3s ease-in-out infinite .6s',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
      }}/>

      {/* Spinning orbit ring */}
      <div style={{
        position:'absolute', width:200, height:200,
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        animation:'spline-ring 6s linear infinite',
      }}>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="96" stroke="rgba(37,99,235,0.25)" strokeWidth="1" strokeDasharray="6 10"/>
          <circle cx="100" cy="4" r="4" fill="rgba(37,99,235,0.7)"/>
        </svg>
      </div>
      <div style={{
        position:'absolute', width:160, height:160,
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        animation:'spline-ring2 9s linear infinite',
      }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <circle cx="80" cy="80" r="76" stroke="rgba(37,99,235,0.15)" strokeWidth="1" strokeDasharray="4 14"/>
          <circle cx="80" cy="4" r="3" fill="rgba(96,165,250,0.6)"/>
        </svg>
      </div>

      {/* Robot head — floats */}
      <div style={{
        position:'relative', zIndex:2,
        animation:'spline-float 3.5s ease-in-out infinite',
      }}>
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Antenna */}
          <line x1="60" y1="0" x2="60" y2="18" stroke="rgba(37,99,235,0.5)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="60" cy="0" r="4" fill="rgba(37,99,235,0.8)">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/>
          </circle>

          {/* Head */}
          <rect x="12" y="18" width="96" height="82" rx="16" fill="var(--bg-2)" stroke="rgba(37,99,235,0.35)" strokeWidth="1.5"/>

          {/* Eyes */}
          <rect x="26" y="38" width="28" height="20" rx="6" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.4)" strokeWidth="1"/>
          <rect x="66" y="38" width="28" height="20" rx="6" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.4)" strokeWidth="1"/>

          {/* Pupils (blink via scaleY) */}
          <ellipse cx="40" cy="48" rx="8" ry="7" fill="rgba(37,99,235,0.85)">
            <animate attributeName="ry" values="7;7;7;0.5;7;7" dur="3.2s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="80" cy="48" rx="8" ry="7" fill="rgba(37,99,235,0.85)">
            <animate attributeName="ry" values="7;7;7;0.5;7;7" dur="3.2s" repeatCount="indefinite"/>
          </ellipse>

          {/* Eye shine */}
          <circle cx="44" cy="45" r="2.5" fill="rgba(255,255,255,0.55)"/>
          <circle cx="84" cy="45" r="2.5" fill="rgba(255,255,255,0.55)"/>

          {/* Mouth — scanline bar */}
          <rect x="32" y="74" width="56" height="10" rx="5" fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.3)" strokeWidth="1"/>
          <rect x="34" y="76" width="16" height="6" rx="3" fill="rgba(37,99,235,0.7)">
            <animate attributeName="width" values="6;36;6" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
          </rect>

          {/* Side panels */}
          <rect x="0" y="32" width="10" height="18" rx="3" fill="var(--bg-2)" stroke="rgba(37,99,235,0.25)" strokeWidth="1"/>
          <rect x="110" y="32" width="10" height="18" rx="3" fill="var(--bg-2)" stroke="rgba(37,99,235,0.25)" strokeWidth="1"/>
          <circle cx="5" cy="38" r="2" fill="rgba(37,99,235,0.5)">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="115" cy="38" r="2" fill="rgba(96,165,250,0.5)">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.1s" repeatCount="indefinite"/>
          </circle>

          {/* Neck */}
          <rect x="46" y="100" width="28" height="12" rx="4" fill="var(--bg-2)" stroke="rgba(37,99,235,0.25)" strokeWidth="1"/>

          {/* Chest */}
          <rect x="22" y="112" width="76" height="28" rx="10" fill="var(--bg-2)" stroke="rgba(37,99,235,0.35)" strokeWidth="1.5"/>
          <rect x="34" y="119" width="52" height="6" rx="3" fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.2)" strokeWidth="1"/>
          <rect x="36" y="120" width="12" height="4" rx="2" fill="rgba(37,99,235,0.65)">
            <animate attributeName="x" values="36;72;36" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
          </rect>
        </svg>
      </div>

      {/* Corner data chips */}
      {[
        { t:'8px', l:'12px', label:'CPU', val:'97%' },
        { t:'8px', r:'12px', label:'MEM', val:'4.2GB' },
        { b:'8px', l:'12px', label:'NET', val:'1.2Gbps' },
        { b:'8px', r:'12px', label:'OPS', val:'∞' },
      ].map((chip, i) => (
        <div key={i} style={{
          position:'absolute',
          top: chip.t, bottom: chip.b,
          left: chip.l, right: chip.r,
          background:'rgba(37,99,235,0.06)',
          border:'1px solid rgba(37,99,235,0.18)',
          borderRadius:8, padding:'4px 8px',
          display:'flex', flexDirection:'column', gap:1,
        }}>
          <span style={{ fontSize:9, color:'var(--text-3)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{chip.label}</span>
          <span style={{ fontSize:12, fontWeight:700, color:'var(--accent)', fontVariantNumeric:'tabular-nums' }}>{chip.val}</span>
        </div>
      ))}
    </div>
  )
}

class SplineErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return <AiRobotFallback />
    return this.props.children
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglAvailable(checkWebGL())
  }, [])

  if (webglAvailable === null) return null
  if (!webglAvailable) return <AiRobotFallback />

  return (
    <SplineErrorBoundary>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader" />
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
