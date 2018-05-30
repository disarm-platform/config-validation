import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_monitor_aggregations(config: Config): TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  if (!config.aggregations.length) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  const aggregationNames = config.aggregations.map(a => a.name)

  for (const aggregation of config.applets.irs_monitor.map.aggregation_names) {
    if (!aggregationNames.includes(aggregation)){
      return {
        messages: [{ description: `The aggregation '${aggregation}' in map configuration is not in the aggregations`}],
        status: EdgeStatus.Yellow
      }
    }
  }

  for (const aggregation of config.applets.irs_monitor.table.aggregation_names) {
    if (!aggregationNames.includes(aggregation)) {
      return {
        messages: [{ description: `The aggregation '${aggregation}' in table configuration is not in the aggregations` }],
        status: EdgeStatus.Yellow
      }
    }
  }

  // check they all exist in config.aggregations

  const charts = config.applets.irs_monitor.charts.filter(chartConfig => {
    if (chartConfig.chart_type === 'text') {
      return false
    }

    if (chartConfig.options.generate_series_from) {
      return false
    }

    return true
  })
    
  for (const chart of charts) {
    if (chart.options.multi_series) {
      for (const series of chart.options.multi_series) {
        if (!aggregationNames.includes(series.aggregation_name)) {
          return {
            messages: [{ description: `The aggregation '${series.aggregation_name}' in the chart configuration for ${chart.id} is not in the aggregations` }],
            status: EdgeStatus.Yellow
          }
        }
      }
    }
    
    if (chart.options.single_series) {
      if (!aggregationNames.includes(chart.options.single_series.aggregation_name)) {
        return {
          messages: [{ description: `The aggregation '${chart.options.single_series.aggregation_name}' in the chart configuration for ${chart.id} is not in the aggregations` }],
          status: EdgeStatus.Yellow
        }
      }
    }
  }
  
  return {
    messages: [],
    status: EdgeStatus.Green
  }
}