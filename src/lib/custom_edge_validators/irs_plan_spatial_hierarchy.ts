import { TConfig } from "../config_types/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";



export function irs_plan_spatial_hierarchy (config: TConfig) : TEdgeResponse {
// if the piece is not required and does not exist then return EEdgeStatus.Blue
  if (!config.spatial_hierarchy) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

// check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

// if everything is ok then return EEdgeStatus.Green

  if(!config.applets.irs_plan){
    return {
      messages: ['Irs plan Applet was found'],
      status: EEdgeStatus.Blue
    }
  }

  if(config.spatial_hierarchy.markers.planning_level_name){
    return {
      messages: ['planning level name required by irs plan is available'],
      status: EEdgeStatus.Green
    }
  }

  return {
    messages: ['config.spatial_hierarchy.markers.planning_level_name required by irs plan was not found'],
    status: EEdgeStatus.Yellow
  }

}
