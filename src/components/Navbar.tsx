import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  activeNav,
  setActiveNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'SHOP', href: '#featured', hasDropdown: true },
    { label: 'PAGE', href: '#promos', hasDropdown: true },
    { label: 'BLOG', href: '#instagram' },
    { label: 'CONTACT US', href: '#footer' },
  ];

  const handleLinkClick = (href: string, label: string) => {
    setActiveNav(label);
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-[#F4F4F6]">
      {/* 1. Top Announcement Bar */}
      <div className="border-b border-[#F0F0F2] bg-[#FFFFFF] py-2 px-4 text-center text-[11px] font-medium tracking-[0.14em] text-[#333333] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block text-[10px] text-[#888888] tracking-widest">
            HOTLINE: (021) 111-88-990
          </div>
          <div className="mx-auto flex items-center gap-1.5">
            <span>FREE STANDARD SHIPPING ON ALL PAKISTAN ORDERS.</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-[#777777] tracking-wider">
            <span className="font-semibold text-[#111111]">PKR (Rs)</span>
            <span>ENGLISH</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar with Absolute Center BEAUTIFO Logo */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-[#222222] hover:text-[#E3889B] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Left Navigation: Desktop Only */}
        <nav className="hidden lg:flex flex-1 justify-start items-center space-x-7 text-[12px] font-semibold tracking-[0.12em] text-[#222222]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  handleLinkClick(item.href, item.label);
                }
              }}
              className={`relative group py-2 flex items-center gap-1 transition-colors hover:text-[#E3889B] ${
                activeNav === item.label ? 'text-[#E3889B]' : 'text-[#1F1F1F]'
              }`}
            >
              <span>{item.label}</span>
              {item.hasDropdown && (
                <ChevronDown className="w-3 h-3 text-[#999999] group-hover:text-[#E3889B] transition-transform duration-200 group-hover:rotate-180" />
              )}
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-[#E3889B] transition-all duration-300 ${
                  activeNav === item.label ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Center: BEAUTIFO Logo (Stays strictly centered regardless of left/right widths) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer pointer-events-auto group">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center"
          >
            {/* Subtle Crown / Tiara Ornament Motif matching Reference */}
            <div className="flex items-center gap-1 mb-0.5 opacity-90 group-hover:opacity-100 transition text-[#D893A3]">
              <Sparkles className="w-2.5 h-2.5" />
              <svg
                className="w-4 h-3 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
              </svg>
              <Sparkles className="w-2.5 h-2.5" />
            </div>
            <span className="font-serif tracking-[0.28em] text-2xl sm:text-[26px] font-medium text-[#111111] uppercase select-none transition-colors group-hover:text-[#E3889B]">
              BEAUTIFO
            </span>
          </a>
        </div>

        {/* Right Action Icons: Search, Account, Wishlist, Cart */}
        <div className="flex-1 flex justify-end items-center space-x-3 sm:space-x-5 text-[#222222]">
          {/* Search Icon (Active Functional Trigger) */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 hover:text-[#E3889B] transition-colors relative"
            aria-label="Search products"
            title="Search"
          >
            <Search className="w-5 h-5 stroke-[1.6]" />
          </button>

          {/* Account Icon */}
          <button
            onClick={onOpenAccount}
            className="hidden sm:block p-1.5 hover:text-[#E3889B] transition-colors relative"
            aria-label="Account"
            title="Account"
          >
            <User className="w-5 h-5 stroke-[1.6]" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="p-1.5 hover:text-[#E3889B] transition-colors relative group"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.6] group-hover:fill-[#FCEBEF] transition" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E3889B] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag Icon */}
          <button
            onClick={onOpenCart}
            className="p-1.5 hover:text-[#E3889B] transition-colors relative group"
            aria-label="Shopping bag"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.6] group-hover:text-[#E3889B] transition" />
            <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[9px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F0F0F2] bg-white px-6 py-6 animate-in slide-in-from-top-3 duration-200 shadow-xl">
          <div className="flex flex-col space-y-4 text-sm font-semibold tracking-wider text-[#222222]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    handleLinkClick(item.href, item.label);
                  }
                }}
                className={`py-2 flex items-center justify-between border-b border-neutral-100 ${
                  activeNav === item.label ? 'text-[#E3889B]' : 'text-[#1F1F1F]'
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="w-4 h-4 text-neutral-400" />}
              </a>
            ))}

            <div className="pt-4 flex items-center justify-between text-xs text-neutral-500">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center gap-2 hover:text-[#E3889B]"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </button>
              <span className="text-neutral-400 font-mono">Currency: PKR</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
