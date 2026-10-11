'use client';

import FullPageScroll from '@/components/FullPageScroll';
import { useLang } from '@/components/LanguageContext';

export default function AboutPage() {
  const { lang } = useLang();
  const zh = lang === 'zh';

  const pages = [
    // Page 1: Developer
    <div key="page1" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">👨‍💻</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        Ivan Wang
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        {zh ? '开发者' : 'Developer'}
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        {zh
          ? '本网站由北京师范大学附属中学国际部学生 Ivan Wang 制作'
          : 'This website was built by Ivan Wang, a student in the International Department of the High School Affiliated to Beijing Normal University.'}
      </p>
    </div>,

    // Page 2: Project Introduction
    <div key="page2" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">📚</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        AP Biology
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        {zh ? '项目式学习（PBL）' : 'Project-Based Learning (PBL)'}
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        {zh ? (
          <>
            本网站源于 AP 生物学课程 PBL 项目式学习
            <br />
            是第一个面向本校生物学社区的学习网站
            <br />
            将课堂所学转化为实际产品，用技术赋能教育。
          </>
        ) : (
          <>
            Born from the AP Biology PBL program,
            <br />
            this is the first learning platform built for our school&apos;s biology community —
            <br />
            turning classroom knowledge into a real product, and empowering education with technology.
          </>
        )}
      </p>
    </div>,

    // Page 3: School
    <div key="page3" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">🏫</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        {zh ? '北京师范大学附属中学国际部' : 'The High School Affiliated to BNU'}
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        {zh ? 'International Department' : 'International Department'}
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        {zh ? (
          <>
            目前本网站仅服务于<span className="font-semibold text-slate-700">北京师范大学附属中学</span>的
            <span className="font-semibold text-slate-700">AP 生物学</span>课程教学。
          </>
        ) : (
          <>
            The platform currently serves the <span className="font-semibold text-slate-700">AP Biology</span> course at
            the <span className="font-semibold text-slate-700">High School Affiliated to Beijing Normal University</span>.
          </>
        )}
      </p>
    </div>,

    // Page 4: Teacher
    <div key="page4" className="text-center max-w-3xl mx-auto">
      <div className="text-6xl sm:text-7xl mb-8">👩‍🏫</div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
        {zh ? '付老师' : 'Ms. Fu'}
      </h1>
      <p className="text-xl sm:text-2xl text-teal-600 mb-4 font-medium">
        {zh ? '指导老师' : 'Faculty Advisor'}
      </p>
      <p className="text-lg text-slate-500 leading-relaxed">
        {zh ? (
          <>
            感谢付老师的悉心指导
            <br />
            让这个项目从想法变为现实。
          </>
        ) : (
          <>
            Special thanks to Ms. Fu for her dedicated guidance,
            <br />
            which turned this project from an idea into reality.
          </>
        )}
      </p>
    </div>,
  ];

  const bgColors = ['bg-white', 'bg-slate-50', 'bg-white', 'bg-slate-50'];
  const dotLabels = zh
    ? ['开发者', '项目简介', '学校', '指导老师']
    : ['Developer', 'The Project', 'School', 'Advisor'];

  return <FullPageScroll pages={pages} bgColors={bgColors} dotLabels={dotLabels} />;
}
