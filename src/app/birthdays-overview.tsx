'use client';

import { useState } from 'react';
import styles from '@/src/app/page.module.css';
import { daysUntilBirthday, getNewAge } from '@/src/app/birthdays-overview-functions';
import { Birthdate } from '@prisma/client';

type Props = {
  birthdates: Birthdate[];
};

export default function BirthdaysOverview(props: Props) {
  const [search, setSearch] = useState('');

  const birthdays = props.birthdates.filter((birthday) => {
    return birthday.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className={styles.searchContainer}>
        <input className={styles.search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search' autoFocus />
        <button className={styles.addButton}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z'></path>
          </svg>
        </button>
      </div>

      {birthdays.map((birthday) => {
        const newAge = getNewAge(birthday);

        return (
          <div key={birthday.id} className={styles.birthday}>
            <div>
              <div className={styles.birthdayName}>{birthday.name}</div>
              {newAge && <div>{newAge} years</div>}
            </div>
            <div>{daysUntilBirthday(birthday)} days</div>
          </div>
        );
      })}
    </>
  );
}
