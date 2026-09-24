import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search as SearchIcon,
  Filter,
  ArrowUpDown,
  BookOpen,
  ArrowRight,
  PieChart,
  Target,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  X
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';
import { featuredTips } from '../data/tips';
import { moneyMistakes } from '../data/mistakes';
import { infographicsData } from '../data/gallery';
import './Search.css';

// Combine all searchable learning items into a unified index
const ALL_SEARCHABLE_ITEMS = [
  ...featuredTips.map((t) => ({
    id: t.id,
    type: 'Tip',
    category: t.category,
    title: t.title,
    summary: t.summary,
    details: t.details,
    link: '/search',
    icon: BookOpen
  })),
  ...moneyMistakes.map((m) => ({
    id: m.id,
    type: 'Mistake Guide',
    category: 'Spending',
    title: m.title,
    summary: m.subtitle,
    details: m.scenario,
    link: '/money-mistakes',
    icon: AlertTriangle
  })),
  ...infographicsData.map((g) => ({
    id: g.id,
    type: 'Infographic',
    category: g.category,
    title: g.title,
    summary: g.caption,
    details: g.summary,
    link: '/infographics',
    icon: ImageIcon
  })),
  {
    id: 'concept-503020',
    type: 'Core Concept',
    category: 'Budgeting',
    title: 'The 50-30-20 Rule Budgeting Formula',
    summary: 'Divide monthly allowance into 50% Essentials (Needs), 30% Lifestyle (Wants), and 20% Future Reserves (Savings).',
    details: 'A foundational budgeting framework tailored for beginners and students.',
    link: '/50-30-20',
    icon: PieChart
  },
  {
    id: 'concept-emergency',
    type: 'Core Concept',
    category: 'Saving',
    title: 'Student Emergency Buffer Fund',
    summary: 'A ₦10,000 to ₦30,000 cash reserve to protect against sudden medical or academic emergencies.',
    details: 'Keeps students resilient without high-interest borrowing or falling behind on tuition.',
    link: '/savings-goals',
    icon: Target
  }
];

const FILTER_TOPICS = ['All', 'Budgeting', 'Saving', 'Spending', 'Goals', 'Needs vs Wants'];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [sortBy, setSortBy] = useState('relevant'); // 'relevant' | 'az'

  // Filter & Sort Pipeline
  const searchResults = useMemo(() => {
    let list = ALL_SEARCHABLE_ITEMS;

    // 1. Topic filter
    if (selectedTopic !== 'All') {
      list = list.filter((item) => item.category.toLowerCase() === selectedTopic.toLowerCase());
    }

    // 2. Keyword query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.details.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    if (sortBy === 'az') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [searchQuery, selectedTopic, sortBy]);

  const handleClear = () => {
    setSearchQuery('');
    setSelectedTopic('All');
    setSortBy('relevant');
  };

  return (
    <div className="search-page page-wrapper animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <SectionHeading
          badge="Module 09 &bull; Global Search"
          title="Search Educational Resources"
          subtitle="Quickly discover financial concepts, mistake prevention guides, actionable tips, and infographics across the BudgetBasics platform."
        />

        {/* 1. SEARCH INPUT & FILTER BAR */}
        <div className="search-controls-card card">
          <div className="search-input-wrapper">
            <SearchIcon size={20} className="search-bar-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. 'saving', 'needs', '50-30-20', 'expenses', 'buffer')..."
              className="search-main-input"
              aria-label="Search educational content"
            />
            {searchQuery && (
              <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filter-sort-row">
            {/* Topic Filter Pills */}
            <div className="topic-filter-group">
              <span className="control-label">Topic:</span>
              <div className="topic-pills-list">
                {FILTER_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`topic-pill ${selectedTopic === topic ? 'active' : ''}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Selector */}
            <div className="sort-select-group">
              <span className="control-label">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown"
                aria-label="Sort results"
              >
                <option value="relevant">Most Relevant</option>
                <option value="az">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. RESULTS SUMMARY BAR */}
        <div className="results-status-bar">
          <span className="results-count-badge">
            Found <strong>{searchResults.length}</strong> result{searchResults.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedTopic !== 'All' && ` in ${selectedTopic}`}
          </span>

          {(searchQuery || selectedTopic !== 'All' || sortBy !== 'relevant') && (
            <button type="button" className="btn-reset-filters" onClick={handleClear}>
              Reset all filters
            </button>
          )}
        </div>

        {/* 3. RESULTS GRID OR EMPTY STATE */}
        {searchResults.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title="No matching learning content found"
            description={`We could not find any guides matching "${searchQuery}". Try searching for broader terms like "saving", "expenses", "needs", or "allowance".`}
            action={
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleClear}>
                Clear Search Query
              </button>
            }
          />
        ) : (
          <div className="search-results-grid">
            {searchResults.map((item) => {
              const IconComp = item.icon || BookOpen;

              return (
                <div key={item.id} className="search-result-card card interactive">
                  <div className="result-card-top">
                    <div className="result-type-badge">
                      <IconComp size={14} />
                      <span>{item.type}</span>
                    </div>
                    <span className="badge badge-want">{item.category}</span>
                  </div>

                  <h3 className="result-title">{item.title}</h3>
                  <p className="result-summary">{item.summary}</p>

                  <div className="result-card-footer">
                    <Link to={item.link} className="result-link">
                      <span>Explore resource</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
