import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

/**
 * PortfolioContext
 * -----------------------------------------------------------
 * Users add products to a "portfolio" (not a cart) with an
 * allocated PKR amount. We derive:
 *   - totalInvested
 *   - weightedReturn (portfolio expected annual return)
 *   - riskDistribution (% in each risk bucket)
 *   - categoryDistribution
 *   - diversificationScore (bonus metric)
 *
 * All derived values are computed with useMemo so they update
 * automatically whenever items change.
 */

const PortfolioContext = createContext(null);
const STORAGE_KEY = 'meridian.portfolio.v1';

export function PortfolioProvider({ children }) {
  // Items: [{ product, amount }]
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch { /* ignore */ }
  }, [items]);

  const addToPortfolio = useCallback((product, amount) => {
    const amt = Number(amount) || product.minInvestment;
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, amount: i.amount + amt } : i
        );
      }
      return [...prev, { product, amount: amt }];
    });
  }, []);

  const removeFromPortfolio = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateAllocation = useCallback((productId, newAmount) => {
    const amt = Math.max(0, Number(newAmount) || 0);
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, amount: amt } : i))
    );
  }, []);

  const clearPortfolio = useCallback(() => setItems([]), []);

  const isInPortfolio = useCallback(
    (productId) => items.some((i) => i.product.id === productId),
    [items]
  );

  /**
   * Derived stats — recomputed whenever items change.
   * weightedReturn = Σ (allocation_i / total) * expectedReturn_i
   */
  const stats = useMemo(() => {
    const totalInvested = items.reduce((sum, i) => sum + i.amount, 0);

    if (totalInvested === 0) {
      return {
        totalInvested: 0,
        weightedReturn: 0,
        riskDistribution: { low: 0, medium: 0, high: 0 },
        categoryDistribution: {},
        diversificationScore: 0,
        highRiskWarning: false,
      };
    }

    let weightedReturn = 0;
    const riskDistribution = { low: 0, medium: 0, high: 0 };
    const categoryDistribution = {};

    for (const { product, amount } of items) {
      const weight = amount / totalInvested;
      weightedReturn += weight * product.expectedReturn;
      riskDistribution[product.riskLevel] += (amount / totalInvested) * 100;
      categoryDistribution[product.category] =
        (categoryDistribution[product.category] || 0) + (amount / totalInvested) * 100;
    }

    // Diversification score: 100 if evenly spread across categories,
    // lower if concentrated. Uses normalized Herfindahl index.
    const catShares = Object.values(categoryDistribution).map((p) => p / 100);
    const hhi = catShares.reduce((s, x) => s + x * x, 0); // 0..1
    const n = catShares.length || 1;
    // Normalize: min hhi is 1/n (perfect spread), max is 1 (all in one)
    const minHhi = 1 / n;
    const diversificationScore = n === 1
      ? 0
      : Math.round(((1 - hhi) / (1 - minHhi)) * 100);

    const highRiskWarning = riskDistribution.high > 70;

    return {
      totalInvested,
      weightedReturn: Number(weightedReturn.toFixed(2)),
      riskDistribution: {
        low: Number(riskDistribution.low.toFixed(1)),
        medium: Number(riskDistribution.medium.toFixed(1)),
        high: Number(riskDistribution.high.toFixed(1)),
      },
      categoryDistribution: Object.fromEntries(
        Object.entries(categoryDistribution).map(([k, v]) => [k, Number(v.toFixed(1))])
      ),
      diversificationScore,
      highRiskWarning,
    };
  }, [items]);

  const value = {
    items,
    ...stats,
    addToPortfolio,
    removeFromPortfolio,
    updateAllocation,
    clearPortfolio,
    isInPortfolio,
    count: items.length,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
