/**
 * seedProducts.js
 * -----------------------------------------------------------
 * Hand-curated financial products. These are merged with
 * API-derived products so the platform always has a rich,
 * realistic catalog even if the network fails.
 *
 * Each product follows real-world financial consistency:
 * - low risk never pairs with > 8% return
 * - 'locked' liquidity never pairs with 'short' horizon
 */

export const seedProducts = [
  // ── SAVINGS (low risk, 3-7%) ──
  {
    id: 'sav-001',
    name: 'Meridian High-Yield Savings',
    category: 'savings',
    description:
      'A premium savings account offering competitive interest compounded monthly. Ideal for emergency funds and short-term liquidity needs with no lock-in period.',
    expectedReturn: 5.5,
    riskLevel: 'low',
    liquidity: 'easy',
    timeHorizon: 'short',
    minInvestment: 10000,
    image: null,
  },
  {
    id: 'sav-002',
    name: 'Government Treasury Deposit',
    category: 'savings',
    description:
      'Guaranteed returns backed by sovereign credit. Principal protected with modest but reliable yields suitable for conservative capital preservation.',
    expectedReturn: 4.2,
    riskLevel: 'low',
    liquidity: 'moderate',
    timeHorizon: 'short',
    minInvestment: 25000,
    image: null,
  },
  {
    id: 'sav-003',
    name: 'Flexi Liquid Fund',
    category: 'savings',
    description:
      'Ultra-short-term money market instrument offering slightly higher yields than traditional savings accounts with instant redemption.',
    expectedReturn: 6.5,
    riskLevel: 'low',
    liquidity: 'easy',
    timeHorizon: 'short',
    minInvestment: 5000,
    image: null,
  },
  {
    id: 'sav-004',
    name: 'Fixed Deposit Plus',
    category: 'savings',
    description:
      'A term deposit offering enhanced rates for a 12-month lock-in. Break-early penalties apply but principal is fully secured.',
    expectedReturn: 6.8,
    riskLevel: 'low',
    liquidity: 'moderate',
    timeHorizon: 'medium',
    minInvestment: 50000,
    image: null,
  },
  {
    id: 'sav-005',
    name: 'Digital Savings Vault',
    category: 'savings',
    description:
      'App-only savings account with daily profit calculation and zero maintenance fees. Withdraw anytime with no penalties.',
    expectedReturn: 4.8,
    riskLevel: 'low',
    liquidity: 'easy',
    timeHorizon: 'short',
    minInvestment: 1000,
    image: null,
  },
  {
    id: 'sav-006',
    name: 'Prize Bond Savings',
    category: 'savings',
    description:
      'Government-backed prize bond scheme offering regular prize draws alongside capital preservation. No fixed return but chances of large quarterly prizes.',
    expectedReturn: 3.5,
    riskLevel: 'low',
    liquidity: 'easy',
    timeHorizon: 'short',
    minInvestment: 1500,
    image: null,
  },

  // ── INVESTMENT / MUTUAL FUNDS (medium risk, 7-12%) ──
  {
    id: 'mf-101',
    name: 'Equity Growth Fund',
    category: 'investment',
    description:
      'Diversified equity mutual fund targeting large-cap growth companies across multiple sectors. Managed by professional analysts with a proven long-term track record.',
    expectedReturn: 11.4,
    riskLevel: 'medium',
    liquidity: 'moderate',
    timeHorizon: 'long',
    minInvestment: 50000,
    image: null,
  },
  {
    id: 'mf-102',
    name: 'Balanced Allocation Fund',
    category: 'investment',
    description:
      'A balanced fund splitting assets between equity and fixed-income instruments. Targets steady growth while dampening market volatility.',
    expectedReturn: 8.8,
    riskLevel: 'medium',
    liquidity: 'moderate',
    timeHorizon: 'medium',
    minInvestment: 30000,
    image: null,
  },
  {
    id: 'mf-103',
    name: 'Index Tracker Fund',
    category: 'investment',
    description:
      'Low-cost passive fund tracking the benchmark index. Minimal fees and broad market exposure make it ideal for long-term wealth building.',
    expectedReturn: 9.6,
    riskLevel: 'medium',
    liquidity: 'easy',
    timeHorizon: 'long',
    minInvestment: 15000,
    image: null,
  },
  {
    id: 'mf-104',
    name: 'Emerging Markets Equity',
    category: 'investment',
    description:
      'Actively managed fund investing in high-growth emerging market equities. Higher volatility with elevated long-term return potential.',
    expectedReturn: 11.9,
    riskLevel: 'medium',
    liquidity: 'moderate',
    timeHorizon: 'long',
    minInvestment: 25000,
    image: null,
  },
  {
    id: 'mf-105',
    name: 'Income & Dividend Fund',
    category: 'investment',
    description:
      'Focuses on dividend-paying blue-chip stocks generating steady quarterly income alongside moderate capital appreciation.',
    expectedReturn: 8.2,
    riskLevel: 'medium',
    liquidity: 'easy',
    timeHorizon: 'medium',
    minInvestment: 20000,
    image: null,
  },
  {
    id: 'mf-106',
    name: 'Technology Sector Fund',
    category: 'investment',
    description:
      'Concentrated bet on technology companies. Offers sector-specific growth but amplifies downside risk during tech corrections.',
    expectedReturn: 10.5,
    riskLevel: 'medium',
    liquidity: 'moderate',
    timeHorizon: 'long',
    minInvestment: 35000,
    image: null,
  },
  {
    id: 'mf-107',
    name: 'Small-Cap Discovery Fund',
    category: 'investment',
    description:
      'Invests in promising small-cap companies with rapid growth trajectories. Higher entry minimum but strong alpha generation track record.',
    expectedReturn: 11.1,
    riskLevel: 'medium',
    liquidity: 'moderate',
    timeHorizon: 'long',
    minInvestment: 40000,
    image: null,
  },
  {
    id: 'mf-108',
    name: 'Government Bond Fund',
    category: 'investment',
    description:
      'Invests exclusively in government-issued bonds with fixed coupon payments. Extremely stable with predictable income, ideal for near-retirement investors.',
    expectedReturn: 7.2,
    riskLevel: 'medium',
    liquidity: 'easy',
    timeHorizon: 'medium',
    minInvestment: 10000,
    image: null,
  },

  // ── INSURANCE (low risk, 3-7%) ──
  {
    id: 'ins-201',
    name: 'Term Life Protection Plan',
    category: 'insurance',
    description:
      'Comprehensive term life insurance with a modest return-of-premium component. Offers long-term family financial protection at a low annual premium.',
    expectedReturn: 6.0,
    riskLevel: 'low',
    liquidity: 'locked',
    timeHorizon: 'long',
    minInvestment: 20000,
    image: null,
  },
  {
    id: 'ins-202',
    name: 'Retirement Annuity Contract',
    category: 'insurance',
    description:
      'Tax-advantaged retirement savings with guaranteed minimum payouts. Designed for investors planning for income stability after age 60.',
    expectedReturn: 6.8,
    riskLevel: 'low',
    liquidity: 'locked',
    timeHorizon: 'long',
    minInvestment: 40000,
    image: null,
  },
  {
    id: 'ins-203',
    name: 'Health & Critical Illness Cover',
    category: 'insurance',
    description:
      'Protects against major medical expenses including hospitalisation, surgery, and critical illness diagnosis with a savings component.',
    expectedReturn: 4.5,
    riskLevel: 'low',
    liquidity: 'locked',
    timeHorizon: 'long',
    minInvestment: 15000,
    image: null,
  },
  {
    id: 'ins-204',
    name: 'Child Education Endowment',
    category: 'insurance',
    description:
      'Savings-linked insurance plan that matures when your child reaches university age. Guaranteed payout regardless of market conditions.',
    expectedReturn: 5.8,
    riskLevel: 'low',
    liquidity: 'locked',
    timeHorizon: 'long',
    minInvestment: 10000,
    image: null,
  },
  {
    id: 'ins-205',
    name: 'Pension Shield Plan',
    category: 'insurance',
    description:
      'Monthly contribution pension plan with employer-match compatibility. Builds a retirement corpus with guaranteed minimum returns.',
    expectedReturn: 6.3,
    riskLevel: 'low',
    liquidity: 'locked',
    timeHorizon: 'long',
    minInvestment: 8000,
    image: null,
  },

  // ── CRYPTO (high risk, 12-27%) ──
  {
    id: 'cry-301',
    name: 'Bitcoin Digital Reserve',
    category: 'crypto',
    description:
      'Direct exposure to Bitcoin via regulated custody. Highly volatile; best suited for investors with strong conviction and long holding periods.',
    expectedReturn: 22.5,
    riskLevel: 'high',
    liquidity: 'easy',
    timeHorizon: 'long',
    minInvestment: 5000,
    image: null,
  },
  {
    id: 'cry-302',
    name: 'Ethereum Smart Contract Fund',
    category: 'crypto',
    description:
      'Exposure to the Ethereum ecosystem including staking rewards. Carries meaningful smart-contract and market risk but offers outsized potential returns.',
    expectedReturn: 18.7,
    riskLevel: 'high',
    liquidity: 'easy',
    timeHorizon: 'long',
    minInvestment: 3000,
    image: null,
  },
  {
    id: 'cry-303',
    name: 'Diversified Crypto Basket',
    category: 'crypto',
    description:
      'A curated basket of top-10 cryptocurrencies by market cap, rebalanced quarterly. Reduces single-asset risk while keeping high-return potential.',
    expectedReturn: 16.2,
    riskLevel: 'high',
    liquidity: 'moderate',
    timeHorizon: 'long',
    minInvestment: 10000,
    image: null,
  },
  {
    id: 'cry-304',
    name: 'DeFi Yield Aggregator',
    category: 'crypto',
    description:
      'Pools funds across decentralised finance protocols to capture lending and liquidity-provision yields. Smart contract risk is significant.',
    expectedReturn: 24.3,
    riskLevel: 'high',
    liquidity: 'easy',
    timeHorizon: 'long',
    minInvestment: 2000,
    image: null,
  },
  {
    id: 'cry-305',
    name: 'Stablecoin Yield Vault',
    category: 'crypto',
    description:
      'Earns yield by lending stablecoins on major DeFi platforms. Lower crypto volatility since holdings are pegged to USD, but smart contract risk remains.',
    expectedReturn: 13.5,
    riskLevel: 'high',
    liquidity: 'easy',
    timeHorizon: 'long',
    minInvestment: 5000,
    image: null,
  },
  {
    id: 'cry-306',
    name: 'NFT & Metaverse Index',
    category: 'crypto',
    description:
      'Tracks a basket of tokens from the NFT and metaverse ecosystem. Extremely volatile with moonshot potential for long-term believers.',
    expectedReturn: 26.8,
    riskLevel: 'high',
    liquidity: 'moderate',
    timeHorizon: 'long',
    minInvestment: 3000,
    image: null,
  },
];
