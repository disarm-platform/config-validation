import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";



export function irs_plan_spatial_hierarchy_validations (config: TConfig) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

// if everything is ok then return EEdgeStatus.Green

  if(!config.applets.irs_plan){
    return {
      messages: [{description:'Irs plan Applet was found'}],
      status: EEdgeStatus.Blue
    }
  }

  if(config.spatial_hierarchy.markers.planning_level_name){
    return {
      messages: [{description:'planning level name required by irs plan is available'}],
      status: EEdgeStatus.Green
    }
  }

  return {
    messages: [{description:'config.spatial_hierarchy.markers.planning_level_name required by irs plan was not found'}],
    status: EEdgeStatus.Yellow
  }

}
