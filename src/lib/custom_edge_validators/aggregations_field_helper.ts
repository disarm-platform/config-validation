import { TConfig } from '../../definitions/TConfig';
import { EEdgeStatus, TEdgeResponse } from '../TEdgeResponse';
import { all_fields, expression_variables } from '../helpers';

export function aggregations_field_helper(config: TConfig): TEdgeResponse {
  if (!config.aggregations) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    };
  }

  if (!config.aggregations.length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
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
          status: EEdgeStatus.Yellow
        };
      }
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  };
}
