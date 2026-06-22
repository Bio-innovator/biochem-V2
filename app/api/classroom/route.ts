import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const payload = await verifyAuth(req as unknown as import('next/server').NextRequest);

    if (payload.role !== 'TEACHER' && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: '无权访问' }, { status: 403 });
    }

    const students = await prisma.user.findMany({
      where: { role: 'STUDENT', status: 'APPROVED' },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        createdAt: true,
        quizResults: {
          select: { score: true, total: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        },
        errorBook: {
          select: { unit: true, question: true },
        },
      },
    });

    const studentData = students.map((s) => {
      const totalQuizzes = s.quizResults.length;
      const avgScore =
        totalQuizzes > 0
          ? Math.round(
              s.quizResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / totalQuizzes
            )
          : 0;

      const unitErrorCount: Record<string, number> = {};
      for (const e of s.errorBook) {
        unitErrorCount[e.unit] = (unitErrorCount[e.unit] || 0) + 1;
      }
      const weakUnit =
        Object.entries(unitErrorCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

      return {
        id: s.id,
        name: s.displayName || s.username,
        email: s.email,
        quizzes: totalQuizzes,
        avgScore,
        weakUnit,
      };
    });

    const allErrors = await prisma.errorBook.findMany({
      select: { unit: true },
    });
    const unitCount: Record<string, number> = {};
    for (const e of allErrors) {
      unitCount[e.unit] = (unitCount[e.unit] || 0) + 1;
    }
    const weakAreas = Object.entries(unitCount)
      .map(([unit, students]) => ({ unit, students }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 8);

    return NextResponse.json({
      students: studentData,
      weakAreas,
      totalStudents: students.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取班级数据失败';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
