import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: '需要管理员权限' }, { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const applicationId = searchParams.get('applicationId');
  const where = applicationId ? { applicationId: Number(applicationId) } : {};
  const list = await prisma.feishuSyncLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return NextResponse.json(list);
}
