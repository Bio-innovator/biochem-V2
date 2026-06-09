'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useRole } from './AuthContext';

const navItems = {
  public: [
    { href: '/', label: '首页', labelEn: 'Home' },
    { href: '/knowledge', label: '知识点', labelEn: 'Knowledge' },
    { href: '/quiz', label: '小测', labelEn: 'Quiz' },
    { href: '/glossary', label: '词典', labelEn: 'Glossary' },
    { href: '/majors', label: '专业', labelEn: 'Majors' },
  ],
  student: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/knowledge', label: '知识点', labelEn: 'Knowledge' },
    { href: '/quiz', label: '小测', labelEn: 'Quiz' },
    { href: '/glossary', label: '词典', labelEn: 'Glossary' },
    { href: '/majors', label: '专业', labelEn: 'Majors' },
  ],
  teacher: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/classroom', label: '班级', labelEn: 'Classroom' },
    { href: '/knowledge', label: '知识点', labelEn: 'Knowledge' },
    { href: '/quiz', label: '小测', labelEn: 'Quiz' },
  ],
  admin: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/admin', label: '管理', labelEn: 'Admin' },
    { href: '/classroom', label: '班级', labelEn: 'Classroom' },
  ],
};

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const role = useRole();
  const pathname = usePathname();

  // Determine which nav items to show
  let items = navItems.public;
  if (role === 'student') items = navItems.student;
  else if (role === 'teacher') items = navItems.teacher;
  else if (role === 'admin') items = navItems.admin;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🧬</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base hidden sm:inline">Biochem-niche</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === item.href || pathname?.startsWith(item.href + '/')
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="sm:hidden">{item.label}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isLoading ? (
              <div className="w-16 h-6 bg-slate-100 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-xs">
                    {user.displayName?.[0] || user.username[0]}
                  </div>
                  <span className="text-xs text-slate-600">{user.displayName || user.username}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-500 capitalize">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-xs sm:text-sm text-slate-500 hover:text-red-600 transition-colors px-2 py-1"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/?login=1"
                  className="text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium px-2 py-1"
                >
                  登录
                </Link>
                <Link
                  href="/?register=1"
                  className="text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700 px-3 py-1.5 rounded-md transition-colors"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
