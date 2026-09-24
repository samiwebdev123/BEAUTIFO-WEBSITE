import React from 'react';
import { Instagram, Heart } from 'lucide-react';
import { BEAUTY_FALLBACK_IMAGE } from '../utils/format';

export const InstagramGallery: React.FC = () => {
  const posts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
      title: 'Velvety Hand Care Ritual',
      likes: '1.4k',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      title: 'Dewy Morning Cleanse',
      likes: '2.8k',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      title: 'Hydra Glow Esthetician Care',
      likes: '3.1k',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      title: 'Whipped Aloe Barrier Cream',
      likes: '1.9k',
    },
  ];

  return (
    <section id="instagram" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings matching reference */}
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]">
            @beautifo_store
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] mt-1.5 font-light tracking-wide">
            Follow us on Instagram
          </p>
        </div>

        {/* 4-Image Horizontal Gallery with Rounded Corners & Aspect Ratio */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#F0F0F2] bg-[#F8F8F9]"
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = BEAUTY_FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Subtle Hover Effect */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium tracking-wider uppercase">
                  @beautifo_store
                </span>
                <div className="flex items-center gap-1 text-[11px] text-[#FDE5EB] mt-1">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
