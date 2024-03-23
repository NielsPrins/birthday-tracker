import BirthdayForm from '@/src/app/(add-and-edit)/_birthday-form/birthday-form';
import { notFound } from 'next/navigation';
import getMongoCollection from '@/src/database/db';
import { BirthdayWithId } from '@/src/database/models/birthday';
import { ObjectId } from 'mongodb';

async function getBirthday(birthdayId: string): Promise<BirthdayWithId | null> {
  const birthdaysCollection = await getMongoCollection('birthdays');
  const results = await birthdaysCollection
    .aggregate<BirthdayWithId>([
      { $match: { _id: new ObjectId(birthdayId) } },
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
    .toArray();

  if (results.length === 0) {
    return null;
  }

  return results[0];
}

interface EditPageProps {
  params: { birthdayId: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const birthday = await getBirthday(params.birthdayId);
  if (!birthday) {
    notFound();
  }

  return (
    <main>
      <h1>Edit birthday</h1>

      <BirthdayForm birthday={birthday}></BirthdayForm>
    </main>
  );
}
