import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Scale, PieChart, Wallet, Bot } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav-bar" aria-label="Mobile Bottom Navigation">
      <div className="bottom-nav-inner">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}
          end
          title="Student Cockpit Home"
        >
          <Home size={19} className="tab-icon" />
          <span className="tab-label">Home</span>
        </NavLink>

        <NavLink
          to="/budgeting-basics"
          className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}
          title="Budgeting Basics Guide"
        >
          <BookOpen size={19} className="tab-icon" />
          <span className="tab-label">Guide</span>
        </NavLink>

        <NavLink
          to="/needs-vs-wants"
          className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}
          title="Needs vs Wants Analyzer"
        >
          <Scale size={19} className="tab-icon" />
          <span className="tab-label">Needs/Wants</span>
        </NavLink>

        <NavLink
          to="/50-30-20"
          className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}
          title="50/30/20 Rule Allocator"
        >
          <PieChart size={19} className="tab-icon" />
          <span className="tab-label">50/30/20</span>
        </NavLink>

        <NavLink
          to="/planner"
          className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}
          title="Session Planner & Goals"
        >
          <Wallet size={19} className="tab-icon" />
          <span className="tab-label">Planner</span>
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}
          title="BeeWise AI Assistant"
        >
          <Bot size={19} className="tab-icon" />
          <span className="tab-label">BeeWise</span>
        </NavLink>
      </div>
    </nav>
  );
}
