import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        questions: {
          select: {
            id: true,
            questionNumber: true,
            question: true,
            options: true,
            imageUrl: true,
            type: true,
          },
          orderBy: { questionNumber: 'asc' },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: '真题不存在' }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch {
    return NextResponse.json({ error: '获取真题题目失败' }, { status: 500 });
  }
}
