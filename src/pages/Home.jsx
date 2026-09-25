// Student cockpit dashboard featuring daily motivation quotes, quick tool access, and visitor metrics
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  BarChart3,
  TrendingUp,
  Calendar,
  BookOpen,
  Scale,
  PieChart,
  PiggyBank,
  Bot,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Award,
  CheckCircle2,
  Check,
  Lock,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  ShieldCheck,
  Info,
  Clock,
  Eye,
  Users
} from 'lucide-react';
import { getOrCreateStudentSession } from '../utils/userSession';
import { useVisitorCount } from '../utils/visitorCounter';
import './Home.css';

const MOTIVATIONAL_QUOTES = [
  {
    text: 'Do not save what is left after spending, but spend what is left after saving.',
    author: '— Warren Buffett'
  },
  {
    text: 'A budget is telling your money where to go instead of wondering where it went.',
    author: '— Dave Ramsey'
  },
  {
    text: 'Beware of little expenses; a small leak will sink a great ship.',
    author: '— Benjamin Franklin'
  },
  {
    text: 'Financial freedom is available to those who learn about it and work for it.',
    author: '— Robert Kiyosaki'
  },
  {
    text: "It's not your salary that makes you rich, it's your spending habits.",
    author: '— Charles A. Jaffe'
  }
];

export default function Home() {
  const [session] = useState(() => getOrCreateStudentSession());
  const { liveCount } = useVisitorCount();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isQuoteFading, setIsQuoteFading] = useState(false);
  const [isTipSaved, setIsTipSaved] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  const handleCycleQuote = () => {
    setIsQuoteFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsQuoteFading(false);
    }, 180);
  };

  const handleToggleSaveTip = () => {
    const nextSaved = !isTipSaved;
    setIsTipSaved(nextSaved);
    setSaveToast(nextSaved ? 'Tip bookmarked to your study vault!' : 'Tip removed from bookmarks');
    setTimeout(() => setSaveToast(null), 2500);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <div className="cockpit-home-screen animate-fade-in">
      {saveToast && (
        <div className="cockpit-toast animate-fade-in" role="status" aria-live="polite">
          <BookmarkCheck size={16} className="toast-icon" />
          <span>{saveToast}</span>
        </div>
      )}

      <section className="cockpit-card welcome-card">
        <div className="welcome-glow-orb" aria-hidden="true"></div>

        <div className="welcome-header-row">
          <div className="welcome-titles">
            <div className="welcome-badges-row">
              <span className="bee-pill bee-pill-emerald term-badge">
                <span className="live-ping-dot"></span>
                Spring Term '25
              </span>
              <span className="campus-name-tag">State University</span>
            </div>

            <h1 className="welcome-heading">
              Welcome back, {session.userId}! <Sparkles size={22} className="welcome-title-sparkle text-gold" style={{ display: 'inline', verticalAlign: 'middle' }} />
            </h1>
            <p className="welcome-subhead">
              Your personal finance launchpad &amp; student survival cockpit
            </p>
          </div>

          <div className="fire-streak-badge" title="5-Day Budgeting Streak!">
            <Flame size={26} className="fire-icon" />
          </div>
        </div>

        <div className="community-pulse-row">
          <div className="pulse-item students-pulse">
            <span className="pulse-dot"></span>
            <span className="pulse-text">{liveCount} {liveCount === 1 ? 'student' : 'students'} budgeting today</span>
          </div>

          <div className="pulse-item sage-rank-badge">
            <Award size={15} className="rank-icon" />
            <span>Rank: Campus Sage</span>
          </div>
        </div>

        <div className="quote-cycle-box">
          <div className="quote-icon-frame">
            <Sparkles size={17} />
          </div>
          <div className="quote-content-frame">
            <p className={`quote-body ${isQuoteFading ? 'fade-out' : 'fade-in'}`}>
              “{currentQuote.text}”
            </p>
            <span className={`quote-author ${isQuoteFading ? 'fade-out' : 'fade-in'}`}>
              {currentQuote.author}
            </span>
          </div>
          <button
            type="button"
            className="quote-cycle-btn"
            onClick={handleCycleQuote}
            aria-label="Cycle to next motivational quote"
            title="Next financial quote"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </section>

      <section className="cockpit-card monthly-cockpit-card">
        <div className="cockpit-card-header">
          <div className="card-header-left">
            <div className="card-header-icon-box bg-gold-tint">
              <BarChart3 size={20} className="text-gold" />
            </div>
            <h2 className="card-main-heading">Monthly Spend Cockpit</h2>
          </div>
          <span className="bee-pill bee-pill-gold month-badge">
            March 2025
          </span>
        </div>

        <div className="metrics-two-col-grid">
          <div className="metric-stat-card">
            <span className="stat-label">Allocated / Spent</span>
            <div className="stat-value-row">
              <strong className="stat-value">$468.50</strong>
            </div>
            <div className="stat-meta text-emerald">
              <TrendingUp size={14} />
              <span>39% of monthly limit</span>
            </div>
          </div>

          <div className="metric-stat-card">
            <span className="stat-label">Safe Daily Spend</span>
            <div className="stat-value-row">
              <strong className="stat-value text-emerald">$24.50</strong>
            </div>
            <div className="stat-meta text-muted">
              <Calendar size={14} />
              <span>16 days left in cycle</span>
            </div>
          </div>
        </div>

        <div className="budget-bar-section">
          <div className="bar-header-row">
            <span className="bar-title">Budget Distribution (Target: $1,200)</span>
            <span className="bar-remaining-pill">$731.50 remaining</span>
          </div>

          <div className="segmented-progress-track" role="progressbar" aria-valuenow={39} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="segment-bar seg-needs"
              style={{ width: '50%' }}
              title="50% Needs Cap ($600)"
            ></div>
            <div
              className="segment-bar seg-wants"
              style={{ width: '30%' }}
              title="30% Wants Cap ($360)"
            ></div>
            <div
              className="segment-bar seg-savings"
              style={{ width: '20%' }}
              title="20% Savings Target ($240)"
            ></div>
          </div>

          <div className="segments-legend-grid">
            <div className="legend-item">
              <span className="legend-dot dot-needs"></span>
              <div className="legend-texts">
                <strong className="legend-title">Needs (50%)</strong>
                <span className="legend-sub">$600 cap</span>
              </div>
            </div>

            <div className="legend-item">
              <span className="legend-dot dot-wants"></span>
              <div className="legend-texts">
                <strong className="legend-title">Wants (30%)</strong>
                <span className="legend-sub">$360 cap</span>
              </div>
            </div>

            <div className="legend-item">
              <div className="legend-dot dot-savings"></div>
              <div className="legend-texts">
                <strong className="legend-title">Savings (20%)</strong>
                <span className="legend-sub">$240 auto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="learning-pods-section">
        <div className="pods-header-row">
          <h2 className="pods-section-heading">Interactive Learning Pods</h2>
          <span className="pods-subtitle-hint">Touch to explore</span>
        </div>

        <div className="pods-grid">
          <Link to="/budgeting-basics" className="pod-card group">
            <div className="pod-icon-box bg-gold-box">
              <BookOpen size={22} className="pod-icon" />
            </div>
            <div className="pod-content">
              <span className="pod-badge text-gold">Pillar 1 to 6</span>
              <h3 className="pod-title">Budgeting 101</h3>
              <p className="pod-desc">6 fundamental rules &amp; rapid quiz mastery.</p>
            </div>
            <div className="pod-action-row text-gold">
              <span>Dive in</span>
              <ArrowRight size={14} className="pod-arrow" />
            </div>
          </Link>

          <Link to="/needs-vs-wants" className="pod-card group">
            <div className="pod-icon-box bg-emerald-box">
              <Scale size={22} className="pod-icon" />
            </div>
            <div className="pod-content">
              <span className="pod-badge text-emerald">Impulse Test</span>
              <h3 className="pod-title">Needs vs Wants</h3>
              <p className="pod-desc">The 24h delay flowchart &amp; coffee analyzer.</p>
            </div>
            <div className="pod-action-row text-emerald">
              <span>Sort items</span>
              <ArrowRight size={14} className="pod-arrow" />
            </div>
          </Link>

          <Link to="/50-30-20" className="pod-card group">
            <div className="pod-icon-box bg-indigo-box">
              <PieChart size={22} className="pod-icon" />
            </div>
            <div className="pod-content">
              <span className="pod-badge text-indigo">Split &amp; Plan</span>
              <h3 className="pod-title">50-30-20 Rule</h3>
              <p className="pod-desc">Slice stipends, work-study, &amp; paychecks.</p>
            </div>
            <div className="pod-action-row text-indigo">
              <span>Calculate</span>
              <ArrowRight size={14} className="pod-arrow" />
            </div>
          </Link>

          <Link to="/planner" className="pod-card group">
            <div className="pod-icon-box bg-amber-box">
              <PiggyBank size={22} className="pod-icon" />
            </div>
            <div className="pod-content">
              <span className="pod-badge text-gold">Target Vault</span>
              <h3 className="pod-title">Goal Tracker</h3>
              <p className="pod-desc">Emergency buffer &amp; laptop upgrade pots.</p>
            </div>
            <div className="pod-action-row text-gold">
              <span>Track goals</span>
              <ArrowRight size={14} className="pod-arrow" />
            </div>
          </Link>
        </div>
      </section>

      <section className="cockpit-card ai-tip-card">
        <div className="ai-tip-header">
          <div className="ai-tip-title-box">
            <div className="ai-robot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <strong className="ai-tip-brand-name">BeeWise Smart Bite</strong>
              <span className="ai-tip-subtitle">AI Financial Assistant Tip</span>
            </div>
          </div>
          <span className="bee-pill bee-pill-emerald tip-new-pill">New</span>
        </div>

        <div className="ai-speech-bubble">
          <p className="ai-speech-text">
            “Packing your own iced cold-brew just 3 days a week saves roughly{' '}
            <strong className="text-emerald">$65/month</strong>. Over an academic term, that completely
            pays for your biology textbook bundle!”
          </p>
        </div>

        <div className="ai-tip-actions-row">
          <Link to="/chatbot" className="bee-btn bee-btn-gold ask-beewise-btn">
            <MessageSquare size={17} />
            <span>Ask BeeWise a Question</span>
          </Link>

          <button
            type="button"
            className={`bookmark-tip-btn ${isTipSaved ? 'active' : ''}`}
            onClick={handleToggleSaveTip}
            aria-label={isTipSaved ? 'Remove tip bookmark' : 'Bookmark tip'}
            title={isTipSaved ? 'Tip bookmarked' : 'Bookmark tip'}
          >
            {isTipSaved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
          </button>
        </div>
      </section>

      <section className="mistake-radar-card">
        <div className="mistake-radar-icon-frame">
          <AlertTriangle size={20} className="mistake-icon" />
        </div>
        <div className="mistake-radar-content">
          <div className="mistake-top-row">
            <span className="mistake-badge-label">Mistake Radar</span>
            <span className="mistake-trend-tag">Campus Trend #1</span>
          </div>
          <h4 className="mistake-headline">Subscription Amnesia Alert</h4>
          <p className="mistake-body">
            Free streaming or design tool trial ending this week? Set a reminder now before the
            recurring $14.99 charge hits your balance on Friday!
          </p>
          <Link to="/money-mistakes" className="mistake-fix-link">
            <span>Learn how to avoid 5 common traps &rarr;</span>
          </Link>
        </div>
      </section>

      <section className="cockpit-card badges-gamification-card">
        <div className="cockpit-card-header">
          <div className="card-header-left">
            <Award size={22} className="text-gold" />
            <h2 className="card-main-heading">Your BudgetBee Badges</h2>
          </div>
          <span className="badges-unlocked-text">2 of 3 Unlocked</span>
        </div>

        <div className="badges-grid-three">
          <div className="badge-item unlocked">
            <div className="badge-emblem-frame bg-gold-tint">
              <Award size={24} className="text-gold" />
              <span className="badge-check-icon" title="Unlocked"><Check size={11} /></span>
            </div>
            <strong className="badge-title">Pillar Scholar</strong>
            <span className="badge-status-text text-emerald">6/6 Mastered</span>
          </div>

          <div className="badge-item unlocked">
            <div className="badge-emblem-frame bg-emerald-tint">
              <CheckCircle2 size={24} className="text-emerald" />
              <span className="badge-check-icon" title="Unlocked"><Check size={11} /></span>
            </div>
            <strong className="badge-title">Smart Allocator</strong>
            <span className="badge-status-text text-emerald">50/30/20 Set</span>
          </div>

          <div className="badge-item locked">
            <div className="badge-emblem-frame bg-locked-tint">
              <Lock size={22} className="text-muted" />
            </div>
            <strong className="badge-title">Goal Setter</strong>
            <span className="badge-status-text text-muted">1/2 Active</span>
          </div>
        </div>
      </section>

      <section className="cockpit-card campus-culture-card">
        <img
          src="/hero.jpg"
          alt="Diverse university students discussing student budgets around an outdoor campus table"
          className="campus-culture-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/human.jpg';
          }}
        />
        <div className="campus-culture-info">
          <span className="campus-club-tag">State U Student Union</span>
          <h4 className="campus-club-heading">Peer Financial Circle</h4>
          <p className="campus-club-desc">
            Join weekly virtual study sessions covering student loans, tax filing basics, and campus discounts.
          </p>
          <Link to="/about" className="campus-join-link">
            <span>Explore Academic Initiative &rarr;</span>
          </Link>
        </div>
      </section>

      <div className="cockpit-disclaimer-card">
        <div className="disclaimer-header">
          <Info size={16} className="disclaimer-icon" />
          <span className="disclaimer-heading">Educational Simulation Notice</span>
        </div>
        <p className="disclaimer-text">
          BudgetBasics (NextGen BudgetBee) is an interactive academic learning tool developed for collegiate financial literacy.
          No actual banking transfers, FDIC depository accounts, or certified investment advisement are provided.
        </p>
        <div className="disclaimer-links-row">
          <Link to="/sitemap">View Site Map</Link>
          <span className="sep">&bull;</span>
          <Link to="/about">Terms of Learning</Link>
          <span className="sep">&bull;</span>
          <Link to="/contact">Student Support</Link>
        </div>
      </div>
    </div>
  );
}
