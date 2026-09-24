import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR, BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free shipping over PKR 3,000
  const freeShippingThreshold = 3000;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
    }, 900);
  };

  const handleFinishOrder = () => {
    setCheckoutSuccess(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E3889B]" />
              <h2 className="font-serif text-lg font-medium text-[#111111] tracking-tight">
                Your Beauty Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (PKR 3,000 threshold) */}
          <div className="px-5 py-3 bg-[#FDF7F8] border-b border-[#F9E8EB]">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs text-[#2B7A78] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> You've unlocked FREE Standard Delivery in Pakistan!
              </p>
            ) : (
              <div>
                <p className="text-xs text-[#555555]">
                  Add <span className="font-semibold text-[#111111]">{formatPKR(freeShippingThreshold - subtotal)}</span> more for{' '}
                  <span className="font-semibold text-[#E3889B]">FREE DELIVERY</span>
                </p>
                <div className="w-full bg-[#EAD5DA] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#E3889B] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {checkoutSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E6F8F3] text-[#229579] flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-2xl text-[#111111]">
                  Order Confirmed!
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Thank you for shopping with BEAUTIFO. Your order for{' '}
                  <span className="font-semibold text-[#111111]">{formatPKR(total)}</span> has been booked. You will receive an SMS confirmation shortly.
                </p>
                <button
                  onClick={handleFinishOrder}
                  className="mt-4 w-full bg-[#111111] text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF9F9] flex items-center justify-center text-neutral-300">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="font-serif text-lg text-neutral-700">Your bag is empty</p>
                <p className="text-xs text-neutral-400 max-w-xs">
                  Explore our luxury makeup and cosmetics collection to find your glow.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition"
                >
                  Shop Best Sellers
                </button>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#F7F7F9] rounded-xl flex items-center justify-center p-2 shrink-0 border border-neutral-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-[13px] font-medium text-[#1A1A1A] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-neutral-400 hover:text-red-500 transition p-0.5"
                            aria-label="Remove item"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.selectedVolume && (
                          <span className="text-[11px] text-neutral-400 block mt-0.5">
                            Volume: {item.selectedVolume}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-[#111111] mt-1 block">
                          {formatPKR(item.product.price)}
                        </span>
                      </div>

                      {/* Quantity & Subtotal per item */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100"
                            aria-label="Decrease"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-medium text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100"
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#111111]">
                          {formatPKR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!checkoutSuccess && cart.length > 0 && (
            <div className="p-5 border-t border-neutral-100 bg-[#FAF9F9] space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-800">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : formatPKR(shipping)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                  <span>Total</span>
                  <span className="text-[#E3889B]">{formatPKR(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-md"
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10.5px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>Encrypted 256-Bit SSL Checkout • Cash on Delivery Available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
