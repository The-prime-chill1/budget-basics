// Unified planning workspace combining the savings goals forecaster and session expense logger
import React, { useState } from 'react';
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
  const [goalName, setGoalName] = useState('Emergency Laptop Fund');
  const [targetAmount, setTargetAmount] = useState('1200');
  const [currentSaved, setCurrentSaved] = useState('300');
  const [monthlySavings, setMonthlySavings] = useState(150);

  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [monthlyAllowance, setMonthlyAllowance] = useState(500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    amount: ''
  });

  const targetNum = Number(targetAmount) || 0;
  const savedNum = Number(currentSaved) || 0;
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
              <label className="field-label">Target Amount ($)</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="1200"
                className="bee-input"
              />
            </div>
            <div className="field-group">
              <label className="field-label">Current Saved ($)</label>
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
              <label className="field-label">Expected Monthly Savings ($)</label>
              <span className="monthly-rate-pill">${monthlySavings}/mo</span>
            </div>
            <div className="slider-input-combo">
              <input
                type="range"
                min="25"
                max="500"
                step="25"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="monthly-slider"
              />
              <div className="slider-val-box">{monthlySavings}</div>
            </div>
          </div>
        </div>

        <div className="goal-result-box">
          <div className="goal-metrics-row">
            <div>
              <span className="res-label">REMAINING TO SAVE</span>
              <strong className="res-amount">${goalCalc.remainingAmount.toFixed(2)}</strong>
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
              Great buzz! At <strong>${monthlySavings}/mo</strong>, you will achieve your <strong>{goalName || 'Goal'}</strong> in approximately <strong>{goalCalc.estimatedMonths} months</strong>!
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
            <strong className="stat-amount">${totalPlanned.toFixed(2)}</strong>
            <span className="stat-helper">Current active log total</span>
          </div>

          <div className="plan-stat-card">
            <div className="stat-head">
              <span className="stat-name">Demo Allowance</span>
              <span className="on-track-pill">On Track</span>
            </div>
            <strong className="stat-amount stat-emerald">${remainingAllowance.toFixed(2)}</strong>
            <span className="stat-helper">Base: ${monthlyAllowance} monthly budget</span>
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
                  <span className="expense-cost">-${Number(item.amount).toFixed(2)}</span>
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
              <label className="field-label">Amount ($)</label>
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
