import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return NextResponse.json({ error: '用户不存在' }, { status: 401 });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: '密码错误' }, { status: 401 });
  if (user.status !== 'APPROVED') return NextResponse.json({ error: '账号审核中' }, { status: 403 });
  const token = signToken({ userId: user.id, role: user.role, username: user.username });
  return NextResponse.json({
    token,
    user: { id: user.id, username: user.username, displayName: user.displayName, role: user.role.toLowerCase(), email: user.email }
  });
}
