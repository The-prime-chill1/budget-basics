// Curated financial literacy knowledge base for matching student questions with practical answers

export const suggestedPrompts = [
  'What is the 50-30-20 rule?',
  'What is a need vs a want?',
  'I am broke before month end',
  'How do I deal with student debt?',
  'How much should a student save?',
  'How do I avoid overspending?',
  'How can I make money on campus?'
];

export const chatbotKnowledge = [
  {
    id: 'general_financial_problem',
    keywords: [
      'financial problem',
      'money problem',
      'financial trouble',
      'financial crisis',
      'struggling with money',
      'money stress',
      'stressed about money',
      'financial stress',
      'financial anxiety',
      'need financial help',
      'help with money',
      'bad financial situation',
      'in trouble financially',
      'money is tight',
      'financial issue',
      'finances are a mess'
    ],
    title: 'Financial Problem Triage & Emergency Recovery',
    response:
      '**I hear you, and please take a deep breath: money emergencies are stressful, but every financial problem has a practical, step-by-step solution.**\n\nHere is your immediate 4-step emergency triage plan:\n\n1. **Stop the Bleeding**: Immediately pause all non-essential spending for the next 7 days. Zero takeaways, zero paid outings, and zero impulse purchases.\n2. **Triage the Essentials**: Separate your survival costs (food, hostel roof, urgent medicine, school transport) from everything else. Survival comes first.\n3. **Audit Available Cash**: Check every bank account, cash in your wallet, and loose funds so you know your exact real balance.\n4. **Build a 7-Day Survival Budget**: Divide whatever cash you have by the days left until your next income or allowance arrives.\n\n*Tell me more about your specific situation—is your main challenge being broke, dealing with debt, paying hostel rent, or affording campus meals?*',
    explanation:
      '**Let me help you break down your financial problem right now:**\n\nWhen you are stressed about money, your brain enters panic mode, making it hard to think clearly. Let\'s simplify:\n\n• **If you have ₦0 right now**: Check my advice for *"I am broke"* to secure emergency food and campus assistance without high-interest loans.\n• **If someone is asking you to pay back debt**: Check my advice for *"student debt and loans"* to negotiate structured repayments.\n• **If hostel rent or school fees are due**: Check my advice for *"hostel rent"* or *"school fees"* to request split payment plans with administrators.\n\n Use our **50/30/20 Calculator** and **Expense Planner** in the top navigation menu to map out your cash flow and regain complete control of your finances.'
  },
  {
    id: 'broke_emergency',
    keywords: [
      'broke',
      'no money',
      'empty account',
      'sapa',
      'zero money',
      'zero naira',
      'zero balance',
      'out of cash',
      'out of money',
      'ran out of money',
      'completely broke',
      'starving',
      'no food',
      'hungry',
      'survive',
      'how to survive',
      'how do i survive',
      'surviving',
      'urgent cash',
      'broke student'
    ],
    title: 'Emergency Survival Plan for When You Are Broke',
    response:
      '**Being broke is tough, but you can get through this without panicking or taking predatory loans!**\n\nHere is your immediate 5-step survival checklist:\n\n1. **Do a Room Pantry Audit**: Count all food staples in your hostel or room right now (rice, noodles, garri, beans, eggs, seasonings). Most students discover 3 to 5 days of meals they forgot they had.\n2. **Cook in Bulk & Share**: Partner with a roommate or trusted coursemate to pool ingredients and cook large shared pots. Shared cooking cuts meal costs by up to 50%.\n3. **Cut Non-Essentials to Zero**: Walk short campus distances instead of hailing rides, and use university library Wi-Fi for study downloads to protect mobile data.\n4. **Check Campus Emergency Support**: Visit your institution\'s student affairs office, campus chapel/mosque welfare team, or departmental student association—many offer emergency food banks or micro-grants for students in need.\n5. **Sell Unused Items**: Sell course textbooks you\'ve passed, extra clothes, or unused gadgets on your campus WhatsApp groups for immediate cash.',
    explanation:
      '**How to survive until your next allowance without borrowing:**\n\n• **The ₦1,000/Day Rule**: If you have ₦7,000 left for 7 days, you have strictly ₦1,000 per day. Spend only on wholesome food staples that fill you up (beans, eggs, oats, garri).\n• **Avoid Loan Sharks**: Never borrow from quick online lending apps when broke. Their interest rates (up to 30-100% per month) turn a temporary shortage into a months-long crisis.\n• **Next Month Prevention**: When your next allowance comes, immediately lock 20% into savings and divide the rest into 4 weekly envelopes using our **Expense Planner**.'
  },
  {
    id: 'student_debt_loans',
    keywords: [
      'debt',
      'owe',
      'owing',
      'loan',
      'loan app',
      'loans',
      'borrow',
      'borrowed',
      'pay back',
      'creditor',
      'calling my contacts',
      'harassment',
      'defamation',
      'threats',
      'threatened',
      'credit',
      'in debt',
      'too much debt',
      'how to pay debt'
    ],
    title: 'How to Manage & Eliminate Student Debt',
    response:
      '**Dealing with debt feels overwhelming, but you can systematically take back control with this roadmap:**\n\n1. **Stop Taking New Loans**: Never take a new loan to pay off an old one. That is the quickest way to fall into a dangerous compounding debt spiral.\n2. **List Every Debt on Paper**: Write down: Who you owe, the exact amount, interest rate, and due date.\n3. **Prioritize High-Stress Debts**: Focus extra funds on the most toxic debt first (e.g., predatory loan apps or close personal relationships) while paying the minimum on others.\n4. **Communicate Early & Transparently**: If you owe a friend or landlord, message them before the due date: *"I haven\'t forgotten my commitment. I have ₦5,000 this week and will pay the remainder in two installments on [Date]. Thank you for your patience."*\n5. **Report Predatory Harassment**: If illegal loan apps threaten you or message your contacts, report them to consumer protection authorities (FCCPC in Nigeria) and seek guidance from campus legal counsel.',
    explanation:
      '**The Student Debt Snowball Method:**\n\n1. Order your debts from smallest balance to largest balance.\n2. Pay off the smallest debt with maximum intensity (use savings, side gig income, or cut all discretionary spending).\n3. Once the smallest debt is zero, roll that entire payment into the next smallest.\n\nSeeing one debt completely disappear gives you immense psychological momentum and relieves student stress fast!'
  },
  {
    id: 'hostel_rent_housing',
    keywords: [
      'rent',
      'hostel',
      'accommodation',
      'landlord',
      'lodge',
      'eviction',
      'house rent',
      'hostel fee',
      'room rent',
      'housing',
      'cant pay rent',
      'rent due'
    ],
    title: 'Handling Hostel Rent & Accommodation Deadlines',
    response:
      '**Hostel rent deadlines are a major student stressor. Here is how to handle accommodation shortages proactively:**\n\n1. **Do Not Wait Until the Deadline**: Talk to your landlord or hostel manager 3 to 4 weeks ahead of time. Proactive tenants get far more leniency than tenants who disappear on due date.\n2. **Propose a Structured Split Payment**: Offer to pay 50% now and the remaining 50% in 30 to 60 days. Put the agreement in writing (SMS or signed letter).\n3. **Find a Roommate to Co-Share**: Sharing your room with a vetted coursemate immediately cuts your rent, cooking gas, electricity, and water bills in half.\n4. **Check University On-Campus Hostels**: On-campus halls of residence are often 60% cheaper than private off-campus lodges. Check with the campus accommodation office for open allocations.\n5. **Campus Hardship & Alumni Funds**: Inquire at your Student Affairs Division about emergency housing bursaries or alumni-sponsored lodging grants.',
    explanation:
      '**A polite script to propose split rent to your landlord:**\n\n*"Good day Mr. [Landlord Name], I am writing regarding my hostel room renewal. Due to unexpected academic expenses this semester, I have ₦[Amount] available today and would like to pay that immediately. I kindly request to clear the remaining balance on [Specific Date]. I value keeping my room and will ensure this timeline is met. Thank you for your understanding."*'
  },
  {
    id: 'school_fees_tuition',
    keywords: [
      'school fees',
      'tuition',
      'exam clearance',
      'faculty fee',
      'departmental fee',
      'acceptance fee',
      'fees',
      'cant pay fees',
      'fees deadline',
      'exam docket',
      'tuition fee'
    ],
    title: 'Managing School Fees & Tuition Deadlines',
    response:
      '**Falling behind on tuition is stressful, but institutions offer institutional pathways to help students stay enrolled:**\n\n1. **Visit the Bursary / Student Accounts Office**: Request an official installment clearance or tuition deferral form. Most universities allow 60/40 or semester split payments before exam clearance.\n2. **Apply for Student Loan Schemes**: Inquire about government student loans (such as NELFUND in Nigeria) and state educational bursary boards that cover tuition costs directly.\n3. **Faculty & Alumni Emergency Funds**: Many departments, alumni associations, and student unions maintain emergency bursary funds for students in final exam clearance crises.\n4. **Reach Out to Family with a Formal Plan**: Present an honest breakdown of the exact fee shortfall along with your current grade transcript to demonstrate your dedication to graduating.\n5. **Inquire About Campus Work-Study**: Many institutions provide student work-study positions (library assistant, lab attendant, campus administration) that credit wages directly toward tuition.',
    explanation:
      '**Action steps for exam clearance pressure:**\n\nNever wait until the day before the first exam to address a fee shortfall. Academic boards and deans can grant temporary exam clearance undertakings when students apply through their Head of Department (HOD) early.'
  },
  {
    id: 'food_groceries_budget',
    keywords: [
      'food',
      'eating',
      'cook',
      'groceries',
      'cooking',
      'canteen',
      'cafeteria',
      'meals',
      'skip meals',
      'provisions',
      'cheap food',
      'food budget',
      'food money',
      'save on food'
    ],
    title: 'Eating Well & Cutting Food Costs on Campus',
    response:
      '**Food is usually a student\'s largest monthly expense, but simple habits can cut your food bill by 40-60%:**\n\n1. **Buy in Open Wholesale Markets, Not Campus Kiosks**: Buying staples like rice, garri, beans, spaghetti, and oil in bulk measures (paint buckets or cartons) at main local markets is 30-50% cheaper than tiny convenience shops.\n2. **Batch Cooking on Weekends**: Cook a large pot of stew, soup, or beans on Sunday and store in portions. This eliminates the daily temptation of ordering expensive takeout when exhausted after lectures.\n3. **Carry Campus Water & Snacks**: Buying bottled water (₦150-₦300) and small snacks 3 times a day costs over ₦15,000/month. A reusable water bottle and hostel-packed snacks save significant cash.\n4. **Partner Up with Friends**: Sharing cooking responsibilities with a roommate allows you to share cooking gas, spices, and oil while eating balanced meals every day.\n5. **Focus on High-Protein, Low-Cost Staples**: Eggs, beans, soy chunks, peanuts, oats, and seasonal greens provide long-lasting brain energy at a fraction of fast-food prices.',
    explanation:
      '**The ₦500 vs. ₦2,500 Rule:**\n\nA plate of cooked hostel food (beans, rice, and egg) costs roughly **₦500 to ₦700** when cooked from bulk ingredients. The same plate at a campus restaurant costs **₦2,000 to ₦2,800**. Over 20 school days, cooking saves you over **₦35,000** every single month!'
  },
  {
    id: 'peer_pressure_fomo',
    keywords: [
      'peer pressure',
      'friends',
      'fomo',
      'outing',
      'party',
      'club',
      'impress',
      'social life',
      'dating',
      'expensive friends',
      'hang out',
      'cant keep up',
      'friends spending'
    ],
    title: 'Navigating Peer Pressure & Social Spending',
    response:
      '**You don\'t have to go broke to have great friends. Here is how to protect your finances and keep your social life:**\n\n1. **Remember That People Have Different Backgrounds**: Some coursemates have unlimited allowances, while others are funding their own education. Trying to match someone else\'s spending is a fast track to financial hardship.\n2. **Master the Polite Decline**: Use clear, confident scripts: *"I am on a tight project savings sprint this month, so I\'ll skip the lounge, but let\'s hang out on campus tomorrow!"*\n3. **Suggest Low-Cost Alternatives**: Instead of expensive restaurant outings, host a hostel movie night, play board games, or study together in the library.\n4. **True Friends Respect Boundaries**: Real friends who care about your future will never shame you for budgeting. Anyone who mocks your financial discipline will not pay your rent when you are broke.\n5. **Set a Dedicated 30% "Wants" Cap**: Use our **50/30/20 Rule** to give yourself a guilt-free fun budget. When that monthly fun cap is reached, social plans pause until next month.',
    explanation:
      '**The "Cost-Per-Hour" Test:**\n\nBefore spending ₦10,000 on a single night out, ask yourself: *"How many hours of hard work or days of campus allowance does this represent?"* If an outing equals 5 days of your food money, it is simply not worth the regret!'
  },
  {
    id: 'family_pressure_black_tax',
    keywords: [
      'family',
      'black tax',
      'parents',
      'siblings',
      'relatives',
      'send money',
      'home pressure',
      'family asking',
      'financial guilt',
      'family demands'
    ],
    title: 'Managing Family Demands & Financial Guilt (Black Tax)',
    response:
      '**Balancing love for your family with student financial limits is emotionally challenging. Here is how to navigate it:**\n\n1. **The Airplane Oxygen Mask Principle**: You must secure your own oxygen mask before helping the person next to you. If you give away your textbook, exam, or meal money, you jeopardize your graduation—which helps nobody long-term.\n2. **Set Firm, Respectful Boundaries**: Communicate honestly: *"I care deeply about family, but my current allowance is strictly allocated to my exam registration and accommodation. Once I finish school and begin working, I will be in a much stronger position to assist."*\n3. **Offer Time & Non-Monetary Support**: If a sibling needs help, offer academic tutoring, research assistance, or advice instead of cash when your student budget is zero.\n4. **Keep Your Savings Private**: You are not obligated to broadcast your bank account balance or savings goals. Keeping financial goals private protects you from unfair expectations.',
    explanation:
      '**Remember**: Graduating with peace of mind, high grades, and marketable skills is the greatest long-term gift you can give your family. Protect your educational runway!'
  },
  {
    id: 'impulse_shopping_regret',
    keywords: [
      'impulse',
      'regret',
      'online shopping',
      'flash sale',
      'addiction',
      'bought something',
      'wasted money',
      'shopping urge',
      'stop buying',
      'buyer remorse'
    ],
    title: 'Overcoming Impulse Buying & Regretful Purchases',
    response:
      '**If you recently wasted money on an impulse buy, don\'t beat yourself up: learn from it and take these recovery steps:**\n\n1. **Check for Refunds or Reselling**: Can you return the item for a refund? If not, take clear photos and post it on campus WhatsApp student marketplaces to recoup 80-90% of your cash.\n2. **The 24-Hour Cooling Rule**: For future purchases, enforce a mandatory 24-hour waiting period before buying any non-essential item over ₦2,000. In 80% of cases, the urge disappears completely.\n3. **Remove Saved Payment Cards**: Delete card credentials from shopping apps and food delivery platforms. Having to manually find your card and type 16 digits creates friction that stops impulse spending.\n4. **Unsubscribe from Marketing Notifications**: Turn off promotional flash sale alerts, marketing emails, and shopping push notifications that create artificial urgency.',
    explanation:
      '**Use the "Price Tag in Hours" Mental Model:**\n\nWhenever you are tempted to buy sneakers or gadgets on impulse, convert the price into study or work hours: *"Is this jacket worth 2 weeks of campus meals?"* Seeing money in terms of your time and survival stops impulse urges immediately.'
  },
  {
    id: 'gadget_laptop_phone_repair',
    keywords: [
      'repair',
      'broken screen',
      'stolen phone',
      'laptop crashed',
      'fix phone',
      'phone screen',
      'charger',
      'gadget',
      'laptop broke',
      'phone broke',
      'laptop repair'
    ],
    title: 'Handling Gadget, Phone & Laptop Emergencies',
    response:
      '**A broken phone or laptop during the semester is a nightmare. Here is how to handle tech emergencies without getting scammed:**\n\n1. **Don\'t Panic into Buying New on Credit**: Rushing into high-interest gadget financing is a major trap. Explore repair or temporary borrowing first.\n2. **Get 3 Independent Repair Quotes**: Never leave your device with the first technician you see. Ask coursemates for trusted recommendations and get 3 written price quotes.\n3. **Use Campus Computer Labs**: University libraries, department IT centers, and faculty cyber-labs provide free computer access for course assignments while you save for repairs.\n4. **Cloud Backup Everything Today**: Use free Google Drive, OneDrive, or GitHub to keep all project files backed up so broken hardware never means lost academic work.\n5. **Start a Tech Sinking Fund**: Use our **Savings Goals Calculator** to save ₦3,000 to ₦5,000 monthly specifically for gadget maintenance.',
    explanation:
      '**Safety tip for campus gadget repairs:**\n\nAlways ask the technician to diagnose the issue in your presence, and agree on the total parts and labor price before any work begins. Never leave memory cards or sensitive logins on devices undergoing repair.'
  },
  {
    id: 'betting_gambling_crypto_losses',
    keywords: [
      'bet',
      'betting',
      'sporty',
      'stake',
      'crypto',
      'forex',
      'loss',
      'lost all my money',
      'gambling',
      'cashed out',
      'trading',
      'lost money'
    ],
    title: 'Recovering from Betting, Gambling & High-Risk Losses',
    response:
      '**I am glad you are talking to me. Gambling, betting, and speculative trading losses happen to many students, and there is zero judgment here. You CAN rebuild.**\n\nHere are the critical first steps:\n\n1. **STOP Immediately — Never Chase Losses**: Chasing losses with "one last bet" or "one more trade" is mathematically proven to double your losses. Accept the loss as an expensive lesson and stop the bleeding right now.\n2. **Delete All Betting & Trading Apps**: Remove accounts, delete apps, and block gambling sites on your browser so temptation is physically removed.\n3. **Secure Your Basic Survival Today**: If you lost your food or rent money, talk to a trusted friend, family member, or campus counselor immediately. Tell the truth: keeping it secret increases isolation and stress.\n4. **Commit to Guaranteed Math, Not Luck**: Real wealth is built through steady savings (the **50/30/20 Rule**) and high-income skills, not algorithms designed for the house to win.\n5. **Campus Support is Available**: Speak to your student guidance and counseling center for confidential support if you feel urges to gamble.',
    explanation:
      '**The Mathematics of Betting:**\n\nBetting companies and casinos spend billions optimizing their odds so that the house ALWAYS wins over time. You are competing against supercomputers and statistical models. Channeling your intelligence into tech, academics, and practical skills guarantees lifetime returns that no betting slip can match.'
  },
  {
    id: 'making_money_side_hustles',
    keywords: [
      'make money',
      'side hustle',
      'income',
      'earn',
      'extra cash',
      'freelance',
      'campus job',
      'skills',
      'part time',
      'hustle',
      'make extra money',
      'student hustle'
    ],
    title: 'High-Value Student Side Hustles & Income Ideas',
    response:
      '**Earning your own income as a student builds immense confidence! Here are practical, high-leverage side hustles that don\'t destroy your GPA:**\n\n1. **Digital & Creative Skills**: Graphic design (Canva/Photoshop for campus flyers), video editing for content creators, social media management, and basic web building.\n2. **Academic Tutoring & Document Formatting**: Tutor junior students in challenging core subjects or charge for formatting final-year thesis documents and presentations.\n3. **Campus Convenience Services**: Laundry drop-off/pickup service, mobile campus hair styling or barbering, campus snack/cookie supplies, or errand delivery.\n4. **Freelance Writing & Virtual Assistance**: Research assistance, proofreading course assignments, or transcription on platforms like Upwork or local business communities.\n5. **The 15-Hour Golden Rule**: Keep your side hustle capped at **10 to 15 hours per week max**. Your primary investment is finishing your degree with excellence!',
    explanation:
      '**How to start with ₦0 capital today:**\n\nIdentify one skill you already have (good at math, good at design, fast at typing). Post a simple, clean announcement on your department WhatsApp group: *"Hey guys, I\'m offering professional PowerPoint slide design and report formatting for course seminars at student-friendly rates."* Your first 3 clients are usually sitting right next to you in class!'
  },
  {
    id: 'inflation_transport_costs',
    keywords: [
      'inflation',
      'prices high',
      'expensive',
      'transport fare',
      'bus fare',
      'cost of living',
      'high cost',
      'price increase',
      'rising prices',
      'transportation'
    ],
    title: 'Beating Inflation & High Campus Transport Costs',
    response:
      '**Rising transport fares and inflation hit students hardest. Here is how to protect your wallet:**\n\n1. **Carpool & Transit Coalitions**: Team up with coursemates living along the same route to split taxi/keke fares or negotiate monthly group rates with campus transport operators.\n2. **Consolidate Campus Days**: Stay on campus for the entire day. Pack lunch, water, and work from the library between classes instead of commuting back and forth multiple times.\n3. **Leverage Institutional Subsidies**: Check if your university runs subsidized campus shuttle buses or student transit passes, which are often 50% cheaper than public commercial buses.\n4. **Download on Campus Wi-Fi**: Mobile data prices increase regularly. Do all course downloads, lecture slide syncs, and video streaming on free university Wi-Fi networks.',
    explanation:
      '**Tracking Inflation with the Expense Planner:**\n\nUse our built-in **Expense Planner** to track your weekly transport and food bills. Seeing exact trends helps you adjust discretionary spending before inflation creates a budget deficit.'
  },
  {
    id: 'bank_charges_hidden_fees',
    keywords: [
      'bank charge',
      'bank charges',
      'deduction',
      'sms alert fee',
      'maintenance fee',
      'hidden charges',
      'card fee',
      'unauthorized deduction',
      'bank deduction'
    ],
    title: 'Eliminating Bank Charges & Card Maintenance Fees',
    response:
      '**Hidden banking fees quietly drain thousands of naira from student accounts every year. Here is how to stop them:**\n\n1. **Turn Off Paid SMS Alerts**: In your mobile banking app or branch, switch from SMS alerts (which charge per message) to **free email alerts and instant push notifications**.\n2. **Switch to Student Zero-Fee Accounts**: Open an account with digital banks that charge zero card maintenance fees, zero account maintenance fees, and offer free bank transfers.\n3. **Avoid Out-of-Network ATM Charges**: Most banks charge extra fees when you withdraw from rival ATMs more than 3 times in a month. Plan your cash withdrawals from your primary bank\'s ATMs.\n4. **Watch Out for Unused Subscriptions**: Check your bank statement for recurring app charges, forgotten trial subscriptions, and debit card auto-renewals.',
    explanation:
      '**How much this saves you:**\n\nCancelling SMS alerts and switching to a zero-fee digital student account easily saves **₦1,500 to ₦3,500 every month**—that is over ₦30,000/year back in your pocket for school books and food!'
  },
  {
    id: 'needs_vs_wants',
    keywords: [
      'needs vs wants',
      'need vs want',
      'needs and wants',
      'needs or wants',
      'what is a need',
      'what is a want',
      'difference between need and want',
      'difference between needs and wants',
      'wants and needs',
      'classify needs',
      'essential vs non-essential',
      'needs vs',
      'wants vs'
    ],
    title: 'Needs vs. Wants Explained',
    response:
      'A **Need** is an essential requirement for health, basic survival, safety, or academic continuation (e.g., nutritious food, school transport, textbooks, essential medicine, shelter).\n\nA **Want** is something that increases comfort or entertainment but isn\'t vital for survival (e.g., designer sneakers, video games, eating at fancy restaurants, extra subscriptions).\n\n*Rule of thumb: If delaying the purchase causes real harm or academic penalty, it is a Need. Otherwise, it is a Want.*',
    explanation:
      '**Let me break down Needs vs. Wants with a simple campus example:**\n\nImagine you are walking across campus with ₦3,000 in your pocket:\n\n• **NEED (Survival & Academics)**: You haven\'t eaten all afternoon and you need to pay ₦500 for the campus bus home. Buying a wholesome plate of food (₦1,200) and paying your bus fare (₦500) are **Needs**—if you skip them, you go hungry or get stranded.\n\n• **WANT (Pleasure & Upgrades)**: Seeing your friends ordering iced boba smoothies and ₦1,500 chicken wings when you already have food at your hostel is a **Want**. It feels nice, but skipping it won\'t harm your health or your grades.\n\n **The 24-Hour Test**: Whenever you feel a sudden urge to buy something that isn\'t an immediate emergency, wait 24 hours. 80% of the time, the urge fades and your money stays safe in your pocket!'
  },
  {
    id: 'rule_50_30_20',
    keywords: ['50', '30', '20', '50/30/20', 'rule', 'ratio', 'framework', 'split', 'percentage', 'percentages'],
    title: 'The 50/30/20 Budgeting Rule',
    response:
      'The **50/30/20 Rule** divides your total monthly income or allowance into three clear buckets:\n\n• **50% Needs**: Essential living costs (food, hostel/rent, transport, lecture data, medicines).\n• **30% Wants**: Lifestyle and entertainment choices (eating out, hobbies, streaming, hanging out).\n• **20% Savings & Goals**: Money put away for emergencies, future gadgets, or long-term goals.\n\n*Tip: For students with tighter allowances, adjusting to 60% Needs, 20% Wants, 20% Savings is a smart adaptation.*',
    explanation:
      '**Let me explain the 50/30/20 rule step-by-step with real money numbers:**\n\nSuppose you receive an allowance of **₦50,000** for the month. Here is exactly where every naira goes so you never go broke before month-end:\n\n1. **₦25,000 (50%) for Needs**:\n   Pay for the essentials first! Food items, bus fare to class, hostel utilities, and lecture data bundles.\n\n2. **₦15,000 (30%) for Wants**:\n   Your fun money! Going out with friends, Netflix, snacks, or buying a cute shirt. You spend this guilt-free because your needs are already covered.\n\n3. **₦10,000 (20%) for Savings**:\n   Pay yourself first! Transfer this immediately into a locked savings account or emergency jar before you touch anything else.\n\n *What if 50% isn\'t enough for food and rent?* That is totally okay! Try the **60/20/20 Rule** (60% Needs, 20% Wants, 20% Savings) until your income grows.'
  },
  {
    id: 'how_much_save',
    keywords: ['how much', 'save', 'saving', 'amount', 'student save', 'save money', 'how much should'],
    title: 'How Much Should a Student Save?',
    response:
      'As a student, saving **10% to 20%** of whatever allowance or income you receive is a stellar foundation!\n\nEven if your income is modest (e.g., ₦20,000 allowance), setting aside ₦2,000 to ₦4,000 each month builds the discipline of *paying yourself first* and accumulates a reliable cushion over the school year.',
    explanation:
      '**Here is the realistic truth about student saving:**\n\nMany students think: *"My allowance is too small (e.g. ₦15,000), saving doesn\'t make sense."* But saving as a student is about **building the habit**, not the size of the number!\n\n• If you receive **₦10,000**, save **₦1,000 (10%)**.\n• If you receive **₦30,000**, save **₦3,000 to ₦6,000 (10-20%)**.\n• If someone gifts you **₦5,000**, immediately stash **₦1,000**.\n\nOver two semesters (8 months), saving just ₦3,000/month gives you **₦24,000** in cash. That is more than enough to handle textbook fees, phone repairs, or holiday travel home without asking anyone for a loan!'
  },
  {
    id: 'overspending',
    keywords: ['overspending', 'impulse', 'control', 'stop spending', 'waste', 'spend too much', 'spending too much'],
    title: 'How to Avoid Overspending',
    response:
      'Here are 4 battle-tested strategies for students:\n\n1. **The 24-Hour Rule**: Wait a full day before non-essential purchases.\n2. **Use the BudgetBasics Expense Planner**: Logging daily expenses makes hidden leaks visible.\n3. **Set Weekly Caps**: Divide your monthly allowance into 4 weekly cash envelopes or digital buckets.\n4. **Unsubscribe from Marketing Emails**: Remove shopping app alerts that trigger artificial urgency.',
    explanation:
      '**Let me explain why students overspend and how to fix it easily:**\n\nMost students go broke not from big purchases, but from **"micro-spending leaks"**—buying small snacks (₦800), ride-hailing when you could take the bus (₦1,500), and extra airtime everyday. In 30 days, that eats ₦30,000 without you noticing!\n\n**Try the "Weekly Envelope" Trick**:\nIf your monthly spending allowance is ₦40,000, don\'t keep it all in your daily spending card. Divide it into **₦10,000 per week**.\nWhen your weekly ₦10,000 finishes on Thursday, you cook simple meals and chill until Monday. This guarantees you NEVER run out of cash during week 4!'
  },
  {
    id: 'what_is_budget',
    keywords: ['what is a budget', 'budget definition', 'budgeting', 'why budget', 'meaning of budget', 'what does budget mean', 'how does budget work'],
    title: 'What is a Budget?',
    response:
      'A **Budget** is simply a forward-looking plan for how you intend to spend and save your money before it actually arrives.\n\nInstead of wondering where your money went at the end of the month, a budget tells your money where to go. It gives you freedom to spend on what matters without guilt or stress.',
    explanation:
      '**Think of a Budget as your financial GPS:**\n\nWithout a map, you drive randomly and run out of gas in the middle of nowhere. A budget doesn\'t restrict your fun—it actually gives you **permission to spend without feeling guilty**!\n\nWhen you plan ₦8,000 for weekend chilling in your budget, you can spend that ₦8,000 enjoying yourself with friends, knowing that your school fees and hostel supplies are already 100% paid and safe.'
  },
  {
    id: 'emergency_fund',
    keywords: ['emergency', 'buffer', 'fund', 'safety net', 'unexpected', 'cushion', 'rainy day'],
    title: 'What is an Emergency Fund?',
    response:
      'An **Emergency Fund** is money set aside strictly for unplanned, urgent events—like sudden medical expenses, unexpected laptop repairs during exam week, or emergency travel.\n\nFor a student, a mini emergency fund of **₦10,000 to ₦30,000** keeps you resilient without having to borrow or interrupt your studies.',
    explanation:
      '**Here is why an Emergency Fund is a student\'s superpower:**\n\nThink of it like an umbrella. You don\'t want it to rain, but when a storm hits, you are glad you brought it.\n\n**Common campus emergencies**:\n• Your phone battery dies right before exam submissions.\n• You get sick with a sudden fever and need lab tests & medicines.\n• Your course project requires unexpected material printing.\n\nIf you have a mini cushion of ₦15,000 tucked away, an emergency is just a minor annoyance instead of a terrifying life crisis!'
  },
  {
    id: 'track_expenses',
    keywords: ['track', 'expense', 'record', 'how to track', 'planner', 'tracking', 'log expenses'],
    title: 'How to Track Expenses',
    response:
      'Tracking expenses is simple:\n\n1. Use our interactive **Expense Planner** tool in the navigation menu.\n2. Record every purchase immediately (Date, Category, Description, and Amount in ₦).\n3. Review your category totals at the end of each week to spot runaway spending early.',
    explanation:
      '**The easiest way to start tracking today:**\n\nOpen our **Expense Planner** in the top menu. Whenever you buy something:\n• Type what you bought (e.g. "Biology Textbook - ₦4,500")\n• Pick the category (**Needs** or **Wants**)\n• Tap "Add Expense"\n\nAt the end of the week, look at the summary chart. You will immediately spot where your money actually went, helping you make small adjustments before you run out of funds!'
  },
  {
    id: 'savings_goals',
    keywords: ['goal', 'target', 'plan a goal', 'save for', 'reach a goal', 'saving for'],
    title: 'Setting Achievable Savings Goals',
    response:
      'To reach a savings target:\n\n1. Define the exact amount (e.g., ₦150,000 for a college laptop).\n2. Decide a realistic monthly deposit (e.g., ₦15,000/month).\n3. Check your timeline (₦150,000 ÷ ₦15,000 = 10 months).\n\n*Try our interactive **Savings Goals Calculator** on the navigation menu to compute your exact timeline!*',
    explanation:
      '**Here is the formula to reach any goal without giving up:**\n\n**Target Amount ÷ Monthly Savings = Months Needed**\n\nFor example, if you want a quality study tablet for **₦80,000**:\n• If you save **₦10,000/month**, you will have it in **8 months**.\n• If you save **₦16,000/month**, you will have it in **5 months**!\n\nPro-tip: Open our **Savings Goals** page and type your target. The interactive progress bar will show your milestones and cheer you on as you save!'
  },
  {
    id: 'allowance',
    keywords: ['allowance', 'pocket money', 'stipend', 'manage allowance', 'parents give me', 'monthly allowance'],
    title: 'Managing Your Student Allowance',
    response:
      'When your allowance arrives:\n\n1. **Immediately set aside your 10-20% savings**.\n2. **Pre-pay or reserve your fixed costs** (course materials, transportation card, meal allowance).\n3. **Divide the remainder across the weeks of the month** for flexible spending.',
    explanation:
      '**The "First 24 Hours" Allowance Routine:**\n\nMost mistakes happen on Day 1 when your allowance alert rings and you feel wealthy! Follow this 3-step routine:\n\n1. **Minute 1**: Transfer 15% (e.g., ₦6,000 out of ₦40,000) into your savings vault. If it stays in your main account, you will spend it.\n2. **Hour 1**: Buy your monthly staples (rice, garri, oil, data bundle, school supplies).\n3. **Day 1**: Divide whatever is left by 4 weeks. That is your true weekly budget!'
  },
  {
    id: 'pixelforge',
    keywords: ['pixelforge', 'team', 'creator', 'creators', 'budgetbee', 'budgetbasics', 'about', 'who made', 'author', 'developer'],
    title: 'About Team PixelForge',
    response:
      'BudgetBasics (NextGen BudgetBee) is **built and powered by Team PixelForge**!\n\n• **Eni**: Main Structure, Homepage, Navigation & Integration\n• **Hamid**: Budgeting Basics & Needs vs Wants Quizzes\n• **Tammy**: 50/30/20 & Savings Goals Calculators\n• **Lawal**: Expense Planner & Money Mistakes Guide\n• **Hameed**: AI Chatbot, Search & Filter Features\n\nOur mission is to empower college students and beginners with stress-free personal finance literacy!',
    explanation:
      '**Team PixelForge is a student-first developer team:**\n\nWe designed BudgetBasics to bridge the gap between intimidating financial math and everyday campus life. Every feature is 100% client-side, privacy-first (no banking logins or sensitive data stored), and tailored to real college spending realities!'
  }
];

export const fallbackChatResponse = {
  title: 'BeeWise Financial Assistant',
  response:
    '**I hear you, and I am listening carefully to your situation!**\n\nEven if I didn\'t match every exact word, as your student financial guide, I can help you solve any campus money challenge:\n\n• **Being broke or surviving on zero cash** (type *"I am broke"*)\n• **Managing student debts or loan apps** (type *"debt"*)\n• **Paying hostel rent or accommodation** (type *"rent"*)\n• **Affording school fees and exam clearance** (type *"school fees"*)\n• **Cutting food and grocery expenses** (type *"food"*)\n• **Resisting peer pressure and social FOMO** (type *"peer pressure"*)\n• **Recovering from impulse buys or betting losses** (type *"impulse"*)\n• **Finding realistic campus side hustles** (type *"side hustle"*)\n• **Applying the 50/30/20 rule to your allowance** (type *"50/30/20"*)\n\nFeel free to speak your question using the microphone button or type below—I am here to help you get through this!'
};
