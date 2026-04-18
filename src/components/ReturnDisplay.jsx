import './ReturnDisplay.css';

/**
 * ReturnDisplay — large formatted expected return.
 * Props: value (number), showTrend (bool), size
 */
export default function ReturnDisplay({ value, showTrend = false, size = 'md' }) {
  const formatted = Number(value).toFixed(1);
  return (
    <span className={`return-display size-${size}`}>
      <span className="return-value mono">{formatted}</span>
      <span className="return-pct">%</span>
      {showTrend && (
        <span className="return-trend" aria-hidden="true">↗</span>
      )}
    </span>
  );
}
