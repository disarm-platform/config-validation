import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_plan_spatial_hierarchy(_config: TConfig): TCustomEdgeResponses {
  // TODO: Ensure irs_plan.table_output fields exist on spatial_hierarchy, need new spatial_hierarchy
  return [{
    message: "Nothing to check",
    status: ECustomEdgeStatus.Green
  }]
}