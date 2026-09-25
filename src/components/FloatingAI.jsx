// Floating AI assistant bubble rendered at the bottom-right of every page (WhatsApp style)
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';
import './FloatingAI.css';

export default function FloatingAI() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't render on the chatbot page itself
  if (location.pathname === '/chatbot') return null;

  const isLanding =
    location.pathname === '/' ||
    location.pathname === '/landing' ||
    location.pathname === '/welcome';

  const handleClick = () => {
    navigate('/chatbot');
  };

  const handleDismissTooltip = (e) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className={`floating-ai-bubble ${isLanding ? 'is-landing' : 'has-bottom-nav'}`}>
      {showTooltip && (
        <div className="ai-bubble-tooltip animate-fade-in" onClick={handleDismissTooltip}>
          <span>Ask BeeWise AI anything</span>
          <button
            type="button"
            className="tooltip-close-x"
            onClick={handleDismissTooltip}
            aria-label="Dismiss tooltip"
          >
            &times;
          </button>
        </div>
      )}
      <button
        type="button"
        className="ai-bubble-btn"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Open BeeWise AI Assistant"
        title="BeeWise AI Assistant"
      >
        <Bot size={24} className="ai-bubble-icon" />
        <span className="ai-bubble-pulse" />
      </button>
    </div>
  );
}
