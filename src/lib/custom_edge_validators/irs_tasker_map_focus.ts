import { TConfig } from "../config_types/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";



export function irs_tasker_map_focus (config: TConfig) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

// if everything is ok then return EEdgeStatus.Green
  if(config.map_focus){
    return {
      messages: ['Required Field Not Found'],
      status: EEdgeStatus.Green
    }
  }

  return {
    messages: ['Required Field Not Found'],
    status: EEdgeStatus.Blue
  }

}
