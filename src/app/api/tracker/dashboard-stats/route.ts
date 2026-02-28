import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const where = user.isAdmin ? {} : { counselorId: user.counselorId };
  const [total, draft, uploading, underReview, revisionNeeded, approved, rejected] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.count({ where: { ...where, status: 'draft' } }),
    prisma.application.count({ where: { ...where, status: 'uploading' } }),
    prisma.application.count({ where: { ...where, status: 'under_review' } }),
    prisma.application.count({ where: { ...where, status: 'revision_needed' } }),
    prisma.application.count({ where: { ...where, status: 'approved' } }),
    prisma.application.count({ where: { ...where, status: 'rejected' } }),
  ]);
  return NextResponse.json({
    total,
    draft,
    uploading,
    under_review: underReview,
    revision_needed: revisionNeeded,
    approved,
    rejected,
  });
}
