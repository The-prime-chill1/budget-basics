import React from 'react';
import { Inbox } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'Try adjusting your search or adding a new entry.',
  action = null
}) {
  return (
    <div className="empty-state-wrapper">
      <div className="empty-state-icon-box">
        <Icon size={32} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
