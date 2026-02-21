import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, signToken, verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// POST: Login (handles both Partners and Students)
export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: '请输入账号和密码' }, { status: 400 });
        }

        // 1. Try B2C Student Login First (via Prisma)
        const studentUser = await prisma.user.findUnique({
            where: { email: username }, // Assume username field acts as email for students
        });

        if (studentUser) {
            const isMatch = await bcrypt.compare(password, studentUser.passwordHash);
            if (!isMatch) {
                return NextResponse.json({ error: '密码错误' }, { status: 401 });
            }
            const token = await signToken(studentUser.email, studentUser.role);
            return NextResponse.json({
                token,
                username: studentUser.email,
                user: {
                    id: studentUser.id,
                    name: studentUser.name,
                    avatarUrl: studentUser.avatarUrl,
                    university: studentUser.university,
                    role: studentUser.role
                }
            });
        }

        // 2. Fallback to B-End Partner Login (hardcoded env)
        if (!validateCredentials(username, password)) {
            return NextResponse.json({ error: '账号或密码错误 (未找到匹配记录)' }, { status: 401 });
        }

        const token = await signToken(username, 'partner');
        return NextResponse.json({
            token,
            username,
            user: { name: 'Partner User', role: 'partner' }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: '服务器错误' }, { status: 500 });
    }
}

// GET: Verify token & Return User Profile
export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Enhance response with full user details if it's a student
    if (payload.role === 'student' || payload.role === 'admin') {
        const user = await prisma.user.findUnique({
            where: { email: payload.username },
            select: { id: true, name: true, email: true, avatarUrl: true, university: true, role: true }
        });
        if (user) {
            return NextResponse.json({ authenticated: true, username: payload.username, role: payload.role, user });
        }
    }

    return NextResponse.json({
        authenticated: true,
        username: payload.username,
        role: payload.role || 'partner',
        user: { name: 'Partner', role: 'partner' }
    });
}
