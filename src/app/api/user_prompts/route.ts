import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data, error } = await supabase.from('user_prompts').select('*').eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch user prompt' }, { status: 500 });
  }
  return NextResponse.json(data);
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
  const schema = z.object({
    goal_type: z.enum(['life', 'career', 'skill']),
    end_result: z.string(),
    success_criteria: z.string(),
    experience_lvl: z.string(),
    starting_point: z.string(),
    commit_time: z.enum([
      '< 1 hr',
      '1 - 5 hrs',
      '5 - 10 hrs',
      '10 - 15 hrs',
      '15 - 20 hrs',
      '20 - 30 hrs',
      '30 - 40 hrs',
      '40 - 60 hrs',
      '60+ hrs',
    ]),
    due_date: z.string(),
    learning_styles: z.record(
      z.enum([
        'hands-on projects',
        'step-by-step tutorials',
        'articles & documentation',
        'video walkthroughs',
        'building with community',
        'AI tutors',
      ]),
      z.boolean()
    ),
  });
  let validated;
  try {
    validated = schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid user prompt data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Invalid user prompt data', details: error },
      { status: 400 }
    );
  }

  const {
    goal_type,
    end_result,
    success_criteria,
    experience_lvl,
    starting_point,
    commit_time,
    due_date,
    learning_styles,
  } = validated;
  const { data, error } = await supabase
    .from('user_prompts')
    .insert({
      user_id: user.id,
      goal_type,
      end_result,
      success_criteria,
      experience_lvl,
      starting_point,
      commit_time,
      due_date,
      learning_styles,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: 'Failed to create user prompt' }, { status: 500 });
  return NextResponse.json({ success: true, prompt_id: data.id, data });
}
