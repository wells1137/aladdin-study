import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';

export async function GET(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  const where = user.isAdmin ? {} : { counselorId: user.counselorId };
  const list = await prisma.student.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: { counselor: { select: { name: true, email: true } } },
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
    const { name, email, phone, passportNo, nationality, notes } = body;
    if (!name) {
      return NextResponse.json({ error: '缺少学生姓名' }, { status: 400 });
    }
    const student = await prisma.student.create({
      data: {
        counselorId: user.counselorId,
        name,
        email: email ?? null,
        phone: phone ?? null,
        passportNo: passportNo ?? null,
        nationality: nationality ?? null,
        notes: notes ?? null,
      },
    });
    return NextResponse.json(student);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}
