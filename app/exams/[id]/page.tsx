'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: string;
  questionNumber: number;
  question: string;
  options: string[];
  imageUrl: string | null;
  type: string;
}

interface Exam {
  id: string;
  year: number;
  name: string;
  timeLimit: number;
  questions: Question[];
}

interface AnswerDetail {
  questionId: string;
  questionNumber: number;
  selected: number;
  correct: boolean;
  correctAnswer: number;
  question: string;
  options: string[];
}

export default function ExamPage() {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [examFinished, setExamFinished] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    details: AnswerDetail[];
  } | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const examFinishedRef = useRef(false);

  useEffect(() => {
    examFinishedRef.current = examFinished;
  }, [examFinished]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/?login=1');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!examId) return;
    fetch(`/api/exams/${examId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          router.push('/exams');
          return;
        }
        setExam(data);
        setTimeLeft((data.timeLimit || 90) * 60);
        setLoading(false);
      })
      .catch(() => router.push('/exams'));
  }, [examId, router]);

  useEffect(() => {
    if (examFinished || !exam) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam, examFinished]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!examFinishedRef.current && exam) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [exam]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (examFinished) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = useCallback(
    async (autoSubmit = false) => {
      if (!exam || examFinishedRef.current) return;
      examFinishedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);

      setSubmitting(true);

      const mcqQuestions = exam.questions.filter((q) => q.type === 'MCQ');
      const answersArr = mcqQuestions.map((q) => ({
        questionId: q.id,
        selected: answers[q.id] ?? -1,
      }));

      const timeSpent = (exam.timeLimit || 90) * 60 - timeLeft;

      try {
        const res = await fetch('/api/exams/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            examId: exam.id,
            answers: answersArr,
            timeSpent,
          }),
        });

        if (res.ok) {
          const data = await res.json();

          const details: AnswerDetail[] = mcqQuestions.map((q) => {
            const graded = data.answers?.find((a: { questionId: string }) => a.questionId === q.id);
            return {
              questionId: q.id,
              questionNumber: q.questionNumber,
              selected: answers[q.id] ?? -1,
              correct: graded?.correct ?? false,
              correctAnswer: graded?.correctAnswer ?? -1,
              question: q.question,
              options: q.options,
            };
          });

          setResult({
            score: data.score,
            correctCount: data.correctCount,
            totalQuestions: data.totalQuestions,
            details,
          });
        } else {
          // Fallback: compute locally without correct answers
          const details: AnswerDetail[] = mcqQuestions.map((q) => ({
            questionId: q.id,
            questionNumber: q.questionNumber,
            selected: answers[q.id] ?? -1,
            correct: false,
            correctAnswer: -1,
            question: q.question,
            options: q.options,
          }));
          setResult({ score: 0, correctCount: 0, totalQuestions: mcqQuestions.length, details });
        }
      } catch {
        const details: AnswerDetail[] = mcqQuestions.map((q) => ({
          questionId: q.id,
          questionNumber: q.questionNumber,
          selected: answers[q.id] ?? -1,
          correct: false,
          correctAnswer: -1,
          question: q.question,
          options: q.options,
        }));
        setResult({ score: 0, correctCount: 0, totalQuestions: mcqQuestions.length, details });
      }

      setExamFinished(true);
      setSubmitting(false);
    },
    [exam, answers, timeLeft, token]
  );

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (!user || !exam) return null;

  const mcqQuestions = exam.questions.filter((q) => q.type === 'MCQ');
  const frqQuestions = exam.questions.filter((q) => q.type === 'FRQ');
  const currentQuestion = mcqQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  if (examFinished && result) {
    return (
      <div className="min-h-screen bg-slate-50 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h1 className="text-xl font-bold text-slate-900 mb-4">🎉 模考完成！</h1>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{result.score}%</div>
                <div className="text-xs text-blue-600">正确率</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-700">
                  {result.correctCount}/{result.totalQuestions}
                </div>
                <div className="text-xs text-emerald-600">答对题数</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-700">
                  {formatTime((exam.timeLimit || 90) * 60 - timeLeft)}
                </div>
                <div className="text-xs text-amber-600">用时</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/exams"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                返回列表
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 text-center px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                重新模考
              </button>
            </div>
          </div>

          {frqQuestions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <h2 className="font-semibold text-amber-800 mb-2">✏️ FRQ 自由作答题</h2>
              <p className="text-sm text-amber-700">
                本次考试包含 {frqQuestions.length} 道自由作答题（FRQ），请在纸上作答后对照答案解析自行批改。
              </p>
            </div>
          )}

          <h2 className="text-lg font-semibold text-slate-900 mb-3">答题详情</h2>
          <div className="space-y-3">
            {result.details.map((d) => (
              <div
                key={d.questionId}
                className={`rounded-lg border p-4 ${d.correct ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      d.correct ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {d.correct ? '正确' : '错误'}
                  </span>
                  <span className="text-sm text-slate-500">第 {d.questionNumber} 题</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{d.question}</p>
                <div className="text-xs text-slate-500">
                  你的答案:{' '}
                  {d.selected >= 0
                    ? d.options[d.selected] || `选项 ${String.fromCharCode(65 + d.selected)}`
                    : '未作答'}
                  {d.correctAnswer >= 0 && (
                    <span className="text-emerald-600 ml-2">
                      正确答案: {d.options[d.correctAnswer] || `选项 ${String.fromCharCode(65 + d.correctAnswer)}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-slate-500 hover:text-slate-700 text-sm"
          >
            ← 退出
          </button>
          <h1 className="text-sm font-semibold text-slate-900 truncate max-w-[200px] md:max-w-md">
            {exam.name}
          </h1>
        </div>
        <div
          className={`text-lg font-mono font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-slate-900'}`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* FRQ Reminder */}
      {frqQuestions.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
          <span className="text-sm text-amber-700">
            ⚠️ 提示：本套题包含 {frqQuestions.length} 道自由作答题（FRQ），请在纸上作答。当前为选择题模考模式。
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar - Question Navigation */}
        <div className="w-full md:w-56 bg-white border-r border-slate-200 flex-shrink-0 max-h-[120px] md:max-h-none overflow-y-auto">
          <div className="p-3">
            <div className="text-xs text-slate-500 mb-2">
              已作答 {answeredCount}/{mcqQuestions.length}
            </div>
            <div className="grid grid-cols-10 md:grid-cols-5 gap-1">
              {mcqQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`aspect-square rounded text-xs font-medium transition-colors ${
                    idx === currentIndex
                      ? 'bg-teal-600 text-white'
                      : answers[q.id] !== undefined
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {q.questionNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Question Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {currentQuestion && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    第 {currentQuestion.questionNumber} 题 / 共 {mcqQuestions.length} 题
                  </span>
                </div>

                <p className="text-base text-slate-900 mb-4 leading-relaxed">
                  {currentQuestion.question}
                </p>

                {currentQuestion.imageUrl && (
                  <img
                    src={currentQuestion.imageUrl}
                    alt="题目配图"
                    className="max-w-full rounded-lg border border-slate-200 mb-4"
                  />
                )}

                <div className="space-y-2">
                  {currentQuestion.options.map((option, idx) => {
                    const labels = ['A', 'B', 'C', 'D', 'E'];
                    const isSelected = answers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(currentQuestion.id, idx)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50 text-teal-900'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mr-3 ${
                            isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {labels[idx]}
                        </span>
                        <span className="text-sm">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← 上一题
                </button>
                {currentIndex < mcqQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
                  >
                    下一题 →
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmit()}
                    disabled={submitting}
                    className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? '提交中...' : '提交试卷'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exit Confirm Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">确认退出？</h3>
            <p className="text-sm text-slate-500 mb-4">
              退出后答题进度将不会保存。已完成 {answeredCount}/{mcqQuestions.length} 题。
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                继续答题
              </button>
              <Link
                href="/exams"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
              >
                确认退出
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
