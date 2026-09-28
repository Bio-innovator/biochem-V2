'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { api } from '@/lib/api';
import FullPageScroll from '@/components/FullPageScroll';
import DnaHelix from '@/components/DnaHelix';

// Unit definitions
const units = [
  { id: 'unit1', title: 'Unit 1', nameEn: 'Chemistry of Life', nameZh: '生命的化学' },
  { id: 'unit2', title: 'Unit 2', nameEn: 'Cell Structure', nameZh: '细胞结构' },
  { id: 'unit3', title: 'Unit 3', nameEn: 'Cellular Energetics', nameZh: '细胞能量学' },
  { id: 'unit4', title: 'Unit 4', nameEn: 'Cell Communication', nameZh: '细胞通讯' },
  { id: 'unit5', title: 'Unit 5', nameEn: 'Heredity', nameZh: '遗传学' },
  { id: 'unit6', title: 'Unit 6', nameEn: 'Gene Expression', nameZh: '基因表达' },
  { id: 'unit7', title: 'Unit 7', nameEn: 'Natural Selection', nameZh: '自然选择' },
  { id: 'unit8', title: 'Unit 8', nameEn: 'Ecology', nameZh: '生态学' },
];

// 手绘线条图标（stroke 风格，随文字色变化）
const iconProps = {
  className: 'w-7 h-7 text-teal-700',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const;

const IconBook = () => (
  <svg {...iconProps}>
    <path d="M12 6.5C10 4.8 7.3 4 4.5 4v14c2.8 0 5.5.8 7.5 2.5 2-1.7 4.7-2.5 7.5-2.5V4c-2.8 0-5.5.8-7.5 2.5z" />
    <path d="M12 6.5v14" />
    <path d="M17.5 8.5c.8-.9 1.8-1.3 2.5-1.3-.2.9-.7 1.9-1.6 2.6" />
  </svg>
);

const IconChecklist = () => (
  <svg {...iconProps}>
    <path d="M9 6.5h10M9 12h10M9 17.5h10" />
    <path d="M3.5 6.5l1.2 1.2L7 5.5" />
    <path d="M3.5 12l1.2 1.2L7 11" />
    <path d="M3.5 17.5l1.2 1.2L7 16.5" />
  </svg>
);

const IconGlossary = () => (
  <svg {...iconProps}>
    <path d="M6 3.5h12A1.5 1.5 0 0 1 19.5 5v14A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5z" />
    <path d="M9 3.5v6l2-1.5 2 1.5v-6" />
    <path d="M8.5 15h7M8.5 17.5h5" />
  </svg>
);

const IconCompass = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15.5 8.5l-2.2 5-5 2.2 2.2-5z" />
    <circle cx="12" cy="12" r="0.5" fill="currentColor" />
  </svg>
);

const IconChart = () => (
  <svg {...iconProps}>
    <path d="M4 4v15.5h16" />
    <path d="M8.5 15.5v-4M12.5 15.5V8M16.5 15.5v-2.5" />
  </svg>
);

const IconStopwatch = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="13.5" r="6.5" />
    <path d="M12 10.5v3l2.2 1.5" />
    <path d="M9.5 3h5M12 3v4" />
  </svg>
);

const IconSprout = () => (
  <svg {...iconProps} className="w-9 h-9 text-teal-700">
    <path d="M12 21v-8" />
    <path d="M12 13c0-3.5 2.8-6 7-6 0 3.8-2.8 6-7 6z" />
    <path d="M12 13c0-3.5-2.8-6-7-6 0 3.8 2.8 6 7 6z" />
  </svg>
);

const features = [
  { icon: IconBook, title: '知识点学习', titleEn: 'Knowledge', desc: '8 个单元共 53 个核心知识点，中英双语讲解', descEn: '53 core topics across 8 units, bilingual' },
  { icon: IconChecklist, title: '小测平台', titleEn: 'Quiz', desc: '1000+ 道精选题目，支持按单元筛选和限时模式', descEn: '1000+ selected questions with filtering & timer' },
  { icon: IconGlossary, title: '生物词典', titleEn: 'Glossary', desc: '1000+ 专业词汇，音标、释义、例句齐全', descEn: '1000+ professional terms with phonetics & examples' },
  { icon: IconCompass, title: '专业探索', titleEn: 'Majors', desc: '本科及研究生生物相关专业介绍与课程规划', descEn: 'Undergraduate & graduate bio major guides' },
  { icon: IconChart, title: '班级统计', titleEn: 'Classroom', desc: '班级概览、学生名单、薄弱知识点统计', descEn: 'Class overview, student list & weak spots' },
  { icon: IconStopwatch, title: '题目测试', titleEn: 'AP Exam', desc: '生物题目、在线模考、成绩分析', descEn: 'Practice exams & performance analysis' },
];

const heroStats = [
  { value: '8', zh: '单元', en: 'Units' },
  { value: '53', zh: '知识点', en: 'Topics' },
  { value: '1000+', zh: '精选题目', en: 'Questions' },
  { value: '1000+', zh: '专业词汇', en: 'Terms' },
];

function HomeContent() {
  const { user, login } = useAuth();
  const searchParams = useSearchParams();
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('login')) setShowLogin(true);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.post('/api/auth/login', { username: form.username, password: form.password });
      login(data.token, data.user);
      window.location.href = '/dashboard';
    } catch (e: any) {
      setError(e.message || '登录失败 Login failed');
    } finally {
      setLoading(false);
    }
  };

  // If logged in, redirect to dashboard
  if (user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600 mb-4">
            欢迎回来，{user.displayName || user.username}！
            <span className="block text-sm text-slate-400 mt-1">Welcome back!</span>
          </p>
          <Link href="/dashboard" className="text-teal-600 hover:underline">
            前往控制台 →
            <span className="block text-sm text-slate-400 mt-1">Go to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const pages = [
    // Page 1: Hero —— 生成式 DNA 双螺旋 + 白色文字岛
    <div key="hero" className="absolute inset-0 overflow-hidden">
      <DnaHelix />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 sm:px-6 pt-6 pb-16">
        <div className="w-full max-w-2xl bg-white/85 backdrop-blur-sm border border-slate-200 rounded-2xl px-6 sm:px-12 py-9 sm:py-11 text-center">
          <p className="text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-4">
            AP BIOLOGY · 8 UNITS · 53 TOPICS
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-3">
            Biochem-niche
          </h1>
          <p className="text-xl sm:text-2xl text-teal-600 font-medium">
            AP Biology 智能学习平台
          </p>
          <p className="text-xs text-slate-400 mt-1 mb-6">AP Biology Intelligent Learning Platform</p>
          <p className="text-slate-500 mb-2 text-sm sm:text-base leading-relaxed">
            专为 AP 生物学考试设计的学习管理系统，涵盖 8 个单元的知识点、自测题库、
            生物词汇表和专业方向探索。支持学生和教师两种角色。
          </p>
          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            A learning management system designed for AP Biology exam preparation, covering 8 units of knowledge, self-test quizzes, biological vocabulary, and major exploration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => { setShowLogin(true); setError(''); }}
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium text-lg shadow-lg hover:shadow-xl"
            >
              登录
              <span className="block text-sm font-normal opacity-80 mt-0.5">Login</span>
            </button>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-3 bg-white/70 border border-slate-300 text-slate-700 rounded-lg hover:border-teal-600 hover:text-teal-700 transition font-medium text-lg"
            >
              个人介绍
              <span className="block text-sm font-normal opacity-60 mt-0.5">Personal-intro</span>
            </Link>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {heroStats.map((s) => (
              <div key={s.en}>
                <div className="text-xl font-bold text-slate-900">{s.value}</div>
                <div className="text-xs text-slate-500">{s.zh}</div>
                <div className="text-[10px] text-slate-400">{s.en}</div>
              </div>
            ))}
          </div>
        </div>
        {/* 滚动提示 */}
        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-slate-400 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em]">下滑探索 · SCROLL</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>,

    // Page 2: Features —— 细分割线网格 + 手绘图标
    <div key="features" className="text-center max-w-6xl mx-auto w-full">
      <p className="text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-2">PLATFORM FEATURES</p>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">平台功能</h2>
      <p className="text-sm text-slate-400 mb-10">六大模块，覆盖 AP 生物备考全流程</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden text-left mx-4 sm:mx-0">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 transition-colors hover:bg-teal-50/40">
            <div className="mb-4">
              <f.icon />
            </div>
            <h3 className="font-semibold text-slate-900 mb-0.5 text-lg">
              {f.title}
              <span className="text-xs text-slate-400 font-normal ml-2">{f.titleEn}</span>
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-1">{f.desc}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{f.descEn}</p>
          </div>
        ))}
      </div>
    </div>,

    // Page 3: Units —— 编辑部式编号列表
    <div key="units" className="text-center max-w-4xl mx-auto w-full">
      <p className="text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-2">COURSE MAP</p>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">AP Biology 单元一览</h2>
      <p className="text-sm text-slate-400 mb-10">AP Biology Units Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 text-left px-4 sm:px-0">
        {units.map((unit, i) => (
          <div
            key={unit.id}
            className="group flex items-baseline gap-4 py-4 border-b border-slate-200 transition-colors hover:border-teal-400"
          >
            <span className="font-mono text-sm text-slate-300 group-hover:text-teal-600 transition-colors w-7 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-slate-800">{unit.nameZh}</div>
              <div className="text-xs text-slate-400">{unit.nameEn}</div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors">
              {unit.title}
            </span>
          </div>
        ))}
      </div>
    </div>,

    // Page 4: Footer / CTA
    <div key="footer" className="text-center max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <IconSprout />
      </div>
      <p className="text-[11px] tracking-[0.28em] text-teal-700 font-medium mb-2">START YOUR JOURNEY</p>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">开始你的 AP 生物学习之旅</h2>
      <p className="text-sm text-slate-400 mb-6">Start Your AP Biology Journey</p>
      <button
        onClick={() => { setShowLogin(true); setError(''); }}
        className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium text-lg shadow-lg"
      >
        立即登录
        <span className="block text-sm font-normal opacity-80 mt-0.5">Login Now</span>
      </button>
      <p className="mt-10 text-xs text-slate-400 tracking-wide">
        Biochem-niche v2.2 — AP Biology Learning Platform
      </p>
    </div>,
  ];

  const bgColors = ['bg-white', 'bg-slate-50', 'bg-white', 'bg-slate-50'];

  return (
    <>
      <FullPageScroll pages={pages} bgColors={bgColors} />

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-bold text-slate-900">登录</h2>
                <span className="text-xs text-slate-400">Login</span>
              </div>
              <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  用户名
                  <span className="text-xs text-slate-400 ml-2">Username</span>
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入用户名 / Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  密码
                  <span className="text-xs text-slate-400 ml-2">Password</span>
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入密码 / Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 font-medium"
              >
                {loading ? '登录中... Logging in...' : '登录 Login'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">加载中... Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
