import React from 'react';
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200">
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#E3889B] fill-current" />
              <h2 className="font-serif text-lg font-medium text-[#111111] tracking-tight">
                My Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#E3889B]">
                  <Heart className="w-7 h-7" />
                </div>
                <p className="font-serif text-lg text-neutral-700">Your wishlist is empty</p>
                <p className="text-xs text-neutral-400 max-w-xs">
                  Save your favorite botanical beauty essentials here while browsing.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition"
                >
                  Explore Featured
                </button>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-neutral-100">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        onQuickView(product);
                        onClose();
                      }}
                      className="w-20 h-20 bg-[#F7F7F9] rounded-xl flex items-center justify-center p-2 shrink-0 border border-neutral-100 cursor-pointer hover:border-[#E3889B] transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              onQuickView(product);
                              onClose();
                            }}
                            className="text-xs sm:text-[13px] font-medium text-[#1A1A1A] truncate cursor-pointer hover:text-[#E3889B] transition"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFromWishlist(product.id)}
                            className="text-neutral-400 hover:text-red-500 transition p-0.5"
                            aria-label="Remove item"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#111111] mt-1 block">
                          {formatPKR(product.price)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveFromWishlist(product.id);
                          }}
                          className="flex-1 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] font-semibold py-1.5 px-3 rounded-full uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-neutral-100 bg-[#FAF9F9]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => onAddToCart(p));
                  onClose();
                }}
                className="w-full bg-[#E3889B] hover:bg-[#D57589] text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add All Items to Bag</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
