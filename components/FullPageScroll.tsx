'use client';

import { useState, useCallback, useRef, useEffect, ReactNode } from 'react';

interface FullPageScrollProps {
  pages: ReactNode[];
  bgColors?: string[];
}

export default function FullPageScroll({ pages, bgColors }: FullPageScrollProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const isScrolling = useRef(false);
  const totalPages = pages.length;

  const goToPage = useCallback((index: number) => {
    if (index < 0 || index >= totalPages) return;
    setCurrentPage(index);
  }, [totalPages]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 200);

    if (e.deltaY > 0 && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (e.deltaY < 0 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, totalPages]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 200);
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 200);
        setCurrentPage(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  // Touch support
  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling.current) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 50) {
      isScrolling.current = true;
      setTimeout(() => { isScrolling.current = false; }, 200);
      if (deltaY > 0) {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
      } else {
        setCurrentPage(prev => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <div
      className="fixed inset-0 top-14 overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pages Container */}
      <div
        className="h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentPage * 100}%)` }}
      >
        {pages.map((page, index) => (
          <div
            key={index}
            className={`h-full w-full flex flex-col items-center justify-center px-6 ${
              bgColors?.[index] || 'bg-white'
            }`}
          >
            {page}
          </div>
        ))}
      </div>

      {/* Right Side Dot Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              index === currentPage
                ? 'bg-teal-600 border-teal-600 scale-125'
                : 'bg-white/60 border-slate-400 hover:bg-slate-300 hover:border-slate-500'
            }`}
            aria-label={`跳转到第 ${index + 1} 页`}
          />
        ))}
      </div>
    </div>
  );
}
