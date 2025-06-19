'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import validateInput from '../ValidateInput';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = validateInput(formData);
  if ('error' in data) {
    return data;
  }

  const { error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: data.username ? { username: data.username } : {},
    },
  });
  if (authError) {
    return { error: 'Sign-up failed. Please check your credentials' };
  }
  revalidatePath('/', 'layout');
  redirect('/confirm-email');
}
