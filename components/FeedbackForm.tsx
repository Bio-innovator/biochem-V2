'use client';

import { useState } from 'react';
import { useLang } from '@/components/LanguageContext';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function FeedbackForm({ context }: { context: string }) {
  const { lang } = useLang();
  const zh = lang === 'zh';
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (content.trim().length < 5 || status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim(), context }),
      });
      if (!res.ok) throw new Error('submit failed');
      setStatus('done');
      setContent('');
    } catch {
      setStatus('error');
      setErrorMsg(zh ? '提交失败，请稍后重试' : 'Submission failed — please try again later');
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
        <p className="text-teal-700 font-medium">
          {zh ? '感谢你的建议！我们会认真阅读。' : 'Thank you! Your feedback will shape the next version.'}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-teal-700 hover:underline"
        >
          {zh ? '再写一条' : 'Write another'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        maxLength={2000}
        placeholder={zh ? '你希望下一个版本增加或改进什么？' : 'What should we build or improve next?'}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-y"
        required
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-slate-400">
          {content.length}/2000{zh ? ' · 至少 5 个字符' : ' · min 5 characters'}
        </span>
        <button
          type="submit"
          disabled={status === 'sending' || content.trim().length < 5}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 text-sm font-medium"
        >
          {status === 'sending' ? (zh ? '提交中...' : 'Sending...') : (zh ? '提交建议' : 'Submit')}
        </button>
      </div>
      {status === 'error' && <p className="text-red-500 text-xs mt-2">{errorMsg}</p>}
    </form>
  );
}
