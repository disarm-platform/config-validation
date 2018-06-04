import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";



export function irs_plan_map_focus (config: TConfig) : TCustomEdgeResponse {
// if the piece is not required and does not exist then return ECustomEdgeStatus.Blue

// check the validations exist, if they are not valid, then return ECustomEdgeStatus.Yellow

  if(!config.applets.irs_plan){
    return {
      messages: ['Irs plan Applet was found'],
      status: ECustomEdgeStatus.Blue
    }
  }



// if everything is ok then return ECustomEdgeStatus.Green
  if(config.map_focus){
    return {
      messages: ['Optional map focus is available'],
        status: ECustomEdgeStatus.Green
    }
  }

  return {
    messages: ['Optional Map focus is not found'],
    status: ECustomEdgeStatus.Blue
  }

}
