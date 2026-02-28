import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

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
    if (body.description != null) data.description = body.description;
    if (body.category != null) data.category = body.category;
    if (body.isRequired != null) data.isRequired = body.isRequired;
    if (body.acceptedFormats != null) data.acceptedFormats = body.acceptedFormats;
    if (body.sortOrder != null) data.sortOrder = body.sortOrder;
    const template = await prisma.materialTemplate.update({
      where: { id },
      data,
    });
    return NextResponse.json(template);
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
  await prisma.materialTemplate.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
