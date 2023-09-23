'use client';

import React, { useRef, useState } from 'react';
import styles from './birthday-form.module.css';
import { addOrEditBirthday, deleteBirthday } from '@/src/components/birthday-form/actions';
import { BirthdayWithId } from '@/src/database/models/birthday';

interface FormProps {
  birthday?: BirthdayWithId;
}

export default function BirthdayForm(props: FormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputMonth = useRef<HTMLInputElement>(null);
  const inputBirthYear = useRef<HTMLInputElement>(null);
  const saveButton = useRef<HTMLButtonElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await addOrEditBirthday(formData, props.birthday?.id);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  async function deleteBirthdayClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (loading) return;

    const birthdayId = props.birthday?.id;
    if (!birthdayId) return;

    setLoading(true);
    setError(false);

    try {
      await deleteBirthday(birthdayId);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  function inputKeyup(e: React.KeyboardEvent<HTMLInputElement>, input: 'day' | 'month' | 'birthYear') {
    if (!Number(e.key)) return;
    const eventTarget = e.target as HTMLInputElement;
    const value = Number(eventTarget.value);
    const valueLength = eventTarget.value.length;

    if (input === 'day') {
      if (valueLength === 2 || (valueLength < 2 && value > 3)) {
        inputMonth.current?.select();
      }
    } else if (input === 'month') {
      if (valueLength === 2 || (valueLength < 2 && value > 1)) {
        inputBirthYear.current?.select();
      }
    } else if (input === 'birthYear') {
      if (valueLength === 4) {
        saveButton.current?.focus();
      }
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div>Something went wrong.</div>}

      <input type='text' placeholder='Name' name='name' autoFocus defaultValue={props.birthday?.name} />
      <div className={styles.dayAndMonthContainer}>
        <input
          className={styles.dayAndMonthInput}
          type='number'
          pattern='[0-9]*'
          placeholder='Day'
          name='day'
          defaultValue={props.birthday?.day}
          onKeyUp={(e) => inputKeyup(e, 'day')}
        />
        <input
          ref={inputMonth}
          className={styles.dayAndMonthInput}
          type='number'
          pattern='[0-9]*'
          placeholder='Month'
          name='month'
          defaultValue={props.birthday?.month}
          onKeyUp={(e) => inputKeyup(e, 'month')}
        />
      </div>
      <input
        ref={inputBirthYear}
        type='number'
        pattern='[0-9]*'
        placeholder='Birth year'
        name='birthYear'
        defaultValue={props.birthday?.birthYear ?? undefined}
        onKeyUp={(e) => inputKeyup(e, 'birthYear')}
      />

      <button ref={saveButton} type='submit' className='fill'>
        {props.birthday ? 'Save' : 'Add'}
      </button>

      {props.birthday && (
        <button onClick={deleteBirthdayClick} className={styles.deleteButton}>
          Delete
        </button>
      )}
    </form>
  );
}
