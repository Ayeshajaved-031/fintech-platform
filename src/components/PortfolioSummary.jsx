import ReturnDisplay from './ReturnDisplay';
import './PortfolioSummary.css';

/**
 * PortfolioSummary — shows the portfolio's derived stats.
 * Pure presentation; all values come from PortfolioContext.
 */
export default function PortfolioSummary({
  totalInvested,
  weightedReturn,
  riskDistribution,
  categoryDistribution,
  diversificationScore,
  highRiskWarning,
  count,
}) {
  if (count === 0) {
    return (
      <div className="summary empty">
        <p>Your portfolio is empty. Add products from the catalog to see statistics.</p>
      </div>
    );
  }

  const projected = (totalInvested * weightedReturn) / 100;

  return (
    <div className="summary">
      <div className="summary-grid">
        <div className="stat">
          <span className="eyebrow">Total Invested</span>
          <div className="stat-value mono">PKR {totalInvested.toLocaleString()}</div>
        </div>

        <div className="stat">
          <span className="eyebrow">Weighted Annual Return</span>
          <ReturnDisplay value={weightedReturn} size="lg" />
        </div>

        <div className="stat">
          <span className="eyebrow">Projected Yearly Gain</span>
          <div className="stat-value mono gold">
            PKR {Math.round(projected).toLocaleString()}
          </div>
        </div>

        <div className="stat">
          <span className="eyebrow">Diversification Score</span>
          <div className="stat-value mono">
            {diversificationScore}<span className="unit">/100</span>
          </div>
        </div>
      </div>

      {/* Risk distribution bar */}
      <div className="risk-bar-block">
        <span className="eyebrow">Risk Distribution</span>
        <div className="risk-bar" aria-label="Risk distribution">
          <div className="seg seg-low"  style={{ width: `${riskDistribution.low}%` }} />
          <div className="seg seg-med"  style={{ width: `${riskDistribution.medium}%` }} />
          <div className="seg seg-high" style={{ width: `${riskDistribution.high}%` }} />
        </div>
        <div className="risk-legend">
          <span><i className="dot dot-low" /> Low {riskDistribution.low}%</span>
          <span><i className="dot dot-med" /> Medium {riskDistribution.medium}%</span>
          <span><i className="dot dot-high" /> High {riskDistribution.high}%</span>
        </div>
      </div>

      {/* Category distribution */}
      {Object.keys(categoryDistribution).length > 0 && (
        <div className="cat-block">
          <span className="eyebrow">Category Breakdown</span>
          <ul className="cat-list">
            {Object.entries(categoryDistribution).map(([cat, pct]) => (
              <li key={cat}>
                <span className="cat-name">{cat}</span>
                <span className="cat-bar-wrap">
                  <span className="cat-bar" style={{ width: `${pct}%` }} />
                </span>
                <span className="cat-pct mono">{pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {highRiskWarning && (
        <div className="warning">
          ⚠ Over 70% of your portfolio is allocated to high-risk products.
          Consider diversifying to reduce volatility exposure.
        </div>
      )}
    </div>
  );
}
