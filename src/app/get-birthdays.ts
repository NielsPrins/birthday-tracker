'use server';

import getMongoCollection from '@/src/database/db';
import { BirthdayWithIdAndThisYear } from '@/src/database/models/birthday';

export async function getBirthdays(): Promise<BirthdayWithIdAndThisYear[]> {
  const today = new Date();

  const birthdaysCollection = await getMongoCollection('birthdays');

  return await birthdaysCollection
    .aggregate<BirthdayWithIdAndThisYear>([
      {
        $project: {
          _id: 0,
          id: {
            $toString: '$_id',
          },
          name: 1,
          day: 1,
          month: 1,
          birthYear: 1,
          thisYear: {
            $or: [
              { $gt: ['$month', today.getUTCMonth() + 1] },
              { $and: [{ $eq: ['$month', today.getUTCMonth() + 1] }, { $gte: ['$day', today.getUTCDate()] }] },
            ],
          },
        },
      },
    ])
    .sort({ thisYear: -1, month: 1, day: 1 })
    .toArray();
}
