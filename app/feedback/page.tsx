'use client';

import { useAuth } from '@/components/AuthContext';
import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackPage() {
  const { user } = useAuth();
  const context = user ? `${user.role}:${user.username}` : 'visitor';

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">建议反馈</h1>
        <p className="text-xs text-slate-400 mb-4">Feedback &amp; Suggestions</p>
        <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mb-6">
          <p className="text-sm text-teal-800 font-medium">
            你的建议会决定下一个版本做什么。
          </p>
          <p className="text-xs text-teal-600/80 mt-0.5">
            Your feedback decides what we build next.
          </p>
        </div>
        <FeedbackForm context={context} />
      </div>
    </div>
  );
}
