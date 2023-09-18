import getMongoCollection from '@/src/db';
import { redirect } from 'next/navigation';
import Setting from '@/src/database/models/setting';
import Form from '@/src/app/(auth)/register/form';

export default async function RegisterPage() {
  const settingsCollection = await getMongoCollection('settings');
  const loginPasswordHashSetting = await settingsCollection.findOne<Setting>({ key: 'loginPasswordHash' });
  if (loginPasswordHashSetting) {
    redirect('/login');
  }

  return (
    <main>
      <h1>Register</h1>

      <div>Before we can get started, please enter a password.</div>

      <Form></Form>
    </main>
  );
}
