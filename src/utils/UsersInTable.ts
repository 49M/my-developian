import { createClient } from '@/utils/supabase/client';

type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export async function UsersInTable(user: SupabaseUser) {
  if (!user) return;

  const supabase = createClient(); // Use your app's client

  const { data, error } = await supabase.from('users').select('id').eq('id', user.id).single();
  console.log('data:', data);

  if (!data) {
    console.log('Inserting new user');
    const { data: insertData, error: insertError } = await supabase.from('users').insert([
      {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || null,
      },
    ]);

    if (insertError) {
      console.error('Insert error:', insertError);
    } else {
      console.log('User inserted successfully:', insertData);
    }
  }
}
