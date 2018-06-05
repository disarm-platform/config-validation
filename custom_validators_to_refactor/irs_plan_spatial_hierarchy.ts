import { TConfig } from "../src/lib/config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../src/lib/TCustomEdgeResponse";



export function irs_plan_spatial_hierarchy (config: TConfig) : TCustomEdgeResponse {
// if the piece is not required and does not exist then return ECustomEdgeStatus.Blue
  if (!config.spatial_hierarchy) {
    return {
      messages: ['Could be BLue'],
      status: ECustomEdgeStatus.Red
    }
  }

// check the validations exist, if they are not valid, then return ECustomEdgeStatus.Yellow

// if everything is ok then return ECustomEdgeStatus.Green

  if(!config.applets.irs_plan){
    return {
      messages: ['Irs plan Applet was found'],
      status: ECustomEdgeStatus.Blue
    }
  }

  if(config.spatial_hierarchy.markers.planning_level_name){
    return {
      messages: ['planning level name required by irs plan is available'],
      status: ECustomEdgeStatus.Green
    }
  }

  return {
    messages: ['config.spatial_hierarchy.markers.planning_level_name required by irs plan was not found'],
    status: ECustomEdgeStatus.Yellow
  }

}
