// Foundational educational guide explaining income, fixed vs variable costs, and zero-based budgeting
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
  Coins,
  Sparkles
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProgressBar from '../components/ProgressBar';
import { studentMonthlyBudgetExample, budgetingKnowledgeQuiz } from '../data/budgetExamples';
import { useCurrency } from '../context/CurrencyContext';
import './BudgetingBasics.css';

export default function BudgetingBasics() {
  const { currency, format, convertFromNgn } = useCurrency();
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
        
        {/* Engaging Hero Section with High-Resolution Student Imagery */}
        <section className="budgeting-hero-card">
          <div className="budgeting-hero-content">
            <div className="budgeting-hero-badge-pill">
              <Sparkles size={14} className="text-gold" />
              <span>Financial Foundations 101 &bull; Student Blueprint</span>
            </div>
            
            <h1 className="budgeting-hero-heading">
              Master the Flow of Every Dollar on Campus
            </h1>
            
            <p className="budgeting-hero-lead">
              Learn how student money really moves: from monthly parental allowances and campus wages to fixed hostel rent, daily meals, lifestyle choices, and building an untouchable emergency cushion.
            </p>

            <div className="budgeting-hero-feature-tags">
              <span className="hero-feature-tag">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>4 Cash Flow Pillars</span>
              </span>
              <span className="hero-feature-tag">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>Realistic Allocation Model</span>
              </span>
              <span className="hero-feature-tag">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>Interactive Knowledge Quiz</span>
              </span>
            </div>

            <div className="budgeting-hero-actions-row">
              <a href="#concepts-pillars" className="btn btn-primary budgeting-cta-btn btn-attention-pulse">
                <span>Explore Budget Pillars</span>
                <ArrowRight size={15} />
              </a>
              <Link to="/50-30-20" className="btn btn-secondary budgeting-secondary-btn">
                <span>Try 50/30/20 Calculator</span>
              </Link>
            </div>
          </div>

          <div className="budgeting-hero-media-wrapper">
            <div className="budgeting-hero-image-frame">
              <img
                src="/student-budgeting-hero.jpg"
                alt="Student thoughtfully reviewing monthly budget on campus"
                className="budgeting-hero-photo"
              />
              <div className="budgeting-hero-photo-gradient"></div>
              <div className="budgeting-hero-floating-card">
                <div className="floating-badge-icon">
                  <ShieldCheck size={18} className="text-emerald" />
                </div>
                <div>
                  <strong className="floating-card-title">100% Student-Crafted</strong>
                  <span className="floating-card-sub">Zero jargon, pure real-world application</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="concepts-pillars">
          <SectionHeading
            badge="Financial Foundations"
            title="Budgeting Basics for Students"
            subtitle="Understand how money flows: from incoming allowance to fixed commitments, discretionary spending, and your essential savings cushion."
          />
        </div>

        <div className="concepts-grid">
          <div className="concept-card card interactive pillar-inflow">
            <div className="concept-icon-box bg-emerald">
              <Coins size={22} />
            </div>
            <div className="concept-badge-tag tag-income">Inflow</div>
            <h3 className="concept-title">1. Income & Allowance</h3>
            <p className="concept-desc">
              All incoming financial funds you receive. For students, this includes monthly parental allowances,
              academic stipends, bursaries, part-time campus tutoring, or freelance work.
            </p>
            <div className="concept-takeaway takeaway-income">
              <strong>Key Rule:</strong> Always calculate your budget based on confirmed net income, not speculative future earnings.
            </div>
          </div>

          <div className="concept-card card interactive pillar-fixed">
            <div className="concept-icon-box bg-blue">
              <TrendingDown size={22} />
            </div>
            <div className="concept-badge-tag tag-fixed">Predictable Outflow</div>
            <h3 className="concept-title">2. Fixed Expenses</h3>
            <p className="concept-desc">
              Unavoidable recurring costs with consistent amounts and firm deadlines.
              Examples include hostel/accommodation rent, semester transit passes, and essential prescription medications.
            </p>
            <div className="concept-takeaway takeaway-fixed">
              <strong>Key Rule:</strong> Reserve fixed costs on Day 1 before allocating money for any other purpose.
            </div>
          </div>

          <div className="concept-card card interactive pillar-variable">
            <div className="concept-icon-box bg-amber">
              <RefreshCw size={22} />
            </div>
            <div className="concept-badge-tag tag-variable">Fluctuating Outflow</div>
            <h3 className="concept-title">3. Variable Expenses</h3>
            <p className="concept-desc">
              Day-to-day costs that fluctuate based on student behavior and academic demands,
              such as research mobile data bundles, stationery, project printing, and canteen meals.
            </p>
            <div className="concept-takeaway takeaway-variable">
              <strong>Key Rule:</strong> Set weekly spending limits to avoid running out of cash mid-semester.
            </div>
          </div>

          <div className="concept-card card interactive pillar-savings">
            <div className="concept-icon-box bg-rose">
              <ShieldCheck size={22} />
            </div>
            <div className="concept-badge-tag tag-savings">Financial Security</div>
            <h3 className="concept-title">4. Savings/Buffer</h3>
            <p className="concept-desc">
              Money intentionally set aside for future objectives or unexpected emergencies (laptop repairs, urgent travel, medical copays).
            </p>
            <div className="concept-takeaway takeaway-savings">
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
                A realistic demonstration of how a student managing <strong>{format(convertFromNgn(studentMonthlyBudgetExample.monthlyIncome))}</strong> total monthly income balances obligations, personal life, and savings.
              </p>
            </div>
          </div>

          <div className="income-sources-row">
            {studentMonthlyBudgetExample.incomeSources.map((source, idx) => (
              <div key={idx} className="income-source-card card">
                <span className="source-type">{source.type}</span>
                <span className="source-name">{source.name}</span>
                <strong className="source-amount">{format(convertFromNgn(source.amount))}</strong>
              </div>
            ))}
            <div className="income-source-card card total-income-card">
              <span className="source-type">Total Monthly Inflow</span>
              <span className="source-name">Combined Budget Base</span>
              <strong className="source-amount total-highlight">{format(convertFromNgn(studentMonthlyBudgetExample.monthlyIncome))}</strong>
            </div>
          </div>

          <div className="table-swipe-hint-bar" aria-hidden="true">
            <span>&larr; Swipe horizontally to view all budget columns &rarr;</span>
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
                      <strong className="cat-table-amount">{format(convertFromNgn(cat.amount))}</strong>
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

        {/* The 50/30/20 Rule Anatomy Section */}
        <section className="section-spacing anatomy-box-section">
          <div className="anatomy-card card">
            <div className="anatomy-tags-bar">
              <span className="anatomy-tag tag-category">BUDGETING</span>
              <span className="anatomy-tag tag-sub">Core Framework</span>
              <span className="anatomy-tag tag-meta">3 min read</span>
              <span className="anatomy-tag tag-pill">Diagram/Grid</span>
            </div>

            <div className="anatomy-grid">
              {/* Left Column: Visual Ratio Breakdown & Core Pillars */}
              <div className="anatomy-left-col">
                <div className="anatomy-headline-group">
                  <h3 className="anatomy-title">The 50/30/20 Rule Anatomy</h3>
                  <p className="anatomy-lead">
                    A proven guideline for balanced financial distribution that ensures you cover obligations while enjoying life responsibly and building savings.
                  </p>
                </div>

                <div className="anatomy-ratio-bar">
                  <div className="ratio-seg seg-needs" style={{ width: '50%' }}>50% Needs</div>
                  <div className="ratio-seg seg-wants" style={{ width: '30%' }}>30% Wants</div>
                  <div className="ratio-seg seg-savings" style={{ width: '20%' }}>20% Savings</div>
                </div>

                <div className="anatomy-cards-stack">
                  <div className="anatomy-pillar-item pillar-needs">
                    <div className="pillar-header">
                      <span className="pillar-pct">50%</span>
                      <strong>Needs &amp; Survival</strong>
                    </div>
                    <p className="pillar-p">
                      Rent, groceries, semester transit, core academic course materials, utilities, and emergency medication.
                    </p>
                  </div>

                  <div className="anatomy-pillar-item pillar-wants">
                    <div className="pillar-header">
                      <span className="pillar-pct">30%</span>
                      <strong>Wants &amp; Lifestyle</strong>
                    </div>
                    <p className="pillar-p">
                      Campus dining out, streaming services, social outings with coursemates, gaming, and non-essential fashion.
                    </p>
                  </div>

                  <div className="anatomy-pillar-item pillar-savings">
                    <div className="pillar-header">
                      <span className="pillar-pct">20%</span>
                      <strong>Savings &amp; Safety Cushion</strong>
                    </div>
                    <p className="pillar-p">
                      Emergency cash reserve, tech gadget replacement fund, and a post-graduation starting buffer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Educational Takeaways Box */}
              <div className="anatomy-right-col">
                <div className="takeaways-box">
                  <div className="takeaways-header">
                    <Sparkles size={18} className="text-gold" />
                    <h4>Key Educational Takeaways</h4>
                  </div>

                  <ul className="takeaways-list">
                    <li>
                      <CheckCircle2 size={16} className="takeaway-check text-emerald" />
                      <div>
                        <strong>50% Needs:</strong> Housing, food staples, transit, medicine, academic textbooks, and course materials.
                      </div>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="takeaway-check text-emerald" />
                      <div>
                        <strong>30% Wants:</strong> Dining out with peers, gaming, campus social events, video streaming subscriptions.
                      </div>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="takeaway-check text-emerald" />
                      <div>
                        <strong>20% Savings:</strong> Emergency fund, gadget replacement, and life-after-graduation cushion.
                      </div>
                    </li>
                  </ul>

                  <div className="takeaways-footer-action">
                    <Link to="/50-30-20" className="btn btn-primary btn-block btn-attention-pulse">
                      <span>Open 50/30/20 Calculator</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
