'use client';

import Link from 'next/link';
import FullPageScroll from '@/components/FullPageScroll';

export default function StoryPage() {
  const pages = [
    // Page 1
    <div key="page1" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">🔊</div>
      <p className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed">
        niche 的发音是 /nɪtʃ/，中文叫做 生态龛
      </p>
      <p className="text-sm text-slate-400 mt-4 leading-relaxed">
        The pronunciation of niche is /nɪtʃ/,  which is called shēngtài kān in Chinese.
      </p>
    </div>,

    // Page 2
    <div key="page2" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">😅</div>
      <p className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed">
        初学者可能会发出 /nɪk/，或用中文读作生态 "lóng"
        <br />
        （真实事件）
      </p>
      <p className="text-sm text-slate-400 mt-4 leading-relaxed">
        Beginners might say /nɪk/, or call the last word in Chinese "lóng".
        <br />
        (True story)
      </p>
    </div>,

    // Page 3
    <div key="page3" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">💡</div>
      <p className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed">
        这样的事情难免会发生，而我们的网站也因此得名：
        <br />
        Biochem-niche
      </p>
      <p className="text-sm text-slate-400 mt-4 leading-relaxed">
        Such things happen inevitably, and that's how our website got its name:
        <br />
        Biochem-niche
      </p>
    </div>,

    // Page 4
    <div key="page4" className="text-center max-w-4xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-12">🎯</div>
      <p className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed mb-12">
        我们致力于让有资源学生更牢固地掌握生物知识点，
        <br />
        让没有资源学生获得更公平的学习机会，找到属于自己的“niche”
      </p>
      <p className="text-sm text-slate-400 mb-10 leading-relaxed">
        We are dedicated to helping resourceful students master biology knowledge more solidly,
        <br />
        and giving students without resources fairer access to learning
        <br />
        —so that every student can find their own "niche."
      </p>
      <Link
        href="/?login=1"
        className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium text-lg shadow-lg hover:shadow-xl"
      >
        登录
        <span className="block text-sm font-normal opacity-80 mt-0.5">Login</span>
      </Link>
    </div>,
  ];

  const bgColors = ['bg-white', 'bg-slate-50', 'bg-white', 'bg-slate-50'];

  return <FullPageScroll pages={pages} bgColors={bgColors} />;
}
