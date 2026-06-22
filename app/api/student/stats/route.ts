import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const payload = await verifyAuth(req as unknown as import('next/server').NextRequest);

    const quizResults = await prisma.quizResult.findMany({
      where: { userId: payload.userId },
      select: {
        id: true,
        unit: true,
        score: true,
        totalQuestions: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalQuizzes = quizResults.length;
    const avgScore =
      totalQuizzes > 0
        ? Math.round(
            quizResults.reduce((sum, r) => sum + (r.score / r.totalQuestions) * 100, 0) / totalQuizzes
          )
        : 0;

    const errorBook = await prisma.errorBook.findMany({
      where: { userId: payload.userId },
      select: {
        id: true,
        question: true,
        userAnswer: true,
        correctAnswer: true,
        explanation: true,
        unit: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const unitAccuracy: Record<string, { total: number; correct: number }> = {};
    const allAnswers = await prisma.quizAnswer.findMany({
      where: {
        quizResult: { userId: payload.userId },
      },
      select: {
        isCorrect: true,
        quiz: { select: { unit: true } },
      },
    });

    for (const a of allAnswers) {
      const u = a.quiz?.unit || 'unknown';
      if (!unitAccuracy[u]) unitAccuracy[u] = { total: 0, correct: 0 };
      unitAccuracy[u].total++;
      if (a.isCorrect) unitAccuracy[u].correct++;
    }

    const unitStats = Object.entries(unitAccuracy).map(([unit, data]) => ({
      unit,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      total: data.total,
    }));

    return NextResponse.json({
      totalQuizzes,
      avgScore,
      quizResults,
      errorBook,
      unitStats,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取统计数据失败';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
