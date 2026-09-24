import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanner } from './components/PromoBanner';
import { FeaturedProducts } from './components/FeaturedProducts';
import { PromoGrid } from './components/PromoGrid';
import { ProductLists } from './components/ProductLists';
import { Newsletter } from './components/Newsletter';
import { BrandStrip } from './components/BrandStrip';
import { InstagramGallery } from './components/InstagramGallery';
import { Benefits } from './components/Benefits';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';

import { FEATURED_PRODUCTS, BEST_SELLERS, TOP_RATED, ON_SALE, getCatalogProducts } from './data/products';
import { Product, CartItem, Category } from './types';
import { Check } from 'lucide-react';
import { AdminApp } from './admin/AdminApp';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [catalogProducts, setCatalogProducts] = useState<Product[]>(() => getCatalogProducts());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen for catalog updates from admin actions
  useEffect(() => {
    const handleCatalogUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Product[]>;
      if (customEvent.detail) {
        setCatalogProducts(customEvent.detail);
      } else {
        setCatalogProducts(getCatalogProducts());
      }
    };
    window.addEventListener('beautifo_catalog_updated', handleCatalogUpdate);
    return () => window.removeEventListener('beautifo_catalog_updated', handleCatalogUpdate);
  }, []);

  const navigate = (newPath: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    setCurrentPath(newPath);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  // Global App State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('beautifo_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Re-sync with latest catalog definitions for updated asset paths
          return parsed.map((item) => {
            const allItems = [...FEATURED_PRODUCTS, ...BEST_SELLERS, ...TOP_RATED, ...ON_SALE];
            const fresh = allItems.find((p) => p.id === item.product.id);
            return fresh ? { ...item, product: fresh } : item;
          });
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [{ product: FEATURED_PRODUCTS[0], quantity: 1, selectedVolume: '150 ml' }];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('beautifo_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
    }
    return [FEATURED_PRODUCTS[1].id];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeNav, setActiveNav] = useState('HOME');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('beautifo_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('beautifo_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Combine all products for search / quick view lookups
  const allProducts = [
    ...FEATURED_PRODUCTS,
    ...BEST_SELLERS,
    ...TOP_RATED,
    ...ON_SALE,
  ];

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, volume?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVolume: volume || product.volume }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to bag`);
  };

  const handleBuyNow = (product: Product, quantity = 1, volume?: string) => {
    handleAddToCart(product, quantity, volume);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToFeatured = () => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category as Category);
    scrollToFeatured();
  };

  // Dedicated Private Admin Routing
  if (currentPath.startsWith('/admin')) {
    return <AdminApp currentPath={currentPath} onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222] relative selection:bg-[#FCE8ED]">
      {/* Visual Splash Loading Screen */}
      <LoadingScreen duration={1300} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200 border border-neutral-800">
          <div className="w-5 h-5 rounded-full bg-[#E3889B] flex items-center justify-center text-white shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1 & 2: Top Announcement Bar + Main Navbar */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 3: Large Hero Banner */}
        <Hero onShopClick={scrollToFeatured} />

        {/* 4: Two Promotional Banners Below Hero */}
        <PromoBanner onShopCategory={handleSelectCategory} />

        {/* 5 & 6: Featured Products Heading, Category Tabs & 8-Product Grid */}
        <FeaturedProducts
          products={catalogProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          wishlistIds={wishlistIds}
        />

        {/* 7: Promotional Banner Area (Bento Layout) */}
        <PromoGrid onCategorySelect={handleSelectCategory} />

        {/* 8: Best Seller / Top Rated / On Sale Columns */}
        <ProductLists
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* 9: Newsletter Subscription Banner */}
        <Newsletter />

        {/* 10: Brand / Logo Strip */}
        <BrandStrip />

        {/* 11: Instagram / Social Gallery */}
        <InstagramGallery />

        {/* 12: Benefits / Shipping Strip */}
        <Benefits />
      </main>

      {/* 13 & 14: Footer & Copyright Bar */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={allProducts}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistIds.length}
      />
    </div>
  );
}
