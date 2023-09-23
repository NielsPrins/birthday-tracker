'use client';

import styles from './settings.module.css';
import { deleteTokenCookie } from '@/src/app/settings/actions';

type Props = {
  calendarUrl: string;
};

export default function Settings(props: Props) {
  async function logout() {
    await deleteTokenCookie();
  }

  return (
    <>
      <h1>Settings</h1>
      <div>
        See your birthdays in your agenda app by connecting birthday-tracker using this URL:
        <div className={styles.calendarUrl}>{props.calendarUrl}</div>
      </div>
      <hr />

      <button onClick={logout} className={'fill'}>
        Logout
      </button>
    </>
  );
}
