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
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const app = await prisma.application.findFirst({
    where: { id, ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
    include: {
      student: true,
      university: { include: { materialTemplates: { orderBy: { sortOrder: 'asc' } } } },
      counselor: { select: { name: true, email: true } },
      materials: { include: { template: true } },
    },
  });
  if (!app) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(app);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const id = Number((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const existing = await prisma.application.findFirst({
    where: { id, ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
    include: { student: true, counselor: true },
  });
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  try {
    const body = await req.json();
    const { status, adminNotes } = body;
    if (!status) {
      return NextResponse.json({ error: '缺少 status' }, { status: 400 });
    }
    const validStatuses = ['draft', 'uploading', 'under_review', 'revision_needed', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: '无效的 status' }, { status: 400 });
    }
    const app = await prisma.application.update({
      where: { id },
      data: { status, adminNotes: adminNotes ?? existing.adminNotes },
    });
    // 站内通知顾问
    if (user.isAdmin && existing.counselorId !== user.counselorId) {
      await prisma.notification.create({
        data: {
          userId: existing.counselorId,
          applicationId: id,
          title: '申请状态更新',
          content: `申请 #${id} 状态已更新为：${status}${adminNotes ? `。备注：${adminNotes}` : ''}`,
          type: 'status_change',
        },
      });
    }
    // 飞书同步日志
    await prisma.feishuSyncLog.create({
      data: {
        applicationId: id,
        syncType: 'status_change',
        status: 'success',
        requestPayload: JSON.stringify({ status, adminNotes }),
      },
    });
    return NextResponse.json(app);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}
