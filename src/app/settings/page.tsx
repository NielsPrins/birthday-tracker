import getMongoCollection from '@/src/db';
import Setting from '@/src/database/models/setting';
import Settings from '@/src/app/settings/settings';

export const dynamic = 'force-dynamic';

async function getCalendarApiToken() {
  const settingsCollection = await getMongoCollection('settings');
  const calendarApiTokenSetting = await settingsCollection.findOne<Setting>({ key: 'calendarApiToken' });
  return String(calendarApiTokenSetting!.value);
}

export default async function SettingsPage() {
  const calendarApiToken = await getCalendarApiToken();

  return (
    <main>
      <Settings calendarApiToken={calendarApiToken}></Settings>
    </main>
  );
}
