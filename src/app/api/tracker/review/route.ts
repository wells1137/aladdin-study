import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function POST(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user?.isAdmin) {
    return NextResponse.json({ error: '需要管理员权限' }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { id, status, reviewComment } = body;
    if (!id || !status) {
      return NextResponse.json({ error: '缺少 id 或 status' }, { status: 400 });
    }
    const validStatuses = ['approved', 'rejected', 'reupload_needed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: '无效的 status' }, { status: 400 });
    }
    const material = await prisma.uploadedMaterial.findUnique({
      where: { id: Number(id) },
      include: { application: { include: { counselor: true } } },
    });
    if (!material) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await prisma.uploadedMaterial.update({
      where: { id: material.id },
      data: { reviewStatus: status, reviewComment: reviewComment ?? null },
    });
    await prisma.notification.create({
      data: {
        userId: material.application.counselorId,
        applicationId: material.applicationId,
        title: '材料审核结果',
        content: `材料已${status === 'approved' ? '通过' : status === 'rejected' ? '拒绝' : '需重传'}${reviewComment ? `。意见：${reviewComment}` : ''}`,
        type: status === 'approved' ? 'material_approved' : status === 'rejected' ? 'material_rejected' : 'review_complete',
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
