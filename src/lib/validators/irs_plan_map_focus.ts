import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";



export function irs_plan_map_focus_validations (config: Config) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

  if(!config.applets.irs_plan){
    return {
      messages: [{description:'Irs plan Applet was found'}],
      status: EdgeStatus.Blue
    }
  }



// if everything is ok then return EEdgeStatus.Green
  if(config.map_focus){
    return {
      messages: [{description:'Optional map focus is available'}],
        status: EdgeStatus.Green
    }
  }

  return {
    messages: [{description:'Optional Map focus is not found'}],
    status: EdgeStatus.Blue
  }

}
