'use server';

import { z } from 'zod';
import generateBase64ID from '@/src/generate-base-64-id';
import hashPassword from './hash-password';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/db';

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

  const agendaToken = generateBase64ID(20);
  const passwordHash = await hashPassword(data.password);

  await prisma.auth.create({
    data: {
      agendaToken: agendaToken,
      passwordHash: passwordHash,
    },
  });

  redirect('/');
}
