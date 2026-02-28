import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const university = await prisma.university.findUnique({
    where: { id },
    include: { materialTemplates: { orderBy: { sortOrder: 'asc' } } },
  });
  if (!university) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(university);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getTrackerUser(req);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: '需要管理员权限' }, { status: 403 });
  }
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.name != null) data.name = body.name;
    if (body.nameEn != null) data.nameEn = body.nameEn;
    if (body.type != null) data.type = body.type;
    if (body.country != null) data.country = body.country;
    if (body.description != null) data.description = body.description;
    if (body.logoUrl != null) data.logoUrl = body.logoUrl;
    if (body.isActive != null) data.isActive = body.isActive;
    const university = await prisma.university.update({
      where: { id },
      data,
    });
    return NextResponse.json(university);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getTrackerUser(_req);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: '需要管理员权限' }, { status: 403 });
  }
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  await prisma.university.update({
    where: { id },
    data: { isActive: false },
  });
  return NextResponse.json({ ok: true });
}
