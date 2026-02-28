import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getTrackerUser(_req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const material = await prisma.uploadedMaterial.findFirst({
    where: { id },
    include: { application: true },
  });
  if (!material || (!user.isAdmin && material.application.counselorId !== user.counselorId)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  await prisma.uploadedMaterial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
