
// Sanitizes user input: strips formatted commas, prevents NaN/Infinity, and validates ranges
export function validateAmount(value, { allowZero = false, min = 0, max = 100000000 } = {}) {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: 'Please enter an amount.', value: 0 };
  }

  const cleanVal = typeof value === 'string' ? value.replace(/,/g, '').trim() : value;
  const num = Number(cleanVal);

  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid numeric amount.', value: 0 };
  }

  if (!allowZero && num === 0) {
    return { isValid: false, error: 'Amount must be greater than zero.', value: 0 };
  }

  if (num < min) {
    return { isValid: false, error: `Amount cannot be less than ₦${min.toLocaleString()}.`, value: 0 };
  }

  if (num > max) {
    return { isValid: false, error: `Amount cannot exceed ₦${max.toLocaleString()}.`, value: 0 };
  }

  return { isValid: true, error: null, value: num };
}

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., student@example.com).' };
  }
  return { isValid: true, error: null };
}

export function validateRequiredText(text, fieldName = 'Field', minLength = 2) {
  if (!text || !text.trim()) {
    return { isValid: false, error: `${fieldName} is required.` };
  }
  if (text.trim().length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters.` };
  }
  return { isValid: true, error: null };
}
