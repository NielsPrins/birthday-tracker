import getMongoCollection from '@/src/database/db';
import { redirect } from 'next/navigation';
import Setting from '@/src/database/models/setting';
import Form from '@/src/app/(auth)/login/form';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const settingsCollection = await getMongoCollection('settings');
  const loginPasswordHashSetting = await settingsCollection.findOne<Setting>({ key: 'loginPasswordHash' });
  if (!loginPasswordHashSetting) {
    redirect('/register');
  }

  return (
    <main>
      <h1>Login</h1>

      <Form></Form>
    </main>
  );
}
