'use client';

import { useEffect } from 'react';
import { useAuth, useRole } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

// Mock data for teacher classroom view
const mockStudents = [
  { name: 'Alice Chen', email: 'alice@example.com', quizzes: 12, avgScore: 78, weakUnit: 'Unit 3 细胞能量学' },
  { name: 'Bob Wang', email: 'bob@example.com', quizzes: 8, avgScore: 65, weakUnit: 'Unit 5 遗传学' },
  { name: 'Carol Li', email: 'carol@example.com', quizzes: 15, avgScore: 92, weakUnit: 'Unit 8 生态学' },
  { name: 'David Zhang', email: 'david@example.com', quizzes: 10, avgScore: 71, weakUnit: 'Unit 6 基因表达' },
  { name: 'Eva Liu', email: 'eva@example.com', quizzes: 6, avgScore: 58, weakUnit: 'Unit 4 细胞通讯' },
];

const weakAreas = [
  { unit: 'Unit 3 细胞能量学', students: 8, topic: '电子传递链与氧化磷酸化' },
  { unit: 'Unit 5 遗传学', students: 6, topic: '连锁基因与交叉互换' },
  { unit: 'Unit 6 基因表达', students: 5, topic: '转录调控机制' },
  { unit: 'Unit 7 自然选择', students: 4, topic: '哈迪-温伯格平衡' },
];

export default function ClassroomPage() {
  const { user, isLoading } = useAuth();
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || (role !== 'teacher' && role !== 'admin'))) {
      router.push('/dashboard');
    }
  }, [user, isLoading, role, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>;
  }

  if (!user || (role !== 'teacher' && role !== 'admin')) return null;

  const avgScore = Math.round(mockStudents.reduce((sum, s) => sum + s.avgScore, 0) / mockStudents.length);
  const totalQuizzes = mockStudents.reduce((sum, s) => sum + s.quizzes, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">👨‍🏫 班级概览</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: '学生人数', value: mockStudents.length },
            { label: '平均正确率', value: `${avgScore}%` },
            { label: '总测验次数', value: totalQuizzes },
            { label: '薄弱单元', value: weakAreas.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-xl font-bold text-teal-600">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Weak Areas */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h2 className="font-semibold text-slate-900 mb-3">⚠️ 薄弱知识点统计</h2>
          <div className="space-y-2">
            {weakAreas.map((area, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-red-500 shrink-0 w-16 text-right">
                  {area.students} 人
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800">{area.unit}</p>
                  <p className="text-xs text-slate-500">{area.topic}</p>
                </div>
                <div className="w-24 bg-slate-200 rounded-full h-2 shrink-0">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{ width: `${Math.min((area.students / mockStudents.length) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">👥 学生名单</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">姓名</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">邮箱</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-4 py-3">测验次数</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-4 py-3">平均正确率</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">薄弱单元</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((s, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-800">{s.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{s.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-center">{s.quizzes}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-medium ${
                        s.avgScore >= 80 ? 'text-green-600' : s.avgScore >= 60 ? 'text-amber-600' : 'text-red-500'
                      }`}>
                        {s.avgScore}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{s.weakUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
