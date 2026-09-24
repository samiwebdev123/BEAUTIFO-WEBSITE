import React, { useState } from 'react';
import { X, User, Sparkles, Check, Package, Heart } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist,
  wishlistCount,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('guest@beautifo.com');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EAEAEB] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#FCECEF] text-[#E3889B] mx-auto flex items-center justify-center mb-3">
                <User className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
                Welcome back, Sophia!
              </h3>
              <span className="text-xs text-[#E3889B] font-semibold tracking-wider uppercase">
                Gold VIP Member • 340 Beauty Points
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FBFBFC] border border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#888888]" />
                  <span>Recent Order #BT-9281 (Delivered)</span>
                </div>
                <span className="text-neutral-400 font-mono">Sep 18</span>
              </div>

              <div
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="p-3.5 rounded-2xl bg-[#FBFBFC] border border-neutral-100 flex items-center justify-between cursor-pointer hover:border-[#E3889B] transition"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#E3889B]" />
                  <span>Saved Favorites</span>
                </div>
                <span className="font-semibold text-[#111111]">{wishlistCount} items</span>
              </div>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="mt-6 w-full py-2.5 text-xs text-neutral-500 hover:text-neutral-800 transition border border-neutral-200 rounded-full"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-1 text-[#E3889B] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] tracking-widest font-semibold uppercase">BEAUTIFO CLUB</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                Sign In to Beautifo
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Access your orders, personalized rewards & beauty wishlist.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-[#333333] font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-[#E3889B]"
                />
              </div>

              <div>
                <label className="block text-[#333333] font-semibold mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-[#E3889B]"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#E3889B]" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:text-[#E3889B]">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-3 rounded-full font-semibold uppercase tracking-wider transition shadow-md mt-4"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
              <span>Don't have an account? </span>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="text-[#E3889B] font-semibold hover:underline"
              >
                Create VIP Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
