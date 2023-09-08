'use client';

import React, { useState } from 'react';
import styles from './birthday-form.module.css';
import { Birthdate } from '@prisma/client';
import addOrEditBirthday from '@/src/components/birthday-form/add-or-edit-birthday';

interface FormProps {
  birthdate?: Birthdate;
}

export default function BirthdayForm(props: FormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await addOrEditBirthday(formData, props.birthdate?.id);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div>Something went wrong.</div>}

      <input type='text' placeholder='Name' name='name' autoFocus defaultValue={props.birthdate?.name} />
      <div className={styles.dayAndMonthContainer}>
        <input className={styles.dayAndMonthInput} type='number' placeholder='Day' name='day' defaultValue={props.birthdate?.day} />
        <input className={styles.dayAndMonthInput} type='number' placeholder='Month' name='month' defaultValue={props.birthdate?.month} />
      </div>
      <input type='number' placeholder='Birth year' name='birthYear' defaultValue={props.birthdate?.birthYear ?? undefined} />

      <button type='submit' className='fill'>
        {props.birthdate ? 'Save' : 'Add'}
      </button>
    </form>
  );
}
