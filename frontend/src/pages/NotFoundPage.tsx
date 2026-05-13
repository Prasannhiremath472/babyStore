import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>Page Not Found - LittleNest</title></Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-peach/20 to-brand-lavender/20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-8">
          <span className="text-9xl block mb-6">🔍</span>
          <h1 className="text-4xl font-display font-bold mb-4">Oops! Page not found</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back to shopping!
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-primary px-8 py-4">Back to Home</Link>
            <Link to="/products" className="btn-secondary px-8 py-4">Browse Products</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
