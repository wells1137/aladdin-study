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
  const student = await prisma.student.findFirst({
    where: { id, ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
    include: { counselor: { select: { name: true, email: true } } },
  });
  if (!student) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(student);
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
  const existing = await prisma.student.findFirst({
    where: { id, ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
  });
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.name != null) data.name = body.name;
    if (body.email != null) data.email = body.email;
    if (body.phone != null) data.phone = body.phone;
    if (body.passportNo != null) data.passportNo = body.passportNo;
    if (body.nationality != null) data.nationality = body.nationality;
    if (body.notes != null) data.notes = body.notes;
    const student = await prisma.student.update({
      where: { id },
      data,
    });
    return NextResponse.json(student);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}
