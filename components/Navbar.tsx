'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useRole } from './AuthContext';
import { useLang } from './LanguageContext';

const navItems = {
  public: [
    { href: '/', label: '首页', labelEn: 'Home' },
    { href: '/story', label: '网站故事', labelEn: 'Our Story' },
    { href: '/about', label: '个人介绍', labelEn: 'About Me' },
    { href: '/feedback', label: '建议反馈', labelEn: 'Feedback' },
  ],
  student: [
    { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    { href: '/knowledge', label: '知识点', labelEn: 'Knowledge' },
    { href: '/quiz', label: '小测', labelEn: 'Quiz' },
    { href: '/exams', label: 'AP测验', labelEn: 'AP Exams' },
    { href: '/glossary', label: '词典', labelEn: 'Glossary' },
    { href: '/majors', label: '专业', labelEn: 'Majors' },
    { href: '/feedback', label: '建议反馈', labelEn: 'Feedback' },
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

// 公开页面：登录后访问这些页面时，显示公开导航 + 控制台入口
const PUBLIC_PATHS = ['/', '/story', '/about', '/feedback'];

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const role = useRole();
  const pathname = usePathname();
  const { lang, toggleLang } = useLang();
  const zh = lang === 'zh';

  let items: typeof navItems.public = [];
  if (user && PUBLIC_PATHS.includes(pathname ?? '')) {
    // 登录状态回到公开页：三个首页标题 + 控制台
    items = [
      ...navItems.public,
      { href: '/dashboard', label: '控制台', labelEn: 'Dashboard' },
    ];
  } else if (!user) {
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

          {/* Nav Links —— 按当前语言显示单一文字 */}
          {items.length > 0 ? (
            <div className="justify-self-center flex items-center gap-0.5 sm:gap-2 overflow-x-auto max-w-full">
              {items.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 sm:px-3.5 py-1.5 rounded-md text-center whitespace-nowrap transition-colors
                      ${active ? 'bg-teal-50' : 'hover:bg-slate-50'}`}
                  >
                    <span
                      className={`block text-[13px] sm:text-sm font-semibold leading-tight transition-colors
                        ${active ? 'text-teal-700' : 'text-slate-900'}`}
                    >
                      {zh ? item.label : item.labelEn}
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
            {/* 语言切换 */}
            <button
              onClick={toggleLang}
              title={zh ? 'Switch to English' : '切换到中文'}
              className="px-2 py-1 rounded-md border border-slate-200 text-xs font-semibold text-slate-600 hover:border-teal-500 hover:text-teal-700 transition-colors"
            >
              {zh ? 'EN' : '中'}
            </button>
            {isLoading ? (
              <div className="w-16 h-6 bg-slate-100 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/dashboard"
                  title={zh ? '回到控制台' : 'Back to Dashboard'}
                  className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md hover:bg-teal-50 transition-colors max-w-[11rem]"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-xs shrink-0">
                    {user.displayName?.[0] || user.username[0]}
                  </div>
                  <span className="text-xs text-slate-600 whitespace-nowrap truncate min-w-0">
                    {user.displayName || user.username}
                  </span>
                  {/* 角色徽章仅宽屏显示，避免英文模式下挤压换行 */}
                  <span className="hidden lg:inline-block whitespace-nowrap text-[10px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-500 capitalize shrink-0">
                    {user.role}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="px-2 py-1.5 rounded-md text-center hover:bg-slate-50 transition-colors"
                >
                  <span className="block text-[13px] sm:text-sm font-semibold leading-tight text-slate-500 hover:text-red-600 transition-colors">
                    {zh ? '退出' : 'Logout'}
                  </span>
                </button>
              </div>
            ) : (
              <Link
                href="/?login=1"
                className="px-2.5 sm:px-3.5 py-1.5 rounded-md text-center hover:bg-teal-50 transition-colors"
              >
                <span className="block text-[13px] sm:text-sm font-semibold leading-tight text-teal-700">
                  {zh ? '登录' : 'Login'}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
