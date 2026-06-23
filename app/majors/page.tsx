'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Major {
  id: string;
  nameEn: string;
  nameZh: string;
  level: string;
  description: string | null;
  careers: string | null;
  skills: string | null;
}

export default function MajorsPage() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'undergraduate' | 'graduate'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  useEffect(() => {
    fetchMajors();
  }, []);

  async function fetchMajors() {
    try {
      setLoading(true);
      const data = await api.get('/api/majors');
      setMajors(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = selectedLevel === 'all'
    ? majors
    : majors.filter((m) => m.level === selectedLevel);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">🎓 专业探索</h1>

        {/* Level Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 mb-6">
          <div className="flex gap-2">
            {[
              { id: 'all', label: '全部' },
              { id: 'undergraduate', label: '本科' },
              { id: 'graduate', label: '研究生' },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLevel(l.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedLevel === l.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((major) => (
            <div
              key={major.id}
              onClick={() => setSelectedMajor(major)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{major.nameZh}</h3>
                  <p className="text-sm text-slate-500">{major.nameEn}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                  major.level === 'undergraduate'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-purple-50 text-purple-600'
                }`}>
                  {major.level === 'undergraduate' ? '本科' : '研究生'}
                </span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{major.description || '暂无介绍'}</p>
              
              {major.careers && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {major.careers.split(/[,，]/).slice(0, 3).map((c, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded">
                      {c.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">暂无数据</div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMajor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedMajor.nameZh}</h2>
                <p className="text-sm text-slate-500">{selectedMajor.nameEn}</p>
              </div>
              <button
                onClick={() => setSelectedMajor(null)}
                className="text-slate-400 hover:text-slate-600 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-teal-600 mb-1">专业介绍</h4>
                <p className="text-sm text-slate-700">{selectedMajor.description || '暂无介绍'}</p>
              </div>

              {selectedMajor.skills && (
                <div>
                  <h4 className="text-xs font-medium text-teal-600 mb-1">核心技能</h4>
                  <p className="text-sm text-slate-700">{selectedMajor.skills}</p>
                </div>
              )}

              {selectedMajor.careers && (
                <div>
                  <h4 className="text-xs font-medium text-teal-600 mb-1">就业方向</h4>
                  <p className="text-sm text-slate-700">{selectedMajor.careers}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
