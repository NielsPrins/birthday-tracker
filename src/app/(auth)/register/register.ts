'use server';

import { z } from 'zod';
import generateBase64ID from '@/src/generate-base-64-id';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import getMongoCollection from '@/src/db';
import { setLoginCookie } from '@/src/app/(auth)/set-login-cookie';

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'The passwords did not match',
      });
    }
  });

export default async function register(formData: FormData) {
  const data = schema.parse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  const calendarApiToken = generateBase64ID(20);
  const passwordHash = await hashPassword(data.password);

  const settingsCollection = await getMongoCollection('settings');

  await settingsCollection.findOneAndUpdate(
    { key: 'loginPasswordHash' },
    { $set: { key: 'loginPasswordHash', value: passwordHash } },
    { upsert: true }
  );
  await settingsCollection.findOneAndUpdate(
    { key: 'calendarApiToken' },
    { $set: { key: 'calendarApiToken', value: calendarApiToken } },
    { upsert: true }
  );

  await setLoginCookie();

  redirect('/');
}

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}
