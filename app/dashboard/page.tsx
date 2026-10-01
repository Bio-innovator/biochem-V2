'use client';

import Link from 'next/link';
import { useAuth, useRole } from '@/components/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MAJORS, UNDERGRAD_MAJORS } from '@/data/majors';
import { getQuizRecords, type QuizRecord } from '@/lib/quizRecords';
import LifeCalendar, { LifeCalendarPopup } from '@/components/LifeCalendar';

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

const units = [
  { id: 'unit1', zh: '生命的化学', en: 'Chemistry of Life' },
  { id: 'unit2', zh: '细胞结构', en: 'Cell Structure' },
  { id: 'unit3', zh: '细胞能量学', en: 'Cellular Energetics' },
  { id: 'unit4', zh: '细胞通讯', en: 'Cell Communication' },
  { id: 'unit5', zh: '遗传学', en: 'Heredity' },
  { id: 'unit6', zh: '基因表达', en: 'Gene Expression' },
  { id: 'unit7', zh: '自然选择', en: 'Natural Selection' },
  { id: 'unit8', zh: '生态学', en: 'Ecology' },
];

interface PanelLink {
  href: string;
  emoji: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  color: string;
}

const studentLinks: PanelLink[] = [
  {
    href: '/knowledge',
    emoji: '📚',
    title: '知识点学习',
    titleEn: 'Knowledge',
    desc: '8 个单元，53 个知识点',
    descEn: '53 topics across 8 units',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    href: '/quiz',
    emoji: '📝',
    title: '小测平台',
    titleEn: 'Quiz',
    desc: '200+ 道题，支持限时模式',
    descEn: '200+ questions, timed mode',
    color: 'bg-green-50 border-green-200',
  },
  {
    href: '/exams',
    emoji: '📋',
    title: 'AP 真题模考',
    titleEn: 'AP Exams',
    desc: '历年真题，90 分钟限时',
    descEn: 'Past papers, 90-minute timer',
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    href: '/glossary',
    emoji: '📖',
    title: '生物词典',
    titleEn: 'Glossary',
    desc: '200+ 专业词汇',
    descEn: '200+ biology terms',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    href: '/majors',
    emoji: '🎓',
    title: '专业探索',
    titleEn: 'Majors',
    desc: '生物相关专业介绍',
    descEn: 'Biology-related major guides',
    color: 'bg-amber-50 border-amber-200',
  },
];

const teacherLinks: PanelLink[] = [
  {
    href: '/classroom',
    emoji: '👨‍🏫',
    title: '班级管理',
    titleEn: 'Classroom',
    desc: '学生名单与薄弱知识点',
    descEn: 'Roster & weak spots',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    href: '/knowledge',
    emoji: '📚',
    title: '知识点浏览',
    titleEn: 'Knowledge',
    desc: '查看所有知识点',
    descEn: 'Browse all topics',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    href: '/quiz',
    emoji: '📝',
    title: '小测题目',
    titleEn: 'Quiz',
    desc: '查看题目与解析',
    descEn: 'Questions & explanations',
    color: 'bg-green-50 border-green-200',
  },
];

const adminLinks: PanelLink[] = [
  {
    href: '/admin',
    emoji: '⚙️',
    title: '系统管理',
    titleEn: 'Admin',
    desc: '用户审核与数据统计',
    descEn: 'User review & stats',
    color: 'bg-red-50 border-red-200',
  },
  {
    href: '/classroom',
    emoji: '📊',
    title: '班级概览',
    titleEn: 'Classroom',
    desc: '查看所有班级数据',
    descEn: 'All class data',
    color: 'bg-orange-50 border-orange-200',
  },
];

/** 正确率趋势图（手绘 SVG，无第三方依赖） */
function AccuracyTrend({ records }: { records: QuizRecord[] }) {
  const data = records.slice(-20); // 最近 20 次
  const W = 640;
  const H = 180;
  const PX = 34;
  const PY = 18;

  const x = (i: number) =>
    data.length === 1 ? W / 2 : PX + (i * (W - PX * 2)) / (data.length - 1);
  const y = (v: number) => H - PY - (v / 100) * (H - PY * 2);

  const points = data.map((r, i) => `${x(i)},${y(r.accuracy)}`).join(' ');
  const area = `${PX},${y(0)} ${points} ${x(data.length - 1)},${y(0)}`;

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
      <h2 className="font-semibold text-slate-900 mb-0.5">正确率趋势</h2>
      <p className="text-xs text-slate-400 mb-3">Accuracy Trend</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Accuracy trend">
        {/* 横向网格线 */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line
              x1={PX}
              x2={W - 8}
              y1={y(v)}
              y2={y(v)}
              stroke={v === 0 ? '#cbd5e1' : '#e2e8f0'}
              strokeWidth="1"
              strokeDasharray={v === 0 ? undefined : '3 4'}
            />
            <text x={6} y={y(v) + 3.5} fontSize="9" fill="#94a3b8">
              {v}
            </text>
          </g>
        ))}
        {/* 面积填充 */}
        {data.length > 1 && <polygon points={area} fill="#0d9488" opacity="0.07" />}
        {/* 折线 */}
        {data.length > 1 && (
          <polyline
            points={points}
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {/* 数据点（悬停显示详情） */}
        {data.map((r, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(r.accuracy)}
            r="4"
            fill="white"
            stroke="#0d9488"
            strokeWidth="2"
          >
            <title>{`${fmt(r.date)} · ${r.correct}/${r.total} · ${r.accuracy}%`}</title>
          </circle>
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{fmt(data[0].date)}</span>
        <span>
          最近 {data.length} 次 · Latest {data.length}
        </span>
        <span>{fmt(data[data.length - 1].date)}</span>
      </div>
    </div>
  );
}

/** 作业模块 —— 纯展示，当前固定为「今日无作业」 */
function HomeworkModule() {
  const now = new Date();
  const weekdaysZh = ['日', '一', '二', '三', '四', '五', '六'];
  const weekdaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateZh = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日 · 星期${weekdaysZh[now.getDay()]}`;
  const dateEn = `${weekdaysEn[now.getDay()]}, ${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-8">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">作业</h2>
          <p className="text-xs text-slate-400 mt-0.5">Homework</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-slate-500">{dateZh}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{dateEn}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 sm:py-12">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M9 5.5H6.5A1.5 1.5 0 0 0 5 7v12a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V7a1.5 1.5 0 0 0-1.5-1.5H15" />
            <path d="M9 5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v1A1.5 1.5 0 0 1 13.5 8h-3A1.5 1.5 0 0 1 9 6.5z" />
            <path d="M8.5 13.5l2.5 2.5 4.5-5" />
          </svg>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">今日无作业</p>
        <p className="text-sm text-slate-400 mt-1">No homework today</p>
        <p className="text-xs text-slate-400 mt-4">
          老师布置作业后会显示在这里 · Assignments from your teacher will appear here
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const role = useRole();
  const router = useRouter();

  // 学生个人学习统计：读取浏览器本地记录（localStorage）
  const [records, setRecords] = useState<QuizRecord[]>([]);

  // 平台内容实时统计（真实数据：/api/stats，教师与管理员视图用）
  const [platform, setPlatform] = useState<{
    topics: number;
    quizzes: number;
    terms: number;
    exams: number;
  } | null>(null);
  const [platformLoading, setPlatformLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/?login=1');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (role === 'student') {
      setRecords(getQuizRecords());
    }
  }, [role]);

  useEffect(() => {
    if (isLoading || !role || role === 'student') {
      if (!isLoading) setPlatformLoading(false);
      return;
    }
    fetch('/api/stats')
      .then(async (res) => {
        if (!res.ok) throw new Error('fetch failed');
        return res.json();
      })
      .then((data) => {
        setPlatform({
          topics: data.topics || 0,
          quizzes: data.quizzes || 0,
          terms: data.terms || 0,
          exams: data.exams || 0,
        });
        setPlatformLoading(false);
      })
      .catch(() => setPlatformLoading(false));
  }, [role, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">
          加载中...
          <span className="block text-xs text-slate-300 mt-1">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  let links = studentLinks;
  let welcomeText = '学生控制台';
  let welcomeTextEn = 'Student Dashboard';
  if (role === 'teacher') {
    links = teacherLinks;
    welcomeText = '教师控制台';
    welcomeTextEn = 'Teacher Dashboard';
  }
  if (role === 'admin') {
    links = adminLinks;
    welcomeText = '管理员控制台';
    welcomeTextEn = 'Admin Dashboard';
  }

  const isStudent = role === 'student';

  // 学生统计（来自浏览器本地记录）
  const totalQuizzes = records.length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(records.reduce((s, r) => s + r.accuracy, 0) / totalQuizzes)
      : 0;
  const totalMistakes = records.reduce((s, r) => s + (r.total - r.correct), 0);

  const platformValue = (n?: number) =>
    platformLoading ? '...' : platform ? String(n ?? 0) : '—';

  const statCards = isStudent
    ? [
        {
          label: '已完成小测',
          labelEn: 'Quizzes Done',
          value: totalQuizzes.toString(),
          unit: '次',
        },
        {
          label: '平均正确率',
          labelEn: 'Avg. Accuracy',
          value: `${avgScore}%`,
          unit: '',
        },
        {
          label: '累计错题',
          labelEn: 'Mistakes',
          value: totalMistakes.toString(),
          unit: '道',
        },
        {
          label: '本科专业方向',
          labelEn: 'Undergrad Majors',
          value: UNDERGRAD_MAJORS.length.toString(),
          unit: '个',
        },
      ]
    : [
        {
          label: '知识点',
          labelEn: 'Topics',
          value: platformValue(platform?.topics),
          unit: '个',
        },
        {
          label: '小测题目',
          labelEn: 'Quiz Questions',
          value: platformValue(platform?.quizzes),
          unit: '道',
        },
        {
          label: '词汇量',
          labelEn: 'Glossary Terms',
          value: platformValue(platform?.terms),
          unit: '个',
        },
        {
          label: '专业方向',
          labelEn: 'Majors',
          value: MAJORS.length.toString(),
          unit: '个',
        },
      ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      {isStudent && <LifeCalendarPopup />}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-0.5">{welcomeText}</h1>
          <p className="text-xs text-slate-400 mb-2">{welcomeTextEn}</p>
          <p className="text-slate-500">
            欢迎回来，{user.displayName || user.username}！
            <span className="block text-xs text-slate-400 mt-0.5">
              Welcome back, {user.displayName || user.username}!
            </span>
          </p>
        </div>

        {/* 学生视图：作业模块（纯展示）；教师/管理员视图：快捷导航 */}
        {isStudent ? (
          <HomeworkModule />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${link.color} border rounded-xl p-5 hover:shadow-md transition`}
              >
                <div className="text-3xl mb-2">{link.emoji}</div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {link.title}
                  <span className="text-xs text-slate-400 font-normal ml-2">{link.titleEn}</span>
                </h3>
                <p className="text-sm text-slate-500">{link.desc}</p>
                <p className="text-xs text-slate-400 mt-0.5">{link.descEn}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-slate-200 p-4 text-center"
            >
              <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
              <div className="text-xs text-slate-500">
                {stat.label}
                {stat.unit}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{stat.labelEn}</div>
            </div>
          ))}
        </div>

        {/* Accuracy Trend —— 仅学生视图 */}
        {isStudent &&
          (records.length > 0 ? (
            <AccuracyTrend records={records} />
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-6 mb-8 text-center">
              <p className="text-sm text-slate-500">
                完成一次小测后，这里会显示你的正确率趋势
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Finish a quiz and your accuracy trend will appear here
              </p>
            </div>
          ))}

        {/* Unit Quick Access */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-0.5">单元快速导航</h2>
          <p className="text-xs text-slate-400 mb-3">Quick Unit Navigation</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {units.map((u) => (
              <Link
                key={u.id}
                href={`/knowledge?unit=${u.id}`}
                className={`px-3 py-2 rounded-lg border text-center transition hover:shadow-sm ${unitColors[u.id]}`}
              >
                <span className="block text-xs font-medium">{u.zh}</span>
                <span className="block text-[10px] opacity-70 mt-0.5">{u.en}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 生命教育日历 —— 仅学生视图，位于页面最下方 */}
        {isStudent && (
          <div className="mt-8">
            <LifeCalendar />
          </div>
        )}
      </div>
    </div>
  );
}
