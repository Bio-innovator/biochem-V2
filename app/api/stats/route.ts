export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/stats —— 平台内容实时统计（仅返回数量，不含任何用户数据，无需登录）
// 面板页的「知识点 / 题目 / 词汇 / 模考」卡片数据来自这里，随数据库实时变化
export async function GET() {
  try {
    const [topics, quizzes, terms, exams] = await Promise.all([
      prisma.knowledgeTopic.count(),
      prisma.quiz.count(),
      prisma.glossary.count(),
      prisma.exam.count(),
    ]);

    return NextResponse.json(
      { topics, quizzes, terms, exams },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
