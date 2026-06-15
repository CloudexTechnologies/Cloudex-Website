'use client'

import { useState, useEffect, useRef } from 'react'

/* ── Data ── */
const EMPLOYEES = [
  {
    id: 'sales', num: '01',
    role: 'Sales AI Employee', alias: 'The Prospector',
    metric: { value: '37', label: 'meetings / wk' },
    does: 'Identifies and researches ideal prospects, crafts personalised outreach sequences, manages follow-up cadences, qualifies inbound leads and books meetings directly into your calendar.',
    replaces: 'SDRs, BDRs, lead generation teams, appointment setters.',
    gets: 'Your closers stop chasing cold leads and start showing up to warm conversations.',
    viz: 'pipeline',
  },
  {
    id: 'marketing', num: '02',
    role: 'Marketing AI Employee', alias: 'The Campaign Engine',
    metric: { value: '4.8×', label: 'campaign throughput' },
    does: 'Plans and schedules content across your channels, manages campaign execution, monitors performance and produces regular reports with clear insights. Also handles email marketing, social scheduling and ad performance tracking.',
    replaces: 'Marketing coordinators, content schedulers, campaign managers.',
    gets: 'Your senior marketers spend their time on strategy, not execution.',
    viz: 'channels',
  },
  {
    id: 'support', num: '03',
    role: 'Customer Support AI Employee', alias: 'The First Responder',
    metric: { value: '12s', label: 'avg first response' },
    does: 'Handles inbound customer queries across email, chat and messaging channels. Resolves common issues, escalates complex ones with full context, and ensures no query goes unanswered.',
    replaces: 'First-line support agents, helpdesk coordinators.',
    gets: 'Faster response times, happier customers, and a support team focused on the cases that actually need human judgement.',
    viz: 'queue',
  },
  {
    id: 'finance', num: '04',
    role: 'Finance AI Employee', alias: 'The Numbers Operator',
    metric: { value: '100%', label: 'invoices reconciled' },
    does: 'Monitors cashflow, generates financial summaries and reports, tracks invoices and payment status, flags anomalies and assists with budget tracking.',
    replaces: 'Finance administrators, bookkeeping support, reporting analysts.',
    gets: 'Real-time financial visibility without manual spreadsheet work.',
    viz: 'cashflow',
  },
  {
    id: 'operations', num: '05',
    role: 'Operations AI Employee', alias: 'The Process Keeper',
    metric: { value: '0', label: 'missed deadlines' },
    does: 'Monitors operational workflows, tracks KPIs across departments, manages task routing, ensures deadlines are tracked and escalates blockers before they become problems.',
    replaces: 'Operations coordinators, project administrators.',
    gets: 'An operations layer that runs quietly in the background, keeping everything moving.',
    viz: 'workflow',
  },
  {
    id: 'hr', num: '06',
    role: 'HR and Talent AI Employee', alias: 'The People Coordinator',
    metric: { value: '5d', label: 'time-to-offer' },
    does: 'Manages recruitment pipeline admin, candidate communication, interview scheduling, onboarding task management and internal HR documentation.',
    replaces: 'HR coordinators, recruitment administrators.',
    gets: 'A hiring process that is faster, more consistent and less admin-heavy.',
    viz: 'hiring',
  },
]

/* ── Animated Icons ── */
function IconRadar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx={12} cy={12} r={9} opacity={0.25} />
      <circle cx={12} cy={12} r={5.5} opacity={0.4} />
      <circle cx={12} cy={12} r={1.4} fill="currentColor" stroke="none" />
      <line x1={12} y1={12} x2={12} y2={3.2} style={{ transformOrigin: '12px 12px', animation: 'es-sweep 2.6s linear infinite' }} />
      <circle cx={16.5} cy={8.5} r={1.3} fill="currentColor" stroke="none" style={{ animation: 'es-blip 2.6s ease-in-out infinite' }} />
    </svg>
  )
}
function IconBroadcast() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M4 10v4l4 1 3 3V6L8 9H5a1 1 0 0 0-1 1Z" fill="currentColor" fillOpacity={0.12} />
      <path d="M14.5 8.5a5 5 0 0 1 0 7" style={{ opacity: 0.25, animation: 'es-wave 2.2s ease-out infinite' }} />
      <path d="M17 6.5a8.5 8.5 0 0 1 0 11" style={{ opacity: 0.25, animation: 'es-wave 2.2s ease-out 0.35s infinite' }} />
    </svg>
  )
}
function IconHeadset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x={3.5} y={12.5} width={3.5} height={6} rx={1.5} fill="currentColor" fillOpacity={0.12} />
      <rect x={17} y={12.5} width={3.5} height={6} rx={1.5} fill="currentColor" fillOpacity={0.12} />
      <path d="M17 18.5v.5a3 3 0 0 1-3 3h-2" />
      <circle cx={12} cy={22} r={1.3} fill="currentColor" stroke="none" style={{ animation: 'es-pulse 1.5s ease-in-out infinite' }} />
    </svg>
  )
}
function IconFinance() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M4 4v16h16" opacity={0.3} />
      <rect x={7} y={13} width={2.4} height={5} rx={0.6} fill="currentColor" stroke="none" />
      <rect x={11} y={10} width={2.4} height={8} rx={0.6} fill="currentColor" stroke="none" />
      <rect x={15} y={7} width={2.4} height={11} rx={0.6} fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <g style={{ transformOrigin: '12px 12px', animation: 'es-spin 9s linear infinite' }}>
        <path d="M12 4v2.2M12 17.8V20M20 12h-2.2M6.2 12H4M17.66 6.34l-1.56 1.56M7.9 16.1l-1.56 1.56M17.66 17.66l-1.56-1.56M7.9 7.9 6.34 6.34" />
        <circle cx={12} cy={12} r={4.2} />
      </g>
      <circle cx={12} cy={12} r={1.3} fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconPeople() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx={10} cy={8} r={3.2} />
      <path d="M4 20a6 6 0 0 1 12 0" />
      <path d="M16.5 11.5l1.8 1.8 3.2-3.6" style={{ strokeDasharray: 13, strokeDashoffset: 13, animation: 'es-check 2.8s ease-in-out infinite' }} />
    </svg>
  )
}

const ICONS: Record<string, () => React.ReactElement> = {
  sales: () => <IconRadar />,
  marketing: () => <IconBroadcast />,
  support: () => <IconHeadset />,
  finance: () => <IconFinance />,
  operations: () => <IconGear />,
  hr: () => <IconPeople />,
}

/* ── Visualizations ── */
function VizPipeline() {
  const nodes = [20, 160, 300]
  const labels = ['Sourced', 'Qualified', 'Booked']
  return (
    <div className="es-viz">
      <span className="es-viz-cap">Prospecting pipeline</span>
      <div className="es-vz-pipe">
        <svg className="es-pipe-svg" viewBox="0 0 320 44" preserveAspectRatio="xMidYMid meet">
          <line className="es-vz-rail" x1={20} y1={22} x2={300} y2={22} />
          <rect className="es-vz-railfill" x={20} y={21} width={0} height={2} rx={1} />
          {nodes.map((cx, i) => <circle key={'n'+i} className="es-vz-pnode" cx={cx} cy={22} r={7} />)}
          {nodes.map((cx, i) => <circle key={'f'+i} className={`es-vz-pfill es-vz-pfill-${i}`} cx={cx} cy={22} r={3.4} />)}
          <circle className="es-vz-ptoken" cx={20} cy={22} r={4.5} />
        </svg>
        <div className="es-plabels">
          {labels.map((t, i) => <span key={i} className="es-plabel">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

function VizChannels() {
  const rows = ['Email', 'Social', 'Ads', 'Blog']
  const plan = [
    [1,0,1,0,1,0,0],
    [1,1,0,1,0,1,0],
    [0,1,0,0,1,0,1],
    [1,0,0,1,0,0,1],
  ]
  return (
    <div className="es-viz">
      <span className="es-viz-cap">Content schedule</span>
      <div className="es-vz-cal">
        {rows.map((r, ri) => (
          <div key={r} className="es-vz-cal-row">
            <span className="es-vz-cal-lab">{r}</span>
            <div className="es-vz-cal-slots">
              {plan[ri].map((on, ci) => (
                <span key={ci} className={`es-vz-slot${on ? ' on' : ''}`}
                  style={on ? { animationDelay: `${(ri + ci) * 0.18}s` } : undefined} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VizQueue() {
  const rows = [
    { c: 'Email', t: 'Refund status?', d: 0 },
    { c: 'Chat', t: 'Reset my password', d: 1.1 },
    { c: 'WhatsApp', t: "Where's my order", d: 2.2 },
  ]
  return (
    <div className="es-viz">
      <span className="es-viz-cap">Inbound queue</span>
      <div className="es-vz-queue">
        {rows.map(r => (
          <div key={r.t} className="es-vz-ticket" style={{ animationDelay: `${r.d}s` }}>
            <span className="es-vz-ch">{r.c}</span>
            <span className="es-vz-qtext">{r.t}</span>
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
              style={{ animationDelay: `${r.d + 0.55}s` }}>
              <path d="M5 12.5l4.5 4.5L19 6.5" className="es-vz-check" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

function VizCashflow() {
  const pts: [number, number][] = [[0,64],[45,52],[90,56],[135,38],[180,44],[225,26],[270,32],[320,16]]
  const line = 'M' + pts.map(p => p.join(',')).join(' L')
  const area = line + ' L320,84 L0,84 Z'
  return (
    <div className="es-viz">
      <span className="es-viz-cap">Cashflow</span>
      <div className="es-vz-fin">
        <svg className="es-vz-chart" viewBox="0 0 320 84" preserveAspectRatio="none">
          <line className="es-vz-axis" x1={0} y1={83} x2={320} y2={83} />
          <path className="es-vz-area" d={area} />
          <path d={line} fill="none" stroke="currentColor" strokeWidth={2} />
        </svg>
        <div className="es-vz-pills">
          <span className="es-vz-pill on">Paid · 184</span>
          <span className="es-vz-pill">Pending · 6</span>
        </div>
      </div>
    </div>
  )
}

function VizWorkflow() {
  const sat: [number, number][] = [[36,24],[36,84],[164,24],[164,84]]
  const paths = sat.map(p => `path('M100,54 L${p[0]},${p[1]}')`)
  return (
    <div className="es-viz">
      <span className="es-viz-cap">Process routing</span>
      <div className="es-vz-ops">
        <svg className="es-vz-ops-svg" viewBox="0 0 200 108">
          {sat.map((p, i) => <line key={'e'+i} className="es-vz-edge" x1={100} y1={54} x2={p[0]} y2={p[1]} />)}
          {sat.map((p, i) => <circle key={'s'+i} className="es-vz-sat" cx={p[0]} cy={p[1]} r={7} />)}
          {sat.map((p, i) => <circle key={'sf'+i} className="es-vz-sat-fill" cx={p[0]} cy={p[1]} r={3.2} />)}
          <rect className="es-vz-hub" x={86} y={40} width={28} height={28} rx={7} />
          {paths.map((pth, i) => (
            <circle key={'t'+i} r={3} className="es-vz-ops-tok"
              style={{ offsetPath: pth, animationDelay: `${i * 0.5}s` } as React.CSSProperties} />
          ))}
        </svg>
        <div className="es-vz-kpi">
          <svg className="es-vz-ring-svg" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
            <circle className="es-vz-ring-bg" cx={24} cy={24} r={19} />
            <circle className="es-vz-ring" cx={24} cy={24} r={19} />
          </svg>
          <span className="es-vz-kpi-val">98%</span>
          <span className="es-vz-kpi-label">On-track KPIs</span>
        </div>
      </div>
    </div>
  )
}

function VizHiring() {
  const cols = ['Applied', 'Screen', 'Interview', 'Offer']
  return (
    <div className="es-viz">
      <span className="es-viz-cap">Hiring pipeline</span>
      <div className="es-vz-hire">
        <div className="es-vz-hire-cols">
          {cols.map((c, i) => (
            <div key={c} className="es-vz-col">
              <span className="es-vz-col-h">{c}</span>
              <span className="es-vz-ghost" />
              {i < 2 && <span className="es-vz-ghost" />}
            </div>
          ))}
        </div>
        <div className="es-vz-cand">
          <span className="es-vz-cand-av" />
          <span className="es-vz-cand-ln" />
        </div>
      </div>
    </div>
  )
}

const VIZMAP: Record<string, () => React.ReactElement> = {
  pipeline: () => <VizPipeline />,
  channels: () => <VizChannels />,
  queue: () => <VizQueue />,
  cashflow: () => <VizCashflow />,
  workflow: () => <VizWorkflow />,
  hiring: () => <VizHiring />,
}

/* ── Row ── */
function Row({ emp, open, onToggle }: { emp: typeof EMPLOYEES[0]; open: boolean; onToggle: () => void }) {
  const Icon = ICONS[emp.id] || ICONS.sales
  const Viz = VIZMAP[emp.viz]
  return (
    <div className={`es-row${open ? ' is-open' : ''}`}>
      <button className="es-hd" onClick={onToggle}>
        <span className="es-num">{emp.num}</span>
        <span className="es-ic" style={{ color: open ? 'var(--accent)' : undefined }}>{Icon()}</span>
        <span className="es-tt">
          <span className="es-role">{emp.role}</span>
          <span className="es-alias">{emp.alias}</span>
        </span>
        <span className="es-metric">
          <b>{emp.metric.value}</b>
          <i>{emp.metric.label}</i>
        </span>
        <span className="es-plus">
          <i /><i />
        </span>
      </button>
      <div className="es-collapse">
        <div className="es-inner">
          <div className="es-inner-pad">
            <div className="es-text">
              <div className="es-block">
                <h6>What it does</h6>
                <p>{emp.does}</p>
              </div>
              <div className="es-block">
                <h6>Who it replaces or supports</h6>
                <p>{emp.replaces}</p>
              </div>
              <div className="es-block es-block-accent">
                <h6>What your team gets back</h6>
                <p>{emp.gets}</p>
              </div>
            </div>
            <div className="es-viz-col">
              {open && Viz()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ── */
export function EditorialStack() {
  const [open, setOpen] = useState<string | null>('marketing')

  return (
    <div className="es-wrap">
      <style>{`
        .es-wrap { max-width: 940px; margin: 0 auto; }

        /* row */
        .es-row { border-bottom: 1px solid var(--border); transition: background 0.3s; }
        .es-row.is-open { background: rgba(37,99,235,0.04); }
        [data-theme="dark"] .es-row.is-open { background: rgba(37,99,235,0.07); }

        /* header button */
        .es-hd {
          display: flex; align-items: center; gap: 18px;
          width: 100%; padding: 22px 8px;
          border: 0; background: none; cursor: pointer;
          text-align: left; font: inherit; color: inherit;
        }
        .es-hd:hover .es-role { color: var(--accent); }

        /* number */
        .es-num {
          flex: 0 0 auto; width: 22px;
          font: 600 13px/1 var(--font-heading);
          color: var(--text-3);
          transition: color 0.3s;
        }
        .es-row.is-open .es-num { color: var(--accent); }

        /* icon */
        .es-ic {
          flex: 0 0 auto; width: 28px; height: 28px;
          color: var(--text-3); transition: color 0.3s;
        }
        .es-row.is-open .es-ic { color: var(--accent); }

        /* title group */
        .es-tt { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
        .es-role {
          font-size: 20px; font-weight: 600; line-height: 1.15;
          letter-spacing: -0.01em; color: var(--text-1);
          transition: color 0.3s; font-family: var(--font-heading);
        }
        .es-row.is-open .es-role { color: var(--accent); }
        .es-alias { font-size: 13px; color: var(--text-2); }

        /* metric */
        .es-metric { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; text-align: right; margin-right: 6px; }
        .es-metric b { font: 600 15px/1 var(--font-heading); color: var(--text-1); }
        .es-metric i { font-style: normal; font-size: 9px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-3); }

        /* plus/minus toggle */
        .es-plus { position: relative; width: 17px; height: 17px; flex: 0 0 auto; }
        .es-plus i { position: absolute; background: var(--text-3); border-radius: 2px; transition: transform 0.4s, opacity 0.4s, background 0.3s; }
        .es-plus i:first-child { top: 50%; left: 0; right: 0; height: 2px; margin-top: -1px; }
        .es-plus i:last-child { left: 50%; top: 0; bottom: 0; width: 2px; margin-left: -1px; }
        .es-row.is-open .es-plus i { background: var(--accent); }
        .es-row.is-open .es-plus i:last-child { transform: rotate(90deg); opacity: 0; }

        /* collapse animation */
        .es-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(0.2,0.7,0.2,1); }
        .es-row.is-open .es-collapse { grid-template-rows: 1fr; }
        .es-inner { overflow: hidden; min-height: 0; }
        .es-inner-pad {
          display: grid; grid-template-columns: 1.15fr 0.85fr;
          gap: 28px; align-items: start; padding: 2px 8px 32px;
        }
        @media (max-width: 680px) { .es-inner-pad { grid-template-columns: 1fr; gap: 18px; } }

        /* text blocks */
        .es-text { display: flex; flex-direction: column; gap: 16px; }
        .es-block h6 { font: 600 11px/1 var(--font-heading); letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin: 0 0 6px; }
        .es-block p { font-size: 14.5px; line-height: 1.65; color: var(--text-2); margin: 0; }
        .es-block-accent {
          padding: 14px 16px; border-radius: 12px;
          background: rgba(37,99,235,0.06);
          border: 1px solid rgba(37,99,235,0.14);
        }
        .es-block-accent p { color: var(--text-1); }

        /* viz column */
        .es-viz-col { padding-top: 2px; }

        /* ── shared viz shell ── */
        .es-viz {
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 14px; padding: 14px 16px;
        }
        .es-viz-cap {
          display: block; text-align: right;
          font: 600 10px/1 var(--font-heading);
          text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--text-3); margin-bottom: 12px;
        }

        /* ── Sales pipeline ── */
        .es-vz-pipe { display: flex; flex-direction: column; gap: 11px; padding-top: 8px; }
        .es-pipe-svg { width: 100%; height: 44px; display: block; overflow: visible; }
        .es-vz-rail { stroke: var(--border-strong, rgba(255,255,255,0.12)); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1.5 7; }
        .es-vz-railfill { fill: var(--accent); animation: esPipeRail 4.6s cubic-bezier(0.6,0,0.35,1) infinite; }
        @keyframes esPipeRail { 0%,16%{width:0} 46%,50%{width:140px} 78%,92%{width:280px} 100%{width:280px;opacity:0} }
        .es-vz-pnode { fill: var(--bg); stroke: var(--border-strong, rgba(37,99,235,0.3)); stroke-width: 2; }
        .es-vz-pfill { fill: var(--accent); transform-box: fill-box; transform-origin: center; transform: scale(0); }
        .es-vz-pfill-0 { animation: esPf0 4.6s ease-out infinite; }
        .es-vz-pfill-1 { animation: esPf1 4.6s ease-out infinite; }
        .es-vz-pfill-2 { animation: esPf2 4.6s ease-out infinite; }
        @keyframes esPf0 { 0%,9%{transform:scale(0)} 15%,96%{transform:scale(1)} 100%{transform:scale(0)} }
        @keyframes esPf1 { 0%,45%{transform:scale(0)} 51%,96%{transform:scale(1)} 100%{transform:scale(0)} }
        @keyframes esPf2 { 0%,75%{transform:scale(0)} 81%,96%{transform:scale(1)} 100%{transform:scale(0)} }
        .es-vz-ptoken { fill: var(--accent); offset-path: path('M20,22 L300,22'); animation: esPipeTok 4.6s cubic-bezier(0.6,0,0.35,1) infinite; }
        @keyframes esPipeTok { 0%{offset-distance:0%;opacity:0} 6%{opacity:1} 10%,18%{offset-distance:0%} 46%,52%{offset-distance:50%} 78%,92%{offset-distance:100%;opacity:1} 100%{offset-distance:100%;opacity:0} }
        .es-plabels { display: flex; justify-content: space-between; }
        .es-plabel { font: 600 11px/1 var(--font-heading); color: var(--text-2); }

        /* ── Marketing calendar ── */
        .es-vz-cal { display: flex; flex-direction: column; gap: 7px; padding-top: 2px; }
        .es-vz-cal-row { display: flex; align-items: center; gap: 11px; }
        .es-vz-cal-lab { flex: 0 0 42px; font: 600 10px/1 var(--font-heading); text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-3); text-align: right; }
        .es-vz-cal-slots { flex: 1; display: grid; grid-template-columns: repeat(7,1fr); gap: 5px; }
        .es-vz-slot { height: 14px; border-radius: 4px; background: var(--border); }
        .es-vz-slot.on { background: var(--accent); transform-origin: center; animation: esSlotIn 4.4s ease-out infinite; }
        @keyframes esSlotIn { 0%,5%{transform:scale(0.35);opacity:0} 13%,100%{transform:scale(1);opacity:1} }

        /* ── Support queue ── */
        .es-vz-queue { display: flex; flex-direction: column; gap: 8px; }
        .es-vz-ticket {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px;
          background: var(--surface-solid, var(--bg));
          border: 1px solid var(--border); border-radius: 10px;
          animation: esTicket 4.5s ease-in-out infinite;
          color: var(--accent);
        }
        @keyframes esTicket { 0%{opacity:0;transform:translateY(-8px)} 9%,100%{opacity:1;transform:translateY(0)} }
        .es-vz-ch { font: 700 9px/1 var(--font-heading); letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); background: rgba(37,99,235,0.08); padding: 5px 7px; border-radius: 6px; }
        .es-vz-qtext { flex: 1; font-size: 13px; color: var(--text-2); }
        .es-vz-check { stroke-dasharray: 28; stroke-dashoffset: 0; animation: esCheck 4.5s ease-in-out infinite; }
        @keyframes esCheck { 0%,20%{stroke-dashoffset:28} 36%,100%{stroke-dashoffset:0} }

        /* ── Finance cashflow ── */
        .es-vz-fin { display: flex; flex-direction: column; gap: 12px; padding-top: 2px; }
        .es-vz-chart { width: 100%; height: 84px; color: var(--accent); display: block; }
        .es-vz-axis { stroke: var(--border); stroke-width: 1; }
        .es-vz-area { fill: var(--accent); opacity: 0.1; }
        .es-vz-pills { display: flex; gap: 8px; }
        .es-vz-pill { font: 600 11px/1 var(--font-heading); padding: 7px 11px; border-radius: 999px; background: var(--bg); border: 1px solid var(--border); color: var(--text-2); }
        .es-vz-pill.on { color: var(--accent); border-color: rgba(37,99,235,0.35); }

        /* ── Operations workflow ── */
        .es-vz-ops { display: flex; align-items: center; gap: 22px; padding-top: 2px; }
        .es-vz-ops-svg { flex: 1; height: 104px; color: var(--accent); overflow: visible; }
        .es-vz-edge { stroke: var(--border-strong, rgba(37,99,235,0.2)); stroke-width: 1.4; }
        .es-vz-sat { fill: var(--bg); stroke: var(--border-strong, rgba(37,99,235,0.25)); stroke-width: 1.6; }
        .es-vz-sat-fill { fill: var(--accent); opacity: 0.9; }
        .es-vz-hub { fill: var(--accent); }
        .es-vz-ops-tok { fill: var(--accent); animation: esOpsTok 3s cubic-bezier(0.5,0,0.5,1) infinite; }
        @keyframes esOpsTok { 0%{offset-distance:0%;opacity:0} 10%{opacity:1} 66%{offset-distance:100%;opacity:1} 74%,100%{offset-distance:100%;opacity:0} }
        .es-vz-kpi { position: relative; display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 0 0 auto; }
        .es-vz-ring-svg { width: 58px; height: 58px; }
        .es-vz-ring-bg { fill: none; stroke: var(--border); stroke-width: 4; }
        .es-vz-ring { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 119; stroke-dashoffset: 3; }
        .es-vz-kpi-val { position: absolute; top: 21px; left: 0; right: 0; text-align: center; font: 700 14px/1 var(--font-heading); color: var(--text-1); }
        .es-vz-kpi-label { font: 600 9.5px/1.2 var(--font-heading); text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-3); text-align: center; max-width: 74px; }

        /* ── HR hiring ── */
        .es-vz-hire { position: relative; padding-top: 2px; }
        .es-vz-hire-cols { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
        .es-vz-col { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 9px 8px; display: flex; flex-direction: column; gap: 6px; min-height: 92px; }
        .es-vz-col-h { font: 700 8.5px/1 var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); }
        .es-vz-ghost { height: 18px; border-radius: 5px; background: var(--border); display: block; }
        .es-vz-cand { position: absolute; top: 33px; width: 19%; height: 18px; border-radius: 5px; background: var(--accent); display: flex; align-items: center; gap: 5px; padding: 0 6px; animation: esCandMove 5.6s cubic-bezier(0.7,0,0.3,1) infinite; }
        @keyframes esCandMove { 0%,9%{left:3.5%} 25%,34%{left:28.5%} 50%,59%{left:53.5%} 75%,100%{left:78.5%} }
        .es-vz-cand-av { width: 9px; height: 9px; border-radius: 50%; background: #fff; flex: 0 0 auto; }
        .es-vz-cand-ln { flex: 1; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.75); }

        /* ── Icon keyframes ── */
        @keyframes es-sweep { to { transform: rotate(360deg); } }
        @keyframes es-blip { 0%,45%{opacity:0} 55%,78%{opacity:1} 100%{opacity:0} }
        @keyframes es-wave { 0%{opacity:0} 30%{opacity:1} 100%{opacity:0} }
        @keyframes es-pulse { 0%,100%{opacity:0.25} 50%{opacity:1} }
        @keyframes es-spin { to { transform: rotate(360deg); } }
        @keyframes es-check { 0%,32%{stroke-dashoffset:13} 52%,92%{stroke-dashoffset:0} 100%{stroke-dashoffset:0} }

        @media (prefers-reduced-motion: reduce) {
          .es-vz-railfill, .es-vz-pfill-0, .es-vz-pfill-1, .es-vz-pfill-2,
          .es-vz-ptoken, .es-vz-slot.on, .es-vz-ticket, .es-vz-check,
          .es-vz-ops-tok, .es-vz-cand,
          [style*="es-sweep"], [style*="es-blip"], [style*="es-wave"],
          [style*="es-pulse"], [style*="es-spin"], [style*="es-check"] {
            animation: none !important;
          }
        }
      `}</style>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {EMPLOYEES.map(emp => (
          <Row
            key={emp.id}
            emp={emp}
            open={open === emp.id}
            onToggle={() => setOpen(cur => cur === emp.id ? null : emp.id)}
          />
        ))}
      </div>
    </div>
  )
}
