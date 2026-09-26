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
  AtSign,
  Image as ImageIcon
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BrandLogo from '../components/BrandLogo';
import { useCurrency } from '../context/CurrencyContext';
import './About.css';

const TEAM_MEMBERS = [
  {
    id: 'enioluwafe',
    name: 'Enioluwafe Gbadamosi',
    role: 'Main Structure',
    icon: Layers,
    badgeColor: 'bg-gold-tint',
    iconColor: 'text-gold',
    quote: 'I like bringing ideas together and turning them into a working product.',
    handle: null,
    photoUrl: '/team-eni.jpg',
    tasks: [
      'Set up the project',
      'Homepage, Navbar & Footer',
      'Connect everyone’s work'
    ]
  },
  {
    id: 'hamid',
    name: 'Abdulhamid Kasim',
    role: 'Budgeting',
    icon: BookOpen,
    badgeColor: 'bg-emerald-tint',
    iconColor: 'text-emerald',
    quote: 'I enjoy making budgeting ideas clear and practical for students.',
    handle: 'hame - 11',
    photoUrl: '/team-hamid.jpg',
    tasks: [
      'Budgeting Basics',
      'Needs vs Wants'
    ]
  },
  {
    id: 'tammy',
    name: 'Clinton Tamilore Akande',
    role: 'Calculators',
    icon: Calculator,
    badgeColor: 'bg-blue-tint',
    iconColor: 'text-blue',
    quote: 'I like keeping numbers accurate and making useful tools.',
    handle: 'Tamilore001',
    photoUrl: '/team-tammy.jpg',
    tasks: [
      '50/30/20 Calculator',
      'Savings Goals'
    ]
  },
  {
    id: 'lawal',
    name: 'Lawal Abiodun',
    role: 'Expenses',
    icon: FileSpreadsheet,
    badgeColor: 'bg-amber-tint',
    iconColor: 'text-amber',
    quote: 'I focus on tracking details and organizing expenses clearly.',
    handle: null,
    photoUrl: '/team-lawal.jpg',
    tasks: [
      'Expense Planner',
      'Add/edit/delete expenses',
      'Money Mistakes section'
    ]
  },
  {
    id: 'lam',
    name: 'Lam Abdulhameed Olawale',
    role: 'AI & Search',
    icon: Bot,
    badgeColor: 'bg-purple-tint',
    iconColor: 'text-purple',
    quote: 'I enjoy building smart AI assistance and intuitive search.',
    handle: null,
    photoUrl: '/team-lam.jpg',
    tasks: [
      'AI Chatbot',
      'Search feature',
      'Sort & Filter features'
    ]
  },
  {
    id: 'opeyemi',
    name: 'Ojo Opeyemi Isaac',
    role: 'LEARNING CONTENT & TESTING',
    icon: Sparkles,
    badgeColor: 'bg-emerald-tint',
    iconColor: 'text-emerald',
    quote: 'I enjoy creating visual learning content and checking that everything works.',
    handle: null,
    photoUrl: '/team-opeyemi.jpg',
    tasks: [
      'Infographics/Learning Gallery',
      'About Us',
      'Feedback & Contact forms',
      'Basic testing'
    ]
  }
];

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
              {TEAM_MEMBERS.map((member) => {
                const MemberIcon = member.icon;
                return (
                  <div key={member.id} className="role-card">
                    {/* Modern Photo Container / Placeholder */}
                    <div className="role-photo-frame">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="role-photo-img"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.parentElement.querySelector('.role-photo-placeholder');
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="role-photo-placeholder"
                        style={{ display: member.photoUrl ? 'none' : 'flex' }}
                      >
                        <div className="role-photo-icon-box">
                          <ImageIcon size={32} className="role-photo-icon" strokeWidth={1.5} />
                        </div>
                        <span className="role-photo-label">PHOTO PLACEHOLDER</span>
                      </div>
                    </div>

                    <div className="role-card-top">
                      <div className={`role-icon-box ${member.badgeColor}`}>
                        <MemberIcon size={20} className={member.iconColor} />
                      </div>
                      <span className="role-badge">{member.role}</span>
                    </div>

                    <div className="role-header-info">
                      <h4 className="role-member-name">{member.name}</h4>
                      {member.quote && (
                        <p className="role-member-quote">{member.quote}</p>
                      )}
                      {member.handle && (
                        <span className="role-handle-tag">
                          <AtSign size={12} />
                          <span>{member.handle}</span>
                        </span>
                      )}
                    </div>

                    <ul className="role-tasks-list">
                      {member.tasks.map((task, idx) => (
                        <li key={idx} className="role-task-item">
                          <Check size={16} className="role-task-check" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
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
