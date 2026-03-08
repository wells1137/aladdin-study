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

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
        totalUsers, newUsersWeek,
        totalPosts, newPostsWeek,
        totalLeads, newLeadsWeek,
        totalApplications,
        recentUsers,
        recentLeads,
        appsByStatus,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.post.count(),
        prisma.post.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.lead.count(),
        prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.application.count(),
        prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { id: true, name: true, email: true, university: true, createdAt: true },
        }),
        prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { id: true, name: true, contact: true, type: true, status: true, createdAt: true },
        }),
        prisma.application.groupBy({
            by: ['status'],
            _count: { id: true },
        }),
    ]);

    const statusCounts: Record<string, number> = {};
    for (const s of appsByStatus) {
        statusCounts[s.status] = s._count.id;
    }

    return NextResponse.json({
        users: { total: totalUsers, newWeek: newUsersWeek },
        posts: { total: totalPosts, newWeek: newPostsWeek },
        leads: { total: totalLeads, newWeek: newLeadsWeek },
        applications: { total: totalApplications, byStatus: statusCounts },
        recentUsers,
        recentLeads,
    });
}
