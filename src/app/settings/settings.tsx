'use client';

import styles from './settings.module.css';

type Props = {
  calendarUrl: string;
};

export default function Settings(props: Props) {
  return (
    <>
      <h1>Settings</h1>
      <div>
        See your birthdays in your agenda app by connecting birthday-tracker using this URL:
        <div className={styles.calendarUrl}>{props.calendarUrl}</div>
      </div>
      <hr />
    </>
  );
}
