/* ===== ANIMATED THEME TOGGLER ===== */
const AnimatedThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const isFirst = React.useRef(true);
  const lastSnd = React.useRef(0);
  const audioCtxRef = React.useRef(null);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      isFirst.current = false;
      forceUpdate();
    });
  }, []);

  const playTick = () => {
    try {
      const now = performance.now();
      if (now - lastSnd.current < 80) return;
      lastSnd.current = now;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const rate = ctx.sampleRate;
      const len = Math.floor(rate * 0.006);
      const buf = ctx.createBuffer(1, len, rate);
      const ch = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        ch[i] = (Math.sin(2 * Math.PI * 3400 * t) * 0.6 + (Math.random() * 2 - 1) * 0.4) * Math.pow(1 - t, 3);
      }
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buf;
      gain.gain.value = 0.08;
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch (e) {}
  };

  const ease = 'cubic-bezier(0.16,1,0.3,1)';
  const dur = isFirst.current ? '0ms' : '400ms';
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={() => { toggleTheme(); playTick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Toggle theme"
      style={{
        width: 36, height: 36, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? 'var(--surface-hover)' : 'var(--surface)',
        border: '1px solid var(--border)', color: 'var(--text-2)',
        transition: 'background 0.25s, border-color 0.25s',
        cursor: 'pointer', flexShrink: 0,
      }}
    >
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          <mask id="cloudex-theme-mask">
            <rect width="24" height="24" fill="white" />
            <circle
              r="9" cx="0" cy="0"
              fill="black"
              style={{
                transform: isDark ? 'translate(17px,8px)' : 'translate(33px,0px)',
                transition: `transform ${dur} ${ease}`,
              }}
            />
          </mask>
        </defs>

        {/* Moon / Sun circle */}
        <circle
          cx="12" cy="12" r="9"
          fill="currentColor"
          stroke="none"
          mask="url(#cloudex-theme-mask)"
          style={{
            transform: isDark ? 'scale(1)' : 'scale(0.556)',
            transformOrigin: '12px 12px',
            transition: `transform ${dur} ${ease}`,
          }}
        />

        {/* Sun rays */}
        <g
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'rotate(-30deg) scale(0.6)' : 'rotate(0deg) scale(1)',
            transformOrigin: '12px 12px',
            transition: `opacity ${dur}, transform ${dur} ${ease}`,
          }}
        >
          <line x1="12" y1="1"    x2="12" y2="3"    />
          <line x1="12" y1="21"   x2="12" y2="23"   />
          <line x1="1"  y1="12"   x2="3"  y2="12"   />
          <line x1="21" y1="12"   x2="23" y2="12"   />
          <line x1="5.64"  y1="5.64"  x2="4.22"  y2="4.22"  />
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
          <line x1="5.64"  y1="18.36" x2="4.22"  y2="19.78" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        </g>
      </svg>
    </button>
  );
};

/* ===== NAVBAR ===== */
const navStyles = {
  wrapper: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', justifyContent: 'center',
    padding: '16px 20px',
    transition: 'padding 0.4s cubic-bezier(0.16,1,0.3,1)',
  },
  wrapperScrolled: { padding: '10px 20px' },
  inner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', maxWidth: 1200, padding: '10px 24px',
    borderRadius: 'var(--radius-pill)',
    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    border: '1px solid transparent', position: 'relative',
  },
  innerScrolled: {
    maxWidth: 920, padding: '6px 20px',
    background: 'var(--nav-bg)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 },
  logoImg: { height: 28, filter: 'var(--logo-filter)', transition: 'filter var(--transition)' },
  navLinks: {
    display: 'flex', alignItems: 'center', gap: 4,
    listStyle: 'none', fontFamily: 'var(--font-heading)',
    fontSize: 14, fontWeight: 500,
  },
  navLink: {
    padding: '7px 14px', borderRadius: 'var(--radius-pill)', color: 'var(--text-2)',
    transition: 'all 0.25s', cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative',
    background: 'transparent', border: 'none', fontFamily: 'var(--font-heading)',
    fontSize: 14, fontWeight: 500,
  },
  navLinkHover: { color: 'var(--text-1)', background: 'var(--surface)' },
  rightGroup: { display: 'flex', alignItems: 'center', gap: 8 },
  themeBtn: {
    width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)',
    transition: 'all 0.25s', cursor: 'pointer', fontSize: 16,
  },
  cta: {
    padding: '8px 20px', borderRadius: 'var(--radius-pill)',
    background: 'var(--accent)', color: '#fff',
    fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-heading)',
    transition: 'all 0.25s', cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  },
};

/* Dropdown data */
const capabilitiesMenu = [
  {
    title: 'AI Solutions',
    desc: 'Autonomous AI systems for your business',
    items: [
      'AI Employees for Startups', 'AI Employees for E-commerce',
      'AI Employees for Healthcare', 'AI Employees for Real Estate',
      'AI-Native Products for SaaS', 'AI-Native Products for FinTech',
      'AI-Native Products for EdTech', 'AI-Native Products for Marketplaces',
    ],
  },
  {
    title: 'Digital Growth',
    desc: 'Strengthen your online presence',
    items: [
      'High-Converting Business Website System', 'Search Visibility System',
      'Lead Capture & Conversion System', 'Marketing Automation System',
    ],
  },
  {
    title: 'Custom Software Development',
    desc: 'Built around your processes',
    items: ['Custom Management Systems'],
  },
];

const NavDropdown = ({ open, onEnter, onLeave }) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    style={{
      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
      paddingTop: 10, /* invisible hover bridge */
      zIndex: 100, width: 720, maxWidth: 'calc(100vw - 40px)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
    }}
  >
    <div style={{
      background: 'var(--surface-solid)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: 28,
      boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
    }}>
      {capabilitiesMenu.map((col, ci) => (
        <div key={ci}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--accent)' }}>
            {col.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 14, lineHeight: 1.5 }}>{col.desc}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {col.items.map((item, ii) => (
              <a key={ii} href="#" style={{
                padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                fontSize: 13, color: 'var(--text-2)', transition: 'all 0.2s',
                display: 'block',
              }} onMouseEnter={e => { e.target.style.background = 'var(--surface-hover)'; e.target.style.color = 'var(--text-1)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-2)'; }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hoveredLink, setHoveredLink] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeTimer = React.useRef(null);

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Capabilities', href: '#capabilities', hasDropdown: true },
    { label: 'About', href: '#why-choose' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Contact', href: '#cta' },
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <nav style={{ ...navStyles.wrapper, ...(scrolled ? navStyles.wrapperScrolled : {}) }}>
      <div style={{ ...navStyles.inner, ...(scrolled ? navStyles.innerScrolled : {}) }}>
        {/* Logo */}
        <a href="#hero" style={navStyles.logo} onClick={() => scrollTo('#hero')}>
          <img src="/uploads/Cloudex-Logo-Transparent-1.png" alt="Cloudex" style={navStyles.logoImg} />
        </a>

        {/* Desktop Links */}
        <ul style={navStyles.navLinks}>
          {links.map((link, i) => (
            <li key={i} style={{ position: 'relative' }}
              onMouseEnter={() => { setHoveredLink(i); if (link.hasDropdown) openDropdown(); }}
              onMouseLeave={() => { setHoveredLink(null); if (link.hasDropdown) scheduleClose(); }}>
              <button
                onClick={() => { if (!link.hasDropdown) scrollTo(link.href); else setDropdownOpen(!dropdownOpen); }}
                style={{
                  ...navStyles.navLink,
                  ...(hoveredLink === i || (link.hasDropdown && dropdownOpen) ? navStyles.navLinkHover : {}),
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                {link.label}
                {link.hasDropdown && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{
                    transition: 'transform 0.25s',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}>
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              {link.hasDropdown && (
                <NavDropdown
                  open={dropdownOpen}
                  onEnter={openDropdown}
                  onLeave={scheduleClose}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right group */}
        <div style={navStyles.rightGroup}>
          <AnimatedThemeToggler />
          <MagneticButton style={navStyles.cta}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.boxShadow = '0 4px 24px var(--accent-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Let's Build Together
          </MagneticButton>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            display: 'none', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none',
            cursor: 'pointer',
          }} className="mobile-hamburger">
            <span style={{ width: 20, height: 2, background: 'var(--text-1)', borderRadius: 2, transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}></span>
            <span style={{ width: 20, height: 2, background: 'var(--text-1)', borderRadius: 2, transition: 'all 0.3s',
              opacity: mobileOpen ? 0 : 1 }}></span>
            <span style={{ width: 20, height: 2, background: 'var(--text-1)', borderRadius: 2, transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 16, right: 16, marginTop: 8,
          background: 'var(--surface-solid)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: 20,
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.3s ease',
        }}>
          {links.map((link, i) => (
            <button key={i} onClick={() => scrollTo(link.href)} style={{
              display: 'block', width: '100%', padding: '12px 16px', textAlign: 'left',
              fontSize: 15, fontWeight: 500, color: 'var(--text-1)', fontFamily: 'var(--font-heading)',
              borderRadius: 'var(--radius-sm)', background: 'none', border: 'none',
              cursor: 'pointer', transition: 'background 0.2s',
            }} onMouseEnter={e => e.target.style.background = 'var(--surface)'}
              onMouseLeave={e => e.target.style.background = 'none'}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

Object.assign(window, { Navbar });
