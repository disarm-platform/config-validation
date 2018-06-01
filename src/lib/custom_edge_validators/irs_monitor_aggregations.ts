import { TConfig } from '../../definitions/TConfig';
import { TChartConfig } from '../../definitions/TIrsMonitor';
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_monitor_aggregations(config: TConfig): TEdgeResponse {
  if (!config.aggregations) {
    return {
      messages: ['Missing aggregations'],
      status: EEdgeStatus.Red
    }
  }

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

  const aggregationNames = config.aggregations.map(a => a.name)

  for (const aggregation of config.applets.irs_monitor.map.aggregation_names) {
    if (!aggregationNames.includes(aggregation)){
      return {
        messages: [`The aggregation '${aggregation}' in map configuration is not in the aggregations`],
        status: EEdgeStatus.Yellow
      }
    }
  }

  for (const aggregation of config.applets.irs_monitor.table.aggregation_names) {
    if (!aggregationNames.includes(aggregation)) {
      return {
        messages: [`The aggregation '${aggregation}' in table configuration is not in the aggregations`],
        status: EEdgeStatus.Yellow
      }
    }
  }

  // check they all exist in config.aggregations

  const charts = config.applets.irs_monitor.charts.filter((chartConfig: TChartConfig) => {
    if (chartConfig.chart_type === 'text') {
      return false
    }

    if (chartConfig.options.generate_series_from) {
      return false
    }

    return true
  });

  for (const chart of charts) {
    if (chart.options.multi_series) {
      for (const series of chart.options.multi_series) {
        if (!aggregationNames.includes(series.aggregation_name)) {
          return {
            messages: [`The aggregation '${series.aggregation_name}' in the chart configuration for ${chart.id} is not in the aggregations`],
            status: EEdgeStatus.Yellow
          }
        }
      }
    }

    if (chart.options.single_series) {
      if (!aggregationNames.includes(chart.options.single_series.aggregation_name)) {
        return {
          messages: [`The aggregation '${chart.options.single_series.aggregation_name}' in the chart configuration for ${chart.id} is not in the aggregations`],
          status: EEdgeStatus.Yellow
        }
      }
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}
