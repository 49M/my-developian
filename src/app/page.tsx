'use client';

import { useEffect, useState } from 'react';
import { UsersInTable } from '@/utils/UsersInTable';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const goalTypeCSS = 'border w-[100px] py-[2px] rounded-md';
  const [mode, setMode] = useState<string>('light');

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
    <div
      className={`${mode === 'light' ? 'bg-custom-light' : 'bg-custom-dark'} min-h-screen w-full bg-cover bg-center bg-no-repeat font-manrope`}
    >
      <TopBar
        name={
          user?.user_metadata.username.charAt(0).toUpperCase() +
            user?.user_metadata.username.slice(1) || 'Guest'
        }
        mode={mode}
        changeMode={setMode}
      />
      <h1 className='mt-[40px] flex justify-center text-[45px] font-bold'>
        Your Ultimate Path from&nbsp;<b>0</b>&nbsp;to&nbsp;<b>100</b>
      </h1>
      <div className='mt-[100px] flex w-full flex-col items-center justify-center'>
        <h3 className='font-medium'>What type of milestone do you want to achieve?</h3>
        <div className='flex space-x-1 rounded-lg border p-1'>
          <button className={goalTypeCSS}>Life</button>
          <button className={goalTypeCSS}>Career</button>
          <button className={goalTypeCSS}>Skill</button>
        </div>
        <form className='mt-[100px] justify-center'>
          <Input className='w-[600px]' />
        </form>
      </div>
      <h1 className='text-xl font-bold'></h1>
    </div>
  );
}
