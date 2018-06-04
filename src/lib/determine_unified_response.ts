import { flatten } from 'lodash';
import { EEdgeStatus, TEdgeResponse } from './TEdgeResponse';
import { EUnifiedStatus, TUnifiedResponse } from './TUnifiedResponse';

export function determine_unified_response(/*schema_response: TSchemaResponse,*/ edge_responses: TEdgeResponse[]): TUnifiedResponse {
  const statuses = edge_responses.map(e => e.status);
  const messages = flatten(edge_responses.map(e => e.messages));

  const any_red = statuses.includes(EEdgeStatus.Red);
  const blue_and_green = statuses.every(s => [EEdgeStatus.Green, EEdgeStatus.Blue].includes(s));
  const all_green = statuses.every(s => s === EEdgeStatus.Green);

  // if any Red edges, then Red unified
  if (any_red) {
    return {
      messages,
      status: EUnifiedStatus.Red
    };
  }

  // if any Blue edges, and rest Green edges, then Green unified
  if (blue_and_green) {
    return {
      messages,
      status: EUnifiedStatus.Green
    };
  }

  // if all Green edges, then Green unified
  if (all_green) {
    return {
      messages,
      status: EUnifiedStatus.Green
    };
  }

  return {
    messages: ['Unknown Unified Status result', ...messages],
    status: EUnifiedStatus.Red
  };
}