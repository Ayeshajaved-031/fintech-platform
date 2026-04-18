import { useUserProfile } from '../contexts/UserProfileContext';
import { useProducts } from '../utils/useProducts';
import ProfileForm from '../components/ProfileForm';
import './UserProfile.css';

/**
 * UserProfile page — the most critical page for FinTech logic.
 * Shows form, current saved profile summary, and how many products
 * match the current profile (recommendation preview).
 */
export default function UserProfile() {
  const { profile, updateProfile, isProfileComplete, getRecommendations } = useUserProfile();
  const { products } = useProducts();

  const complete = isProfileComplete();
  const matchCount = complete ? getRecommendations(products).length : 0;

  const handleSubmit = (data) => {
    updateProfile(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const labelMap = {
    riskTolerance: 'Risk Tolerance',
    investmentHorizon: 'Investment Horizon',
    monthlyCapacity: 'Monthly Capacity',
    liquidityPreference: 'Liquidity Preference',
    investmentGoal: 'Investment Goal',
  };

  const goalLabels = {
    wealth: 'Wealth Building',
    retirement: 'Retirement',
    emergency: 'Emergency Fund',
    purchase: 'Specific Purchase',
  };

  return (
    <div className="page-enter container profile-page">
      <header className="profile-head">
        <span className="eyebrow">Your Profile</span>
        <h1>Financial Profile</h1>
        <p className="profile-sub">
          Your answers directly drive what products we recommend. Be honest — there
          are no wrong answers, only mismatches.
        </p>
      </header>

      <div className="profile-layout">
        <main className="profile-main">
          <ProfileForm initial={profile} onSubmit={handleSubmit} />
        </main>

        <aside className="profile-aside">
          {complete ? (
            <>
              <div className="profile-summary-card">
                <span className="eyebrow">Saved Profile</span>
                <dl className="profile-dl">
                  {Object.entries(labelMap).map(([key, label]) => (
                    <div key={key}>
                      <dt>{label}</dt>
                      <dd className={key === 'monthlyCapacity' ? 'mono' : ''}>
                        {key === 'monthlyCapacity'
                          ? `PKR ${Number(profile[key]).toLocaleString()}`
                          : key === 'investmentGoal'
                            ? goalLabels[profile[key]] || profile[key]
                            : profile[key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="match-card">
                <span className="match-count mono">{matchCount}</span>
                <span className="match-label">products match your profile</span>
                <a href="/recommendations" className="btn btn-primary match-btn">
                  View Recommendations →
                </a>
              </div>
            </>
          ) : (
            <div className="profile-empty-card">
              <h3>No profile saved yet</h3>
              <p>
                Fill out the form and submit to see your personalised product matches.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
