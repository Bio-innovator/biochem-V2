import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const payload = await verifyAuth(req as unknown as import('next/server').NextRequest);
    const { unit, answers, score, total } = await req.json();

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const quizResult = await tx.quizResult.create({
        data: {
          userId: payload.userId,
          unit: unit || 'mixed',
          score,
          totalQuestions,
        },
      });

      await tx.quizAnswer.createMany({
        data: answers.map((a: { quizId: string; selected: number; correct: boolean }) => ({
          quizResultId: quizResult.id,
          quizId: a.quizId,
          selected: a.selected,
          correct: a.correct,
        })),
      });

      for (const a of answers) {
        if (!a.correct) {
          const quiz = await tx.quiz.findUnique({
            where: { id: a.quizId },
            select: { question: true, explanationZh: true, unit: true, answer: true },
          });

          if (quiz) {
            const existing = await tx.errorBook.findFirst({
              where: {
                userId: payload.userId,
                quizId: a.quizId,
              },
            });

            if (!existing) {
              await tx.errorBook.create({
                data: {
                  userId: payload.userId,
                  quizId: a.quizId,
                  question: quiz.question,
                  userAnswer: a.selected,
                  correctAnswer: quiz.answer,
                  explanation: quiz.explanationZh,
                  unit: quiz.unit,
                },
              });
            }
          }
        }
      }

      return quizResult;
    });

    return NextResponse.json({
      message: '提交成功',
      resultId: result.id,
      score,
      total,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '提交失败';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
