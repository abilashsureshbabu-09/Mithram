
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Lead received:', body);

        // TODO: Save to database or send email
        // For now, we return success to allow the UI to confirm submission

        return NextResponse.json({ message: 'Success', data: body }, { status: 200 });
    } catch (error) {
        console.error('Error processing lead:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
