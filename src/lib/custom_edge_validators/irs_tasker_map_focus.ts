import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";



export function irs_tasker_map_focus (config: TConfig) : TCustomEdgeResponse {
// if the piece is not required and does not exist then return ECustomEdgeStatus.Blue

// check the validations exist, if they are not valid, then return ECustomEdgeStatus.Yellow

// if everything is ok then return ECustomEdgeStatus.Green
  if(config.map_focus){
    return {
      messages: ['Required Field Not Found'],
      status: ECustomEdgeStatus.Green
    }
  }

  return {
    messages: ['Required Field Not Found'],
    status: ECustomEdgeStatus.Blue
  }

}
