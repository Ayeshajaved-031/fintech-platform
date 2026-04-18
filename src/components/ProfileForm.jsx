import { useState, useEffect } from 'react';
import './ProfileForm.css';

/**
 * ProfileForm — controlled form for user financial profile.
 * Validates all fields, calls onSubmit(profile) when valid.
 */
export default function ProfileForm({ initial, onSubmit }) {
  const [form, setForm] = useState(
    initial || {
      riskTolerance: '',
      investmentHorizon: '',
      monthlyCapacity: '',
      liquidityPreference: '',
      investmentGoal: '',
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.riskTolerance)       errs.riskTolerance = 'Please choose your risk tolerance';
    if (!form.investmentHorizon)   errs.investmentHorizon = 'Please choose an investment horizon';
    if (!form.liquidityPreference) errs.liquidityPreference = 'Please choose a liquidity preference';
    if (!form.investmentGoal)      errs.investmentGoal = 'Please choose an investment goal';
    if (!form.monthlyCapacity || Number(form.monthlyCapacity) < 1000) {
      errs.monthlyCapacity = 'Minimum PKR 1,000 required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, monthlyCapacity: Number(form.monthlyCapacity) });
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit} noValidate>
      {/* Risk tolerance */}
      <fieldset className="field">
        <legend>Risk Tolerance</legend>
        <div className="radio-row">
          {[
            { v: 'conservative', l: 'Conservative', d: 'Capital preservation first' },
            { v: 'moderate',     l: 'Moderate',     d: 'Balanced growth' },
            { v: 'aggressive',   l: 'Aggressive',   d: 'Maximise returns' },
          ].map((o) => (
            <label key={o.v} className={`radio-card ${form.riskTolerance === o.v ? 'selected' : ''}`}>
              <input
                type="radio"
                name="riskTolerance"
                value={o.v}
                checked={form.riskTolerance === o.v}
                onChange={() => update('riskTolerance', o.v)}
              />
              <span className="radio-label">{o.l}</span>
              <span className="radio-desc">{o.d}</span>
            </label>
          ))}
        </div>
        {errors.riskTolerance && <p className="err">{errors.riskTolerance}</p>}
      </fieldset>

      {/* Investment horizon */}
      <fieldset className="field">
        <legend>Investment Horizon</legend>
        <div className="radio-row">
          {[
            { v: 'short',  l: 'Short',  d: '1–2 years' },
            { v: 'medium', l: 'Medium', d: '3–5 years' },
            { v: 'long',   l: 'Long',   d: '5+ years' },
          ].map((o) => (
            <label key={o.v} className={`radio-card ${form.investmentHorizon === o.v ? 'selected' : ''}`}>
              <input
                type="radio"
                name="investmentHorizon"
                value={o.v}
                checked={form.investmentHorizon === o.v}
                onChange={() => update('investmentHorizon', o.v)}
              />
              <span className="radio-label">{o.l}</span>
              <span className="radio-desc">{o.d}</span>
            </label>
          ))}
        </div>
        {errors.investmentHorizon && <p className="err">{errors.investmentHorizon}</p>}
      </fieldset>

      {/* Monthly capacity */}
      <fieldset className="field">
        <legend>Monthly Investment Capacity (PKR)</legend>
        <input
          type="number"
          min="1000"
          step="1000"
          value={form.monthlyCapacity}
          onChange={(e) => update('monthlyCapacity', e.target.value)}
          className="text-input mono"
          placeholder="e.g. 25000"
        />
        {errors.monthlyCapacity && <p className="err">{errors.monthlyCapacity}</p>}
      </fieldset>

      {/* Liquidity preference */}
      <fieldset className="field">
        <legend>Liquidity Preference</legend>
        <div className="radio-row">
          {[
            { v: 'easy',     l: 'Quick Access',    d: 'Need funds anytime' },
            { v: 'moderate', l: 'Some Flexibility', d: 'Few months acceptable' },
            { v: 'locked',   l: 'Can Lock Funds',  d: 'Years of commitment' },
          ].map((o) => (
            <label key={o.v} className={`radio-card ${form.liquidityPreference === o.v ? 'selected' : ''}`}>
              <input
                type="radio"
                name="liquidityPreference"
                value={o.v}
                checked={form.liquidityPreference === o.v}
                onChange={() => update('liquidityPreference', o.v)}
              />
              <span className="radio-label">{o.l}</span>
              <span className="radio-desc">{o.d}</span>
            </label>
          ))}
        </div>
        {errors.liquidityPreference && <p className="err">{errors.liquidityPreference}</p>}
      </fieldset>

      {/* Investment goal */}
      <fieldset className="field">
        <legend>Primary Investment Goal</legend>
        <select
          value={form.investmentGoal}
          onChange={(e) => update('investmentGoal', e.target.value)}
          className="text-input"
        >
          <option value="">Select a goal…</option>
          <option value="wealth">Wealth Building</option>
          <option value="retirement">Retirement</option>
          <option value="emergency">Emergency Fund</option>
          <option value="purchase">Specific Purchase</option>
        </select>
        {errors.investmentGoal && <p className="err">{errors.investmentGoal}</p>}
      </fieldset>

      <button type="submit" className="btn btn-primary form-submit">
        Save Profile
      </button>
    </form>
  );
}
