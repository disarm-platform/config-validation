import { TConfig } from "../config_types/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";



export function irs_plan_map_focus_validations (config: TConfig) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

  if(!config.applets.irs_plan){
    return {
      messages: ['Irs plan Applet was found'],
      status: EEdgeStatus.Blue
    }
  }



// if everything is ok then return EEdgeStatus.Green
  if(config.map_focus){
    return {
      messages: ['Optional map focus is available'],
        status: EEdgeStatus.Green
    }
  }

  return {
    messages: ['Optional Map focus is not found'],
    status: EEdgeStatus.Blue
  }

}
