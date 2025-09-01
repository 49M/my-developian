import { GoalInputProps } from '@/types';
import { HumanMessage } from '@langchain/core/messages';

export function promptNode(data: GoalInputProps): HumanMessage {
  return new HumanMessage(`
User input data:
Goal Type: ${data.goalType}
Desired End Result: ${data.endResult}
User's current skill level / experience time: ${data.selectedLVL}
Users relevent skills and experience related to this goal: ${data.startPoint}
The amount of time (per week) which the user can devote to working towards this goal: ${data.commitTime}
Date: ${data.date ? new Date(data.date).toLocaleDateString() : 'Not specified'}
Learning Styles: ${Object.entries(data.learningStyles)}
Limitations: ${data.limitations}`);
}
