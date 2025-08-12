import { z } from 'zod';
import type { GoalInputProps } from '@/types';
import { ChatMessageV2 } from 'cohere-ai/api';

export const roadmapStateSchema = z.object({
  goalInput: z.custom<GoalInputProps>(),
  prompt: z.custom<ChatMessageV2>(),
  roadmap: z.string().optional(),
});
