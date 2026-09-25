// Global Currency Selector dropdown component with search, zero emojis, and persistent context
import React, { useState, useRef, useEffect } from 'react';
import { Coins, ChevronDown, Check, Search } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import './CurrencySelector.css';

export default function CurrencySelector({ compact = false, className = '' }) {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredCurrencies = currencies.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    );
  });

  const handleSelect = (code) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div
      className={`currency-selector-root ${compact ? 'is-compact' : ''} ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`currency-selector-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={`Operating Currency: ${currency.name} (${currency.code}) - Click to change`}
      >
        <span className="currency-btn-icon-wrap">
          <Coins size={14} className="currency-btn-icon" />
        </span>
        <span className="currency-btn-label">
          <span className="currency-btn-sym">{currency.symbol}</span>
          <span className="currency-btn-code">{currency.code}</span>
        </span>
        <ChevronDown
          size={12}
          className={`currency-btn-caret ${isOpen ? 'rotated' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="currency-dropdown-card animate-fade-in" role="listbox">
          <div className="currency-dropdown-header">
            <span className="currency-dropdown-title">Select Operating Currency</span>
            <span className="currency-default-tag">Naira Default</span>
          </div>

          <div className="currency-search-box">
            <Search size={13} className="currency-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="currency-search-input"
              placeholder="Search currency, symbol or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter currencies"
            />
          </div>

          <div className="currency-options-list">
            {filteredCurrencies.length === 0 ? (
              <div className="currency-no-results">No currency matching "{searchQuery}"</div>
            ) : (
              filteredCurrencies.map((c) => {
                const isSelected = c.code === currency.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`currency-option-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(c.code)}
                  >
                    <span className="currency-sym-pill">{c.symbol}</span>
                    <div className="currency-option-details">
                      <div className="currency-option-primary">
                        <strong className="currency-option-code">{c.code}</strong>
                        <span className="currency-option-name">{c.name}</span>
                      </div>
                      <span className="currency-option-region">{c.country}</span>
                    </div>
                    {isSelected && (
                      <span className="currency-option-check">
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
