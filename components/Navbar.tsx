'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useRole } from './AuthContext';

const navItems = {
  public: [
    { href: '/', label: '首页', labelEn: 'First-page' },
    { href: '/story', label: '网站故事', labelEn: 'Website-story' },
    { href: '/about', label: '个人介绍', labelEn: 'Personal-intro' },
  ],
  student: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/knowledge', label: '知识点', labelEn: 'Knowledge' },
    { href: '/quiz', label: '小测', labelEn: 'Quiz' },
    { href: '/exams', label: 'AP测验', labelEn: 'AP Exams' },
    { href: '/glossary', label: '词典', labelEn: 'Glossary' },
    { href: '/majors', label: '专业', labelEn: 'Majors' },
  ],
  teacher: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/classroom', label: '班级', labelEn: 'Classroom' },
    { href: '/knowledge', label: '知识点', labelEn: 'Knowledge' },
    { href: '/quiz', label: '小测', labelEn: 'Quiz' },
    { href: '/exams', label: 'AP测验', labelEn: 'AP Exams' },
  ],
  admin: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/admin', label: '管理', labelEn: 'Admin' },
    { href: '/classroom', label: '班级', labelEn: 'Classroom' },
    { href: '/exams', label: 'AP测验', labelEn: 'AP Exams' },
  ],
};

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const role = useRole();
  const pathname = usePathname();

  let items: typeof navItems.public = [];
  if (!user) {
    items = navItems.public;
  } else if (role === 'student') {
    items = navItems.student;
  } else if (role === 'teacher') {
    items = navItems.teacher;
  } else if (role === 'admin') {
    items = navItems.admin;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 三列网格：左右等宽，中间导航组始终处于整行正中 */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 justify-self-start min-w-0">
            <span className="text-xl">🧬</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base hidden sm:inline">
              Biochem-niche
            </span>
          </Link>

          {/* Nav Links —— 中文在上（黑色、较大），英文在下（灰色、较小） */}
          {items.length > 0 ? (
            <div className="justify-self-center flex items-center gap-0.5 sm:gap-2 overflow-x-auto max-w-full">
              {items.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group px-2.5 sm:px-3.5 py-1 rounded-md text-center whitespace-nowrap transition-colors
                      ${active ? 'bg-teal-50' : 'hover:bg-slate-50'}`}
                  >
                    <span
                      className={`block text-[13px] sm:text-sm font-semibold leading-tight transition-colors
                        ${active ? 'text-teal-700' : 'text-slate-900'}`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`block text-[9px] sm:text-[10px] leading-tight tracking-wide mt-0.5 transition-colors
                        ${active ? 'text-teal-600/70' : 'text-slate-400'}`}
                    >
                      {item.labelEn}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div />
          )}

          {/* Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 justify-self-end">
            {isLoading ? (
              <div className="w-16 h-6 bg-slate-100 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-xs">
                    {user.displayName?.[0] || user.username[0]}
                  </div>
                  <span className="text-xs text-slate-600">
                    {user.displayName || user.username}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-500 capitalize">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="group px-2 py-1 rounded-md text-center hover:bg-slate-50 transition-colors"
                >
                  <span className="block text-[13px] sm:text-sm font-semibold leading-tight text-slate-500 group-hover:text-red-600 transition-colors">
                    退出
                  </span>
                  <span className="block text-[9px] sm:text-[10px] leading-tight tracking-wide mt-0.5 text-slate-400">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <Link
                href="/?login=1"
                className="group px-2.5 sm:px-3.5 py-1 rounded-md text-center hover:bg-teal-50 transition-colors"
              >
                <span className="block text-[13px] sm:text-sm font-semibold leading-tight text-teal-700">
                  登录
                </span>
                <span className="block text-[9px] sm:text-[10px] leading-tight tracking-wide mt-0.5 text-teal-600/60">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
