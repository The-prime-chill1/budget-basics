// Visual learning gallery displaying financial diagrams, high-res infographics, and student blueprints
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Lightbulb,
  Search,
  ExternalLink,
  Coins,
  X,
  ZoomIn
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Modal from '../components/Modal';
import { infographicsData, galleryCategories } from '../data/gallery';
import { useCurrency } from '../context/CurrencyContext';
import './Infographics.css';

export default function Infographics() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfographic, setSelectedInfographic] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
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

  // Map infographic types to relevant interactive tool links
  const getToolLink = (type) => {
    switch (type) {
      case 'pie-breakdown':
        return { path: '/50-30-20', label: 'Open 50/30/20 Calculator' };
      case 'flow-tree':
        return { path: '/needs-vs-wants', label: 'Try Decision Challenge' };
      case 'cycle-flow':
        return { path: '/budgeting-basics', label: 'Read Budgeting Guide' };
      case 'challenge-grid':
        return { path: '/savings-goals', label: 'Set Savings Milestone' };
      case 'comparison-bars':
        return { path: '/expense-planner', label: 'Track Daily Expenses' };
      case 'ladder-steps':
        return { path: '/cockpit', label: 'Open Financial Cockpit' };
      default:
        return { path: '/cockpit', label: 'Open Platform Cockpit' };
    }
  };

  return (
    <div className="infographics-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          title="Financial Infographics & Visual Diagrams"
          subtitle="Explore concept maps, visual budgeting flows, and daily savings blueprints built cleanly with modern CSS & SVG."
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
              placeholder="Search diagrams, formulas or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search infographic library"
            />
          </div>
        </div>

        <div className="gallery-status-bar">
          <span className="gallery-count-text">
            Showing <strong>{filteredItems.length}</strong> of {infographicsData.length} educational diagram{filteredItems.length !== 1 ? 's' : ''}
          </span>
          <span className="gallery-currency-badge">
            <Coins size={13} />
            <span>Active Currency: <strong>{currency.code} ({currency.symbol})</strong></span>
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="gallery-empty-state">
            <p>No infographic diagrams found matching "{searchQuery}".</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
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
                className="gallery-card card interactive"
                onClick={() => setSelectedInfographic(info)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedInfographic(info)}
                aria-label={`View diagram for ${info.title}`}
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
                      <span>Inspect Diagram</span>
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
                    <span className="card-action-text">View Full Infographic</span>
                    <ArrowRight size={14} className="card-action-arrow" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Detailed Educational Modal Dialog */}
        <Modal
          isOpen={!!selectedInfographic}
          onClose={() => setSelectedInfographic(null)}
          title={selectedInfographic?.title}
          maxWidth="760px"
        >
          {selectedInfographic && (
            <div className="modal-info-detail animate-fade-in">
              <div className="modal-top-meta-row">
                <div className="modal-meta-tags">
                  <span className="badge badge-want">{selectedInfographic.category}</span>
                  <span className="section-badge">{selectedInfographic.badge}</span>
                </div>
                <span className="modal-reading-time">
                  <Clock size={12} />
                  <span>{selectedInfographic.readingTime}</span>
                </span>
              </div>

              {/* Infographic Visual Container with Zoom Option */}
              <div className="modal-graphic-hero">
                <img
                  src={selectedInfographic.image}
                  alt={selectedInfographic.alt}
                  className="modal-hero-image"
                />
                <button
                  type="button"
                  className="modal-zoom-btn"
                  onClick={() => setLightboxImage(selectedInfographic)}
                  title="Expand to Fullscreen High-Resolution"
                >
                  <ZoomIn size={14} />
                  <span>Expand High-Res</span>
                </button>
              </div>

              <p className="modal-info-summary">{selectedInfographic.summary}</p>

              {/* Key Educational Takeaways List */}
              <div className="modal-keypoints-box">
                <h4 className="keypoints-title">Key Educational Takeaways:</h4>
                <ul className="keypoints-list">
                  {selectedInfographic.keyPoints.map((point, idx) => (
                    <li key={idx} className="keypoint-item">
                      <CheckCircle2 size={16} className="keypoint-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sage Campus Pro-Tip Callout */}
              {selectedInfographic.proTip && (
                <div className="modal-protip-box">
                  <div className="protip-header">
                    <Lightbulb size={16} className="protip-icon" />
                    <strong>Campus Sage Pro-Tip:</strong>
                  </div>
                  <p className="protip-text">{selectedInfographic.proTip}</p>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedInfographic(null)}
                >
                  Close Diagram
                </button>

                {(() => {
                  const tool = getToolLink(selectedInfographic.type);
                  return (
                    <Link
                      to={tool.path}
                      className="btn btn-primary modal-action-btn"
                      onClick={() => setSelectedInfographic(null)}
                    >
                      <span>{tool.label}</span>
                      <ExternalLink size={14} />
                    </Link>
                  );
                })()}
              </div>
            </div>
          )}
        </Modal>

        {/* Fullscreen High-Resolution Lightbox Overlay */}
        {lightboxImage && (
          <div
            className="infographic-lightbox-overlay animate-fade-in"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="High Resolution Infographic Preview"
          >
            <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-top-bar">
                <h4 className="lightbox-title">{lightboxImage.title}</h4>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setLightboxImage(null)}
                  aria-label="Close high-res view"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="lightbox-image-wrap">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.alt}
                  className="lightbox-full-image"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
