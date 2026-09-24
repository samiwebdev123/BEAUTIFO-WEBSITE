import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 1300, // approximately 1.3 seconds (within 1-1.5s range)
}) => {
  const [mounted, setMounted] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Subtle fade in on mount
    const enterTimer = setTimeout(() => {
      setFadeIn(true);
    }, 50);

    // Fade out after duration
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration);

    // Unmount completely after fade-out transition
    const removeTimer = setTimeout(() => {
      setMounted(false);
      if (onComplete) onComplete();
    }, duration + 500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onComplete]);

  if (!mounted) return null;

  return (
    <div
      id="beautifo-loading-screen"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isFadingOut}
    >
      <div
        className={`relative flex items-center justify-center p-6 text-center select-none transition-all duration-700 ease-out ${
          fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Centered BEAUTIFO Gold Logo using the supplied image */}
        <div className="w-64 sm:w-80 md:w-96 max-w-[85vw] flex items-center justify-center">
          <img
            src="/beautifo-gold-logo.png"
            alt="BEAUTIFO Gold Logo"
            onError={(e) => {
              e.currentTarget.src = '/beautifo-gold-logo.jpg';
            }}
            className="w-full h-auto object-contain filter drop-shadow-[0_2px_20px_rgba(212,175,55,0.2)]"
          />
        </div>
      </div>
    </div>
  );
};
