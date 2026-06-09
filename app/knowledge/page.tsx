'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

interface KnowledgeTopic {
  id: string;
  unit: string;
  titleEn: string;
  titleZh: string;
  summaryEn: string;
  summaryZh: string;
  keyPointsEn: string[];
  keyPointsZh: string[];
  source: string | null;
}

const units = [
  { id: 'all', label: '全部' },
  { id: 'unit1', label: 'Unit 1 生命的化学' },
  { id: 'unit2', label: 'Unit 2 细胞结构' },
  { id: 'unit3', label: 'Unit 3 细胞能量学' },
  { id: 'unit4', label: 'Unit 4 细胞通讯' },
  { id: 'unit5', label: 'Unit 5 遗传学' },
  { id: 'unit6', label: 'Unit 6 基因表达' },
  { id: 'unit7', label: 'Unit 7 自然选择' },
  { id: 'unit8', label: 'Unit 8 生态学' },
];

function KnowledgeContent() {
  const searchParams = useSearchParams();
  const [topics, setTopics] = useState<KnowledgeTopic[]>([]);
  const [filtered, setFiltered] = useState<KnowledgeTopic[]>([]);
  const [selectedUnit, setSelectedUnit] = useState(searchParams.get('unit') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    filterTopics();
  }, [topics, selectedUnit, searchQuery]);

  async function fetchTopics() {
    try {
      setLoading(true);
      const data = await api.get('/api/knowledge');
      setTopics(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function filterTopics() {
    let result = topics;
    if (selectedUnit !== 'all') {
      result = result.filter((t) => t.unit === selectedUnit);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.titleEn.toLowerCase().includes(q) ||
          t.titleZh.includes(searchQuery) ||
          t.summaryZh.includes(searchQuery)
      );
    }
    setFiltered(result);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">📚 知识点学习</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          {/* Unit Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {units.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUnit(u.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedUnit === u.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索知识点（中英文均可）..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-3">共 {filtered.length} 个知识点</p>

        {/* Topics List */}
        <div className="space-y-3">
          {filtered.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition"
            >
              <button
                onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
                      {topic.unit}
                    </span>
                    {topic.source && (
                      <span className="text-[10px] text-slate-400">{topic.source}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900">{topic.titleZh}</h3>
                  <p className="text-sm text-slate-500">{topic.titleEn}</p>
                </div>
                <span className="text-slate-400 text-lg shrink-0">
                  {expandedId === topic.id ? '−' : '+'}
                </span>
              </button>

              {expandedId === topic.id && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-teal-600 mb-1">中文概述</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{topic.summaryZh}</p>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-slate-500 mb-1">English Summary</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{topic.summaryEn}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-xs font-medium text-teal-600 mb-1.5">Key Points</h4>
                      <ul className="space-y-1">
                        {topic.keyPointsEn.map((kp, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="text-teal-500 mt-0.5">•</span>
                            {kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-teal-600 mb-1.5">要点</h4>
                      <ul className="space-y-1">
                        {topic.keyPointsZh.map((kp, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="text-teal-500 mt-0.5">•</span>
                            {kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>没有找到匹配的知识点</p>
            <button
              onClick={() => { setSelectedUnit('all'); setSearchQuery(''); }}
              className="text-teal-600 text-sm hover:underline mt-2"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>}>
      <KnowledgeContent />
    </Suspense>
  );
}
