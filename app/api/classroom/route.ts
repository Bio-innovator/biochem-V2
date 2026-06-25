import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token 无效' }, { status: 401 });
    }

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
      },
    });

    const studentData = students.map((s) => ({
      id: s.id,
      name: s.displayName || s.username,
      email: s.email,
      quizzes: 0,
      avgScore: 0,
      weakUnit: '-',
    }));

    return NextResponse.json({
      students: studentData,
      weakAreas: [],
      totalStudents: students.length,
      totalQuizzes: 0,
    });
  } catch (err: any) {
    console.error('Classroom API error:', err);
    return NextResponse.json(
      { error: err.message || '获取班级数据失败' },
      { status: 500 }
    );
  }
}
