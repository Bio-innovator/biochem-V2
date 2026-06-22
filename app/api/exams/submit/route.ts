import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

interface SubmitAnswer {
  questionId: string;
  selected: number;
}

export async function POST(req: Request) {
  try {
    const payload = await verifyAuth(req as unknown as import('next/server').NextRequest);
    const { examId, answers, timeSpent } = await req.json();

    if (!examId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 });
    }

    const questions = await prisma.examQuestion.findMany({
      where: { examId },
      select: { id: true, answer: true },
    });

    const answerMap = new Map(questions.map((q) => [q.id, q.answer]));

    const gradedAnswers = (answers as SubmitAnswer[]).map((a) => {
      const correctAnswer = answerMap.get(a.questionId) ?? -1;
      return {
        questionId: a.questionId,
        selected: a.selected,
        correct: a.selected === correctAnswer,
        correctAnswer,
      };
    });

    const correctCount = gradedAnswers.filter((a) => a.correct).length;
    const totalQuestions = questions.length;
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const result = await prisma.$transaction(async (tx) => {
      const examResult = await tx.examResult.create({
        data: {
          userId: payload.userId,
          examId,
          score,
          correctCount,
          timeSpent: timeSpent || 0,
        },
      });

      await tx.examAnswer.createMany({
        data: gradedAnswers.map((a) => ({
          examResultId: examResult.id,
          questionId: a.questionId,
          selected: a.selected,
          correct: a.correct,
        })),
      });

      return examResult;
    });

    return NextResponse.json({
      message: '提交成功',
      resultId: result.id,
      score,
      correctCount,
      totalQuestions,
      answers: gradedAnswers,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '提交失败';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
