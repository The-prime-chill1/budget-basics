import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  PieChart,
  Calculator,
  Target,
  FileSpreadsheet,
  AlertTriangle,
  Image as ImageIcon,
  Bot,
  Search,
  Info,
  MessageSquare,
  Mail,
  ArrowUp,
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Users
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import './Footer.css';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [visitorCount, setVisitorCount] = useState(14820);

  useEffect(() => {
    // Session-based visitor count tracker (SRS Section 1.6 Requirement)
    try {
      const stored = localStorage.getItem('budgetbee_visitor_counter');
      let count = stored ? parseInt(stored, 10) : 14820;
      if (!sessionStorage.getItem('budgetbee_counted_session')) {
        count += 1;
        localStorage.setItem('budgetbee_visitor_counter', count.toString());
        sessionStorage.setItem('budgetbee_counted_session', 'true');
      }
      setVisitorCount(count);
    } catch {
      setVisitorCount(14820);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bee-global-footer">
      <div className="footer-inner-container">
        {/* Top Section: Brand Info + Competition Tag */}
        <div className="footer-top-grid">
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand-header" aria-label="BudgetBasics Home">
              <BrandLogo height={42} showTagline={true} idPrefix="appFooter" />
            </Link>
            <p className="footer-mission-p">
              An educational student-first financial literacy platform built and powered by <strong>Team PixelForge</strong> for the Aptech TechWiz 7 Competition under the Web Innovation Unleashed category.
            </p>
            <div className="footer-award-badge">
              <Award size={16} className="award-icon" />
              <span>Built &amp; Powered by Team PixelForge &bull; TechWiz 7</span>
            </div>
          </div>

          {/* Links Column 1: Learning Curriculum */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">
              <BookOpen size={15} />
              <span>Curriculum</span>
            </h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/budgeting-basics">Budgeting Basics</Link>
              </li>
              <li>
                <Link to="/needs-vs-wants">Needs vs Wants Analyzer</Link>
              </li>
              <li>
                <Link to="/50-30-20">50/30/20 Rule Allocator</Link>
              </li>
              <li>
                <Link to="/money-mistakes">Money Mistakes Guide</Link>
              </li>
              <li>
                <Link to="/infographics">Visual Infographics</Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Tools & AI */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">
              <Calculator size={15} />
              <span>Tools & AI</span>
            </h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/savings-goals">Savings Goal Estimator</Link>
              </li>
              <li>
                <Link to="/expense-planner">Session Expense Planner</Link>
              </li>
              <li>
                <Link to="/chatbot">BeeWise AI Assistant</Link>
              </li>
              <li>
                <Link to="/search">Search Resources</Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Platform & Support */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">
              <Info size={15} />
              <span>Support & Docs</span>
            </h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/about">About Project & Team</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback Form</Link>
              </li>
              <li>
                <Link to="/contact">Contact Campus Help</Link>
              </li>
              <li>
                <Link to="/sitemap" className="footer-sitemap-highlight">
                  Visual Sitemap &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Notice: Educational & Privacy Disclaimers */}
        <div className="footer-disclaimers-row">
          <div className="disclaimer-item">
            <ShieldCheck size={16} className="disclaimer-icon icon-shield" />
            <div>
              <strong>Educational Disclaimer:</strong> BudgetBasics is strictly an educational awareness platform. It does not behave like a banking service, loan platform, payment processor, or financial investment system. All calculations are client-side estimates for learning purposes.
            </div>
          </div>
          <div className="disclaimer-item">
            <Sparkles size={16} className="disclaimer-icon icon-sparkles" />
            <div>
              <strong>Client-Side Privacy:</strong> No personal financial records, accounts, or cookies are stored on or sent to remote servers. All demonstration logs remain solely in your browser session.
            </div>
          </div>
        </div>

        {/* Sitemap Flow Utility Buttons Bar (Exact Diagram Match) */}
        <div className="sitemap-utility-bar" style={{ margin: '1.75rem 0 1.25rem' }}>
          <Link to="/sitemap" className="sitemap-pill-btn">
            <span>Sitemap</span>
          </Link>
          <Link to="/feedback" className="sitemap-pill-btn">
            <span>Feedback</span>
          </Link>
          <Link to="/contact" className="sitemap-pill-btn">
            <span>Contact Us</span>
          </Link>
          <Link to="/about" className="sitemap-pill-btn">
            <span>About Us</span>
          </Link>
          <Link to="/about" className="sitemap-pill-btn">
            <span>Educational Disclaimer</span>
          </Link>
          <Link to="/about" className="sitemap-pill-btn">
            <span>Privacy Note</span>
          </Link>
          <button type="button" className="sitemap-pill-btn back-top-pill" onClick={scrollToTop}>
            <span>Back-to-Top &uarr;</span>
          </button>
        </div>

        {/* Data Note Box Callout */}
        <div className="sitemap-data-note-box card" style={{ marginBottom: '1.75rem' }}>
          <div className="data-note-accent-bar" aria-hidden="true"></div>
          <div className="data-note-body">
            <h4 className="data-note-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Data note</h4>
            <p className="data-note-desc" style={{ fontSize: '0.85rem' }}>
              Values displayed in examples, calculators, tips, and the AI Chatbot assistant may be hard-coded or retrieved from pre-populated JSON/TXT files. Form submissions do not require to be saved to a server.
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright & Credentials & Visitor Counter */}
        <div className="footer-bottom-bar">
          <div className="footer-copy-text">
            &copy; {new Date().getFullYear()} <strong>BudgetBasics</strong> &bull; Built and powered by <strong>Team PixelForge</strong> &bull; Aptech TechWiz 7.
          </div>

          <div className="footer-visitor-counter-box" title="Total collegiate visitors on platform">
            <span className="live-ping-dot"></span>
            <Users size={14} className="text-gold" />
            <span>Visitors: <strong>{visitorCount.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Control */}
      {showBackToTop && (
        <button
          type="button"
          className="back-to-top-btn animate-fade-in"
          onClick={scrollToTop}
          aria-label="Back to Top of Page"
          title="Back to Top"
        >
          <ArrowUp size={20} />
          <span className="back-top-label">Top</span>
        </button>
      )}
    </footer>
  );
}
