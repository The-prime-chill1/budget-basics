// Unified planning workspace combining the savings goals forecaster and session expense logger
import React, { useState, useEffect } from 'react';
import {
  Flag,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  Utensils,
  BookOpen,
  Train,
  ShoppingBag,
  Sparkles,
  Layers,
  Star,
  FileText
} from 'lucide-react';
import Modal from '../components/Modal';
import { useCurrency } from '../context/CurrencyContext';
import { calculateSavingsGoal } from '../utils/budgetCalculations';
import './Planner.css';

const ICON_MAP = {
  Food: Utensils,
  Education: BookOpen,
  Transport: Train,
  Shopping: ShoppingBag,
  Entertainment: Sparkles,
  Utilities: Layers,
  Miscellaneous: ShoppingBag
};

const INITIAL_EXPENSES = [
  { id: '1', name: 'Campus Bento Box & Snacks', category: 'Food', date: '2026-02-14', amount: 14.50 },
  { id: '2', name: 'Calculus Study PDF & Print', category: 'Education', date: '2026-02-13', amount: 28.00 },
  { id: '3', name: 'Subway Reload Pass', category: 'Transport', date: '2026-02-11', amount: 35.00 },
  { id: '4', name: 'Noise-Canceling Earphones', category: 'Shopping', date: '2026-02-09', amount: 91.00 }
];

export default function Planner() {
  const { currency, format, convertFromNgn } = useCurrency();
  const sym = currency.symbol;
  const [goalName, setGoalName] = useState('Emergency Laptop Fund');
  const [targetAmount, setTargetAmount] = useState(() => convertFromNgn(300000).toString());
  const [currentSaved, setCurrentSaved] = useState(() => convertFromNgn(60000).toString());
  const [monthlySavings, setMonthlySavings] = useState(() => convertFromNgn(30000));

  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [monthlyAllowance, setMonthlyAllowance] = useState(() => convertFromNgn(150000));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    amount: ''
  });

  // Sync default values when active currency changes
  useEffect(() => {
    setTargetAmount(convertFromNgn(300000).toString());
    setCurrentSaved(convertFromNgn(60000).toString());
    setMonthlySavings(convertFromNgn(30000));
    setMonthlyAllowance(convertFromNgn(150000));
  }, [currency.code]);

  const targetNum = Math.max(0, Number(targetAmount) || 0);
  const savedNum = Math.max(0, Number(currentSaved) || 0);
  const remainingTarget = Math.max(0, targetNum - savedNum);

  // Dynamic slider range: scales intelligently with the goal amount or remaining balance
  const currencyBaseMax = currency.code === 'NGN' ? 250000 : currency.code === 'INR' ? 50000 : 2500;
  const computedSliderMax = Math.max(
    currencyBaseMax,
    targetNum > 0 ? Math.ceil(targetNum) : currencyBaseMax,
    remainingTarget > 0 ? Math.ceil(remainingTarget) : currencyBaseMax,
    monthlySavings > 0 ? Math.ceil(monthlySavings * 1.5) : currencyBaseMax
  );

  let sliderStep = 10;
  if (computedSliderMax >= 1000000) sliderStep = 10000;
  else if (computedSliderMax >= 250000) sliderStep = 5000;
  else if (computedSliderMax >= 50000) sliderStep = 1000;
  else if (computedSliderMax >= 10000) sliderStep = 250;
  else if (computedSliderMax >= 2000) sliderStep = 50;
  else sliderStep = 25;

  const sliderMin = sliderStep;

  const goalCalc = calculateSavingsGoal(targetNum, savedNum, monthlySavings);

  const totalPlanned = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const remainingAllowance = monthlyAllowance - totalPlanned;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      amount: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      date: item.date,
      amount: item.amount.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    const amt = parseFloat(formData.amount) || 0;
    if (!formData.name.trim() || amt <= 0) return;

    if (editingId) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, name: formData.name, category: formData.category, date: formData.date, amount: amt }
            : item
        )
      );
    } else {
      const newItem = {
        id: `exp-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        date: formData.date,
        amount: amt
      };
      setExpenses((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="planner-screen animate-fade-in">
      <div className="planner-hero-card bee-card-hero">
        <div className="lab-header-row">
          <div className="lab-mascot-frame">
            <img src="/mascot-bee.png" alt="Bee" className="mascot-img" />
          </div>
          <div className="lab-title-group">
            <div className="lab-badge-row">
              <span className="lab-name">BeeWise Lab</span>
              <span className="lab-pill-badge">Interactive Sandbox</span>
            </div>
            <p className="lab-desc">Simulate savings speedruns and track live...</p>
          </div>
        </div>
      </div>

      <div className="planner-desktop-layout">
        <div className="planner-col-left">
          <div className="goal-estimator-card bee-card">
        <div className="goal-estimator-header">
          <div className="estimator-title-left">
            <span className="orange-indicator-dot"></span>
            <h2 className="estimator-title">Savings Goal Estimator</h2>
          </div>
          <span className="real-time-badge">Real-time Model</span>
        </div>

        <div className="goal-form-fields">
          <div className="field-group">
            <label className="field-label">Goal Name</label>
            <div className="input-with-end-icon">
              <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Emergency Laptop Fund"
                className="bee-input"
              />
              <Flag size={16} className="end-icon" />
            </div>
          </div>

          <div className="fields-2col">
            <div className="field-group">
              <label className="field-label">Target Amount ({sym})</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="1200"
                className="bee-input"
              />
            </div>
            <div className="field-group">
              <label className="field-label">Current Saved ({sym})</label>
              <input
                type="number"
                value={currentSaved}
                onChange={(e) => setCurrentSaved(e.target.value)}
                placeholder="300"
                className="bee-input"
              />
            </div>
          </div>

          <div className="field-group">
            <div className="slider-header-row">
              <label className="field-label">Expected Monthly Savings ({sym})</label>
              <span className="monthly-rate-pill">{format(monthlySavings || 0)}/mo</span>
            </div>
            <div className="slider-input-combo">
              <input
                type="range"
                min={sliderMin}
                max={computedSliderMax}
                step={sliderStep}
                value={Math.min(computedSliderMax, Math.max(0, monthlySavings || 0))}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="monthly-slider"
                aria-label="Expected Monthly Savings Slider"
              />
              <div className="slider-input-wrapper">
                <span className="slider-input-prefix">{sym}</span>
                <input
                  type="number"
                  min="0"
                  value={monthlySavings === 0 ? '' : monthlySavings}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
                    setMonthlySavings(val);
                  }}
                  className="slider-val-input"
                  placeholder="0"
                  aria-label="Expected Monthly Savings Amount"
                />
              </div>
            </div>

            {remainingTarget > 0 && (
              <div className="quick-timeline-chips">
                <span className="timeline-chips-label">Speedrun:</span>
                <button
                  type="button"
                  className="timeline-chip"
                  onClick={() => setMonthlySavings(Math.ceil(remainingTarget / 3))}
                  title="Reach goal in 3 months"
                >
                  3 mo ({format(Math.ceil(remainingTarget / 3))}/mo)
                </button>
                <button
                  type="button"
                  className="timeline-chip"
                  onClick={() => setMonthlySavings(Math.ceil(remainingTarget / 6))}
                  title="Reach goal in 6 months"
                >
                  6 mo ({format(Math.ceil(remainingTarget / 6))}/mo)
                </button>
                <button
                  type="button"
                  className="timeline-chip"
                  onClick={() => setMonthlySavings(Math.ceil(remainingTarget / 12))}
                  title="Reach goal in 12 months"
                >
                  12 mo ({format(Math.ceil(remainingTarget / 12))}/mo)
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="goal-result-box">
          <div className="goal-metrics-row">
            <div>
              <span className="res-label">REMAINING TO SAVE</span>
              <strong className="res-amount">{format(goalCalc.remainingAmount, true)}</strong>
            </div>
            <div className="res-time-box">
              <span className="res-label">TIME TO TARGET</span>
              <strong className="res-months">{goalCalc.estimatedMonths} <span className="months-unit">months</span></strong>
            </div>
          </div>

          <div className="finish-progress-block">
            <div className="progress-label-row">
              <span className="finish-label">Progress to Finish Line</span>
              <span className="finish-pct">{Math.round(goalCalc.progressPercentage)}%</span>
            </div>
            <div className="finish-track">
              <div
                className="finish-fill"
                style={{ width: `${Math.min(100, goalCalc.progressPercentage)}%` }}
              />
            </div>
          </div>

          <div className="star-callout-card">
            <Star size={18} className="star-icon" />
            <p className="callout-text">
              {goalCalc.isCompleted ? (
                <span>
                  Fantastic buzz! You have already achieved your <strong>{goalName || 'Goal'}</strong> target!
                </span>
              ) : monthlySavings <= 0 ? (
                <span>
                  Enter an expected monthly savings amount above to estimate your milestone completion time.
                </span>
              ) : (
                <span>
                  Great buzz! At <strong>{format(monthlySavings)}/mo</strong>, you will achieve your <strong>{goalName || 'Goal'}</strong> in approximately <strong>{goalCalc.estimatedMonths} {goalCalc.estimatedMonths === 1 ? 'month' : 'months'}</strong>
                  {goalCalc.estimatedMonths >= 12 ? ` (about ${(goalCalc.estimatedMonths / 12).toFixed(1)} years)` : ''}!
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="privacy-assurance-card">
        <ShieldCheck size={18} className="shield-icon" />
        <p className="privacy-text">
          <strong>Privacy Assurance:</strong> Educational demonstration only; no personal banking data is saved or sent to external servers. All values remain purely client-side within this session.
        </p>
      </div>
    </div>

    <div className="planner-col-right">
      <div className="expense-planner-card bee-card">
        <div className="planner-header">
          <div className="planner-title-left">
            <span className="green-indicator-dot"></span>
            <h2 className="planner-title">Session Expense Planner</h2>
          </div>
          <button type="button" className="add-expense-btn" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Expense</span>
          </button>
        </div>

        <div className="planner-stats-row">
          <div className="plan-stat-card">
            <div className="stat-head">
              <span className="stat-name">Total Planned</span>
              <FileText size={18} className="stat-icon-receipt text-gold" />
            </div>
            <strong className="stat-amount">{format(totalPlanned, true)}</strong>
            <span className="stat-helper">Current active log total</span>
          </div>

          <div className="plan-stat-card">
            <div className="stat-head">
              <span className="stat-name">Demo Allowance</span>
              <span className="on-track-pill">On Track</span>
            </div>
            <strong className="stat-amount stat-emerald">{format(remainingAllowance, true)}</strong>
            <span className="stat-helper">Base: {format(monthlyAllowance)} monthly budget</span>
          </div>
        </div>

        <div className="logged-expenses-head">
          <span className="logged-title">Logged Demo Expenses</span>
          <span className="logged-count-badge">{expenses.length} items</span>
        </div>

        <div className="expenses-list">
          {expenses.map((item) => {
            const Icon = ICON_MAP[item.category] || ShoppingBag;
            return (
              <div key={item.id} className="expense-row-item">
                <div className="expense-icon-frame">
                  <Icon size={16} />
                </div>
                <div className="expense-meta-text">
                  <strong className="expense-name">{item.name}</strong>
                  <span className="expense-sub">{item.category} &bull; {item.date}</span>
                </div>
                <div className="expense-right-actions">
                  <span className="expense-cost">-{format(Number(item.amount), true)}</span>
                  <button
                    type="button"
                    className="action-icon-btn"
                    onClick={() => handleOpenEdit(item)}
                    aria-label={`Edit ${item.name}`}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    className="action-icon-btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Demo Expense' : 'Add Demo Expense'}
      >
        <form onSubmit={handleSaveModal} className="expense-modal-form">
          <div className="field-group">
            <label className="field-label">Expense Description</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Calculus Study PDF & Print"
              className="bee-input"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bee-input"
            >
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div className="fields-2col">
            <div className="field-group">
              <label className="field-label">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bee-input"
                required
              />
            </div>
            <div className="field-group">
              <label className="field-label">Amount ({sym})</label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="28.00"
                className="bee-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="bee-btn bee-btn-gold" style={{ width: '100%', marginTop: '1rem' }}>
            {editingId ? 'Save Changes' : 'Record Demo Expense'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
