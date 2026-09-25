// Campus support directory with financial aid contacts, counseling hotlines, and inquiry form
import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Globe
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Modal from '../components/Modal';
import { validateEmail, validateRequiredText } from '../utils/validation';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameVal = validateRequiredText(formData.name, 'Full Name', 2);
    if (!nameVal.isValid) newErrors.name = nameVal.error;

    const emailVal = validateEmail(formData.email);
    if (!emailVal.isValid) newErrors.email = emailVal.error;

    const subjectVal = validateRequiredText(formData.subject, 'Subject', 3);
    if (!subjectVal.isValid) newErrors.subject = subjectVal.error;

    const msgVal = validateRequiredText(formData.message, 'Message', 5);
    if (!msgVal.isValid) newErrors.message = msgVal.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccessModalOpen(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="contact-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          badge="Campus Support Directory"
          title="Contact BudgetBasics"
          subtitle="Get in touch with the student development team behind the NextGen BudgetBee educational initiative."
        />

        <div className="contact-layout-grid">
          <div className="contact-info-col">
            <div className="contact-info-card card">
              <span className="section-badge">Academic Support</span>
              <h3 className="info-title">Student Support & Inquiries</h3>
              <p className="info-desc">
                Have questions about the budgeting algorithms, curriculum materials, or Aptech TechWiz demonstration? Reach out through our channels.
              </p>

              <div className="contact-channels-list">
                <div className="channel-item">
                  <div className="channel-icon-box bg-blue">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="channel-label">Email Support</span>
                    <strong className="channel-val">support@budgetbasics.edu.ng</strong>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-box bg-emerald">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="channel-label">Campus Demonstration Helpline</span>
                    <strong className="channel-val">+234 (0) 800-BUDGET-BEE</strong>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-box bg-amber">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="channel-label">Academic Center</span>
                    <strong className="channel-val">Aptech Computer Education Center</strong>
                  </div>
                </div>
              </div>

              <div className="demo-notice-box">
                <ShieldCheck size={16} />
                <span>
                  <strong>Notice:</strong> Contact form is a demonstration client interface for project evaluation purposes.
                </span>
              </div>
            </div>
          </div>

          <div className="contact-form-card card">
            <h3 className="form-title">Send a Demonstration Message</h3>
            <p className="form-sub">Tested and validated locally using client-side React state.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Samuel Ade"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. samuel@example.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Inquiring about 50-30-20 formula"
                  className={`form-input ${errors.subject ? 'input-error' : ''}`}
                />
                {errors.subject && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.subject}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-msg" className="form-label">Your Message</label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                />
                {errors.message && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={handleReset}
          title="Message Sent (Demo)"
        >
          <div className="contact-success-modal animate-fade-in">
            <div className="success-icon-frame">
              <CheckCircle2 size={40} className="success-check-icon" />
            </div>
            <h3>Thank You, {formData.name}!</h3>
            <p>
              Your demonstration inquiry regarding <strong>"{formData.subject}"</strong> has been successfully validated.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleReset}>
              Close Confirmation
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
