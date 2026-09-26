// Visual learning gallery displaying financial diagrams, high-res infographics, and student blueprints
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Filter,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Lightbulb,
  Search,
  ExternalLink,
  Coins,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  Share2,
  Eye,
  BookOpen,
  AlertTriangle,
  PieChart,
  Target
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { infographicsData } from '../data/gallery';
import { featuredTips } from '../data/tips';
import { moneyMistakes } from '../data/mistakes';
import { useCurrency } from '../context/CurrencyContext';
import './Search.css';
import './Infographics.css';

const EDUCATIONAL_RESOURCES = [
  ...featuredTips.map((t) => ({
    id: `tip-${t.id}`,
    type: 'Practical Tip',
    category: t.category,
    title: t.title,
    summary: t.summary,
    details: t.details,
    link: '/search',
    icon: BookOpen
  })),
  ...moneyMistakes.map((m) => ({
    id: `mistake-${m.id}`,
    type: 'Mistake Trap',
    category: 'Spending',
    title: m.title,
    summary: m.subtitle,
    details: m.scenario,
    link: '/money-mistakes',
    icon: AlertTriangle
  })),
  {
    id: 'concept-503020',
    type: 'Core Framework',
    category: 'Budgeting',
    title: 'The 50/30/20 Rule Budgeting Formula',
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
    summary: 'A small cash reserve to protect against sudden medical or academic emergencies.',
    details: 'Keeps students resilient without high-interest borrowing or falling behind on tuition.',
    link: '/savings-goals',
    icon: Target
  },
  {
    id: 'concept-needs-wants',
    type: 'Core Concept',
    category: 'Needs vs Wants',
    title: 'Needs vs. Wants Campus Decision Matrix',
    summary: 'Master the 24-hour cooling off window and 30-second impulse defense to protect your student allowance.',
    details: 'Learn how to differentiate non-negotiables from discretionary lifestyle treats.',
    link: '/needs-vs-wants',
    icon: Target
  }
];

const FILTER_TOPICS = ['All', 'Budgeting', 'Saving', 'Spending', 'Goals', 'Needs vs Wants'];

export default function Infographics() {
  const [activeTopic, setActiveTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [selectedInfographic, setSelectedInfographic] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isVisualFullscreen, setIsVisualFullscreen] = useState(false);
  const [canvasPos, setCanvasPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const { format, currency } = useCurrency();

  // Filter diagrams based on active topic, search input, and sort order
  const filteredDiagrams = useMemo(() => {
    let list = infographicsData.filter((item) => {
      const matchesTopic =
        activeTopic === 'All' ||
        item.category.toLowerCase().includes(activeTopic.toLowerCase()) ||
        activeTopic.toLowerCase().includes(item.category.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.caption.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesTopic && matchesSearch;
    });

    if (sortBy === 'az') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [activeTopic, searchQuery, sortBy]);

  // Filter educational resources based on active topic, search input, and sort order
  const filteredResources = useMemo(() => {
    let list = EDUCATIONAL_RESOURCES.filter((item) => {
      const matchesTopic =
        activeTopic === 'All' ||
        item.category.toLowerCase() === activeTopic.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      return matchesTopic && matchesSearch;
    });

    if (sortBy === 'az') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [activeTopic, searchQuery, sortBy]);

  // Current index within filtered diagrams for previous/next navigation
  const currentIndex = useMemo(() => {
    if (!selectedInfographic) return -1;
    return filteredDiagrams.findIndex((item) => item.id === selectedInfographic.id);
  }, [selectedInfographic, filteredDiagrams]);

  const handleOpenInfographic = (item) => {
    setSelectedInfographic(item);
    setZoomLevel(1);
    setCanvasPos({ x: 0, y: 0 });
    setIsVisualFullscreen(false);
  };

  const handleCloseModal = () => {
    setSelectedInfographic(null);
    setZoomLevel(1);
    setCanvasPos({ x: 0, y: 0 });
    setIsVisualFullscreen(false);
  };

  const handlePrevDiagram = () => {
    if (currentIndex > 0) {
      setSelectedInfographic(filteredItems[currentIndex - 1]);
      setZoomLevel(1);
      setCanvasPos({ x: 0, y: 0 });
    }
  };

  const handleNextDiagram = () => {
    if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
      setSelectedInfographic(filteredItems[currentIndex + 1]);
      setZoomLevel(1);
      setCanvasPos({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedInfographic) return;

      if (e.key === 'Escape') {
        if (isVisualFullscreen) {
          setIsVisualFullscreen(false);
        } else {
          handleCloseModal();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrevDiagram();
      } else if (e.key === 'ArrowRight') {
        handleNextDiagram();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))));
      } else if (e.key === '-') {
        setZoomLevel((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))));
      } else if (e.key === '0') {
        setZoomLevel(1);
        setCanvasPos({ x: 0, y: 0 });
      }
    };

    if (selectedInfographic) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('studio-modal-active');
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('studio-modal-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedInfographic, currentIndex, filteredItems, isVisualFullscreen]);

  // Interactive Pan / Drag handlers
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - canvasPos.x,
      y: e.clientY - canvasPos.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return;
    setCanvasPos({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (zoomLevel === 1) {
      setZoomLevel(1.6);
    } else {
      setZoomLevel(1);
      setCanvasPos({ x: 0, y: 0 });
    }
  };

  const handleShareDiagram = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Map infographic types to relevant interactive tool links
  const getToolLink = (type) => {
    switch (type) {
      case 'pie-breakdown':
        return { path: '/50-30-20', label: 'Open 50/30/20 Calculator' };
      case 'flow-tree':
        return { path: '/needs-vs-wants', label: 'Try Needs vs. Wants Filter' };
      case 'cycle-flow':
        return { path: '/budgeting-basics', label: 'Read Budgeting Guide' };
      case 'challenge-grid':
        return { path: '/planner', label: 'Open Savings Goals Planner' };
      case 'comparison-bars':
        return { path: '/planner', label: 'Track Session Expenses' };
      case 'ladder-steps':
        return { path: '/cockpit', label: 'Check Financial Fitness' };
      default:
        return { path: '/cockpit', label: 'Launch Cockpit' };
    }
  };

  return (
    <div className="infographics-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          title="Financial Infographics & Visual Blueprints"
          subtitle="Explore interactive concept maps, visual cash-flow trees, and daily savings blueprints built for students."
        />

        {/* Unified Search & Topic Filter Controls */}
        <div className="search-controls-card card">
          <div className="search-input-wrapper">
            <Search size={20} className="search-bar-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. 'saving', 'needs', '50-30-20', 'expenses', 'buffer')..."
              className="search-main-input"
              aria-label="Search educational content and diagrams"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filter-sort-row">
            <div className="topic-filter-group">
              <span className="control-label">Topics:</span>
              <div className="topic-pills-list" role="tablist">
                {FILTER_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`topic-pill ${activeTopic === topic ? 'active' : ''}`}
                    onClick={() => setActiveTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

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

        <div className="gallery-status-bar">
          <span className="gallery-count-text">
            Found <strong>{filteredDiagrams.length}</strong> visual diagram{filteredDiagrams.length !== 1 ? 's' : ''} and <strong>{filteredResources.length}</strong> educational resource{filteredResources.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <div className="gallery-currency-badge">
            <Coins size={12} />
            <span>Search &amp; Filter Active</span>
          </div>
        </div>

        {/* Section 1: Interactive Visual Blueprints */}
        <div className="section-sub-head-row">
          <div>
            <h3 className="section-sub-title">Interactive Visual Blueprints</h3>
            <p className="section-sub-desc">High-resolution student financial diagrams with interactive zoom &amp; study studio</p>
          </div>
          <span className="section-filter-indicator">
            <Filter size={13} />
            <span>{activeTopic === 'All' ? 'All Visual Diagrams' : activeTopic}</span>
          </span>
        </div>

        {filteredDiagrams.length === 0 ? (
          <div className="gallery-empty-state" style={{ marginBottom: '2.5rem' }}>
            <p>No visual diagrams found matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="gallery-grid" style={{ marginBottom: '3.5rem' }}>
            {filteredDiagrams.map((info) => (
              <article
                key={info.id}
                className="gallery-card"
                onClick={() => handleOpenInfographic(info)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleOpenInfographic(info)}
                aria-label={`Open ${info.title} high-res diagram`}
              >
                <div className="gallery-visual-frame">
                  <img
                    src={info.image}
                    alt={info.alt}
                    className="gallery-image-asset"
                    loading="lazy"
                  />
                  <div className="visual-frame-badges">
                    <span className="frame-category-pill">{info.category}</span>
                    <span className="frame-time-pill">
                      <Clock size={11} />
                      <span>{info.readingTime}</span>
                    </span>
                  </div>
                  <div className="visual-overlay">
                    <span className="overlay-pill">
                      <Maximize2 size={13} />
                      <span>Open Interactive Studio</span>
                    </span>
                  </div>
                </div>

                <div className="gallery-card-body">
                  <div className="card-top-meta">
                    <span className="info-badge-tag">{info.badge}</span>
                  </div>
                  <h3 className="info-card-title">{info.title}</h3>
                  <p className="info-card-caption">{info.caption}</p>

                  <div className="card-footer-action">
                    <span className="card-action-text">Inspect High-Res Diagram</span>
                    <ArrowRight size={14} className="card-action-arrow" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Section 2: Educational Learning Resources & Guides */}
        <div className="section-sub-head-row">
          <div>
            <h3 className="section-sub-title">Educational Learning Resources</h3>
            <p className="section-sub-desc">Searchable student financial articles, campus traps, and practical budgeting guides</p>
          </div>
          <span className="section-filter-indicator">
            <BookOpen size={13} />
            <span>{filteredResources.length} Guides Found</span>
          </span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="gallery-empty-state">
            <p>No educational articles found matching "{searchQuery}".</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setActiveTopic('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="search-results-grid" style={{ marginBottom: '3rem' }}>
            {filteredResources.map((item) => {
              const ItemIcon = item.icon || BookOpen;
              return (
                <article key={item.id} className="result-card card interactive">
                  <div className="result-card-header">
                    <div className="result-icon-box bg-gold-tint">
                      <ItemIcon size={20} className="text-gold" />
                    </div>
                    <div className="result-badges">
                      <span className="result-type-badge">{item.type}</span>
                      <span className="result-category-pill">{item.category}</span>
                    </div>
                  </div>

                  <h4 className="result-card-title">{item.title}</h4>
                  <p className="result-card-summary">{item.summary}</p>
                  <p className="result-card-details">{item.details}</p>

                  <div className="result-card-footer">
                    <Link to={item.link} className="result-action-link">
                      <span>Open Resource</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Astonishing High-Resolution Infographic Studio Modal */}
        {selectedInfographic &&
          createPortal(
            <div
              className="infographic-studio-backdrop animate-fade-in"
              onClick={handleCloseModal}
              role="dialog"
              aria-modal="true"
              aria-label={selectedInfographic.title}
            >
            <div
              className={`infographic-studio-modal ${isVisualFullscreen ? 'fullscreen-canvas' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Studio Top Control & Navigation Bar */}
              <div className="studio-top-bar">
                <div className="studio-meta-left">
                  <span className={`studio-category-badge cat-${selectedInfographic.category.toLowerCase()}`}>
                    {selectedInfographic.category}
                  </span>
                  <span className="studio-badge-sub">{selectedInfographic.badge}</span>
                  <span className="studio-reading-pill">
                    <Clock size={12} />
                    <span>{selectedInfographic.readingTime}</span>
                  </span>
                  <span className="studio-counter-pill">
                    Diagram {currentIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <div className="studio-actions-right">
                  <button
                    type="button"
                    className="studio-btn studio-btn-icon"
                    onClick={handleShareDiagram}
                    title={copiedLink ? "Link Copied!" : "Copy Page Link"}
                    aria-label="Share diagram"
                  >
                    <Share2 size={15} />
                    {copiedLink && <span className="copied-tooltip">Copied!</span>}
                  </button>

                  <a
                    href={selectedInfographic.image}
                    download={`${selectedInfographic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`}
                    className="studio-btn studio-btn-icon"
                    title="Download High-Res Diagram (JPG)"
                    aria-label="Download High-Res Diagram"
                  >
                    <Download size={15} />
                  </a>

                  <button
                    type="button"
                    className={`studio-btn studio-btn-icon ${isVisualFullscreen ? 'active' : ''}`}
                    onClick={() => setIsVisualFullscreen(!isVisualFullscreen)}
                    title={isVisualFullscreen ? "Restore Details Panel" : "Fullscreen Canvas Mode"}
                    aria-label="Toggle Fullscreen Canvas"
                  >
                    {isVisualFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>

                  <button
                    type="button"
                    className="studio-btn studio-close-btn"
                    onClick={handleCloseModal}
                    title="Close Diagram (Esc)"
                    aria-label="Close dialog"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Main Studio Body (Responsive Split Layout) */}
              <div className="studio-body-layout">
                {/* Visual Viewport Canvas */}
                <div
                  className={`studio-canvas-stage ${zoomLevel > 1 ? 'is-zoomed' : ''} ${isDragging ? 'is-dragging' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={handleDoubleClick}
                >
                  <div
                    className="studio-canvas-transform"
                    style={{
                      transform: `translate(${canvasPos.x}px, ${canvasPos.y}px) scale(${zoomLevel})`,
                      transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                  >
                    <img
                      src={selectedInfographic.image}
                      alt={selectedInfographic.alt}
                      className="studio-image-display"
                      draggable={false}
                    />
                  </div>

                  {/* Floating Glassmorphic Viewport Dock */}
                  <div className="studio-floating-dock" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="dock-tool-btn"
                      onClick={() => setZoomLevel((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))}
                      disabled={zoomLevel <= 0.75}
                      title="Zoom Out (-)"
                      aria-label="Zoom out"
                    >
                      <ZoomOut size={15} />
                    </button>

                    <span className="dock-zoom-label">{Math.round(zoomLevel * 100)}%</span>

                    <button
                      type="button"
                      className="dock-tool-btn"
                      onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
                      disabled={zoomLevel >= 2.5}
                      title="Zoom In (+)"
                      aria-label="Zoom in"
                    >
                      <ZoomIn size={15} />
                    </button>

                    <div className="dock-separator" />

                    <button
                      type="button"
                      className="dock-tool-btn"
                      onClick={() => {
                        setZoomLevel(1);
                        setCanvasPos({ x: 0, y: 0 });
                      }}
                      title="Reset View (100%)"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw size={14} />
                    </button>

                    <div className="dock-separator" />

                    <a
                      href={selectedInfographic.image}
                      download={`${selectedInfographic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`}
                      className="dock-tool-btn dock-download-link"
                      title="Download High-Res Diagram"
                    >
                      <Download size={14} />
                      <span className="dock-download-text">Save High-Res</span>
                    </a>
                  </div>

                  {/* Canvas Interaction Hint */}
                  <div className="canvas-interaction-hint">
                    <span>Double-click to zoom • Drag to pan when enlarged</span>
                  </div>
                </div>

                {/* Right Educational Inspector Panel */}
                {!isVisualFullscreen && (
                  <div className="studio-inspector-pane">
                    <div className="inspector-scroll-area">
                      <div className="inspector-header">
                        <h3 className="inspector-title">{selectedInfographic.title}</h3>
                        <p className="inspector-summary">{selectedInfographic.summary}</p>
                      </div>

                      {/* Key Educational Takeaways */}
                      <div className="inspector-takeaways-card">
                        <div className="takeaways-header">
                          <div className="takeaways-badge-circle">
                            <Sparkles size={14} />
                          </div>
                          <h4 className="takeaways-title">Key Educational Takeaways</h4>
                        </div>
                        <div className="takeaways-items">
                          {selectedInfographic.keyPoints.map((point, idx) => (
                            <div key={idx} className="takeaway-item-row">
                              <div className="takeaway-check-circle">
                                <CheckCircle2 size={15} />
                              </div>
                              <p className="takeaway-point-text">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Campus Sage Pro-Tip Callout */}
                      {selectedInfographic.proTip && (
                        <div className="inspector-protip-card">
                          <div className="protip-badge-row">
                            <div className="protip-lamp-wrapper">
                              <Lightbulb size={15} />
                            </div>
                            <span className="protip-headline">Campus Sage Pro-Tip</span>
                          </div>
                          <p className="protip-body">{selectedInfographic.proTip}</p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Navigation & Tool Launch Bar */}
                    <div className="inspector-footer-bar">
                      <div className="diagram-nav-controls">
                        <button
                          type="button"
                          className="nav-arrow-btn"
                          onClick={handlePrevDiagram}
                          disabled={currentIndex <= 0}
                          title="Previous Infographic (←)"
                          aria-label="Previous diagram"
                        >
                          <ChevronLeft size={16} />
                          <span>Prev</span>
                        </button>

                        <button
                          type="button"
                          className="nav-arrow-btn"
                          onClick={handleNextDiagram}
                          disabled={currentIndex >= filteredItems.length - 1}
                          title="Next Infographic (→)"
                          aria-label="Next diagram"
                        >
                          <span>Next</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {(() => {
                        const tool = getToolLink(selectedInfographic.type);
                        return (
                          <Link
                            to={tool.path}
                            className="btn btn-primary inspector-tool-btn"
                            onClick={handleCloseModal}
                          >
                            <span>{tool.label}</span>
                            <ExternalLink size={14} />
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
