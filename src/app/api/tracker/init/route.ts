import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const UNIVERSITIES = [
  { name: '马来亚大学', nameEn: 'University of Malaya (UM)', type: 'public' },
  { name: '博特拉大学', nameEn: 'Universiti Putra Malaysia (UPM)', type: 'public' },
  { name: '国民大学', nameEn: 'Universiti Kebangsaan Malaysia (UKM)', type: 'public' },
  { name: '理科大学', nameEn: 'Universiti Sains Malaysia (USM)', type: 'public' },
  { name: '泰莱大学', nameEn: "Taylor's University", type: 'private' },
  { name: '思特雅大学', nameEn: 'UCSI University', type: 'private' },
];

const MATERIAL_TEMPLATES = [
  { name: '本科成绩单', nameEn: 'Undergraduate Transcript', category: 'academic', isRequired: true },
  { name: '毕业证书', nameEn: 'Graduation Certificate', category: 'academic', isRequired: true },
  { name: '学位证书', nameEn: 'Degree Certificate', category: 'academic', isRequired: true },
  { name: '研究计划书', nameEn: 'Research Proposal', category: 'academic', isRequired: true },
  { name: '护照扫描件', nameEn: 'Passport Copy', category: 'identity', isRequired: true },
  { name: '证件照', nameEn: 'Passport Photo', category: 'identity', isRequired: true },
  { name: '雅思/托福成绩单', nameEn: 'IELTS/TOEFL Score', category: 'language', isRequired: true },
  { name: '资金证明', nameEn: 'Financial Proof', category: 'financial', isRequired: true },
  { name: '推荐信', nameEn: 'Recommendation Letter', category: 'other', isRequired: true },
  { name: '个人陈述', nameEn: 'Personal Statement', category: 'other', isRequired: false },
  { name: '简历', nameEn: 'Resume/CV', category: 'other', isRequired: false },
];

export async function POST() {
  try {
    // Run raw SQL from migration to create tables if not exist
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Counselor" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Counselor_email_key" ON "Counselor"("email")`);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "University" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "name" TEXT NOT NULL,
        "nameEn" TEXT,
        "type" TEXT NOT NULL,
        "country" TEXT NOT NULL DEFAULT '马来西亚',
        "description" TEXT,
        "logoUrl" TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "MaterialTemplate" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "universityId" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "nameEn" TEXT,
        "description" TEXT,
        "category" TEXT NOT NULL,
        "isRequired" BOOLEAN NOT NULL DEFAULT true,
        "acceptedFormats" TEXT DEFAULT 'pdf,jpg,png,doc,docx',
        "sortOrder" INTEGER NOT NULL DEFAULT 0,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "MaterialTemplate_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Student" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "counselorId" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT,
        "phone" TEXT,
        "passportNo" TEXT,
        "nationality" TEXT,
        "notes" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Student_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "Counselor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Application" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "studentId" INTEGER NOT NULL,
        "universityId" INTEGER NOT NULL,
        "counselorId" INTEGER NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'draft',
        "adminNotes" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "Application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "Application_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "Counselor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "UploadedMaterial" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "applicationId" INTEGER NOT NULL,
        "templateId" INTEGER NOT NULL,
        "fileKey" TEXT NOT NULL,
        "fileUrl" TEXT NOT NULL,
        "fileName" TEXT NOT NULL,
        "fileSize" INTEGER,
        "mimeType" TEXT,
        "reviewStatus" TEXT NOT NULL DEFAULT 'pending',
        "reviewComment" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "UploadedMaterial_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "UploadedMaterial_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "MaterialTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Notification" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "userId" INTEGER NOT NULL,
        "applicationId" INTEGER,
        "title" TEXT NOT NULL,
        "content" TEXT,
        "type" TEXT,
        "isRead" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Counselor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "Notification_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE SET NULL ON UPDATE CASCADE
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "FeishuSyncLog" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "applicationId" INTEGER NOT NULL,
        "syncType" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "requestPayload" TEXT,
        "responseData" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FeishuSyncLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);

    // Seed universities and material templates
    for (const u of UNIVERSITIES) {
      const existing = await prisma.university.findFirst({ where: { name: u.name } });
      if (!existing) {
        const uni = await prisma.university.create({ data: { ...u, country: '马来西亚' } });
        for (let i = 0; i < MATERIAL_TEMPLATES.length; i++) {
          const t = MATERIAL_TEMPLATES[i];
          await prisma.materialTemplate.create({
            data: { universityId: uni.id, name: t.name, nameEn: t.nameEn, category: t.category, isRequired: t.isRequired, sortOrder: i },
          });
        }
      }
    }

    return NextResponse.json({ ok: true, message: '跟踪系统数据库初始化完成，已创建 6 所院校和材料模板' });
  } catch (error) {
    console.error('Init error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
