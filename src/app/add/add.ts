'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/db';
import generateBase64ID from '@/src/generate-base-64-id';
import moment from 'moment';

const schema = z.object({
  name: z.string().min(1),
  day: z.string().transform(Number),
  month: z.string().transform(Number),
  birthYear: z.number().nullable(),
});

export default async function add(formData: FormData) {
  const data = schema.parse({
    name: formData.get('name'),
    day: formData.get('day'),
    month: formData.get('month'),
    birthYear: Number(formData.get('birthYear')) ?? null,
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

  await prisma.birthdate.create({
    data: {
      id: generateBase64ID(),
      name: name,
      day: day,
      month: month,
      birthYear: birthYear,
    },
  });

  redirect('/');
}
