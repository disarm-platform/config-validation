import { Config } from "../../definitions";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";

// checks that irs_plan has the validations that it needs.
// Which are :
// It has a valid planning_level that spatial hierarchy has
// It has map focus, recomended but not required

//

 function failsOptional(config: Config) : boolean{
   return !config.map_focus
 }

function failsRequired (config: Config) : boolean{
   return !config.spatial_hierarchy.markers.planning_level_name
}

export function irs_plan_validations (config: Config) : TEdgeResponse {
  // if the piece is not required and does not exist then return EEdgeStatus.Blue

  // check the validations exist, if they are not valid, then return EEdgeStatus.Yellow

  // if everything is ok then return EEdgeStatus.Green


  return failsRequired(config) ?  {
    messages: [{description:'Required Field Not Found'}],
    status: EEdgeStatus.Yellow
  }
  :
    failsOptional(config)? {
      messages: [{description:'Recomended Field Not Found'}],
      status: EEdgeStatus.Blue
    }
    :
      {
        messages: [],
        status: EEdgeStatus.Green
      }
}




