import React, { useState } from 'react';
import {
  Home as HomeIcon,
  Coffee,
  Shield,
  Info,
  CheckSquare,
  Square,
  Sliders,
  Sparkles,
  Calculator,
  Lightbulb,
  Award
} from 'lucide-react';
import { calculate503020 } from '../utils/budgetCalculations';
import './Budget503020.css';

const SCENARIOS = {
  dorm: {
    title: 'Dorm Resident Breakdown',
    badge: 'Prepaid Meal Plans',
    quote: 'When housing and campus cafeteria swipes are packaged into tuition loans, pure monthly cash needs shrink dramatically.',
    needsPct: 40,
    wantsPct: 30,
    savingsPct: 30,
    advice: 'Allocate surplus housing savings toward an internship cushion or post-graduation moving deposit fund!'
  },
  commuter: {
    title: 'Commuter Student Breakdown',
    badge: 'Transit Heavy',
    quote: 'Living at home saves major rent, but transit cards, gas, and campus canteen snacks require strict boundary setting.',
    needsPct: 35,
    wantsPct: 35,
    savingsPct: 30,
    advice: 'Pre-load transit cards at the start of the semester and pack lunch twice a week to preserve your 30% savings!'
  },
  working: {
    title: 'Working Student Breakdown',
    badge: 'Earned Income',
    quote: 'Balancing campus work-study or internships with classes requires protecting a solid emergency buffer against burnout.',
    needsPct: 50,
    wantsPct: 25,
    savingsPct: 25,
    advice: 'Direct-deposit 25% of every paycheck into a high-yield savings buffer before checking your discretionary spending.'
  }
};

export default function Budget503020() {
  const [incomeInput, setIncomeInput] = useState('1000');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [activeScenario, setActiveScenario] = useState('dorm');

  // BeeWise Action Steps checklist
  const [actionSteps, setActionSteps] = useState({
    step1: true,
    step2: false,
    step3: false
  });

  const numericIncome = Number(incomeInput.replace(/,/g, '')) || 0;
  const calc = calculate503020(numericIncome);

  const toggleActionStep = (key) => {
    setActionSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreset = (amt) => {
    setIncomeInput(amt.toString());
  };

  const currentScenario = SCENARIOS[activeScenario];

  return (
    <div className="budget-503020-screen animate-fade-in">
      {/* 1. HERO CONCEPT CARD */}
      <div className="hero-concept-card bee-card-hero">
        <div className="concept-header-row">
          <div className="concept-mascot-frame">
            <img src="/mascot-bee.png" alt="Bee" className="mascot-img" />
          </div>
          <div className="concept-title-group">
            <span className="concept-badge-pill">Concept 101 &bull; Warren Formula</span>
            <h1 className="concept-main-title">Master the 50/30/20 Rule</h1>
          </div>
        </div>
        <p className="concept-explanation">
          Coined by Harvard bankruptcy expert Elizabeth Warren, this iconic framework splits your income into three calm buckets so you never outspend your future self.
        </p>
      </div>

      {/* RESPONSIVE LAYOUT CONTAINER (Mobile Stack, Tablet/Desktop 2-Col) */}
      <div className="budget-desktop-layout">
        <div className="budget-col-left">
          {/* 2. INTERACTIVE ALLOCATOR: MONTHLY STUDENT CASH FLOW */}
          <div className="allocator-card bee-card">
        <div className="allocator-head">
          <div>
            <span className="allocator-sub">INTERACTIVE ALLOCATOR</span>
            <h2 className="allocator-title">Monthly Student Cash Flow</h2>
          </div>
          <Calculator size={20} className="allocator-icon" />
        </div>

        {/* Income Input */}
        <div className="income-input-group">
          <label htmlFor="student-income" className="input-field-label">
            Total Monthly Allowance / Paycheck ({currencySymbol})
          </label>
          <div className="input-with-preset">
            <div className="symbol-input-box">
              <span className="currency-prefix">{currencySymbol}</span>
              <input
                id="student-income"
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                placeholder="1000"
                className="bee-input income-field"
                min="10"
              />
            </div>
            <button
              type="button"
              className="preset-btn"
              onClick={() => handlePreset(currencySymbol === '$' ? 1000 : 100000)}
            >
              Preset {currencySymbol === '$' ? '$1k' : '₦100k'}
            </button>
            <button
              type="button"
              className="currency-toggle-btn"
              onClick={() => {
                const next = currencySymbol === '$' ? '₦' : '$';
                setCurrencySymbol(next);
                setIncomeInput(next === '$' ? '1000' : '100000');
              }}
              title="Toggle $ / ₦ currency"
            >
              {currencySymbol === '$' ? 'Switch to ₦' : 'Switch to $'}
            </button>
          </div>
        </div>

        {/* Visual Allocation Ratio Bar */}
        <div className="allocation-ratio-block">
          <div className="ratio-title-row">
            <span className="ratio-label">Visual Allocation Ratio</span>
            <strong className="ratio-status">100% Balanced</strong>
          </div>
          <div className="three-segment-bar">
            <div className="seg seg-50-needs" style={{ width: '50%' }}></div>
            <div className="seg seg-30-wants" style={{ width: '30%' }}></div>
            <div className="seg seg-20-savings" style={{ width: '20%' }}></div>
          </div>
          <div className="ratio-legend">
            <span className="leg-item leg-needs"><span className="dot dot-needs"></span> 50% Needs</span>
            <span className="leg-item leg-wants"><span className="dot dot-wants"></span> 30% Wants</span>
            <span className="leg-item leg-savings"><span className="dot dot-savings"></span> 20% Savings</span>
          </div>
        </div>

        {/* 3 Categories Cards */}
        <div className="category-cards-stack">
          {/* Needs */}
          <div className="cat-card cat-card-needs">
            <div className="cat-card-header">
              <div className="cat-icon-frame bg-needs">
                <HomeIcon size={18} />
              </div>
              <div className="cat-header-text">
                <span className="cat-pill pill-needs">50% Essential</span>
                <h3 className="cat-name">Needs</h3>
              </div>
              <div className="cat-amount-box">
                <strong className="cat-amount">{currencySymbol}{Math.round(calc.needs).toLocaleString()}</strong>
                <span className="cat-freq">/ month</span>
              </div>
            </div>
            <p className="cat-body-text">
              Housing / room rent, dining plan or grocery staples, campus transit passes, textbooks, and health insurance copays.
            </p>
          </div>

          {/* Wants */}
          <div className="cat-card cat-card-wants">
            <div className="cat-card-header">
              <div className="cat-icon-frame bg-wants">
                <Coffee size={18} />
              </div>
              <div className="cat-header-text">
                <span className="cat-pill pill-wants">30% Lifestyle</span>
                <h3 className="cat-name">Wants</h3>
              </div>
              <div className="cat-amount-box">
                <strong className="cat-amount">{currencySymbol}{Math.round(calc.wants).toLocaleString()}</strong>
                <span className="cat-freq">/ month</span>
              </div>
            </div>
            <p className="cat-body-text">
              Cold brew runs, Spotify & streaming subs, gaming drops, campus social events, and weekend road trips.
            </p>
          </div>

          {/* Savings */}
          <div className="cat-card cat-card-savings">
            <div className="cat-card-header">
              <div className="cat-icon-frame bg-savings">
                <Shield size={18} />
              </div>
              <div className="cat-header-text">
                <span className="cat-pill pill-savings">20% Growth</span>
                <h3 className="cat-name">Savings & Debt</h3>
              </div>
              <div className="cat-amount-box">
                <strong className="cat-amount">{currencySymbol}{Math.round(calc.savings).toLocaleString()}</strong>
                <span className="cat-freq">/ month</span>
              </div>
            </div>
            <p className="cat-body-text">
              High-yield rainy day fund, emergency repairs, graduation security cushion, or prepaying unsubsidized student interest.
            </p>
          </div>
        </div>

        {/* Student Guideline Note */}
        <div className="guideline-note-box">
          <Info size={16} className="note-icon" />
          <p className="note-text">
            <strong>Student Guideline Note:</strong> This calculation is an educational guideline and estimate for learning purposes only. Individual needs may adjust ratios based on tuition variations, living rent-free at home, or campus stipends.
          </p>
        </div>
      </div>
    </div>

    <div className="budget-col-right">
      {/* 3. REAL STUDENT SCENARIOS: ADAPT THE RULE TO YOUR LIFE */}
      <div className="scenarios-card bee-card">
        <div className="scenarios-head">
          <div>
            <span className="scenarios-sub">REAL STUDENT SCENARIOS</span>
            <h2 className="scenarios-title">Adapt the Rule to Your Life</h2>
          </div>
          <Sliders size={20} className="scenarios-icon" />
        </div>

        {/* Tabs: Dorm / Commuter / Working */}
        <div className="scenario-tabs-pill">
          {['dorm', 'commuter', 'working'].map((tabKey) => (
            <button
              key={tabKey}
              type="button"
              className={`scenario-tab-btn ${activeScenario === tabKey ? 'active' : ''}`}
              onClick={() => setActiveScenario(tabKey)}
            >
              {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
            </button>
          ))}
        </div>

        {/* Active Scenario Content */}
        <div className="scenario-body-box">
          <div className="scenario-title-row">
            <h3 className="scenario-name">{currentScenario.title}</h3>
            <span className="scenario-badge-pill">{currentScenario.badge}</span>
          </div>

          <p className="scenario-quote">“{currentScenario.quote}”</p>

          <div className="scenario-split-banner">
            <span className="split-label">Suggested Split:</span>
            <strong className="split-val">
              {currentScenario.needsPct}% Needs + {currentScenario.wantsPct}% Wants + {currentScenario.savingsPct}% Savings
            </strong>
          </div>

          {/* Mini Ratio Bar */}
          <div className="mini-scenario-bar">
            <div className="seg seg-50-needs" style={{ width: `${currentScenario.needsPct}%` }}></div>
            <div className="seg seg-30-wants" style={{ width: `${currentScenario.wantsPct}%` }}></div>
            <div className="seg seg-20-savings" style={{ width: `${currentScenario.savingsPct}%` }}></div>
          </div>

          <div className="scenario-advice-callout">
            <Lightbulb size={18} className="callout-icon" />
            <p className="callout-text">{currentScenario.advice}</p>
          </div>
        </div>
      </div>

      {/* 4. BEEWISE ACTION STEPS */}
      <div className="action-steps-card bee-card">
        <div className="action-steps-header">
          <Award size={20} className="steps-star-icon" />
          <h3 className="action-steps-title">BeeWise Action Steps</h3>
        </div>

        <div className="steps-checklist">
          <label className="step-check-row">
            <input
              type="checkbox"
              checked={actionSteps.step1}
              onChange={() => toggleActionStep('step1')}
              className="step-checkbox"
            />
            <span className={`step-text ${actionSteps.step1 ? 'step-done' : ''}`}>
              Calculate your total net monthly income after taxes & financial aid deposits.
            </span>
          </label>

          <label className="step-check-row">
            <input
              type="checkbox"
              checked={actionSteps.step2}
              onChange={() => toggleActionStep('step2')}
              className="step-checkbox"
            />
            <span className={`step-text ${actionSteps.step2 ? 'step-done' : ''}`}>
              Automate the 20% ({currencySymbol}{Math.round(calc.savings)}) into a High-Yield Savings Account on the 1st of every month.
            </span>
          </label>

          <label className="step-check-row">
            <input
              type="checkbox"
              checked={actionSteps.step3}
              onChange={() => toggleActionStep('step3')}
              className="step-checkbox"
            />
            <span className={`step-text ${actionSteps.step3 ? 'step-done' : ''}`}>
              Review active subscriptions to keep wants locked at or below 30% ({currencySymbol}{Math.round(calc.wants)}).
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
