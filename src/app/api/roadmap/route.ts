import { NextResponse, NextRequest } from 'next/server';
import { roadmapGraph } from '@/lib/langgraph/graphs/roadmapGraph';
import type { GoalInputProps } from '@/types';

export async function POST(req: NextRequest) {
  const input: GoalInputProps = await req.json();
  try {
    const roadmap = await roadmapGraph(input);
    return NextResponse.json({ roadmap: roadmap });
  } catch (err) {
    console.error('Failed to generate roadmap:', err);
    return NextResponse.json({ error: 'Roadmap generation failure', status: 500 });
  }
}
