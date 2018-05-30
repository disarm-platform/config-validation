import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";

// TODO: Need to write a property version of this, 
// is blocked by us not generating a spatial_hierarchy with extracted fields.
export function irs_monitor_spatial_hierarchy(config: Config): TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  if (!config.spatial_hierarchy) {
    return {
      messages: [{description: 'spatial_hierarchy is required for irs_monitor'}],
      status: EdgeStatus.Yellow
    }
  }

  // check  property_layers[].property exist on spatial_hiearchy

  return {
    messages: [],
    status: EdgeStatus.Green
  }
}