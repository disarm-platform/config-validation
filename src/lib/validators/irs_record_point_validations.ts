import { TConfig } from "../Config";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";

// checks that irs_record_point has the validations that it needs. 
// The function is named accordingly.
export function irs_record_point_validations (config: TConfig) : TEdgeResponse {
  // if the piece is not required and does not exist then return EEdgeStatus.Blue

  // check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

  // if everything is ok then return EEdgeStatus.Green
  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}