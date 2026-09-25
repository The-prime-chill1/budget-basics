import React, { useState, useEffect } from 'react';
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
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeading from '../components/SectionHeading';
import ProgressBar from '../components/ProgressBar';
import { calculateSavingsGoal } from '../utils/budgetCalculations';
import { validateAmount, validateRequiredText } from '../utils/validation';
import { formatCurrency } from '../utils/formatters';
import './SavingsGoals.css';

const SAMPLE_GOAL_PRESETS = [
  {
    name: 'Refurbished Study Laptop',
    target: 180000,
    current: 45000,
    monthly: 22500,
    icon: Laptop
  },
  {
    name: 'Aptech Certification Exam Fee',
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
  'Group cook with roommates: Saving ₦5,000 on canteen dining each week directly cuts months off your goal timeline.'
];

export default function SavingsGoals() {
  const [goalName, setGoalName] = useState('Refurbished Study Laptop');
  const [targetAmount, setTargetAmount] = useState('180000');
  const [currentSavings, setCurrentSavings] = useState('45000');
  const [monthlyContribution, setMonthlyContribution] = useState('22500');

  const [errors, setErrors] = useState({});

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
      const v = validateAmount(value, { allowZero: false, min: 1000, max: 100000000 });
      if (!v.isValid) error = v.error;
    } else if (field === 'currentSavings') {
      const v = validateAmount(value, { allowZero: true, min: 0, max: 100000000 });
      if (!v.isValid) error = v.error;
    } else if (field === 'monthlyContribution') {
      const v = validateAmount(value, { allowZero: false, min: 100, max: 100000000 });
      if (!v.isValid) error = v.error;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error
    }));
  };

  const handleApplyPreset = (preset) => {
    setGoalName(preset.name);
    setTargetAmount(preset.target.toString());
    setCurrentSavings(preset.current.toString());
    setMonthlyContribution(preset.monthly.toString());
    setErrors({});
  };

  const getEstimatedDate = (months) => {
    if (!months || months <= 0) return 'Immediate';
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="savings-goals-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          badge="Goal Milestone Calculator"
          title="Savings Goals & Timeline Calculator"
          subtitle="Transform ambitious college dreams into achievable monthly milestones with clear timeline forecasting."
        />

        <div className="preset-goals-bar">
          <span className="preset-bar-title">Try Student Goal Templates:</span>
          <div className="preset-cards-list">
            {SAMPLE_GOAL_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-goal-chip"
                onClick={() => handleApplyPreset(p)}
              >
                <span className="chip-icon-box">
                  <p.icon size={16} />
                </span>
                <span className="chip-name">{p.name}</span>
                <span className="chip-target">{formatCurrency(p.target)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="goals-workspace-grid">
          <div className="goal-input-card card">
            <div className="card-header-clean">
              <div className="header-icon-box bg-emerald">
                <Target size={20} />
              </div>
              <div>
                <h3 className="card-heading">1. Define Your Savings Goal</h3>
                <p className="card-subtext">Enter your target amount and planned deposits</p>
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
                  Target Amount Required (₦)
                </label>
                <div className="input-with-symbol">
                  <span className="currency-prefix">₦</span>
                  <input
                    id="target-amount-input"
                    type="text"
                    value={targetAmount}
                    onChange={(e) => {
                      setTargetAmount(e.target.value);
                      handleValidateField('targetAmount', e.target.value);
                    }}
                    placeholder="e.g. 180,000"
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

              <div className="form-group">
                <label htmlFor="current-savings-input" className="form-label">
                  Current Amount Saved So Far (₦)
                </label>
                <div className="input-with-symbol">
                  <span className="currency-prefix">₦</span>
                  <input
                    id="current-savings-input"
                    type="text"
                    value={currentSavings}
                    onChange={(e) => {
                      setCurrentSavings(e.target.value);
                      handleValidateField('currentSavings', e.target.value);
                    }}
                    placeholder="e.g. 45,000"
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
                  Expected Monthly Deposit from Allowance (₦)
                </label>
                <div className="input-with-symbol">
                  <span className="currency-prefix">₦</span>
                  <input
                    id="monthly-contribution-input"
                    type="text"
                    value={monthlyContribution}
                    onChange={(e) => {
                      setMonthlyContribution(e.target.value);
                      handleValidateField('monthlyContribution', e.target.value);
                    }}
                    placeholder="e.g. 20,000"
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
                amount={`${formatCurrency(numCurrent)} / ${formatCurrency(numTarget)}`}
                color={result.isCompleted ? 'savings' : 'accent'}
                height="12px"
              />
            </div>

            <div className="forecast-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Remaining Amount</span>
                <strong className="metric-val text-remaining">{formatCurrency(result.remainingAmount)}</strong>
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
                  By committing <strong>{formatCurrency(numMonthly)}/month</strong>, you are on track to achieve your goal in <strong>{result.estimatedMonths} months</strong>. Increasing deposits by just ₦3,000/month could save you up to 1 whole month!
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
      </div>
    </div>
  );
}
