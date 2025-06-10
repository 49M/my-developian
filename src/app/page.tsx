'use client';
import { signOut } from './(auth)/logout/actions';

export default function Home() {
  return (
    <div>
      <div className=''>Hello World!</div>
      <button onClick={() => signOut()} className='border'>
        Sign Out
      </button>
    </div>
  );
}
