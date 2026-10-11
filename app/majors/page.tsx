'use client';

import { useState } from 'react';
import { MAJORS, type Major } from '@/data/majors';
import { useLang } from '@/components/LanguageContext';

// 专业数据为代码内置静态库（data/majors.ts），不再请求数据库
export default function MajorsPage() {
  const { lang } = useLang();
  const zh = lang === 'zh';
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'undergraduate' | 'graduate'>('all');
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  const filtered =
    selectedLevel === 'all' ? MAJORS : MAJORS.filter((m) => m.level === selectedLevel);

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">🎓 {zh ? '专业探索' : 'Major Exploration'}</h1>
        <p className="text-sm text-slate-400 mb-6">
          {zh ? '了解生物相关专业学什么、能做什么' : 'What bio-related majors study — and where they lead'}
        </p>

        {/* Level Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 mb-6">
          <div className="flex gap-2">
            {[
              { id: 'all', labelZh: '全部', labelEn: 'All' },
              { id: 'undergraduate', labelZh: '本科', labelEn: 'Undergraduate' },
              { id: 'graduate', labelZh: '研究生', labelEn: 'Graduate' },
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
                {zh ? l.labelZh : l.labelEn}
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
                  <h3 className="font-semibold text-slate-900">{zh ? major.nameZh : major.nameEn}</h3>
                  <p className="text-sm text-slate-500">{zh ? major.nameEn : major.nameZh}</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium shrink-0 ${
                    major.level === 'undergraduate'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {major.level === 'undergraduate' ? (zh ? '本科' : 'UG') : (zh ? '研究生' : 'Grad')}
                </span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{zh ? major.descriptionZh : major.descriptionEn}</p>

              <div className="mt-3 flex flex-wrap gap-1">
                {(zh ? major.careersZh : major.careersEn)
                  .split(/[,，]/)
                  .slice(0, 3)
                  .map((c, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded">
                      {c.trim()}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">{zh ? '暂无数据' : 'No data'}</div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMajor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{zh ? selectedMajor.nameZh : selectedMajor.nameEn}</h2>
                <p className="text-sm text-slate-500">{zh ? selectedMajor.nameEn : selectedMajor.nameZh}</p>
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
                <h4 className="text-xs font-medium text-teal-600 mb-1">{zh ? '专业介绍' : 'Overview'}</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {zh ? selectedMajor.descriptionZh : selectedMajor.descriptionEn}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-teal-600 mb-1">{zh ? '核心技能' : 'Core Skills'}</h4>
                <p className="text-sm text-slate-700">{zh ? selectedMajor.skillsZh : selectedMajor.skillsEn}</p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-teal-600 mb-1">{zh ? '就业方向' : 'Careers'}</h4>
                <p className="text-sm text-slate-700">{zh ? selectedMajor.careersZh : selectedMajor.careersEn}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
