// Formatting helpers for multi-currency values and localized dates
import { CURRENCIES } from '../context/CurrencyContext';

export function formatCurrency(amount, showDecimals = false, isBaseNgn = false, overrideCurrency = null) {
  const num = Number(amount);
  if (isNaN(num) || num === null || num === undefined) {
    return '₦0';
  }

  let symbol = '₦';
  let converted = num;
  try {
    let curr = overrideCurrency;
    if (!curr) {
      const savedCode = localStorage.getItem('budgetbasics_currency') || 'NGN';
      curr = CURRENCIES.find((c) => c.code === savedCode) || CURRENCIES[0];
    }
    symbol = curr.symbol;
    if (isBaseNgn && curr.code !== 'NGN' && curr.rateFromNgn) {
      converted = Math.round(num * curr.rateFromNgn);
    }
  } catch {
    symbol = '₦';
  }

  const formattedNum = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  }).format(converted);

  return `${symbol}${formattedNum}`;
}

// Automatically detects embedded currency amounts (e.g. ₦45,000, ₦1,000) and converts them to active currency
export function localizeCurrencyText(text, currency, convertFromNgn, format) {
  if (!text || typeof text !== 'string') return text;
  return text.replace(/₦\s*([0-9,]+)/g, (match, rawNum) => {
    const num = Number(rawNum.replace(/,/g, ''));
    if (isNaN(num)) return match;
    if (!currency || currency.code === 'NGN') return `₦${num.toLocaleString()}`;
    const converted = convertFromNgn ? convertFromNgn(num) : Math.round(num * (currency.rateFromNgn || 1));
    return format ? format(converted) : `${currency.symbol}${converted.toLocaleString()}`;
  });
}

export function formatPercentage(value, isAlreadyPercentage = true) {
  const num = Number(value);
  if (isNaN(num)) return '0%';
  const val = isAlreadyPercentage ? num : num * 100;
  return `${Math.round(val)}%`;
}

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

export function formatLiveTime(dateObj) {
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}
