// Milestone savings calculator estimating completion dates and visual progress toward target goals
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Clock,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  PlusCircle,
  Trophy,
  Zap,
  Calendar,
  Layers,
  Laptop,
  Award,
  Shield,
  Lightbulb,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeading from '../components/SectionHeading';
import ProgressBar from '../components/ProgressBar';
import { calculateSavingsGoal } from '../utils/budgetCalculations';
import { validateAmount, validateRequiredText } from '../utils/validation';
import { useCurrency } from '../context/CurrencyContext';
import './SavingsGoals.css';

const SAMPLE_GOAL_PRESETS = [
  {
    name: 'Study Laptop',
    target: 180000,
    current: 45000,
    monthly: 22500,
    icon: Laptop
  },
  {
    name: 'Certification Exam Fee',
    target: 65000,
    current: 25000,
    monthly: 10000,
    icon: Award
  },
  {
    name: 'Hostel Emergency Cushion Buffer',
    target: 30000,
    current: 12000,
    monthly: 6000,
    icon: Shield
  }
];

export const SAVINGS_TIPS_BY_TIMELINE = [
  'Consistency beats intensity: Putting aside a steady monthly sum creates unbreakable financial discipline.',
  'Auto-deposit on Day 1: Transfer your monthly contribution the very moment your allowance arrives.',
  'Sell unused textbooks or tech: Accelerate your timeline by selling last semester’s physical course materials.',
  'Cook with roommates: Trimming convenience takeaway food each week directly cuts months off your goal timeline.'
];

export default function SavingsGoals() {
  const { currency, format, convertFromNgn, convert } = useCurrency();
  const [goalName, setGoalName] = useState('Study Laptop');
  const [targetAmount, setTargetAmount] = useState(() => convertFromNgn(180000).toString());
  const [currentSavings, setCurrentSavings] = useState(() => convertFromNgn(45000).toString());
  const [monthlyContribution, setMonthlyContribution] = useState(() => convertFromNgn(22500).toString());

  const [errors, setErrors] = useState({});
  const prevCurrencyRef = useRef(currency.code);

  // Smoothly convert inputs when the user changes active currency without wiping data
  useEffect(() => {
    if (prevCurrencyRef.current !== currency.code) {
      const prevCode = prevCurrencyRef.current;
      setTargetAmount((prev) => {
        const val = Number(prev.replace(/,/g, ''));
        return isNaN(val) || val <= 0 ? convertFromNgn(180000).toString() : convert(val, prevCode, currency.code).toString();
      });
      setCurrentSavings((prev) => {
        const val = Number(prev.replace(/,/g, ''));
        return isNaN(val) || val <= 0 ? convertFromNgn(45000).toString() : convert(val, prevCode, currency.code).toString();
      });
      setMonthlyContribution((prev) => {
        const val = Number(prev.replace(/,/g, ''));
        return isNaN(val) || val <= 0 ? convertFromNgn(22500).toString() : convert(val, prevCode, currency.code).toString();
      });
      prevCurrencyRef.current = currency.code;
    }
  }, [currency.code, convert, convertFromNgn]);

  const numTarget = Number(targetAmount.replace(/,/g, '')) || 0;
  const numCurrent = Number(currentSavings.replace(/,/g, '')) || 0;
  const numMonthly = Number(monthlyContribution.replace(/,/g, '')) || 0;

  const result = calculateSavingsGoal(numTarget, numCurrent, numMonthly);

  useEffect(() => {
    if (result.isCompleted && numTarget > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.isCompleted, numTarget]);

  const handleValidateField = (field, value) => {
    let error = null;
    if (field === 'goalName') {
      const v = validateRequiredText(value, 'Goal Name', 2);
      if (!v.isValid) error = v.error;
    } else if (field === 'targetAmount') {
      const v = validateAmount(value, { allowZero: false, min: 1, max: 100000000, currencySymbol: currency.symbol });
      if (!v.isValid) error = v.error;
    } else if (field === 'currentSavings') {
      const v = validateAmount(value, { allowZero: true, min: 0, max: 100000000, currencySymbol: currency.symbol });
      if (!v.isValid) error = v.error;
    } else if (field === 'monthlyContribution') {
      const v = validateAmount(value, { allowZero: false, min: 1, max: 100000000, currencySymbol: currency.symbol });
      if (!v.isValid) error = v.error;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error
    }));
  };

  const handleApplyPreset = (preset) => {
    setGoalName(preset.name);
    setTargetAmount(convertFromNgn(preset.target).toString());
    setCurrentSavings(convertFromNgn(preset.current).toString());
    setMonthlyContribution(convertFromNgn(preset.monthly).toString());
    setErrors({});
  };

  const getEstimatedDate = (months) => {
    if (!months || months <= 0) return 'Immediate';
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Safe daily and weekly calculation
  const totalDays = Math.max(1, (result.estimatedMonths || 1) * 30);
  const totalWeeks = Math.max(1, (result.estimatedMonths || 1) * 4);
  const dailyRequired = result.isCompleted ? 0 : Math.ceil(result.remainingAmount / totalDays);
  const weeklyRequired = result.isCompleted ? 0 : Math.ceil(result.remainingAmount / totalWeeks);

  return (
    <div className="savings-goals-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          title="Student Savings Goals Estimator"
          subtitle="Model how long it takes to save for textbooks, a study laptop, or emergency hostel reserves with realistic monthly deposits."
        />

        <div className="presets-banner-bar">
          <div className="presets-lead-text">
            <Sparkles size={16} className="text-gold" />
            <span>Popular Student Targets:</span>
          </div>
          <div className="presets-tags-row">
            {SAMPLE_GOAL_PRESETS.map((preset, idx) => {
              const Icon = preset.icon;
              const isSelected = goalName === preset.name;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`preset-chip-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleApplyPreset(preset)}
                >
                  <Icon size={14} className="preset-icon" />
                  <span className="preset-label">{preset.name}</span>
                  <span className="chip-amt">{format(convertFromNgn(preset.target))}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="goals-workspace-layout">
          {/* Main Column: Form Inputs & Calculation Result */}
          <div className="goals-main-column">
            <div className="goal-input-card card">
              <div className="card-header-clean">
                <div className="card-header-left">
                  <div className="goal-icon-badge">
                    <Target size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="card-heading">1. Define Your Savings Goal</h3>
                    <p className="card-subheading">Enter your target amount and planned monthly deposit</p>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="goal-form">
                <div className="form-group">
                  <label htmlFor="goal-name-input" className="form-label">
                    Goal Title / Purpose
                  </label>
                  <input
                    id="goal-name-input"
                    type="text"
                    value={goalName}
                    onChange={(e) => {
                      setGoalName(e.target.value);
                      handleValidateField('goalName', e.target.value);
                    }}
                    placeholder="e.g. Exam Certification, Study Laptop"
                    className={`form-input ${errors.goalName ? 'input-error' : ''}`}
                  />
                  {errors.goalName && (
                    <div className="form-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.goalName}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="target-amount-input" className="form-label">
                    Target Amount Required ({currency.symbol})
                  </label>
                  <div className="input-with-symbol">
                    <span className="currency-prefix">{currency.symbol}</span>
                    <input
                      id="target-amount-input"
                      type="number"
                      value={targetAmount}
                      onChange={(e) => {
                        setTargetAmount(e.target.value);
                        handleValidateField('targetAmount', e.target.value);
                      }}
                      placeholder={convertFromNgn(180000).toString()}
                      className={`form-input ${errors.targetAmount ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.targetAmount && (
                    <div className="form-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.targetAmount}</span>
                    </div>
                  )}
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <label htmlFor="current-savings-input" className="form-label">
                      Already Saved ({currency.symbol})
                    </label>
                    <div className="input-with-symbol">
                      <span className="currency-prefix">{currency.symbol}</span>
                      <input
                        id="current-savings-input"
                        type="number"
                        value={currentSavings}
                        onChange={(e) => {
                          setCurrentSavings(e.target.value);
                          handleValidateField('currentSavings', e.target.value);
                        }}
                        placeholder={convertFromNgn(45000).toString()}
                        className={`form-input ${errors.currentSavings ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.currentSavings && (
                      <div className="form-error-msg">
                        <AlertCircle size={14} />
                        <span>{errors.currentSavings}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="monthly-contribution-input" className="form-label">
                      Monthly Deposit ({currency.symbol})
                    </label>
                    <div className="input-with-symbol">
                      <span className="currency-prefix">{currency.symbol}</span>
                      <input
                        id="monthly-contribution-input"
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => {
                          setMonthlyContribution(e.target.value);
                          handleValidateField('monthlyContribution', e.target.value);
                        }}
                        placeholder={convertFromNgn(22500).toString()}
                        className={`form-input ${errors.monthlyContribution ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.monthlyContribution && (
                      <div className="form-error-msg">
                        <AlertCircle size={14} />
                        <span>{errors.monthlyContribution}</span>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="goal-forecast-card card">
              <div className="card-header-clean">
                <div>
                  <span className="section-badge">Timeline & Progress</span>
                  <h3 className="card-heading">{goalName || 'Your Savings Goal'}</h3>
                </div>
                <span className={`status-pill ${result.isCompleted ? 'status-completed' : 'status-in-progress'}`}>
                  {result.isCompleted ? 'Goal Completed!' : 'In Progress'}
                </span>
              </div>

              <div className="progress-section-block">
                <ProgressBar
                  percentage={result.progressPercentage}
                  label="Overall Progress"
                  amount={`${format(numCurrent)} / ${format(numTarget)}`}
                  color={result.isCompleted ? 'savings' : 'accent'}
                  height="12px"
                />
              </div>

              <div className="forecast-metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">Remaining Amount</span>
                  <strong className="metric-val text-remaining">{format(result.remainingAmount)}</strong>
                  <span className="metric-sub">Needed to reach target</span>
                </div>

                <div className="metric-box">
                  <span className="metric-label">Estimated Time</span>
                  <strong className="metric-val text-months">
                    {result.isCompleted ? '0 Months' : `${result.estimatedMonths} Months`}
                  </strong>
                  <span className="metric-sub">
                    Target Date: <strong>{getEstimatedDate(result.estimatedMonths)}</strong>
                  </span>
                </div>
              </div>

              {result.isCompleted ? (
                <div className="celebration-box animate-fade-in">
                  <Trophy size={28} className="trophy-icon" />
                  <div>
                    <h4 className="celebration-title">Congratulations! Target Reached!</h4>
                    <p className="celebration-text">
                      You have accumulated sufficient funds for {goalName}. You are ready to make this purchase responsibly or rollover your savings into a new milestone!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="goal-tip-box">
                  <div className="tip-box-head">
                    <Zap size={16} className="tip-zap-icon" />
                    <span>Student Savings Strategy:</span>
                  </div>
                  <p className="tip-box-body">
                    By committing <strong>{format(numMonthly)}/month</strong>, you are on track to achieve your goal in <strong>{result.estimatedMonths} months</strong>. Increasing deposits by just {format(convertFromNgn(3000))}/month cuts up to 1 whole month off your schedule!
                  </p>
                </div>
              )}

              <div className="forecast-footer-action">
                <Link to="/expense-planner" className="btn btn-primary">
                  <span>Track Expenses to Protect Your Goal</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Side Column: Student Savings Photography Showcase & Practical Insights */}
          <div className="goals-side-column">
            <div className="savings-showcase-card card">
              <div className="showcase-image-wrapper">
                <img
                  src="/student-savings-goal.jpg"
                  alt="College student saving money in a jar at study desk"
                  className="showcase-img"
                  loading="lazy"
                />
                <div className="showcase-badge-floating">
                  <Coins size={14} className="text-gold" />
                  <span>Disciplined Campus Saver</span>
                </div>
              </div>

              <div className="showcase-content">
                <h4 className="showcase-title">Target Milestone Breakdown</h4>
                <p className="showcase-desc">
                  Break intimidating semester goals into bite-sized daily and weekly micro-targets:
                </p>

                <div className="micro-targets-grid">
                  <div className="micro-target-pill">
                    <span className="micro-label">Daily Pace</span>
                    <strong className="micro-val">{format(dailyRequired)}/day</strong>
                    <span className="micro-hint">Just pack 1 lunch instead of canteen</span>
                  </div>
                  <div className="micro-target-pill">
                    <span className="micro-label">Weekly Pace</span>
                    <strong className="micro-val">{format(weeklyRequired)}/week</strong>
                    <span className="micro-hint">Lock away every Sunday night</span>
                  </div>
                </div>

                <div className="campus-tactics-box">
                  <div className="tactics-header">
                    <Lightbulb size={16} className="text-gold" />
                    <span>3 Golden Rules For College Goals</span>
                  </div>
                  <ul className="tactics-list">
                    <li>
                      <strong>The 24-Hour Rule:</strong> Wait 24 hours before buying non-essentials over {format(convertFromNgn(5000))}.
                    </li>
                    <li>
                      <strong>Separate Bank Vault:</strong> Keep savings in a separate sub-account without a linked debit card.
                    </li>
                    <li>
                      <strong>Sell Old Course Packs:</strong> Reinvest proceeds from completed semester books straight into your goal.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="savings-guide-callout card">
          <h4 className="guide-callout-title">Golden Rules for Student Milestone Savings</h4>
          <div className="tips-timeline-grid">
            {SAVINGS_TIPS_BY_TIMELINE.map((tip, idx) => (
              <div key={idx} className="tip-timeline-item">
                <div className="timeline-num-badge">{idx + 1}</div>
                <p className="timeline-tip-text">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
