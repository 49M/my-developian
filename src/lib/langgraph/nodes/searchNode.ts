import { TavilySearchAPIRetriever } from '@langchain/community/retrievers/tavily_search_api';
import { RunnableLambda } from '@langchain/core/runnables';
import { RoadmapState } from '../state';

export const searchNode = RunnableLambda.from<RoadmapState, RoadmapState>(async (state) => {
  const retriever = new TavilySearchAPIRetriever({
    apiKey: process.env.TAVILY_API_KEY!,
    k: 5,
    searchDepth: 'advanced',
  });

  const query = `End Result: ${state.goalInput.endResult}, Learning Styles: ${state.goalInput.learningStyles},Limitations: ${state.goalInput.limitations}`;

  const results = await retriever.invoke(
    `For the user goal, use the users learning styles and limitations to find the best sources that help the user achieve their goal, or sources with the best and most practical information on how to maximize chances of achieving the goal. Return a comprehensive report highlighting exact sources which the user can reference aswell as summaries as to what the user can do to achieve the goal in the fastest and most efficient way. \n ${query}`
  );

  return {
    ...state,
    searchResults: results,
  };
});
