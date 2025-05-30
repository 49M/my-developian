'use client';
import { useState } from 'react';
import { login, signup } from './actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    action: 'login' | 'signup'
  ) {
    e.preventDefault();
    setError(null);
    let formData: FormData;
    if ('currentTarget' in e && e.currentTarget instanceof HTMLFormElement) {
      formData = new FormData(e.currentTarget);
    } else {
      const form = e.currentTarget.closest('form');
      if (!form) return;
      formData = new FormData(form);
    }
    const result = action === 'login' ? await login(formData) : await signup(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <form onSubmit={(e) => handleSubmit(e, 'login')} className='flex flex-col'>
        <div>
          <button type='submit'>Log in</button>
          <button type='button' onClick={(e) => handleSubmit(e, 'signup')}>
            Sign up
          </button>
        </div>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' required />
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password' required />
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </form>
    </div>
  );
}
