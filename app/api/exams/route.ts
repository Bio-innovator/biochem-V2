import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      select: {
        id: true,
        year: true,
        name: true,
        questionCount: true,
        timeLimit: true,
        pdfUrl: true,
      },
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(exams);
  } catch {
    return NextResponse.json({ error: '获取真题列表失败' }, { status: 500 });
  }
}
