import {flatten} from 'lodash'
import { TAggregations } from '../config_types/TAggregations';
import { TConfig } from '../config_types/TConfig';
import { create_helper_objects } from '../helper_functions/create_helper_objects';
import {expression_variables} from '../helper_functions/expression_helpers'
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function aggregations_fields_helper(config: TConfig): TCustomEdgeResponses {
  const aggregations_config = config.aggregations as TAggregations
  const helpers = create_helper_objects(config)
  const available_fields = helpers.all_fields

  const required_fields = flatten(aggregations_config.map(aggregation => {
    const aggregationVariables = expression_variables(aggregation.numerator_expr);
    return flatten(aggregationVariables)
  }))

  return required_fields.map(field => {
    if (available_fields.includes(field)) {
      return {
        message: `${field} required and found`,
        status: ECustomEdgeStatus.Green
      }
    } else {
      return {
        message: `${field} required and NOT found`,
        status: ECustomEdgeStatus.Red
      }
    }
  })
}