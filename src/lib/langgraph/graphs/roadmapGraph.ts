// import { TavilySearch } from '@langchain/tavily';
// import { StateGraph } from '@langchain/langgraph';
// import { cohere } from '@/utils/cohere';
// import { RunnableLambda } from '@langchain/core/runnables';

// type RoadmapState = {
//   userInput: string;
//   searchResults?: string;
//   strategy?: string;
//   outline?: string;
//   tasks?: string;
//   schedule?: string;
//   finalOutput?: string;
// };

// const webSearch = RunnableLambda.from(async (state: RoadmapState) => {
//   const search = new TavilySearch();
//   const query = ``;
// });

// -----------------------------------------------------------------------------------

// import { promptNode } from '../nodes/promptNode';
// import { cohereLLMNode } from '../nodes/cohereLLMNode';
// import { GoalInputProps } from '@/types';

// export async function roadmapGraph(input: GoalInputProps): Promise<string> {
//   const prompt = await promptNode(input);
//   const roadmap = await cohereLLMNode(prompt);
//   return roadmap;
// }

// ------------------------------------------------------------------------------------

import { StateGraph } from '@langchain/langgraph';
import { roadmapStateSchema } from '../state';
import { generatePromptNode } from '../nodes/generatePromptNode';
import { generateRoadmapNode } from '../nodes/generateRoadmapNode';
import { GoalInputProps } from '@/types';

const graph = new StateGraph(roadmapStateSchema)
  .addNode('generatePrompt', generatePromptNode)
  .addNode('generateRoadmap', generateRoadmapNode)
  .addEdge('__start__', 'generatePrompt')
  .addEdge('generatePrompt', 'generateRoadmap')
  .addEdge('generateRoadmap', '__end__');

export async function roadmapGraph(input: GoalInputProps) {
  const compiledGraph = graph.compile();
  const finalState = await compiledGraph.invoke({ goalInput: input });
  return finalState.roadmap;
}
