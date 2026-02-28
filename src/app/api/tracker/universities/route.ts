import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get('activeOnly') !== 'false';

  const where = activeOnly ? { isActive: true } : {};
  const list = await prisma.university.findMany({
    where,
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: '需要管理员权限' }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { name, nameEn, type, country, description, logoUrl, isActive } = body;
    if (!name || !type) {
      return NextResponse.json({ error: '缺少 name 或 type' }, { status: 400 });
    }
    const university = await prisma.university.create({
      data: {
        name,
        nameEn: nameEn ?? null,
        type,
        country: country ?? '马来西亚',
        description: description ?? null,
        logoUrl: logoUrl ?? null,
        isActive: isActive ?? true,
      },
    });
    return NextResponse.json(university);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}
