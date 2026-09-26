import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import './Alert.css';

const DEFAULT_ICONS = {
  warning: AlertTriangle,
  danger: AlertCircle,
  error: AlertCircle,
  success: CheckCircle2,
  info: Info
};

/**
 * Reusable Alert Banner Component
 * 
 * @param {('warning'|'danger'|'error'|'success'|'info')} variant - Type/color of the alert
 * @param {string|React.ReactNode} title - Bold header/prefix text (e.g. "Budget Warning:")
 * @param {string|React.ReactNode} message - Descriptive body text or React node
 * @param {React.ReactNode} children - Alternative to message
 * @param {React.ComponentType} icon - Custom Lucide icon component (defaults to variant icon)
 * @param {string} customColor - Custom hex/rgb/hsl color code override
 * @param {boolean} dismissible - Whether to render a close button
 * @param {Function} onDismiss - Callback when dismissed
 * @param {React.ReactNode} action - Optional action button or link
 * @param {string} className - Additional CSS class names
 */
export default function Alert({
  variant = 'warning',
  title,
  message,
  children,
  icon: CustomIcon,
  customColor,
  dismissible = false,
  onDismiss,
  action,
  className = ''
}) {
  const IconComponent = CustomIcon || DEFAULT_ICONS[variant] || AlertTriangle;

  const customStyle = customColor
    ? {
        borderColor: customColor,
        backgroundColor: `color-mix(in srgb, ${customColor} 12%, transparent)`,
        color: customColor
      }
    : undefined;

  return (
    <div
      className={`app-alert-banner alert-${variant} animate-fade-in ${className}`}
      role="alert"
      style={customStyle}
    >
      <div className="alert-icon-wrapper">
        <IconComponent size={20} className="alert-main-icon" />
      </div>

      <div className="alert-body-content">
        {title && <strong className="alert-title-text">{title} </strong>}
        <span className="alert-message-text">{message || children}</span>
        {action && <div className="alert-action-slot">{action}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          className="alert-dismiss-btn"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          title="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
