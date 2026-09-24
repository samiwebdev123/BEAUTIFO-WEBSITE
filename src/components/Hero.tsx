import React from 'react';
import { BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="pt-4 sm:pt-6 pb-2 sm:pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Rounded Hero Banner Card matching Reference Screenshot */}
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#FDECEF] border border-[#FCE1E7] p-8 sm:p-12 lg:p-16 transition-all duration-300 shadow-xs">
          
          {/* Ambient Glows & Subtle Radial Highlights */}
          <div className="absolute -top-16 -right-16 w-96 h-96 sm:w-[540px] sm:h-[540px] rounded-full bg-white/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#FCD2DC]/30 blur-2xl pointer-events-none" />

          {/* Floating Rose Petal Accents matching Reference Screenshot */}
          <div className="absolute top-12 left-1/2 -translate-x-12 opacity-75 pointer-events-none hidden md:block">
            <svg className="w-7 h-7 text-[#EFAAB8] fill-current rotate-12 drop-shadow-xs" viewBox="0 0 24 24">
              <path d="M12 2C9 6 4 9 2 12C6 15 9 20 12 22C15 20 20 15 22 12C18 9 14 6 12 2Z" opacity="0.65" />
            </svg>
          </div>
          <div className="absolute bottom-16 left-1/3 opacity-70 pointer-events-none hidden sm:block">
            <svg className="w-5 h-5 text-[#EFAAB8] fill-current -rotate-45 drop-shadow-xs" viewBox="0 0 24 24">
              <path d="M12 2C8 6 4 9 2 12C6 15 9 20 12 22C15 20 20 15 22 12C18 9 14 6 12 2Z" opacity="0.5" />
            </svg>
          </div>
          <div className="absolute top-24 right-12 opacity-80 pointer-events-none hidden lg:block">
            <svg className="w-8 h-8 text-[#EFAAB8] fill-current rotate-45 drop-shadow-xs" viewBox="0 0 24 24">
              <path d="M12 2C10 7 5 10 2 12C7 14 10 19 12 24C14 19 19 14 24 12C19 10 14 7 12 2Z" opacity="0.5" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Hero Text Area */}
            <div className="lg:col-span-6 xl:col-span-5 text-left">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.14] text-[#181818] tracking-tight">
                Discover <br />
                <span className="font-medium text-[#111111]">The Secrets</span> <br />
                <span className="italic font-light text-[#222222]">Of Beauty</span>
              </h1>

              <p className="mt-5 text-[#555555] text-sm sm:text-[15px] leading-relaxed max-w-md font-sans">
                Get them together (for less) for dewy, natural-looking coverage that still looks like skin.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={onShopClick}
                  className="group bg-[#111111] text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#2C2C2C] active:scale-[0.98] transition duration-200 flex items-center gap-2.5 shadow-md shadow-black/10"
                >
                  <span>SHOP NOW</span>
                  <span className="group-hover:translate-x-0.5 transition-transform font-mono text-sm">&gt;</span>
                </button>
              </div>
            </div>

            {/* Right Column: Beauty Product Composition matching Reference Screenshot */}
            <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[520px] lg:max-w-[560px] flex items-center justify-center">
                <img
                  src="/images/hero-face-wash.jpg"
                  alt="BEAUTIFO Luxury Face Wash & Facial Cleanser Skincare Set with Cosmetic Box and Peony Flowers"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                  }}
                  className="w-full h-auto max-h-[440px] object-contain rounded-2xl sm:rounded-3xl filter drop-shadow-xl transition-transform duration-700 ease-out hover:scale-[1.01]"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
