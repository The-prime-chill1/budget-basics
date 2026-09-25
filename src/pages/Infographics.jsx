import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Filter,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  PieChart,
  Layers,
  Sparkles,
  Zap,
  TrendingDown,
  Clock,
  ShieldCheck
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Modal from '../components/Modal';
import { infographicsData, galleryCategories } from '../data/gallery';
import './Infographics.css';

export default function Infographics() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedInfographic, setSelectedInfographic] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? infographicsData
    : infographicsData.filter((item) => item.category === activeCategory);

  const renderVisualGraphic = (type) => {
    switch (type) {
      case 'pie-breakdown':
        return (
          <div className="graphic-canvas graphic-pie">
            <svg viewBox="0 0 100 100" className="canvas-svg">
              <circle cx="50" cy="50" r="35" fill="none" stroke="#2563eb" strokeWidth="18" strokeDasharray="110 220" strokeDashoffset="55" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#d97706" strokeWidth="18" strokeDasharray="66 220" strokeDashoffset="-55" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#059669" strokeWidth="18" strokeDasharray="44 220" strokeDashoffset="-121" />
            </svg>
            <div className="graphic-labels-row">
              <span className="lbl lbl-need">50% Needs</span>
              <span className="lbl lbl-want">30% Wants</span>
              <span className="lbl lbl-savings">20% Savings</span>
            </div>
          </div>
        );
      case 'flow-tree':
        return (
          <div className="graphic-canvas graphic-flow">
            <div className="flow-step step-1">Essential for Health/School?</div>
            <div className="flow-arrows-split">
              <div className="split-branch branch-green">YES &rarr; Need (50%)</div>
              <div className="split-branch branch-orange">NO &rarr; Delay 30 Days</div>
            </div>
          </div>
        );
      case 'cycle-flow':
        return (
          <div className="graphic-canvas graphic-cycle">
            <div className="cycle-ring">
              <span className="cycle-node node-plan">1. Plan</span>
              <span className="cycle-node node-track">2. Track</span>
              <span className="cycle-node node-review">3. Review</span>
              <span className="cycle-node node-adjust">4. Adjust</span>
            </div>
          </div>
        );
      case 'challenge-grid':
        return (
          <div className="graphic-canvas graphic-challenge">
            <div className="challenge-mini-grid">
              {[300, 400, 500, 600, 700, 800, 1000, 1200].map((val, i) => (
                <div key={i} className="mini-box">Day {i + 1}: ₦{val}</div>
              ))}
            </div>
            <div className="challenge-goal-tag">Target: ₦25,000 Buffer</div>
          </div>
        );
      case 'comparison-bars':
        return (
          <div className="graphic-canvas graphic-comparison">
            <div className="bar-row">
              <span>1 Day: ₦1,000</span>
              <div className="comp-bar bar-1"></div>
            </div>
            <div className="bar-row">
              <span>1 Month: ₦30,000</span>
              <div className="comp-bar bar-2"></div>
            </div>
            <div className="bar-row">
              <span>1 Year: ₦365,000</span>
              <div className="comp-bar bar-3"></div>
            </div>
          </div>
        );
      case 'ladder-steps':
        return (
          <div className="graphic-canvas graphic-ladder">
            <div className="ladder-step step-4">4. Goal Mastery (Invest/Grow)</div>
            <div className="ladder-step step-3">3. Buffer Cushion (₦25k Safety)</div>
            <div className="ladder-step step-2">2. Daily Tracking (Awareness)</div>
            <div className="ladder-step step-1">1. Allowance Knowing</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="infographics-page page-wrapper animate-fade-in">
      <div className="app-container">
        <SectionHeading
          badge="Visual Learning Gallery"
          title="Financial Infographics & Visual Diagrams"
          subtitle="Explore concept maps, visual budgeting flows, and daily savings blueprints built cleanly with modern CSS & SVG."
        />

        <div className="gallery-filter-bar">
          <div className="gallery-filter-group">
            <Filter size={16} className="filter-icon" />
            <span className="filter-label">Filter Topic:</span>
            <div className="filter-pills">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <span className="gallery-count-text">
            Showing {filteredItems.length} visual{filteredItems.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="gallery-grid">
          {filteredItems.map((info) => (
            <div
              key={info.id}
              className="gallery-card card interactive"
              onClick={() => setSelectedInfographic(info)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedInfographic(info)}
              aria-label={`View details for ${info.title}`}
            >
              <div className="gallery-visual-frame">
                {renderVisualGraphic(info.type)}
                <div className="visual-overlay">
                  <span className="overlay-pill">
                    <Maximize2 size={13} />
                    <span>View Diagram</span>
                  </span>
                </div>
              </div>

              <div className="gallery-card-body">
                <div className="card-top-meta">
                  <span className="badge badge-want">{info.category}</span>
                  <span className="info-badge-text">{info.badge}</span>
                </div>
                <h3 className="info-card-title">{info.title}</h3>
                <p className="info-card-caption">{info.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={!!selectedInfographic}
          onClose={() => setSelectedInfographic(null)}
          title={selectedInfographic?.title}
          maxWidth="640px"
        >
          {selectedInfographic && (
            <div className="modal-info-detail animate-fade-in">
              <div className="modal-graphic-hero">
                {renderVisualGraphic(selectedInfographic.type)}
              </div>

              <div className="modal-badge-row">
                <span className="badge badge-want">{selectedInfographic.category}</span>
                <span className="section-badge">{selectedInfographic.badge}</span>
              </div>

              <p className="modal-info-summary">{selectedInfographic.summary}</p>

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

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedInfographic(null)}
                >
                  Close Diagram
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
