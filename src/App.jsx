import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import Portfolio from './pages/Portfolio';
import Recommendations from './pages/Recommendations';
import NotFound from './pages/NotFound';

/**
 * App — root component with persistent Navbar and route definitions.
 *
 * Route map:
 *   /                   Home
 *   /products           ProductListing (with filters)
 *   /product/:id        ProductDetail  (dynamic route)
 *   /profile            UserProfile    (financial profile form)
 *   /portfolio          Portfolio      (portfolio management)
 *   /recommendations    Recommendations (profile-driven picks)
 *   *                   NotFound       (404 catch-all)
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
