import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

const NOTIFY_EMAIL = 'Aladddin.edu@outlook.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const degreeMap: Record<string, string> = {
    bachelor: '学士学位 (Bachelor)',
    master: '硕士学位 (Master)',
    phd: '博士学位 (PhD)',
    language: '语言班 (Language)',
};

const educationMap: Record<string, string> = {
    high_school: '高中在读',
    high_school_grad: '高中毕业',
    undergrad: '本科在读',
    undergrad_grad: '本科毕业',
    master: '硕士在读/毕业',
    other: '其他',
};

const budgetMap: Record<string, string> = {
    '<5w': '5万以内',
    '5-8w': '5-8万',
    '8-12w': '8-12万',
    '12-20w': '12-20万',
    '>20w': '20万以上',
};

function buildEmailHtml(formData: Record<string, string>) {
    const rows = [
        ['姓名', formData.name],
        ['手机号码', formData.phone],
        ['微信号', formData.wechat || '未填写'],
        ['当前学历', educationMap[formData.currentEducation] || formData.currentEducation || '未填写'],
        ['平均分/GPA', formData.grade || '未填写'],
        ['英语水平', formData.englishLevel || '未填写'],
        ['目标学位', degreeMap[formData.targetDegree] || formData.targetDegree || '未填写'],
        ['意向专业', formData.intendedMajor || '未填写'],
        ['留学预算 (年)', budgetMap[formData.budget] || formData.budget || '未填写'],
        ['计划入学时间', formData.intakeDate || '未填写'],
    ];

    const tableRows = rows
        .map(([label, value]) => `<tr><td style="padding:10px 16px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;width:140px">${label}</td><td style="padding:10px 16px;color:#111827;border-bottom:1px solid #f3f4f6">${value}</td></tr>`)
        .join('');

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
    <div style="background:linear-gradient(135deg,#C41E3A,#e53e3e);padding:24px 32px">
      <h1 style="margin:0;color:#fff;font-size:20px">🎓 新的留学评估申请</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px">来自 aladdineducation.com</p>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse">${tableRows}</table>
      <p style="margin:24px 0 0;color:#6b7280;font-size:12px">提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
    </div>
  </div>
</body>
</html>`;
}

async function sendEmail(formData: Record<string, string>): Promise<boolean> {
    if (!RESEND_API_KEY) {
        console.error('[Lead] RESEND_API_KEY not configured');
        return false;
    }

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Aladdin Education <onboarding@resend.dev>',
                to: [NOTIFY_EMAIL],
                subject: `新留学评估 | ${formData.name} - ${degreeMap[formData.targetDegree] || '未选择学位'}`,
                html: buildEmailHtml(formData),
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('[Lead] Resend API error:', err);
            return false;
        }
        return true;
    } catch (err) {
        console.error('[Lead] Email send failed:', err);
        return false;
    }
}

async function isAdminRequest(req: NextRequest): Promise<boolean> {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return false;
    const payload = await verifyToken(token);
    return payload?.role === 'partner' || payload?.role === 'admin';
}

// GET: List leads (admin only)
export async function GET(req: NextRequest) {
    if (!(await isAdminRequest(req))) {
        return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const pageSize = 20;

    const where = status ? { status } : {};

    const [leads, total] = await Promise.all([
        prisma.lead.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
        leads,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
    });
}

// POST: Create a lead (public)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, name, contact, data } = body;

        if (!type || !name || !contact) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const formData = typeof data === 'string' ? JSON.parse(data) : data;
        const emailSent = await sendEmail({ ...formData, name, contact });

        // Save to DB
        const lead = await prisma.lead.create({
            data: {
                type,
                name,
                contact,
                data: typeof data === 'string' ? data : JSON.stringify(data),
                status: 'new',
            },
        });

        console.log('[Lead] Submission received:', { type, name, contact, emailSent });

        return NextResponse.json({
            id: lead.id,
            type,
            name,
            contact,
            emailSent,
            status: emailSent ? 'emailed' : 'logged',
        });
    } catch (error) {
        console.error('Lead creation error:', error);
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}

// PATCH: Update lead status/note (admin only)
export async function PATCH(req: NextRequest) {
    if (!(await isAdminRequest(req))) {
        return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { id, status, note } = await req.json();
    if (!id) {
        return NextResponse.json({ error: '缺少 id' }, { status: 400 });
    }

    const data: Record<string, string> = {};
    if (status) data.status = status;
    if (note !== undefined) data.note = note;

    const updated = await prisma.lead.update({
        where: { id: Number(id) },
        data,
    });

    return NextResponse.json(updated);
}
