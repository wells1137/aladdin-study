import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password, name, university } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: '请填写所有必填信息 (邮箱、密码、姓名)' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: '该邮箱已被注册，请直接登录' }, { status: 409 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create random avatar
        const randomAvatarId = Math.floor(Math.random() * 70) + 1;
        const avatarUrl = `https://i.pravatar.cc/150?u=${randomAvatarId}`;

        // Create new user in DB
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                university: university || 'International Student',
                avatarUrl,
                role: 'student'
            }
        });

        // Generate JWT Token
        const token = await signToken(newUser.email, 'student');

        return NextResponse.json({
            message: '注册成功',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                avatarUrl: newUser.avatarUrl,
                university: newUser.university,
                role: newUser.role
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: '注册失败，请稍后再试' }, { status: 500 });
    }
}
