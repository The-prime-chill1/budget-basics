// Needs vs. wants classification challenge with real-time scoring and 24-hour cooling rule flowchart
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  ShoppingCart,
  Hourglass,
  AlertTriangle,
  Moon,
  Coffee,
  Tv,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lightbulb,
  Heart,
  Check,
  Compass,
  Star,
  Sparkles
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import './NeedsVsWants.css';

const DRILL_ITEMS = [
  {
    id: 1,
    category: 'FOOD & SURVIVAL',
    title: 'Weekly Grocery Essentials',
    desc: 'Rice, produce, oats, beans, and cooking oil for weekday dorm meals.',
    type: 'need',
    icon: ShoppingCart,
    explanation: 'Groceries are essential bodily nutrition required for health and energy to study.'
  },
  {
    id: 2,
    category: 'COMMUTING & MOBILITY',
    title: 'Campus Bus Ticket Transit Pass',
    desc: 'Monthly reload card to commute between residency and campus lecture halls.',
    type: 'need',
    icon: ShoppingCart,
    explanation: 'Transportation is vital to attend lectures on time and maintain attendance requirements.'
  },
  {
    id: 3,
    category: 'RECREATION & TECH',
    title: 'Wireless Gaming Headset',
    desc: 'Latest surround-sound headset for weekend online sessions with roommates.',
    type: 'want',
    icon: ShoppingCart,
    explanation: 'Recreation is fun, but standard or existing earphones satisfy basic listening needs.'
  },
  {
    id: 4,
    category: 'HEALTH & SAFETY',
    title: 'Prescription Allergy Medicine',
    desc: 'Essential doctor-prescribed allergy tablets during seasonal exams.',
    type: 'need',
    icon: ShoppingCart,
    explanation: 'Health and medical safety are top-tier non-negotiable living requirements.'
  },
  {
    id: 5,
    category: 'ENTERTAINMENT',
    title: '4K Multi-Screen Movie Stream',
    desc: 'Premium video streaming plan with multiple device logins.',
    type: 'want',
    icon: ShoppingCart,
    explanation: 'Digital video entertainment is discretionary recreation when living on a student allowance.'
  },
  {
    id: 6,
    category: 'ACADEMICS',
    title: 'Core Chemistry Laboratory Manual',
    desc: 'Mandatory syllabus handout needed for weekly practicals and lab submissions.',
    type: 'need',
    icon: ShoppingCart,
    explanation: 'Required academic materials directly determine your ability to pass coursework.'
  }
];

export default function NeedsVsWants() {
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillScore, setDrillScore] = useState(0);
  const [drillFeedback, setDrillFeedback] = useState(null);

  const [flowChecks, setFlowChecks] = useState({
    check1: false,
    check2: false,
    check3: false
  });

  const [openMistake, setOpenMistake] = useState('impulse');

  const currentItem = DRILL_ITEMS[drillIndex];

  const handleClassify = (chosenType) => {
    if (drillFeedback) return;
    const isCorrect = chosenType === currentItem.type;
    if (isCorrect) {
      setDrillScore((prev) => prev + 1);
    }

    setDrillFeedback({
      isCorrect,
      explanation: currentItem.explanation,
      correctType: currentItem.type.toUpperCase()
    });

    setTimeout(() => {
      setDrillFeedback(null);
      setDrillIndex((prev) => (prev + 1) % DRILL_ITEMS.length);
    }, 1800);
  };

  const toggleFlowCheck = (key) => {
    setFlowChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allFlowChecked = flowChecks.check1 && flowChecks.check2 && flowChecks.check3;

  return (
    <div className="needs-wants-screen animate-fade-in">
      <div className="mindset-hero-card bee-card-hero">
        <div className="mindset-header-row">
          <div className="mindset-mascot-frame">
            <img src="/mascot-bee.png" alt="Bee" className="mascot-img" />
          </div>
          <div className="mindset-title-group">
            <span className="mindset-badge-pill">
              <Compass size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Mindset Shift
            </span>
            <h1 className="mindset-main-title">Needs vs. Wants</h1>
          </div>
        </div>
        <p className="mindset-explanation">
          <strong className="text-needs">Needs</strong> are essential for survival, health, and campus basics. <strong className="text-wants">Wants</strong> are lifestyle boosts that bring joy but won’t derail life if postponed!
        </p>
      </div>

      <div className="needs-desktop-layout">
        <div className="needs-col-left">
          <div className="sort-drill-card bee-card">
            <div className="drill-header">
              <div className="drill-head-left">
                <Gamepad2 size={18} className="drill-icon" />
                <div>
                  <h2 className="drill-title">Quick Sort Drill</h2>
                  <span className="drill-progress-text">Challenge {drillIndex + 1} of {DRILL_ITEMS.length}</span>
                </div>
              </div>
              <span className="drill-score-badge">
                <Star size={13} fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Score: {drillScore}
              </span>
            </div>

            <div className="drill-progress-bar">
              <div
                className="drill-progress-fill"
                style={{ width: `${((drillIndex + 1) / DRILL_ITEMS.length) * 100}%` }}
              />
            </div>

            <div className="drill-item-box">
              <div className="drill-item-icon-frame">
                <ShoppingCart size={22} className="cart-icon" />
              </div>
              <span className="drill-category-label">{currentItem.category}</span>
              <h3 className="drill-item-title">{currentItem.title}</h3>
              <p className="drill-item-desc">{currentItem.desc}</p>
            </div>

            <div className="drill-btn-row">
              <button
                type="button"
                className="btn-drill btn-need"
                onClick={() => handleClassify('need')}
                disabled={!!drillFeedback}
              >
                <Check size={18} />
                <span>It's a NEED</span>
              </button>
              <button
                type="button"
                className="btn-drill btn-want"
                onClick={() => handleClassify('want')}
                disabled={!!drillFeedback}
              >
                <Heart size={18} />
                <span>It's a WANT</span>
              </button>
            </div>

            {drillFeedback && (
              <div className={`drill-feedback-pill ${drillFeedback.isCorrect ? 'drill-correct' : 'drill-incorrect'} animate-fade-in`}>
                {drillFeedback.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                <span>
                  {drillFeedback.isCorrect ? 'Spot on!' : `Actually a ${drillFeedback.correctType}.`} {drillFeedback.explanation}
                </span>
              </div>
            )}
          </div>

          <div className="mistakes-spotlight-card bee-card">
            <div className="spotlight-header">
              <AlertTriangle size={20} className="spotlight-icon" />
              <div>
                <h2 className="spotlight-title">Money Mistakes Spotlight</h2>
                <p className="spotlight-sub">Sneaky student pitfalls & fixes</p>
              </div>
            </div>

            <div className="mistakes-accordions">
              <div className="mistake-acc-item">
                <button
                  type="button"
                  className="mistake-acc-btn"
                  onClick={() => setOpenMistake(openMistake === 'impulse' ? null : 'impulse')}
                >
                  <div className="acc-btn-left">
                    <Moon size={16} className="acc-icon" />
                    <span className="acc-name">Impulse Buying at 2 AM</span>
                  </div>
                  {openMistake === 'impulse' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openMistake === 'impulse' && (
                  <div className="mistake-acc-content animate-fade-in">
                    <p>
                      <strong>The Trap:</strong> Late-night phone browsing triggers dopamine rushes from flash sales.
                    </p>
                    <p>
                      <strong>The Fix:</strong> Keep shopping apps off your home screen and enforce a strict 24-hour cooling window.
                    </p>
                  </div>
                )}
              </div>

              <div className="mistake-acc-item">
                <button
                  type="button"
                  className="mistake-acc-btn"
                  onClick={() => setOpenMistake(openMistake === 'latte' ? null : 'latte')}
                >
                  <div className="acc-btn-left">
                    <Coffee size={16} className="acc-icon" />
                    <span className="acc-name">The Latte Factor (Daily Leaks)</span>
                  </div>
                  {openMistake === 'latte' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openMistake === 'latte' && (
                  <div className="mistake-acc-content animate-fade-in">
                    <p>
                      <strong>The Trap:</strong> Dismissing daily small canteen drinks that add up significantly each month.
                    </p>
                    <p>
                      <strong>The Fix:</strong> Carry a thermos and log daily incidental purchases in the Planner.
                    </p>
                  </div>
                )}
              </div>

              <div className="mistake-acc-item">
                <button
                  type="button"
                  className="mistake-acc-btn"
                  onClick={() => setOpenMistake(openMistake === 'subs' ? null : 'subs')}
                >
                  <div className="acc-btn-left">
                    <Tv size={16} className="acc-icon" />
                    <span className="acc-name">Subscription Amnesia</span>
                  </div>
                  {openMistake === 'subs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openMistake === 'subs' && (
                  <div className="mistake-acc-content animate-fade-in">
                    <p>
                      <strong>The Trap:</strong> Unused free trials converting into silent recurring card charges.
                    </p>
                    <p>
                      <strong>The Fix:</strong> Cancel auto-renewals immediately after signing up for any trial.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="needs-col-right">
          <div className="flowchart-card bee-card">
            <div className="flowchart-header">
              <Hourglass size={20} className="flowchart-icon" />
              <div>
                <h2 className="flowchart-title">24–Hour Delay Flowchart</h2>
                <p className="flowchart-sub">Tap each reality check before hitting “Buy Now”</p>
              </div>
            </div>

            <div className="flow-checks-list">
              <div
                className={`flow-check-item ${flowChecks.check1 ? 'is-checked' : ''}`}
                onClick={() => toggleFlowCheck('check1')}
                role="button"
                tabIndex={0}
              >
                <div className="check-box-icon">
                  {flowChecks.check1 ? <CheckCircle2 size={18} className="icon-checked" /> : <span className="empty-box"></span>}
                </div>
                <div>
                  <strong className="check-item-title">1. Distress Check</strong>
                  <p className="check-item-sub">Will buying this cause stress or negative balance before next Friday?</p>
                </div>
              </div>

              <div
                className={`flow-check-item ${flowChecks.check2 ? 'is-checked' : ''}`}
                onClick={() => toggleFlowCheck('check2')}
                role="button"
                tabIndex={0}
              >
                <div className="check-box-icon">
                  {flowChecks.check2 ? <CheckCircle2 size={18} className="icon-checked" /> : <span className="empty-box"></span>}
                </div>
                <div>
                  <strong className="check-item-title">2. Cooling-Off Window</strong>
                  <p className="check-item-sub">Can you leave it in your cart for 24 hours? 70% of urges evaporate overnight.</p>
                </div>
              </div>

              <div
                className={`flow-check-item ${flowChecks.check3 ? 'is-checked' : ''}`}
                onClick={() => toggleFlowCheck('check3')}
                role="button"
                tabIndex={0}
              >
                <div className="check-box-icon">
                  {flowChecks.check3 ? <CheckCircle2 size={18} className="icon-checked" /> : <span className="empty-box"></span>}
                </div>
                <div>
                  <strong className="check-item-title">3. Free Campus Alternative</strong>
                  <p className="check-item-sub">Does the college library, club gear depot, or recreation center loan it free?</p>
                </div>
              </div>
            </div>

            <div className={`flow-callout-box ${allFlowChecked ? 'callout-ready' : ''}`}>
              <Lightbulb size={16} />
              <span>
                {allFlowChecked
                  ? 'Reality check passed! If it fits your 30% Wants bucket, proceed guilt-free!'
                  : 'Tap all 3 filters to verify if this is a safe impulse purchase!'}
              </span>
            </div>
          </div>

          <div className="mindful-banner-card bee-card">
            <div className="mindful-card-top">
              <div className="banner-visual-box">
                <img src="/human.jpg" alt="Student Studying" className="banner-img" />
                <div className="banner-overlay-tag">Mindful Spending &bull; Zero Stress Finals</div>
              </div>

              <div className="mindful-guide-content">
                <div className="mindful-guide-header">
                  <Sparkles size={16} className="text-gold" />
                  <span className="mindful-guide-title">30-Second Impulse Defense</span>
                </div>
                <div className="mindful-checklist">
                  <div className="mindful-check-point">
                    <span className="point-bullet">1</span>
                    <span className="point-text"><strong>Step Away:</strong> Close the browser tab or set your phone down for 30s to break impulse dopamine.</span>
                  </div>
                  <div className="mindful-check-point">
                    <span className="point-bullet">2</span>
                    <span className="point-text"><strong>Cost-Per-Use:</strong> Divide price by realistic uses. Will you still value this next month?</span>
                  </div>
                  <div className="mindful-check-point">
                    <span className="point-bullet">3</span>
                    <span className="point-text"><strong>Campus Alternatives:</strong> Check if your college library, club depot, or peers loan it free.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="banner-footer-row">
              <span className="banner-prompt-text">Need an AI verdict on a purchase?</span>
              <Link to="/chatbot" className="banner-link">
                <span>Ask BeeWise AI</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
