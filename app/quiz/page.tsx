'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Quiz {
  id: string;
  unit: string;
  question: string;
  options: string[];
  answer: number;
  explanationEn: string;
  explanationZh: string;
}

const units = [
  { id: 'all', label: '全部单元' },
  { id: 'unit1', label: 'Unit 1' },
  { id: 'unit2', label: 'Unit 2' },
  { id: 'unit3', label: 'Unit 3' },
  { id: 'unit4', label: 'Unit 4' },
  { id: 'unit5', label: 'Unit 5' },
  { id: 'unit6', label: 'Unit 6' },
  { id: 'unit7', label: 'Unit 7' },
  { id: 'unit8', label: 'Unit 8' },
];

const optionLabels = ['A', 'B', 'C', 'D'];

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [questionCount, setQuestionCount] = useState('10');
  const [timedMode, setTimedMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quiz state
  const [started, setStarted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ qid: string; selected: number; correct: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch quizzes
  async function fetchQuizzes() {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '40' };
      if (selectedUnit !== 'all') params.unit = selectedUnit;
      const data = await api.get('/api/quizzes', params);
      setQuizzes(data);
    } catch (e) {
      console.error('Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, [selectedUnit]);

  // Timer effect
  useEffect(() => {
    if (!started || !timedMode || finished) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, started, timedMode, finished]);

  function startQuiz() {
    const count = Math.min(parseInt(questionCount), quizzes.length);
    const shuffled = [...quizzes].sort(() => Math.random() - 0.5).slice(0, count);
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setFinished(false);
    setStarted(true);
    if (timedMode) setTimeLeft(30);
  }

  function handleSelect(idx: number) {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    const currentQ = currentQuestions[currentIndex];
    const isCorrect = idx === currentQ.answer;
    setAnswers((prev) => [...prev, { qid: currentQ.id, selected: idx, correct: isCorrect }]);
  }

  function handleNext() {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      if (timedMode) setTimeLeft(30);
    } else {
      setFinished(true);
    }
  }

  function resetQuiz() {
    setStarted(false);
    setFinished(false);
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }

  // Config screen
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">📝 小测平台</h1>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
            {/* Unit Select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">选择单元</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">题目数量</label>
              <div className="flex gap-2">
                {['5', '10', '20', '40'].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      questionCount === n
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {n} 题
                  </button>
                ))}
              </div>
            </div>

            {/* Timed Mode */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="timed"
                checked={timedMode}
                onChange={(e) => setTimedMode(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <label htmlFor="timed" className="text-sm text-slate-700">
                限时模式（每题 30 秒）
              </label>
            </div>

            {/* Available count */}
            <p className="text-sm text-slate-500">
              当前筛选可用题目：{quizzes.length} 道
            </p>

            {/* Start Button */}
            <button
              onClick={startQuiz}
              disabled={quizzes.length === 0 || loading}
              className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 font-medium"
            >
              {loading ? '加载中...' : '开始小测'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Result screen
  if (finished) {
    const correct = answers.filter((a) => a.correct).length;
    const total = currentQuestions.length;
    const percentage = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-slate-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">📝 小测结果</h1>

          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center mb-6">
            <div className="text-4xl font-bold text-teal-600 mb-2">
              {correct}/{total}
            </div>
            <div className="text-lg text-slate-700 mb-1">正确率 {percentage}%</div>
            <div className="text-sm text-slate-400">
              {percentage >= 80 ? '🎉 优秀！' : percentage >= 60 ? '👍 不错，继续加油！' : '📚 建议多复习知识点'}
            </div>
          </div>

          {/* Review */}
          <div className="space-y-3 mb-6">
            {currentQuestions.map((q, i) => {
              const ans = answers[i];
              return (
                <div key={q.id} className="bg-white rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-sm font-bold shrink-0 ${ans?.correct ? 'text-green-600' : 'text-red-500'}`}>
                      {ans?.correct ? '✓' : '✗'}
                    </span>
                    <p className="text-sm text-slate-800">{q.question}</p>
                  </div>
                  <p className="text-xs text-slate-500 ml-5">
                    你的答案：{optionLabels[ans?.selected || 0]} | 正确答案：{optionLabels[q.answer]}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 ml-5">{q.explanationZh}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              再来一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const currentQ = currentQuestions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>题目 {currentIndex + 1}/{currentQuestions.length}</span>
            {timedMode && (
              <span className={`font-medium ${timeLeft <= 10 ? 'text-red-500' : 'text-teal-600'}`}>
                ⏱️ {timeLeft}s
              </span>
            )}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
              {currentQ.unit}
            </span>
          </div>
          <h2 className="text-base font-semibold text-slate-900 mb-4">{currentQ.question}</h2>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {currentQ.options.map((opt, i) => {
              let btnClass = 'border-slate-200 hover:bg-slate-50';
              if (showExplanation) {
                if (i === currentQ.answer) btnClass = 'border-green-400 bg-green-50';
                else if (i === selectedAnswer && i !== currentQ.answer) btnClass = 'border-red-400 bg-red-50';
                else btnClass = 'border-slate-200 opacity-60';
              } else if (selectedAnswer === i) {
                btnClass = 'border-teal-400 bg-teal-50';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showExplanation}
                  className={`w-full text-left px-4 py-3 border rounded-lg transition flex items-center gap-3 ${btnClass}`}
                >
                  <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    showExplanation && i === currentQ.answer
                      ? 'bg-green-500 text-white'
                      : showExplanation && i === selectedAnswer && i !== currentQ.answer
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {optionLabels[i]}
                  </span>
                  <span className="text-sm">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <p className="text-xs font-medium text-teal-600 mb-1">解析</p>
              <p className="text-sm text-slate-700">{currentQ.explanationZh}</p>
              <p className="text-xs text-slate-500 mt-1">{currentQ.explanationEn}</p>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              {currentIndex < currentQuestions.length - 1 ? '下一题' : '查看结果'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
