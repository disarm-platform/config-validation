// // tslint:disable:no-expression-statement
import { test } from 'ava';
// import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
// import { aggregations_field_helper } from './aggregations_field_helper';
test('title', t => {
  t.true(true);
});//
// test.skip('returns Blue status if no aggregations', t => {
//   const config = {
//     aggregations: []
//   }
//   // @ts-ignore
//   const result = aggregations_field_helper(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Green)
//   t.is(result[0].message.length, 0)
// })
//
// test.skip('returns Yellow status if aggregation field not present in form', t => {
//   const config = {
//     aggregations: [{
//       "name": "number of rooms sprayed",
//       "numerator_expr": "number_sprayed"
//     }],
//     decorators: {},
//     form: {
//       "pages": [
//         {
//           "elements": [
//             {
//               "inputType": "number",
//               "isRequired": true,
//               "name": "number_sprayable",
//               "title": "How many sprayable structures in the household/homestead?",
//               "type": "text",
//               "validators": [
//                 {
//                   "text": "Minimum Value is Zero",
//                   "type": "numeric"
//                 }
//               ]
//             },
//             {
//               "inputType": "number",
//               "name": "number_unsprayable",
//               "title": "How many unsprayable sleeping structures are in the household/homestead?",
//               "type": "text",
//               "validators": [
//                 {
//                   "text": "Minimum Value is Zero",
//                   "type": "numeric"
//                 }
//               ]
//             }
//           ],
//           "name": "page1"
//         }
//       ]
//     }
//   }
//   // @ts-ignore
//   const result = aggregations_field_helper(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Red)
//   t.is(result[0].message.length, 1)
// })
//
// test.skip('returns Yellow status if aggregation field not present in decorators', t => {
//   const config = {
//     aggregations: [
//       {
//         "name": "number of rooms sprayable",
//         "numerator_expr": "number_sprayable + not_in_decorator"
//       }
//     ],
//     decorators: {
//       'decorator_name': {}
//     },
//     form: {
//     "pages": [
//       {
//         "elements": [
//           {
//             "inputType": "number",
//             "isRequired": true,
//             "name": "number_sprayable",
//             "title": "How many sprayable structures in the household/homestead?",
//             "type": "text",
//             "validators": [
//               {
//                 "text": "Minimum Value is Zero",
//                 "type": "numeric"
//               }
//             ]
//           }
//         ],
//         "name": "page1"
//       }
//     ]
//   }
//   }
//   // @ts-ignore
//   const result = aggregations_field_helper(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Red)
//   t.is(result[0].message.length, 1)
// })
//
// test.skip('returns Green status if aggregation fields exist', t => {
//   const config = {
//     aggregations: [{
//       "name": "number of rooms sprayable",
//       "numerator_expr": "number_sprayable"
//     }],
//     decorators: {},
//     form: {
//       "pages": [
//         {
//           "elements": [
//             {
//               "inputType": "number",
//               "isRequired": true,
//               "name": "number_sprayable",
//               "title": "How many sprayable structures in the household/homestead?",
//               "type": "text",
//               "validators": [
//                 {
//                   "text": "Minimum Value is Zero",
//                   "type": "numeric"
//                 }
//               ]
//             },
//             {
//               "inputType": "number",
//               "name": "number_unsprayable",
//               "title": "How many unsprayable sleeping structures are in the household/homestead?",
//               "type": "text",
//               "validators": [
//                 {
//                   "text": "Minimum Value is Zero",
//                   "type": "numeric"
//                 }
//               ]
//             }
//           ],
//           "name": "page1"
//         }
//       ]
//     }
//   }
//   // @ts-ignore
//   const result = aggregations_field_helper(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Green)
//   t.is(result[0].message.length, 0)
// })
