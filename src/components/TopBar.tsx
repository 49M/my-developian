'use client';
import { signOut } from '../app/(auth)/logout/actions';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  name: string;
  mode: string;
  changeMode: (mode: string) => void;
}

export default function TopBar({ name, mode, changeMode }: TopBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownMenuCSS =
    'cursor-pointer px-4 py-[7px] font-manrope hover:bg-gray-200/70 hover:border-gray-300 hover:border rounded-xl';
  return (
    <div
      className={`w-full border-b px-3 pb-3 pt-4 ssm:px-6 ${mode === 'light' ? 'border-black text-black' : 'border-white text-white'}`}
    >
      <div className='flex w-full justify-between'>
        <div className='flex'>
          <h3
            className={`mr-4 select-none border-r ssm:mr-8 ${mode === 'light' ? 'border-black' : 'border-white'} pr-4 font-manrope text-[18px] font-bold ssm:pr-8`}
          >
            My Developian
          </h3>
          <div className='hidden space-x-6 pt-[3px] smd:flex'>
            <h3
              className='cursor-pointer font-manrope'
              onClick={() => router.push('/pages/roadmaps')}
            >
              Roadmaps
            </h3>
            <h3
              className='cursor-pointer font-manrope'
              onClick={() => router.push('/pages/calender')}
            >
              Calender
            </h3>
            <h3
              className='cursor-pointer font-manrope'
              onClick={() => router.push('/pages/progress')}
            >
              Progress
            </h3>
          </div>
          <button
            className='flex flex-col justify-center space-y-[4px] smd:hidden'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle navigation'
          >
            <span className={`h-[2.5px] w-[22px] ${mode === 'light' ? 'bg-black' : 'bg-white'}`} />
            <span className={`h-[2.5px] w-[22px] ${mode === 'light' ? 'bg-black' : 'bg-white'}`} />
            <span className={`h-[2.5px] w-[22px] ${mode === 'light' ? 'bg-black' : 'bg-white'}`} />
          </button>
        </div>
        <div className='absolute left-[60%] mt-[4px] -translate-x-[60%] xl:left-1/2 xl:-translate-x-1/2'>
          <h3 className='hidden select-none font-manrope text-[17px] font-medium lg:flex'>
            Welcome, {name}
          </h3>
        </div>
        <div className='flex space-x-2 ssm:space-x-5'>
          {mode === 'dark' && (
            <svg
              className='mt-[5.5px] h-6 w-6 cursor-pointer text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              onClick={() => changeMode('light')}
            >
              <path
                stroke='white'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
              />
            </svg>
          )}
          {mode === 'light' && (
            <svg
              className='mt-[5.5px] h-6 w-6 cursor-pointer text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              onClick={() => changeMode('dark')}
            >
              <path
                stroke='black'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z'
              />
            </svg>
          )}
          <div className='h-[32px] w-[32px] cursor-pointer select-none overflow-hidden rounded-full border'>
            <Image
              src='https://jfl3tpwedr.ufs.sh/f/YBOUo9T9E7zyTts7rXNxDPOQlBuyG45sZF1wnrfoKHJvXT9U'
              alt='Uploaded Image'
              width={40}
              height={60}
            />
          </div>
          <button
            onClick={() => signOut()}
            className={`cursor-pointer select-none rounded border px-[5px] text-center font-manrope text-[14px] ${mode === 'light' ? 'border-black hover:bg-white/70' : 'border-white hover:bg-gray-800/90'}`}
          >
            Sign Out
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          className={`absolute mt-[12px] flex w-[93%] flex-col rounded-xl smd:hidden ${
            mode === 'light'
              ? 'border-black bg-white/95 text-black'
              : 'border-white bg-gray-900/95 text-white'
          }`}
        >
          <h3 className={dropdownMenuCSS}>Roadmaps</h3>
          <h3 className={dropdownMenuCSS}>Calendar</h3>
          <h3 className={dropdownMenuCSS}>Progress</h3>
        </div>
      )}
    </div>
  );
}
