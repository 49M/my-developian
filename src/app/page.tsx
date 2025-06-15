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
  const [mode, setMode] = useState<string>('light');
  const [goalType, setGoalType] = useState<string>('Career');
  const goalTypeCSS = `border w-[100px] py-[2px] rounded-md ${mode === 'light' ? 'border-neutral-600 shadow-sm' : ''}`;

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
      className={`${mode === 'light' ? 'bg-custom-light text-black' : 'bg-custom-dark text-white'} min-h-screen w-full bg-cover bg-center bg-no-repeat font-manrope`}
    >
      <TopBar
        name={
          user?.user_metadata.username.charAt(0).toUpperCase() +
            user?.user_metadata.username.slice(1) || 'Guest'
        }
        mode={mode}
        changeMode={setMode}
      />
      <h1 className='mt-[80px] flex justify-center text-[45px] font-bold'>
        Your Ultimate Path from&nbsp;<b>0</b>&nbsp;to&nbsp;<b>100</b>
      </h1>
      <div className='mt-[100px] flex w-full flex-col items-center justify-center'>
        <h3 className='font-medium'>What type of milestone do you want to achieve?</h3>
        <div
          className={`mt-[15px] flex space-x-1 rounded-lg border p-1 ${mode === 'light' ? 'border-black bg-white/20 shadow-sm' : 'border-gray-300 bg-gray-800/30'}`}
        >
          <button
            className={`${goalTypeCSS} ${goalType === 'Life' ? (mode === 'light' ? 'bg-white/70' : 'border-white bg-gray-800/90') : 'border-gray-400'}`}
            onClick={() => setGoalType('Life')}
          >
            Life
          </button>
          <button
            className={`${goalTypeCSS} ${goalType === 'Career' ? (mode === 'light' ? 'bg-white/70' : 'border-white bg-gray-800/90') : 'border-gray-400'}`}
            onClick={() => setGoalType('Career')}
          >
            Career
          </button>
          <button
            className={`${goalTypeCSS} ${goalType === 'Skill' ? (mode === 'light' ? 'bg-white/70' : 'bg-gray-800/90') : 'border-gray-400'}`}
            onClick={() => setGoalType('Skill')}
          >
            Skill
          </button>
        </div>
        <form className='mt-[50px] justify-center'>
          <h2 className='mb-2'>What end-result do you hope to achieve? (be specific)</h2>
          <Input
            className={`shadow-m w-[600px] ${mode === 'light' ? 'border-black' : 'border-white'}`}
            placeholder='Enter desired outcome'
          />
        </form>
      </div>
      <h1 className='text-xl font-bold'></h1>
    </div>
  );
}
