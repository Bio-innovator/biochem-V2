'use client';

import { useAuth } from '@/components/AuthContext';
import { useLang } from '@/components/LanguageContext';
import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackPage() {
  const { user } = useAuth();
  const { lang } = useLang();
  const zh = lang === 'zh';
  const context = user ? `${user.role}:${user.username}` : 'visitor';

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">{zh ? '建议反馈' : 'Feedback'}</h1>
        <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mb-6">
          <p className="text-sm text-teal-800 font-medium">
            {zh ? '你的建议会决定下一个版本做什么。' : 'Your feedback decides what we build next.'}
          </p>
        </div>
        <FeedbackForm context={context} />
      </div>
    </div>
  );
}
