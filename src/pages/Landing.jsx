import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calculator,
  PieChart,
  Brain,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  Laptop,
  Check,
  X,
  Lightbulb,
  Zap,
  MessageSquare,
  Bot,
  PlayCircle,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Menu,
  GraduationCap,
  ChevronDown,
  BookOpen,
  Wallet,
  Compass,
  Search
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { getOrCreateStudentSession } from '../utils/userSession';
import './Landing.css';
import '../components/Navbar.css';

const SITEMAP_NAV_SECTIONS = [
  {
    id: 'learn',
    title: 'Learn Budgeting',
    icon: BookOpen,
    path: '/budgeting-basics',
    links: [
      { name: 'Budgeting Basics', path: '/budgeting-basics', desc: 'Income, fixed vs variable costs & foundational plan' },
      { name: 'Needs vs Wants', path: '/needs-vs-wants', desc: '10-item challenge & 3-step decision tree' },
      { name: '50/30/20 Rule Formula', path: '/50-30-20', desc: 'The golden rule for student money allocation' }
    ]
  },
  {
    id: 'practice',
    title: 'Practice Planning',
    icon: Wallet,
    path: '/savings-goals',
    links: [
      { name: 'Savings Goals', path: '/savings-goals', desc: 'Milestone tracker & timeline forecast' },
      { name: 'Expense Planner', path: '/expense-planner', desc: 'Session budget & student expense logger' },
      { name: 'Money Mistakes', path: '/money-mistakes', desc: '5 campus traps & student spending audit' }
    ]
  },
  {
    id: 'explore',
    title: 'Explore Resources',
    icon: Compass,
    path: '/infographics',
    links: [
      { name: 'Infographics & Learning Gallery', path: '/infographics', desc: 'Visual diagrams & money challenges' },
      { name: 'Search, Sort & Filter', path: '/search', desc: 'Filter campus financial resources' }
    ]
  },
  {
    id: 'connect',
    title: 'Get Help / Connect',
    icon: Bot,
    path: '/chatbot',
    links: [
      { name: 'AI Q&A Assistant', path: '/chatbot', desc: 'BeeWise conversational student helper' },
      { name: 'About Us', path: '/about', desc: 'Team PixelForge mission & background' },
      { name: 'Student Feedback', path: '/feedback', desc: 'Client-side evaluation and platform rating' },
      { name: 'Contact Campus Help', path: '/contact', desc: 'Student support directory & academic hotline' },
      { name: 'Visual Sitemap Flow', path: '/sitemap', desc: 'Interactive flowchart of the complete platform' }
    ]
  }
];

export default function Landing() {
  const [session] = useState(() => getOrCreateStudentSession());
  const [drawerSearch, setDrawerSearch] = useState('');
  const navigate = useNavigate();
  const [monthlyIncome, setMonthlyIncome] = useState(1200);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const num = Math.max(0, Number(monthlyIncome) || 0);
  const needsAmount = Math.round(num * 0.5);
  const wantsAmount = Math.round(num * 0.3);
  const savingsAmount = Math.round(num * 0.2);

  const currentSectionObj = SITEMAP_NAV_SECTIONS.find((s) => s.id === activeMobileSection);

  return (
    <div className="stitch-landing-root animate-fade-in">
      {/* Top Ambient Glow */}
      <div className="landing-ambient-glow" aria-hidden="true"></div>

      {/* ================================================================
          0. STITCH HEADER (Exact Stripe Information Architecture)
          ================================================================ */}
      <header className="stitch-header">
        <div className="stitch-header-inner">
          <div className="stitch-brand-wrap">
            <Link to="/" className="stitch-brand-link" aria-label="BudgetBasics Home">
              <BrandLogo height={38} showTagline={false} idPrefix="landingHead" />
            </Link>
          </div>

          {/* Desktop Navigation with 4 Pillars & Dropdown Menus */}
          <nav className="stitch-nav-desktop" aria-label="Information Architecture Navigation">
            {SITEMAP_NAV_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className="stitch-nav-dropdown-wrap"
                onMouseEnter={() => setActiveDropdown(sec.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`stitch-nav-link ${activeDropdown === sec.id ? 'active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === sec.id ? null : sec.id)}
                  aria-expanded={activeDropdown === sec.id}
                  aria-haspopup="true"
                >
                  <span>{sec.title}</span>
                  <ChevronDown
                    size={13}
                    className={`stitch-dropdown-chevron ${activeDropdown === sec.id ? 'rotated' : ''}`}
                  />
                </button>

                {activeDropdown === sec.id && (
                  <div className="stitch-dropdown-menu animate-fade-in">
                    <div className="stitch-dropdown-inner">
                      {sec.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="stitch-dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="dropdown-item-title">{link.name}</div>
                          <div className="dropdown-item-desc">{link.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct AI Assistant link with sparkle */}
            <Link to="/chatbot" className="stitch-nav-link stitch-nav-guide">
              <Sparkles size={14} className="text-gold" />
              <span>AI Assistant</span>
            </Link>
          </nav>

          <div className="stitch-header-actions">
            <div className="stitch-student-badge" title={`Active Guest Session: ${session.userId} (Zero login/auth required)`}>
              <span className="student-badge-dot"></span>
              <span className="student-badge-label">Student:</span>
              <strong className="student-badge-id">{session.userId}</strong>
            </div>
            <Link to="/cockpit" className="stitch-launch-btn">
              <span>Launch Web App</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="stitch-mobile-menu-btn"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setActiveMobileSection(null);
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Stripe-Style Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="stripe-mob-drawer-overlay animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
                setActiveMobileSection(null);
              }
            }}
          >
            <div className="stripe-mob-drawer-panel">
              {/* Header Row */}
              {!activeMobileSection ? (
                <div className="stripe-drawer-head">
                  <div className="stripe-drawer-brand">
                    <BrandLogo variant="mark" height={28} idPrefix="landingDrawerLogo" />
                    <span className="stripe-drawer-brand-name">BudgetBasics</span>
                  </div>
                  <button
                    type="button"
                    className="stripe-drawer-close-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveMobileSection(null);
                    }}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="stripe-drawer-head">
                  <button
                    type="button"
                    className="stripe-drawer-back-btn"
                    onClick={() => setActiveMobileSection(null)}
                    aria-label="Back to main navigation"
                  >
                    <ChevronLeft size={18} />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    className="stripe-drawer-close-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveMobileSection(null);
                    }}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Top Capsule Search Box (Inspired by Reference Design) */}
              <form
                className="drawer-search-wrap"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (drawerSearch.trim()) {
                    setMobileMenuOpen(false);
                    setActiveMobileSection(null);
                    navigate(`/search?q=${encodeURIComponent(drawerSearch.trim())}`);
                  }
                }}
              >
                <Search size={15} className="drawer-search-icon" />
                <input
                  type="text"
                  placeholder="Search guides, tools, calculators..."
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  className="drawer-search-input"
                  aria-label="Search BudgetBasics"
                />
              </form>

              {/* Drawer Content */}
              <div className="stripe-drawer-content">
                {!activeMobileSection ? (
                  // VIEW 1: Main Menu with side carets
                  <div className="stripe-main-nav-flow animate-fade-in">
                    <div className="stripe-nav-links-list">
                      {SITEMAP_NAV_SECTIONS.map((sec) => {
                        const Icon = sec.icon;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            className="stripe-nav-row-btn"
                            onClick={() => setActiveMobileSection(sec.id)}
                          >
                            <div className="stripe-nav-row-left">
                              {Icon && <span className="stripe-row-icon-box"><Icon size={17} /></span>}
                              <span className="stripe-row-title">{sec.title}</span>
                            </div>
                            <ChevronRight size={17} className="stripe-row-caret" />
                          </button>
                        );
                      })}

                      <Link
                        to="/50-30-20"
                        className="stripe-nav-row-btn"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveMobileSection(null);
                        }}
                      >
                        <div className="stripe-nav-row-left">
                          <span className="stripe-row-icon-box"><PieChart size={17} /></span>
                          <span className="stripe-row-title">50/30/20 Formula</span>
                        </div>
                        <ChevronRight size={17} className="stripe-row-caret" />
                      </Link>

                      <Link
                        to="/chatbot"
                        className="stripe-nav-row-btn highlight-row"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveMobileSection(null);
                        }}
                      >
                        <div className="stripe-nav-row-left">
                          <span className="stripe-row-icon-box text-gold"><Sparkles size={17} /></span>
                          <span className="stripe-row-title">BeeWise AI Assistant</span>
                        </div>
                        <ChevronRight size={17} className="stripe-row-caret" />
                      </Link>
                    </div>

                    {/* Callout Box */}
                    <div className="stripe-callout-card">
                      <span className="stripe-callout-heading">Not sure where to start?</span>
                      <Link
                        to="/chatbot"
                        className="stripe-callout-item"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveMobileSection(null);
                        }}
                      >
                        <strong className="callout-link-title">Ask BeeWise AI</strong>
                        <span className="callout-link-sub">Tell us about your campus allowance &amp; situation</span>
                      </Link>
                      <Link
                        to="/sitemap"
                        className="stripe-callout-item"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveMobileSection(null);
                        }}
                      >
                        <strong className="callout-link-title">Explore Visual Sitemap</strong>
                        <span className="callout-link-sub">Browse all financial modules &amp; architecture</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // VIEW 2: Sublinks View
                  <div className="stripe-sublinks-flow animate-fade-in">
                    <div className="stripe-sublinks-category-header">
                      {currentSectionObj?.title}
                    </div>

                    <div className="stripe-sublinks-list">
                      {currentSectionObj?.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="stripe-sublink-entry"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setActiveMobileSection(null);
                          }}
                        >
                          <div className="stripe-sublink-name">{link.name}</div>
                          <div className="stripe-sublink-desc">{link.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom User Profile Card (Matching Reference Design) */}
              <div className="drawer-profile-card">
                <div className="drawer-profile-header">
                  <div className="drawer-avatar-wrap">
                    <img
                      src="/human.jpg"
                      alt="Student Avatar"
                      className="drawer-avatar-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/mascot-bee.png';
                      }}
                    />
                    <span className="drawer-avatar-status-dot"></span>
                  </div>
                  <div className="drawer-profile-info">
                    <span className="drawer-profile-name">{session.userId}</span>
                    <span className="drawer-profile-rank">Campus Sage &bull; Anonymous</span>
                  </div>
                </div>
                <div className="drawer-profile-actions">
                  <Link
                    to="/cockpit"
                    className="drawer-profile-btn drawer-profile-btn-primary"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveMobileSection(null);
                    }}
                  >
                    Launch Cockpit
                  </Link>
                  <Link
                    to="/chatbot"
                    className="drawer-profile-btn drawer-profile-btn-outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveMobileSection(null);
                    }}
                  >
                    Ask AI Tutor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================================================================
          1. HERO SECTION
          ================================================================ */}
      <section className="landing-hero-section">
        {/* Mascot Micro-Badge */}
        <div className="hero-micro-badge-wrap">
          <div className="hero-micro-badge">
            <span className="hero-pulse-dot"></span>
            <span className="hero-badge-text">NextGen BudgetBee Engine &bull; Free for College Students</span>
          </div>
        </div>

        <div className="hero-main-grid">
          {/* Hero Copy */}
          <div className="hero-copy-col">
            <h1 className="hero-title">
              Smart Student Budgeting <br className="hidden sm:inline" />
              <span className="text-gold">Without the Stress</span>
            </h1>

            <p className="hero-lead-text">
              The zero-guilt personal finance launchpad built for college students. Master the 50/30/20 rule,
              crush late-night impulse leaks, lock away emergency cushions, and get 24/7 empathetic guidance from BeeWise AI.
            </p>

            {/* Dual Call to Action Buttons */}
            <div className="hero-cta-buttons-row">
              <Link to="/cockpit" className="bee-btn bee-btn-gold hero-primary-btn">
                <Sparkles size={18} />
                <span>Launch Free App Demo</span>
              </Link>
              <a href="#calculator-preview" className="bee-btn bee-btn-subtle hero-secondary-btn">
                <Calculator size={18} />
                <span>Explore 50/30/20 Tool</span>
              </a>
            </div>

            {/* Social Proof Micro-Strip */}
            <div className="hero-social-proof">
              <div className="school-pill-avatars">
                <span className="school-badge bg-gold-badge">UCLA</span>
                <span className="school-badge bg-emerald-badge">UT</span>
                <span className="school-badge bg-indigo-badge">NYU</span>
                <span className="school-badge bg-gray-badge">+117</span>
              </div>
              <div className="social-proof-text">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="star-icon" fill="currentColor" />
                  ))}
                  <strong className="star-score">4.9/5</strong>
                </div>
                <span className="proof-count">14,800+ undergrads &amp; grads budgeting actively</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Media & Floating Cards */}
          <div className="hero-media-col">
            <div className="hero-media-card">
              <img
                src="/hero.jpg"
                alt="Diverse university students actively learning money skills on a sunlit collegiate green"
                className="hero-main-photo"
              />
              <div className="hero-gradient-scrim"></div>

              {/* Floating Card 1: Safe Spend (Top Left) */}
              <div className="floating-card float-card-spend">
                <div className="float-icon-box bg-emerald-box">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className="float-label">Daily Safe Spend</span>
                  <strong className="float-value text-emerald">$24.50 left today</strong>
                </div>
              </div>

              {/* Floating Card 2: Vault Progress (Center Bottom) */}
              <div className="floating-card float-card-vault">
                <div className="float-vault-header">
                  <span className="float-vault-title">
                    <Laptop size={14} className="text-gold" />
                    <span>Laptop Fund</span>
                  </span>
                  <span className="float-vault-pct">65% Saved</span>
                </div>
                <div className="float-progress-track">
                  <div className="float-progress-fill" style={{ width: '65%' }}></div>
                </div>
                <div className="float-vault-numbers">
                  <span>$650.00</span>
                  <span>Goal: $1,000</span>
                </div>
              </div>

              {/* Floating Card 3: BeeWise AI Insight (Bottom Left) */}
              <div className="floating-card float-card-ai">
                <div className="float-ai-avatar">
                  <Bot size={15} className="text-gold" />
                </div>
                <div className="float-ai-text">
                  <span className="float-ai-tag">BeeWise Proactive Tip</span>
                  <p className="float-ai-desc">
                    Switching to campus iced tea saves you <strong className="text-emerald">+$65/mo</strong>!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. INTERACTIVE LIVE MINI CALCULATOR (50-30-20 IN 5 SECONDS)
          ================================================================ */}
      <section className="landing-calc-section" id="calculator-preview">
        <div className="calc-container-box">
          <div className="calc-header-center">
            <span className="landing-kicker">Interactive Sandbox</span>
            <h2 className="calc-section-title">Try The 50/30/20 Split In 5 Seconds</h2>
            <p className="calc-section-subtitle">
              Drag the slider or enter your monthly allowance, paycheck, or stipend to visualize immediate financial clarity.
            </p>
          </div>

          <div className="calc-inner-card">
            {/* Input & Label */}
            <div className="calc-input-row">
              <label htmlFor="monthly-income-input" className="calc-input-label">
                Monthly Inflow (Work-Study / Stipend / Aid)
              </label>
              <div className="calc-currency-wrapper">
                <span className="calc-currency-prefix">$</span>
                <input
                  id="monthly-income-input"
                  type="number"
                  min="100"
                  max="10000"
                  step="50"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="calc-number-input"
                />
              </div>
            </div>

            {/* Slider Control */}
            <div className="calc-slider-box">
              <input
                type="range"
                min="300"
                max="4000"
                step="25"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="calc-range-slider"
              />
              <div className="calc-slider-scale">
                <span>$300/mo (Light part-time)</span>
                <span>$4,000/mo (Full stipend)</span>
              </div>
            </div>

            {/* Quick Student Inflow Presets */}
            <div className="calc-presets-row">
              <span className="calc-preset-label">Quick Campus Scenarios:</span>
              <div className="calc-preset-btns">
                <button
                  type="button"
                  onClick={() => setMonthlyIncome(500)}
                  className={`calc-preset-btn ${Number(monthlyIncome) === 500 ? 'active' : ''}`}
                >
                  $500 Work-Study
                </button>
                <button
                  type="button"
                  onClick={() => setMonthlyIncome(1200)}
                  className={`calc-preset-btn ${Number(monthlyIncome) === 1200 ? 'active' : ''}`}
                >
                  $1,200 Undergrad
                </button>
                <button
                  type="button"
                  onClick={() => setMonthlyIncome(2400)}
                  className={`calc-preset-btn ${Number(monthlyIncome) === 2400 ? 'active' : ''}`}
                >
                  $2,400 Grad Fellow
                </button>
              </div>
            </div>

            {/* Visual Stacked Bar */}
            <div className="calc-stacked-bar">
              <div className="calc-bar-segment seg-calc-needs" style={{ width: '50%' }} title="50% Needs"></div>
              <div className="calc-bar-segment seg-calc-wants" style={{ width: '30%' }} title="30% Wants"></div>
              <div className="calc-bar-segment seg-calc-savings" style={{ width: '20%' }} title="20% Savings"></div>
            </div>

            {/* Dynamic Output Breakdown Cards */}
            <div className="calc-outputs-grid">
              {/* 50% Needs */}
              <div className="calc-output-card">
                <div className="calc-card-top">
                  <span className="calc-bucket-tag">50% Needs</span>
                  <span className="bucket-indicator bg-gold"></span>
                </div>
                <strong className="calc-bucket-amount">${needsAmount.toLocaleString()}</strong>
                <p className="calc-bucket-desc">Rent, dining plan, groceries, transit &amp; textbooks.</p>
              </div>

              {/* 30% Wants */}
              <div className="calc-output-card">
                <div className="calc-card-top">
                  <span className="calc-bucket-tag">30% Wants</span>
                  <span className="bucket-indicator bg-indigo"></span>
                </div>
                <strong className="calc-bucket-amount">${wantsAmount.toLocaleString()}</strong>
                <p className="calc-bucket-desc">Weekend boba, streaming, gaming &amp; concerts.</p>
              </div>

              {/* 20% Savings */}
              <div className="calc-output-card">
                <div className="calc-card-top">
                  <span className="calc-bucket-tag">20% Savings</span>
                  <span className="bucket-indicator bg-emerald"></span>
                </div>
                <strong className="calc-bucket-amount text-emerald">${savingsAmount.toLocaleString()}</strong>
                <p className="calc-bucket-desc">Emergency buffer, future travel, post-grad seed.</p>
              </div>
            </div>

            {/* Next Step Banner */}
            <div className="calc-next-banner">
              <p className="next-banner-text">
                <Lightbulb size={16} className="text-gold" style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
                <strong>Next step:</strong> Turn this breakdown into your personal real-time dashboard.
              </p>
              <Link to="/50-30-20" className="bee-btn bee-btn-gold calc-lock-btn">
                <span>Lock In This Budget &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. FOUR CORE FEATURE PILLARS
          ================================================================ */}
      <section className="landing-pillars-section">
        <div className="pillars-header-center">
          <span className="landing-kicker text-emerald">Built Specifically For Campus Realities</span>
          <h2 className="pillars-main-title">Everything You Need To Thrive Solo</h2>
          <p className="pillars-subtitle">
            No stock tickers. No mortgage jargon. Just honest, relatable tools designed for student bank accounts.
          </p>
        </div>

        <div className="pillars-bento-grid">
          {/* Pillar 1 */}
          <div className="pillar-bento-card">
            <div className="pillar-icon-box bg-gold-box">
              <PieChart size={24} />
            </div>
            <h3 className="pillar-card-title">50/30/20 Simplified</h3>
            <p className="pillar-card-desc">
              Instantly translates unpredictable stipend deposits or bi-weekly campus dining wages into safe, automatic allowances.
            </p>
            <Link to="/50-30-20" className="pillar-action-link text-gold">
              <span>Zero spreadsheet headache</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="pillar-bento-card">
            <div className="pillar-icon-box bg-indigo-box">
              <Brain size={24} />
            </div>
            <h3 className="pillar-card-title">Needs vs. Wants Engine</h3>
            <p className="pillar-card-desc">
              Our friendly 24-hour delay prompt intercepts midnight campus takeout and impulse shoe sales before your card swipes.
            </p>
            <Link to="/needs-vs-wants" className="pillar-action-link text-indigo">
              <span>Cool down impulse buys</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="pillar-bento-card">
            <div className="pillar-icon-box bg-emerald-box">
              <Shield size={24} />
            </div>
            <h3 className="pillar-card-title">Emergency &amp; Goal Vaults</h3>
            <p className="pillar-card-desc">
              Gamified visual meters make stacking a $500 safety cushion, spring break trip, or new tech fun and rewarding.
            </p>
            <Link to="/planner" className="pillar-action-link text-emerald">
              <span>Micro-milestone rewards</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Pillar 4 */}
          <div className="pillar-bento-card">
            <div className="pillar-icon-box bg-gray-box">
              <Bot size={24} />
            </div>
            <h3 className="pillar-card-title">BeeWise AI Coach</h3>
            <p className="pillar-card-desc">
              Ask real, non-judgmental money questions anytime. Compare meal prep options, track forgotten trials, and budget guilt-free.
            </p>
            <Link to="/chatbot" className="pillar-action-link text-primary">
              <span>Available 24/7 in-app</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. BEFORE VS AFTER COMPARISON
          ================================================================ */}
      <section className="landing-compare-section">
        <div className="compare-outer-box">
          <div className="compare-header-center">
            <span className="landing-kicker">The College Reality Check</span>
            <h2 className="compare-main-title">Ditch The Weekend Panic Loop</h2>
          </div>

          <div className="compare-grid-two">
            {/* Before Card */}
            <div className="compare-card compare-before">
              <div className="compare-card-header">
                <span className="compare-badge-icon bg-red"><X size={14} /></span>
                <h3 className="compare-card-headline">Before BudgetBasics</h3>
              </div>
              <ul className="compare-list">
                <li>
                  <XCircle size={18} className="text-rose" />
                  <span><strong>Overdrawn by Sunday night:</strong> Guessing how much card balance remains after Thursday night hangouts.</span>
                </li>
                <li>
                  <XCircle size={18} className="text-rose" />
                  <span><strong>Forgotten recurring traps:</strong> 5 hidden free trials turning into surprise $14.99 charges right during exams.</span>
                </li>
                <li>
                  <XCircle size={18} className="text-rose" />
                  <span><strong>Intimidating adult banking apps:</strong> Cluttered with 401(k) charts, stock tickers, and confusing terminology.</span>
                </li>
              </ul>
            </div>

            {/* After Card */}
            <div className="compare-card compare-after">
              <div className="compare-card-header">
                <span className="compare-badge-icon bg-emerald"><Check size={14} /></span>
                <h3 className="compare-card-headline">With BudgetBasics (BudgetBee)</h3>
              </div>
              <ul className="compare-list">
                <li>
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span><strong>Daily Safe-Spend Compass:</strong> Always know your real allowable dining &amp; coffee cash without guilt.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span><strong>Subscription Radar:</strong> One-tap audit that catches idle streaming tools before renewal hits.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span><strong>Zero-Jargon Warmth:</strong> Designed with colorful milestone meters that celebrate every $10 milestone you preserve.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. BEEWISE AI SIMULATION SECTION
          ================================================================ */}
      <section className="landing-ai-sim-section">
        <div className="ai-sim-grid">
          {/* Explanation */}
          <div className="ai-sim-copy">
            <div className="ai-badge-pill">
              <Bot size={15} />
              <span>Conversational Campus Advisor</span>
            </div>
            <h2 className="ai-sim-title">
              Real Answers. <br />
              No Judgment. Ever.
            </h2>
            <p className="ai-sim-lead">
              Budgeting shouldn’t feel like a scolding from an accountant. BeeWise analyzes your customized
              50/30/20 buckets to help you make confident day-to-day choices on groceries, rideshares, and campus events.
            </p>
            <div className="ai-sim-points">
              <div className="point-item">
                <div className="point-icon-box">
                  <Zap size={16} />
                </div>
                <span>Instant math tailored to your remaining stipend</span>
              </div>
              <div className="point-item">
                <div className="point-icon-box">
                  <ShieldCheck size={16} />
                </div>
                <span>Keeps your emergency buffer untouched</span>
              </div>
            </div>
          </div>

          {/* Interactive Mock Chat Window */}
          <div className="ai-sim-window">
            <div className="chat-window-top">
              <div className="chat-bee-info">
                <div className="chat-bee-avatar">
                  <Bot size={18} className="text-gold" />
                </div>
                <div>
                  <strong className="chat-bee-name">BeeWise Assistant</strong>
                  <span className="chat-bee-status">
                    <span className="live-dot-green"></span>
                    Online &bull; 50/30/20 Synced
                  </span>
                </div>
              </div>
              <span className="chat-stipend-tag">Stipend: $400 Left</span>
            </div>

            <div className="chat-messages-flow">
              {/* User message */}
              <div className="chat-row user-row">
                <div className="chat-bubble user-bubble">
                  Can I afford $85 concert tickets this weekend on my remaining $400 stipend without wrecking groceries?
                </div>
              </div>

              {/* Bot response */}
              <div className="chat-row bot-row">
                <div className="chat-bot-icon">
                  <Bot size={16} className="text-gold" />
                </div>
                <div className="chat-bubble bot-bubble">
                  <p className="bot-p-bold">Good news: Yes, you can do this safely! Here is how:</p>
                  <div className="bot-breakdown-card">
                    <div className="breakdown-line">
                      <span>Current 30% Wants Bucket:</span>
                      <strong>$120 available</strong>
                    </div>
                    <div className="breakdown-line">
                      <span>Concert Ticket:</span>
                      <strong className="text-rose">-$85.00</strong>
                    </div>
                    <div className="breakdown-line border-top text-emerald">
                      <span>Remaining Fun Cash for next week:</span>
                      <strong>$35.00</strong>
                    </div>
                  </div>
                  <p className="bot-p-sub">
                    Your $200 grocery reserve stays 100% untouched. Go make memories guilt-free!
                  </p>
                </div>
              </div>
            </div>

            {/* Fake input bar */}
            <div className="chat-input-bar">
              <input
                type="text"
                placeholder="Ask BeeWise: 'How much should I spend on dorm groceries?'"
                readOnly
                className="chat-dummy-input"
              />
              <Link to="/chatbot" className="chat-submit-btn" title="Open AI Chatbot">
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          6. STUDENT STORIES & TESTIMONIALS
          ================================================================ */}
      <section className="landing-stories-section">
        <div className="stories-header-center">
          <span className="landing-kicker">Tested On Campuses Nationwide</span>
          <h2 className="stories-title">Real Students. Real Financial Milestones.</h2>
        </div>

        <div className="stories-grid-three">
          {/* Story 1 - Hamid */}
          <div className="story-card">
            <div className="story-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="story-quote">
              “The Needs vs Wants framework completely reset my spending habits. Learning to question small daily purchases saved me over ₦35,000 in my first month on campus.”
            </p>
            <div className="story-author-box">
              <div className="author-avatar-initial bg-emerald-box">H</div>
              <div>
                <strong className="author-name">Hamid</strong>
                <span className="author-dept">Computer Science &bull; Year 1</span>
              </div>
            </div>
          </div>

          {/* Story 2 - Tammy */}
          <div className="story-card">
            <div className="story-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="story-quote">
              “The 50/30/20 calculator and savings milestone tracker made planning my semester allowance effortless. I reached my study laptop fund three weeks ahead of schedule!”
            </p>
            <div className="story-author-box">
              <div className="author-avatar-initial bg-gold-box">T</div>
              <div>
                <strong className="author-name">Tammy</strong>
                <span className="author-dept">Accounting &bull; Year 2</span>
              </div>
            </div>
          </div>

          {/* Story 3 - Lawal */}
          <div className="story-card">
            <div className="story-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="story-quote">
              “Logging campus expenses in the planner prevented money leaks right before exams. Seeing where every naira went helped me avoid typical student debt traps.”
            </p>
            <div className="story-author-box">
              <div className="author-avatar-initial bg-indigo-box">L</div>
              <div>
                <strong className="author-name">Lawal</strong>
                <span className="author-dept">Engineering &bull; Year 3</span>
              </div>
            </div>
          </div>

          {/* Story 4 - Hameed */}
          <div className="story-card">
            <div className="story-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="story-quote">
              “Whenever I was unsure whether an expense was discretionary, the AI assistant and quick search filters gave me immediate, zero-judgment financial advice.”
            </p>
            <div className="story-author-box">
              <div className="author-avatar-initial bg-purple-box">H</div>
              <div>
                <strong className="author-name">Hameed</strong>
                <span className="author-dept">Business Admin &bull; Year 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          7. FINAL CALL TO ACTION BANNER
          ================================================================ */}
      <section className="landing-final-cta-section">
        <div className="cta-banner-card">
          <div className="cta-decor-orb-1" aria-hidden="true"></div>
          <div className="cta-decor-orb-2" aria-hidden="true"></div>

          <div className="cta-banner-content">
            <span className="cta-pill-tag">Zero Barriers &bull; 100% Free</span>
            <h2 className="cta-banner-headline">
              Ready To Build Financial Freedom Before Graduation?
            </h2>
            <p className="cta-banner-sub">
              Join thousands of university peers mastering their allowances, beating overdraft anxiety, and building wealth habits early.
            </p>
            <div className="cta-actions-row">
              <Link to="/cockpit" className="bee-btn bee-btn-white cta-btn-white">
                <PlayCircle size={18} className="text-gold" />
                <span>Launch Interactive Simulator</span>
              </Link>
              <Link to="/about" className="bee-btn bee-btn-outline-white">
                <span>Bring To Your Campus Club</span>
              </Link>
            </div>
            <div className="cta-security-badge">
              <ShieldCheck size={16} />
              <span>No real bank credentials or credit checks required. Safe educational sandbox.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          8. STITCH FOOTER (Exact Mockup Match)
          ================================================================ */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-grid">
            <div className="stitch-footer-brand-col">
              <div className="stitch-footer-brand">
                <Link to="/" className="stitch-footer-brand-link" aria-label="BudgetBasics Home">
                  <BrandLogo height={44} showTagline={true} idPrefix="landingFoot" />
                </Link>
              </div>
              <p className="stitch-footer-desc">
                Empowering high school and collegiate minds to master cash flow, build generational habits, and unlock financial autonomy with gamified clarity.
              </p>
              <div className="stitch-footer-badges">
                <div className="stitch-accredited-badge">
                  <GraduationCap size={15} />
                  <span>Accredited Campus Partner</span>
                </div>
                <div className="stitch-jargon-badge">
                  <ShieldCheck size={15} />
                  <span>Zero-Jargon Platform</span>
                </div>
              </div>
            </div>

            <div className="stitch-footer-col">
              <span className="stitch-col-title">Learning Track</span>
              <a href="#calculator-preview" className="stitch-footer-link">Interactive 50/30/20</a>
              <a href="#features" className="stitch-footer-link">Needs vs Wants Engine</a>
              <Link to="/savings-goals" className="stitch-footer-link">Emergency Fund Builder</Link>
              <Link to="/about" className="stitch-footer-link">Campus Chapter Hub</Link>
            </div>

            <div className="stitch-footer-col">
              <span className="stitch-col-title">Collegiate Care</span>
              <a href="#stories" className="stitch-footer-link">Student Ambassadors</a>
              <Link to="/chatbot" className="stitch-footer-link">Financial Aid Advice</Link>
              <Link to="/contact" className="stitch-footer-link">Peer Tutoring Desk</Link>
              <Link to="/about" className="stitch-footer-link">Student Privacy Shield</Link>
            </div>

            <div className="stitch-footer-col">
              <span className="stitch-col-title">Crisis Hotline</span>
              <p className="stitch-crisis-desc">Campus Financial Emergency Assistance &amp; Guidance line:</p>
              <div className="stitch-hotline-box">
                <strong className="stitch-hotline-num text-gold">1-800-BEE-WISE</strong>
                <span className="stitch-hotline-sub">24/7 Collegiate Advisory Line</span>
                <span className="stitch-hotline-email">help@budgetbasics.edu</span>
              </div>
            </div>
          </div>

          <div className="stitch-footer-bottom">
            <p className="stitch-copyright">
              &copy; {new Date().getFullYear()} BudgetBasics &bull; Built and powered by <strong>Team PixelForge</strong> &bull; Aptech TechWiz 7. Simulation and educational framework only. Not an FDIC-insured banking institution.
            </p>
            <div className="stitch-legal-links">
              <Link to="/about">Privacy Policy</Link>
              <Link to="/about">Terms of Education</Link>
              <Link to="/about">Campus Standards</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
