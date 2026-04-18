import { NavLink } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';
import './Navbar.css';

/**
 * Navbar — persistent navigation. Shows active route and portfolio count.
 */
export default function Navbar() {
  const { count } = usePortfolio();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <NavLink to="/" className="brand">
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 22 L11 9 L16 18 L21 7 L26 22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Meridian</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/recommendations">For You</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/portfolio" className="nav-portfolio">
            Portfolio
            {count > 0 && <span className="nav-badge mono">{count}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
