import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get('universityId');
  if (!universityId) {
    return NextResponse.json({ error: '缺少 universityId' }, { status: 400 });
  }
  const list = await prisma.materialTemplate.findMany({
    where: { universityId: Number(universityId) },
    orderBy: { sortOrder: 'asc' },
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
    const {
      universityId,
      name,
      nameEn,
      description,
      category,
      isRequired,
      acceptedFormats,
      sortOrder,
    } = body;
    if (!universityId || !name || !category) {
      return NextResponse.json({ error: '缺少 universityId / name / category' }, { status: 400 });
    }
    const template = await prisma.materialTemplate.create({
      data: {
        universityId: Number(universityId),
        name,
        nameEn: nameEn ?? null,
        description: description ?? null,
        category,
        isRequired: isRequired ?? true,
        acceptedFormats: acceptedFormats ?? 'pdf,jpg,png,doc,docx',
        sortOrder: sortOrder ?? 0,
      },
    });
    return NextResponse.json(template);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}
