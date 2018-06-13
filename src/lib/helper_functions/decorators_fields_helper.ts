import {uniq} from 'lodash'
import { TDecorators } from "../config_types/TDecorators";
import { expression_variables } from "./expression_helpers";


export function fields_in_decorators(decorators: TDecorators): string[] {
  let all_variables : string[] = []
  const decoratorNames = Object.keys(decorators);

  for (const decoratorName of decoratorNames) {
    const decorator = decorators[decoratorName];

    for (const decoratorPart of decorator) {
      const possibleFieldName = Object.keys(decoratorPart)[0];
      const expression = decoratorPart[possibleFieldName];
      const variables = expression_variables(expression);
      all_variables = [...all_variables, ...variables]
    }
  }
  return uniq(all_variables)
}
