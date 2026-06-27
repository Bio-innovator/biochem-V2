import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. 验证管理员权限
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: '无权限' }, { status: 403 });
    }

    const userId = params.id;

    // 2. 确认用户存在且是学生
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    if (user.role !== 'STUDENT') {
      return NextResponse.json({ error: '只能清除学生数据' }, { status: 400 });
    }

    // 3. 事务删除所有学生数据
    await prisma.$transaction(async (tx) => {
      // 先删 ExamAnswer（关联 ExamResult）
      await tx.examAnswer.deleteMany({
        where: { examResult: { userId } },
      });

      // 删 ExamResult
      await tx.examResult.deleteMany({
        where: { userId },
      });

      // 先删 QuizAnswer（关联 QuizResult）
      await tx.quizAnswer.deleteMany({
        where: { quizResult: { userId } },
      });

      // 删 QuizResult
      await tx.quizResult.deleteMany({
        where: { userId },
      });

      // 删 ErrorBook
      await tx.errorBook.deleteMany({
        where: { userId },
      });

      // 删 KnowledgeProgress
      await tx.knowledgeProgress.deleteMany({
        where: { userId },
      });
    });

    return NextResponse.json({
      message: '学生数据已清除',
      cleared: ['QuizResult', 'ExamResult', 'ErrorBook', 'KnowledgeProgress'],
    });
  } catch (err: any) {
    console.error('Clear data error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
