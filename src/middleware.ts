import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      issuer: 'birthday-tracker',
    });
  } catch (e) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|auth|.*\\..*).*)']
};
