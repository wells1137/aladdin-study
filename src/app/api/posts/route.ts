import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET: Fetch all posts
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                        university: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: '获取内容失败' }, { status: 500 });
    }
}

// POST: Create a new post
export async function POST(req: NextRequest) {
    try {
        // 1. Authenticate user
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: '未授权，请先登录' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || !payload.username) {
            return NextResponse.json({ error: '无效或过期的令牌' }, { status: 401 });
        }

        // Must be a student to post generic map items (for now)
        if (payload.role !== 'student' && payload.role !== 'admin') {
            return NextResponse.json({ error: '仅限学生用户发布内容' }, { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { email: payload.username }
        });

        if (!user) {
            return NextResponse.json({ error: '用户不存在' }, { status: 404 });
        }

        // 2. Parse request body
        const { type, title, subtitle, description, imageUrl, longitude, latitude } = await req.json();

        if (!type || !title || longitude === undefined || latitude === undefined) {
            return NextResponse.json({ error: '缺少必填字段 (类型、标题、坐标)' }, { status: 400 });
        }

        // 3. Save to database
        const newPost = await prisma.post.create({
            data: {
                type,
                title,
                subtitle,
                description,
                imageUrl,
                longitude,
                latitude,
                authorId: user.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                        university: true
                    }
                }
            }
        });

        return NextResponse.json(newPost, { status: 201 });

    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: '发布内容失败，请稍后再试' }, { status: 500 });
    }
}
