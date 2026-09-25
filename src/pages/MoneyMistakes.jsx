// Interactive student money pitfall analyzer with expandable scenarios and downloadable checklist
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap,
  BookOpen,
  DollarSign,
  Download
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { moneyMistakes } from '../data/mistakes';
import './MoneyMistakes.css';

export default function MoneyMistakes() {
  const [openAccordionId, setOpenAccordionId] = useState('mistake-1');

  const [checkedRisks, setCheckedRisks] = useState({});

  const toggleAccordion = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const handleToggleRiskCheck = (riskKey) => {
    setCheckedRisks((prev) => ({
      ...prev,
      [riskKey]: !prev[riskKey]
    }));
  };

  const totalRisksChecked = Object.values(checkedRisks).filter(Boolean).length;

  const handleDownloadChecklist = () => {
    const checklistText = `========================================================
BUDGETBASICS — STUDENT FINANCIAL HEALTH CHECKLIST
NextGen BudgetBee (Aptech TechWiz 7 Project)
Date Generated: ${new Date().toLocaleDateString()}
========================================================

YOUR AUDIT SUMMARY:
- Habits Flagged: ${totalRisksChecked} of 4
- Status: ${totalRisksChecked === 0 ? 'Exemplary Financial Hygiene' : 'Attention Areas Identified'}

AUDIT CHECKLIST BREAKDOWN:
1. [${checkedRisks['impulse'] ? 'FLAGGED' : 'CLEAN'}] Post-Allowance Impulse Spending
   Risk: Spending large allowance portions within the first 72 hours.
   Action: Apply the 48-Hour Cooling Off Rule before discretionary buys.

2. [${checkedRisks['micro'] ? 'FLAGGED' : 'CLEAN'}] Untracked Micro-Transactions (Under ₦1,000)
   Risk: Small unlogged snacks and rides accumulate to over 30% of funds.
   Action: Log daily outlays into the BudgetBasics Expense Planner.

3. [${checkedRisks['sub'] ? 'FLAGGED' : 'CLEAN'}] Unused Subscriptions & Auto-Debits
   Risk: Streaming, music, and unused apps silently drain accounts.
   Action: Audit recurring bank mandates; share student/family plans.

4. [${checkedRisks['plan'] ? 'FLAGGED' : 'CLEAN'}] Operating Without a Written Allocation
   Risk: Mental budgeting produces unexpected month-end shortfalls.
   Action: Allocate allowance strictly with the 50/30/20 formula.

========================================================
WEEKLY CAMPUS MONEY DISCIPLINE RULES:
[ ] 1. Allocate your allowance on Day 1 using 50% Needs, 30% Wants, 20% Savings.
[ ] 2. Transfer your 20% savings buffer before making any discretionary purchases.
[ ] 3. Ask before every non-essential purchase: "Do I need this to graduate?"
[ ] 4. Audit your remaining weekly safe spend balance every Sunday evening.

Live Platform: https://budgetbasics-two.vercel.app/
========================================================`;

    const blob = new Blob([checklistText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BudgetBasics-Student-Checklist-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="money-mistakes-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          badge="Pitfall Prevention"
          title="Common Student Money Mistakes"
          subtitle="Discover the 5 most common financial traps students encounter on campus, along with realistic scenarios, warning signs, and actionable solutions."
        />

        <div className="mistakes-accordion-list">
          {moneyMistakes.map((mistake, index) => {
            const isOpen = openAccordionId === mistake.id;

            return (
              <div
                key={mistake.id}
                className={`accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion(mistake.id)}
                  aria-expanded={isOpen}
                >
                  <div className="trigger-left">
                    <span className="mistake-number-badge">0{index + 1}</span>
                    <div>
                      <h3 className="mistake-title">{mistake.title}</h3>
                      <p className="mistake-subtitle">{mistake.subtitle}</p>
                    </div>
                  </div>
                  <div className="trigger-arrow">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="accordion-content animate-fade-in">
                    <div className="scenario-block">
                      <span className="block-label">Campus Scenario</span>
                      <p className="scenario-text">{mistake.scenario}</p>
                    </div>

                    <div className="signs-action-grid">
                      <div className="signs-column">
                        <div className="column-head text-warning">
                          <AlertCircle size={16} />
                          <span>Warning Signs to Watch For</span>
                        </div>
                        <ul className="signs-list">
                          {mistake.warningSigns.map((sign, i) => (
                            <li key={i} className="sign-item">
                              <span className="sign-bullet">&bull;</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="action-column">
                        <div className="column-head text-success">
                          <ShieldCheck size={16} />
                          <span>Concrete Corrective Action</span>
                        </div>
                        <div className="action-box">
                          <p className="action-text">{mistake.correctiveAction}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <section className="section-spacing habit-audit-section">
          <div className="card audit-card">
            <div className="audit-header">
              <div className="audit-icon-box">
                <Sparkles size={24} className="audit-icon" />
              </div>
              <div>
                <span className="section-badge">Interactive Self-Audit</span>
                <h3 className="audit-title">Quick Student Spending Audit</h3>
                <p className="audit-subtitle">
                  Check any habits that currently apply to your college routine to receive tailored advice.
                </p>
              </div>
            </div>

            <div className="audit-checklist">
              <label className="audit-check-item">
                <input
                  type="checkbox"
                  checked={!!checkedRisks['impulse']}
                  onChange={() => handleToggleRiskCheck('impulse')}
                  className="audit-checkbox"
                />
                <span className="check-text">
                  I often make online or canteen purchases within the first 3 days of getting my allowance.
                </span>
              </label>

              <label className="audit-check-item">
                <input
                  type="checkbox"
                  checked={!!checkedRisks['micro']}
                  onChange={() => handleToggleRiskCheck('micro')}
                  className="audit-checkbox"
                />
                <span className="check-text">
                  I rarely track small purchases (under ₦1,000) and wonder where my allowance disappeared.
                </span>
              </label>

              <label className="audit-check-item">
                <input
                  type="checkbox"
                  checked={!!checkedRisks['sub']}
                  onChange={() => handleToggleRiskCheck('sub')}
                  className="audit-checkbox"
                />
                <span className="check-text">
                  I pay for streaming or app subscriptions that I haven't opened in over two weeks.
                </span>
              </label>

              <label className="audit-check-item">
                <input
                  type="checkbox"
                  checked={!!checkedRisks['plan']}
                  onChange={() => handleToggleRiskCheck('plan')}
                  className="audit-checkbox"
                />
                <span className="check-text">
                  I keep my budget purely in my head rather than recording planned allocations.
                </span>
              </label>
            </div>

            <div className="audit-results-panel">
              {totalRisksChecked === 0 ? (
                <div className="audit-result-msg result-clean">
                  <CheckCircle2 size={18} />
                  <span>Great financial hygiene! Keep utilizing the 50/30/20 framework and savings goals.</span>
                </div>
              ) : (
                <div className="audit-result-msg result-flagged">
                  <AlertCircle size={18} />
                  <span>
                    You identified <strong>{totalRisksChecked} habit area{totalRisksChecked > 1 ? 's' : ''}</strong> to improve.
                    Try using the <strong>Expense Planner</strong> to track your outlays for the next 14 days!
                  </span>
                </div>
              )}

              <div className="audit-actions-group" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleDownloadChecklist}
                  className="btn btn-outline btn-sm"
                  title="Download your personalized student financial checklist as a text file"
                >
                  <Download size={14} />
                  <span>Download Checklist (.txt)</span>
                </button>
                <Link to="/expense-planner" className="btn btn-primary btn-sm">
                  <span>Open Expense Planner</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
