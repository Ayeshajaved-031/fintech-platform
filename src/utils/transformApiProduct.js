/**
 * transformApiProduct.js
 * -----------------------------------------------------------
 * Deterministic transformation from raw Fake Store API data
 * into our internal FinancialProduct shape.
 *
 * Deterministic = same input product ALWAYS produces the same
 * financial attributes. No Math.random(). We derive variance
 * using the product's id as a seed via a cheap hash.
 */

// Category mapping: API categories -> FinTech categories
// Covers both Fake Store API and DummyJSON categories
const CATEGORY_MAP = {
  // Fake Store API categories
  'electronics':       'investment',
  'jewelery':          'savings',
  "men's clothing":    'insurance',
  "women's clothing":  'crypto',
  // DummyJSON categories
  'smartphones':       'crypto',
  'laptops':           'investment',
  'fragrances':        'savings',
  'skincare':          'insurance',
  'groceries':         'savings',
  'home-decoration':   'insurance',
  'furniture':         'investment',
  'tops':              'crypto',
  'womens-dresses':    'crypto',
  'womens-shoes':      'insurance',
  'mens-shirts':       'insurance',
  'mens-shoes':        'investment',
  'mens-watches':      'investment',
  'womens-watches':    'savings',
  'womens-bags':       'crypto',
  'womens-jewellery':  'savings',
  'sunglasses':        'crypto',
  'automotive':        'investment',
  'motorcycle':        'investment',
  'lighting':          'savings',
  'beauty':            'savings',
  'sports-accessories':'investment',
  'kitchen-accessories':'savings',
  'tablets':           'investment',
  'mobile-accessories':'crypto',
};

// Risk follows category (consistent real-world analogy)
const RISK_BY_CATEGORY = {
  savings:    'low',
  insurance:  'low',
  investment: 'medium',
  crypto:     'high',
};

// Return ranges per risk level — realistic FinTech bands
const RETURN_BANDS = {
  low:    { min: 3,  max: 7  },
  medium: { min: 7,  max: 12 },
  high:   { min: 12, max: 27 },
};

/** Cheap deterministic hash: string/number -> 0..1 */
function seed(id) {
  const s = String(id);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Map to 0..1
  return ((h >>> 0) % 10000) / 10000;
}

/** Deterministic pick from array using seed */
function pickDeterministic(arr, seedValue) {
  return arr[Math.floor(seedValue * arr.length) % arr.length];
}

/** Liquidity rules driven by category + risk, not random */
function assignLiquidity(category, riskLevel, seedValue) {
  if (category === 'savings')   return 'easy';
  if (category === 'insurance') return 'locked';
  if (category === 'crypto')    return 'easy';
  // investment: split by seed for variety but deterministic
  return pickDeterministic(['easy', 'moderate', 'moderate'], seedValue);
}

/** Time horizon rules */
function assignTimeHorizon(riskLevel, category, seedValue) {
  if (category === 'savings')   return 'short';
  if (category === 'insurance') return 'long';
  if (riskLevel === 'high')     return 'long';
  // medium-risk investment: mix of medium and long
  return pickDeterministic(['medium', 'long'], seedValue);
}

/**
 * Produce a human-friendly financial product name.
 * Keeps the original title but appends a category label.
 */
function formatName(title, category) {
  const suffixes = {
    savings:    'Savings Plan',
    investment: 'Growth Fund',
    insurance:  'Protection Plan',
    crypto:     'Digital Asset',
  };
  const base = title.length > 32 ? title.slice(0, 32).trim() + '…' : title;
  return `${base} — ${suffixes[category] || 'Product'}`;
}

export function transformApiProduct(apiProduct) {
  const s = seed(apiProduct.id);

  const category  = CATEGORY_MAP[apiProduct.category] || 'investment';
  const riskLevel = RISK_BY_CATEGORY[category];

  const band = RETURN_BANDS[riskLevel];
  const expectedReturn = Number((band.min + s * (band.max - band.min)).toFixed(2));

  // Scale price to a realistic PKR minimum investment
  const minInvestment = Math.max(1000, Math.round(apiProduct.price * 500));

  return {
    id: `api-${apiProduct.id}`,
    name: formatName(apiProduct.title, category),
    category,
    description: apiProduct.description,
    expectedReturn,
    riskLevel,
    liquidity: assignLiquidity(category, riskLevel, s),
    timeHorizon: assignTimeHorizon(riskLevel, category, s),
    minInvestment,
    image: apiProduct.image,
    source: 'api',
  };
}

export function transformApiProducts(apiProducts) {
  if (!Array.isArray(apiProducts)) return [];
  return apiProducts.map(transformApiProduct);
}
