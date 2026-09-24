import React from 'react';

export const BrandStrip: React.FC = () => {
  const brands = [
    {
      name: 'Pure Beauty',
      sub: 'YOUR SLOGAN HERE',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4C6.2 19.1 6 17.6 6 16c0-4.4 3.6-8 8-8 1.6 0 3.1.5 4.4 1.4C17.6 5.8 15 2 12 2zm2 8c-3.3 0-6 2.7-6 6 0 1.2.4 2.3 1 3.2 2.7-1.1 4.7-3.6 5-6.6-.1-.3-.1-.5-.1-.6h.1z"/>
        </svg>
      ),
      font: 'font-serif tracking-[0.18em]',
    },
    {
      name: 'LOUIS & JANNE',
      sub: 'PARIS',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.5-.95C9.07 20.66 10.49 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5h2v6h-2V8zm1 10.2c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2z"/>
        </svg>
      ),
      font: 'font-sans font-light tracking-[0.25em]',
    },
    {
      name: 'BEAUTY',
      sub: 'ESSENTIALS',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2zm0 4.5l-1.3 2.6-2.9.4 2.1 2-.5 2.9 2.6-1.4 2.6 1.4-.5-2.9 2.1-2-2.9-.4L12 6.5z"/>
        </svg>
      ),
      font: 'font-serif tracking-[0.2em]',
    },
    {
      name: 'SPA & BEAUTY',
      sub: 'HOLISTIC WELLNESS',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-1.8 2.5-3.5 5.5-3.5 8 0 3 2 5 3.5 5s3.5-2 3.5-5c0-2.5-1.7-5.5-3.5-8zm-5.5 8c0 2.2 1.2 3.8 2.5 4.5-.6-1.5-.7-3.2-.2-4.8-1.4-.4-2.3.1-2.3.3zm11 0c0-.2-.9-.7-2.3-.3.5 1.6.4 3.3-.2 4.8 1.3-.7 2.5-2.3 2.5-4.5z"/>
        </svg>
      ),
      font: 'font-sans tracking-[0.22em]',
    },
    {
      name: 'D & R',
      sub: 'BOTANICAL LAB',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M10 8h2.5a2.5 2.5 0 010 5H10V8zm0 5h3a2.5 2.5 0 010 5H10v-5z" fill="currentColor"/>
        </svg>
      ),
      font: 'font-serif tracking-[0.22em]',
    },
    {
      name: 'BEAUTY',
      sub: 'ORGANIC ESSENCE',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.52-11 4 4 1 6 2 6 2s-3 1-5 2c3.5 2 4.5 4 4.5 4S14 15 17 8z"/>
        </svg>
      ),
      font: 'font-serif tracking-[0.24em]',
    },
  ];

  return (
    <section className="py-10 sm:py-12 bg-white border-b border-[#F4F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Monochrome Brand Strip matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center opacity-75 hover:opacity-100 transition-opacity">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-2 px-3 text-center group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Monochrome Emblem */}
              <div className="text-[#333333] group-hover:text-[#E3889B] transition-colors mb-2">
                {brand.icon}
              </div>

              <span className={`text-[12px] sm:text-[13px] text-[#222222] font-medium uppercase ${brand.font}`}>
                {brand.name}
              </span>
              <span className="text-[7.5px] tracking-[0.22em] text-[#888888] uppercase mt-0.5">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
