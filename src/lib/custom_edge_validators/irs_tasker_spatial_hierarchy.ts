import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";



export function irs_tasker_spatial_hierarchy (config: TConfig) : TCustomEdgeResponse {
// if the piece is not required and does not exist then return ECustomEdgeStatus.Blue
  if (!config.spatial_hierarchy) {
    return {
      messages: ['Could be BLue'],
      status: ECustomEdgeStatus.Red
    }
  }

  if (!config.form) {
    return {
      messages: ['Could be BLue'],
      status: ECustomEdgeStatus.Red
    }
  }

// check the validations exist, if they are not valid, then return ECustomEdgeStatus.Yellow

// if everything is ok then return ECustomEdgeStatus.Green
  if(config.spatial_hierarchy.markers.planning_level_name){
    return {
      messages: ['Required Field Not Found'],
      status: ECustomEdgeStatus.Green
    }
  }

  return {
    messages: ['Required Field Not Found'],
    status: ECustomEdgeStatus.Yellow
  }

}
