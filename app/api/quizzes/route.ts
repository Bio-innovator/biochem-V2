import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const unit = searchParams.get('unit') || 'all';
  const limit = parseInt(searchParams.get('limit') || '10');
  let quizzes = unit === 'all'
    ? await prisma.quiz.findMany()
    : await prisma.quiz.findMany({ where: { unit } });
  quizzes = quizzes.sort(() => Math.random() - 0.5).slice(0, limit);
  return NextResponse.json(quizzes);
}
