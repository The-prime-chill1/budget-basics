import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  DollarSign,
  Filter,
  RefreshCw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { calculateExpenseSummary } from '../utils/budgetCalculations';
import { validateAmount, validateRequiredText } from '../utils/validation';
import { formatCurrency, formatDate } from '../utils/formatters';
import './ExpensePlanner.css';

const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Education',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Miscellaneous'
];

const INITIAL_SAMPLE_EXPENSES = [
  {
    id: 'exp-1',
    date: '2026-09-21',
    category: 'Food',
    description: 'Hostel Groceries (Rice, Beans & Cooking Oil)',
    amount: 14500
  },
  {
    id: 'exp-2',
    date: '2026-09-22',
    category: 'Transport',
    description: 'Weekly Campus Shuttle Passes',
    amount: 4000
  },
  {
    id: 'exp-3',
    date: '2026-09-23',
    category: 'Education',
    description: 'Semester Course Materials & Color Printing',
    amount: 3200
  }
];

export default function ExpensePlanner() {
  // Budget Base
  const [budgetBase, setBudgetBase] = useState(50000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState('50000');

  // Expenses State (Session Demonstration)
  const [expenses, setExpenses] = useState(INITIAL_SAMPLE_EXPENSES);
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
    description: '',
    amount: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Calculations
  const summary = calculateExpenseSummary(budgetBase, expenses);

  // Filtered List
  const filteredExpenses = categoryFilter === 'All'
    ? expenses
    : expenses.filter((e) => e.category === categoryFilter);

  // Open modal for new item
  const handleOpenAddModal = () => {
    setEditingExpenseId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
      description: '',
      amount: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing existing item
  const handleOpenEditModal = (expense) => {
    setEditingExpenseId(expense.id);
    setFormData({
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString()
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Save Expense (Add or Edit)
  const handleSaveExpense = (e) => {
    e.preventDefault();
    const errors = {};

    const descValid = validateRequiredText(formData.description, 'Description', 2);
    if (!descValid.isValid) errors.description = descValid.error;

    const amtValid = validateAmount(formData.amount, { allowZero: false, min: 50, max: 10000000 });
    if (!amtValid.isValid) errors.amount = amtValid.error;

    if (!formData.date) errors.date = 'Please select a date.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingExpenseId) {
      // Update existing
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingExpenseId
            ? {
                ...item,
                date: formData.date,
                category: formData.category,
                description: formData.description.trim(),
                amount: amtValid.value
              }
            : item
        )
      );
    } else {
      // Add new
      const newEntry = {
        id: `exp-${Date.now()}`,
        date: formData.date,
        category: formData.category,
        description: formData.description.trim(),
        amount: amtValid.value
      };
      setExpenses((prev) => [newEntry, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Delete Expense
  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to default demonstration state
  const handleResetPlanner = () => {
    setExpenses(INITIAL_SAMPLE_EXPENSES);
    setBudgetBase(50000);
    setCategoryFilter('All');
  };

  // Update budget base
  const handleSaveBudgetBase = () => {
    const valid = validateAmount(tempBudgetInput, { allowZero: false, min: 1000, max: 50000000 });
    if (valid.isValid) {
      setBudgetBase(valid.value);
      setIsEditingBudget(false);
    }
  };

  return (
    <div className="expense-planner-page page-wrapper animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <SectionHeading
          badge="Module 05 &bull; Temporary Session Tracker"
          title="Student Expense Planner (Demonstration)"
          subtitle="Record, categorize, and track daily campus outlays to prevent overspending. Operates completely in-browser without storing personal data."
        />

        {/* 1. FINANCIAL SUMMARY METRIC CARDS */}
        <div className="planner-metrics-grid">
          {/* Allowance Base */}
          <div className="planner-metric-card card">
            <div className="metric-head">
              <span className="metric-label">Monthly Allowance Base</span>
              <button
                type="button"
                className="btn-edit-budget"
                onClick={() => {
                  setTempBudgetInput(budgetBase.toString());
                  setIsEditingBudget(!isEditingBudget);
                }}
              >
                {isEditingBudget ? 'Cancel' : 'Edit Base'}
              </button>
            </div>

            {isEditingBudget ? (
              <div className="edit-budget-form">
                <input
                  type="number"
                  value={tempBudgetInput}
                  onChange={(e) => setTempBudgetInput(e.target.value)}
                  className="form-input form-input-sm"
                  min="1000"
                />
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveBudgetBase}>
                  Save
                </button>
              </div>
            ) : (
              <strong className="metric-amount-display">{formatCurrency(budgetBase)}</strong>
            )}
            <span className="metric-helper-text">Starting allowance for this demo session</span>
          </div>

          {/* Total Spent */}
          <div className="planner-metric-card card">
            <div className="metric-head">
              <span className="metric-label">Total Planned Outlays</span>
              <span className="badge badge-want">{summary.spentPercentage}% of budget</span>
            </div>
            <strong className="metric-amount-display text-spent">{formatCurrency(summary.totalExpenses)}</strong>
            <span className="metric-helper-text">{expenses.length} logged student transactions</span>
          </div>

          {/* Remaining Balance */}
          <div className={`planner-metric-card card ${summary.isOverBudget ? 'card-overbudget' : ''}`}>
            <div className="metric-head">
              <span className="metric-label">Remaining Safe Balance</span>
              <span className={`badge ${summary.isOverBudget ? 'badge-danger' : 'badge-savings'}`}>
                {summary.isOverBudget ? 'Overspent' : 'Safe Cushion'}
              </span>
            </div>
            <strong className={`metric-amount-display ${summary.isOverBudget ? 'text-danger' : 'text-safe'}`}>
              {formatCurrency(summary.remainingBalance)}
            </strong>
            <span className="metric-helper-text">Available before next allowance date</span>
          </div>
        </div>

        {/* Overbudget Warning Alert */}
        {summary.isOverBudget && (
          <div className="alert alert-warning animate-fade-in" role="alert">
            <AlertTriangle size={20} className="alert-icon" />
            <div>
              <strong>Budget Warning:</strong> You have exceeded your sample starting allowance by{' '}
              <strong>{formatCurrency(Math.abs(summary.remainingBalance))}</strong>. Consider trimming discretionary categories like Entertainment or Shopping.
            </div>
          </div>
        )}

        {/* 2. TABLE CONTROLS & FILTER BAR */}
        <div className="table-controls-bar">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <span className="filter-label">Filter Category:</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${categoryFilter === 'All' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('All')}
              >
                All ({expenses.length})
              </button>
              {EXPENSE_CATEGORIES.map((cat) => {
                const count = expenses.filter((e) => e.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="controls-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleResetPlanner} title="Reset to default sample entries">
              <RefreshCw size={14} />
              <span>Reset Data</span>
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
              <Plus size={16} />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* 3. EXPENSES TABLE OR EMPTY STATE */}
        {filteredExpenses.length === 0 ? (
          <EmptyState
            icon={FileSpreadsheet}
            title="No expenses in this category"
            description="You have not recorded any transactions under this filter yet. Click 'Add Expense' to create one."
            action={
              <button type="button" className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
                <Plus size={16} />
                <span>Add First Expense</span>
              </button>
            }
          />
        ) : (
          <div className="table-responsive">
            <table className="custom-table" aria-label="Student Expenses Table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount (₦)</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <span className="table-date">{formatDate(expense.date)}</span>
                    </td>
                    <td>
                      <span className="badge badge-want">{expense.category}</span>
                    </td>
                    <td>
                      <strong className="table-desc-text">{expense.description}</strong>
                    </td>
                    <td>
                      <strong className="table-amount-cell">{formatCurrency(expense.amount)}</strong>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-row-actions">
                        <button
                          type="button"
                          className="action-btn action-edit"
                          onClick={() => handleOpenEditModal(expense)}
                          aria-label={`Edit ${expense.description}`}
                          title="Edit transaction"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-btn action-delete"
                          onClick={() => handleDeleteExpense(expense.id)}
                          aria-label={`Delete ${expense.description}`}
                          title="Delete transaction"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal: Add or Edit Expense */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingExpenseId ? 'Edit Student Expense' : 'Add New Student Expense'}
        >
          <form onSubmit={handleSaveExpense} className="expense-modal-form">
            {/* Date */}
            <div className="form-group">
              <label htmlFor="expense-date" className="form-label">Date</label>
              <input
                id="expense-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`form-input ${formErrors.date ? 'input-error' : ''}`}
                required
              />
              {formErrors.date && <div className="form-error-msg">{formErrors.date}</div>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="expense-category" className="form-label">Category</label>
              <select
                id="expense-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="expense-desc" className="form-label">Description</label>
              <input
                id="expense-desc"
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Textbook printing, hostel groceries"
                className={`form-input ${formErrors.description ? 'input-error' : ''}`}
              />
              {formErrors.description && <div className="form-error-msg">{formErrors.description}</div>}
            </div>

            {/* Amount */}
            <div className="form-group">
              <label htmlFor="expense-amount" className="form-label">Amount (₦)</label>
              <div className="input-with-symbol">
                <span className="currency-prefix">₦</span>
                <input
                  id="expense-amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 3500"
                  className={`form-input ${formErrors.amount ? 'input-error' : ''}`}
                  min="50"
                  step="50"
                />
              </div>
              {formErrors.amount && <div className="form-error-msg">{formErrors.amount}</div>}
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingExpenseId ? 'Save Changes' : 'Record Expense'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
