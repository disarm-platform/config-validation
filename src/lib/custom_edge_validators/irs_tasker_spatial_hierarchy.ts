import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";



export function irs_tasker_spatial_hierarchy_validations (config: TConfig) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue
  if (!config.spatial_hierarchy) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

  if (!config.form) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

// if everything is ok then return EEdgeStatus.Green
  if(config.spatial_hierarchy.markers.planning_level_name){
    return {
      messages: ['Required Field Not Found'],
      status: EEdgeStatus.Green
    }
  }

  return {
    messages: ['Required Field Not Found'],
    status: EEdgeStatus.Yellow
  }

}
