import { Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';
import RiskBadge from './RiskBadge';
import ReturnDisplay from './ReturnDisplay';
import './ProductCard.css';

/**
 * ProductCard — single product summary card.
 * Hover reveals an overlay with additional detail.
 */
export default function ProductCard({ product }) {
  const { addToPortfolio, isInPortfolio } = usePortfolio();
  const inPortfolio = isInPortfolio(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inPortfolio) addToPortfolio(product, product.minInvestment);
  };

  const categoryLabel = {
    savings:    'Savings',
    investment: 'Investment',
    insurance:  'Insurance',
    crypto:     'Digital Asset',
  }[product.category] || product.category;

  return (
    <article className="product-card">
      <div className="card-head">
        <span className="category-tag">{categoryLabel}</span>
        <RiskBadge riskLevel={product.riskLevel} size="sm" />
      </div>

      <Link to={`/product/${product.id}`} className="card-body">
        <h3 className="card-title">{product.name}</h3>

        <div className="card-return">
          <span className="eyebrow">Expected Annual Return</span>
          <ReturnDisplay value={product.expectedReturn} size="md" />
        </div>

        <dl className="card-meta">
          <div>
            <dt>Minimum</dt>
            <dd className="mono">PKR {product.minInvestment.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Liquidity</dt>
            <dd>{product.liquidity}</dd>
          </div>
          <div>
            <dt>Horizon</dt>
            <dd>{product.timeHorizon}-term</dd>
          </div>
        </dl>

        <div className="details-overlay">
          <p>{product.description?.slice(0, 140)}{product.description?.length > 140 ? '…' : ''}</p>
          <span className="overlay-cta">View Details →</span>
        </div>
      </Link>

      <div className="card-foot">
        <Link to={`/product/${product.id}`} className="btn-link">View Details</Link>
        <button
          type="button"
          onClick={handleAdd}
          className={`btn-add ${inPortfolio ? 'added' : ''}`}
          disabled={inPortfolio}
        >
          {inPortfolio ? 'Added ✓' : 'Add to Portfolio'}
        </button>
      </div>
    </article>
  );
}
