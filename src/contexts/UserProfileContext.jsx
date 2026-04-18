import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * UserProfileContext
 * -----------------------------------------------------------
 * Holds the user's financial profile globally and exposes the
 * recommendation engine. The profile directly drives what
 * products the user sees on the /recommendations route.
 *
 * Profile shape:
 *  - riskTolerance:     'conservative' | 'moderate' | 'aggressive'
 *  - investmentHorizon: 'short' | 'medium' | 'long'
 *  - monthlyCapacity:   number (PKR)
 *  - liquidityPreference: 'easy' | 'moderate' | 'locked'
 *  - investmentGoal:    string
 */

const UserProfileContext = createContext(null);

const STORAGE_KEY = 'meridian.userProfile.v1';

const emptyProfile = {
  riskTolerance: '',
  investmentHorizon: '',
  monthlyCapacity: 0,
  liquidityPreference: '',
  investmentGoal: '',
};

export function UserProfileProvider({ children }) {
  // Lazy init — try to hydrate from localStorage
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Persist on every change
  useEffect(() => {
    try {
      if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* storage unavailable */ }
  }, [profile]);

  const updateProfile = useCallback((next) => {
    setProfile((prev) => ({ ...(prev || emptyProfile), ...next }));
  }, []);

  const clearProfile = useCallback(() => setProfile(null), []);

  const isProfileComplete = useCallback(() => {
    if (!profile) return false;
    return (
      !!profile.riskTolerance &&
      !!profile.investmentHorizon &&
      !!profile.liquidityPreference &&
      !!profile.investmentGoal &&
      Number(profile.monthlyCapacity) >= 1000
    );
  }, [profile]);

  /**
   * Recommendation engine — profile-to-product mapping.
   * Dynamic: re-runs every call. No hardcoded output list.
   */
  const getRecommendations = useCallback((products) => {
    if (!profile || !products?.length) return [];

    const riskMapping = {
      conservative: ['low'],
      moderate:     ['low', 'medium'],
      aggressive:   ['low', 'medium', 'high'],
    };
    const horizonMapping = {
      short:  ['short'],
      medium: ['short', 'medium'],
      long:   ['short', 'medium', 'long'],
    };
    const liquidityMapping = {
      easy:     ['easy'],
      moderate: ['easy', 'moderate'],
      locked:   ['easy', 'moderate', 'locked'],
    };

    const allowedRisk      = riskMapping[profile.riskTolerance]           || ['low'];
    const allowedHorizon   = horizonMapping[profile.investmentHorizon]    || ['short'];
    const allowedLiquidity = liquidityMapping[profile.liquidityPreference] || ['easy'];
    const budget           = Number(profile.monthlyCapacity) || 0;

    const matched = products.filter((p) =>
      p.minInvestment <= budget &&
      allowedRisk.includes(p.riskLevel) &&
      allowedHorizon.includes(p.timeHorizon) &&
      allowedLiquidity.includes(p.liquidity)
    );

    // Conservative => sort ascending by risk-weight then return
    // Others       => sort descending by expected return
    const riskWeight = { low: 1, medium: 2, high: 3 };
    if (profile.riskTolerance === 'conservative') {
      return [...matched].sort(
        (a, b) => riskWeight[a.riskLevel] - riskWeight[b.riskLevel] ||
                  a.expectedReturn - b.expectedReturn
      );
    }
    return [...matched].sort((a, b) => b.expectedReturn - a.expectedReturn);
  }, [profile]);

  const value = {
    profile,
    updateProfile,
    clearProfile,
    isProfileComplete,
    getRecommendations,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error('useUserProfile must be used within UserProfileProvider');
  return ctx;
}
