import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTrackerUser } from '@/lib/trackerAuth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

function randomId(): string {
  return Math.random().toString(36).slice(2, 12);
}

export async function POST(req: NextRequest) {
  const user = await getTrackerUser(req);
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { applicationId, templateId, fileName, fileBase64, mimeType, fileSize } = body;
    if (!applicationId || !templateId || !fileName || !fileBase64) {
      return NextResponse.json({ error: '缺少 applicationId / templateId / fileName / fileBase64' }, { status: 400 });
    }
    const app = await prisma.application.findFirst({
      where: { id: Number(applicationId), ...(user.isAdmin ? {} : { counselorId: user.counselorId }) },
      include: { university: { include: { materialTemplates: true } } },
    });
    if (!app) {
      return NextResponse.json({ error: '申请不存在或无权操作' }, { status: 404 });
    }
    const template = app.university.materialTemplates.find((t) => t.id === Number(templateId));
    if (!template) {
      return NextResponse.json({ error: '材料模板不存在' }, { status: 404 });
    }
    const ext = path.extname(fileName) || '.pdf';
    const key = `materials/${applicationId}/${templateId}-${randomId()}${ext}`;
    const baseDir = path.join(process.cwd(), 'public', 'uploads');
    const dir = path.join(baseDir, 'materials', String(applicationId));
    await mkdir(dir, { recursive: true });
    const buf = Buffer.from(fileBase64, 'base64');
    const filePath = path.join(dir, `${templateId}-${randomId()}${ext}`);
    await writeFile(filePath, buf);
    const fileUrl = `/uploads/materials/${applicationId}/${path.basename(filePath)}`;
    const material = await prisma.uploadedMaterial.create({
      data: {
        applicationId: app.id,
        templateId: template.id,
        fileKey: key,
        fileUrl,
        fileName,
        fileSize: fileSize ?? buf.length,
        mimeType: mimeType ?? null,
        reviewStatus: 'pending',
      },
    });
    if (app.status === 'draft') {
      await prisma.application.update({
        where: { id: app.id },
        data: { status: 'uploading' },
      });
    }
    await prisma.feishuSyncLog.create({
      data: {
        applicationId: app.id,
        syncType: 'update',
        status: 'success',
        requestPayload: JSON.stringify({ templateId, fileName }),
      },
    });
    return NextResponse.json({ id: material.id, fileUrl, fileKey: material.fileKey });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}
