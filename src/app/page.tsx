import BirthdaysOverview from '@/src/app/birthdays-overview';
import { getBirthdays } from '@/src/app/get-birthdays';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const birthdays = await getBirthdays();

  return (
    <main>
      <h1>Birthdays</h1>

      <BirthdaysOverview birthdays={birthdays}></BirthdaysOverview>
    </main>
  );
}
