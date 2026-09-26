// About page covering the BudgetBasics mission, educational principles, and Team PixelForge credits
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Target,
  BookOpen,
  Award,
  Users,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  FileSpreadsheet,
  Layers,
  Calculator,
  Bot,
  Check,
  AtSign
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BrandLogo from '../components/BrandLogo';
import { useCurrency } from '../context/CurrencyContext';
import './About.css';

export default function About() {
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <div className="about-page page-wrapper animate-fade-in">
      <div className="app-container">
        {/* Emblem Showcase with Live Attention Pulse */}
        <div className="about-brand-emblem-showcase">
          <div className="about-emblem-left">
            <BrandLogo variant="full" height={54} className="about-hero-logo" />
            <div className="about-live-status-pill">
              <span className="live-pulse-dot" />
              <span>100% Student-Crafted &bull; Zero Commercial Tracking</span>
            </div>
          </div>
          <div className="about-emblem-quick-actions">
            <Link to="/50-30-20" className="emblem-quick-pill" title="Explore the 50/30/20 Formula">
              <Calculator size={14} />
              <span>50/30/20 Formula</span>
            </Link>
            <Link to="/planner" className="emblem-quick-pill" title="Open the Expense Planner">
              <FileSpreadsheet size={14} />
              <span>Expense Planner</span>
            </Link>
            <Link to="/privacy" className="emblem-quick-pill" title="View Privacy & Security Charter">
              <ShieldCheck size={14} />
              <span>Privacy Charter</span>
            </Link>
          </div>
        </div>

        <SectionHeading
          badge="Project Identity & Mission"
          title="About BudgetBasics"
          subtitle="Empowering students, college learners, and young adults to build conscious money habits and financial confidence."
        />

        <div className="about-hero-card card">
          <div className="about-hero-content">
            <div className="about-hero-badge-row">
              <span className="about-theme-pill">Theme: NextGen BudgetBee</span>
              <span className="about-competition-pill">Web Innovation Unleashed</span>
            </div>
            <h2 className="about-hero-title">
              Smart Financial Literacy <span className="text-highlight">Without the Stress</span>
            </h2>
            <p className="about-hero-p">
              Many students start handling pocket money, allowances, internship stipends, or campus job wages
              without a structured way to plan their cash flow. Small, unexamined daily expenses quickly consume
              funds meant for essential academic materials, transportation, and savings.
            </p>
            <p className="about-hero-p">
              <strong>BudgetBasics</strong> was conceived as an academic web innovation project that transforms
              abstract personal finance principles into engaging, relatable, visual experiences with 100% client-side computations.
            </p>
            <div className="about-hero-cta-row">
              <Link to="/50-30-20" className="btn btn-primary btn-attention-pulse">
                <span>Start Budgeting</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/needs-vs-wants" className="btn btn-outline">
                <Sparkles size={16} />
                <span>Needs vs. Wants Challenge</span>
              </Link>
            </div>
          </div>

          <div className="about-stats-side">
            <div className="about-stat-box interactive-stat-box">
              <strong className="stat-number">100%</strong>
              <span className="stat-desc">Educational & Safe</span>
              <span className="stat-sub">Zero banking credentials required</span>
            </div>
            <div className="about-stat-box interactive-stat-box">
              <strong className="stat-number">0</strong>
              <span className="stat-desc">Sign-up Barriers</span>
              <span className="stat-sub">Instant browser-only access</span>
            </div>
            <div className="about-stat-box interactive-stat-box">
              <strong className="stat-number">{currency.symbol}</strong>
              <span className="stat-desc">Active: {currency.code}</span>
              <span className="stat-sub">{currency.name} &bull; Real-time</span>
            </div>
          </div>
        </div>

        <section className="section-spacing about-values-section">
          <SectionHeading
            badge="Guiding Principles"
            title="What We Stand For"
            subtitle="The educational philosophy behind every calculator and guide on this platform."
          />

          <div className="values-grid">
            <div className="value-card card interactive">
              <div className="value-icon-box bg-emerald">
                <ShieldCheck size={24} />
              </div>
              <h3 className="value-title">Safe & Non-Commercial</h3>
              <p className="value-desc">
                BudgetBasics does not connect to bank APIs, process transactions, or store personal financial credentials.
                All calculations happen locally in your browser for pure learning.
              </p>
            </div>

            <div className="value-card card interactive">
              <div className="value-icon-box bg-amber">
                <Users size={24} />
              </div>
              <h3 className="value-title">Student-Centric Realism</h3>
              <p className="value-desc">
                We use realistic student scenarios—campus transport passes, project printing, hostel groceries, and data bundles—rather than abstract corporate finance jargon.
              </p>
            </div>

            <div className="value-card card interactive">
              <div className="value-icon-box bg-blue">
                <Target size={24} />
              </div>
              <h3 className="value-title">Habit Over Complexity</h3>
              <p className="value-desc">
                We prioritize simple, consistent routines (like the 50/30/20 framework and 24-hour cooling-off rule) that students can maintain throughout their entire lives.
              </p>
            </div>
          </div>
        </section>

        <section className="section-spacing pixelforge-showcase-section">
          <SectionHeading
            badge="Engineering & Innovation"
            title="Built & Powered by Team PixelForge"
            subtitle="Meet the development team behind BudgetBasics for the Aptech TechWiz 7 Competition."
          />

          <div className="pixelforge-card card">
            <div className="pixelforge-header">
              <div className="pixelforge-emblem">
                <Award size={28} className="text-gold" />
              </div>
              <div>
                <div className="pixelforge-tags">
                  <span className="pixelforge-team-badge">Team PixelForge</span>
                  <span className="pixelforge-category-badge">Web Innovation Unleashed</span>
                </div>
                <h3 className="pixelforge-heading">Crafting NextGen Digital Literacy</h3>
              </div>
            </div>

            <p className="pixelforge-manifesto">
              <strong>Team PixelForge</strong> built BudgetBasics with one relentless focus: removing the anxiety, jargon, and confusion from personal money management for collegiate learners. Every interface, calculator, formula, and micro-interaction was handcrafted with 100% human-written code, client-side privacy, and modern responsive aesthetics.
            </p>

            <div className="pixelforge-roles-grid">
              <div className="role-card">
                <div className="role-card-top">
                  <div className="role-icon-box bg-gold-tint">
                    <Layers size={22} className="text-gold" />
                  </div>
                  <span className="role-badge">Main Structure</span>
                </div>
                <div className="role-header-info">
                  <h4 className="role-member-name">Enioluwafe Gbadamosi</h4>
                </div>
                <ul className="role-tasks-list">
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Set up the project</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Homepage, Navbar &amp; Footer</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Connect everyone’s work</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Final integration</span>
                  </li>
                </ul>
              </div>

              <div className="role-card">
                <div className="role-card-top">
                  <div className="role-icon-box bg-emerald-tint">
                    <BookOpen size={22} className="text-emerald" />
                  </div>
                  <span className="role-badge">Budgeting</span>
                </div>
                <div className="role-header-info">
                  <h4 className="role-member-name">Hamid</h4>
                  <span className="role-handle-tag">
                    <AtSign size={12} />
                    <span>hame - 11</span>
                  </span>
                </div>
                <ul className="role-tasks-list">
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Budgeting Basics</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Needs vs Wants</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Interactive questions/quizzes</span>
                  </li>
                </ul>
              </div>

              <div className="role-card">
                <div className="role-card-top">
                  <div className="role-icon-box bg-blue-tint">
                    <Calculator size={22} className="text-blue" />
                  </div>
                  <span className="role-badge">Calculators</span>
                </div>
                <div className="role-header-info">
                  <h4 className="role-member-name">Tammy</h4>
                  <span className="role-handle-tag">
                    <AtSign size={12} />
                    <span>Tamilore001</span>
                  </span>
                </div>
                <ul className="role-tasks-list">
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>50/30/20 Calculator</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Savings Goals</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Calculations &amp; input validation</span>
                  </li>
                </ul>
              </div>

              <div className="role-card">
                <div className="role-card-top">
                  <div className="role-icon-box bg-amber-tint">
                    <FileSpreadsheet size={22} className="text-amber" />
                  </div>
                  <span className="role-badge">Expenses</span>
                </div>
                <div className="role-header-info">
                  <h4 className="role-member-name">Lawal Abiodun</h4>
                </div>
                <ul className="role-tasks-list">
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Expense Planner</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Add/edit/delete expenses</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Money Mistakes section</span>
                  </li>
                </ul>
              </div>

              <div className="role-card">
                <div className="role-card-top">
                  <div className="role-icon-box bg-purple-tint">
                    <Bot size={22} className="text-purple" />
                  </div>
                  <span className="role-badge">AI &amp; Search</span>
                </div>
                <div className="role-header-info">
                  <h4 className="role-member-name">Lam Abdulhameed Olawale</h4>
                </div>
                <ul className="role-tasks-list">
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>AI Chatbot</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Search feature</span>
                  </li>
                  <li className="role-task-item">
                    <Check size={16} className="role-task-check" />
                    <span>Sort &amp; Filter features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="audience-section card">
          <div className="audience-content">
            <span className="section-badge">Target Audience</span>
            <h3 className="audience-title">Designed for Learners at Every Stage</h3>
            <div className="audience-list">
              <div className="audience-item">
                <CheckCircle2 size={18} className="audience-icon" />
                <div>
                  <strong>College & University Undergraduates:</strong> Managing monthly allowances, hostel food, and course materials.
                </div>
              </div>
              <div className="audience-item">
                <CheckCircle2 size={18} className="audience-icon" />
                <div>
                  <strong>Vocational & IT Learners:</strong> Budgeting for technical certifications, exam fees, and study laptops.
                </div>
              </div>
              <div className="audience-item">
                <CheckCircle2 size={18} className="audience-icon" />
                <div>
                  <strong>Young Career Starters:</strong> Planning their first entry-level salary or internship stipend.
                </div>
              </div>
            </div>
          </div>

          <div className="audience-cta-box">
            <h4>Ready to try our tools?</h4>
            <p>Start with the 50-30-20 interactive calculator.</p>
            <Link to="/50-30-20" className="btn btn-primary">
              <span>Launch Calculator</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
