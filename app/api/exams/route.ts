import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        questions: {
          orderBy: { questionNumber: 'asc' },
        },
      },
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(exams);
  } catch (err: any) {
    console.error('Exams API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
