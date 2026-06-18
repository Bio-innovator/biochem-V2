'use client';

import { useState } from 'react';
import Link from 'next/link';
import FullPageScroll from '@/components/FullPageScroll';

export default function StoryPage() {
  const [showLoginHint, setShowLoginHint] = useState(false);

  const pages = [
    // Page 1: niche pronunciation
    <div key="page1" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">🔊</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        /nɪtʃ/
      </h1>
      <p className="text-2xl sm:text-3xl text-teal-600 mb-4 font-medium">
        niche 的正确发音
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        在生态学中，这个词被翻译为 <span className="font-semibold text-slate-700">"生态龛"</span>，
        指的是一个物种在生态系统中所占据的独特位置和角色。
      </p>
    </div>,

    // Page 2: common mistakes
    <div key="page2" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">😅</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        /nɪk/ ？ 生态"lóng"？
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        初学者的真实困惑
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        初学者可能会发出 <span className="font-mono bg-slate-100 px-2 py-1 rounded">/nɪk/</span>，
        或用中文读作生态 <span className="font-semibold text-slate-700">"lóng"</span>（真实事件）。
        <br />
        这些小小的"失误"，恰恰是学习路上最珍贵的记忆。
      </p>
    </div>,

    // Page 3: how the name came
    <div key="page3" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">💡</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        Biochem-niche
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        名字由此而来
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        这样的事情难免会发生，而我们的网站也因此得名。
        <br />
        <span className="italic">Biochem</span> 代表生物化学的基石，
        <span className="italic">niche</span> 代表每个学习者在知识生态中都能找到属于自己的位置。
      </p>
    </div>,

    // Page 4: mission + login button
    <div key="page4" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">🎯</div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-snug">
        我们的使命
      </h1>
      <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
        我们致力于让有资源学生更牢固地掌握生物知识点，
        让没有资源学生获得更公平的学习机会。
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

  return (
    <>
      <FullPageScroll pages={pages} bgColors={bgColors} />
      {showLoginHint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
            <p className="text-lg text-slate-700 mb-4">请前往首页登录</p>
            <button
              onClick={() => setShowLoginHint(false)}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </>
  );
}
