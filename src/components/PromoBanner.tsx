import React from 'react';
import { BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface PromoBannerProps {
  onShopCategory: (category: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopCategory }) => {
  return (
    <section className="py-5 sm:py-7 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Banner 1: Natural Beauty Collection (Mint/Sage aesthetic) */}
          <div
            onClick={() => onShopCategory('body')}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#DCF2EA] p-6 sm:p-9 flex items-center justify-between cursor-pointer border border-[#D0EDE3] transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            {/* Left Content Area */}
            <div className="z-10 max-w-[210px] sm:max-w-[230px]">
              <span className="inline-block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1B807B] mb-2">
                UP TO 30% OFF
              </span>
              
              <h3 className="font-serif text-2xl sm:text-[28px] font-medium text-[#1A2E2C] leading-snug">
                Natural Beauty <br />
                Collection
              </h3>

              <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1A2E2C] group-hover:text-[#136661] transition">
                <span className="border-b border-current pb-0.5">SHOP NOW</span>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">&gt;</span>
              </div>
            </div>

            {/* Right Botanical Tube Composition matching Reference Screenshot */}
            <div className="relative w-36 sm:w-44 h-36 sm:h-40 flex items-center justify-end">
              {/* Soft circular aura */}
              <div className="absolute inset-2 rounded-full bg-white/60 blur-xs pointer-events-none" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80"
                  alt="Natural Beauty Collection"
                  onError={(e) => {
                    e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                  }}
                  className="w-28 sm:w-36 h-32 sm:h-38 object-contain mix-blend-multiply drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Banner 2: Look Gorgeous Hair Mask (Warm Peach aesthetic) */}
          <div
            onClick={() => onShopCategory('hair')}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FDF0EB] p-6 sm:p-9 flex items-center justify-between cursor-pointer border border-[#FDE5DC] transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            {/* Left Content Area */}
            <div className="z-10 max-w-[210px] sm:max-w-[230px]">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#735A4B] block mb-1">
                Look Gorgeous
              </span>

              <h3 className="font-serif text-2xl sm:text-[28px] font-medium text-[#291E16] leading-snug">
                Hair Mask
              </h3>

              <span className="inline-block mt-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#D26E86]">
                TOTAL SALE
              </span>

              <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#291E16] group-hover:text-[#D26E86] transition">
                <span className="border-b border-current pb-0.5">SHOP NOW</span>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">&gt;</span>
              </div>
            </div>

            {/* Right Treatment Model Visual matching Reference Screenshot */}
            <div className="relative w-36 sm:w-44 h-36 sm:h-40 flex items-center justify-end">
              <div className="w-32 sm:w-38 h-32 sm:h-38 rounded-2xl overflow-hidden shadow-md transition-transform duration-500 group-hover:scale-105 border-2 border-white/90">
                <img
                  src="https://images.unsplash.com/photo-1512290900672-1f5be9419114?auto=format&fit=crop&w=400&q=80"
                  alt="Look Gorgeous Hair Mask"
                  onError={(e) => {
                    e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
