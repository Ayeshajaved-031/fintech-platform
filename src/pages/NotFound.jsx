import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-enter container" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 400, lineHeight: 1 }}>
        404
      </h1>
      <p style={{ color: 'var(--ink-mute)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        This page does not exist. The route you visited is not part of the Meridian platform.
      </p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
}
