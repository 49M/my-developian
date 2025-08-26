'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import validateInput from '../ValidateInput';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = validateInput(formData);
  if ('error' in data) {
    return data;
  }

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { error: 'Log in failed. Please check your credentials' };
  }
  revalidatePath('/main', 'layout');
  redirect('/main');
}
