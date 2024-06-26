'use client';

import React, { useEffect, useRef, useState } from 'react';
import login from '@/src/app/(auth)/login/login';
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

    login(formData)
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
      <button type='submit' className='fill'>
        Login
      </button>
    </form>
  );
}
