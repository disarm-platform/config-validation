import { get } from 'lodash';
import { TAggregations } from '../config_types/TAggregations';
import { TConfig } from '../config_types/TConfig';
import { TIrsMonitor } from '../config_types/TIrsMonitor';
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function irs_monitor_aggregations(config: TConfig): TCustomEdgeResponses {

  const aggregations_config = config.aggregations as TAggregations
  const irs_monitor_config = config.applets.irs_monitor as TIrsMonitor 


  const available_aggregations = aggregations_config.map(a => a.name);
  const required_aggregations = extract_aggregations_from_irs_monitor(irs_monitor_config);// TODO: Add missing aggregations from commented code 

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

function extract_aggregations_from_irs_monitor(irs_monitor_config: TIrsMonitor): string[] {
  const chart_aggregations: string[] = []

  for (const chart of irs_monitor_config.charts) {
    if (chart.options.single_series) {
      chart_aggregations.push(chart.options.single_series.aggregation_name)
    }

    if (chart.options.multi_series) {
      chart.options.multi_series.forEach(({ aggregation_name }) => chart_aggregations.push(aggregation_name))
    }
  }

  const map_aggregations = get(irs_monitor_config, 'map.aggregation_names')

  const table_aggregations = get(irs_monitor_config, 'table.aggregation_names')
  
  return [...chart_aggregations, ...map_aggregations, ...table_aggregations];
}
