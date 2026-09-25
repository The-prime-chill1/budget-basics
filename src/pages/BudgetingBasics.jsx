import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  DollarSign,
  TrendingDown,
  TrendingUp,
  PieChart,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Wallet,
  Coins
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProgressBar from '../components/ProgressBar';
import { studentMonthlyBudgetExample, budgetingKnowledgeQuiz } from '../data/budgetExamples';
import { formatCurrency } from '../utils/formatters';
import './BudgetingBasics.css';

export default function BudgetingBasics() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleSelectOption = (questionId, optionIndex) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  };

  const calculateScore = () => {
    let score = 0;
    budgetingKnowledgeQuiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="budgeting-basics-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          badge="Financial Foundations"
          title="Budgeting Basics for Students"
          subtitle="Understand how money flows: from incoming allowance to fixed commitments, discretionary spending, and your essential savings cushion."
        />

        <div className="concepts-grid">
          <div className="concept-card card interactive">
            <div className="concept-icon-box bg-emerald">
              <Coins size={22} />
            </div>
            <div className="concept-badge-tag tag-income">Inflow</div>
            <h3 className="concept-title">1. Income & Allowance</h3>
            <p className="concept-desc">
              All incoming financial funds you receive. For students, this includes monthly parental allowances,
              academic stipends, bursaries, part-time campus tutoring, or freelance work.
            </p>
            <div className="concept-takeaway">
              <strong>Key Rule:</strong> Always calculate your budget based on confirmed net income, not speculative future earnings.
            </div>
          </div>

          <div className="concept-card card interactive">
            <div className="concept-icon-box bg-blue">
              <TrendingDown size={22} />
            </div>
            <div className="concept-badge-tag tag-fixed">Predictable Outflow</div>
            <h3 className="concept-title">2. Fixed Expenses</h3>
            <p className="concept-desc">
              Unavoidable recurring costs with consistent amounts and firm deadlines.
              Examples include hostel accommodation rent, semester transit passes, and essential prescription medications.
            </p>
            <div className="concept-takeaway">
              <strong>Key Rule:</strong> Reserve fixed costs on Day 1 before allocating money for any other purpose.
            </div>
          </div>

          <div className="concept-card card interactive">
            <div className="concept-icon-box bg-amber">
              <RefreshCw size={22} />
            </div>
            <div className="concept-badge-tag tag-variable">Fluctuating Outflow</div>
            <h3 className="concept-title">3. Variable Expenses</h3>
            <p className="concept-desc">
              Day-to-day costs that fluctuate based on student behavior and academic demands,
              such as research mobile data bundles, stationery, project printing, and canteen meals.
            </p>
            <div className="concept-takeaway">
              <strong>Key Rule:</strong> Set weekly spending limits to avoid running out of cash mid-semester.
            </div>
          </div>

          <div className="concept-card card interactive">
            <div className="concept-icon-box bg-rose">
              <ShieldCheck size={22} />
            </div>
            <div className="concept-badge-tag tag-savings">Financial Security</div>
            <h3 className="concept-title">4. Savings Buffer</h3>
            <p className="concept-desc">
              Money intentionally set aside for future objectives or unexpected emergencies (laptop repairs, urgent travel, medical copays).
            </p>
            <div className="concept-takeaway">
              <strong>Key Rule:</strong> "Pay Yourself First"—transfer savings before spending on discretionary wants.
            </div>
          </div>
        </div>

        <section className="section-spacing student-budget-model-section">
          <div className="model-header-row">
            <div>
              <span className="section-badge">Practical Case Study</span>
              <h2 className="section-title">Sample Student Monthly Budget</h2>
              <p className="section-subtitle">
                A realistic demonstration of how a student managing <strong>{formatCurrency(studentMonthlyBudgetExample.monthlyIncome)}</strong> total monthly income balances obligations, personal life, and savings.
              </p>
            </div>
          </div>

          <div className="income-sources-row">
            {studentMonthlyBudgetExample.incomeSources.map((source, idx) => (
              <div key={idx} className="income-source-card card">
                <span className="source-type">{source.type}</span>
                <span className="source-name">{source.name}</span>
                <strong className="source-amount">{formatCurrency(source.amount)}</strong>
              </div>
            ))}
            <div className="income-source-card card total-income-card">
              <span className="source-type">Total Monthly Inflow</span>
              <span className="source-name">Combined Budget Base</span>
              <strong className="source-amount total-highlight">{formatCurrency(studentMonthlyBudgetExample.monthlyIncome)}</strong>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" aria-label="Sample Student Budget Allocation Table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Classification</th>
                  <th>Monthly Allocation</th>
                  <th>Proportion</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {studentMonthlyBudgetExample.categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <strong className="cat-table-name">{cat.name}</strong>
                    </td>
                    <td>
                      <span className={`badge badge-${cat.type.toLowerCase().includes('need') ? 'need' : cat.type.toLowerCase().includes('want') ? 'want' : 'savings'}`}>
                        {cat.type}
                      </span>
                    </td>
                    <td>
                      <strong className="cat-table-amount">{formatCurrency(cat.amount)}</strong>
                    </td>
                    <td>
                      <div className="table-pct-cell">
                        <span>{cat.percentage}%</span>
                        <div className="mini-progress-track">
                          <div
                            className="mini-progress-fill"
                            style={{ width: `${cat.percentage * 2}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="cat-table-desc">{cat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-spacing quiz-section">
          <div className="card quiz-card">
            <div className="quiz-header">
              <div className="quiz-icon-box">
                <HelpCircle size={24} className="quiz-icon" />
              </div>
              <div>
                <span className="section-badge">Interactive Knowledge Check</span>
                <h3 className="quiz-title">Test Your Budgeting Knowledge</h3>
                <p className="quiz-subtitle">
                  Answer these 4 fundamental questions to evaluate your understanding of student personal finance principles.
                </p>
              </div>
            </div>

            <div className="quiz-questions-list">
              {budgetingKnowledgeQuiz.map((q, qIndex) => {
                const isSelected = selectedAnswers[q.id] !== undefined;
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="quiz-question-item">
                    <h4 className="question-text">
                      <span className="q-number">Q{qIndex + 1}.</span> {q.question}
                    </h4>

                    <div className="options-grid">
                      {q.options.map((opt, optIndex) => {
                        let btnClass = 'quiz-option-btn';
                        if (userChoice === optIndex) btnClass += ' selected';
                        if (submittedQuiz) {
                          if (optIndex === q.correctIndex) btnClass += ' correct';
                          else if (userChoice === optIndex && !isCorrect) btnClass += ' incorrect';
                        }

                        return (
                          <button
                            key={optIndex}
                            type="button"
                            className={btnClass}
                            onClick={() => handleSelectOption(q.id, optIndex)}
                            disabled={submittedQuiz}
                          >
                            <span className="opt-letter">{String.fromCharCode(65 + optIndex)}</span>
                            <span className="opt-text">{opt}</span>
                            {submittedQuiz && optIndex === q.correctIndex && (
                              <CheckCircle2 size={16} className="opt-status-icon correct" />
                            )}
                            {submittedQuiz && userChoice === optIndex && !isCorrect && (
                              <XCircle size={16} className="opt-status-icon incorrect" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className={`explanation-box ${isCorrect ? 'is-correct' : 'is-incorrect'} animate-fade-in`}>
                        <div className="explanation-status-head">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={16} className="text-emerald" />
                              <strong>Well done!</strong>
                            </>
                          ) : (
                            <>
                              <XCircle size={16} className="text-rose" />
                              <strong>Not quite right:</strong>
                            </>
                          )}
                        </div>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="quiz-actions-bar">
              {!submittedQuiz ? (
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => setSubmittedQuiz(true)}
                  disabled={Object.keys(selectedAnswers).length < budgetingKnowledgeQuiz.length}
                >
                  Submit Answers & View Score ({Object.keys(selectedAnswers).length}/{budgetingKnowledgeQuiz.length} answered)
                </button>
              ) : (
                <div className="quiz-results-summary">
                  <div className="score-badge">
                    Your Score: <strong>{calculateScore()} / {budgetingKnowledgeQuiz.length}</strong> ({Math.round((calculateScore() / budgetingKnowledgeQuiz.length) * 100)}%)
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={handleResetQuiz}>
                    <RefreshCw size={16} />
                    <span>Retake Quiz</span>
                  </button>
                  <Link to="/needs-vs-wants" className="btn btn-accent">
                    <span>Next: Needs vs. Wants Guide</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
