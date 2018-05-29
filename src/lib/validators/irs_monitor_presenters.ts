import { Config } from "../../definitions";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";

// Presenters don't seem to be used in douma-app, we should remove them in that case
export function irs_monitor_presenters(config: Config) : TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  if (!Object.keys(config.presenters).length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }
  
  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}