'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import getMongoCollection from '@/src/database/db';
import generateBase64ID from '@/src/functions/generate-base-64-id';

export async function deleteTokenCookie() {
  cookies().delete('token');
  redirect('/');
}

export async function resetCalendarToken() {
  const settingsCollection = await getMongoCollection('settings');
  const calendarApiToken = generateBase64ID(20);

  await settingsCollection.findOneAndUpdate({ key: 'calendarApiToken' }, { $set: { key: 'calendarApiToken', value: calendarApiToken } });
  redirect('/settings');
}

export async function resetPassword() {
  const settingsCollection = await getMongoCollection('settings');
  await settingsCollection.deleteOne({ key: 'loginPasswordHash' });
  redirect('/register');
}
