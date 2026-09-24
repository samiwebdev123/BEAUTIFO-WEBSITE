import React from 'react';
import { Eye, Heart, ShoppingBag, Star, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
}

const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'face':
      return 'For Face';
    case 'body':
      return 'For Body';
    case 'hair':
      return 'For Hair';
    case 'accessories':
      return 'Accessories';
    default:
      return cat;
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isWishlisted,
}) => {
  return (
    <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02]">
      {/* Image Stage Card with Soft Light Background & Rounded Corners */}
      <div
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-square bg-[#F7F7F9] rounded-2xl overflow-hidden p-6 flex items-center justify-center border border-[#EFEFF2] cursor-pointer transition-all duration-300 group-hover:border-[#EAD3D9] group-hover:shadow-md"
      >
        {/* Badges Container */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1 max-w-[80%] pointer-events-none">
          {product.badges && product.badges.length > 0 ? (
            product.badges.map((b, idx) => (
              <span
                key={idx}
                className={`text-[8.5px] font-bold tracking-wider text-white px-2 py-0.5 rounded-full uppercase shadow-2xs ${b.color}`}
              >
                {b.text}
              </span>
            ))
          ) : (
            product.badge && (
              <span
                className={`text-[8.5px] font-bold tracking-wider text-white px-2 py-0.5 rounded-full uppercase shadow-2xs ${
                  product.badgeColor || 'bg-[#2EB5B3]'
                }`}
              >
                {product.badge}
              </span>
            )
          )}
        </div>

        {/* Wishlist Quick Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs ${
            isWishlisted
              ? 'bg-[#E3889B] text-white opacity-100 scale-100'
              : 'bg-white/90 backdrop-blur-xs text-[#555555] hover:text-[#E3889B] hover:bg-white sm:opacity-0 group-hover:opacity-100'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
            }}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-xs"
          />
        </div>

        {/* Quick Action Icons on Hover (Eye, Heart, Bag, Compare) */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white text-[#333333] hover:text-[#E3889B] hover:bg-[#FDF2F4] flex items-center justify-center shadow-md transition-all hover:scale-110"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 ${
              isWishlisted
                ? 'bg-[#E3889B] text-white'
                : 'bg-white text-[#333333] hover:text-[#E3889B] hover:bg-[#FDF2F4]'
            }`}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-8 h-8 rounded-full bg-white text-[#333333] hover:text-[#E3889B] hover:bg-[#FDF2F4] flex items-center justify-center shadow-md transition-all hover:scale-110"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white text-[#333333] hover:text-[#E3889B] hover:bg-[#FDF2F4] flex items-center justify-center shadow-md transition-all hover:scale-110"
            title="Compare"
            aria-label="Compare"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Info Section Below Card */}
      <div className="mt-3.5 flex flex-col items-center max-w-[240px]">
        {/* Category Label */}
        <span className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#999999] mb-1">
          {getCategoryLabel(product.category)}
        </span>

        {/* 5-star rating */}
        <div className="flex items-center gap-1 text-[#E3889B] mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
        </div>

        {/* Product Title matching Reference: "Organic High-Curcumin Turmeric Powder" */}
        <h4
          onClick={() => onQuickView(product)}
          className="text-xs sm:text-[13px] font-normal text-[#2A2A2A] hover:text-[#E3889B] transition cursor-pointer line-clamp-2 leading-relaxed"
        >
          {product.name}
        </h4>

        {/* Price strictly in PKR */}
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#181818]">
            {formatPKR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#999999] line-through">
              {formatPKR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
