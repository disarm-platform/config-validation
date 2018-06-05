// import { TConfig } from '../config_types/TConfig';
// import { ECustomEdgeStatus, TCustomEdgeResponse } from '../TCustomEdgeResponse';
// import { expression_variables, form_fields } from '../helpers';
//
//
// export function decorators_fields_helper(config: TConfig): TCustomEdgeResponse {
//   const formFields = form_fields(config.form);
//
//   const decoratorNames = Object.keys(config.decorators);
//
//   for (const decoratorName of decoratorNames) {
//     const decorator = config.decorators[decoratorName];
//
//     for (const decoratorPart of decorator) {
//       const possibleFieldName = Object.keys(decoratorPart)[0];
//       const expression = decoratorPart[possibleFieldName];
//       const variables = expression_variables(expression);
//
//       for (const variable of variables) {
//         if (!formFields.includes(variable)) {
//           return {
//             messages: [`Field '${variable}' in decorator '${decoratorName}' does not exist on form`],
//             status: ECustomEdgeStatus.Yellow
//           };
//         }
//       }
//     }
//   }
//
//   // ensure fields from decorators exist on form
//
//   return {
//     messages: [],
//     status: ECustomEdgeStatus.Green
//   };
// }
