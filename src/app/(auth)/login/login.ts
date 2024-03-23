'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import getMongoCollection from '@/src/database/db';
import { Setting } from '@/src/database/models/setting';
import { setLoginCookie } from '@/src/app/(auth)/set-login-cookie';

export default async function login(formData: FormData) {
  const settingsCollection = await getMongoCollection('settings');

  const password = String(formData.get('password'));

  const loginPasswordHashSetting = await settingsCollection.findOne<Setting>({ key: 'loginPasswordHash' });
  if (!loginPasswordHashSetting) {
    redirect('/register');
  }

  const validPassword = await checkPassword(String(loginPasswordHashSetting.value), password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  await setLoginCookie();

  redirect('/');
}

function checkPassword(hash: string, password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isValid) => {
      if (err) {
        reject(err);
      } else {
        resolve(isValid);
      }
    });
  });
}
