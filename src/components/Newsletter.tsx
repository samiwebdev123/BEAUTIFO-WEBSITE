import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { BEAUTY_FALLBACK_IMAGE } from '../utils/format';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FCECEF] via-[#FDF2F4] to-[#FCECEF] px-6 py-12 sm:px-12 sm:py-16 text-center border border-[#F6DCE2] shadow-xs">
          
          {/* Decorative Cosmetics Accents at Edges matching reference screenshot */}
          <div className="absolute -left-4 -bottom-6 w-36 sm:w-48 h-36 sm:h-48 pointer-events-none opacity-85 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80"
              alt="Cosmetics Bottle"
              onError={(e) => {
                e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
              }}
              className="w-full h-full object-contain mix-blend-multiply rotate-12 drop-shadow-md"
            />
          </div>
          <div className="absolute -right-4 -top-6 w-36 sm:w-48 h-36 sm:h-48 pointer-events-none opacity-85 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80"
              alt="Lip Gloss Applicator"
              onError={(e) => {
                e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
              }}
              className="w-full h-full object-contain mix-blend-multiply -rotate-45 drop-shadow-md"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B95B72] block mb-2">
              EXCLUSIVE MEMBERSHIP
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#201C1D] tracking-tight">
              Sign up now & get 10% off
            </h3>

            <p className="mt-3 text-xs sm:text-[14px] text-[#695D60] font-sans max-w-lg mx-auto leading-relaxed">
              Subscribe to our emails and get 15% off your first online order.
            </p>

            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-2.5 bg-white/95 px-6 py-3.5 rounded-full text-xs font-semibold text-[#188B69] shadow-sm border border-[#C5EBDC] animate-in fade-in zoom-in-95">
                <Check className="w-4 h-4 text-[#188B69]" />
                <span>Thank you! You are now subscribed. Use code WELCOME15 for 15% off your order.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-white p-1.5 rounded-full shadow-md border border-[#F1D1D8]">
                  <div className="flex items-center flex-1 w-full px-4">
                    <Mail className="w-4 h-4 text-[#B89FA5] mr-2.5 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full text-xs sm:text-sm text-[#222222] placeholder:text-[#AAAAAA] focus:outline-hidden py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#E3889B] hover:bg-[#D37085] active:scale-95 text-white px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>SUBSCRIBE</span>
                    <span className="font-mono text-xs">&gt;</span>
                  </button>
                </div>
              </form>
            )}

            <span className="text-[10px] text-[#9E8B90] block mt-3 font-mono">
              NO SPAM. UNSUBSCRIBE ANYTIME WITH ONE CLICK.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
