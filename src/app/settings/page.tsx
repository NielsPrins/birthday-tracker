import getMongoCollection from '@/src/database/db';
import Setting from '@/src/database/models/setting';
import Settings from '@/src/app/settings/settings';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getCalendarApiToken() {
  const settingsCollection = await getMongoCollection('settings');
  const calendarApiTokenSetting = await settingsCollection.findOne<Setting>({ key: 'calendarApiToken' });
  return String(calendarApiTokenSetting!.value);
}

export default async function SettingsPage() {
  const calendarApiToken = await getCalendarApiToken();

  const url = `${headers().get('x-forwarded-proto') ? 'https://' : 'http://'}${headers().get('host')}`;
  const calendarUrl = new URL(url);
  calendarUrl.pathname = 'calendar';
  calendarUrl.searchParams.set('token', calendarApiToken);

  return (
    <main>
      <Settings calendarUrl={String(calendarUrl)}></Settings>
    </main>
  );
}
