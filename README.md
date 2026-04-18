# Meridian — Dynamic Financial Product Discovery Platform

A comprehensive React-based FinTech application built for the FAST National University Web Programming course. Meridian helps users explore, filter, compare, and build portfolios of financial products — savings accounts, mutual funds, insurance plans, and crypto assets — with genuine financial logic driving every interaction.

---

## Features

- **Home Page** — Hero, dynamic featured products (highest-return per category), category navigation, platform stats
- **Product Listing** — Full catalog with 6 simultaneous AND-logic filters (risk, category, return range, liquidity, horizon, budget)
- **Product Detail** — Dynamic route (`/product/:id`), decision insight engine, compound-interest return calculator, product comparison table, risk gauge
- **User Financial Profile** — Form with validation, radio cards, persistence via localStorage, recommendation preview count
- **Recommendation Engine** — Dynamic profile-to-product matching using risk/horizon/liquidity/budget mappings (never hardcoded)
- **Portfolio Management** — Add/remove/edit allocations, weighted return, risk distribution bar, category breakdown, diversification score, >70% high-risk warning, 50%-of-capacity single-product constraint
- **API Integration** — Fetches from Fake Store API, applies deterministic transformation (seeded hash, not Math.random), graceful offline fallback to curated seed products
- **Responsive Design** — Mobile, tablet, desktop breakpoints with custom CSS (no UI libraries)
- **Animations** — Page transitions, card hover reveals, staggered grid entrance, button state feedback, prefers-reduced-motion support
- **localStorage Persistence** — Profile and portfolio survive page refresh

---

## Component Hierarchy

```
App
├── Navbar                         (persistent, shows active route + portfolio count)
├── Routes
│   ├── Home
│   │   └── ProductCard[]          (featured products)
│   ├── ProductListing
│   │   ├── FilterPanel            (6 filter controls)
│   │   └── ProductList
│   │       └── ProductCard[]
│   │           ├── RiskBadge
│   │           └── ReturnDisplay
│   ├── ProductDetail              (dynamic: /product/:id)
│   │   ├── RiskBadge
│   │   ├── ReturnDisplay
│   │   └── (inline calculator + comparison table)
│   ├── UserProfile
│   │   └── ProfileForm
│   ├── Portfolio
│   │   ├── PortfolioSummary
│   │   └── PortfolioItem[]
│   ├── Recommendations
│   │   └── RecommendationList
│   │       └── ProductCard[]
│   └── NotFound
```

---

## State Management

| State            | Scope   | Mechanism              | Purpose                                            |
|------------------|---------|------------------------|----------------------------------------------------|
| Portfolio        | Global  | PortfolioContext        | Items, allocations, derived stats (weighted return, risk distribution) |
| User Profile     | Global  | UserProfileContext      | Risk tolerance, horizon, capacity, liquidity, goal  |
| Filter state     | Local   | useState (ProductListing) | Six filter dimensions with AND combination       |
| Form inputs      | Local   | useState (ProfileForm)   | Controlled components for validation              |
| UI states        | Local   | useState (various)       | Loading, errors, editing mode, comparison select  |

Both contexts persist to localStorage and hydrate on mount.

---

## Financial Logic

### Data Consistency Rules
- Low-risk products: 3–7% return, never paired with locked liquidity + short horizon
- Medium-risk: 7–12% return
- High-risk: 12–27% return
- The transformation uses a **deterministic seeded hash** of product ID so the same API response always produces the same financial attributes

### Recommendation Algorithm (UserProfileContext.getRecommendations)
1. Map risk tolerance → allowed risk levels (conservative = [low], moderate = [low, medium], aggressive = [low, medium, high])
2. Map horizon → allowed horizons (short = [short], medium = [short, medium], long = [short, medium, long])
3. Map liquidity preference → allowed liquidity levels
4. Filter by budget (minInvestment ≤ monthlyCapacity)
5. Apply all four filters with AND logic
6. Sort: conservative → ascending by risk weight; others → descending by expectedReturn

### Portfolio Calculations
- **Weighted Return**: Σ (allocation_i / total) × expectedReturn_i
- **Risk Distribution**: % of total in each risk bucket
- **Diversification Score**: Normalized Herfindahl–Hirschman Index (0 = concentrated, 100 = perfectly spread)
- **High-Risk Warning**: Triggers when >70% of total is in high-risk products
- **Single-Product Constraint**: No product may receive >50% of monthly capacity

---

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd fintech-discovery-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Requires Node.js 18+ and npm 9+.

---

## Tech Stack

- React 18 with Hooks (useState, useEffect, useMemo, useCallback, useContext)
- React Router v6 (dynamic routes, NavLink active class, useParams, useSearchParams)
- Context API (PortfolioContext, UserProfileContext)
- Vite build tool
- Custom CSS with CSS variables (no Tailwind, no Bootstrap, no UI libraries)
- Fake Store API for data source + deterministic transformation

---

## Folder Structure

```
src/
├── components/         # Reusable UI components
│   ├── FilterPanel.jsx + .css
│   ├── Navbar.jsx + .css
│   ├── PortfolioItem.jsx + .css
│   ├── PortfolioSummary.jsx + .css
│   ├── ProductCard.jsx + .css
│   ├── ProductList.jsx + .css
│   ├── ProfileForm.jsx + .css
│   ├── RecommendationList.jsx
│   ├── ReturnDisplay.jsx + .css
│   └── RiskBadge.jsx + .css
├── contexts/           # Global state providers
│   ├── PortfolioContext.jsx
│   └── UserProfileContext.jsx
├── data/               # Curated seed products
│   └── seedProducts.js
├── pages/              # Route-level page components
│   ├── Home.jsx + .css
│   ├── NotFound.jsx
│   ├── Portfolio.jsx + .css
│   ├── ProductDetail.jsx + .css
│   ├── ProductListing.jsx + .css
│   ├── Recommendations.jsx + .css
│   └── UserProfile.jsx + .css
├── styles/             # Global styles
│   └── global.css
├── utils/              # Data fetching + transformation
│   ├── transformApiProduct.js
│   └── useProducts.js
├── App.jsx
└── main.jsx
```

---

## License

Academic project — FAST National University, Islamabad Campus.
