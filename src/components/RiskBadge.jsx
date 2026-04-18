import './RiskBadge.css';

/**
 * RiskBadge — color-coded badge for risk level.
 * Props: riskLevel ('low'|'medium'|'high'), size ('sm'|'md')
 */
export default function RiskBadge({ riskLevel = 'low', size = 'md' }) {
  const label = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  }[riskLevel] || riskLevel;

  return (
    <span className={`risk-badge risk-${riskLevel} size-${size}`}>
      <span className="risk-dot" aria-hidden="true" />
      {label}
    </span>
  );
}
