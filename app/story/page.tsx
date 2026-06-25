'use client';

import FullPageScroll from '@/components/FullPageScroll';

export default function AboutPage() {
  const pages = [
    // Page 1: Developer
    <div key="page1" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">👨‍💻</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        Ivan Wang
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        开发者
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        本网站由北京师范大学附属中学国际部学生 Ivan Wang 制作
      </p>
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        This website was created by Ivan Wang, a student from the International Division of Beijing Normal University Affiliated High School.
      </p>
    </div>,

    // Page 2: Project Introduction
    <div key="page2" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">🧬</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        项目介绍
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        源于课堂，用于实践
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        本网站源于 AP 生物学课程 PBL 项目式学习
        <br />
        将课堂所学转化为实际产品，用技术赋能教育。
      </p>
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        This website originated from the AP Biology Project-Based Learning (PBL) program.
        <br />
        Transforming classroom knowledge into real products, empowering education with technology.
      </p>
    </div>,

    // Page 3: School
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
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        Currently, this website only serves the <span className="font-semibold text-slate-500">AP Biology</span> course of the
        <span className="font-semibold text-slate-500">International Division of Beijing Normal University Affiliated High School</span>.
      </p>
    </div>,

    // Page 4: Teacher
    <div key="page4" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">👩‍🏫</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        付老师
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        指导老师
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        感谢 付老师 的悉心指导
        <br />
        让这个项目从想法变为现实。
      </p>
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        Special thanks to Ms. Fu for her dedicated guidance,
        <br />
        turning this project from an idea into reality.
      </p>
    </div>,
  ];

  const bgColors = ['bg-white', 'bg-slate-50', 'bg-white', 'bg-slate-50'];

  return <FullPageScroll pages={pages} bgColors={bgColors} />;
}
