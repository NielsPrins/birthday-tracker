import getMongoCollection from '@/src/db';
import { redirect } from 'next/navigation';
import Form from '@/src/app/auth/login/form';
import Setting from '@/src/database/models/setting';

export default async function RegisterPage() {
  const settingsCollection = await getMongoCollection('settings');
  const loginPasswordHashSetting = await settingsCollection.findOne<Setting>({ key: 'loginPasswordHash' });
  if (!loginPasswordHashSetting) {
    redirect('/auth/register');
  }

  return (
    <main>
      <h1>Login</h1>

      <Form></Form>
    </main>
  );
}
