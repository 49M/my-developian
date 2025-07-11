import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { prompt_id: string } }) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const promptId = params.prompt_id;
  const { data: userPrompt, error: promptError } = await supabase
    .from('user_prompts')
    .select('id')
    .eq('id', promptId)
    .eq('user_id', user.id)
    .single();

  if (promptError || !userPrompt) {
    return NextResponse.json({ error: 'prompt not found or unauthorized' }, { status: 403 });
  }

  const { data: aiResponse, error: responseError } = await supabase
    .from('ai_responses')
    .select('*')
    .eq('prompt_id', promptId);

  if (responseError) {
    return NextResponse.json({ error: 'AI response not found' }, { status: 500 });
  }
  return NextResponse.json(aiResponse);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { prompt_id, message } = body;

  const { data, error } = await supabase.from('ai_responses').insert({
    prompt_id: prompt_id,
    message: message,
  });
  if (error) return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
