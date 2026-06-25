'use client';

import Link from 'next/link';
import FullPageScroll from '@/components/FullPageScroll';

export default function AboutPage() {
  const pages = [
    // Page 1: Creator
    <div key="page1" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">👨‍💻</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        Ivan
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        开发者
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        本网站由北京师范大学附属中学国际部学生 <span className="font-semibold text-slate-700">Ivan</span> 制作
      </p>
    </div>,

    // Page 2: Origin
    <div key="page2" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">📚</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        AP Biology
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        项目式学习
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        本网站源于 <span className="font-semibold text-slate-700">AP 生物学 PBL 项目式学习</span>
        <br />
        将课堂所学转化为实际产品，用技术赋能教育。
      </p>
    </div>,

    // Page 3: Service scope
    <div key="page3" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">🏫</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        北京师范大学附属中学
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        国际部 AP 生物学
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        目前本网站仅服务于<span className="font-semibold text-slate-700">北京师范大学附属中学国际部</span>的
        <span className="font-semibold text-slate-700">AP生物学</span>课程教学。
      </p>
    </div>,

    // Page 4: Advisor
    <div key="page4" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">👩‍🏫</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        付老师
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        指导老师
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        感谢 <span className="font-semibold text-slate-700">付老师</span> 的悉心指导
        <br />
        让这个项目从想法变为现实。
      </p>
    </div>,

    // Page 5: Mission + login
    <div key="page4" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">🌟</div>
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

  const bgColors = ['bg-white', 'bg-slate-50', 'bg-white', 'bg-slate-50', 'bg-white'];

  return (
    <FullPageScroll pages={pages} bgColors={bgColors} />
  );
}
