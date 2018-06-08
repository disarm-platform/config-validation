// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { decorators_form } from './decorators_form';

test.failing('should return Green status', t => {
  const empty_object = {}
  const result = decorators_form(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})

test.skip('returns Yellow if fields in decorator is not in form', t => {
// const config = {
//     "decorators": {
//       "status": [
//         {
//           "red": "number_unsprayable == number_sprayable"
//         },
//         {
//           "green": "number_sprayable == numbersprayed_ddt + numbersprayed_delta"
//         }
//       ]
//     },
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
  t.true(true)
})

test.skip('returns Green if fields in decorator is in form', t => {
//   const config = {
//     "decorators": {
//       "status": [
//         {
//           "red": "number_unsprayable == number_sprayable"
//         },
//         {
//           "green": "number_sprayable == 1"
//         }
//       ]
//     },
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
  t.true(true)
})
