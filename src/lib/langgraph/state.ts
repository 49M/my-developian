import { z } from 'zod';
import type { GoalInputProps } from '@/types';
import { ChatMessage } from '@langchain/core/messages';

export const roadmapStateSchema = z.object({
  goalInput: z.custom<GoalInputProps>(),
  prompt: z.custom<ChatMessage>(),
  roadmap: z.string().optional(),
});

export type RoadmapState = z.infer<typeof roadmapStateSchema>;
