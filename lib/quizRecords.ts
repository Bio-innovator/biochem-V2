// 小测成绩的浏览器本地记录（localStorage）
// 面板页直接读取这里的记录做统计与趋势图，不依赖后台接口

export interface QuizRecord {
  date: string; // ISO 时间戳
  unit: string; // unit1..unit8 或 mixed
  total: number;
  correct: number;
  accuracy: number; // 0-100
}

const KEY = 'quizRecords';
const MAX_RECORDS = 200; // 上限，防止无限增长

export function getQuizRecords(): QuizRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function addQuizRecord(r: { unit: string; total: number; correct: number }): void {
  if (typeof window === 'undefined') return;
  const rec: QuizRecord = {
    date: new Date().toISOString(),
    unit: r.unit,
    total: r.total,
    correct: r.correct,
    accuracy: r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0,
  };
  const list = getQuizRecords();
  list.push(rec);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX_RECORDS)));
  } catch {
    // 存储满或被禁用时静默失败，不影响做题流程
  }
}
