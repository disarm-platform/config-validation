import {flatten} from 'lodash'
import { TAggregations } from '../config_types/TAggregations';
import { TConfig } from '../config_types/TConfig';
import { THelpers } from '../helpers/create_helper_objects';
import {expression_variables} from '../helpers/expression_helpers'
import { ECustomEdgeStatus, TCustomEdgeResponse, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function aggregations_field_helper(aggregations_config: TAggregations, ignore: object, helpers: THelpers): TCustomEdgeResponses {
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
