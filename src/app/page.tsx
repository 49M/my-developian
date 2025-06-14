'use client';

import { useEffect, useState } from 'react';
import { signOut } from './(auth)/logout/actions';
import { UsersInTable } from '@/utils/UsersInTable';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) {
        router.push('/login');
      } else {
        setUser(data.user);
        UsersInTable(data.user);
      }
    });
  }, [router]);

  return (
    <div className='p-8'>
      <h1 className='mt-[20px] flex justify-center font-roboto text-[45px] font-semibold'>
        My Developian
      </h1>
      <h1 className='text-xl font-bold'>{user ? `Welcome, ${user.email}` : 'Hello, Guest'}</h1>
      {user && (
        <button onClick={() => signOut()} className='mt-4 rounded border px-4 py-2'>
          Sign Out
        </button>
      )}
    </div>
  );
}
