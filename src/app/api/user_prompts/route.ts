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
        'Hands-on projects',
        'Structured tutorials',
        'Readng/writing',
        'Videos',
        'Peer/Community learning + growth',
        'Guided Coaching/AI tutors',
      ]),
      z.boolean()
    ),
  });
  let validated;
  console.log(body);
  try {
    validated = schema.parse({
      goal_type: body.goalType,
      end_result: body.endResult,
      experience_lvl: body.selectedLVL,
      starting_point: body.startPoint,
      commit_time: body.commitTime.trim(),
      due_date: body.date ? new Date(body.date).toISOString() : '',
      learning_styles: body.learningStyles,
    });
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
