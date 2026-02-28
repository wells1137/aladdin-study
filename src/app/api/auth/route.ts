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

        // 1. Try B2C Student Login First (via Prisma) — graceful if DB unavailable
        try {
            const studentUser = await prisma.user.findUnique({
                where: { email: username },
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
        } catch {
            // DB unavailable (e.g. SQLite on Vercel); skip student lookup
        }

        // 2. Fallback to B-End Partner Login (env-based credentials, no DB needed)
        if (!validateCredentials(username, password)) {
            return NextResponse.json({ error: '账号或密码错误' }, { status: 401 });
        }

        // Find or create Counselor for tracker
        let counselorId: number | undefined;
        let isAdmin = false;
        try {
            const counselor = await prisma.counselor.upsert({
                where: { email: username },
                create: { email: username, name: username, isAdmin: false },
                update: {},
            });
            counselorId = counselor.id;
            isAdmin = counselor.isAdmin;
        } catch {
            // Counselor table may not exist or DB unavailable; continue without it
        }
        const role = isAdmin ? 'admin' : 'partner';
        const token = await signToken(username, role, counselorId);
        return NextResponse.json({
            token,
            username,
            counselorId,
            isAdmin,
            user: { id: counselorId ?? 'partner', name: username, role, counselorId }
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
    if (payload.role === 'student') {
        try {
            const user = await prisma.user.findUnique({
                where: { email: payload.username },
                select: { id: true, name: true, email: true, avatarUrl: true, university: true, role: true }
            });
            if (user) {
                return NextResponse.json({ authenticated: true, username: payload.username, role: payload.role, user });
            }
        } catch {
            // DB unavailable
        }
    }

    // Partner/counselor: attach counselorId for tracker
    if (payload.role === 'partner' || payload.role === 'admin') {
        try {
            const counselorId = payload.counselorId ?? null;
            const counselor = counselorId
                ? await prisma.counselor.findUnique({ where: { id: counselorId } })
                : await prisma.counselor.findUnique({ where: { email: payload.username } });
            if (counselor) {
                return NextResponse.json({
                    authenticated: true,
                    username: payload.username,
                    role: counselor.isAdmin ? 'admin' : 'partner',
                    counselorId: counselor.id,
                    isAdmin: counselor.isAdmin,
                    user: { id: counselor.id, name: counselor.name, role: counselor.isAdmin ? 'admin' : 'partner', counselorId: counselor.id }
                });
            }
        } catch {
            // Counselor table may not exist or DB unavailable
        }
    }

    return NextResponse.json({
        authenticated: true,
        username: payload.username,
        role: payload.role || 'partner',
        user: { name: payload.username, role: payload.role || 'partner' }
    });
}
