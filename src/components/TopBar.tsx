import { signOut } from '../app/(auth)/logout/actions';
import Image from 'next/image';

interface TopBarProps {
  name: string;
  mode: string;
  changeMode: (mode: string) => void;
}

export default function TopBar({ name, mode, changeMode }: TopBarProps) {
  return (
    <div className='w-full border-b px-6 pb-3 pt-4'>
      <div className='flex w-full justify-between'>
        <div className='flex'>
          <h3 className='mr-8 border-r pr-8 font-manrope text-[18px] font-bold'>My Developian</h3>
          <div className='flex space-x-6 pt-[3px]'>
            <h3 className='font-manrope'>Roadmaps</h3>
            <h3 className='font-manrope'>Calender</h3>
            <h3 className='font-manrope'>Progress</h3>
          </div>
        </div>
        <div className='absolute left-1/2 mt-[4px] -translate-x-1/2'>
          <h3 className='font-manrope text-[17px] font-medium'>Welcome, {name}</h3>
        </div>
        <div className='flex space-x-5'>
          {mode === 'dark' && (
            <svg
              className='h-6 w-6 text-gray-800 dark:text-white'
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
              className='h-6 w-6 text-gray-800 dark:text-white'
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
          <div className='h-[32px] w-[32px] overflow-hidden rounded-full border'>
            <Image
              src='https://jfl3tpwedr.ufs.sh/f/YBOUo9T9E7zyTts7rXNxDPOQlBuyG45sZF1wnrfoKHJvXT9U'
              alt='Uploaded Image'
              width={40}
              height={60}
            />
          </div>
          <button
            onClick={() => signOut()}
            className='rounded border px-[5px] font-manrope text-[14px]'
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
