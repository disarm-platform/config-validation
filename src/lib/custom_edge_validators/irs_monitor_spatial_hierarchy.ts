import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";

interface thing {
  (config: TConfig) => TCustomEdgeResponse
}


// TODO: Need to write a property version of this,
// is blocked by us not generating a spatial_hierarchy with extracted fields.
export function irs_monitor_spatial_hierarchy(config: TConfig): TCustomEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    }
  }

  if (!config.spatial_hierarchy) {
    return {
      messages: ['spatial_hierarchy is required for irs_monitor'],
      status: ECustomEdgeStatus.Yellow
    }
  }

  // check  property_layers[].property exist on spatial_hiearchy

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  }
}
