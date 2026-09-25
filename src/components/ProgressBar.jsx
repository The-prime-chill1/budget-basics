// Accessible visual progress bar with animated fill, threshold colors, and percentage label
import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({
  percentage = 0,
  label = '',
  amount = '',
  color = 'accent',
  height = '8px',
  showLabel = true
}) {
  const safePercentage = Math.min(100, Math.max(0, Number(percentage) || 0));

  return (
    <div className="progress-bar-wrapper">
      {showLabel && (label || amount) && (
        <div className="progress-labels">
          <span className="progress-title">{label}</span>
          <div className="progress-stats">
            {amount && <span className="progress-amount">{amount}</span>}
            <span className="progress-pct">{Math.round(safePercentage)}%</span>
          </div>
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className={`progress-fill progress-fill-${color}`}
          style={{ width: `${safePercentage}%` }}
          role="progressbar"
          aria-valuenow={safePercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={label || 'Progress'}
        />
      </div>
    </div>
  );
}
