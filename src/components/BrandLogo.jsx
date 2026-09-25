// BudgetBasics brand emblem and logo typography with light/dark theme support
import React from 'react';
import './BrandLogo.css';

export default function BrandLogo({
  variant = 'full',
  showTagline = true,
  height = 36,
  className = '',
  idPrefix = 'bbLogo'
}) {
  const primaryGradId = `${idPrefix}_teal`;
  const accentGradId = `${idPrefix}_amber`;
  const glowFilterId = `${idPrefix}_glow`;

  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 110 110"
        height={height}
        width={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`brand-logo-svg brand-logo-mark ${className}`}
        aria-label="BudgetBasics Logo Mark"
        role="img"
      >
        <defs>
          <linearGradient id={primaryGradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F766E" />
            <stop offset="60%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>

          <linearGradient id={accentGradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>

          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" floodColor="#0F766E" floodOpacity="0.25" />
          </filter>
        </defs>

        <g transform="translate(4, 8)" filter={`url(#${glowFilterId})`}>
          <path d="M 22 24 L 38 14 L 38 86 L 22 76 Z" fill={`url(#${primaryGradId})`} />

          <path
            d="M 44 18 L 74 18 C 86 18, 94 26, 94 38 C 94 48, 86 54, 74 54 L 44 54 Z"
            fill="none"
            stroke={`url(#${primaryGradId})`}
            strokeWidth="12"
            strokeLinejoin="round"
          />

          <path
            d="M 44 48 L 78 48 C 91 48, 100 56, 100 68 C 100 80, 91 88, 78 88 L 44 88 Z"
            fill="none"
            stroke={`url(#${primaryGradId})`}
            strokeWidth="12"
            strokeLinejoin="round"
          />

          <path
            d="M 12 70 L 52 30 L 68 46 L 98 12"
            fill="none"
            stroke={`url(#${accentGradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 78 12 L 98 12 L 98 32"
            fill="none"
            stroke={`url(#${accentGradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="68" cy="46" r="4.5" fill="#FBBF24" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox={showTagline ? '0 0 540 120' : '0 0 540 100'}
      height={height}
      style={{ width: 'auto', maxHeight: '100%' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`brand-logo-svg brand-logo-full ${className}`}
      aria-label="BudgetBasics — Financial Literacy for NextGen Learners"
      role="img"
    >
      <defs>
        <linearGradient id={primaryGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="60%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>

        <linearGradient id={accentGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" floodColor="#0F766E" floodOpacity="0.25" />
        </filter>
      </defs>

      <g transform="translate(16, 10)" filter={`url(#${glowFilterId})`}>
        <path d="M 22 24 L 38 14 L 38 86 L 22 76 Z" fill={`url(#${primaryGradId})`} />

        <path
          d="M 44 18 L 74 18 C 86 18, 94 26, 94 38 C 94 48, 86 54, 74 54 L 44 54 Z"
          fill="none"
          stroke={`url(#${primaryGradId})`}
          strokeWidth="12"
          strokeLinejoin="round"
        />

        <path
          d="M 44 48 L 78 48 C 91 48, 100 56, 100 68 C 100 80, 91 88, 78 88 L 44 88 Z"
          fill="none"
          stroke={`url(#${primaryGradId})`}
          strokeWidth="12"
          strokeLinejoin="round"
        />

        <path
          d="M 12 70 L 52 30 L 68 46 L 98 12"
          fill="none"
          stroke={`url(#${accentGradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 78 12 L 98 12 L 98 32"
          fill="none"
          stroke={`url(#${accentGradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="68" cy="46" r="4.5" fill="#FBBF24" />
      </g>

      <g transform="translate(142, 72)">
        <text
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', 'Inter', sans-serif"
          fontSize="44"
          className="brand-logo-text"
        >
          <tspan className="brand-text-budget" fontWeight="800">
            Budget
          </tspan>
          <tspan className="brand-text-basics" fontWeight="700">
            Basics
          </tspan>
        </text>
      </g>

      {showTagline && (
        <g transform="translate(145, 93)">
          <text
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', 'Inter', sans-serif"
            fontSize="11.5"
            fontWeight="600"
            className="brand-tagline-text"
            letterSpacing="0.05em"
          >
            FINANCIAL LITERACY FOR NEXTGEN LEARNERS
          </text>
        </g>
      )}
    </svg>
  );
}
