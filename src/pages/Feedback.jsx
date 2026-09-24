import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Modal from '../components/Modal';
import { validateEmail, validateRequiredText } from '../utils/validation';
import './Feedback.css';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    category: 'Overall Platform',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameVal = validateRequiredText(formData.name, 'Full Name', 2);
    if (!nameVal.isValid) newErrors.name = nameVal.error;

    const emailVal = validateEmail(formData.email);
    if (!emailVal.isValid) newErrors.email = emailVal.error;

    const commentsVal = validateRequiredText(formData.comments, 'Feedback comments', 5);
    if (!commentsVal.isValid) newErrors.comments = commentsVal.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Client-side confirmation (No backend transmission per SRS)
    setErrors({});
    setSubmittedData({ ...formData });
    setIsSuccessModalOpen(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      rating: 5,
      category: 'Overall Platform',
      comments: ''
    });
    setErrors({});
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="feedback-page page-wrapper animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <SectionHeading
          badge="Module 10 &bull; Quality & Evaluation"
          title="Student Feedback & Platform Review"
          subtitle="Share your thoughts on the BudgetBasics educational tools. Client-validated for academic project demonstration."
        />

        <div className="feedback-layout-grid">
          {/* Left Form Panel */}
          <div className="feedback-form-card card">
            <div className="form-card-header">
              <div className="form-icon-box">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="form-heading">Share Your Experience</h3>
                <p className="form-subtext">All fields are validated locally in your browser.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="form-group">
                <label htmlFor="fb-name" className="form-label">
                  Your Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="fb-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hamid, Tammy, or Lawal"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="fb-email" className="form-label">
                  Student Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="fb-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. student.reviewer@campus.edu"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Star Rating */}
              <div className="form-group">
                <label className="form-label">Platform Rating</label>
                <div className="star-rating-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${formData.rating >= star ? 'star-active' : ''}`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star size={24} fill={formData.rating >= star ? '#f59e0b' : 'none'} />
                    </button>
                  ))}
                  <span className="rating-label-text">
                    {formData.rating === 5 ? '5/5 — Outstanding!' : `${formData.rating}/5 Stars`}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="fb-category" className="form-label">
                  Feature Evaluated
                </label>
                <select
                  id="fb-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Overall Platform">Overall Platform & Design</option>
                  <option value="50-30-20 Calculator">50-30-20 Rule Calculator</option>
                  <option value="Savings Goals Tracker">Savings Goals & Milestones</option>
                  <option value="Expense Planner">Session Expense Planner</option>
                  <option value="Needs vs Wants Module">Needs vs Wants Quiz</option>
                  <option value="BudgetBee Chatbot">BudgetBee AI Assistant</option>
                  <option value="Infographics Gallery">Visual Infographics</option>
                </select>
              </div>

              {/* Comments */}
              <div className="form-group">
                <label htmlFor="fb-comments" className="form-label">
                  Your Feedback / Suggestions <span className="required-star">*</span>
                </label>
                <textarea
                  id="fb-comments"
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="What did you learn? How can we improve the student experience?"
                  className={`form-textarea ${errors.comments ? 'input-error' : ''}`}
                />
                {errors.comments && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.comments}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-actions-row">
                <button type="submit" className="btn btn-primary btn-lg">
                  <span>Submit Client Feedback</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Panel */}
          <div className="feedback-info-panel card">
            <span className="section-badge">Evaluation Protocol</span>
            <h3 className="info-panel-title">Privacy & Academic Transparency</h3>
            <p className="info-panel-p">
              This feedback form is strictly a frontend client-side validation demonstration built for Aptech TechWiz 7.
            </p>
            <div className="privacy-points">
              <div className="privacy-point">
                <ShieldCheck size={18} className="point-icon" />
                <span>Zero telemetry or tracking scripts are loaded.</span>
              </div>
              <div className="privacy-point">
                <ShieldCheck size={18} className="point-icon" />
                <span>No user data is stored on remote servers or databases.</span>
              </div>
              <div className="privacy-point">
                <ShieldCheck size={18} className="point-icon" />
                <span>Validation is executed entirely in real-time in the browser.</span>
              </div>
            </div>

            <div className="feedback-recent-reviews" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <span className="section-badge">Recent Student Reviews</span>
              <div style={{ display: 'grid', gap: '0.85rem', marginTop: '0.75rem' }}>
                <div style={{ background: 'var(--surface-low)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.25rem' }}>
                    <span>Hamid (Year 1)</span>
                    <span style={{ color: '#f59e0b' }}>★★★★★</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "The Needs vs Wants quiz makes budgeting fun instead of stressful. Love the immediate feedback!"
                  </p>
                </div>

                <div style={{ background: 'var(--surface-low)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.25rem' }}>
                    <span>Tammy (Year 2)</span>
                    <span style={{ color: '#f59e0b' }}>★★★★★</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "The 50/30/20 formula breakdown gave me clarity on how to allocate hostel groceries vs savings."
                  </p>
                </div>

                <div style={{ background: 'var(--surface-low)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.25rem' }}>
                    <span>Lawal (Year 3)</span>
                    <span style={{ color: '#f59e0b' }}>★★★★★</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "Expense logging is quick and lightweight. Doesn't feel like complicated spreadsheet software."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Success Modal */}
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={handleReset}
          title="Feedback Submitted (Demonstration)"
        >
          <div className="success-modal-body animate-fade-in">
            <div className="success-icon-frame">
              <CheckCircle2 size={40} className="success-check-icon" />
            </div>

            <h3 className="success-title">Thank You, {submittedData?.name}!</h3>
            <p className="success-desc">
              Your feedback for <strong>{submittedData?.category}</strong> has been successfully validated on the client side.
            </p>

            <div className="submitted-summary-box">
              <div className="summary-row">
                <span>Rating:</span>
                <strong>{submittedData?.rating} / 5 Stars</strong>
              </div>
              <div className="summary-row">
                <span>Comments:</span>
                <p className="summary-comment">"{submittedData?.comments}"</p>
              </div>
            </div>

            <div className="success-actions">
              <button type="button" className="btn btn-primary" onClick={handleReset}>
                Done / Submit Another
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
