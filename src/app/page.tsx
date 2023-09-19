import BirthdaysOverview from '@/src/app/birthdays-overview';
import { BirthdateWithId } from '@/src/database/models/birthdate';
import getMongoCollection from '@/src/db';

export const dynamic = 'force-dynamic';

async function getBirthdays() {
  const today = new Date();

  const birthdatesCollection = await getMongoCollection('birthdates');

  return await birthdatesCollection
    .aggregate<BirthdateWithId>([
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

      <BirthdaysOverview birthdates={birthdays}></BirthdaysOverview>
    </main>
  );
}
