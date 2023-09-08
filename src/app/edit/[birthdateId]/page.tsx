import { prisma } from '@/src/db';
import BirthdayForm from '@/src/components/birthday-form/birthday-form';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: { birthdateId: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const birthdate = await prisma.birthdate.findUnique({ where: { id: params.birthdateId } });
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
