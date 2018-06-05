import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';
import { EUnifiedStatus, TUnifiedResponse } from './TUnifiedResponse';

export function determine_unified_response(edge_responses: TStandardEdgeResponse[]): TUnifiedResponse {
  const edge_statuses = edge_responses.map(e => e.status);
  const edge_messages = edge_responses.map(e => e.message);

  const any_red_edges = edge_statuses.includes(EStandardEdgeStatus.Red);
  const blue_and_green_edges = edge_statuses.every(s => [EStandardEdgeStatus.Green, EStandardEdgeStatus.Blue].includes(s));
  const all_green_edges = edge_statuses.every(s => s === EStandardEdgeStatus.Green);

  // if any Red edges, then Red unified
  if (any_red_edges) {
    return {
      message: 'Failed',
      support_messages: edge_messages,
      status: EUnifiedStatus.Red
    };
  }

  // if any Blue edges, and rest Green edges, then Green unified
  if (blue_and_green_edges) {
    return {
      message: 'Passed with some optional edges',
      support_messages: edge_messages,
      status: EUnifiedStatus.Green
    };
  }

  // if all Green edges, then Green unified
  if (all_green_edges) {
    return {
      message: 'All passed',
      support_messages: edge_messages,
      status: EUnifiedStatus.Green
    };
  }

  return {
    message: 'Unknown Unified Status result',
    support_messages: edge_messages,
    status: EUnifiedStatus.Red
  };
}
