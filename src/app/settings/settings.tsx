'use client';

import { deleteTokenCookie, resetCalendarToken, resetPassword } from '@/src/app/settings/actions';
import React, { useState } from 'react';

type Props = {
  calendarUrl: string;
};

export default function Settings(props: Props) {
  const [dangerConfirmationState, setDangerConfirmationState] = useState<null | 'calendar-token' | 'password'>(null);

  let setDangerStateTimeout: ReturnType<typeof setTimeout> | null = null;
  let resetDangerStateTimeout: ReturnType<typeof setTimeout> | null = null;

  const calendarUrlInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const logoutClick = async () => {
    await deleteTokenCookie();
  };

  const resetClick = (e: React.MouseEvent<HTMLButtonElement>, type: 'calendar-token' | 'password') => {
    if (dangerConfirmationState !== type) {
      e.currentTarget.blur();

      setDangerConfirmationState(null);
      if (setDangerStateTimeout) clearInterval(setDangerStateTimeout);
      if (resetDangerStateTimeout) clearInterval(resetDangerStateTimeout);

      setDangerStateTimeout = setTimeout(() => {
        setDangerConfirmationState(type);

        resetDangerStateTimeout = setTimeout(() => {
          setDangerConfirmationState(null);
        }, 1750);
      }, 750);
    } else {
      if (type == 'calendar-token') {
        resetCalendarToken();
      } else if (type == 'password') {
        resetPassword();
      }
    }
  };

  return (
    <>
      <h1>Settings</h1>

      <div>Show your birthdays in your calendar app by connecting birthday-tracker using the following URL.</div>

      <input defaultValue={props.calendarUrl} readOnly onClick={calendarUrlInputClick}></input>

      <hr />

      <button onClick={logoutClick} className={'fill'}>
        Logout
      </button>

      <button
        onClick={(e) => resetClick(e, 'calendar-token')}
        className={`danger ${dangerConfirmationState === 'calendar-token' ? 'dangerConfirm' : ''}`}
      >
        {dangerConfirmationState !== 'calendar-token' ? 'Reset calendar token' : 'Confirm resetting the calendar token'}
      </button>

      <button
        onClick={(e) => resetClick(e, 'password')}
        className={`danger ${dangerConfirmationState === 'password' ? 'dangerConfirm' : ''}`}
      >
        {dangerConfirmationState !== 'password' ? 'Reset password' : 'Confirm password reset'}
      </button>
    </>
  );
}
