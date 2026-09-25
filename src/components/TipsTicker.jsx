import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import './TipsTicker.css';

const FINANCIAL_TICKER_TIPS = [
  {
    tag: 'Golden Rule',
    text: '“A budget is telling your money where to go instead of wondering where it went.” — John C. Maxwell'
  },
  {
    tag: 'Impulse Defense',
    text: 'The 24-Hour Cooling Rule: Waiting a single day cools 70% of impulse purchase urges.'
  },
  {
    tag: 'Warren Formula',
    text: '50/30/20 Blueprint: 50% for Needs, 30% for Lifestyle Wants, 20% locked for Savings.'
  },
  {
    tag: 'Campus Hack',
    text: 'Check university libraries and academic club depots for free textbooks and course software licenses.'
  },
  {
    tag: 'Latte Factor',
    text: 'A $5 daily incidental takeout equals $150/month. Brewing coffee in a thermos saves $1,800/year.'
  },
  {
    tag: 'Savings Velocity',
    text: 'Automate your 20% savings on the 1st of every month before discretionary weekend spending starts.'
  }
];

// Rotates quick finance tips every 5s; pauses on hover so users have time to read
export default function TipsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FINANCIAL_TICKER_TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FINANCIAL_TICKER_TIPS.length) % FINANCIAL_TICKER_TIPS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FINANCIAL_TICKER_TIPS.length);
  };

  const currentTip = FINANCIAL_TICKER_TIPS[currentIndex];

  return (
    <div
      className="tips-ticker-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Financial Quotes and Tips Ticker"
    >
      <div className="ticker-inner">
        <div className="ticker-badge-box">
          <span className="ticker-pulse-dot"></span>
          <Sparkles size={13} className="ticker-sparkle" />
          <span className="ticker-badge-label">BeeWise Tip</span>
        </div>

        <div className="ticker-content-area" key={currentIndex}>
          <span className="ticker-tag-chip">{currentTip.tag}</span>
          <p className="ticker-text">{currentTip.text}</p>
        </div>

        <div className="ticker-controls">
          <button
            type="button"
            className="ticker-ctrl-btn"
            onClick={handlePrev}
            aria-label="Previous Tip"
            title="Previous Tip"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            className="ticker-ctrl-btn"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
            title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <button
            type="button"
            className="ticker-ctrl-btn"
            onClick={handleNext}
            aria-label="Next Tip"
            title="Next Tip"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
