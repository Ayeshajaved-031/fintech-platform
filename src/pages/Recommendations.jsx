import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useProducts } from '../utils/useProducts';
import RecommendationList from '../components/RecommendationList';
import './Recommendations.css';

/**
 * Recommendations page — profile-driven product suggestions.
 * Requires a completed profile; otherwise shows CTA.
 */
export default function Recommendations() {
  const { profile, isProfileComplete, getRecommendations } = useUserProfile();
  const { products, loading } = useProducts();

  const complete = isProfileComplete();

  const recommendations = useMemo(() => {
    return complete ? getRecommendations(products) : [];
  }, [complete, getRecommendations, products]);

  if (!complete) {
    return (
      <div className="page-enter container rec-page">
        <header className="rec-head">
          <span className="eyebrow">For You</span>
          <h1>Personalised Picks</h1>
        </header>
        <div className="rec-no-profile">
          <h3>Profile required</h3>
          <p>
            Our recommendation engine needs your financial profile to match you with
            suitable products. It takes less than a minute.
          </p>
          <Link to="/profile" className="btn btn-primary">Build Profile →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter container rec-page">
      <header className="rec-head">
        <span className="eyebrow">For You</span>
        <h1>Personalised Picks</h1>
        <p className="rec-sub">
          Based on your profile: <strong>{profile.riskTolerance}</strong> risk,{' '}
          <strong>{profile.investmentHorizon}</strong>-term horizon,{' '}
          <strong>PKR {Number(profile.monthlyCapacity).toLocaleString()}</strong> monthly capacity.
          {' '}<Link to="/profile" className="rec-edit">Edit profile</Link>
        </p>
      </header>

      <div className="rec-meta">
        <span className="rec-count mono">{recommendations.length}</span>
        <span> product{recommendations.length !== 1 ? 's' : ''} matched</span>
      </div>

      {loading ? (
        <div className="loading">Loading products…</div>
      ) : (
        <RecommendationList recommendations={recommendations} />
      )}
    </div>
  );
}
