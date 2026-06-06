import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await verifyAuth(req as any);
    if (user.role !== 'ADMIN') return NextResponse.json({ error: '无权访问' }, { status: 403 });
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, username: true, email: true, role: true, status: true, displayName: true, createdAt: true }
    });
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
