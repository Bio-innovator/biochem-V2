'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { api } from '@/lib/api';

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

function HomeContent() {
  const { user, login } = useAuth();
  const searchParams = useSearchParams();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('login')) setShowLogin(true);
    if (searchParams.get('register')) setShowRegister(true);
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
      setError(e.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      // Auto login after register
      const loginRes = await api.post('/api/auth/login', { username: form.username, password: form.password });
      login(loginRes.token, loginRes.user);
      window.location.href = '/dashboard';
    } catch (e: any) {
      setError(e.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  // If logged in, redirect to dashboard
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600 mb-4">欢迎回来，{user.displayName || user.username}！</p>
          <Link href="/dashboard" className="text-teal-600 hover:underline">
            前往控制台 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <div className="text-5xl sm:text-6xl mb-4">🧬</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Biochem-niche
          </h1>
          <p className="text-lg sm:text-xl text-teal-600 mb-2 font-medium">
            AP Biology 智能学习平台
          </p>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            专为 AP 生物学考试设计的学习管理系统，涵盖 8 个单元的知识点、自测题库、
            生物词汇表和专业方向探索。支持学生、教师和管理员三种角色。
          </p>

          {/* Auth Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => { setShowLogin(true); setShowRegister(false); setError(''); }}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              登录
            </button>
            <button
              onClick={() => { setShowRegister(true); setShowLogin(false); setError(''); }}
              className="px-6 py-2.5 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition font-medium"
            >
              注册
            </button>
          </div>       
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">登录</h2>
              <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入密码"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 font-medium"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">注册</h2>
              <button onClick={() => setShowRegister(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            {error && <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入邮箱"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="请输入密码"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">角色</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="student">学生</option>
                  <option value="teacher">教师</option>
                </select>
                <p className="text-xs text-slate-400 mt-1">教师账号需要管理员审核</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 font-medium"
              >
                {loading ? '注册中...' : '注册'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">平台功能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: '📚', title: '知识点学习', desc: '8 个单元共 53 个核心知识点，中英双语讲解' },
            { emoji: '📝', title: '小测平台', desc: '40 道精选题目，支持按单元筛选和限时模式' },
            { emoji: '📖', title: '生物词典', titleEn: '', desc: '202+ 专业词汇，音标、释义、例句齐全' },
            { emoji: '🎓', title: '专业探索', desc: '本科及研究生生物相关专业介绍与课程规划' },
            { emoji: '👨‍🏫', title: '教师控制台', desc: '班级概览、学生名单、薄弱知识点统计' },
            { emoji: '⚙️', title: '管理后台', desc: '用户审核、系统数据统计与角色管理' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Units Overview */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">AP Biology 单元一览</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {units.map((unit) => (
            <div
              className="bg-white rounded-lg border border-slate-200 p-3 text-center"
            >
              <div className="text-xs font-medium text-teal-600 mb-1">{unit.title}</div>
              <div className="text-sm font-semibold text-slate-800 mb-0.5">{unit.nameZh}</div>
              <div className="text-[10px] text-slate-400">{unit.nameEn}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        <p>Biochem-niche v2.1 — AP Biology Learning Platform</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
