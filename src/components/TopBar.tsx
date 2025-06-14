import { signOut } from '../app/(auth)/logout/actions';
import Image from 'next/image';

interface TopBarProps {
  name: string;
}

export default function TopBar({ name }: TopBarProps) {
  return (
    <div className='w-full border-b px-6 pb-3 pt-4'>
      <div className='flex w-full justify-between'>
        <div className='flex'>
          <h3 className='font-manrope mr-8 border-r pr-8 text-[18px] font-bold'>My Developian</h3>
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
            className='font-manrope rounded border px-[5px] text-[14px]'
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
