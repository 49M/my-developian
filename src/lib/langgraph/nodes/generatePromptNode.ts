import { promptNode } from './promptNode';
import type { z } from 'zod';
import { roadmapStateSchema } from '../state';

export async function generatePromptNode(state: z.infer<typeof roadmapStateSchema>) {
  const prompt = promptNode(state.goalInput);
  return { prompt };
}
