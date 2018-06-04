import { flatten } from 'lodash';
import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';
import { EUnifiedStatus, TUnifiedResponse } from './TUnifiedResponse';

export function determine_unified_response(/*schema_response: TSchemaResponse,*/ edge_responses: TStandardEdgeResponse[]): TUnifiedResponse {
  const statuses = edge_responses.map(e => e.status);
  const messages = flatten(edge_responses.map(e => e.messages));

  const any_red = statuses.includes(EStandardEdgeStatus.Red);
  const blue_and_green = statuses.every(s => [EStandardEdgeStatus.Green, EStandardEdgeStatus.Blue].includes(s));
  const all_green = statuses.every(s => s === EStandardEdgeStatus.Green);

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
