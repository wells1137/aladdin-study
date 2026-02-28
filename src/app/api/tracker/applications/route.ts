import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');
  const status = searchParams.get('status');
  const where: { counselorId?: number; studentId?: number; status?: string } = user.isAdmin
    ? {}
    : { counselorId: user.counselorId };
  if (studentId) where.studentId = Number(studentId);
  if (status) where.status = status;

  const list = await prisma.application.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      student: true,
      university: true,
      counselor: { select: { name: true, email: true } },
    },
  });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { studentId, universityIds } = body;
    if (!studentId || !Array.isArray(universityIds) || universityIds.length === 0) {
      return NextResponse.json({ error: '缺少 studentId 或 universityIds' }, { status: 400 });
    }
    const student = await prisma.student.findFirst({
      where: { id: Number(studentId), ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
    });
    if (!student) {
      return NextResponse.json({ error: '学生不存在或无权操作' }, { status: 404 });
    }
    const created: unknown[] = [];
    for (const uid of universityIds) {
      const app = await prisma.application.create({
        data: {
          studentId: student.id,
          universityId: Number(uid),
          counselorId: user.counselorId,
          status: 'draft',
        },
      });
      created.push(app);
      // Mock 飞书同步：写一条日志
      await prisma.feishuSyncLog.create({
        data: {
          applicationId: app.id,
          syncType: 'create',
          status: 'success',
          requestPayload: JSON.stringify({ studentId: student.id, universityId: uid }),
        },
      });
    }
    return NextResponse.json(created);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}
