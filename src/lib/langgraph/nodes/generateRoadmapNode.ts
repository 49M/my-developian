import { cohereLLMNode } from './cohereLLMNode';
import type { z } from 'zod';
import { roadmapStateSchema } from '../state';

export async function generateRoadmapNode(state: z.infer<typeof roadmapStateSchema>) {
  const roadmap = await cohereLLMNode(state.prompt);
  return { roadmap: roadmap.content };
}
