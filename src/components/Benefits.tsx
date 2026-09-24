import React from 'react';

export const Benefits: React.FC = () => {
  const perks = [
    {
      title: 'Free Deluxe Samples',
      subtitle: 'On orders over PKR 6,000',
      icon: (
        <svg className="w-8 h-8 stroke-[#E3889B] fill-none stroke-[1.5]" viewBox="0 0 32 32">
          {/* Bottle 1 */}
          <rect x="6" y="11" width="8" height="15" rx="2" />
          <path d="M8 11V8h4v3" />
          <circle cx="10" cy="7" r="1.5" />
          {/* Bottle 2 */}
          <rect x="17" y="13" width="9" height="13" rx="2.5" />
          <path d="M19 13V10h5v3" />
          <path d="M21.5 6v4" />
        </svg>
      ),
    },
    {
      title: 'Earn Reward Points',
      subtitle: 'With our loyalty programme',
      icon: (
        <svg className="w-8 h-8 stroke-[#E3889B] fill-none stroke-[1.5]" viewBox="0 0 32 32">
          <circle cx="16" cy="13" r="7" />
          <path d="M16 9.5l1 2.5 2.5.3-1.8 1.7.5 2.5-2.2-1.2-2.2 1.2.5-2.5-1.8-1.7 2.5-.3z" />
          <path d="M12 18.5L10 26l6-3 6 3-2-7.5" />
        </svg>
      ),
    },
    {
      title: 'Free Standard Delivery',
      subtitle: 'On Pakistan orders over PKR 3,000',
      icon: (
        <svg className="w-8 h-8 stroke-[#E3889B] fill-none stroke-[1.5]" viewBox="0 0 32 32">
          <path d="M4 8h15v14H4z" />
          <path d="M19 13h5l4 4v5h-9z" />
          <circle cx="9" cy="24" r="2.5" />
          <circle cx="23" cy="24" r="2.5" />
          <path d="M1 11h2M1 15h3M1 19h2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBFB] border-t border-b border-[#F2EEEE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#EFE7E9]">
          {perks.map((perk, index) => (
            <div key={index} className="flex flex-col items-center pt-6 md:pt-0 px-4 sm:px-6 group">
              {/* Delicate Icon */}
              <div className="mb-3.5 transform group-hover:-translate-y-1 transition-transform duration-300">
                {perk.icon}
              </div>

              <h4 className="font-serif text-base sm:text-lg font-medium text-[#1F1F1F] tracking-tight">
                {perk.title}
              </h4>

              <p className="text-xs sm:text-[13px] text-[#777777] mt-1 font-light">
                {perk.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
