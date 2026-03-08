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
    const type = searchParams.get('type') || '';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const pageSize = 20;

    const where = type ? { type } : {};

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                author: {
                    select: { id: true, name: true, avatarUrl: true, university: true },
                },
            },
        }),
        prisma.post.count({ where }),
    ]);

    return NextResponse.json({
        posts,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
    });
}

export async function DELETE(req: NextRequest) {
    if (!(await isAdminRequest(req))) {
        return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: '缺少 id' }, { status: 400 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
