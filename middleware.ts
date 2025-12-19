import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that are protected
    const isProtectedPath = path.startsWith('/admin');

    // Define paths that are public within admin (login)
    const isPublicAdminPath = path === '/admin/login';

    const token = request.cookies.get('admin_session')?.value;

    // redirect to login if accessing protected admin route without token
    if (isProtectedPath && !isPublicAdminPath && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // redirect to dashboard if accessing login with token
    if (isPublicAdminPath && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
