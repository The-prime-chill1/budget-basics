// Global footer with categorized navigation links, student resources, and legal disclaimer modals
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  PieChart,
  Calculator,
  Target,
  FileSpreadsheet,
  AlertTriangle,
  Bot,
  Search,
  Info,
  MessageSquare,
  Mail,
  ArrowUp,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useVisitorCount } from '../utils/visitorCounter';
import './Footer.css';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { liveCount } = useVisitorCount();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bee-global-footer" role="contentinfo">
      <div className="footer-inner-container">
        
        <div className="footer-hero-strip">
          <div className="footer-brand-lockup">
            <Link to="/" className="footer-brand-link" aria-label="BudgetBasics Homepage">
              <BrandLogo height={38} showTagline={true} idPrefix="ftrLogo" />
            </Link>
            <span className="footer-tagline-chip">
              NextGen BudgetBee &bull; Aptech TechWiz 7
            </span>
          </div>

          <div className="footer-action-controls">
            <button
              type="button"
              className="footer-back-to-top-btn"
              onClick={scrollToTop}
              title="Scroll to top of page"
              aria-label="Back to Top"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="footer-columns-grid">
          
          <div className="footer-col footer-col-about">
            <h4 className="footer-col-title">
              <Award size={16} className="text-gold" />
              <span>About Project</span>
            </h4>
            <p className="footer-mission-text">
              An interactive, student-centric financial literacy and budgeting web application developed for the{' '}
              <strong>Aptech TechWiz 7 Competition</strong> under the theme <em>NextGen BudgetBee</em>.
            </p>
            <div className="footer-meta-pill-group">
              <span className="footer-meta-pill">Web Innovation Unleashed</span>
              <span className="footer-meta-pill">100% Client-Side SPA</span>
              <span className="footer-meta-pill">Zero Server Storage</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">
              <BookOpen size={16} className="text-emerald" />
              <span>Curriculum</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/budgeting-basics">Budgeting Basics 101</Link>
              </li>
              <li>
                <Link to="/needs-vs-wants">Needs vs. Wants Challenge</Link>
              </li>
              <li>
                <Link to="/50-30-20">50/30/20 Rule Formula</Link>
              </li>
              <li>
                <Link to="/money-mistakes">5 Student Money Mistakes</Link>
              </li>
              <li>
                <Link to="/infographics">Visual Infographics Gallery</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">
              <Calculator size={16} className="text-blue" />
              <span>Tools &amp; AI</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/50-30-20">50/30/20 Calculator</Link>
              </li>
              <li>
                <Link to="/savings-goals">Savings Goal Forecaster</Link>
              </li>
              <li>
                <Link to="/expense-planner">Student Expense Planner</Link>
              </li>
              <li>
                <Link to="/chatbot">BeeWise AI Tutor Assistant</Link>
              </li>
              <li>
                <Link to="/search">Global Content Search</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">
              <Users size={16} className="text-purple" />
              <span>Team PixelForge</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/about">Project Work Division</Link>
              </li>
              <li>
                <Link to="/about">Meet the Developers</Link>
              </li>
              <li>
                <Link to="/feedback">Student Feedback Form</Link>
              </li>
              <li>
                <Link to="/contact">Contact Campus Support</Link>
              </li>
              <li>
                <Link to="/sitemap" className="footer-sitemap-link">
                  <Compass size={14} />
                  <span>Visual Sitemap Directory &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-team-strip">
          <span className="team-strip-label">
            <Layers size={14} className="text-gold" />
            <span>Team PixelForge Division:</span>
          </span>
          <div className="team-members-chips">
            <Link to="/about" className="team-chip" title="Enioluwafe Gbadamosi — Main Structure & Integration">
              <strong>Enioluwafe Gbadamosi</strong> (Main Structure)
            </Link>
            <Link to="/about" className="team-chip" title="Hamid — Budgeting Basics & Needs vs Wants">
              <strong>Hamid</strong> (Budgeting)
            </Link>
            <Link to="/about" className="team-chip" title="Tammy — 50/30/20 & Savings Calculators">
              <strong>Tammy</strong> (Calculators)
            </Link>
            <Link to="/about" className="team-chip" title="Lawal Abiodun — Expense Planner & Mistakes">
              <strong>Lawal Abiodun</strong> (Expenses)
            </Link>
            <Link to="/about" className="team-chip" title="Lam Abdulhameed Olawale — AI Chatbot & Search">
              <strong>Lam Abdulhameed Olawale</strong> (AI &amp; Search)
            </Link>
          </div>
        </div>

        <div className="footer-trust-box">
          <div className="trust-item">
            <ShieldCheck size={18} className="trust-icon text-blue" />
            <div>
              <strong>Strictly Educational:</strong> BudgetBasics does not connect to real banking accounts, payment processors, or transaction APIs. All calculations and simulations are strictly client-side educational models for collegiate learning.
            </div>
          </div>
          <div className="trust-item">
            <Sparkles size={18} className="trust-icon text-gold" />
            <div>
              <strong>Client-Side Data Privacy:</strong> No sensitive financial credentials or cookies are stored on or sent to remote servers. All session calculations remain entirely private in your local browser window.
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy-text">
            &copy; {new Date().getFullYear()} <strong>BudgetBasics</strong> &bull; Built and powered by <strong>Team PixelForge</strong> &bull; Aptech TechWiz 7.
          </div>

          <div className="footer-metrics-group">
            <div className="footer-live-badge" title="Active learners currently browsing on site">
              <span className="footer-ping-dot"></span>
              <span className="live-num">{liveCount}</span>
              <span>{liveCount === 1 ? 'learner live' : 'learners live'}</span>
            </div>
          </div>
        </div>

      </div>

      {showBackToTop && (
        <button
          type="button"
          className="floating-back-top animate-fade-in"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Scroll back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
}
