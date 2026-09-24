import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  return (
    <div className={`section-header-block ${align === 'left' ? 'align-left' : ''} ${className}`}>
      {badge && <span className="section-badge">{badge}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
