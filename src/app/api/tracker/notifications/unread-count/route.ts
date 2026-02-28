import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ count: 0 });
  }
  const count = await prisma.notification.count({
    where: { userId: user.counselorId, isRead: false },
  });
  return NextResponse.json({ count });
}
