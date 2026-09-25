// 50/30/20 rule calculator with interactive donut visualization, category breakdown, and weekly limits
import React, { useState, useEffect } from 'react';
import {
  Home as HomeIcon,
  Coffee,
  Shield,
  Info,
  Sliders,
  Calculator,
  Lightbulb,
  Award,
  Calendar,
  TrendingUp,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { calculate503020 } from '../utils/budgetCalculations';
import { useCurrency } from '../context/CurrencyContext';
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
  const { currency, format } = useCurrency();
  const [incomeInput, setIncomeInput] = useState(() => (currency.defaultAmount || 60000).toString());
  const [activeScenario, setActiveScenario] = useState('dorm');

  const [actionSteps, setActionSteps] = useState({
    step1: true,
    step2: false,
    step3: false
  });
  const [copied, setCopied] = useState(false);

  // Automatically update income when user switches currency in the navbar
  useEffect(() => {
    setIncomeInput((currency.defaultAmount || 60000).toString());
  }, [currency.code]);

  const numericIncome = Number(incomeInput.replace(/,/g, '')) || 0;
  const calc = calculate503020(numericIncome);

  const toggleActionStep = (key) => {
    setActionSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreset = (amt) => {
    setIncomeInput(amt.toString());
  };

  const handleCopyPlan = () => {
    const weeklyNeeds = Math.round(calc.needs / 4);
    const weeklyWants = Math.round(calc.wants / 4);
    const weeklySavings = Math.round(calc.savings / 4);
    const text = `📋 My Student 50/30/20 Budget Plan (${currency.code})
Total Monthly Income: ${format(numericIncome)}

• 50% Needs (Rent, Groceries, Transit, Course Materials):
  ${format(calc.needs)} / month (~${format(weeklyNeeds)} / week)

• 30% Wants (Entertainment, Dining Out, Subscriptions):
  ${format(calc.wants)} / month (~${format(weeklyWants)} / week)

• 20% Savings & Debt (Emergency Fund, Target Savings):
  ${format(calc.savings)} / month (~${format(weeklySavings)} / week)

🎯 1-Year Projected Savings: ${format(calc.savings * 12)}
Generated on BudgetBasics: https://budgetbasics.org`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  const currentScenario = SCENARIOS[activeScenario];

  return (
    <div className="budget-503020-screen animate-fade-in">
      <div className="hero-concept-card bee-card-hero">
        <div className="concept-header-row">
          <div className="concept-mascot-frame">
            <img src="/mascot-bee.png" alt="Bee Mascot" className="mascot-img" />
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

      <div className="budget-desktop-layout">
        <div className="budget-col-left">
          <div className="allocator-card bee-card">
            <div className="allocator-head">
              <div>
                <span className="allocator-sub">INTERACTIVE ALLOCATOR</span>
                <h2 className="allocator-title">Monthly Student Cash Flow</h2>
              </div>
              <Calculator size={20} className="allocator-icon" />
            </div>

            <div className="income-input-group">
              <label htmlFor="student-income" className="input-field-label">
                Total Monthly Allowance / Paycheck ({currency.code})
              </label>
              <div className="input-with-preset">
                <div className="symbol-input-box">
                  <span className="currency-prefix">{currency.symbol}</span>
                  <input
                    id="student-income"
                    type="number"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(e.target.value)}
                    placeholder={currency.defaultAmount.toString()}
                    className="bee-input income-field"
                    min="1"
                  />
                </div>
                <div className="presets-button-group">
                  {currency.presets.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      className={`preset-btn ${Number(numericIncome) === p.value ? 'active' : ''}`}
                      onClick={() => handlePreset(p.value)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="allocation-ratio-block">
              <div className="ratio-title-row">
                <span className="ratio-label">Visual Allocation Ratio</span>
                <strong className="ratio-status">100% Balanced</strong>
              </div>
              <div className="three-segment-bar">
                <div className="seg seg-50-needs" style={{ width: '50%' }} title="50% Needs"></div>
                <div className="seg seg-30-wants" style={{ width: '30%' }} title="30% Wants"></div>
                <div className="seg seg-20-savings" style={{ width: '20%' }} title="20% Savings"></div>
              </div>
              <div className="ratio-legend">
                <span className="legend-item"><span className="legend-dot dot-needs"></span> 50% Needs</span>
                <span className="legend-item"><span className="legend-dot dot-wants"></span> 30% Wants</span>
                <span className="legend-item"><span className="legend-dot dot-savings"></span> 20% Savings</span>
              </div>
            </div>

            <div className="category-cards-stack">
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
                    <strong className="cat-amount">{format(calc.needs)}</strong>
                    <span className="cat-freq">/ month</span>
                  </div>
                </div>
                <p className="cat-body-text">
                  Housing / room rent, dining plan or grocery staples, campus transit passes, textbooks, and health insurance copays.
                </p>
              </div>

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
                    <strong className="cat-amount">{format(calc.wants)}</strong>
                    <span className="cat-freq">/ month</span>
                  </div>
                </div>
                <p className="cat-body-text">
                  Cold brew runs, Spotify & streaming subs, gaming drops, campus social events, and weekend road trips.
                </p>
              </div>

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
                    <strong className="cat-amount">{format(calc.savings)}</strong>
                    <span className="cat-freq">/ month</span>
                  </div>
                </div>
                <p className="cat-body-text">
                  High-yield rainy day fund, emergency repairs, graduation security cushion, or prepaying unsubsidized student interest.
                </p>
              </div>
            </div>

            <div className="guideline-note-box">
              <Info size={16} className="note-icon" />
              <p className="note-text">
                <strong>Student Guideline Note:</strong> This calculation is an educational guideline and estimate for learning purposes only. Individual needs may adjust ratios based on tuition variations, living rent-free at home, or campus stipends.
              </p>
            </div>
          </div>
        </div>

        <div className="budget-col-right">
          <div className="scenarios-card bee-card">
            <div className="scenarios-head">
              <div>
                <span className="scenarios-sub">REAL STUDENT SCENARIOS</span>
                <h2 className="scenarios-title">Adapt the Rule to Your Life</h2>
              </div>
              <Sliders size={20} className="scenarios-icon" />
            </div>

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
                  Automate the 20% ({format(calc.savings)}) into a High-Yield Savings Account on the 1st of every month.
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
                  Review active subscriptions to keep wants locked at or below 30% ({format(calc.wants)}).
                </span>
              </label>
            </div>

            <div className="action-weekly-envelopes">
              <div className="weekly-envelopes-header">
                <div className="weekly-head-left">
                  <Calendar size={16} className="weekly-icon" />
                  <span className="weekly-heading">Weekly Spending Envelopes</span>
                </div>
                <span className="weekly-pill">Paced for 4 Weeks</span>
              </div>
              <p className="weekly-desc">
                Pace your cash flow week-by-week so you never run empty before month's end:
              </p>
              <div className="weekly-grid">
                <div className="weekly-chip weekly-chip-needs">
                  <div className="chip-cat">
                    <span className="chip-dot dot-needs"></span>
                    <span>Needs</span>
                  </div>
                  <strong className="chip-amt">{format(Math.round(calc.needs / 4))}</strong>
                  <span className="chip-sub">/ week</span>
                </div>
                <div className="weekly-chip weekly-chip-wants">
                  <div className="chip-cat">
                    <span className="chip-dot dot-wants"></span>
                    <span>Wants</span>
                  </div>
                  <strong className="chip-amt">{format(Math.round(calc.wants / 4))}</strong>
                  <span className="chip-sub">/ week max</span>
                </div>
                <div className="weekly-chip weekly-chip-savings">
                  <div className="chip-cat">
                    <span className="chip-dot dot-savings"></span>
                    <span>Savings</span>
                  </div>
                  <strong className="chip-amt">{format(Math.round(calc.savings / 4))}</strong>
                  <span className="chip-sub">/ week</span>
                </div>
              </div>
            </div>

            <div className="savings-milestone-forecast">
              <div className="milestone-head">
                <TrendingUp size={16} className="milestone-icon" />
                <span className="milestone-title">Your 20% Growth Engine</span>
              </div>
              <div className="milestones-row">
                <div className="milestone-box">
                  <span className="milestone-time">3 Months</span>
                  <strong className="milestone-val">{format(calc.savings * 3)}</strong>
                  <span className="milestone-label">Semester Cushion</span>
                </div>
                <div className="milestone-box">
                  <span className="milestone-time">6 Months</span>
                  <strong className="milestone-val">{format(calc.savings * 6)}</strong>
                  <span className="milestone-label">Emergency Shield</span>
                </div>
                <div className="milestone-box highlight-box">
                  <span className="milestone-time">12 Months</span>
                  <strong className="milestone-val">{format(calc.savings * 12)}</strong>
                  <span className="milestone-label">Graduation Vault</span>
                </div>
              </div>
            </div>

            <div className="rule-tip-banner">
              <Zap size={16} className="rule-tip-icon" />
              <div className="rule-tip-content">
                <strong>The 24-Hour Rule:</strong> Transfer your 20% ({format(calc.savings)}) within the first 24 hours of receiving income. Never save what is left after spending—spend what is left after saving!
              </div>
            </div>

            <button
              type="button"
              className={`copy-plan-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyPlan}
              title="Copy your 50/30/20 breakdown to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} className="btn-icon-done" />
                  <span>50/30/20 Plan Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy My 50/30/20 Plan Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
