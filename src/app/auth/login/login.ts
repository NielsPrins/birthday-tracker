'use server'

import { redirect } from "next/navigation";
import { prisma } from "@/src/db";
import checkPassword from "./check-password";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export default async function login(formData: FormData) {
  const password = String(formData.get('password'));

  const authRecord = await prisma.auth.findFirst();
  if (!authRecord) {
    redirect('/auth/register')
  }

  const validPassword = await checkPassword(authRecord.passwordHash, password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

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
    .setExpirationTime(tokenMaxAge + 's')
    .sign(new TextEncoder().encode(secret));

  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== "development",
    maxAge: tokenMaxAge,
  });

  redirect('/')
}
