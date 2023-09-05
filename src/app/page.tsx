import { getBirthdays } from "@/src/app/birthdays-overview-functions";
import BirthdaysOverview from "@/src/app/birthdays-overview";

export default async function Home() {
  const birthdays = await getBirthdays();

  return (
    <main>
      <h1>Birthdays</h1>

      <BirthdaysOverview birthdates={birthdays}></BirthdaysOverview>
    </main>
  )
}
