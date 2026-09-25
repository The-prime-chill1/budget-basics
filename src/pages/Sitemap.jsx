// Visual sitemap displaying full route hierarchy, platform architecture, and legal disclaimers
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckSquare,
  Search,
  MessageSquare,
  Network,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  Info,
  ArrowUp,
  GraduationCap
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Modal from '../components/Modal';
import './Sitemap.css';

export default function Sitemap() {
  const [modalType, setModalType] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sitemap-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          badge="Sample Site Map"
          title="BudgetBasics Information Architecture and Sitemap Flow"
          subtitle="A clear visual representation of platform structure, navigation hierarchy, and user learning paths."
        />

        <div className="sitemap-canvas-frame card">
          <div className="sitemap-tree-container">
            <div className="tree-root-col">
              <div className="tree-root-card">
                <Link to="/" className="tree-root-title">
                  Landing Page
                </Link>
                <span className="tree-root-sub">Main menu + call-to-action links</span>
              </div>
            </div>

            <div className="tree-connectors-col">
              <div className="tree-branch-line branch-1"></div>
              <div className="tree-branch-line branch-2"></div>
              <div className="tree-branch-line branch-3"></div>
              <div className="tree-branch-line branch-4"></div>
            </div>

            <div className="tree-pillars-col">
              <div className="tree-pillar-row">
                <div className="pillar-header-pill">
                  <BookOpen size={18} />
                  <span>Learn Budgeting</span>
                </div>
                <div className="pillar-arrow">&rarr;</div>
                <div className="pillar-leaves-flow">
                  <Link to="/budgeting-basics" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Budgeting Basics</span>
                  </Link>
                  <span className="flow-arrow">&rarr;</span>
                  <Link to="/needs-vs-wants" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Needs vs Wants</span>
                  </Link>
                </div>
              </div>

              <div className="tree-pillar-row">
                <div className="pillar-header-pill">
                  <CheckSquare size={18} />
                  <span>Practice Planning</span>
                </div>
                <div className="pillar-arrow">&rarr;</div>
                <div className="pillar-leaves-stack">
                  <Link to="/savings-goals" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Savings Goals</span>
                  </Link>
                  <Link to="/expense-planner" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Expense Planner</span>
                  </Link>
                  <Link to="/money-mistakes" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Money Mistakes</span>
                  </Link>
                </div>
              </div>

              <div className="tree-pillar-row">
                <div className="pillar-header-pill">
                  <Search size={18} />
                  <span>Explore Resources</span>
                </div>
                <div className="pillar-arrow">&rarr;</div>
                <div className="pillar-leaves-stack">
                  <Link to="/infographics" className="tree-leaf-card wide">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Infographics &amp; Learning Gallery</span>
                  </Link>
                  <Link to="/search" className="tree-leaf-card wide">
                    <span className="leaf-dot">&#9658;</span>
                    <span>Search, Sort &amp; Filter</span>
                  </Link>
                </div>
              </div>

              <div className="tree-pillar-row">
                <div className="pillar-header-pill">
                  <MessageSquare size={18} />
                  <span>Get Help / Connect</span>
                </div>
                <div className="pillar-arrow">&rarr;</div>
                <div className="pillar-leaves-flow">
                  <Link to="/chatbot" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>AI Q&amp;A Assistant</span>
                  </Link>
                  <span className="flow-arrow">&rarr;</span>
                  <Link to="/about" className="tree-leaf-card">
                    <span className="leaf-dot">&#9658;</span>
                    <span>About Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="sitemap-utility-divider"></div>

          <div className="sitemap-utility-bar">
            <Link to="/sitemap" className="sitemap-pill-btn active">
              <Network size={15} />
              <span>Sitemap</span>
            </Link>

            <Link to="/feedback" className="sitemap-pill-btn">
              <MessageSquare size={15} />
              <span>Feedback</span>
            </Link>

            <Link to="/contact" className="sitemap-pill-btn">
              <Mail size={15} />
              <span>Contact Us</span>
            </Link>

            <Link to="/about" className="sitemap-pill-btn">
              <Info size={15} />
              <span>About Us</span>
            </Link>

            <button
              type="button"
              className="sitemap-pill-btn"
              onClick={() => setModalType('disclaimer')}
            >
              <GraduationCap size={15} />
              <span>Educational Disclaimer</span>
            </button>

            <button
              type="button"
              className="sitemap-pill-btn"
              onClick={() => setModalType('privacy')}
            >
              <Lock size={15} />
              <span>Privacy Note</span>
            </button>

            <button
              type="button"
              className="sitemap-pill-btn back-top-pill"
              onClick={scrollToTop}
            >
              <ArrowUp size={15} />
              <span>Back-to-Top</span>
            </button>
          </div>
        </div>

        <div className="sitemap-data-note-box card">
          <div className="data-note-accent-bar" aria-hidden="true"></div>
          <div className="data-note-body">
            <h3 className="data-note-title">Data note</h3>
            <p className="data-note-desc">
              Values displayed in examples, calculators, tips, and the AI Chatbot assistant may be hard-coded or retrieved from pre-populated JSON/TXT files. Form submissions do not require to be saved to a server.
            </p>
          </div>
        </div>

        <Modal
          isOpen={modalType === 'disclaimer'}
          onClose={() => setModalType(null)}
          title="Educational Disclaimer"
        >
          <div className="disclaimer-modal-content">
            <div className="disclaimer-icon-badge">
              <GraduationCap size={32} />
            </div>
            <h4>Purely Educational Awareness</h4>
            <p>
              BudgetBasics is designed solely for collegiate learning and financial literacy demonstrations. It does not provide certified financial, legal, investment, or tax advice. All calculation models (including 50/30/20 and savings projections) are simulated approximations.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: '1rem', width: '100%' }}
              onClick={() => setModalType(null)}
            >
              Understood
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={modalType === 'privacy'}
          onClose={() => setModalType(null)}
          title="Client-Side Privacy Note"
        >
          <div className="disclaimer-modal-content">
            <div className="disclaimer-icon-badge bg-emerald">
              <ShieldCheck size={32} />
            </div>
            <h4>100% Client-Side Privacy</h4>
            <p>
              All interactions, expense logs, budget splits, and ratings are evaluated directly inside your web browser. No banking credentials, remote databases, or tracking telemetry scripts are used on this platform.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: '1rem', width: '100%' }}
              onClick={() => setModalType(null)}
            >
              Close Note
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
