import React from 'react';
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
  FileSpreadsheet
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import './About.css';

export default function About() {
  return (
    <div className="about-page page-wrapper animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <SectionHeading
          badge="Project Identity & Mission"
          title="About BudgetBasics"
          subtitle="Empowering students, college learners, and young adults to build conscious money habits and financial confidence."
        />

        {/* 1. HERO MISSION CARD */}
        <div className="about-hero-card card">
          <div className="about-hero-content">
            <h2 className="about-hero-title">
              Theme: <span className="text-highlight">NextGen BudgetBee</span> &bull; Web Innovation Unleashed
            </h2>
            <p className="about-hero-p">
              Many students start handling pocket money, allowances, internship stipends, or campus job wages
              without a structured way to plan their cash flow. Small, unexamined daily expenses quickly consume
              funds meant for essential academic materials, transportation, and savings.
            </p>
            <p className="about-hero-p">
              <strong>BudgetBasics</strong> was conceived as an academic web innovation project that transforms
              abstract personal finance principles into engaging, relatable, visual experiences.
            </p>
          </div>

          <div className="about-stats-side">
            <div className="about-stat-box">
              <strong className="stat-number">100%</strong>
              <span className="stat-desc">Educational & Safe</span>
            </div>
            <div className="about-stat-box">
              <strong className="stat-number">0</strong>
              <span className="stat-desc">Backend / DB Dependencies</span>
            </div>
            <div className="about-stat-box">
              <strong className="stat-number">₦</strong>
              <span className="stat-desc">Nigerian Currency Standard</span>
            </div>
          </div>
        </div>

        {/* 2. CORE VALUES & AUDIENCE */}
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

        {/* 3. BUILT & POWERED BY TEAM PIXELFORGE */}
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
                <div className="role-icon-box bg-gold-tint">
                  <Sparkles size={20} className="text-gold" />
                </div>
                <h4 className="role-title">Eni &bull; Main Structure</h4>
                <p className="role-desc">
                  Project setup, core layout architecture, responsive Navbar &amp; Footer, page routing, and seamless team-wide integration.
                </p>
              </div>

              <div className="role-card">
                <div className="role-icon-box bg-emerald-tint">
                  <BookOpen size={20} className="text-emerald" />
                </div>
                <h4 className="role-title">Hamid &bull; Budgeting</h4>
                <p className="role-desc">
                  Budgeting Basics curriculum, interactive Needs vs Wants classifier, and engaging student financial knowledge quizzes.
                </p>
              </div>

              <div className="role-card">
                <div className="role-icon-box bg-blue-tint">
                  <ShieldCheck size={20} className="text-blue" />
                </div>
                <h4 className="role-title">Tammy &bull; Calculators</h4>
                <p className="role-desc">
                  Interactive 50/30/20 Rule Allocator, Savings Goals milestone projector, mathematical algorithms, and strict input validation.
                </p>
              </div>

              <div className="role-card">
                <div className="role-icon-box bg-amber-tint">
                  <FileSpreadsheet size={20} className="text-amber" />
                </div>
                <h4 className="role-title">Lawal &bull; Expenses</h4>
                <p className="role-desc">
                  Client-side Expense Planner (Add, Edit, Delete), live category budget tracking, and the Common Student Money Mistakes guide.
                </p>
              </div>

              <div className="role-card">
                <div className="role-icon-box bg-purple-tint">
                  <Users size={20} className="text-purple" />
                </div>
                <h4 className="role-title">Hameed &bull; AI &amp; Search</h4>
                <p className="role-desc">
                  BeeWise AI financial chatbot assistant, global resource search system, and dynamic multi-criteria sorting &amp; filtering tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHO IS BUDGETBASICS FOR? */}
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
