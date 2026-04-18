import { usePortfolio } from '../contexts/PortfolioContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import PortfolioSummary from '../components/PortfolioSummary';
import PortfolioItem from '../components/PortfolioItem';
import { Link } from 'react-router-dom';
import './Portfolio.css';

/**
 * Portfolio page — displays all items, summary stats, and risk warnings.
 * Uses PortfolioContext for state, UserProfileContext for the monthly capacity
 * constraint in PortfolioItem.
 */
export default function Portfolio() {
  const {
    items,
    totalInvested,
    weightedReturn,
    riskDistribution,
    categoryDistribution,
    diversificationScore,
    highRiskWarning,
    removeFromPortfolio,
    updateAllocation,
    clearPortfolio,
    count,
  } = usePortfolio();

  const { profile } = useUserProfile();
  const capacity = profile?.monthlyCapacity || 0;

  return (
    <div className="page-enter container portfolio-page">
      <header className="port-head">
        <div>
          <span className="eyebrow">Portfolio</span>
          <h1>Your Portfolio</h1>
        </div>
        {count > 0 && (
          <button type="button" className="btn btn-ghost" onClick={clearPortfolio}>
            Clear All
          </button>
        )}
      </header>

      <PortfolioSummary
        totalInvested={totalInvested}
        weightedReturn={weightedReturn}
        riskDistribution={riskDistribution}
        categoryDistribution={categoryDistribution}
        diversificationScore={diversificationScore}
        highRiskWarning={highRiskWarning}
        count={count}
      />

      {count > 0 ? (
        <section className="port-list stagger">
          <span className="eyebrow port-list-label">Holdings ({count})</span>
          {items.map((item) => (
            <PortfolioItem
              key={item.product.id}
              item={item}
              onRemove={removeFromPortfolio}
              onUpdateAmount={updateAllocation}
              monthlyCapacity={capacity}
            />
          ))}
        </section>
      ) : (
        <div className="port-empty">
          <p>Start by exploring our catalog and adding products.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      )}
    </div>
  );
}
