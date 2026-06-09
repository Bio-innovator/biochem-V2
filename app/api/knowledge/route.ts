export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/knowledge?unit=unit1 - 查询知识点，支持按 unit 筛选
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const unit = searchParams.get('unit') || 'all';
    const search = searchParams.get('search') || '';

    const where: any = {};

    if (unit !== 'all') {
      where.unit = unit;
    }

    if (search) {
      where.OR = [
        { titleEn: { contains: search, mode: 'insensitive' } },
        { titleZh: { contains: search, mode: 'insensitive' } },
        { summaryEn: { contains: search, mode: 'insensitive' } },
        { summaryZh: { contains: search, mode: 'insensitive' } },
      ];
    }

    const topics = await prisma.knowledgeTopic.findMany({
      where,
      orderBy: { unit: 'asc' },
    });

    return NextResponse.json(topics);
  } catch (error) {
    console.error('Knowledge API error:', error);
    return NextResponse.json({ error: 'Failed to fetch knowledge topics' }, { status: 500 });
  }
}
