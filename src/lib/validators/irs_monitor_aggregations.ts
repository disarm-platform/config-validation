import { flatten } from 'lodash'
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

  const mapAggregations = config.applets.irs_monitor.map.aggregation_names
  const tableAggregations = config.applets.irs_monitor.table.aggregation_names

  const chartAggregationsArrays : ArrayLike<string | string[]> = config.applets.irs_monitor.charts
    .filter(chartConfig => {
      if (chartConfig.chart_type === 'text') {
        return false
      }

      if (chartConfig.options.generate_series_from) {
        return false
      }

      return true
    })
    .map(chartConfig => {
      if (chartConfig.options.multi_series) {
        return chartConfig.options.multi_series.map(m => m.aggregation_name)
      }

      if (chartConfig.options.single_series) {
        return chartConfig.options.single_series.aggregation_name
      }
      
      return []
    })
    

  
  const chartAggregations = flatten(chartAggregationsArrays)
  const allAggregations = [...chartAggregations, ...mapAggregations, ...tableAggregations]

  const definedAggregationStrings = config.aggregations.map(aggregation => aggregation.name)

  const allExist = allAggregations.every(aggregationName => {
    return definedAggregationStrings.includes(aggregationName)
  })

  if (!allExist) {
    return {
      messages: [{description: 'some missing'}],
      status: EEdgeStatus.Yellow
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}