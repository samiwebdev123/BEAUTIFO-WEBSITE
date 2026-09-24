import React from 'react';
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube, Pin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-white text-[#444444] pt-16 pb-12 border-t border-[#F0F0F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12 pb-14">
          
          {/* Column 1: Brand Info */}
          <div className="sm:col-span-2 md:col-span-1 pr-4">
            <div className="flex items-center gap-2 mb-4">
              {/* Official Gold Logo Insignia */}
              <img
                src="/beautifo-gold-logo.png"
                alt="BEAUTIFO Emblem"
                onError={(e) => {
                  e.currentTarget.src = '/beautifo-gold-logo.jpg';
                }}
                className="w-8 h-8 object-contain rounded-md shadow-xs"
              />
              <span className="font-serif tracking-[0.24em] text-xl font-semibold text-[#111111] uppercase">
                BEAUTIFO
              </span>
            </div>

            <p className="text-xs text-[#777777] leading-relaxed mb-6">
              An oasis of online beauty built specifically so your cosmetics site can take everyone's beauty away.
            </p>

            <div className="space-y-2.5 text-xs text-[#555555]">
              <div>
                <span className="text-[11px] text-[#777777] block font-medium">Owner:</span>
                <span className="font-semibold text-[#1A1A1A]">Sami Raza</span>
              </div>
              <div>
                <span className="text-[11px] text-[#777777] block font-medium">Contact:</span>
                <a
                  href="tel:03112989025"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1A1A1A] hover:text-[#E3889B] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E3889B] shrink-0" />
                  <span>03112989025</span>
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-[#E3889B] shrink-0" />
                <a href="mailto:contact@beautifo.com" className="hover:text-[#E3889B] transition">
                  contact@beautifo.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5 text-xs text-[#666666]">
              {['Story', 'Products', 'Blog', 'Giving Back', 'Partnerships', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#E3889B] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#666666]">
              {[
                'Shipping Info',
                'Returns & Exchanges',
                'Help & FAQ',
                'Reviews',
                'Quiz',
                'Store Locator',
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#E3889B] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Service */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] mb-4">
              Service
            </h4>
            <ul className="space-y-2.5 text-xs text-[#666666]">
              {['Contact Us', 'Delivery', 'Returns', 'My Account', 'Rewards'].map((link) => (
                <li key={link}>
                  <a
                    href={link === 'Contact Us' ? 'tel:03112989025' : '#'}
                    className="hover:text-[#E3889B] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Socials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] mb-4">
              Socials
            </h4>
            <ul className="space-y-3 text-xs text-[#666666]">
              {[
                { name: 'Facebook', icon: Facebook },
                { name: 'Twitter', icon: Twitter },
                { name: 'LinkedIn', icon: Linkedin },
                { name: 'Pinterest', icon: Pin },
                { name: 'YouTube', icon: Youtube },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href="#"
                      className="flex items-center gap-2.5 hover:text-[#E3889B] group transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#FAF5F6] text-[#E3889B] group-hover:bg-[#E3889B] group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-3 h-3" />
                      </div>
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar matching reference */}
        <div className="border-t border-[#F2F2F4] pt-8 text-center text-xs text-[#888888] tracking-wide">
          <p>Copyright © 2026 Beautifo. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};
