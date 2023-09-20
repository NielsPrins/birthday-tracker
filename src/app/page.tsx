import BirthdaysOverview from '@/src/app/birthdays-overview';
import { BirthdayWithId } from '@/src/database/models/birthday';
import getMongoCollection from '@/src/db';

export const dynamic = 'force-dynamic';

async function getBirthdays() {
  const today = new Date();

  const birthdaysCollection = await getMongoCollection('birthdays');

  return await birthdaysCollection
    .aggregate<BirthdayWithId>([
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

export default async function Home() {
  const birthdays = await getBirthdays();

  return (
    <main>
      <h1>Birthdays</h1>

      <BirthdaysOverview birthdays={birthdays}></BirthdaysOverview>
    </main>
  );
}
