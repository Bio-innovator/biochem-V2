import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { username, email, password, role } = await req.json();
  const hashed = await bcrypt.hash(password, 12);
  const status = role === 'teacher' ? 'PENDING' : 'APPROVED';
  try {
    const user = await prisma.user.create({
      data: { username, email, password: hashed, role: role.toUpperCase(), status, displayName: username }
    });
    return NextResponse.json({ success: true, message: status === 'PENDING' ? '注册成功，等待审核' : '注册成功' });
  } catch (e: any) {
    if (e.code === 'P2002') return NextResponse.json({ error: '用户名或邮箱已存在' }, { status: 400 });
    return NextResponse.json({ error: '注册失败' }, { status: 500 });
  }
}
