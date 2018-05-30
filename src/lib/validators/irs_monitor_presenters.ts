import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";

// Presenters don't seem to be used in douma-app, we should remove them in that case
export function irs_monitor_presenters(config: Config) : TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  if (!Object.keys(config.presenters).length) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }
  
  return {
    messages: [],
    status: EdgeStatus.Green
  }
}