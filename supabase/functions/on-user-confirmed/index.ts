import { serve } from 'std/server';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { payload } = await req.json();
  if (payload.record.email_confirmed_at) {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const { error } = await supabase.from('users').insert([
      {
        id: payload.record.id,
        email: payload.record.email,
        username: payload.record.user_metadata?.username,
      },
    ]);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  return new Response('OK', { status: 200 });
});
