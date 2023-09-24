'use client';

import { useState } from 'react';
import styles from '@/src/app/_birthday-overview/birthday-overview.module.css';
import Link from 'next/link';
import { BirthdayWithId } from '@/src/database/models/birthday';
import getNewAge from '@/src/functions/get-new-age';
import getDaysUntilBirthday from '@/src/functions/get-days-until-birthday';

type Props = {
  birthdays: BirthdayWithId[];
};

export default function BirthdaysOverview(props: Props) {
  const [search, setSearch] = useState('');

  const birthdays = props.birthdays.map((birthday) => {
    const matchesSearch = birthday.name.toLowerCase().includes(search.toLowerCase());
    return {
      ...birthday,
      hidden: !matchesSearch,
    };
  });

  return (
    <>
      <div className={styles.headerContainer}>
        <h1>Birthdays</h1>
        <Link href='settings' className={`button ${styles.settingsButton}`}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M9.95401 2.2106C11.2876 1.93144 12.6807 1.92263 14.0449 2.20785C14.2219 3.3674 14.9048 4.43892 15.9997 5.07103C17.0945 5.70313 18.364 5.75884 19.4566 5.3323C20.3858 6.37118 21.0747 7.58203 21.4997 8.87652C20.5852 9.60958 19.9997 10.736 19.9997 11.9992C19.9997 13.2632 20.5859 14.3902 21.5013 15.1232C21.29 15.7636 21.0104 16.3922 20.6599 16.9992C20.3094 17.6063 19.9049 18.1627 19.4559 18.6659C18.3634 18.2396 17.0943 18.2955 15.9997 18.9274C14.9057 19.559 14.223 20.6294 14.0453 21.7879C12.7118 22.067 11.3187 22.0758 9.95443 21.7906C9.77748 20.6311 9.09451 19.5595 7.99967 18.9274C6.90484 18.2953 5.63539 18.2396 4.54272 18.6662C3.61357 17.6273 2.92466 16.4164 2.49964 15.1219C3.41412 14.3889 3.99968 13.2624 3.99968 11.9992C3.99968 10.7353 3.41344 9.60827 2.49805 8.87524C2.70933 8.23482 2.98894 7.60629 3.33942 6.99923C3.68991 6.39217 4.09443 5.83576 4.54341 5.33257C5.63593 5.75881 6.90507 5.703 7.99967 5.07103C9.09364 4.43942 9.7764 3.3691 9.95401 2.2106ZM11.9997 14.9992C13.6565 14.9992 14.9997 13.6561 14.9997 11.9992C14.9997 10.3424 13.6565 8.99923 11.9997 8.99923C10.3428 8.99923 8.99967 10.3424 8.99967 11.9992C8.99967 13.6561 10.3428 14.9992 11.9997 14.9992Z'></path>
          </svg>
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input className={styles.search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search' autoFocus />
        <Link href='add' className={`button ${styles.addButton}`}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z'></path>
          </svg>
        </Link>
      </div>

      {birthdays.length === 0 && <div className={styles.noBirthdays}>No birthdays yet? Start by creating one using the add button!</div>}

      {birthdays.length > 0 && (
        <div>
          {birthdays.map((birthday) => {
            const newAge = getNewAge(birthday);
            const daysUntilBirthday = getDaysUntilBirthday(birthday);

            return (
              <div key={birthday.id} className={`${styles.birthdayContainer} ${birthday.hidden ? styles.hidden : ''}`}>
                <div className={styles.birthdayContainerContent}>
                  <Link href={`edit/${birthday.id}`} className={styles.birthday}>
                    <div>
                      <div className={styles.birthdayName}>{birthday.name}</div>
                      {newAge && <div>{newAge} years</div>}
                    </div>
                    <div>{daysUntilBirthday === 0 ? 'Today' : `${daysUntilBirthday} days`}</div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
