import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: '未授权，请先登录' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || !payload.username) {
            return NextResponse.json({ error: '无效或过期的令牌' }, { status: 401 });
        }

        const { name, university, avatarUrl, major, enrollmentYear, bio, wechatId } = await req.json();

        if (!name) {
            return NextResponse.json({ error: '昵称不能为空' }, { status: 400 });
        }

        // Update the user
        const updatedUser = await prisma.user.update({
            where: { email: payload.username },
            data: {
                name,
                university,
                avatarUrl,
                major,
                enrollmentYear,
                bio,
                wechatId
            },
            select: {
                id: true,
                email: true,
                name: true,
                university: true,
                avatarUrl: true,
                major: true,
                enrollmentYear: true,
                bio: true,
                wechatId: true,
                role: true
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: '资料更新失败，请稍后再试' }, { status: 500 });
    }
}
