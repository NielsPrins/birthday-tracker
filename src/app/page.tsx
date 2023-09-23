import BirthdaysOverview from '@/src/app/_birthday-overview/birthdays-overview';
import { getBirthdays } from '@/src/app/get-birthdays';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const birthdays = await getBirthdays();

  return (
    <main>
      <BirthdaysOverview birthdays={birthdays}></BirthdaysOverview>
    </main>
  );
}
