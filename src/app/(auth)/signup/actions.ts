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

  const { error: authError, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: data.username ? { username: data.username } : {},
    },
  });
  if (authError) {
    return { error: 'Sign-up failed. Please check your credentials' };
  }
  // const userId = authData?.user?.id;
  // const { error: insertError } = await supabase.from('users').insert({
  //   id: userId,
  //   email: data.email,
  //   username: data.username,
  // });
  // if (insertError) {
  //   console.log(insertError);
  //   return { error: 'Failed to save user' };
  // }
  revalidatePath('/', 'layout');
  redirect('/confirm-email');
}
