import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin888';

// Helper to check auth
const checkAuth = (request: Request) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
        return false;
    }
    return true;
};

export async function GET(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, name, contact, data } = body;

        if (!type || !name || !contact) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        try {
            const lead = await prisma.lead.create({
                data: {
                    type,
                    name,
                    contact,
                    data: JSON.stringify(data),
                },
            });
            return NextResponse.json(lead);
        } catch {
            console.log('[Lead] DB unavailable, logging to console:', { type, name, contact, data });
            return NextResponse.json({ id: Date.now(), type, name, contact, status: 'logged' });
        }
    } catch (error) {
        console.error('Lead creation error:', error);
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, status, note } = body;

        const lead = await prisma.lead.update({
            where: { id },
            data: { status, note },
        });

        return NextResponse.json(lead);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
}
