'use client';

import Link from 'next/link';
import { useAuth, useRole } from '@/components/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const unitColors: Record<string, string> = {
  unit1: 'bg-rose-50 border-rose-200 text-rose-700',
  unit2: 'bg-amber-50 border-amber-200 text-amber-700',
  unit3: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  unit4: 'bg-sky-50 border-sky-200 text-sky-700',
  unit5: 'bg-violet-50 border-violet-200 text-violet-700',
  unit6: 'bg-pink-50 border-pink-200 text-pink-700',
  unit7: 'bg-teal-50 border-teal-200 text-teal-700',
  unit8: 'bg-cyan-50 border-cyan-200 text-cyan-700',
};

const studentLinks = [
  { href: '/knowledge', emoji: '📚', title: '知识点学习', desc: '8 个单元，53 个知识点', color: 'bg-blue-50 border-blue-200' },
  { href: '/quiz', emoji: '📝', title: '小测平台', desc: '40 道题，支持限时模式', color: 'bg-green-50 border-green-200' },
  { href: '/glossary', emoji: '📖', title: '生物词典', desc: '202+ 专业词汇', color: 'bg-purple-50 border-purple-200' },
  { href: '/majors', emoji: '🎓', title: '专业探索', desc: '生物相关专业介绍', color: 'bg-amber-50 border-amber-200' },
];

const teacherLinks = [
  { href: '/classroom', emoji: '👨‍🏫', title: '班级管理', desc: '学生名单与薄弱知识点', color: 'bg-orange-50 border-orange-200' },
  { href: '/knowledge', emoji: '📚', title: '知识点浏览', desc: '查看所有知识点', color: 'bg-blue-50 border-blue-200' },
  { href: '/quiz', emoji: '📝', title: '小测题目', desc: '查看题目与解析', color: 'bg-green-50 border-green-200' },
];

const adminLinks = [
  { href: '/admin', emoji: '⚙️', title: '系统管理', desc: '用户审核与数据统计', color: 'bg-red-50 border-red-200' },
  { href: '/classroom', emoji: '📊', title: '班级概览', desc: '查看所有班级数据', color: 'bg-orange-50 border-orange-200' },
];

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/?login=1');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (!user) return null;

  let links = studentLinks;
  let welcomeText = '学生控制台';
  if (role === 'teacher') { links = teacherLinks; welcomeText = '教师控制台'; }
  if (role === 'admin') { links = adminLinks; welcomeText = '管理员控制台'; }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{welcomeText}</h1>
          <p className="text-slate-500">欢迎回来，{user.displayName || user.username}！</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.color} border rounded-xl p-5 hover:shadow-md transition`}
            >
              <div className="text-3xl mb-2">{link.emoji}</div>
              <h3 className="font-semibold text-slate-900 mb-1">{link.title}</h3>
              <p className="text-sm text-slate-500">{link.desc}</p>
            </Link>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: '知识点', value: '53', unit: '个' },
            { label: '小测题目', value: '40', unit: '道' },
            { label: '词汇量', value: '202+', unit: '个' },
            { label: '专业方向', value: '10', unit: '个' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}{stat.unit}</div>
            </div>
          ))}
        </div>

        {/* Unit Quick Access */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-3">单元快速导航</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'unit1', label: '生命的化学' },
              { id: 'unit2', label: '细胞结构' },
              { id: 'unit3', label: '细胞能量学' },
              { id: 'unit4', label: '细胞通讯' },
              { id: 'unit5', label: '遗传学' },
              { id: 'unit6', label: '基因表达' },
              { id: 'unit7', label: '自然选择' },
              { id: 'unit8', label: '生态学' },
            ].map((u) => (
              <Link
                key={u.id}
                href={`/knowledge?unit=${u.id}`}
                className={`text-xs px-3 py-2 rounded-lg border text-center transition hover:shadow-sm ${unitColors[u.id]}`}
              >
                {u.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
