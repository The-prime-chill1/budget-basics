
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
