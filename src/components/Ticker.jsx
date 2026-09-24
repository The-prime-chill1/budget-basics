import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { quickFinancialFacts } from '../data/tips';
import './Ticker.css';

export default function Ticker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quickFinancialFacts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentFact = quickFinancialFacts[currentIndex];

  return (
    <div className="ticker-bar" role="region" aria-label="Financial tip of the day">
      <div className="app-container ticker-container">
        <div className="ticker-label">
          <Sparkles size={14} className="ticker-icon" aria-hidden="true" />
          <span>Quick Byte</span>
        </div>
        <div className="ticker-content" key={currentIndex}>
          <p className="ticker-text">{currentFact.fact}</p>
        </div>
      </div>
    </div>
  );
}
