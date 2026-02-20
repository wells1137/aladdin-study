import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, signToken, verifyToken } from '@/lib/auth';

// POST: Login
export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: '请输入用户名和密码' }, { status: 400 });
        }

        if (!validateCredentials(username, password)) {
            return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
        }

        const token = await signToken(username);
        return NextResponse.json({ token, username });
    } catch {
        return NextResponse.json({ error: '服务器错误' }, { status: 500 });
    }
}

// GET: Verify token
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

    return NextResponse.json({ authenticated: true, username: payload.username });
}
