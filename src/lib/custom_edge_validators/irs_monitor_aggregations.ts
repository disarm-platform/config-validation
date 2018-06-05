import { get } from 'lodash';
import { TAggregations } from '../config_types/TAggregations';
import { TChartConfig, TIrsMonitor } from '../config_types/TIrsMonitor';
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function irs_monitor_aggregations(irs_monitor_config: TIrsMonitor, aggregations_config: TAggregations): TCustomEdgeResponses {
  const required_aggregations = aggregations_config.map(a => a.name);
  const available_aggregations = extract_aggregations_from_irs_monitor(irs_monitor_config);// TODO: Add missing aggregations from commented code 

  return required_aggregations.map(required_aggregation => {
    if (available_aggregations.includes(required_aggregation)) {
      return {
        message: `Aggregation ${required_aggregation} is required and is available`,
        status: ECustomEdgeStatus.Green
      }
    } else {
      return {
        message: `Aggregation ${required_aggregation} is required but is not available`,
        status: ECustomEdgeStatus.Red
      }
    }
  })
}


// export function irs_monitor_aggregations(config: TConfig): TCustomEdgeResponse {
//   if (!config.aggregations) {
//     return {
//       messages: ['Missing aggregations'],
//       status: ECustomEdgeStatus.Red
//     }
//   }
//
//   if (!config.applets.irs_monitor) {
//     return {
//       messages: [],
//       status: ECustomEdgeStatus.Blue
//     }
//   }
//
//   if (!config.aggregations.length) {
//     return {
//       messages: [],
//       status: ECustomEdgeStatus.Blue
//     }
//   }
//
//   const aggregationNames = config.aggregations.map(a => a.name)
//
//   for (const aggregation of config.applets.irs_monitor.map.aggregation_names) {
//     if (!aggregationNames.includes(aggregation)){
//       return {
//         messages: [`The aggregation '${aggregation}' in map configuration is not in the aggregations`],
//         status: ECustomEdgeStatus.Yellow
//       }
//     }
//   }
//
//   for (const aggregation of config.applets.irs_monitor.table.aggregation_names) {
//     if (!aggregationNames.includes(aggregation)) {
//       return {
//         messages: [`The aggregation '${aggregation}' in table configuration is not in the aggregations`],
//         status: ECustomEdgeStatus.Yellow
//       }
//     }
//   }
//
//   // check they all exist in config.aggregations


//   for (const chart of charts) {
//     if (chart.options.multi_series) {
//       for (const series of chart.options.multi_series) {
//         if (!aggregationNames.includes(series.aggregation_name)) {
//           return {
//             messages: [`The aggregation '${series.aggregation_name}' in the chart configuration for ${chart.id} is not in the aggregations`],
//             status: ECustomEdgeStatus.Yellow
//           }
//         }
//       }
//     }
//
//     if (chart.options.single_series) {
//       if (!aggregationNames.includes(chart.options.single_series.aggregation_name)) {
//         return {
//           messages: [`The aggregation '${chart.options.single_series.aggregation_name}' in the chart configuration for ${chart.id} is not in the aggregations`],
//           status: ECustomEdgeStatus.Yellow
//         }
//       }
//     }
//   }
//
//   return {
//     messages: [],
//     status: ECustomEdgeStatus.Green
//   }
// }

function extract_aggregations_from_irs_monitor(irs_monitor_config: TIrsMonitor): string[] {
  const chart_aggregations = irs_monitor_config.charts.filter((chartConfig: TChartConfig) => {
    if (chartConfig.chart_type === 'text') {
      return false
    }

    if (chartConfig.options.generate_series_from) {
      return false
    }

    return true
  })

  const map_aggregations = get(irs_monitor_config, 'map.aggregation_names')
  
  return [...chart_aggregations, ...map_aggregations];
}
