import { TConfig } from '../config_types/TConfig';
import { TIrsMonitor } from '../config_types/TIrsMonitor';
import { create_helper_objects } from '../helper_functions';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function irs_monitor_fields_helper(
  config: TConfig
): TCustomEdgeResponses {
  const helpers = create_helper_objects(config);
  const all_fields = helpers.all_fields;

  const irs_monitor_config = config.applets.irs_monitor as TIrsMonitor;

  const response_point_fields = irs_monitor_config.map.response_point_fields.filter(
    responde_point_field => {
      // only get the ones that reference data we can check against.
      return (
        responde_point_field.startsWith('form_data.') ||
        responde_point_field.startsWith('_decorated.')
      );
    }
  );

  const generate_series_from_fields = irs_monitor_config.charts
    .filter(chartConfig => {
      // only get charts with this property
      return chartConfig.options.hasOwnProperty('generate_series_from');
    })
    .map(chartConfig => {
      // grab that property
      return chartConfig.options.generate_series_from as string;
    })
    .filter(generateSeriesFrom => {
      // only get the ones that reference data we can check against.
      return (
        generateSeriesFrom.startsWith('form_data.') ||
        generateSeriesFrom.startsWith('_decorated.')
      );
    });

  const fields_were_interested_in = [
    ...response_point_fields,
    ...generate_series_from_fields
  ].map(field => {
    return field.replace(/^_decorated\./, '').replace(/^form_data\./, '');
  });

  return fields_were_interested_in.map(field => {
    if (all_fields.includes(field)) {
      return {
        message: `irs_monitor field '${field}' is available in form or decorators`,
        status: ECustomEdgeStatus.Green
      };
    } else {
      return {
        message: `irs_monitor field '${field}' is missing from form or decorators`,
        status: ECustomEdgeStatus.Red
      };
    }
  });
}
