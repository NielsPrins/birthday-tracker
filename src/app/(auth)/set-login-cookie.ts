import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function setLoginCookie() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('No jwt secret configured');
  }

  // One day
  const tokenMaxAge = 24 * 60 * 60;
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('birthday-tracker')
    .setExpirationTime(`${tokenMaxAge}s`)
    .sign(new TextEncoder().encode(secret));

  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: tokenMaxAge,
  });
}
