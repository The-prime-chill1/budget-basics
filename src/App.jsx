import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TipsTicker from './components/TipsTicker';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

// Core screens matching the exact UI design
import Home from './pages/Home';
import BudgetingBasics from './pages/BudgetingBasics';
import NeedsVsWants from './pages/NeedsVsWants';
import Budget503020 from './pages/Budget503020';
import Planner from './pages/Planner';
import SavingsGoals from './pages/SavingsGoals';
import ExpensePlanner from './pages/ExpensePlanner';
import Chatbot from './pages/Chatbot';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';

// Supplementary educational pages (Aptech TechWiz 7 modules)
import Infographics from './pages/Infographics';
import MoneyMistakes from './pages/MoneyMistakes';
import About from './pages/About';
import Search from './pages/Search';
import Sitemap from './pages/Sitemap';
import Landing from './pages/Landing';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('budgetbee_theme');
    return saved || 'light';
  });

  const location = useLocation();
  const isLandingPage =
    location.pathname === '/' ||
    location.pathname === '/landing' ||
    location.pathname === '/welcome';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('budgetbee_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app-shell ${isLandingPage ? 'landing-mode' : ''}`}>
      <ScrollToTop />

      {/* Top Navbar: Mascot, Logo, Tagline, All 10 Modules, Live Clock & Theme Toggle for App Tools */}
      {!isLandingPage && (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <TipsTicker />
        </>
      )}

      {/* Main Content Area */}
      <main className={isLandingPage ? 'landing-flow' : 'main-content-flow'} id="main-content">
        <Routes>
          {/* 1. Public Showcase Landing Page (Primary Home Entrypoint) */}
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/welcome" element={<Landing />} />

          {/* 2. Student Survival Cockpit Dashboard */}
          <Route path="/cockpit" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/app" element={<Home />} />

          {/* 3. Budgeting Fundamentals Guide (SRS Module 1) */}
          <Route path="/budgeting-basics" element={<BudgetingBasics />} />

          {/* 4. Needs vs Wants Analyzer (SRS Module 2) */}
          <Route path="/needs-vs-wants" element={<NeedsVsWants />} />

          {/* 5. 50/30/20 Rule Allocator (SRS Module 3) */}
          <Route path="/50-30-20" element={<Budget503020 />} />

          {/* 6. Planner & Goals Lab (SRS Modules 4 & 5) */}
          <Route path="/planner" element={<Planner />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />
          <Route path="/expense-planner" element={<ExpensePlanner />} />

          {/* 7. BeeWise AI & Feedback Hub (SRS Modules 8, 9 & 10) */}
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />

          {/* 8. Extended Educational Modules (SRS Modules 6, 7 & Sitemap) */}
          <Route path="/infographics" element={<Infographics />} />
          <Route path="/money-mistakes" element={<MoneyMistakes />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      {/* Comprehensive Academic Footer & Mobile Navigation for App Tools */}
      {!isLandingPage && (
        <>
          <Footer />
          <BottomNav />
        </>
      )}
    </div>
  );
}
