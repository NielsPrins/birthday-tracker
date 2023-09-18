import BirthdayForm from '@/src/components/birthday-form/birthday-form';
import { notFound } from 'next/navigation';
import getMongoCollection from '@/src/db';
import { BirthdateWithId } from '@/src/database/models/birthdate';
import { ObjectId } from 'mongodb';

async function getBirthdate(birthdateId: string): Promise<BirthdateWithId | null> {
  const birthdatesCollection = await getMongoCollection('birthdates');
  const birthdates = await birthdatesCollection
    .aggregate<BirthdateWithId>([
      { $match: { _id: new ObjectId(birthdateId) } },
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

  return birthdates[0] ?? null;
}

interface EditPageProps {
  params: { birthdateId: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const birthdate = await getBirthdate(params.birthdateId);
  if (!birthdate) {
    notFound();
  }

  return (
    <main>
      <h1>Edit birthday</h1>

      <BirthdayForm birthdate={birthdate}></BirthdayForm>
    </main>
  );
}
