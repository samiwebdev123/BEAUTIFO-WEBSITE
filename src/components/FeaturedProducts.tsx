import React, { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Product, Category } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlistIds,
}) => {
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(
      (p) => p.category === selectedCategory || p.secondaryCategory === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <section id="featured" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A1A] tracking-tight">
            Featured Products
          </h2>

          {/* Category Tabs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as Category)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#E3889B] text-white shadow-xs font-medium'
                      : 'text-[#666666] hover:text-[#111111] hover:bg-[#F8F8FA]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid: 4 per row on desktop, 2-3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-7 gap-y-8 sm:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

        {/* Bottom recipe helper link matching Reference Screenshot */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-[#777777]">
            Get hands on with our recipe ideas.{' '}
            <a
              href="#featured"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}
              className="text-[#E3889B] font-semibold hover:underline underline-offset-4 ml-1"
            >
              Shop All Products &gt;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
