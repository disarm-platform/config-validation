import { Config } from "../../definitions";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_monitor_aggregations(config: Config): TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  if (!config.aggregations.length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  // get all the aggregations that are referenced in chart, table and map and ensure they exist in the aggregations

  // const map_aggregations = config.applets.irs_monitor.map.aggregation_names
  // const table_aggregations = config.applets.irs_monitor.table.aggregation_names

  // const chart_aggregations_arrays = config.applets.irs_monitor.charts.map(chart_config => {
  //   if (chart_config.multi_series) {
  //     return chart_config.multiseries
  //   }
  // })

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}