'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod';

function validateInput(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })

  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!result.success) {
    return { error: 'Invalid email or password' }
  }

  return result.data;
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = validateInput(formData);
  if ('error' in data) {
    return data;
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return { error: "Log in failed. Please check your credentials" }
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
    
  const data = validateInput(formData);
    if ('error' in data) {
    return data;
  }

  const { error } = await supabase.auth.signUp(data)
  if (error) {
    return { error: "Sign-up failed. Please check your credentials" }
  }
  revalidatePath('/', 'layout')
  redirect('/')
}