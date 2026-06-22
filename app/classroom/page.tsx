'use client';

import { useEffect, useState } from 'react';
import { useAuth, useRole } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

interface StudentData {
  id: string;
  name: string;
  email: string;
  quizzes: number;
  avgScore: number;
  weakUnit: string;
}

interface WeakArea {
  unit: string;
  students: number;
}

export default function ClassroomPage() {
  const { user, isLoading, token } = useAuth();
  const role = useRole();
  const router = useRouter();

  const [students, setStudents] = useState<StudentData[]>([]);
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && (!user || (role !== 'teacher' && role !== 'admin'))) {
      router.push('/dashboard');
    }
  }, [user, isLoading, role, router]);

  useEffect(() => {
    if (!token || (role !== 'teacher' && role !== 'admin')) return;
    fetch('/api/classroom', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('获取数据失败');
        return res.json();
      })
      .then((data) => {
        setStudents(data.students || []);
        setWeakAreas(data.weakAreas || []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : '获取数据失败');
        setLoading(false);
      });
  }, [token, role]);

  if (isLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>;
  }

  if (!user || (role !== 'teacher' && role !== 'admin')) return null;

  const avgScore =
    students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + s.avgScore, 0) / students.length)
      : 0;
  const totalQuizzes = students.reduce((sum, s) => sum + s.quizzes, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">👨‍🏫 班级概览</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: '学生人数', value: students.length },
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Student List */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">学生列表</h2>
            {students.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-400">
                暂无学生数据
              </div>
            ) : (
              <div className="space-y-2">
                {students.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-sm font-medium text-teal-700">
                        {s.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500">{s.quizzes} 次测验</span>
                      <span
                        className={`font-medium ${
                          s.avgScore >= 80
                            ? 'text-green-600'
                            : s.avgScore >= 60
                              ? 'text-amber-600'
                              : 'text-red-500'
                        }`}
                      >
                        {s.avgScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weak Areas */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">薄弱知识点</h2>
            {weakAreas.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-400">
                暂无数据
              </div>
            ) : (
              <div className="space-y-2">
                {weakAreas.map((area, idx) => (
                  <div
                    key={area.unit}
                    className="bg-white rounded-lg border border-slate-200 p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-500 w-5">{idx + 1}</span>
                      <span className="text-sm font-medium text-slate-800">{area.unit}</span>
                    </div>
                    <div className="text-xs text-slate-400 ml-7">
                      {area.students} 名学生易错
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
