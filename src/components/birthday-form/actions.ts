'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import moment from 'moment';
import { revalidatePath } from 'next/cache';
import getMongoCollection from '@/src/db';
import { ObjectId } from 'mongodb';

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

  const birthdatesCollection = await getMongoCollection('birthdates');
  await birthdatesCollection.findOneAndUpdate(
    { _id: new ObjectId(birthdateId) },
    { $set: { name: name, day: day, month: month, birthYear: birthYear } },
    { upsert: true }
  );

  revalidatePath('/');
  redirect('/');
}

export async function deleteBirthday(birthdateId: string) {
  const birthdatesCollection = await getMongoCollection('birthdates');
  await birthdatesCollection.deleteOne({ _id: new ObjectId(birthdateId) });

  revalidatePath('/');
  redirect('/');
}
