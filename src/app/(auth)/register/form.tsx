'use client';

import register from '@/src/app/(auth)/register/register';
import React, { useState } from 'react';

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
      await register(formData);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div>Something went wrong.</div>}

      <input type='password' placeholder='Password' name='password' autoFocus />
      <input type='password' placeholder='Confirm password' name='confirmPassword' />
      <button type='submit' className='fill'>
        Submit
      </button>
    </form>
  );
}