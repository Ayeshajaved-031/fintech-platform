import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../utils/useProducts';
import FilterPanel from '../components/FilterPanel';
import ProductList from '../components/ProductList';
import './ProductListing.css';

const initialFilters = {
  riskLevels: [],
  categories: [],
  minReturn: 0,
  maxReturn: 30,
  liquidity: 'all',
  timeHorizon: 'all',
  maxMinInvestment: 1000000,
};

export default function ProductListing() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);

  // Honour ?category=xxx from Home category cards
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setFilters((f) => ({ ...f, categories: [cat] }));
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  /**
   * Filter combination — strict AND logic.
   * A product must satisfy every active filter.
   */
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(p.riskLevel)) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
      if (p.expectedReturn < filters.minReturn || p.expectedReturn > filters.maxReturn) return false;
      if (filters.liquidity !== 'all' && p.liquidity !== filters.liquidity) return false;
      if (filters.timeHorizon !== 'all' && p.timeHorizon !== filters.timeHorizon) return false;
      if (p.minInvestment > filters.maxMinInvestment) return false;
      return true;
    });
  }, [products, filters]);

  return (
    <div className="page-enter container listing-page">
      <header className="listing-head">
        <span className="eyebrow">Catalog</span>
        <h1>All Products</h1>
        <p className="listing-sub">
          Every instrument we track. Refine by risk, return, category, liquidity and budget.
        </p>
      </header>

      {error && (
        <div className="listing-warn">
          Note: Live catalog unavailable ({error}). Showing curated products only.
        </div>
      )}

      <div className="listing-layout">
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          productCount={filtered.length}
        />

        <main className="listing-main">
          {loading ? (
            <div className="loading">Loading products…</div>
          ) : (
            <ProductList products={filtered} />
          )}
        </main>
      </div>
    </div>
  );
}
