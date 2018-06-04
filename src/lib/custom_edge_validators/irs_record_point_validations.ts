import { TConfig } from "../../config_types/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";

// checks that irs_record_point has the validations that it needs. 
// The function is named accordingly.
export function irs_record_point_validations(config: TConfig) : TEdgeResponse {
  /**
   * 1. Check the pieces we require for this validations exist.
   */

  if (!config.applets.irs_record_point) {
    // if irs_record_point does not exist, then we don't want to run the rest of the validations
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  /**
   * 2. Run the custom validation logic for this function
   */

  // irs_record_point doesn't require validations, but will use them if they exists. 
  if (config.validations && !config.validations.length) {
    // so if none, the config is valid, but not "Green" valid
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }


  /**
   * 3. Return success
   */
  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}