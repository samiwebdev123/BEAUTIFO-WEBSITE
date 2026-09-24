import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, Zap } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, volume?: string) => void;
  onBuyNow: (product: Product, quantity: number, volume?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState<string>('50 ml');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const volumes = ['30 ml', '50 ml', '100 ml'];

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVolume);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity, selectedVolume);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden z-10 border border-[#EAEAEB] animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Product Large Image Stage */}
          <div className="md:col-span-5 bg-[#F8F8FA] rounded-2xl p-6 flex items-center justify-center aspect-square border border-[#EFEFF1]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
              }}
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
            />
          </div>

          {/* Right: Product Details */}
          <div className="md:col-span-7 flex flex-col">
            {/* Category / Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[#E3889B]">
                BEAUTIFO LUXURY • {product.category.toUpperCase()}
              </span>
              {product.badge && (
                <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full bg-[#2EB5B3]">
                  {product.badge}
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A] leading-snug">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5 text-[#E3889B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#777777]">
                ({product.reviewsCount} verified customer reviews)
              </span>
            </div>

            {/* PKR Price Display */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-[13px] text-[#555555] mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Volume selector */}
            <div className="mt-5">
              <span className="text-[11px] font-semibold text-[#333333] uppercase tracking-wider block mb-2">
                Select Size / Volume:
              </span>
              <div className="flex gap-2">
                {volumes.map((vol) => (
                  <button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      selectedVolume === vol
                        ? 'border-[#E3889B] bg-[#FDEEF1] text-[#B95B72]'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 hover:bg-neutral-100 text-sm font-semibold text-neutral-600"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-sm text-[#111111]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 hover:bg-neutral-100 text-sm font-semibold text-neutral-600"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#111111] hover:bg-neutral-800 text-white py-3 px-5 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-md"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-[#A7F3D0]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-full border transition ${
                    isWishlisted
                      ? 'border-[#E3889B] bg-[#FDEEF1] text-[#E3889B]'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                  title="Wishlist"
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuy}
                className="w-full bg-[#E3889B] hover:bg-[#D57589] text-white py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now • Instant Checkout</span>
              </button>
            </div>

            {/* Extra assurance */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-[#777777]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E3889B]" /> 100% Authentic Botanical Formula
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#E3889B]" /> Express Delivery Across Pakistan
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
