import { cohere } from '@/utils/cohere';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    messages,
  });
  console.log(response);
  return NextResponse.json({ messages: response.message.content });
}
