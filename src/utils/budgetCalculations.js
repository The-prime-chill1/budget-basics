
export function calculate503020(income) {
  const safeIncome = Math.max(0, Number(income) || 0);

  const needs = safeIncome * 0.50;
  const wants = safeIncome * 0.30;
  const savings = safeIncome * 0.20;

  return {
    needs,
    wants,
    savings,
    needsPercentage: 50,
    wantsPercentage: 30,
    savingsPercentage: 20
  };
}

export function calculateCustomBudget(income, needsRatio = 50, wantsRatio = 30, savingsRatio = 20) {
  const safeIncome = Math.max(0, Number(income) || 0);
  const totalRatio = needsRatio + wantsRatio + savingsRatio;

  if (totalRatio === 0) {
    return { needs: 0, wants: 0, savings: 0 };
  }

  return {
    needs: (safeIncome * needsRatio) / 100,
    wants: (safeIncome * wantsRatio) / 100,
    savings: (safeIncome * savingsRatio) / 100
  };
}

export function calculateSavingsGoal(targetAmount, currentSavings, monthlyContribution) {
  const target = Number(targetAmount) || 0;
  const current = Number(currentSavings) || 0;
  const monthly = Number(monthlyContribution) || 0;

  if (target <= 0) {
    return {
      remainingAmount: 0,
      estimatedMonths: 0,
      progressPercentage: 0,
      isCompleted: false,
      error: 'Target amount must be greater than zero.'
    };
  }

  if (current >= target) {
    return {
      remainingAmount: 0,
      estimatedMonths: 0,
      progressPercentage: 100,
      isCompleted: true,
      error: null
    };
  }

  const remaining = Math.max(0, target - current);
  const progressPercentage = Math.min(100, Math.max(0, (current / target) * 100));

  if (monthly <= 0) {
    return {
      remainingAmount: remaining,
      estimatedMonths: 0,
      progressPercentage: Math.round(progressPercentage * 10) / 10,
      isCompleted: false,
      error: 'Please enter a monthly contribution greater than zero to estimate completion time.'
    };
  }

  const estimatedMonths = Math.ceil(remaining / monthly);

  return {
    remainingAmount: remaining,
    estimatedMonths,
    progressPercentage: Math.round(progressPercentage * 10) / 10,
    isCompleted: false,
    error: null
  };
}

export function calculateExpenseSummary(initialIncome, expenses = []) {
  const income = Math.max(0, Number(initialIncome) || 0);

  const totalExpenses = expenses.reduce((sum, item) => {
    const amt = Number(item.amount) || 0;
    return sum + amt;
  }, 0);

  const remainingBalance = income - totalExpenses;
  const spentPercentage = income > 0 ? Math.min(100, (totalExpenses / income) * 100) : 0;

  const categoryBreakdown = expenses.reduce((acc, item) => {
    const cat = item.category || 'Miscellaneous';
    const amt = Number(item.amount) || 0;
    acc[cat] = (acc[cat] || 0) + amt;
    return acc;
  }, {});

  return {
    totalExpenses,
    remainingBalance,
    spentPercentage: Math.round(spentPercentage * 10) / 10,
    categoryBreakdown,
    isOverBudget: remainingBalance < 0
  };
}
