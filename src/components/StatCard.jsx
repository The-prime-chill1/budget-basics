// Summary KPI card displaying a key metric with icon, numeric value, and contextual badge
import React from 'react';

export default function StatCard({
  icon: Icon,
  value,
  label,
  subtitle,
  trend = null,
  color = 'accent'
}) {
  return (
    <div className="card stat-card interactive">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
        {Icon && (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)'
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
        {value}
      </div>

      {(subtitle || trend) && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {trend && (
            <span style={{ color: trend.isPositive ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
              {trend.text}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
