'use client';

import { useEffect, useState } from 'react';
import { signOut } from './(auth)/logout/actions';
import { UsersInTable } from '@/utils/UsersInTable';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';

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
    <div className=''>
      <TopBar
        name={
          user?.user_metadata.username.charAt(0).toUpperCase() +
            user?.user_metadata.username.slice(1) || 'Guest'
        }
      />
      <h1 className='font-manrope mt-[40px] flex justify-center text-[45px] font-bold'>
        Your Ultimate Path from&nbsp;<b>0</b>&nbsp;to&nbsp;<b>100</b>
      </h1>
      <h1 className='text-xl font-bold'></h1>
    </div>
  );
}
