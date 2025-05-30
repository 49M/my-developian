'use client';
import { useState } from 'react';
import { login, signup } from './actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  // const [login1, setLogin1] = useState(true);

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
    <div className='via-31% flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-600 from-5% via-sky-500 to-emerald-500 to-85%'>
      <h1 className='mx-auto flex justify-center font-roboto text-[55px] font-[700] text-white'>
        Developian
      </h1>
      <div className='mb-[150px] mt-[40px] flex w-screen items-center justify-center font-roboto'>
        <form
          onSubmit={(e) => handleSubmit(e, 'login')}
          className='flex flex-col rounded-xl border border-black p-12 px-20 shadow-lg'
        >
          <div className='flex h-[30px] flex-row space-x-5'>
            <button
              type='submit'
              className='w-[100px] rounded-2xl bg-gray-700 text-white shadow-md hover:bg-gray-500'
              // onClick={() => setLogin1(true)}
            >
              Log in
            </button>
            <button
              type='button'
              onClick={(e) => handleSubmit(e, 'signup')}
              className='w-[100px] rounded-2xl bg-gray-700 text-white shadow-md hover:bg-gray-500'
            >
              Sign up
            </button>
          </div>
          <label htmlFor='email' className='mt-[30px] text-white'>
            Email:
          </label>
          <input type='email' required className='rounded-md border border-black bg-transparent' />
          <label htmlFor='password' className='mt-[15px] text-white'>
            Password:
          </label>
          <input
            type='password'
            required
            className='rounded-md border border-black bg-transparent'
          />
          {error && <p className='mt-2 text-red-500'>{error}</p>}
        </form>
      </div>
    </div>
  );
}
