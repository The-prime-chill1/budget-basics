// Privacy Policy detailing student-centric client-side privacy, zero financial credentials, and local storage rights
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Database,
  EyeOff,
  Cpu,
  RefreshCw,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowLeft,
  FileText,
  AlertCircle
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BrandLogo from '../components/BrandLogo';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const [storedItemsCount, setStoredItemsCount] = useState(0);
  const [clearedToast, setClearedToast] = useState(false);

  useEffect(() => {
    updateStoredCount();
  }, []);

  const updateStoredCount = () => {
    try {
      setStoredItemsCount(Object.keys(localStorage).length);
    } catch {
      setStoredItemsCount(0);
    }
  };

  const handleClearLocalData = () => {
    if (window.confirm('Clear all locally saved settings (theme, active currency, and expense lines) from this device?')) {
      localStorage.clear();
      updateStoredCount();
      setClearedToast(true);
      setTimeout(() => setClearedToast(false), 3500);
    }
  };

  return (
    <div className="privacy-page page-wrapper animate-fade-in">
      <div className="app-container">
        {/* Back Link */}
        <div className="privacy-top-nav">
          <Link to="/" className="privacy-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <span className="privacy-last-updated">Effective: September 2026 &bull; Version 2.4</span>
        </div>

        {/* Hero Banner */}
        <header className="privacy-hero-banner">
          <div className="privacy-hero-emblem-wrap">
            <div className="privacy-shield-pulse">
              <ShieldCheck size={36} className="privacy-shield-icon" />
            </div>
            <BrandLogo variant="mark" height={44} className="privacy-logo-mark" />
          </div>

          <span className="privacy-badge">Zero-Jargon &bull; Transparent Protection</span>
          <h1 className="privacy-title">Privacy & Data Security Charter</h1>
          <p className="privacy-lead">
            BudgetBasics is engineered with a strict <strong>Privacy-by-Design</strong> ethos. We believe financial literacy should empower students without demanding personal data, banking credentials, or intrusive surveillance.
          </p>

          <div className="privacy-quick-facts-grid">
            <div className="privacy-fact-card">
              <Lock size={20} className="fact-icon text-gold" />
              <strong className="fact-title">0 Bank Credentials</strong>
              <span className="fact-desc">Never connects to banking APIs, card numbers, or BVN/SSN</span>
            </div>
            <div className="privacy-fact-card">
              <Cpu size={20} className="fact-icon text-emerald" />
              <strong className="fact-title">100% Client-Side</strong>
              <span className="fact-desc">All math, 50/30/20 logic, and calculators execute in your browser</span>
            </div>
            <div className="privacy-fact-card">
              <EyeOff size={20} className="fact-icon text-blue" />
              <strong className="fact-title">Zero Ad Trackers</strong>
              <span className="fact-desc">No third-party marketing pixels or tracking scripts</span>
            </div>
          </div>
        </header>

        {/* Core Principles */}
        <section className="privacy-content-grid">
          <article className="privacy-section-card">
            <div className="section-card-head">
              <div className="section-icon-box bg-gold-tint">
                <Database size={22} className="text-gold" />
              </div>
              <div>
                <span className="section-card-num">Section 01</span>
                <h2 className="section-card-title">What Data We (Don't) Collect</h2>
              </div>
            </div>
            <p className="section-card-text">
              BudgetBasics does <strong>not require any account registration</strong>. You never provide your legal name, physical address, national identity numbers, debit/credit card CVVs, or bank login tokens.
            </p>
            <ul className="privacy-points-list">
              <li>
                <CheckCircle2 size={16} className="text-emerald point-check" />
                <span><strong>No Account Mandate:</strong> Browse guides, test calculations, and chat with BeeWise anonymously.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-emerald point-check" />
                <span><strong>No Financial Account Integration:</strong> We never link to Plaid, Mono, Stitch, or real payment gateways.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-emerald point-check" />
                <span><strong>No Audio Recording Storage:</strong> Voice recognition runs via your device's native browser SpeechSynthesis API.</span>
              </li>
            </ul>
          </article>

          <article className="privacy-section-card">
            <div className="section-card-head">
              <div className="section-icon-box bg-emerald-tint">
                <Cpu size={22} className="text-emerald" />
              </div>
              <div>
                <span className="section-card-num">Section 02</span>
                <h2 className="section-card-title">Local Browser Storage</h2>
              </div>
            </div>
            <p className="section-card-text">
              To make your experience seamless between browser visits, we use your browser's private <code>localStorage</code> API for device-only convenience:
            </p>
            <ul className="privacy-points-list">
              <li>
                <CheckCircle2 size={16} className="text-emerald point-check" />
                <span><strong>Display Theme:</strong> Remembering whether you prefer Light or Dark mode (<code>budgetbee_theme</code>).</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-emerald point-check" />
                <span><strong>Currency Preference:</strong> Your selected currency code (e.g. ₦, $, €, £, ₹) for personalized learning.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-emerald point-check" />
                <span><strong>Draft Expense Rows:</strong> Your custom monthly items in the Expense Planner remain strictly on your device.</span>
              </li>
            </ul>
          </article>

          <article className="privacy-section-card">
            <div className="section-card-head">
              <div className="section-icon-box bg-blue-tint">
                <ShieldCheck size={22} className="text-blue" />
              </div>
              <div>
                <span className="section-card-num">Section 03</span>
                <h2 className="section-card-title">Educational & Competition Integrity</h2>
              </div>
            </div>
            <p className="section-card-text">
              BudgetBasics was developed by <strong>Team PixelForge</strong> for the <strong>Aptech TechWiz 7 Global Competition</strong> under the theme <em>NextGen BudgetBee</em>.
            </p>
            <p className="section-card-text">
              Our single goal is elevating student financial capability. We do not sell data to insurance firms, credit bureaus, universities, or commercial lenders.
            </p>
          </article>

          <article className="privacy-section-card interactive-data-manager">
            <div className="section-card-head">
              <div className="section-icon-box bg-amber-tint">
                <Trash2 size={22} className="text-amber" />
              </div>
              <div>
                <span className="section-card-num">Section 04</span>
                <h2 className="section-card-title">Your Local Data Rights</h2>
              </div>
            </div>
            <p className="section-card-text">
              You maintain total sovereign control of your browser data. You can inspect or permanently flush all local storage records at any time:
            </p>

            <div className="data-control-box">
              <div className="data-control-meta">
                <span className="meta-label">Stored Keys on this Browser:</span>
                <strong className="meta-val">{storedItemsCount} records</strong>
              </div>

              <button
                type="button"
                className="btn-danger-purge"
                onClick={handleClearLocalData}
                title="Wipe all locally cached preferences"
              >
                <Trash2 size={16} />
                <span>Flush Local Storage Cache</span>
              </button>
            </div>

            {clearedToast && (
              <div className="privacy-toast-success animate-fade-in">
                <CheckCircle2 size={18} />
                <span>Local storage successfully wiped! Your device memory is completely clean.</span>
              </div>
            )}
          </article>
        </section>

        {/* Footer Support Notice */}
        <div className="privacy-contact-card">
          <div className="privacy-contact-text">
            <Sparkles size={20} className="text-gold" />
            <div>
              <strong className="contact-heading">Questions Regarding Security?</strong>
              <p className="contact-sub">
                Reach out to the Team PixelForge student developers at <a href="mailto:support@budgetbasics.org">support@budgetbasics.org</a> or via our <Link to="/contact">Campus Contact Desk</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
