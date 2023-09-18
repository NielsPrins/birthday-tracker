'use client';

import React, { useState } from 'react';
import styles from './birthday-form.module.css';
import { addOrEditBirthday, deleteBirthday } from '@/src/components/birthday-form/actions';
import { BirthdateWithId } from '@/src/database/models/birthdate';

interface FormProps {
  birthdate?: BirthdateWithId;
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

  async function deleteBirthdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (loading) return;

    const birthdateId = props.birthdate?.id;
    if (!birthdateId) return;

    setLoading(true);
    setError(false);

    try {
      await deleteBirthday(birthdateId);
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
        <input
          className={styles.dayAndMonthInput}
          type='number'
          pattern='[0-9]*'
          placeholder='Day'
          name='day'
          defaultValue={props.birthdate?.day}
        />
        <input
          className={styles.dayAndMonthInput}
          type='number'
          pattern='[0-9]*'
          placeholder='Month'
          name='month'
          defaultValue={props.birthdate?.month}
        />
      </div>
      <input
        type='number'
        pattern='[0-9]*'
        placeholder='Birth year'
        name='birthYear'
        defaultValue={props.birthdate?.birthYear ?? undefined}
      />

      <button type='submit' className='fill'>
        {props.birthdate ? 'Save' : 'Add'}
      </button>

      {props.birthdate && (
        <button onClick={deleteBirthdate} className={styles.deleteButton}>
          Delete
        </button>
      )}
    </form>
  );
}
