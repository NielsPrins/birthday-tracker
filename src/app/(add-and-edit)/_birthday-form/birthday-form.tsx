'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './birthday-form.module.css';
import { addOrEditBirthday, deleteBirthday } from '@/src/app/(add-and-edit)/_birthday-form/actions';
import { BirthdayWithId } from '@/src/database/models/birthday';
import { isMobile } from '@/src/functions/is-mobile';

interface FormProps {
  birthday?: BirthdayWithId;
}

export default function BirthdayForm(props: FormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.birthday?.id === undefined && nameInputRef.current && !isMobile()) {
      nameInputRef.current.focus();
    }
  }, [props.birthday?.id]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target as HTMLFormElement);

    addOrEditBirthday(formData, props.birthday?.id)
      .then()
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  function deleteBirthdayClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!showConfirmDelete) {
      e.currentTarget.blur();

      setTimeout(() => {
        setShowConfirmDelete(true);

        setTimeout(() => {
          setShowConfirmDelete(false);
        }, 1750);
      }, 750);
    } else {
      deleteConfirmBirthdayClick();
    }
  }

  function deleteConfirmBirthdayClick() {
    if (loading) return;

    const birthdayId = props.birthday?.id;
    if (!birthdayId) return;

    setLoading(true);
    setError(false);

    deleteBirthday(birthdayId)
      .then()
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div>Something went wrong.</div>}

      <input type='text' placeholder='Name' name='name' ref={nameInputRef} defaultValue={props.birthday?.name} />
      <div className={styles.dayAndMonthContainer}>
        <input
          className={styles.dayAndMonthInput}
          type='number'
          pattern='[0-9]*'
          placeholder='Day'
          name='day'
          autoCapitalize='words'
          defaultValue={props.birthday?.day}
        />
        <input
          className={styles.dayAndMonthInput}
          type='number'
          pattern='[0-9]*'
          placeholder='Month'
          name='month'
          defaultValue={props.birthday?.month}
        />
      </div>
      <input
        type='number'
        pattern='[0-9]*'
        placeholder='Birth year'
        name='birthYear'
        defaultValue={props.birthday?.birthYear ?? undefined}
      />

      <button type='submit' className='fill'>
        {props.birthday ? 'Save' : 'Add'}
      </button>

      {props.birthday && (
        <button onClick={deleteBirthdayClick} className={`danger ${showConfirmDelete ? 'dangerConfirm' : ''}`}>
          {!showConfirmDelete ? 'Delete' : 'Click to confirm deletion'}
        </button>
      )}
    </form>
  );
}
