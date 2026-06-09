import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/majors?level=undergraduate - 查询专业方向，支持按 level 筛选
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get('level') || 'all';

    const where: any = {};

    if (level !== 'all') {
      where.level = level;
    }

    const majors = await prisma.major.findMany({
      where,
      orderBy: { level: 'asc' },
    });

    return NextResponse.json(majors);
  } catch (error) {
    console.error('Majors API error:', error);
    return NextResponse.json({ error: 'Failed to fetch majors' }, { status: 500 });
  }
}
