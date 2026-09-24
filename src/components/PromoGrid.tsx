import React from 'react';
import { BEAUTY_FALLBACK_IMAGE } from '../utils/format';

interface PromoGridProps {
  onCategorySelect: (category: string) => void;
}

export const PromoGrid: React.FC<PromoGridProps> = ({ onCategorySelect }) => {
  return (
    <section id="promos" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Layout matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Tile A: Left Tall Vertical Card (5 cols on lg) */}
          <div
            onClick={() => onCategorySelect('face')}
            className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-[#EDE7DF] p-8 sm:p-10 flex flex-col justify-between min-h-[420px] lg:min-h-[500px] cursor-pointer group border border-[#E4DCD2] transition-all hover:shadow-lg"
          >
            {/* Top Text Content */}
            <div className="z-10 max-w-[260px]">
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8C7662] block mb-2">
                UP TO 50% OFF
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#2C241B] leading-tight">
                Super Natural <br />
                <span className="font-medium">Beauty</span>
              </h3>
              
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#2C241B] group-hover:text-[#8C7662] transition">
                <span className="border-b border-current pb-0.5">SHOP NOW</span>
                <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">&gt;</span>
              </div>
            </div>

            {/* Bottom Product Feature: Gold Cream Jar with Cream Texture */}
            <div className="relative w-full h-56 sm:h-64 flex items-end justify-center mt-6">
              {/* Cream swirl splash background */}
              <div className="absolute inset-x-4 bottom-2 h-44 rounded-full bg-white/70 blur-md pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
                alt="Super Natural Beauty Jar"
                onError={(e) => {
                  e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                }}
                className="relative z-10 w-48 sm:w-56 h-48 sm:h-56 object-contain drop-shadow-xl group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Right Section: 2 Rows (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Row: 2 Split Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              
              {/* Tile B: 10% OFF Body Butter */}
              <div
                onClick={() => onCategorySelect('body')}
                className="relative overflow-hidden rounded-2xl bg-[#FCE9EE] p-7 flex items-center justify-between min-h-[220px] cursor-pointer group border border-[#F6D5DE] transition-all hover:shadow-md"
              >
                <div className="z-10 max-w-[140px]">
                  <span className="text-[11px] font-bold tracking-widest text-[#B35269] block mb-1">
                    10% OFF
                  </span>
                  <h4 className="font-serif text-2xl font-medium text-[#2E1A20] leading-snug">
                    Body Butter
                  </h4>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-[#2E1A20] group-hover:text-[#B35269] transition">
                    <span className="border-b border-current pb-0.5">SHOP NOW</span>
                    <span className="font-mono text-xs group-hover:translate-x-1 transition-transform">&gt;</span>
                  </div>
                </div>

                {/* Pink cosmetics bottle/jar */}
                <div className="w-28 h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=300&q=80"
                    alt="Body Butter"
                    onError={(e) => {
                      e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                    }}
                    className="w-24 h-24 object-contain drop-shadow-md group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Tile C: SKIN 2.0 Health & Beauty */}
              <div
                onClick={() => onCategorySelect('face')}
                className="relative overflow-hidden rounded-2xl bg-[#F4F6F8] p-7 flex items-center justify-between min-h-[220px] cursor-pointer group border border-[#E3E7EB] transition-all hover:shadow-md"
              >
                <div className="z-10 max-w-[140px]">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#5A7B8C] block mb-1 uppercase">
                    SKIN 2.0
                  </span>
                  <h4 className="font-serif text-2xl font-medium text-[#1E272C] leading-snug">
                    Health <br />& Beauty
                  </h4>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-[#1E272C] group-hover:text-[#5A7B8C] transition">
                    <span className="border-b border-current pb-0.5">SHOP NOW</span>
                    <span className="font-mono text-xs group-hover:translate-x-1 transition-transform">&gt;</span>
                  </div>
                </div>

                {/* White pump lotion splash */}
                <div className="w-28 h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80"
                    alt="Health & Beauty"
                    onError={(e) => {
                      e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                    }}
                    className="w-24 h-24 object-contain drop-shadow-md group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Row: Beauty & Spa Treatments Wide Tile */}
            <div
              onClick={() => onCategorySelect('face')}
              className="relative overflow-hidden rounded-2xl bg-[#93ACB7] p-8 sm:p-10 flex items-center justify-between min-h-[240px] cursor-pointer group border border-[#839EA9] text-white transition-all hover:shadow-lg"
            >
              {/* Left Content */}
              <div className="z-10 max-w-[280px]">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
                  Beauty & <br />
                  <span className="font-medium">Spa Treatments</span>
                </h3>

                <span className="inline-block mt-2 text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#FDE5EB]">
                  SKIN • HAIR • BODY
                </span>

                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white group-hover:text-[#FDE5EB] transition">
                  <span className="border-b border-white pb-0.5">SHOP NOW</span>
                  <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">&gt;</span>
                </div>
              </div>

              {/* Right Spa Esthetician Visual */}
              <div className="relative w-40 sm:w-56 h-36 sm:h-44 rounded-xl overflow-hidden shadow-lg border-2 border-white/40">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80"
                  alt="Beauty and Spa Treatments"
                  onError={(e) => {
                    e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
