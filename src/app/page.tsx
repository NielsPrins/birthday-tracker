import BirthdaysOverview from '@/src/app/birthdays-overview';
import { BirthdateWithId } from '@/src/database/models/birthdate';
import getMongoCollection from '@/src/db';

async function getBirthdays() {
  const today = new Date();

  const birthdatesCollection = await getMongoCollection('birthdates');

  const birthdatesThisYear = await birthdatesCollection
    .aggregate<BirthdateWithId>([
      {
        $match: {
          $or: [
            { month: { $gt: today.getUTCMonth() + 1 } },
            { month: { $gte: today.getUTCMonth() + 1 }, day: { $gte: today.getUTCDate() } },
          ],
        },
      },
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
        },
      },
    ])
    .sort({ month: 1, day: 1 })
    .toArray();

  const birthdatesNextYear = await birthdatesCollection
    .aggregate<BirthdateWithId>([
      {
        $match: {
          $or: [
            { month: { $lt: today.getUTCMonth() + 1 } },
            { month: { $lte: today.getUTCMonth() + 1 }, day: { $lt: today.getUTCDate() } },
          ],
        },
      },
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
        },
      },
    ])
    .sort({ month: 1, day: 1 })
    .toArray();

  return [...birthdatesThisYear, ...birthdatesNextYear];
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
