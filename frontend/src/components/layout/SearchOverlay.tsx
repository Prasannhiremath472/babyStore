import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { closeSearch } from '../../store/slices/uiSlice';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api/products.api';

const TRENDING = ['Baby onesie', 'Wooden toys', 'Feeding bottle', 'Baby monitor', 'Diaper bag'];

export default function SearchOverlay() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('searchHistory') || '[]'); } catch { return []; }
  });
  const { isSearchOpen } = useAppSelector(s => s.ui);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isSearchOpen]);

  const { data } = useQuery({
    queryKey: ['search-suggest', query],
    queryFn: () => productsApi.list({ search: query, limit: 5, status: 'ACTIVE' }),
    enabled: query.length > 2,
    staleTime: 30000,
  });

  const suggestions = data?.data?.data?.products || [];

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    const updated = [q, ...history.filter(h => h !== q)].slice(0, 6);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
    navigate(`/search?q=${encodeURIComponent(q)}`);
    dispatch(closeSearch());
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) dispatch(closeSearch()); }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl rounded-b-3xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
                    placeholder="Search products, brands, categories..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-gray-50 focus:bg-white focus:border-primary outline-none text-base transition-all"
                  />
                </div>
                <button onClick={() => dispatch(closeSearch())} className="p-3 rounded-xl hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {query.length > 2 && suggestions.length > 0 ? (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Suggestions</p>
                  <div className="space-y-2">
                    {suggestions.map((p: any) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.slug}`}
                        onClick={() => { dispatch(closeSearch()); setQuery(''); }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        {p.images?.[0]?.url && (
                          <img src={p.images[0].url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">₹{p.minPrice}</div>
                        </div>
                      </Link>
                    ))}
                    <button
                      onClick={() => handleSearch(query)}
                      className="w-full py-3 text-sm font-medium text-primary hover:bg-primary-50 rounded-xl transition-colors"
                    >
                      See all results for "{query}"
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {history.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">Recent Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {history.map(h => (
                          <button key={h} onClick={() => handleSearch(h)} className="px-3 py-1.5 bg-gray-100 hover:bg-primary-50 text-sm rounded-full transition-colors">
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-muted-foreground">Trending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map(t => (
                        <button key={t} onClick={() => handleSearch(t)} className="px-3 py-1.5 bg-primary-50 text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-colors">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
