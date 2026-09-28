import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

// 「网站用图」文件夹中的素材，以白名单 slug 对外提供
const ASSET_DIR = path.join(process.cwd(), '网站用图');

interface AssetEntry {
  file: string;
  kind: 'image' | 'pdf';
}

const ASSETS: Record<string, AssetEntry> = {
  // 图片（ sharp 自动按 EXIF 转正并压缩到最长边 1600px ）
  'basketball':      { file: '篮球社团.JPG', kind: 'image' },
  'deans-list-1':    { file: "dean's list1.JPG", kind: 'image' },
  'deans-list-2':    { file: "dean's list2.jpg", kind: 'image' },
  'class-monitor':   { file: '班长.jpg', kind: 'image' },
  'ucl-summer':      { file: 'UCL.jpg', kind: 'image' },
  'bioinfo-club':    { file: '生物信息社团.jfif', kind: 'image' },
  'ctb':             { file: 'CTB.JPG', kind: 'image' },
  'pap-talk':        { file: 'PAP.png', kind: 'image' },
  'qinling':         { file: '秦岭.jpg', kind: 'image' },
  // 论文 / 文档（ inline 方式返回，浏览器新标签页直接预览、自带下载按钮 ）
  'ucl-report':      { file: 'UCL project.pdf', kind: 'pdf' },
  'ctb-paper':       { file: 'CTB论文发表.pdf', kind: 'pdf' },
  'cis-paper':       { file: 'CIS论文.pdf', kind: 'pdf' },
  'qinling-paper':   { file: '秦岭三官庙管护站人工林与次生林植物群落差异初步研究.pdf', kind: 'pdf' },
  'qinling-slides':  { file: '秦岭三官庙管护站人工林与次生林植物群落差异初步研究 PPT.pdf', kind: 'pdf' },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const key = (params.slug || []).join('/');
  const entry = ASSETS[key];
  if (!entry) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(ASSET_DIR, entry.file);
  if (!filePath.startsWith(ASSET_DIR)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    if (entry.kind === 'image') {
      const buf = await sharp(filePath)
        .rotate() // 按 EXIF 方向自动转正
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
      return new NextResponse(new Uint8Array(buf), {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    const buf = await fs.readFile(filePath);
    const encodedName = encodeURIComponent(entry.file);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': 'application/pdf',
        // inline：浏览器内置阅读器新标签页打开，自带下载按钮
        'Content-Disposition': `inline; filename*=UTF-8''${encodedName}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
