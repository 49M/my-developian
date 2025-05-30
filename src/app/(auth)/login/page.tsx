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
    <div className='flex h-screen w-screen items-center justify-center font-roboto'>
      <form onSubmit={(e) => handleSubmit(e, 'login')} className='flex flex-col'>
        <div className='flex h-[30px] flex-row space-x-5'>
          <button type='submit' className='w-[100px] rounded-2xl border border-black'>
            Log in
          </button>
          <button
            type='button'
            onClick={(e) => handleSubmit(e, 'signup')}
            className='w-[100px] rounded-2xl border border-black'
          >
            Sign up
          </button>
        </div>
        <label htmlFor='email' className='text-blue-500'>
          Email:
        </label>
        <input type='email' required className='border' />
        <label htmlFor='password'>Password:</label>
        <input type='password' required />
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </form>
    </div>
  );
}
