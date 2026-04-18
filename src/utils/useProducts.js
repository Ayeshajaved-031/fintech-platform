import { useState, useEffect } from 'react';
import { transformApiProducts } from '../utils/transformApiProduct';
import { seedProducts } from '../data/seedProducts';

/**
 * Multiple API URLs to try in order.
 * If fakestoreapi.com is down, we try the DummyJSON alternative.
 * Both return product arrays we can transform.
 */
const API_SOURCES = [
  {
    url: 'https://fakestoreapi.com/products',
    transform: (data) => data, // already an array of { id, title, price, category, description, image }
  },
  {
    url: 'https://dummyjson.com/products?limit=30',
    transform: (data) => {
      // DummyJSON wraps in { products: [...] } with slightly different shape
      const items = data.products || [];
      return items.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category || 'general',
        description: p.description,
        image: p.thumbnail || p.images?.[0] || null,
      }));
    },
  },
];

/**
 * useProducts
 * -----------------------------------------------------------
 * Tries each API source in order. Transforms results into
 * financial products and merges with the curated seed list.
 * If ALL sources fail we still return the seed list (25 products)
 * so the app is always fully usable.
 */
export function useProducts() {
  const [products, setProducts] = useState(seedProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    async function tryFetch(source) {
      const res = await fetch(source.url, {
        signal: ctrl.signal,
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();
      return source.transform(raw);
    }

    async function load() {
      setLoading(true);
      setError(null);

      for (const source of API_SOURCES) {
        try {
          const normalized = await tryFetch(source);
          const transformed = transformApiProducts(normalized);
          if (!cancelled && transformed.length > 0) {
            setProducts([...seedProducts, ...transformed]);
            setLoading(false);
            return; // success — stop trying
          }
        } catch (e) {
          if (e.name === 'AbortError') return;
          // continue to next source
        }
      }

      // All sources failed
      if (!cancelled) {
        setError('Live catalog unavailable. Showing curated products.');
        setProducts(seedProducts);
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; ctrl.abort(); };
  }, []);

  return { products, loading, error };
}
