'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface Exam {
  id: string;
  name: string;
  year: number;
  timeLimit: number;
  questionCount: number;
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/exams')
      .then((data) => {
        // 防护：确保返回的是数组
        if (Array.isArray(data)) {
          setExams(data);
        } else if (data?.error) {
          setError(data.error);
        } else {
          setError('Invalid data format');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load exams');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">加载中... Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-red-600 font-medium mb-2">加载失败</div>
          <div className="text-sm text-gray-500">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-slate-800 text-white rounded text-sm hover:bg-slate-700"
          >
            重试 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">📋</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AP Biology 真题模考</h1>
          <p className="text-sm text-slate-400">AP Biology Practice Exams</p>
        </div>

        {exams.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500">暂无真题数据 No exam data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exam.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {exam.year} · {exam.questionCount} 题 · {exam.timeLimit} 分钟
                    </p>
                  </div>
                  <Link
                    href={`/exams/${exam.id}`}
                    className="px-4 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 font-medium"
                  >
                    开始模考 Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
