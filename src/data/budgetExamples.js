
export const studentMonthlyBudgetExample = {
  monthlyIncome: 60000,
  incomeSources: [
    { name: 'Monthly Parent/Guardian Allowance', amount: 45000, type: 'Allowance' },
    { name: 'Part-Time Tutoring / Campus Freelancing', amount: 15000, type: 'Earned Income' }
  ],
  categories: [
    {
      id: 'food',
      name: 'Food & Groceries (Hostel/Pantry)',
      type: 'Fixed Need',
      amount: 20000,
      percentage: 33.3,
      description: 'Hostel staples, meal cards, basic cooking ingredients'
    },
    {
      id: 'transport',
      name: 'Campus Transportation & Bus Pass',
      type: 'Fixed Need',
      amount: 8000,
      percentage: 13.3,
      description: 'Daily commute between residence and campus lecture halls'
    },
    {
      id: 'data',
      name: 'Internet Data & Mobile Recharge',
      type: 'Variable Need',
      amount: 6000,
      percentage: 10.0,
      description: 'Research data bundles, study group calls, project submissions'
    },
    {
      id: 'education',
      name: 'Textbooks, Stationery & Printing',
      type: 'Variable Need',
      amount: 5000,
      percentage: 8.3,
      description: 'Course handouts, project printing, notebooks, lab materials'
    },
    {
      id: 'entertainment',
      name: 'Socializing, Snacks & Streaming',
      type: 'Want',
      amount: 9000,
      percentage: 15.0,
      description: 'Weekend outings with friends, movies, treats'
    },
    {
      id: 'savings',
      name: 'Emergency Buffer & Tech Goal',
      type: 'Savings',
      amount: 12000,
      percentage: 20.0,
      description: 'Deposited into personal savings fund before any extra spending'
    }
  ]
};

export const sampleNeedsWantsItems = [
  {
    id: 'item-1',
    name: 'Weekly Hostel Groceries & Rice',
    amount: '₦12,000',
    type: 'need',
    category: 'Nutrition',
    explanation: 'Basic nutritious food is an essential biological requirement for health, focus, and energy in school.'
  },
  {
    id: 'item-2',
    name: 'Campus Bus Ticket / Transit Fare',
    amount: '₦4,500',
    type: 'need',
    category: 'Transportation',
    explanation: 'Transportation is vital to attend lectures on time and maintain attendance requirements.'
  },
  {
    id: 'item-3',
    name: 'Prescription Allergy Medicine',
    amount: '₦3,000',
    type: 'need',
    category: 'Healthcare',
    explanation: 'Medical health and well-being are top-tier non-negotiable survival needs.'
  },
  {
    id: 'item-4',
    name: 'Core Recommended Course Textbook',
    amount: '₦8,500',
    type: 'need',
    category: 'Education',
    explanation: 'Academic materials directly determine your ability to study and pass your coursework.'
  },
  {
    id: 'item-5',
    name: 'Monthly Mobile Academic Data Plan',
    amount: '₦5,000',
    type: 'need',
    category: 'Connectivity',
    explanation: 'Internet access is necessary for attending virtual classes, downloading notes, and submitting assignments.'
  },
  {
    id: 'item-6',
    name: 'Limited Edition Wireless Gaming Headset',
    amount: '₦35,000',
    type: 'want',
    category: 'Entertainment',
    explanation: 'While nice to have for recreation, standard or existing earphones fulfill audio needs at a fraction of the cost.'
  },
  {
    id: 'item-7',
    name: 'VIP Concert Ticket with Friends',
    amount: '₦20,000',
    type: 'want',
    category: 'Leisure',
    explanation: 'Concerts and premium nightlife are purely elective social wants that should come from surplus entertainment funds.'
  },
  {
    id: 'item-8',
    name: 'Daily High-End Cafe Specialty Iced Latte',
    amount: '₦2,800/day',
    type: 'want',
    category: 'Dining',
    explanation: 'Regular home-brewed tea/coffee or water meets hydration needs; specialty barista drinks are discretionary lifestyle choices.'
  },
  {
    id: 'item-9',
    name: 'Designer Brand Graphic Hoodie',
    amount: '₦28,000',
    type: 'want',
    category: 'Fashion',
    explanation: 'Basic warm clothing is a need, but luxury or designer labels represent aesthetic preferences (wants).'
  },
  {
    id: 'item-10',
    name: 'Multi-Screen 4K Video Streaming Subscription',
    amount: '₦6,500/mo',
    type: 'want',
    category: 'Subscriptions',
    explanation: 'Video entertainment is enjoyable recreation, but completely optional when managing a tight student budget.'
  }
];

export const budgetingKnowledgeQuiz = [
  {
    id: 'q-1',
    question: 'What does the term "Paying Yourself First" mean?',
    options: [
      'Buying luxury items as a reward before paying any bills',
      'Transferring a portion of your income into savings before spending on non-essentials',
      'Borrowing money to treat yourself at the start of the semester',
      'Spending all your money so nobody else can take it'
    ],
    correctIndex: 1,
    explanation: 'Paying yourself first means prioritizing your future financial safety by saving upfront rather than hoping money remains at month-end.'
  },
  {
    id: 'q-2',
    question: 'In the classic 50-30-20 budgeting framework, what does the 20% represent?',
    options: [
      'Food & Dining out',
      'Fixed Accommodation',
      'Savings & Debt Repayment / Financial Goals',
      'Entertainment & Hobbies'
    ],
    correctIndex: 2,
    explanation: '20% is allocated to savings, emergency funds, and long-term financial goals.'
  },
  {
    id: 'q-3',
    question: 'Which of the following is considered a "Fixed Expense" for a college student?',
    options: [
      'Campus dormitory / room rental fee',
      'Weekend pizza and cinema with roommates',
      'Random snack purchases between lectures',
      'New clothes for a friend\'s birthday party'
    ],
    correctIndex: 0,
    explanation: 'Fixed expenses are recurring commitments that stay consistent and predictable each month, like rent or standard school tuition.'
  },
  {
    id: 'q-4',
    question: 'How does the "24-Hour Rule" help students make better financial choices?',
    options: [
      'It requires banks to process transfers in under 24 hours',
      'It gives you time to cool down and evaluate if a purchase is a genuine need or a momentary impulse',
      'It forces you to spend your allowance within the first 24 hours',
      'It limits your phone screen time to 24 hours per week'
    ],
    correctIndex: 1,
    explanation: 'Waiting 24 hours removes the emotional dopamine rush of impulse shopping and allows rational logic to take over.'
  }
];
