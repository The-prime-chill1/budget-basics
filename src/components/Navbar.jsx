// Desktop and mobile navigation header with mega-menus, search bar, and live visitor indicator
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Scale,
  PieChart,
  Wallet,
  Bot,
  Search,
  Info,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Menu,
  X,
  AlertTriangle,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Map,
  Target,
  FileSpreadsheet,
  Compass,
  Sparkles
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import CurrencySelector from './CurrencySelector';
import { getOrCreateStudentSession } from '../utils/userSession';
import { useVisitorCount } from '../utils/visitorCounter';
import './Navbar.css';

const TITLE_SUBTITLE_MAP = {
  '/': 'Budgeting Fundamentals Guide',
  '/budgeting-basics': 'Budgeting Fundamentals Guide',
  '/needs-vs-wants': 'Needs vs Wants Classifier & Guide',
  '/50-30-20': '50/30/20 Rule Formula Allocator',
  '/planner': 'Session Expense & Savings Planner',
  '/savings-goals': 'Savings Goals Estimator',
  '/expense-planner': 'Session Expense Planner',
  '/chatbot': 'BeeWise AI Student Assistant',
  '/feedback': 'Student Feedback & Rating Hub',
  '/contact': 'Campus Support & Hotline Directory',
  '/infographics': 'Visual Learning & Infographics Gallery',
  '/money-mistakes': 'Common Student Money Mistakes',
  '/search': 'Search & Filter Learning Resources',
  '/about': 'About BudgetBasics & TechWiz 7',
  '/privacy': 'Privacy & Data Security Charter',
  '/privacy-policy': 'Privacy & Data Security Charter',
  '/sitemap': 'BudgetBasics Information Architecture',
  '/landing': 'Platform Showcase & Overview',
  '/welcome': 'Platform Showcase & Overview'
};

export const NAV_SECTIONS = [
  {
    id: 'learn',
    title: 'Learn Budgeting',
    icon: BookOpen,
    links: [
      { name: 'Budgeting Basics', path: '/budgeting-basics', desc: 'Income, fixed & variable costs, student cash flow' },
      { name: 'Needs vs Wants', path: '/needs-vs-wants', desc: '10-item campus challenge & 3-step decision tree' },
      { name: '50/30/20 Rule Formula', path: '/50-30-20', desc: 'The golden rule for student allowance allocation' }
    ]
  },
  {
    id: 'practice',
    title: 'Practice Planning',
    icon: Wallet,
    links: [
      { name: 'Savings Goals', path: '/savings-goals', desc: 'Target milestones, deposit frequency & timeline forecast' },
      { name: 'Expense Planner', path: '/expense-planner', desc: 'Add, categorize, edit & track daily campus outlays' },
      { name: 'Money Mistakes', path: '/money-mistakes', desc: '5 campus traps & interactive student habit audit' }
    ]
  },
  {
    id: 'explore',
    title: 'Explore Resources',
    icon: Compass,
    links: [
      { name: 'Infographics & Gallery', path: '/infographics', desc: 'Visual budgeting diagrams & savings cycles' },
      { name: 'Search, Sort & Filter', path: '/search', desc: 'Search and filter all educational resources' }
    ]
  },
  {
    id: 'connect',
    title: 'Get Help / Connect',
    icon: MessageSquare,
    links: [
      { name: 'About BudgetBasics', path: '/about', desc: 'Project mission, educational standards & audience' },
      { name: 'Privacy Policy', path: '/privacy', desc: 'Zero credentials & 100% client-side data charter' },
      { name: 'Student Feedback', path: '/feedback', desc: 'Client-side evaluation and platform rating form' },
      { name: 'Contact Campus Help', path: '/contact', desc: 'Student support directory & academic hotline' },
      { name: 'Visual Sitemap Flow', path: '/sitemap', desc: 'Interactive flowchart of the complete platform' }
    ]
  }
];

export default function Navbar({ theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [session] = useState(() => getOrCreateStudentSession());
  const { liveCount } = useVisitorCount();

  const location = useLocation();
  const dropdownRef = useRef(null);
  const [drawerSearch, setDrawerSearch] = useState('');
  const navigate = useNavigate();

  const cleanPath = location.pathname.replace(/\/$/, '') || '/';
  const subtitle = TITLE_SUBTITLE_MAP[cleanPath] || 'NextGen BudgetBee';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMobileSection(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
        setActiveMobileSection(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentSectionObj = NAV_SECTIONS.find((s) => s.id === activeMobileSection);

  // Portaled to document.body to bypass header backdrop-filter containing block on mobile WebKit
  const renderMobileDrawer = () => {
    if (!mobileMenuOpen || typeof document === 'undefined') return null;

    return createPortal(
      <div
        id="stripe-mobile-nav-drawer"
        className="stripe-mob-drawer-overlay animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setMobileMenuOpen(false);
            setActiveMobileSection(null);
          }
        }}
      >
        <div className="stripe-mob-drawer-panel">
          {!activeMobileSection ? (
            <div className="stripe-drawer-head">
              <Link
                to="/"
                className="stripe-drawer-brand"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveMobileSection(null);
                }}
              >
                <BrandLogo variant="mark" height={28} idPrefix="stripeDrawerLogo" />
                <span className="stripe-drawer-brand-name">BudgetBasics</span>
              </Link>
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

          <div className="stripe-drawer-content">
            {!activeMobileSection ? (
              <div className="stripe-main-nav-flow animate-fade-in">
                <div className="stripe-nav-links-list">
                  {NAV_SECTIONS.map((sec) => {
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
                    <span className="callout-link-sub">Browse all financial tools &amp; guides</span>
                  </Link>
                </div>
              </div>
            ) : (
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
              <CurrencySelector className="drawer-currency-selector" />
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
      </div>,
      document.body
    );
  };

  return (
    <>
      <header className="bee-navbar-root" role="banner" ref={dropdownRef}>
        <div className="navbar-container">
          <Link to="/" className="navbar-brand-group" aria-label="BudgetBasics Home">
            <div className="mascot-badge-frame" title="BudgetBee Official Logo">
              <BrandLogo variant="mark" height={32} idPrefix="navMascot" />
            </div>
            <div className="navbar-brand-text">
              <div className="brand-heading-row">
                <span className="brand-main-title">BudgetBasics</span>
              </div>
              <span className="brand-route-subtitle" title={subtitle}>
                {subtitle}
              </span>
            </div>
          </Link>

          <nav className="navbar-desktop-nav" aria-label="Primary Navigation">
            {NAV_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  className="nav-pillar-item"
                  onMouseEnter={() => setOpenDropdown(sec.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`desk-nav-pill ${openDropdown === sec.id ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === sec.id ? null : sec.id)}
                    aria-expanded={openDropdown === sec.id}
                    aria-haspopup="true"
                  >
                    {Icon && <Icon size={14} className="nav-icon" />}
                    <span>{sec.title}</span>
                    <ChevronDown
                      size={13}
                      className={`dropdown-caret ${openDropdown === sec.id ? 'open' : ''}`}
                    />
                  </button>

                  {openDropdown === sec.id && (
                    <div className="nav-pillar-dropdown animate-fade-in">
                      <div className="dropdown-items-stack">
                        {sec.links.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="pillar-dropdown-link"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="pillar-link-title">{link.name}</div>
                            <div className="pillar-link-desc">{link.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="navbar-right-group">
            <div className="navbar-clock-card hide-on-mobile" title="Live clock">
              <span className="nav-clock-time">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="nav-clock-date">
                {currentTime.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>

            <span className="bee-pill bee-pill-emerald navbar-live-pill hide-on-mobile" title="Real-time learners active on site">
              <span className="live-indicator-dot"></span>
              <span>{liveCount} live</span>
            </span>

            <span className="bee-pill bee-pill-gold navbar-student-pill">
              <span className="live-indicator-dot" style={{ backgroundColor: '#10B981' }}></span>
              <span>{session.userId}</span>
            </span>

            <CurrencySelector compact={true} className="navbar-currency-selector" />

            <button
              type="button"
              className="navbar-theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              <span className={`theme-toggle-icon-wrap ${theme === 'dark' ? 'is-dark' : 'is-light'}`}>
                {theme === 'dark' ? (
                  <Sun size={18} className="theme-toggle-svg sun" />
                ) : (
                  <Moon size={18} className="theme-toggle-svg moon" />
                )}
              </span>
            </button>

            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setActiveMobileSection(null);
              }}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="stripe-mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {renderMobileDrawer()}
    </>
  );
}
