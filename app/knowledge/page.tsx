'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useLang } from '@/components/LanguageContext';
import { TOPIC_CHAINS } from '@/data/topicLinks';
import { TOPIC_VIDEOS } from '@/data/topicVideos';

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
  { id: 'all', labelZh: '全部', labelEn: 'All' },
  { id: 'unit1', labelZh: 'Unit 1 生命的化学', labelEn: 'Unit 1 Chemistry of Life' },
  { id: 'unit2', labelZh: 'Unit 2 细胞结构', labelEn: 'Unit 2 Cell Structure' },
  { id: 'unit3', labelZh: 'Unit 3 细胞能量学', labelEn: 'Unit 3 Cellular Energetics' },
  { id: 'unit4', labelZh: 'Unit 4 细胞通讯', labelEn: 'Unit 4 Cell Communication' },
  { id: 'unit5', labelZh: 'Unit 5 遗传学', labelEn: 'Unit 5 Heredity' },
  { id: 'unit6', labelZh: 'Unit 6 基因表达', labelEn: 'Unit 6 Gene Expression' },
  { id: 'unit7', labelZh: 'Unit 7 自然选择', labelEn: 'Unit 7 Natural Selection' },
  { id: 'unit8', labelZh: 'Unit 8 生态学', labelEn: 'Unit 8 Ecology' },
];

function KnowledgeContent() {
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const zh = lang === 'zh';
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

  const topicsByTitle = new Map(topics.map((t) => [t.titleEn, t]));

  function jumpToTopic(titleEn: string) {
    const target = topicsByTitle.get(titleEn);
    if (!target) return;
    setSelectedUnit(target.unit);
    setSearchQuery('');
    setExpandedId(target.id);
    window.setTimeout(() => {
      document.getElementById(`topic-${target.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">{zh ? '加载中...' : 'Loading...'}</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">📚 {zh ? '知识点学习' : 'Knowledge Base'}</h1>

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
                {zh ? u.labelZh : u.labelEn}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={zh ? '搜索知识点（中英文均可）...' : 'Search topics (English or Chinese)...'}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-3">
          {zh ? `共 ${filtered.length} 个知识点` : `${filtered.length} topics`}
        </p>

        {/* Topics List */}
        <div className="space-y-3">
          {filtered.map((topic) => (
            <div
              key={topic.id}
              id={`topic-${topic.id}`}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition scroll-mt-20"
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
                  <h3 className="font-semibold text-slate-900">{zh ? topic.titleZh : topic.titleEn}</h3>
                  <p className="text-sm text-slate-500">{zh ? topic.titleEn : topic.titleZh}</p>
                </div>
                <span className="text-slate-400 text-lg shrink-0">
                  {expandedId === topic.id ? '−' : '+'}
                </span>
              </button>

              {expandedId === topic.id && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-teal-600 mb-1">{zh ? '概述' : 'Summary'}</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{zh ? topic.summaryZh : topic.summaryEn}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-teal-600 mb-1.5">{zh ? '要点' : 'Key Points'}</h4>
                    <ul className="space-y-1">
                      {(zh ? topic.keyPointsZh : topic.keyPointsEn).map((kp, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-teal-500 mt-0.5">•</span>
                          {kp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 知识关联链 · Knowledge Chains */}
                  {TOPIC_CHAINS[topic.titleEn] && (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        {zh ? '知识关联链（前置 → 本知识点 → 延伸）' : 'Knowledge Chains (prerequisites → this topic → extensions)'}
                      </p>
                      <div className="space-y-2">
                        {TOPIC_CHAINS[topic.titleEn].map((chain, ci) => (
                          <div key={ci} className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                                chain.scope === 'intra'
                                  ? 'bg-teal-50 text-teal-700'
                                  : 'bg-violet-50 text-violet-700'
                              }`}
                            >
                              {chain.scope === 'intra' ? (zh ? '单元内' : 'In-unit') : (zh ? '跨单元' : 'Cross-unit')}
                            </span>
                            {chain.nodes.map((node, ni) => {
                              const target = topicsByTitle.get(node);
                              const isCurrent = node === topic.titleEn;
                              return (
                                <span key={ni} className="flex items-center gap-1.5">
                                  {ni > 0 && <span className="text-slate-300 text-xs">→</span>}
                                  {isCurrent ? (
                                    <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-xs font-medium">
                                      {zh ? topic.titleZh : topic.titleEn}
                                    </span>
                                  ) : target ? (
                                    <button
                                      onClick={() => jumpToTopic(node)}
                                      className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-xs text-slate-700 transition-colors text-left"
                                      title={node}
                                    >
                                      {zh ? target.titleZh : target.titleEn}
                                    </button>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs text-slate-500">
                                      {node}
                                    </span>
                                  )}
                                </span>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 讲解视频 · Recommended Videos */}
                  {TOPIC_VIDEOS[topic.titleEn] && (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        {zh ? '讲解视频' : 'Recommended Videos'}
                      </p>
                      <div className="space-y-2">
                        {TOPIC_VIDEOS[topic.titleEn].map((video, vi) => (
                          <div key={vi} className="bg-slate-50 rounded-lg px-3 py-2">
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                            >
                              ▶ {video.title} · {video.source}
                            </a>
                            <p className="text-[11px] text-slate-600 mt-0.5">{zh ? video.descZh : video.descEn}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>{zh ? '没有找到匹配的知识点' : 'No matching topics found'}</p>
            <button
              onClick={() => { setSelectedUnit('all'); setSearchQuery(''); }}
              className="text-teal-600 text-sm hover:underline mt-2"
            >
              {zh ? '清除筛选条件' : 'Clear filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}>
      <KnowledgeContent />
    </Suspense>
  );
}
