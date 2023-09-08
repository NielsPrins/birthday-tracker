'use client';

import React, { useState } from 'react';
import styles from './add.module.css';
import add from '@/src/app/add/add';

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await add(formData);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div>Something went wrong.</div>}

      <input type='text' placeholder='Name' name='name' autoFocus />
      <div className={styles.dayAndMonthContainer}>
        <input className={styles.dayAndMonthInput} type='number' placeholder='Day' name='day' />
        <input className={styles.dayAndMonthInput} type='number' placeholder='Month' name='month' />
      </div>
      <input type='number' placeholder='Birth year' name='birthYear' />

      <button type='submit' className='fill'>
        Add
      </button>
    </form>
  );
}
