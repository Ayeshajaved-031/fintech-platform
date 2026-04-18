import ProductCard from './ProductCard';

/**
 * RecommendationList — wraps a grid of recommended products.
 * Presentation-only; the actual recommendation logic lives in
 * UserProfileContext.getRecommendations.
 */
export default function RecommendationList({ recommendations }) {
  if (!recommendations.length) {
    return (
      <div className="empty-state">
        <h3>No matching products</h3>
        <p>
          No products in our catalog fit your current profile. Try widening your risk
          tolerance, horizon, liquidity, or increasing your monthly capacity.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid stagger">
      {recommendations.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
