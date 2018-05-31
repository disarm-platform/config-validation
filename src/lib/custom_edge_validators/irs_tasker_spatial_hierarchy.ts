import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";



export function irs_tasker_spatial_hierarchy_validations (config: TConfig) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

// if everything is ok then return EEdgeStatus.Green
  if(config.spatial_hierarchy.markers.planning_level_name){
    return {
      messages: [{description:'Required Field Not Found'}],
      status: EEdgeStatus.Green
    }
  }

  return {
    messages: [{description:'Required Field Not Found'}],
    status: EEdgeStatus.Yellow
  }

}
