import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const unreadOnly = searchParams.get('unreadOnly') === 'true';
  const list = await prisma.notification.findMany({
    where: { userId: user.counselorId, ...(unreadOnly ? { isRead: false } : {}) },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json(list);
}

export async function PATCH(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  if (body.allRead === true) {
    await prisma.notification.updateMany({
      where: { userId: user.counselorId },
      data: { isRead: true },
    });
    return NextResponse.json({ ok: true });
  }
  const { id } = body;
  if (id != null) {
    await prisma.notification.updateMany({
      where: { id: Number(id), userId: user.counselorId },
      data: { isRead: true },
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: '缺少 id 或 allRead' }, { status: 400 });
}
