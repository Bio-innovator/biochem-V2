import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * POST /api/feedback
 * 优先写入 GitHub 仓库的 feedback/ 文件夹（需配置 GITHUB_TOKEN + GITHUB_REPO 环境变量），
 * 未配置时回退写入 Supabase 数据库的 Feedback 表。
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = String(body?.content ?? '').trim().slice(0, 2000);
    const ctx = String(body?.context ?? 'visitor').slice(0, 200);

    if (text.length < 5) {
      return NextResponse.json(
        { error: 'Content too short / 内容太短' },
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // 形如 "owner/repo"

    if (token && repo) {
      const now = new Date();
      const stamp = now.toISOString().replace(/[:.]/g, '-');
      const path = `feedback/${stamp}.md`;
      const md = `---\ndate: ${now.toISOString()}\ncontext: ${ctx}\n---\n\n${text}\n`;
      const ghRes = await fetch(
        `https://api.github.com/repos/${repo}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github+json',
          },
          body: JSON.stringify({
            message: `feedback: ${stamp}`,
            content: Buffer.from(md, 'utf-8').toString('base64'),
            branch: 'main',
          }),
        }
      );
      if (ghRes.ok) {
        return NextResponse.json({ ok: true, via: 'github' });
      }
      // GitHub 写入失败时静默回退数据库
    }

    await prisma.$executeRaw`
      INSERT INTO "Feedback" (id, content, context, "createdAt")
      VALUES (gen_random_uuid(), ${text}, ${ctx}, now())
    `;
    return NextResponse.json({ ok: true, via: 'db' });
  } catch (e) {
    console.error('feedback error:', e);
    return NextResponse.json(
      { error: 'Internal error / 服务器错误' },
      { status: 500 }
    );
  }
}
