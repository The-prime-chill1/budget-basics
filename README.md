# BudgetBasics — NextGen BudgetBee
### Category: Web Innovation Unleashed | Aptech TechWiz 7
**A Student-Centric Personal Finance & Educational Budgeting Web Application**

---

## 1. Project Overview & Problem Definition

Managing personal finances is an essential life skill. Many college students and young adults start handling parental allowances, academic stipends, internship wages, or part-time earnings without a structured way to plan their cash flow. Small daily unexamined expenses ("The Latte Effect") quickly consume funds meant for essential academic materials, transportation, and savings buffers.

**BudgetBasics** is an educational web innovation developed strictly according to the **Aptech TechWiz 7 Software Requirements Specification (SRS)** under the theme **NextGen BudgetBee**.

### Educational Scope & Safety
- **Strictly Educational**: BudgetBasics is an educational platform. It does not connect to real banking accounts, payment processors, or transaction APIs.
- **Zero Backend Dependencies**: Operates entirely in the client's browser (SPA) without storing sensitive credentials or personal records.
- **Local / Session State**: Simulators (like the Expense Planner) use temporary in-memory and session storage.
- **Currency Standard**: Formatted with the Nigerian Naira (`₦`) symbol with clean comma-separated values.

---

## 2. Key Features & SRS Compliance Matrix

| Module | SRS Requirement | Implementation Details |
| :--- | :--- | :--- |
| **Global Navigation & Theme** | Responsive menu, active states, dark mode, ticker | Sticky navigation bar, desktop dropdowns, mobile drawer, light/dark mode with `localStorage`, and live financial quote ticker. |
| **Home Page** | Hero, branding, live clock, visitor demo, tools preview | Live real-time clock, local visitor counter demonstration, interactive allowance slider simulator, 4 core pillars, and tools showcase. |
| **Budgeting Basics** | Income, fixed/variable costs, sample budget, quiz | Conceptual guide cards, realistic student monthly budget table (`₦60,000` base), and an interactive 4-question knowledge quiz with scoring and explanations. |
| **Needs vs Wants** | Classification exercise, decision tree | Interactive 10-item student spending classification challenge with immediate feedback, plus a 3-step cognitive purchase decision filter. |
| **50-30-20 Rule** | 50/30/20 formula calculator, SVG chart, custom ratios | Income input validator, SVG donut chart, progress bars, student custom split mode (e.g. 60/20/20), and required educational disclaimer. |
| **Savings Goals** | Target, current savings, monthly contribution, timeline | Remaining balance calculation, estimated months forecast, completion date, progress bar, completed goal celebration, and student tips. |
| **Expense Planner** | Temporary session table, CRUD actions, balance tracker | Add, edit, delete expenses across 7 student categories, dynamic balance recalculation, overspending alert, and category filtering. |
| **Money Mistakes** | 5 student pitfalls, realistic scenarios, solutions | Expandable accordions with scenarios, warning signs, solutions, and an interactive student habit audit checklist. |
| **Infographics Gallery** | CSS/SVG visual diagrams, topic filtering, modals | 6 original visual diagrams (50/30/20 anatomy, decision filter, budget cycle, 30-day challenge), topic filters, and detail study modals. |
| **BudgetBee AI Chatbot** | Keyword matching assistant, suggested prompts | Rule-based normalized search across personal finance topics, suggested inquiry pills, typing animation, and disclaimer banner. |
| **Search, Sort & Filter** | Global search across all learning content | Real-time text search, category filtering (Budgeting, Saving, Spending, Goals), and alphabetical (A-Z) sorting. |
| **About Us** | Project purpose, target audience, values | Aptech TechWiz background, NextGen BudgetBee identity, and target learner demographics. |
| **Feedback Form** | Client-validated feedback form, star rating | Client-side validation for name, email, star rating, feature category, and comments with confirmation modal. |
| **Contact Us** | Support channels and validated contact form | Helpline demonstration, email details, and client-validated message interface. |
| **Sitemap** | Structured hierarchical directory | Logical categorization: Learning, Tools, Assistant, and Support with clickable links. |

---

## 3. Technology Stack & Design Architecture

- **Core Framework**: React 18 (Single Page Application).
- **Build Tool**: Vite 5 (Lightning-fast HMR and lightweight bundle packaging).
- **Routing**: `react-router-dom` v6 (Client-side routing with scroll restoration).
- **Styling**: **Pure Vanilla CSS3** with CSS custom properties (Design System in `src/index.css`). **No Tailwind CSS**.
- **Iconography**: `lucide-react` (Crisp, modern, minimalist icons).
- **Micro-Animations**: `canvas-confetti` (for goal completion celebration) and native CSS keyframes.

### Classic Editorial Aesthetic
- **Color Palette**: Deep slate navy (`#0f172a`), warm honey-amber bee accent (`#d97706` / `#f59e0b`), soft pearl surfaces (`#f8fafc`, `#ffffff`), and subtle hairline borders (`#e2e8f0`).
- **Typography**: Google Fonts — *Plus Jakarta Sans* (UI & Body), *Outfit* (Headings), and *Space Grotesk* (Financial Numbers).

---

## 4. Project Folder Structure

```
BudgetBasics/
├── index.html                     # Entry HTML with SEO tags & typography
├── package.json                   # Project dependencies & npm scripts
├── vite.config.js                 # Vite development & build configuration
├── public/
│   └── favicon.svg                # Custom geometric BudgetBee SVG icon
├── src/
│   ├── main.jsx                   # React root entry wrapped in BrowserRouter
│   ├── App.jsx                    # Core layout, theme persistence, and route map
│   ├── index.css                  # Design tokens, typography, dark mode, reset
│   ├── components/
│   │   ├── Navbar.jsx / .css      # Sticky nav, dropdowns, mobile drawer, theme toggle
│   │   ├── Footer.jsx / .css      # Disclaimers, sitemap link, back-to-top button
│   │   ├── Ticker.jsx / .css      # Live quotes / financial facts banner
│   │   ├── SectionHeading.jsx     # Reusable section header with badges
│   │   ├── ProgressBar.jsx / .css # Custom progress indicator
│   │   ├── Modal.jsx / .css       # Accessible dialog with ESC key listener
│   │   ├── EmptyState.jsx / .css  # Zero-data feedback component
│   │   ├── StatCard.jsx           # Metric summary card
│   │   └── TipCard.jsx / .css     # Expandable financial tip card
│   ├── pages/
│   │   ├── Home.jsx / .css        # Hero, live clock, visitor demo, pillars
│   │   ├── BudgetingBasics.jsx    # Core concepts, budget table, quiz
│   │   ├── NeedsVsWants.jsx       # 10-item challenge & decision tree
│   │   ├── Budget503020.jsx       # 50/30/20 calculator & custom ratio mode
│   │   ├── SavingsGoals.jsx       # Milestone forecast & goal timeline
│   │   ├── ExpensePlanner.jsx     # Session expense table (CRUD & filters)
│   │   ├── MoneyMistakes.jsx      # 5 traps, scenarios & habit audit
│   │   ├── Infographics.jsx       # Visual CSS/SVG diagrams & modal
│   │   ├── Chatbot.jsx            # BudgetBee rule-based Q&A assistant
│   │   ├── Search.jsx             # Unified content search, filter & sort
│   │   ├── About.jsx              # Mission & Aptech TechWiz identity
│   │   ├── Feedback.jsx           # Validated feedback form
│   │   ├── Contact.jsx            # Validated contact form & channels
│   │   └── Sitemap.jsx            # Visual sitemap directory
│   ├── data/
│   │   ├── tips.js                # Financial facts & featured tips
│   │   ├── mistakes.js            # Pitfalls, scenarios & warning signs
│   │   ├── chatbotResponses.js    # Keyword-matching knowledge base
│   │   ├── budgetExamples.js      # Student budget model & quiz data
│   │   └── gallery.js             # Infographics metadata & SVG definitions
│   └── utils/
│       ├── budgetCalculations.js  # Pure mathematical algorithms
│       ├── validation.js          # Reusable validation helpers
│       └── formatters.js          # Currency (₦) & date formatting helpers
└── README.md                      # Comprehensive academic project report
```

---

## 5. Installation & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps to Run Locally
1. Clone or extract the project folder:
   ```bash
   cd BudgetBasics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 6. Academic Project Defense & Evaluator Guide

During jury evaluation, participants may be asked to explain their implementation logic and architectural decisions. Here is a quick reference:

### 1. How does the 50-30-20 calculation work?
- **Component**: [`Budget503020.jsx`](file:///c:/Users/Hp/Desktop/BudgetBasics/src/pages/Budget503020.jsx)
- **Logic File**: [`budgetCalculations.js`](file:///c:/Users/Hp/Desktop/BudgetBasics/src/utils/budgetCalculations.js) -> `calculate503020(income)`
- **Formula**:
  - $\text{Needs} = \text{Income} \times 0.50$
  - $\text{Wants} = \text{Income} \times 0.30$
  - $\text{Savings} = \text{Income} \times 0.20$
- **Validation**: Ensures inputs are numeric, non-negative, and greater than zero before executing calculations, preventing `NaN` or `Infinity`.

### 2. How does the Savings Goal timeline estimation work?
- **Component**: [`SavingsGoals.jsx`](file:///c:/Users/Hp/Desktop/BudgetBasics/src/pages/SavingsGoals.jsx)
- **Logic File**: [`budgetCalculations.js`](file:///c:/Users/Hp/Desktop/BudgetBasics/src/utils/budgetCalculations.js) -> `calculateSavingsGoal(target, current, monthly)`
- **Formula**:
  - $\text{Remaining} = \max(0, \text{Target} - \text{Current})$
  - $\text{Estimated Months} = \lceil \frac{\text{Remaining}}{\text{Monthly Contribution}} \rceil$
  - $\text{Progress Percentage} = \min(100, \frac{\text{Current}}{\text{Target}} \times 100)$

### 3. How does the BudgetBee Chatbot work without a backend?
- **Component**: [`Chatbot.jsx`](file:///c:/Users/Hp/Desktop/BudgetBasics/src/pages/Chatbot.jsx)
- **Knowledge File**: [`chatbotResponses.js`](file:///c:/Users/Hp/Desktop/BudgetBasics/src/data/chatbotResponses.js)
- **Algorithm**: The query is normalized (`toLowerCase().trim()`). It iterates across knowledge entries and checks if any keyword array element is contained within the string. If matched, it returns the structured response; otherwise, it returns an educational fallback with suggested prompt pills.

### 4. How is client-side data privacy maintained?
- All forms (`Feedback.jsx`, `Contact.jsx`, `ExpensePlanner.jsx`) validate inputs directly in JavaScript using pure functions in `validation.js` and update local React state. No remote network requests are dispatched, adhering strictly to the SRS non-functional privacy requirements.

---

## 7. AI Usage Disclosure (SRS Page 12 Requirement)

In compliance with the Aptech TechWiz AI usage guidelines:
- **AI Tool Used**: Claude / Antigravity AI as a development assistant for ideation, component scaffolding, and code organization.
- **Human Contribution**: The requirements analysis, UX architecture, visual styling, mathematical calculation isolation, and feature assembly were reviewed, customized, and verified to ensure full adherence to the Aptech TechWiz SRS.

---

## 8. License & Credits

Developed for the **Aptech TechWiz 7 Global Competition**.
Theme: **NextGen BudgetBee** | Category: **Web Innovation Unleashed**.
&copy; 2026 BudgetBasics Team. Educational Academic Project.
