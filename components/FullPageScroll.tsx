'use client';

import { useState, useCallback, useRef, useEffect, ReactNode } from 'react';

interface FullPageScrollProps {
  pages: ReactNode[];
  bgColors?: string[];
}

export default function FullPageScroll({ pages, bgColors }: FullPageScrollProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const isScrolling = useRef(false);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalPages = pages.length;

  const lockBriefly = useCallback(() => {
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  }, []);

  const goToPage = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalPages) return;
      setCurrentPage(index);
    },
    [totalPages]
  );

  // 当前页内容若还能继续向 deltaY 方向滚动，则把滚轮留给页面内部
  const innerCanScroll = useCallback(
    (deltaY: number) => {
      const el = pageRefs.current[currentPage];
      if (!el) return false;
      if (deltaY > 0) return el.scrollTop + el.clientHeight < el.scrollHeight - 2;
      return el.scrollTop > 2;
    },
    [currentPage]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isScrolling.current) return;
      if (innerCanScroll(e.deltaY)) return; // 内部先滚，滚到边界才翻页
      lockBriefly();
      if (e.deltaY > 0 && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    },
    [currentPage, totalPages, innerCanScroll, lockBriefly]
  );

  // 键盘支持（输入框内不劫持方向键）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (isScrolling.current) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        lockBriefly();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        lockBriefly();
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, lockBriefly]);

  // 触摸支持：内部滚动未消费手势时才翻页
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartScrollTop.current = pageRefs.current[currentPage]?.scrollTop ?? 0;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling.current) return;
    const el = pageRefs.current[currentPage];
    // 手势被页面内部滚动消费了，则不翻页
    if (el && Math.abs(el.scrollTop - touchStartScrollTop.current) > 4) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 50) {
      // 只有在滚动边界处才允许翻页
      if (deltaY > 0 && el && el.scrollTop + el.clientHeight < el.scrollHeight - 2) return;
      if (deltaY < 0 && el && el.scrollTop > 2) return;
      lockBriefly();
      if (deltaY > 0) {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      } else {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // 所有设备统一整页翻屏；每页内部可独立滚动，内容再高也不会侵入相邻页
  return (
    <div
      className="fixed inset-0 top-16 overflow-hidden"
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
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            className={`relative h-full w-full overflow-y-auto overflow-x-hidden ${
              bgColors?.[index] || 'bg-white'
            }`}
          >
            {/* 右侧为翻页圆点留出余白，避免文字被遮挡 */}
            <div className="min-h-full flex flex-col pl-5 pr-12 py-6 sm:pl-8 sm:pr-16 sm:py-8">
              <div className="m-auto w-full flex flex-col items-center">{page}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side Dot Indicators —— 半透明常驻，悬停时才完全显现 */}
      <div className="fixed right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 sm:gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
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
