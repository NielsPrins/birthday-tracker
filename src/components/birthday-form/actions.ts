'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/db';
import generateBase64ID from '@/src/generate-base-64-id';
import moment from 'moment';
import { revalidatePath } from 'next/cache';

export async function addOrEditBirthday(formData: FormData, birthdateId?: string) {
  const birthdaySchema = z.object({
    name: z.string().min(1),
    day: z.string().transform(Number),
    month: z.string().transform(Number),
    birthYear: z.number().nullable(),
  });

  const data = birthdaySchema.parse({
    name: formData.get('name'),
    day: formData.get('day'),
    month: formData.get('month'),
    birthYear: formData.has('birthYear') ? Number(formData.get('birthYear')) : null,
  });

  const { name, day, month, birthYear } = data;

  if (birthYear) {
    const m = moment(`${birthYear}-${month}-${day}`, 'YYYY-MM-DD');
    if (!m.isValid()) {
      throw new Error('Invalid date');
    }
  } else {
    if (day < 1 || day > 31 || month < 1 || month > 12) {
      throw new Error('Invalid date');
    }
  }

  if (birthdateId) {
    await prisma.birthdate.update({
      where: { id: birthdateId },
      data: { name: name, day: day, month: month, birthYear: birthYear },
    });
  } else {
    await prisma.birthdate.create({
      data: { id: generateBase64ID(), name: name, day: day, month: month, birthYear: birthYear },
    });
  }

  revalidatePath('/');
  redirect('/');
}

export async function deleteBirthday(birthdateId: string) {
  await prisma.birthdate.delete({
    where: { id: birthdateId },
  });

  revalidatePath('/');
  redirect('/');
}
