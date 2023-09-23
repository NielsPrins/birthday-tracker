'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function deleteTokenCookie() {
  cookies().delete('token');
  redirect('/');
}
