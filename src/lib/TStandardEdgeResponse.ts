import { TCustomEdgeResponse } from "./TCustomEdgeResponse";

export enum EStandardEdgeStatus {
  Red = 'Red, fails node or edge validation',
  Green = 'Green, passed node and edge validation',
  Blue = 'Blue, not run, node or edge not required'
}

// Edge can only report one result
export interface TStandardEdgeResponse {
  status: EStandardEdgeStatus;
  message: string;
  source_node_name: string;
  target_node_name: string;
  edge_name: string;
  custom_edge_responses: TCustomEdgeResponse[];
  support_messages?: string[]; // TODO: Might want to include all the component responses at some point.
}
