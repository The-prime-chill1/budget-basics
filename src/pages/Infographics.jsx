// Visual learning gallery displaying financial diagrams, high-res infographics, and student blueprints
import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Eye
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { infographicsData, galleryCategories } from '../data/gallery';
import { useCurrency } from '../context/CurrencyContext';
import './Infographics.css';

export default function Infographics() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfographic, setSelectedInfographic] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isVisualFullscreen, setIsVisualFullscreen] = useState(false);
  const [canvasPos, setCanvasPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const { format, currency } = useCurrency();

  // Filter items based on active category and search input
  const filteredItems = useMemo(() => {
    return infographicsData.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.caption.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Current index within filtered items for previous/next navigation
  const currentIndex = useMemo(() => {
    if (!selectedInfographic) return -1;
    return filteredItems.findIndex((item) => item.id === selectedInfographic.id);
  }, [selectedInfographic, filteredItems]);

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
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
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

        <div className="gallery-toolbar-card">
          <div className="gallery-filter-group">
            <div className="filter-label-wrap">
              <Filter size={15} className="filter-icon" />
              <span className="filter-label">Filter Topic:</span>
            </div>
            <div className="filter-pills" role="tablist" aria-label="Infographic Categories">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-search-wrap">
            <Search size={14} className="gallery-search-icon" />
            <input
              type="text"
              className="gallery-search-input"
              placeholder="Search diagrams, rules, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search diagrams"
            />
            {searchQuery && (
              <button
                type="button"
                className="gallery-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="gallery-status-bar">
          <span className="gallery-count-text">
            Showing {filteredItems.length} of {infographicsData.length} educational diagrams
          </span>
          <div className="gallery-currency-badge">
            <Coins size={12} />
            <span>Interactive Visual Guides</span>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="gallery-empty-state">
            <p>No visual diagrams found matching "{searchQuery}".</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map((info) => (
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

        {/* Astonishing High-Resolution Infographic Studio Modal */}
        {selectedInfographic && (
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
          </div>
        )}
      </div>
    </div>
  );
}
