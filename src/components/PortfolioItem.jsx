import { Link } from 'react-router-dom';
import { useState } from 'react';
import RiskBadge from './RiskBadge';
import './PortfolioItem.css';

/**
 * PortfolioItem — single entry in the portfolio list.
 * Supports inline allocation edit + removal.
 */
export default function PortfolioItem({ item, onRemove, onUpdateAmount, monthlyCapacity }) {
  const { product, amount } = item;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(amount);
  const [constraintError, setConstraintError] = useState('');

  const save = () => {
    const num = Number(value);
    if (num < product.minInvestment) {
      setConstraintError(`Below minimum of PKR ${product.minInvestment.toLocaleString()}`);
      return;
    }
    // Hidden twist #4 — single product max 50% of monthly capacity
    if (monthlyCapacity > 0 && num > monthlyCapacity * 0.5) {
      setConstraintError(`Cannot allocate more than 50% (PKR ${Math.floor(monthlyCapacity * 0.5).toLocaleString()}) to one product`);
      return;
    }
    setConstraintError('');
    onUpdateAmount(product.id, num);
    setEditing(false);
  };

  return (
    <article className="p-item">
      <div className="p-item-main">
        <div className="p-item-head">
          <Link to={`/product/${product.id}`} className="p-item-name">
            {product.name}
          </Link>
          <RiskBadge riskLevel={product.riskLevel} size="sm" />
        </div>
        <div className="p-item-meta mono">
          {product.expectedReturn.toFixed(1)}% return · {product.liquidity} liquidity · {product.timeHorizon}-term
        </div>
      </div>

      <div className="p-item-alloc">
        <span className="eyebrow">Allocated</span>
        {editing ? (
          <div className="alloc-edit">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="alloc-input mono"
            />
            <button type="button" onClick={save} className="alloc-save">Save</button>
          </div>
        ) : (
          <button type="button" className="alloc-display mono" onClick={() => setEditing(true)}>
            PKR {amount.toLocaleString()}
            <span className="edit-hint">edit</span>
          </button>
        )}
        {constraintError && <p className="alloc-err">{constraintError}</p>}
      </div>

      <button type="button" className="p-item-remove" onClick={() => onRemove(product.id)} aria-label="Remove">
        ×
      </button>
    </article>
  );
}
