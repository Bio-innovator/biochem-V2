'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface GlossaryTerm {
  id: string;
  word: string;
  phonetic: string | null;
  meaning: string;
  unit: string;
  example: string | null;
}

const units = [
  { id: 'all', label: '全部' },
  { id: 'unit1', label: 'Unit 1' },
  { id: 'unit2', label: 'Unit 2' },
  { id: 'unit3', label: 'Unit 3' },
  { id: 'unit4', label: 'Unit 4' },
  { id: 'unit5', label: 'Unit 5' },
  { id: 'unit6', label: 'Unit 6' },
  { id: 'unit7', label: 'Unit 7' },
  { id: 'unit8', label: 'Unit 8' },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [filtered, setFiltered] = useState<GlossaryTerm[]>([]);
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    filterTerms();
  }, [terms, selectedUnit, selectedLetter, searchQuery]);

  async function fetchTerms() {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (selectedUnit !== 'all') params.unit = selectedUnit;
      const data = await api.get('/api/glossary', params);
      setTerms(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function filterTerms() {
    let result = terms;

    if (selectedUnit !== 'all') {
      result = result.filter((t) => t.unit === selectedUnit);
    }

    if (selectedLetter) {
      result = result.filter((t) =>
        t.word.toUpperCase().startsWith(selectedLetter)
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.word.toLowerCase().includes(q) ||
          t.meaning.includes(searchQuery)
      );
    }

    setFiltered(result);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">📖 生物词典</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 space-y-4">
          {/* Unit Select */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">单元筛选</label>
            <div className="flex flex-wrap gap-1.5">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnit(u.id)}
                  className={`px-2.5 py-1 rounded-md text-xs transition ${
                    selectedUnit === u.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* A-Z Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">字母索引</label>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedLetter('')}
                className={`w-7 h-7 rounded text-xs transition ${
                  selectedLetter === ''
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                全
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter === selectedLetter ? '' : letter)}
                  className={`w-7 h-7 rounded text-xs transition ${
                    selectedLetter === letter
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索词汇（中英文均可）..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-3">共 {filtered.length} 个词汇</p>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((term) => (
            <div
              key={term.id}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="font-semibold text-slate-900">{term.word}</h3>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded uppercase">
                  {term.unit}
                </span>
              </div>
              {term.phonetic && (
                <p className="text-xs text-slate-400 mb-1.5">/{term.phonetic}/</p>
              )}
              <p className="text-sm text-teal-700 font-medium mb-1">{term.meaning}</p>
              {term.example && (
                <p className="text-xs text-slate-500 leading-relaxed">{term.example}</p>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>没有找到匹配的词汇</p>
            <button
              onClick={() => { setSelectedUnit('all'); setSelectedLetter(''); setSearchQuery(''); }}
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
