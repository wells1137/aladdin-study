import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

async function isAdminRequest(req: NextRequest): Promise<boolean> {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return false;
    const payload = await verifyToken(token);
    return payload?.role === 'partner' || payload?.role === 'admin';
}

export async function GET(req: NextRequest) {
    if (!(await isAdminRequest(req))) {
        return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const counselorId = searchParams.get('counselorId') || '';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const pageSize = 20;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (counselorId) where.counselorId = Number(counselorId);

    const [applications, total, counselors] = await Promise.all([
        prisma.application.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                student: { select: { id: true, name: true, email: true, phone: true } },
                university: {
                    select: {
                        id: true,
                        name: true,
                        nameEn: true,
                        materialTemplates: { select: { id: true, name: true, isRequired: true } },
                    },
                },
                counselor: { select: { id: true, name: true, email: true } },
                materials: {
                    select: {
                        id: true,
                        templateId: true,
                        fileName: true,
                        fileUrl: true,
                        reviewStatus: true,
                        createdAt: true,
                    },
                },
            },
        }),
        prisma.application.count({ where }),
        prisma.counselor.findMany({
            select: { id: true, name: true, email: true },
            orderBy: { name: 'asc' },
        }),
    ]);

    // Calculate completion rates
    const enriched = applications.map((app) => {
        const requiredTemplates = app.university.materialTemplates.filter((t) => t.isRequired);
        const totalRequired = requiredTemplates.length;
        const uploadedRequired = requiredTemplates.filter((t) =>
            app.materials.some((m) => m.templateId === t.id)
        ).length;
        const completionRate = totalRequired > 0 ? Math.round((uploadedRequired / totalRequired) * 100) : 0;

        return {
            ...app,
            completionRate,
            totalRequired,
            uploadedRequired,
        };
    });

    return NextResponse.json({
        applications: enriched,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
        counselors,
    });
}

export async function PATCH(req: NextRequest) {
    if (!(await isAdminRequest(req))) {
        return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { id, status } = await req.json();
    if (!id || !status) {
        return NextResponse.json({ error: '缺少 id 或 status' }, { status: 400 });
    }

    const validStatuses = ['draft', 'uploading', 'under_review', 'revision_needed', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: '无效状态' }, { status: 400 });
    }

    const updated = await prisma.application.update({
        where: { id: Number(id) },
        data: { status },
    });

    return NextResponse.json(updated);
}
