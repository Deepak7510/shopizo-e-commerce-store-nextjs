import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminRoutes, authRoutes, userRoutes } from './lib/client/routes';
import { verifyToken } from './lib/server/verifyToken';

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const accessToken = request.cookies.get("accessToken")?.value;
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = accessToken || bearerToken;

    if (!token && pathName.startsWith("/admin")) {
        return NextResponse.redirect(new URL(authRoutes.login, request.url));
    }

    const user = await verifyToken(token!);

    if (token && pathName.startsWith("/auth")) {
        if (user.role === "admin") {
            return NextResponse.redirect(new URL(adminRoutes.dashboard, request.url));
        } else {
            return NextResponse.redirect(new URL(userRoutes.home, request.url));
        }
    }

    if (token && pathName === "/admin") {
        return NextResponse.redirect(new URL(adminRoutes.dashboard, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*'],
};
