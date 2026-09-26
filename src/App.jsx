// Main application component: configures routes, layout shell, and global theme persistence
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TipsTicker from './components/TipsTicker';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import FloatingAI from './components/FloatingAI';

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
import Infographics from './pages/Infographics';
import MoneyMistakes from './pages/MoneyMistakes';
import About from './pages/About';
import Search from './pages/Search';
import Sitemap from './pages/Sitemap';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Landing from './pages/Landing';

import { CurrencyProvider } from './context/CurrencyContext';

// Resets viewport scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  // Theme state synced with documentElement data-theme attribute
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('budgetbee_theme');
    return saved || 'light';
  });

  const location = useLocation();

  // Landing page renders its own custom header and hero layout without global chrome
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
    <CurrencyProvider>
      <div className={`app-shell ${isLandingPage ? 'landing-mode' : ''}`}>
        <ScrollToTop />

      {!isLandingPage && (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <TipsTicker />
        </>
      )}

      <main className={isLandingPage ? 'landing-flow' : 'main-content-flow'} id="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/welcome" element={<Landing />} />

          <Route path="/cockpit" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/app" element={<Home />} />

          <Route path="/budgeting-basics" element={<BudgetingBasics />} />
          <Route path="/needs-vs-wants" element={<NeedsVsWants />} />
          <Route path="/50-30-20" element={<Budget503020 />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />
          <Route path="/expense-planner" element={<ExpensePlanner />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infographics" element={<Infographics />} />
          <Route path="/money-mistakes" element={<MoneyMistakes />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      {!isLandingPage && (
        <>
          <Footer />
          <BottomNav />
        </>
      )}

      <FloatingAI />
      </div>
    </CurrencyProvider>
  );
}
