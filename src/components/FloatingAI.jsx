// Floating AI assistant bubble rendered at the bottom-right of every page
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import './FloatingAI.css';

export default function FloatingAI() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(true);

  // Don't render on the chatbot page itself
  if (location.pathname === '/chatbot') return null;

  const handleClick = () => {
    navigate('/chatbot');
  };

  const handleDismissTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <div className="floating-ai-bubble">
      {showTooltip && (
        <div className="ai-bubble-tooltip" onClick={handleDismissTooltip}>
          Ask BeeWise anything about budgeting
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
        <Bot size={24} />
        <span className="ai-bubble-pulse" />
      </button>
    </div>
  );
}
