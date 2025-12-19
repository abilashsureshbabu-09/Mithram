import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, service } = body;

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                message,
                service: service || "General Inquiry", // Save the service
            },
        });
        return NextResponse.json(lead);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
