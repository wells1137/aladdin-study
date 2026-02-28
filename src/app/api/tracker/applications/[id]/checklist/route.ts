import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getTrackerUser(_req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const applicationId = Number((await params).id);
  if (Number.isNaN(applicationId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const app = await prisma.application.findFirst({
    where: { id: applicationId, ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
    include: {
      university: { include: { materialTemplates: { orderBy: { sortOrder: 'asc' } } } },
      materials: true,
    },
  });
  if (!app) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const templates = app.university.materialTemplates;
  const requiredTotal = templates.filter((t) => t.isRequired).length;
  const uploadedByTemplate = new Map<number, { id: number; reviewStatus: string; fileUrl: string }>();
  for (const m of app.materials) {
    uploadedByTemplate.set(m.templateId, {
      id: m.id,
      reviewStatus: m.reviewStatus,
      fileUrl: m.fileUrl,
    });
  }
  const requiredUploaded = templates.filter(
    (t) => t.isRequired && uploadedByTemplate.has(t.id)
  ).length;
  const completionRate = requiredTotal === 0 ? 100 : Math.round((requiredUploaded / requiredTotal) * 100);
  const checklist = templates.map((t) => ({
    templateId: t.id,
    name: t.name,
    nameEn: t.nameEn,
    category: t.category,
    isRequired: t.isRequired,
    uploaded: uploadedByTemplate.has(t.id),
    uploadId: uploadedByTemplate.get(t.id)?.id,
    reviewStatus: uploadedByTemplate.get(t.id)?.reviewStatus ?? null,
    fileUrl: uploadedByTemplate.get(t.id)?.fileUrl ?? null,
  }));
  return NextResponse.json({
    applicationId,
    completionRate,
    requiredTotal,
    requiredUploaded,
    checklist,
  });
}
