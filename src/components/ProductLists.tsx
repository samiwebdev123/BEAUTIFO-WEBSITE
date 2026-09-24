import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { BEST_SELLERS, TOP_RATED, ON_SALE } from '../data/products';
import { formatPKR, BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface ProductListsProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductLists: React.FC<ProductListsProps> = ({
  onAddToCart,
  onQuickView,
}) => {
  const columns = [
    { title: 'Best Seller', items: BEST_SELLERS },
    { title: 'Top Rated', items: TOP_RATED },
    { title: 'On Sale', items: ON_SALE },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-b border-[#F4F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col">
              {/* Column Title */}
              <div className="pb-3 mb-6 border-b border-[#EAEAEA] flex items-center justify-between">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1A1A1A] tracking-tight">
                  {col.title}
                </h3>
                <span className="text-[10.5px] font-semibold text-[#999999] uppercase tracking-wider">
                  Top 3
                </span>
              </div>

              {/* 3 Horizontal Items */}
              <div className="flex flex-col space-y-5">
                {col.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onQuickView(item)}
                    className="group flex items-center gap-4 p-2 rounded-xl transition-colors hover:bg-[#FAF9FA] cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="w-18 h-18 sm:w-20 sm:h-20 bg-[#F6F6F8] rounded-xl flex items-center justify-center p-2.5 shrink-0 border border-[#EEEEF0] group-hover:border-[#E8D6DC] transition">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#999999] font-medium block">
                        {item.category === 'face' ? 'For Face' : item.category === 'body' ? 'For Body' : item.category === 'hair' ? 'For Hair' : 'Accessories'}
                      </span>
                      <h4 className="text-xs sm:text-[13px] text-[#222222] font-normal leading-snug truncate group-hover:text-[#E3889B] transition mt-0.5">
                        {item.name}
                      </h4>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 text-[#E3889B] my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                      </div>

                      {/* Price & Add button */}
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs sm:text-[13px] font-semibold text-[#181818]">
                          {formatPKR(item.price)}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(item);
                          }}
                          className="w-6 h-6 rounded-full bg-neutral-100 hover:bg-[#E3889B] text-neutral-600 hover:text-white flex items-center justify-center transition"
                          title="Quick Add to Bag"
                          aria-label="Add to Bag"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
