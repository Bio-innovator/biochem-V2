'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

interface ExamQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: string[];
  answer: number | null;
  explanation: string | null;
  imageUrl: string | null;
  type: string;
  unit: string | null;
}

interface Exam {
  id: string;
  name: string;
  year: number;
  timeLimit: number;
  questionCount: number;
  questions: ExamQuestion[];
}

export default function ExamPage() {
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [hidden, setHidden] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    if (!examId) return;
    api.get(`/api/exams/${examId}`)
      .then((data) => {
        setExam(data);
        setTimeLeft((data.timeLimit || 90) * 60);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [examId]);

  useEffect(() => {
    if (!exam || timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [exam, timeLeft, submitted]);

  const submitExam = useCallback(() => {
    if (!exam) return;
    let correct = 0;
    const mcqList = exam.questions.filter((q) => q.type === 'MCQ');
    mcqList.forEach((q) => {
      // 防护：answer 必须存在且用户作答了，才判分
      if (q.answer !== null && q.answer !== undefined && answers[q.questionNumber] === q.answer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  }, [exam, answers]);

  const toggleMark = (num: number) => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">加载中... Loading...</div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">未找到试卷 Exam not found</div>
      </div>
    );
  }

  const q = exam.questions[currentIdx];
  const mcqList = exam.questions.filter((q) => q.type === 'MCQ');
  const frqList = exam.questions.filter((q) => q.type === 'FRQ');

  // ========== 结果页 ==========
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f2f5]">
        <div className="bg-[#dce3eb] border-b border-gray-300">
          <div className="flex items-center justify-between px-4 h-12">
            <div className="text-sm font-bold text-gray-800">Results</div>
            <div className="text-2xl font-mono font-bold text-gray-900">{formatTime(0)}</div>
            <div className="w-16" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center mb-6">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Completed</h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {mcqList.length > 0 ? Math.round((score / mcqList.length) * 100) : 0}%
                </div>
                <div className="text-xs text-blue-500 mt-1">Accuracy</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{score}/{mcqList.length}</div>
                <div className="text-xs text-green-500 mt-1">Correct</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-600">
                  {formatTime(exam.timeLimit * 60 - timeLeft)}
                </div>
                <div className="text-xs text-amber-500 mt-1">Time Spent</div>
              </div>
            </div>
          </div>

          {frqList.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-amber-800 mb-2">📝 Free Response Questions</h3>
              <p className="text-amber-700 text-sm">
                This exam included {frqList.length} free-response questions. Scoring guidelines are shown below.
              </p>
            </div>
          )}

          <h3 className="text-lg font-bold text-gray-900 mb-4">Answer Review</h3>
          <div className="space-y-4">
            {exam.questions.map((q) => {
              const userAns = answers[q.questionNumber];
              const isCorrect = q.type === 'MCQ' && userAns === q.answer;
              const isWrong = q.type === 'MCQ' && userAns !== undefined && userAns !== q.answer;

              return (
                <div key={q.id} className="bg-white rounded-lg border p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded font-bold ${
                      isCorrect ? 'bg-green-100 text-green-700' : 
                      isWrong ? 'bg-red-100 text-red-700' : 
                      q.type === 'FRQ' ? 'bg-amber-100 text-amber-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {isCorrect ? 'Correct' : isWrong ? 'Incorrect' : q.type === 'FRQ' ? 'FRQ' : 'Unanswered'}
                    </span>
                    <span className="font-bold text-gray-800">Question {q.questionNumber}</span>
                    {marked.has(q.questionNumber) && (
                      <span className="text-xs text-yellow-600">★ Marked</span>
                    )}
                  </div>
                  <p className="text-gray-800 text-sm mb-2">{q.question}</p>
                  
                  {q.type === 'MCQ' && (
                    <div className="text-sm">
                      <span className="text-gray-500">
                        Your answer: {userAns !== undefined ? String.fromCharCode(65 + userAns) : '—'}
                      </span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-green-600 font-medium">
                        Correct: {String.fromCharCode(65 + (q.answer || 0))}
                      </span>
                      {q.explanation && (
                        <p className="text-gray-500 mt-2 text-xs bg-gray-50 p-2 rounded">{q.explanation}</p>
                      )}
                    </div>
                  )}
                  
                  {q.type === 'FRQ' && q.explanation && (
                    <div className="text-sm text-amber-800 bg-amber-50 p-3 rounded mt-2">
                      <span className="font-bold">Scoring Guidelines:</span>
                      <p className="mt-1 text-amber-700">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center pb-8">
            <button
              onClick={() => (window.location.href = '/exams')}
              className="px-6 py-2 bg-[#2d3748] text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
            >
              Back to Exam List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== 考试页（Bluebook 风格） ==========
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#dce3eb] border-b border-gray-300 shrink-0">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold text-gray-800 tracking-wide">Section II</div>
            <button
              onClick={() => setShowDirections(!showDirections)}
              className="text-xs text-gray-600 flex items-center gap-1 hover:underline"
            >
              Directions <span className="text-[10px]">{showDirections ? '▴' : '▾'}</span>
            </button>
          </div>
          <div className="text-2xl font-mono font-bold text-gray-900 tabular-nums">
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setHidden(!hidden)}
            className="text-xs border border-gray-400 rounded px-3 py-1 bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            {hidden ? 'Show' : 'Hide'}
          </button>
        </div>
      </div>

      {/* Directions Dropdown */}
      {showDirections && (
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 text-sm text-blue-900 shrink-0">
          <p className="font-bold mb-1">Section Directions:</p>
          <p className="text-blue-800">
            Answer all questions. For multiple-choice questions, select the best answer. 
            For free-response questions, write your answers on paper.
          </p>
        </div>
      )}

      {/* Banner */}
      <div className="bg-[#1e2a5e] text-white text-center text-[10px] font-bold tracking-[0.25em] py-1.5 shrink-0">
        THIS IS A TEST PREVIEW
      </div>

      {/* Hidden Overlay */}
      {hidden && (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-4xl mb-4">👁</div>
            <p className="text-gray-600 font-medium">Content Hidden</p>
            <p className="text-sm text-gray-400 mt-1">Click &quot;Show&quot; to resume</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!hidden && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {q.questionNumber}
                </div>
                <button
                  onClick={() => toggleMark(q.questionNumber)}
                  className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded border transition ${
                    marked.has(q.questionNumber)
                      ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill={marked.has(q.questionNumber) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Mark for Review
                </button>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                q.type === 'FRQ' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {q.type}
              </span>
            </div>

            {/* Exam day notice */}
            <p className="text-sm text-gray-600 mb-6 italic font-serif">
              On exam day, you&apos;ll answer this question in your free-response booklet.
            </p>

            {/* Question Body */}
            <div className="font-serif text-gray-900">
              {q.question.split('\n').map((line, i) => (
                <p key={i} className="mb-3 leading-relaxed text-[15px]">
                  {line}
                </p>
              ))}
            </div>

            {/* Image */}
            {q.imageUrl && (
              <div className="my-6">
                <img
                  src={q.imageUrl}
                  alt="Figure"
                  className="max-w-full border border-gray-300 rounded"
                />
              </div>
            )}

            {/* MCQ Options */}
            {q.type === 'MCQ' && (
              <div className="space-y-3 mt-8">
                {q.options.map((opt, i) => {
                  const label = String.fromCharCode(65 + i);
                  const cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
                  const isSelected = answers[q.questionNumber] === i;

                  return (
                    <button
                      key={i}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.questionNumber]: i }))}
                      className={`w-full text-left p-4 rounded-lg border-2 transition flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold mt-0.5 ${
                        isSelected ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-500'
                      }`}>
                        {label}
                      </span>
                      <span className="text-gray-800 text-[15px] leading-relaxed pt-0.5">{cleanOpt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* FRQ Notice */}
            {q.type === 'FRQ' && (
              <div className="mt-8 bg-[#fff8e1] border border-[#ffe082] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📝</span>
                  <span className="font-bold text-[#5d4037] text-lg">Free Response</span>
                </div>
                <p className="text-[#5d4037] text-sm leading-relaxed">
                  This is a free-response question. Please write your answer on paper.
                  After submitting the exam, you can view the scoring guidelines and self-grade.
                </p>
                <div className="mt-4 bg-white rounded border border-[#ffe082] p-4">
                  <p className="text-xs text-gray-500 font-bold mb-2">WRITING TIPS:</p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                    <li>Use precise biological terminology</li>
                    <li>Include specific examples and mechanisms</li>
                    <li>Organize your answer with clear structure</li>
                    <li>Answer all parts of the question</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-[#dce3eb] border-t border-gray-300 shrink-0 px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-700 font-medium">Student</div>

        <div className="relative">
          <select
            value={currentIdx}
            onChange={(e) => setCurrentIdx(Number(e.target.value))}
            className="bg-[#2d3748] text-white text-sm px-4 py-2.5 rounded appearance-none pr-8 cursor-pointer font-medium min-w-[180px]"
          >
            {exam.questions.map((q, idx) => (
              <option key={q.id} value={idx}>
                Question {q.questionNumber} of {exam.questions.length}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none text-xs">▾</span>
        </div>

        <div className="flex items-center gap-2">
          {currentIdx > 0 && (
            <button
              onClick={() => setCurrentIdx((c) => c - 1)}
              className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-600 transition"
            >
              Back
            </button>
          )}
          {currentIdx < exam.questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx((c) => c + 1)}
              className="bg-[#2563eb] text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitExam}
              className="bg-green-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-green-700 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
