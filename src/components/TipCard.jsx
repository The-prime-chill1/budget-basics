import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, PiggyBank, Clock, ShieldCheck, CreditCard, Target, Users } from 'lucide-react';
import './TipCard.css';

const ICON_MAP = {
  PiggyBank,
  Clock,
  ShieldCheck,
  CreditCard,
  Target,
  Users
};

export default function TipCard({ tip }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = ICON_MAP[tip.icon] || Sparkles;

  return (
    <div className={`tip-card card interactive ${isExpanded ? 'is-expanded' : ''}`}>
      <div className="tip-card-top">
        <div className="tip-icon-box">
          <IconComponent size={20} className="tip-icon" />
        </div>
        <div className="tip-meta">
          <span className="tip-tag">{tip.tag}</span>
          <span className="tip-category">{tip.category}</span>
        </div>
      </div>

      <h3 className="tip-title">{tip.title}</h3>
      <p className="tip-summary">{tip.summary}</p>

      {isExpanded && (
        <div className="tip-details animate-fade-in">
          <p>{tip.details}</p>
        </div>
      )}

      <button
        type="button"
        className="tip-expand-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Show less' : 'Read actionable advice'}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );
}
