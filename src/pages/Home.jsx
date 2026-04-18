import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useProducts } from '../utils/useProducts';
import ProductCard from '../components/ProductCard';
import './Home.css';

/**
 * Home — landing page.
 * Featured products are computed dynamically: one highest-return
 * per category, with low-risk tie-break.
 */
export default function Home() {
  const { products, loading } = useProducts();

  const featured = useMemo(() => {
    if (!products.length) return [];
    const byCategory = {};
    for (const p of products) {
      const current = byCategory[p.category];
      if (!current || p.expectedReturn > current.expectedReturn) {
        byCategory[p.category] = p;
      }
    }
    return Object.values(byCategory).slice(0, 4);
  }, [products]);

  const stats = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    const avgReturn = products.length
      ? (products.reduce((s, p) => s + p.expectedReturn, 0) / products.length).toFixed(1)
      : '0';
    return { total: products.length, categories: cats.size, avgReturn };
  }, [products]);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="eyebrow">Financial Product Discovery · Est. 2025</span>
            <h1 className="hero-title">
              Invest with<br />
              <em>intention,</em><br />
              not <span className="strike">impulse.</span>
            </h1>
            <p className="hero-lede">
              Meridian matches you to savings, funds, insurance and digital assets
              that fit your real financial profile — not the algorithm&rsquo;s guess.
            </p>
            <div className="hero-ctas">
              <Link to="/profile" className="btn btn-primary">Build Your Profile</Link>
              <Link to="/products" className="btn btn-ghost">Browse Catalog</Link>
            </div>
          </div>

          <div className="hero-side">
            <div className="ticker">
              <div className="ticker-row">
                <span className="eyebrow">Avg. Expected Return</span>
                <span className="ticker-val mono">{stats.avgReturn}%</span>
              </div>
              <div className="ticker-row">
                <span className="eyebrow">Products Listed</span>
                <span className="ticker-val mono">{String(stats.total).padStart(3, '0')}</span>
              </div>
              <div className="ticker-row">
                <span className="eyebrow">Asset Categories</span>
                <span className="ticker-val mono">{stats.categories}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Categories</span>
            <h2>Four ways to grow capital.</h2>
          </div>

          <div className="category-grid">
            {[
              { slug: 'savings',    name: 'Savings',     desc: 'Low risk · High liquidity',    num: '01' },
              { slug: 'investment', name: 'Investment',  desc: 'Moderate risk · Growth',       num: '02' },
              { slug: 'insurance',  name: 'Insurance',   desc: 'Protection · Long horizon',    num: '03' },
              { slug: 'crypto',     name: 'Crypto',      desc: 'High risk · High potential',   num: '04' },
            ].map((c) => (
              <Link key={c.slug} to={`/products?category=${c.slug}`} className="cat-card">
                <span className="cat-num mono">{c.num}</span>
                <h3 className="cat-name">{c.name}</h3>
                <span className="cat-desc">{c.desc}</span>
                <span className="cat-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured</span>
            <h2>Top performers by category.</h2>
          </div>

          {loading ? (
            <div className="loading">Loading products…</div>
          ) : (
            <div className="product-grid stagger">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <h2>Ready for personalised matches?</h2>
          <p>Build a financial profile in under a minute. It drives every recommendation.</p>
          <Link to="/profile" className="btn btn-gold">Get Started →</Link>
        </div>
      </section>
    </div>
  );
}
