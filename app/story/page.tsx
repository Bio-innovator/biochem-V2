'use client';

import Link from 'next/link';
import FullPageScroll from '@/components/FullPageScroll';

export default function StoryPage() {
  const pages = [
    // Page 1
    <div key="page1" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">🔊</div>
      <p className="text-2xl sm:text-4xl font-medium text-slate-900 leading-relaxed">
        niche 的发音是 /nɪtʃ/，翻译做 生态龛
      </p>
    </div>,

    // Page 2
    <div key="page2" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">😅</div>
      <p className="text-2xl sm:text-4xl font-medium text-slate-900 leading-relaxed">
        初学者可能会发出 /nɪk/，或用中文读作生态 "lóng"
        <br />
        （真实事件）
      </p>
    </div>,

    // Page 3
    <div key="page3" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">💡</div>
      <p className="text-2xl sm:text-4xl font-medium text-slate-900 leading-relaxed">
        这样的事情难免会发生，而我们的网站也因此得名：
        <br />
        Biochem-niche
      </p>
    </div>,

    // Page 4
    <div key="page4" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">🎯</div>
      <p className="text-2xl sm:text-4xl font-medium text-slate-900 leading-relaxed mb-12">
        我们致力于让有资源学生更牢固地掌握生物知识点，让没有资源学生获得更公平的学习机会
      </p>
      <Link
        href="/?login=1"
        className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium text-lg shadow-lg hover:shadow-xl"
      >
        登录
      </Link>
    </div>,
  ];

  const bgColors = ['bg-white', 'bg-slate-50', 'bg-white', 'bg-slate-50'];

  return <FullPageScroll pages={pages} bgColors={bgColors} />;
}
