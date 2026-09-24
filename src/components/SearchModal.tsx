import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) {
      return products.slice(0, 4); // show initial recommendations
    }
    const query = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.secondaryCategory && p.secondaryCategory.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query)
    );
  }, [searchTerm, products]);

  if (!isOpen) return null;

  const quickTags = ['Makeup', 'Face', 'Powder', 'Cream', 'Lotion', 'Hair', 'Accessories'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAEAEB] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Bar with Search Input & Close */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E3889B]">
              BEAUTIFO PRODUCT SEARCH
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, category, or formulation..."
              className="w-full pl-12 pr-10 py-3.5 bg-[#FAF9FA] border border-neutral-200 rounded-full text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:border-[#E3889B] focus:ring-1 focus:ring-[#E3889B] transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 p-1"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggested Quick Tags */}
          <div className="flex items-center gap-1.5 flex-wrap mt-3 text-xs">
            <span className="text-neutral-400 text-[11px] mr-1">Popular:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-[#FCEBEF] hover:text-[#E3889B] text-neutral-600 text-[11px] transition"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="mt-6 max-h-[380px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-3 text-xs text-neutral-500 font-medium">
              <span>
                {searchTerm ? `Results for "${searchTerm}"` : 'Popular Recommendations'}
              </span>
              <span>{filtered.length} found</span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center text-neutral-500 space-y-2">
                <p className="font-serif text-base text-neutral-700">No products found</p>
                <p className="text-xs text-neutral-400">
                  Try searching for "Lipstick", "BB Cream", "Face", or "Powder".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#FDF9FA] border border-transparent hover:border-[#F2D7DE] transition cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-[#F7F7F9] rounded-xl flex items-center justify-center p-2 shrink-0 border border-neutral-100">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-[#E3889B] tracking-wider">
                          {prod.category}
                        </span>
                        {prod.badge && (
                          <span className="text-[9px] font-semibold text-white px-1.5 py-0.2 rounded-full bg-[#2EB5B3]">
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-[13px] font-medium text-[#1A1A1A] truncate group-hover:text-[#E3889B] transition mt-0.5">
                        {prod.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-[#111111]">
                          {formatPKR(prod.price)}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[11px] text-neutral-400 line-through">
                            {formatPKR(prod.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod);
                          onClose();
                        }}
                        className="p-2 rounded-full bg-neutral-100 hover:bg-[#E3889B] text-neutral-600 hover:text-white transition"
                        title="Add to Bag"
                        aria-label="Add to Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#E3889B] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
