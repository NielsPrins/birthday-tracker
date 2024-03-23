'use client';

import register from '@/src/app/(auth)/register/register';
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from '@/src/functions/is-mobile';

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passwordInputRef.current && !isMobile()) {
      passwordInputRef.current.focus();
    }
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target as HTMLFormElement);

    register(formData)
      .then()
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div>Something went wrong.</div>}

      <input type='password' placeholder='Password' name='password' ref={passwordInputRef} />
      <input type='password' placeholder='Confirm password' name='confirmPassword' />
      <button type='submit' className='fill'>
        Submit
      </button>
    </form>
  );
}
