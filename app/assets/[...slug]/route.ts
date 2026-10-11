import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

// 「网站用图」/「图片补充」/「最新用图」文件夹中的素材，以白名单 slug 对外提供
const DEFAULT_DIR = path.join(process.cwd(), '网站用图');
const SUPPLEMENT_DIR = path.join(process.cwd(), '图片补充');
const LATEST_DIR = path.join(process.cwd(), '最新用图');

interface AssetEntry {
  file: string;
  kind: 'image' | 'pdf';
  dir?: 'supplement' | 'latest'; // 默认从「网站用图」读取；supplement 从「图片补充」、latest 从「最新用图」读取
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
  'website-dev':     { file: '网站开发.jpg', kind: 'image' },
  // 论文 / 文档（ inline 方式返回，浏览器新标签页直接预览、自带下载按钮 ）
  'ucl-report':      { file: 'UCL project.pdf', kind: 'pdf' },
  'ctb-paper':       { file: 'CTB论文发表.pdf', kind: 'pdf' },
  'cis-paper':       { file: 'CIS论文.pdf', kind: 'pdf' },
  'qinling-slides':  { file: '秦岭三官庙管护站人工林与次生林植物群落差异初步研究 PPT.pdf', kind: 'pdf' },
  // —— 以下为「图片补充」文件夹中的新增素材 ——
  'website-photo':      { file: '网站用图.jpg', kind: 'image', dir: 'supplement' },
  'site-proposal':      { file: '开题报告.pdf', kind: 'pdf', dir: 'supplement' },
  'site-midterm':       { file: '中期汇报.pdf', kind: 'pdf', dir: 'supplement' },
  'site-final':         { file: '结题汇报.pdf', kind: 'pdf', dir: 'supplement' },
  'site-paper':         { file: '网站论文.pdf', kind: 'pdf', dir: 'supplement' },
  'site-improvements':  { file: '高三改进汇总.pdf', kind: 'pdf', dir: 'supplement' },
  'cis-transcript':     { file: 'CIS成绩单.pdf', kind: 'pdf', dir: 'supplement' },
  'cis-evaluation':     { file: 'CIS教授评价.pdf', kind: 'pdf', dir: 'supplement' },
  // —— 以下为「最新用图」文件夹中的素材 ——
  'qinling-paper':      { file: '秦岭三官庙管护站人工林与次生林植物群落差异初步研究.pdf', kind: 'pdf', dir: 'latest' }, // 论文最新版（旧版已舍弃）
  'qinling-cert':       { file: '秦岭证书.pdf', kind: 'pdf', dir: 'latest' },
  'bbo-cert':           { file: 'BBO.pdf', kind: 'pdf', dir: 'latest' },
  'usabo-cert':         { file: 'USABO.pdf', kind: 'pdf', dir: 'latest' },
  'eco-club-logo':      { file: '社团徽记.jpg', kind: 'image', dir: 'latest' },
  'eco-article':        { file: '垃圾污染对人类健康的影响.pdf', kind: 'pdf', dir: 'latest' },
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

  const baseDir =
    entry.dir === 'supplement' ? SUPPLEMENT_DIR : entry.dir === 'latest' ? LATEST_DIR : DEFAULT_DIR;
  const filePath = path.join(baseDir, entry.file);
  if (!filePath.startsWith(baseDir)) {
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
