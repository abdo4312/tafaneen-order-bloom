
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockProducts, Product } from '@/data/mockData';

interface EnhancedSearchProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export function EnhancedSearch({ placeholder = "ابحث عن الأدوات المكتبية...", className = "", onSearch }: EnhancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const results = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 6); // Limit to top 6 results
        setSuggestions(results);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      onSearch?.(searchQuery.trim());
    }
  };

  const handleSuggestionClick = (id: string) => {
    navigate(`/product/${id}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className} z-[100]`}>
      <form onSubmit={handleSearch} className="relative w-full flex items-stretch">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            className="h-12 border-2 border-primary/10 rounded-r-2xl rounded-l-none pr-4 pl-10 focus:border-primary/30 bg-gray-50/50 text-right font-medium placeholder:text-gray-400 transition-all focus:bg-white"
            dir="rtl"
            value={searchQuery}
            onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary/50" />}
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Red Search Button Part - Left side in RTL */}
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white rounded-l-2xl px-5 flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <Search className="h-6 w-6" />
        </button>
      </form>

      {/* Modern Glassmorphism Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" dir="rtl">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المقترحات الأكثر صلة</span>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{suggestions.length} منتجات</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSuggestionClick(product.id)}
                className="flex items-center gap-4 p-3 hover:bg-primary/5 cursor-pointer transition-colors border-b border-gray-50 last:border-0 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-white flex-shrink-0 group-hover:scale-105 transition-transform">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate mb-0.5 group-hover:text-primary transition-colors">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-primary">{product.price.toFixed(2)} ج.م</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-gray-400 line-through font-bold">{product.originalPrice.toFixed(2)} ج.م</span>
                    )}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Search className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSearch}
            className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-primary text-xs font-black transition-colors"
          >
            مشاهدة كل النتائج
          </button>
        </div>
      )}
    </div>
  );
}