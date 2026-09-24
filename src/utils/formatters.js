/**
 * Utility functions for formatting currency, dates, and numbers.
 * Designed for clear academic explanation and student-friendly output.
 */

/**
 * Format a number as Nigerian Naira (₦).
 * Handles null, undefined, and non-numeric inputs safely.
 * @param {number|string} amount
 * @param {boolean} [showDecimals=false]
 * @returns {string} e.g. "₦50,000" or "₦0"
 */
export function formatCurrency(amount, showDecimals = false) {
  const num = Number(amount);
  if (isNaN(num) || num === null || num === undefined) {
    return '₦0';
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(num);
}

/**
 * Format a decimal number as a percentage string.
 * @param {number} value e.g. 0.5 or 50
 * @param {boolean} isAlreadyPercentage If true, input is 50 instead of 0.5
 * @returns {string} e.g. "50%"
 */
export function formatPercentage(value, isAlreadyPercentage = true) {
  const num = Number(value);
  if (isNaN(num)) return '0%';
  const val = isAlreadyPercentage ? num : num * 100;
  return `${Math.round(val)}%`;
}

/**
 * Format a date string or timestamp into a readable student-friendly format.
 * @param {Date|string|number} dateInput
 * @returns {string} e.g. "Wed, Sep 23, 2026"
 */
export function formatDate(dateInput) {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return '';
  }
}

/**
 * Format live time for the real-time clock widget.
 * @param {Date} dateObj
 * @returns {string} e.g. "06:45:12 PM"
 */
export function formatLiveTime(dateObj) {
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}
