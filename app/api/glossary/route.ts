import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/glossary?unit=unit1&letter=A&search=word - 查询词汇，支持按 unit 和字母筛选
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const unit = searchParams.get('unit') || 'all';
    const letter = searchParams.get('letter') || '';
    const search = searchParams.get('search') || '';

    const where: any = {};

    if (unit !== 'all') {
      where.unit = unit;
    }

    if (letter) {
      where.word = {
        startsWith: letter,
        mode: 'insensitive',
      };
    }

    if (search) {
      where.OR = [
        { word: { contains: search, mode: 'insensitive' } },
        { meaning: { contains: search, mode: 'insensitive' } },
      ];
    }

    const terms = await prisma.glossary.findMany({
      where,
      orderBy: { word: 'asc' },
    });

    return NextResponse.json(terms);
  } catch (error) {
    console.error('Glossary API error:', error);
    return NextResponse.json({ error: 'Failed to fetch glossary terms' }, { status: 500 });
  }
}
