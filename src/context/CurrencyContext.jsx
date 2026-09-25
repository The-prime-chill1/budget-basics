// Comprehensive Multi-Currency Context: rates relative to NGN default, formatting, conversions, presets
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CURRENCIES = [
  {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    rateFromNgn: 1,
    defaultAmount: 60000,
    minSlider: 10000,
    maxSlider: 300000,
    step: 5000,
    presets: [
      { label: '₦30k Allowance', value: 30000 },
      { label: '₦60k Undergrad', value: 60000 },
      { label: '₦120k Stipend', value: 120000 }
    ]
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'United States',
    rateFromNgn: 0.00067,
    defaultAmount: 1200,
    minSlider: 200,
    maxSlider: 4000,
    step: 50,
    presets: [
      { label: '$500 Work-Study', value: 500 },
      { label: '$1,200 Undergrad', value: 1200 },
      { label: '$2,400 Grad Fellow', value: 2400 }
    ]
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    country: 'United Kingdom',
    rateFromNgn: 0.00052,
    defaultAmount: 900,
    minSlider: 150,
    maxSlider: 3000,
    step: 50,
    presets: [
      { label: '£400 Part-Time', value: 400 },
      { label: '£900 Undergrad', value: 900 },
      { label: '£1,800 Fellow', value: 1800 }
    ]
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'European Union',
    rateFromNgn: 0.00061,
    defaultAmount: 1100,
    minSlider: 200,
    maxSlider: 3500,
    step: 50,
    presets: [
      { label: '€450 Mini-Job', value: 450 },
      { label: '€1,100 Étudiant', value: 1100 },
      { label: '€2,000 Master', value: 2000 }
    ]
  },
  {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    country: 'Ghana',
    rateFromNgn: 0.01,
    defaultAmount: 1200,
    minSlider: 200,
    maxSlider: 5000,
    step: 50,
    presets: [
      { label: 'GH₵500 Allowance', value: 500 },
      { label: 'GH₵1,200 Student', value: 1200 },
      { label: 'GH₵2,500 Hostel', value: 2500 }
    ]
  },
  {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    country: 'Kenya',
    rateFromNgn: 0.086,
    defaultAmount: 12000,
    minSlider: 2000,
    maxSlider: 50000,
    step: 1000,
    presets: [
      { label: 'KSh 5,000 Upkeep', value: 5000 },
      { label: 'KSh 12,000 Campus', value: 12000 },
      { label: 'KSh 25,000 HELB', value: 25000 }
    ]
  },
  {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    country: 'South Africa',
    rateFromNgn: 0.012,
    defaultAmount: 2500,
    minSlider: 500,
    maxSlider: 10000,
    step: 100,
    presets: [
      { label: 'R1,000 NSFAS', value: 1000 },
      { label: 'R2,500 Student', value: 2500 },
      { label: 'R5,000 Allowance', value: 5000 }
    ]
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    country: 'Canada',
    rateFromNgn: 0.00091,
    defaultAmount: 1400,
    minSlider: 300,
    maxSlider: 4500,
    step: 50,
    presets: [
      { label: 'CA$600 Part-Time', value: 600 },
      { label: 'CA$1,400 College', value: 1400 },
      { label: 'CA$2,800 Co-op', value: 2800 }
    ]
  },
  {
    code: 'AUD',
    symbol: 'AU$',
    name: 'Australian Dollar',
    country: 'Australia',
    rateFromNgn: 0.001,
    defaultAmount: 1500,
    minSlider: 300,
    maxSlider: 5000,
    step: 50,
    presets: [
      { label: 'AU$700 Youth', value: 700 },
      { label: 'AU$1,500 Uni', value: 1500 },
      { label: 'AU$3,000 AusStudy', value: 3000 }
    ]
  },
  {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    country: 'India',
    rateFromNgn: 0.056,
    defaultAmount: 10000,
    minSlider: 2000,
    maxSlider: 50000,
    step: 1000,
    presets: [
      { label: '₹4,000 Pocket', value: 4000 },
      { label: '₹10,000 Hostel', value: 10000 },
      { label: '₹20,000 College', value: 20000 }
    ]
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    country: 'Japan',
    rateFromNgn: 0.1,
    defaultAmount: 50000,
    minSlider: 10000,
    maxSlider: 200000,
    step: 5000,
    presets: [
      { label: '¥25k Baito', value: 25000 },
      { label: '¥50k Student', value: 50000 },
      { label: '¥100k Allowance', value: 100000 }
    ]
  },
  {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    rateFromNgn: 0.0024,
    defaultAmount: 2000,
    minSlider: 500,
    maxSlider: 8000,
    step: 100,
    presets: [
      { label: 'AED 800 Upkeep', value: 800 },
      { label: 'AED 2,000 Student', value: 2000 },
      { label: 'AED 4,000 Campus', value: 4000 }
    ]
  },
  {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Riyal',
    country: 'Saudi Arabia',
    rateFromNgn: 0.0025,
    defaultAmount: 2000,
    minSlider: 500,
    maxSlider: 8000,
    step: 100,
    presets: [
      { label: 'SAR 800 Stipend', value: 800 },
      { label: 'SAR 2,000 Student', value: 2000 },
      { label: 'SAR 4,000 Campus', value: 4000 }
    ]
  },
  {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    country: 'China',
    rateFromNgn: 0.0048,
    defaultAmount: 2500,
    minSlider: 500,
    maxSlider: 10000,
    step: 100,
    presets: [
      { label: '¥1,000 Allowance', value: 1000 },
      { label: '¥2,500 Campus', value: 2500 },
      { label: '¥5,000 Monthly', value: 5000 }
    ]
  },
  {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    country: 'Singapore',
    rateFromNgn: 0.0009,
    defaultAmount: 1300,
    minSlider: 300,
    maxSlider: 4500,
    step: 50,
    presets: [
      { label: 'S$600 Allowance', value: 600 },
      { label: 'S$1,300 Poly/Uni', value: 1300 },
      { label: 'S$2,500 Intern', value: 2500 }
    ]
  },
  {
    code: 'MYR',
    symbol: 'RM',
    name: 'Malaysian Ringgit',
    country: 'Malaysia',
    rateFromNgn: 0.003,
    defaultAmount: 1500,
    minSlider: 300,
    maxSlider: 5000,
    step: 50,
    presets: [
      { label: 'RM 600 Allowance', value: 600 },
      { label: 'RM 1,500 Student', value: 1500 },
      { label: 'RM 3,000 Campus', value: 3000 }
    ]
  },
  {
    code: 'PHP',
    symbol: '₱',
    name: 'Philippine Peso',
    country: 'Philippines',
    rateFromNgn: 0.038,
    defaultAmount: 15000,
    minSlider: 3000,
    maxSlider: 60000,
    step: 1000,
    presets: [
      { label: '₱5,000 Baon', value: 5000 },
      { label: '₱15,000 Dorm', value: 15000 },
      { label: '₱30,000 Monthly', value: 30000 }
    ]
  },
  {
    code: 'PKR',
    symbol: 'Rs',
    name: 'Pakistani Rupee',
    country: 'Pakistan',
    rateFromNgn: 0.18,
    defaultAmount: 30000,
    minSlider: 5000,
    maxSlider: 100000,
    step: 2000,
    presets: [
      { label: 'Rs 10,000 Pocket', value: 10000 },
      { label: 'Rs 30,000 Hostel', value: 30000 },
      { label: 'Rs 60,000 Term', value: 60000 }
    ]
  },
  {
    code: 'BDT',
    symbol: '৳',
    name: 'Bangladeshi Taka',
    country: 'Bangladesh',
    rateFromNgn: 0.08,
    defaultAmount: 12000,
    minSlider: 2000,
    maxSlider: 50000,
    step: 1000,
    presets: [
      { label: '৳5,000 Pocket', value: 5000 },
      { label: '৳12,000 Campus', value: 12000 },
      { label: '৳25,000 Mess', value: 25000 }
    ]
  },
  {
    code: 'TRY',
    symbol: '₺',
    name: 'Turkish Lira',
    country: 'Turkey',
    rateFromNgn: 0.023,
    defaultAmount: 8000,
    minSlider: 1500,
    maxSlider: 30000,
    step: 500,
    presets: [
      { label: '₺3,000 Burs', value: 3000 },
      { label: '₺8,000 Öğrenci', value: 8000 },
      { label: '₺16,000 Yurt', value: 16000 }
    ]
  },
  {
    code: 'KRW',
    symbol: '₩',
    name: 'South Korean Won',
    country: 'South Korea',
    rateFromNgn: 0.9,
    defaultAmount: 400000,
    minSlider: 100000,
    maxSlider: 1500000,
    step: 50000,
    presets: [
      { label: '₩200k Alba', value: 200000 },
      { label: '₩400k Student', value: 400000 },
      { label: '₩800k Gosiwon', value: 800000 }
    ]
  },
  {
    code: 'CHF',
    symbol: 'CHF',
    name: 'Swiss Franc',
    country: 'Switzerland',
    rateFromNgn: 0.00058,
    defaultAmount: 1100,
    minSlider: 200,
    maxSlider: 3500,
    step: 50,
    presets: [
      { label: 'CHF 500 Job', value: 500 },
      { label: 'CHF 1,100 Étudiant', value: 1100 },
      { label: 'CHF 2,200 Uni', value: 2200 }
    ]
  },
  {
    code: 'NZD',
    symbol: 'NZ$',
    name: 'New Zealand Dollar',
    country: 'New Zealand',
    rateFromNgn: 0.0011,
    defaultAmount: 1600,
    minSlider: 300,
    maxSlider: 5000,
    step: 50,
    presets: [
      { label: 'NZ$700 Allowance', value: 700 },
      { label: 'NZ$1,600 Uni', value: 1600 },
      { label: 'NZ$3,200 Flat', value: 3200 }
    ]
  },
  {
    code: 'MXN',
    symbol: 'Mex$',
    name: 'Mexican Peso',
    country: 'Mexico',
    rateFromNgn: 0.013,
    defaultAmount: 5000,
    minSlider: 1000,
    maxSlider: 20000,
    step: 250,
    presets: [
      { label: 'Mex$2,000 Beca', value: 2000 },
      { label: 'Mex$5,000 Estudiante', value: 5000 },
      { label: 'Mex$10,000 Mensual', value: 10000 }
    ]
  },
  {
    code: 'BRL',
    symbol: 'R$',
    name: 'Brazilian Real',
    country: 'Brazil',
    rateFromNgn: 0.0037,
    defaultAmount: 1500,
    minSlider: 300,
    maxSlider: 5000,
    step: 50,
    presets: [
      { label: 'R$600 Bolsa', value: 600 },
      { label: 'R$1,500 Estagiário', value: 1500 },
      { label: 'R$3,000 Mensal', value: 3000 }
    ]
  },
  {
    code: 'EGP',
    symbol: 'E£',
    name: 'Egyptian Pound',
    country: 'Egypt',
    rateFromNgn: 0.033,
    defaultAmount: 5000,
    minSlider: 1000,
    maxSlider: 20000,
    step: 500,
    presets: [
      { label: 'E£ 2,000 Upkeep', value: 2000 },
      { label: 'E£ 5,000 Uni', value: 5000 },
      { label: 'E£ 10,000 Term', value: 10000 }
    ]
  },
  {
    code: 'XAF',
    symbol: 'FCFA',
    name: 'Central African CFA',
    country: 'Central Africa (Cameroon, Gabon, Chad)',
    rateFromNgn: 0.4,
    defaultAmount: 40000,
    minSlider: 10000,
    maxSlider: 150000,
    step: 5000,
    presets: [
      { label: '20k FCFA Bourse', value: 20000 },
      { label: '40k FCFA Étudiant', value: 40000 },
      { label: '80k FCFA Mensuel', value: 80000 }
    ]
  },
  {
    code: 'XOF',
    symbol: 'CFA',
    name: 'West African CFA',
    country: 'West Africa (Senegal, Côte d\'Ivoire, Benin)',
    rateFromNgn: 0.4,
    defaultAmount: 40000,
    minSlider: 10000,
    maxSlider: 150000,
    step: 5000,
    presets: [
      { label: '20k CFA Bourse', value: 20000 },
      { label: '40k CFA Étudiant', value: 40000 },
      { label: '80k CFA Mensuel', value: 80000 }
    ]
  },
  {
    code: 'RWF',
    symbol: 'RF',
    name: 'Rwandan Franc',
    country: 'Rwanda',
    rateFromNgn: 0.9,
    defaultAmount: 60000,
    minSlider: 15000,
    maxSlider: 200000,
    step: 5000,
    presets: [
      { label: '25k RF Allowance', value: 25000 },
      { label: '60k RF Campus', value: 60000 },
      { label: '120k RF Monthly', value: 120000 }
    ]
  },
  {
    code: 'UGX',
    symbol: 'USh',
    name: 'Ugandan Shilling',
    country: 'Uganda',
    rateFromNgn: 2.45,
    defaultAmount: 180000,
    minSlider: 30000,
    maxSlider: 600000,
    step: 10000,
    presets: [
      { label: '80k USh Upkeep', value: 80000 },
      { label: '180k USh Campus', value: 180000 },
      { label: '350k USh Hostel', value: 350000 }
    ]
  },
  {
    code: 'TZS',
    symbol: 'TSh',
    name: 'Tanzanian Shilling',
    country: 'Tanzania',
    rateFromNgn: 1.7,
    defaultAmount: 120000,
    minSlider: 20000,
    maxSlider: 500000,
    step: 10000,
    presets: [
      { label: '50k TSh Allowance', value: 50000 },
      { label: '120k TSh Campus', value: 120000 },
      { label: '250k TSh Monthly', value: 250000 }
    ]
  },
  {
    code: 'ZMW',
    symbol: 'ZK',
    name: 'Zambian Kwacha',
    country: 'Zambia',
    rateFromNgn: 0.018,
    defaultAmount: 1500,
    minSlider: 300,
    maxSlider: 5000,
    step: 50,
    presets: [
      { label: 'ZK 500 Allowance', value: 500 },
      { label: 'ZK 1,500 Student', value: 1500 },
      { label: 'ZK 3,000 Campus', value: 3000 }
    ]
  },
  {
    code: 'MAD',
    symbol: 'MAD',
    name: 'Moroccan Dirham',
    country: 'Morocco',
    rateFromNgn: 0.0066,
    defaultAmount: 2000,
    minSlider: 400,
    maxSlider: 7000,
    step: 100,
    presets: [
      { label: 'MAD 800 Bourse', value: 800 },
      { label: 'MAD 2,000 Étudiant', value: 2000 },
      { label: 'MAD 4,000 Mensuel', value: 4000 }
    ]
  },
  {
    code: 'QAR',
    symbol: 'QAR',
    name: 'Qatari Riyal',
    country: 'Qatar',
    rateFromNgn: 0.0024,
    defaultAmount: 2000,
    minSlider: 500,
    maxSlider: 8000,
    step: 100,
    presets: [
      { label: 'QAR 800 Upkeep', value: 800 },
      { label: 'QAR 2,000 Student', value: 2000 },
      { label: 'QAR 4,000 Campus', value: 4000 }
    ]
  },
  {
    code: 'SEK',
    symbol: 'kr',
    name: 'Swedish Krona',
    country: 'Sweden',
    rateFromNgn: 0.007,
    defaultAmount: 6000,
    minSlider: 1000,
    maxSlider: 20000,
    step: 250,
    presets: [
      { label: '2,500 kr CSN', value: 2500 },
      { label: '6,000 kr Student', value: 6000 },
      { label: '12,000 kr Boende', value: 12000 }
    ]
  },
  {
    code: 'NOK',
    symbol: 'kr',
    name: 'Norwegian Krone',
    country: 'Norway',
    rateFromNgn: 0.0071,
    defaultAmount: 6000,
    minSlider: 1000,
    maxSlider: 20000,
    step: 250,
    presets: [
      { label: '2,500 kr Lån', value: 2500 },
      { label: '6,000 kr Student', value: 6000 },
      { label: '12,000 kr Månedlig', value: 12000 }
    ]
  },
  {
    code: 'DKK',
    symbol: 'kr',
    name: 'Danish Krone',
    country: 'Denmark',
    rateFromNgn: 0.0046,
    defaultAmount: 4500,
    minSlider: 800,
    maxSlider: 15000,
    step: 200,
    presets: [
      { label: '1,800 kr SU', value: 1800 },
      { label: '4,500 kr Studerende', value: 4500 },
      { label: '9,000 kr Bolig', value: 9000 }
    ]
  },
  {
    code: 'PLN',
    symbol: 'zł',
    name: 'Polish Zloty',
    country: 'Poland',
    rateFromNgn: 0.0026,
    defaultAmount: 2000,
    minSlider: 400,
    maxSlider: 8000,
    step: 100,
    presets: [
      { label: '800 zł Stypendium', value: 800 },
      { label: '2,000 zł Student', value: 2000 },
      { label: '4,000 zł Miesięcznie', value: 4000 }
    ]
  },
  {
    code: 'IDR',
    symbol: 'Rp',
    name: 'Indonesian Rupiah',
    country: 'Indonesia',
    rateFromNgn: 10.5,
    defaultAmount: 1500000,
    minSlider: 300000,
    maxSlider: 5000000,
    step: 50000,
    presets: [
      { label: 'Rp 600k Uang Saku', value: 600000 },
      { label: 'Rp 1.5M Mahasiswa', value: 1500000 },
      { label: 'Rp 3M Kos', value: 3000000 }
    ]
  }
];

const DEFAULT_CURRENCY_CODE = 'NGN';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCodeState] = useState(() => {
    try {
      return localStorage.getItem('budgetbasics_currency') || DEFAULT_CURRENCY_CODE;
    } catch {
      return DEFAULT_CURRENCY_CODE;
    }
  });

  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  const setCurrency = (newCode) => {
    const found = CURRENCIES.find((c) => c.code === newCode);
    if (!found) return;
    setCurrencyCodeState(found.code);
    try {
      localStorage.setItem('budgetbasics_currency', found.code);
      window.dispatchEvent(new Event('currencychange'));
    } catch (e) {
      console.warn('Could not save currency to localStorage:', e);
    }
  };

  const format = (amount, showDecimals = false) => {
    const num = Number(amount);
    if (isNaN(num)) return `${currency.symbol}0`;

    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0
    }).format(num);

    return `${currency.symbol}${formatted}`;
  };

  const convertFromNgn = (amountInNgn) => {
    const num = Number(amountInNgn) || 0;
    return Math.round(num * currency.rateFromNgn);
  };

  const convertToNgn = (amountInSelected) => {
    const num = Number(amountInSelected) || 0;
    return Math.round(num / currency.rateFromNgn);
  };

  const convert = (amount, fromCode, toCode) => {
    const from = CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0];
    const to = CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[0];
    const amountInNgn = amount / from.rateFromNgn;
    return Math.round(amountInNgn * to.rateFromNgn);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyCode: currency.code,
        currencies: CURRENCIES,
        setCurrency,
        format,
        convertFromNgn,
        convertToNgn,
        convert
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    const fallbackCurrency = CURRENCIES[0];
    return {
      currency: fallbackCurrency,
      currencyCode: fallbackCurrency.code,
      currencies: CURRENCIES,
      setCurrency: () => {},
      format: (val) => `${fallbackCurrency.symbol}${Number(val) || 0}`,
      convertFromNgn: (v) => v,
      convertToNgn: (v) => v,
      convert: (v) => v
    };
  }
  return context;
}
