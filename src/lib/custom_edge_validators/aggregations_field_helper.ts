import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_expresion_variables } from "../helpers/expression_helpers";
import { get_all_field_names } from "../helpers/fields_helper";


export function aggregations_field_helper(config: TConfig): TEdgeResponse {
  if (!config.aggregations.length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  const allFields = get_all_field_names(config)

  // check the fields used in the aggregations exist in field_helpers
  for (const aggregation of config.aggregations) {
    const aggregationVariables = get_expresion_variables(aggregation.numerator_expr)
    for (const variable of aggregationVariables) {
      if (!allFields.includes(variable)) {
        return {
          messages: [`The field '${variable}' does not exist in the form or the decorators`],
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