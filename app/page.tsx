'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { api } from '@/lib/api';

// ── Slide data (bilingual) ───────────────────────────────────────────
const slides = [
  {
    zh: (
      <>
        <strong className="text-teal-600">niche</strong> 的发音是 <strong className="text-teal-600">/nɪtʃ/</strong>，翻译做 <strong className="text-teal-600">生态龛</strong>
      </>
    ),
    en: (
      <>
        The word <strong className="text-teal-600">"niche"</strong> is pronounced <strong className="text-teal-600">/nɪtʃ/</strong>, meaning <strong className="text-teal-600">ecological niche</strong>
      </>
    ),
  },
  {
    zh: (
      <>
        初学者可能会发出 <strong className="text-teal-600">/nɪk/</strong>，或用中文读作 <strong className="text-teal-600">生态"lóng"</strong>（真实事件）
      </>
    ),
    en: (
      <>
        Beginners may say <strong className="text-teal-600">/nɪk/</strong>, or read it as <strong className="text-teal-600">"shēngtài lóng"</strong> in Chinese (true story)
      </>
    ),
  },
  {
    zh: (
      <>
        这样的事情难免会发生，而我们的网站也因此得名：<strong className="text-teal-600">Biochem-niche</strong>
      </>
    ),
    en: (
      <>
        Such things happen, and that's how our site got its name: <strong className="text-teal-600">Biochem-niche</strong>
      </>
    ),
  },
  {
    zh: (
      <>
        我们致力于让学生们<strong className="text-teal-600">更牢固</strong>地掌握生物知识点，并且更加<strong className="text-teal-600">热爱</strong>生物
      </>
    ),
    en: (
      <>
        We are dedicated to helping students master biology <strong className="text-teal-600">more firmly</strong> and <strong className="text-teal-600">love</strong> it even more
      </>
    ),
  },
];

// ── Main component ───────────────────────────────────────────────────
function HomeContent() {
  const { user, login } = useAuth();
  const searchParams = useSearchParams();

  // ── Login & Register modal state ──
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Carousel state ──
  const [currentSlide, setCurrentSlide] = useState(0);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  // Auto-open modal from URL
  useEffect(() => {
    if (searchParams.get('login')) setShowLogin(true);
    if (searchParams.get('register')) setShowRegister(true);
  }, [searchParams]);

  // ── Login handler ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.post('/api/auth/login', {
        username: loginForm.username,
        password: loginForm.password,
      });
      login(data.token, data.user);
      window.location.href = '/dashboard';
    } catch (e: any) {
      setError(e.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  // ── Register handler ──
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/auth/register', {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        role: registerForm.role,
      });
      // Auto login after register
      const loginRes = await api.post('/api/auth/login', {
        username: registerForm.username,
        password: registerForm.password,
      });
      login(loginRes.token, loginRes.user);
      window.location.href = '/dashboard';
    } catch (e: any) {
      setError(e.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  // ── Modal helpers ──
  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setError('');
  };
  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setError('');
  };
  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setError('');
  };

  // ── Carousel: wheel ──
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 500) return;
      if (Math.abs(e.deltaY) < 30) return;

      lastWheelTime.current = now;
      if (e.deltaY > 0 && currentSlide < slides.length - 1) {
        setCurrentSlide((s) => s + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setCurrentSlide((s) => s - 1);
      }
    },
    [currentSlide]
  );

  // ── Carousel: touch ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current;
    if (Math.abs(diff) < 50) return;
    if (diff > 0 && currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else if (diff < 0 && currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  };

  // ── Keyboard navigation ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showLogin || showRegister) return;
      if (e.key === 'ArrowDown' && currentSlide < slides.length - 1) {
        setCurrentSlide((s) => s + 1);
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        setCurrentSlide((s) => s - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentSlide, showLogin, showRegister]);

  // ═══════════════════════════════════════════════════════════════════
  // ── If logged in, show welcome (问题一修复) ──
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg text-slate-600 mb-4">
            欢迎回来，{user.displayName || user.username}！
          </p>
          <Link
            href="/dashboard"
            className="text-teal-600 hover:underline"
          >
            前往控制台 →
          </Link>
        </div>
      </div>
    );
  }

  // ── Not logged in: landing page ──
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* ═══════ Top Navigation ═══════ */}
      <nav className="shrink-0 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg tracking-tight">
            <span className="text-lg sm:text-xl">🧬</span>
            <span>Biochem-niche</span>
          </div>
          {/* Auth buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openLogin}
              className="px-4 py-1.5 text-sm sm:text-base bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              登录
            </button>
            <button
              onClick={openRegister}
              className="px-4 py-1.5 text-sm sm:text-base border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition font-medium"
            >
              注册
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════ Slide Area ═══════ */}
      <div
        className="flex-1 relative overflow-hidden"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides container */}
        <div
          className="h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-full flex flex-col items-center justify-center px-6 sm:px-12 text-center"
            >
              {/* Chinese text */}
              <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-800 leading-relaxed sm:leading-relaxed md:leading-relaxed max-w-4xl mb-4 sm:mb-6">
                {slide.zh}
              </p>
              {/* English text */}
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-500 leading-relaxed sm:leading-relaxed md:leading-relaxed max-w-4xl">
                {slide.en}
              </p>
              {/* Login button on slide 4 */}
              {index === 3 && (
                <button
                  onClick={openLogin}
                  className="mt-8 sm:mt-12 px-8 py-3 bg-teal-600 text-white text-base sm:text-lg rounded-lg hover:bg-teal-700 transition font-medium shadow-lg"
                >
                  登录
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-teal-600 scale-125'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`第 ${index + 1} 页`}
            />
          ))}
        </div>
      </div>

      {/* ═══════ Footer ═══════ */}
      <footer className="shrink-0 bg-white border-t border-slate-200 py-3 sm:py-4">
        <div className="text-center text-slate-400 text-xs sm:text-sm space-y-1">
          <p>
            <span className="mr-1">📧</span>
            <a
              href="mailto:18518763993@163.com"
              className="hover:text-teal-600 transition"
            >
              18518763993@163.com
            </a>
          </p>
          <p>Biochem-niche v2.0 — AP Biology Learning Platform</p>
          <p>目前仅用于北京师范大学附属中学AP国际部使用</p>
        </div>
      </footer>

      {/* ═══════ Login Modal ═══════ */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-slate-900">登录</h2>
              <button
                onClick={closeModals}
                className="text-slate-400 hover:text-slate-600 transition text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-4 bg-red-50 p-2.5 rounded-lg">
                {error}
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  用户名
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  密码
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="请输入密码"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </form>

            {/* Switch to register */}
            <p className="mt-4 text-center text-sm text-slate-500">
              还没有账号？
              <button
                onClick={openRegister}
                className="text-teal-600 hover:text-teal-700 ml-1 transition"
              >
                立即注册
              </button>
            </p>
          </div>
        </div>
      )}

      {/* ═══════ Register Modal ═══════ */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-slate-900">注册</h2>
              <button
                onClick={closeModals}
                className="text-slate-400 hover:text-slate-600 transition text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-4 bg-red-50 p-2.5 rounded-lg">
                {error}
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  用户名
                </label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      username: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  邮箱
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="请输入邮箱"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  密码
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="请输入密码"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  角色
                </label>
                <select
                  value={registerForm.role}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      role: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                  <option value="student">学生</option>
                  <option value="teacher">教师</option>
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  教师账号需要管理员审核
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
              >
                {loading ? '注册中...' : '注册'}
              </button>
            </form>

            {/* Switch to login */}
            <p className="mt-4 text-center text-sm text-slate-500">
              已有账号？
              <button
                onClick={openLogin}
                className="text-teal-600 hover:text-teal-700 ml-1 transition"
              >
                立即登录
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Export with Suspense ─────────────────────────────────────────────
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-500">
          加载中...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
