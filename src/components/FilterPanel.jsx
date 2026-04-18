import './FilterPanel.css';

/**
 * FilterPanel — controlled filter UI.
 * Parent owns filter state; we call onFilterChange(key, value).
 *
 * Filters:
 *  - riskLevels        (multi-select)
 *  - categories        (multi-select)
 *  - minReturn/maxReturn (range)
 *  - liquidity         (single select)
 *  - timeHorizon       (single select)
 *  - maxMinInvestment  (budget)
 */
export default function FilterPanel({ filters, onFilterChange, onReset, productCount }) {
  const toggleArr = (key, value) => {
    const arr = filters[key];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onFilterChange(key, next);
  };

  return (
    <aside className="filter-panel">
      <div className="filter-head">
        <div>
          <span className="eyebrow">Refine</span>
          <h3 className="filter-title">Filters</h3>
        </div>
        <button type="button" className="filter-reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="filter-count">
        <span className="mono">{productCount}</span> products match
      </div>

      {/* Risk Level — multi */}
      <div className="filter-group">
        <label className="filter-label">Risk Level</label>
        <div className="chip-row">
          {['low', 'medium', 'high'].map((r) => (
            <button
              key={r}
              type="button"
              className={`chip ${filters.riskLevels.includes(r) ? 'active' : ''} chip-${r}`}
              onClick={() => toggleArr('riskLevels', r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Category — multi */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <div className="chip-row">
          {['savings', 'investment', 'insurance', 'crypto'].map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${filters.categories.includes(c) ? 'active' : ''}`}
              onClick={() => toggleArr('categories', c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Return range */}
      <div className="filter-group">
        <label className="filter-label">
          Expected Return
          <span className="range-values mono">
            {filters.minReturn}% – {filters.maxReturn}%
          </span>
        </label>
        <div className="range-row">
          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            value={filters.minReturn}
            onChange={(e) => onFilterChange('minReturn', Number(e.target.value))}
          />
          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            value={filters.maxReturn}
            onChange={(e) => onFilterChange('maxReturn', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Liquidity — single */}
      <div className="filter-group">
        <label className="filter-label">Liquidity</label>
        <select
          value={filters.liquidity}
          onChange={(e) => onFilterChange('liquidity', e.target.value)}
          className="filter-select"
        >
          <option value="all">Any</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="locked">Locked</option>
        </select>
      </div>

      {/* Time horizon — single */}
      <div className="filter-group">
        <label className="filter-label">Time Horizon</label>
        <select
          value={filters.timeHorizon}
          onChange={(e) => onFilterChange('timeHorizon', e.target.value)}
          className="filter-select"
        >
          <option value="all">Any</option>
          <option value="short">Short (1-2 yrs)</option>
          <option value="medium">Medium (3-5 yrs)</option>
          <option value="long">Long (5+ yrs)</option>
        </select>
      </div>

      {/* Budget */}
      <div className="filter-group">
        <label className="filter-label">Max Minimum Investment (PKR)</label>
        <input
          type="number"
          min="0"
          step="1000"
          value={filters.maxMinInvestment}
          onChange={(e) => onFilterChange('maxMinInvestment', Number(e.target.value))}
          className="filter-input mono"
        />
      </div>
    </aside>
  );
}
