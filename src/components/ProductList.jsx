import ProductCard from './ProductCard';
import './ProductList.css';

/**
 * ProductList — grid wrapper. Animates on filter change via key prop.
 */
export default function ProductList({ products }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3>No products match your filters</h3>
        <p>Try loosening your criteria or resetting the filter panel.</p>
      </div>
    );
  }

  return (
    <div className="product-grid stagger" key={products.length + '-' + products[0]?.id}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
