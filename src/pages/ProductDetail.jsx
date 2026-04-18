import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../utils/useProducts';
import { usePortfolio } from '../contexts/PortfolioContext';
import RiskBadge from '../components/RiskBadge';
import ReturnDisplay from '../components/ReturnDisplay';
import './ProductDetail.css';

/**
 * generateDecisionInsight
 * -----------------------------------------------------------
 * Produces a dynamic multi-sentence insight string based on
 * a product's attributes. NOT hardcoded per product.
 */
function generateDecisionInsight(product) {
  const insights = [];

  if (product.riskLevel === 'low') {
    insights.push('Suitable for conservative investors prioritising capital preservation over growth.');
  } else if (product.riskLevel === 'medium') {
    insights.push('Fits moderate investors who accept some volatility in exchange for higher long-term returns.');
  } else {
    insights.push('Best for aggressive investors comfortable with significant short-term volatility.');
  }

  if (product.liquidity === 'locked') {
    insights.push('Requires commitment — early withdrawal typically incurs penalties or is not permitted.');
  } else if (product.liquidity === 'moderate') {
    insights.push('Funds are accessible with some notice; not ideal for emergency reserves.');
  } else {
    insights.push('Funds can be accessed quickly, making this suitable for flexible liquidity needs.');
  }

  if (product.timeHorizon === 'long') {
    insights.push('Hold for five years or more to smooth out volatility and maximise compounding.');
  } else if (product.timeHorizon === 'medium') {
    insights.push('A three-to-five-year horizon aligns with this product&rsquo;s return profile.');
  } else {
    insights.push('Appropriate for one-to-two year goals without excess volatility exposure.');
  }

  if (product.expectedReturn >= 15) {
    insights.push('High expected return reflects correspondingly high downside risk — size the position accordingly.');
  }

  return insights.join(' ');
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToPortfolio, isInPortfolio } = usePortfolio();

  const [investAmount, setInvestAmount] = useState(10000);
  const [compareId, setCompareId] = useState('');

  const product = products.find((p) => String(p.id) === String(id));
  const compareWith = products.find((p) => String(p.id) === String(compareId));

  const projections = useMemo(() => {
    if (!product) return null;
    const r = product.expectedReturn / 100;
    const principal = Number(investAmount) || 0;
    return {
      y1:  Math.round(principal * Math.pow(1 + r, 1)),
      y3:  Math.round(principal * Math.pow(1 + r, 3)),
      y5:  Math.round(principal * Math.pow(1 + r, 5)),
      y10: Math.round(principal * Math.pow(1 + r, 10)),
    };
  }, [product, investAmount]);

  if (loading) return <div className="container loading">Loading…</div>;

  if (!product) {
    return (
      <div className="container page-enter not-found">
        <h1>Product not found</h1>
        <p>The requested product id ({id}) does not exist in our catalog.</p>
        <Link to="/products" className="btn btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const inPortfolio = isInPortfolio(product.id);
  const riskPct = { low: 28, medium: 60, high: 92 }[product.riskLevel] || 50;
  const insight = generateDecisionInsight(product);

  return (
    <div className="page-enter container detail-page">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

      <header className="detail-head">
        <div className="detail-head-text">
          <span className="eyebrow">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-badges">
            <RiskBadge riskLevel={product.riskLevel} />
            <span className="liq-badge">{product.liquidity} liquidity</span>
            <span className="liq-badge">{product.timeHorizon}-term</span>
          </div>
        </div>

        <div className="detail-return-card">
          <span className="eyebrow">Expected Annual Return</span>
          <ReturnDisplay value={product.expectedReturn} size="xl" />
          <span className="detail-min mono">Min. PKR {product.minInvestment.toLocaleString()}</span>
        </div>
      </header>

      <div className="detail-grid">
        {/* Left column */}
        <section className="detail-col">
          <div className="block">
            <span className="eyebrow">About this product</span>
            <p className="detail-desc">{product.description}</p>
          </div>

          <div className="block">
            <span className="eyebrow">Decision Insight</span>
            <p className="insight" dangerouslySetInnerHTML={{ __html: insight }} />
          </div>

          <div className="block">
            <span className="eyebrow">Risk Visualisation</span>
            <div className="risk-gauge">
              <div className="gauge-track">
                <div className="gauge-fill" style={{ width: `${riskPct}%` }} />
              </div>
              <div className="gauge-labels">
                <span>Low</span><span>Medium</span><span>High</span>
              </div>
            </div>
          </div>

          <div className="block">
            <span className="eyebrow">Financial Attributes</span>
            <dl className="attr-list">
              <div><dt>Category</dt><dd>{product.category}</dd></div>
              <div><dt>Risk Level</dt><dd>{product.riskLevel}</dd></div>
              <div><dt>Liquidity</dt><dd>{product.liquidity}</dd></div>
              <div><dt>Time Horizon</dt><dd>{product.timeHorizon}</dd></div>
              <div><dt>Minimum Investment</dt><dd className="mono">PKR {product.minInvestment.toLocaleString()}</dd></div>
              <div><dt>Expected Return</dt><dd className="mono">{product.expectedReturn.toFixed(2)}%</dd></div>
            </dl>
          </div>
        </section>

        {/* Right column */}
        <aside className="detail-side">
          {/* Calculator */}
          <div className="calc-card">
            <span className="eyebrow">Return Projection</span>
            <h3>Compound Calculator</h3>
            <label className="calc-label">
              Investment Amount (PKR)
              <input
                type="number"
                min="0"
                step="1000"
                value={investAmount}
                onChange={(e) => setInvestAmount(Number(e.target.value))}
                className="calc-input mono"
              />
            </label>

            {projections && (
              <ul className="calc-results">
                <li><span>After 1 year</span><span className="mono">PKR {projections.y1.toLocaleString()}</span></li>
                <li><span>After 3 years</span><span className="mono">PKR {projections.y3.toLocaleString()}</span></li>
                <li><span>After 5 years</span><span className="mono">PKR {projections.y5.toLocaleString()}</span></li>
                <li className="hl"><span>After 10 years</span><span className="mono">PKR {projections.y10.toLocaleString()}</span></li>
              </ul>
            )}

            <button
              type="button"
              className={`btn ${inPortfolio ? 'btn-ghost' : 'btn-primary'} calc-add`}
              disabled={inPortfolio}
              onClick={() => addToPortfolio(product, Math.max(product.minInvestment, Number(investAmount)))}
            >
              {inPortfolio ? 'Added to Portfolio ✓' : 'Add to Portfolio'}
            </button>
          </div>

          {/* Compare */}
          <div className="compare-card">
            <span className="eyebrow">Side-by-side</span>
            <h3>Compare Product</h3>
            <select
              value={compareId}
              onChange={(e) => setCompareId(e.target.value)}
              className="filter-select"
            >
              <option value="">Choose a product to compare…</option>
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 30)
                .map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>

            {compareWith && (
              <table className="compare-table mono">
                <thead>
                  <tr>
                    <th></th>
                    <th>{product.name.split('—')[0]}</th>
                    <th>{compareWith.name.split('—')[0]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Return</td><td>{product.expectedReturn.toFixed(1)}%</td><td>{compareWith.expectedReturn.toFixed(1)}%</td></tr>
                  <tr><td>Risk</td><td>{product.riskLevel}</td><td>{compareWith.riskLevel}</td></tr>
                  <tr><td>Liquidity</td><td>{product.liquidity}</td><td>{compareWith.liquidity}</td></tr>
                  <tr><td>Horizon</td><td>{product.timeHorizon}</td><td>{compareWith.timeHorizon}</td></tr>
                  <tr><td>Min.</td><td>{product.minInvestment.toLocaleString()}</td><td>{compareWith.minInvestment.toLocaleString()}</td></tr>
                </tbody>
              </table>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
