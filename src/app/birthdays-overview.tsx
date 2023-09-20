'use client';

import { useState } from 'react';
import styles from '@/src/app/birthday-overview.module.css';
import { daysUntilBirthday, getNewAge } from '@/src/app/birthdays-overview-functions';
import Link from 'next/link';
import { BirthdayWithId } from '@/src/database/models/birthday';

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
      <div className={styles.searchContainer}>
        <input className={styles.search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search' autoFocus />
        <Link href='add' className={styles.addButton}>
          <button className={styles.addButton}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z'></path>
            </svg>
          </button>
        </Link>
      </div>

      {birthdays.length === 0 && <div className={styles.noBirthdays}>No birthdays yet? Start by creating one using the add button!</div>}

      {birthdays.map((birthday) => {
        const newAge = getNewAge(birthday);

        return (
          <div key={birthday.id} className={`${styles.birthdayContainer} ${birthday.hidden ? styles.hidden : null}`}>
            <div className={styles.birthdayContainerContent}>
              <Link href={`edit/${birthday.id}`} className={styles.birthday}>
                <div>
                  <div className={styles.birthdayName}>{birthday.name}</div>
                  {newAge && <div>{newAge} years</div>}
                </div>
                <div>{daysUntilBirthday(birthday)} days</div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
