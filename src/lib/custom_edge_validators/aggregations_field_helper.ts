import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus, TCustomEdgeResponse } from '../TCustomEdgeResponse';
import { all_fields, expression_variables } from './index';

export function aggregations_field_helper(config: TConfig): TCustomEdgeResponse {
  if (!config.aggregations) {
    return {
      messages: ['Could be BLue'],
      status: ECustomEdgeStatus.Red
    };
  }

  if (!config.aggregations.length) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    };
  }

  const allFields = all_fields(config);

  // check the fields used in the aggregations exist in field_helpers
  for (const aggregation of config.aggregations) {
    const aggregationVariables = expression_variables(aggregation.numerator_expr);
    for (const variable of aggregationVariables) {
      if (!allFields.includes(variable)) {
        return {
          messages: [`The field '${variable}' does not exist in the form or the decorators`],
          status: ECustomEdgeStatus.Yellow
        };
      }
    }
  }

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  };
}
