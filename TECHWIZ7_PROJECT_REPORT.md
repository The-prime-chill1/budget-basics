# Aptech TechWiz 7 — Official Project Report

**Project Title:** BudgetBasics — NextGen BudgetBee  
**Competition:** Aptech TechWiz 7 (The World Tech Championship)  
**Category:** Web Innovation Unleashed  
**Team Name:** Team PixelForge  
**Live Hosted Platform:** https://budgetbasics-two.vercel.app/  
**Document Classification:** Final Evaluation Project Report (Code-Free Specification)  

---

## 1. Problem Definition & Project Necessity

### 1.1 The Student Financial Dilemma
Managing personal finances is one of the most critical yet neglected life skills for tertiary students. Upon entering university, young adults transition from parental oversight to autonomous budgeting. They receive allowances, bursaries, academic stipends, or part-time earnings without practical training in cash flow planning.

In college environments, unexamined recurring micro-expenditures (such as frequent cafeteria takeouts, ride-hailing convenience trips, and recurring digital entertainment subscriptions) consume capital intended for textbooks, mandatory course handbooks, semester tuition buffers, and emergency funds. This phenomenon, known economically as "The Latte Effect," causes widespread month-end deficits, academic stress, and reliance on predatory informal loans.

### 1.2 Proposed Educational Solution
BudgetBasics was developed to solve this challenge through a student-centric, interactive Single Page Application (SPA). Rather than functioning as a dry accounting spreadsheet, the platform translates economic concepts into intuitive visual simulations:
- Dividing monthly student allowances into structured needs, wants, and savings.
- Training critical purchase decision-making through interactive categorization games.
- Estimating multi-month savings milestones for essential academic assets (such as laptops).
- Fostering daily financial mindfulness without requiring account logins or banking credentials.

---

## 2. Design Specifications & System Architecture

### 2.1 Aesthetic & Visual Identity (Tactile Modernism)
BudgetBasics is styled using pure Vanilla CSS3 custom properties with zero framework abstractions:
- **Surface Canvas (Light):** Warm paper tone (`#F6F7ED`) offering high editorial readability.
- **Surface Canvas (Dark):** Deep forest slate (`#0A2A2A`) with charcoal containers (`#111827`) ensuring WCAG AAA contrast compliance.
- **Brand Accents:** Electric Lime-Gold (`#D8E64C`) and Honey Amber (`#F59E0B`) symbolizing prosperity and vitality.
- **Academic Brand Primary:** Deep Scholastic Emerald (`#00513F`) communicating trust and stability.
- **Typography:**
  - Headings: *Outfit* (Geometric modern sans-serif).
  - Body & Form Controls: *Plus Jakarta Sans* (High-legibility contemporary sans).
  - Financial Data: *Space Grotesk* (Tabular mono-spaced numerals).

### 2.2 Responsive Layout & Device Breakpoints
- **Desktop (>= 1040px):** Sticky frosted header bar with 4-pillar architectural dropdown flyouts, live clock, and live visitor counter.
- **Tablet / Landscape (641px – 1039px):** Adaptive layout with off-canvas right-sliding navigation panel and stacked metric summaries.
- **Mobile Handsets (<= 640px):** Full-screen touch drawer utilizing Dynamic Viewport Units (`100dvh`), iOS notch and Dynamic Island safe-area padding (`env(safe-area-inset-top)`), and touch overscroll containment.

---

## 3. System Architecture & Diagrams

### 3.1 Data Flow Diagram (DFD Level 0 — Context Diagram)

```
                     ┌──────────────────────────────────────────────┐
                     │               STUDENT LEARNER                │
                     └──────┬────────────────────────────────▲──────┘
                            │                                │
      1. Enters Monthly     │                                │ 5. Receives Interactive
         Income / Expenses  │                                │    Calculations, Quizzes,
      2. Toggles Habits     │                                │    Milestone Forecasts,
      3. Inquires via Chat  │                                │    and Budget Checklists
                            ▼                                │
                     ┌───────────────────────────────────────┴──────┐
                     │                                              │
                     │          BUDGETBASICS APPLICATION            │
                     │           (NextGen BudgetBee SPA)            │
                     │                                              │
                     └──────┬────────────────────────────────▲──────┘
                            │                                │
      Client Session State  │                                │ Pre-Populated Educational
      & Local Persistence   │                                │ Knowledge Sets & Formulas
                            ▼                                │
                     ┌───────────────────────────────────────┴──────┐
                     │         BROWSER LOCAL STORAGE & MEMORY       │
                     │         (Zero Server-Side Storage)           │
                     └──────────────────────────────────────────────┘
```

---

### 3.2 Data Flow Diagram (DFD Level 1 — System Functional Decomposition)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                BUDGETBASICS PLATFORM                                   │
└────────────────────────────────────────────────────────────────────────────────────────┘

    [Student Input: Allowance]
                │
                ▼
      ( Process 1.0: 50/30/20 Formula Engine )
      ├── Formula: Needs = Income * 0.50
      ├── Formula: Wants = Income * 0.30
      └── Formula: Savings = Income * 0.20
                │
                ├───► [ SVG Donut Visualization & Allocation Summary ]
                └───► [ Recommended Weekly Spending Limit ]

    [Student Input: Savings Target & Monthly Deposit]
                │
                ▼
      ( Process 2.0: Milestone Timeline Forecaster )
      ├── Formula: Remaining = Target - Current Savings
      └── Formula: Duration = Ceiling(Remaining / Monthly Contribution)
                │
                └───► [ Progress Bar, Completion Date & Confetti Celebration ]

    [Student Input: Item Selection (e.g. Textbooks vs Designer Shoes)]
                │
                ▼
      ( Process 3.0: Needs vs Wants Cognitive Classifier )
      ├── Compares against 10-Item Educational Answer Key
      └── Evaluates 3-Step Decision Filter
                │
                └───► [ Instant Educational Feedback & Corrective Rationale ]

    [Student Input: Natural Language Financial Inquiry]
                │
                ▼
      ( Process 4.0: BeeWise Keyword Matching Engine )
      ├── Normalizes text input & searches pre-populated JSON knowledge base
      └── Evaluates prompt context against 25+ finance topics
                │
                └───► [ Tailored Response Chips & Educational Disclaimer ]
```

---

### 3.3 Activity Flowchart: Student Onboarding & Budgeting Workflow

```
                                 [ START ]
                                     │
                                     ▼
                     ( Open https://budgetbasics-two.vercel.app )
                                     │
                                     ▼
                     [ Guest Session Initialized: STU-XXXX ]
                                     │
                                     ▼
                     < Select Primary Activity >
                      ├───► [ Explore 50/30/20 Allocator ]
                      │        ├── Enter Monthly Income (e.g., ₦60,000)
                      │        ├── Inspect Donut Chart (₦30k / ₦18k / ₦12k)
                      │        └── Optional: Adjust Custom Percentage Split
                      │
                      ├───► [ Needs vs Wants Challenge ]
                      │        ├── Classify 10 Typical Campus Expenses
                      │        └── Review Feedback & Purchase Decision Tree
                      │
                      ├───► [ Plan Semester Outlays in Expense Planner ]
                      │        ├── Add Transaction (Date, Category, Amount)
                      │        ├── Monitor Real-Time Remaining Balance
                      │        └── Inspect Overspending Threshold Warnings
                      │
                      ├───► [ Set Savings Goal ]
                      │        ├── Input Target (e.g. Laptop Fund ₦180,000)
                      │        └── Inspect Estimated Completion Months
                      │
                      └───► [ Consult BeeWise AI Assistant ]
                               ├── Choose Suggested Prompt or Ask Question
                               └── Receive Guardrailed Student Guidance
                                     │
                                     ▼
                     [ Download / Print Financial Health Checklist ]
                                     │
                                     ▼
                                  [ END ]
```

---

## 4. Test Data Used in the Project

The application contains rigorous validation vectors and pre-populated test data:

### 4.1 Sample Allowance Scenarios
| Scenario ID | Description | Monthly Allowance | Needs (50%) | Wants (30%) | Savings (20%) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Case A (Baseline)** | Reference Campus Allowance | ₦60,000.00 | ₦30,000.00 | ₦18,000.00 | ₦12,000.00 |
| **Case B (Frugal)** | Low-Income Student Stipend | ₦35,000.00 | ₦17,500.00 | ₦10,500.00 | ₦7,000.00 |
| **Case C (Internship)**| Work-Study / Paid Internship | ₦120,000.00 | ₦60,000.00 | ₦36,000.00 | ₦24,000.00 |

### 4.2 Savings Goals Test Vectors
- **Scenario 1 (Academic Laptop Fund):** Target: ₦180,000 | Current: ₦45,000 | Monthly: ₦15,000 → Remaining: ₦135,000 → Duration: **9 Months**.
- **Scenario 2 (Certification Voucher):** Target: ₦50,000 | Current: ₦20,000 | Monthly: ₦10,000 → Remaining: ₦30,000 → Duration: **3 Months**.
- **Scenario 3 (Goal Hit Celebration):** Target: ₦60,000 | Current: ₦60,000 → Remaining: ₦0 → Duration: **0 Months (Triggers Confetti Celebration)**.

### 4.3 Input Validation Boundary Checks
- **Negative Value Guard:** Rejects negative inputs (e.g. `-₦5,000`) with visual warning badges.
- **Zero Division Guard:** Handled gracefully when monthly savings contribution is ₦0.
- **Sanitization:** Strips non-numeric characters automatically from financial numeric inputs.

---

## 5. Project Installation Instructions (Mandatory)

### Prerequisites
- **Node.js:** Version 18.0.0 or higher.
- **npm:** Version 9.0.0 or higher.
- **Modern Browser:** Chrome, Edge, Safari, or Firefox.

### Step-by-Step Local Deployment
1. **Extract Project Archive:**
   Extract the provided `BudgetBasics.zip` file onto your local workstation.

2. **Open Terminal / Command Line:**
   Navigate into the project root directory:
   ```bash
   cd BudgetBasics
   ```

3. **Install Dependencies:**
   Execute npm package installation:
   ```bash
   npm install
   ```

4. **Launch Local Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the displayed local address:
   `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

5. **Build for Production Validation:**
   ```bash
   npm run build
   ```
   The production bundle compiles into the `dist/` directory in under 15 seconds.

6. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 6. System Assumptions & Constraints

1. **Client-Side Scope:** Operating strictly within client browser memory without backend database connections, external transaction processors, or credit card handling.
2. **Privacy Protection:** No personal financial credentials or identifiable student data are collected or transmitted across the network.
3. **Currency Standard:** Financial calculations are standardized using the Nigerian Naira (`₦`) with proportional math applicable universally.
4. **Educational Guideline:** All calculations are presented as educational estimates for academic learning and habit formation rather than certified accounting advice.

---

## 7. AI Tools Acknowledgement (SRS Section 1.8.2 Compliance)

In compliance with the Aptech TechWiz 7 AI usage guidelines (SRS Page 12):
- **Canva AI & Figma:** Utilized for conceptual wireframing, mood-board palette exploration, and vector layout brainstorming.
- **Claude & ChatGPT:** Utilized as code review assistants, algorithm testing sounding boards, and FAQ educational text refinement tools.
- **Human Authorship:** All architecture, business logic, styling tokens, responsive navigation implementations, and mathematical calculations were hand-crafted, verified, and debugged by Team PixelForge.

---

## 8. Summary of Project Deliverables

- **Live Production URL:** https://budgetbasics-two.vercel.app/
- **Standalone Test Data Files:** `test-data.json` and `test-data.txt` included in the root folder.
- **Search Engine Indexing:** Fully submitted to Google Search Console and Bing Webmaster Tools with live XML sitemap.
- **Walkthrough Demonstration Video:** Prepared as `BudgetBasics_Demo_Walkthrough.mp4` for final jury evaluation.
