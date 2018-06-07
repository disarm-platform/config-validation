// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TAggregations } from '../config_types/TAggregations';
import { TIrsMonitor } from '../config_types/TIrsMonitor';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { irs_monitor_aggregations } from './irs_monitor_aggregations';



test('returns Red status if aggregation in map is not in aggregations', t => {
  const aggregations_config: TAggregations = [{
    "name": "number of rooms sprayed",
    "numerator_expr": "number_sprayed"
  }]

  const irs_monitor_config : TIrsMonitor = {
    charts: [],
    map: {
      aggregation_names: [
        "number of rooms sprayed",
        "room spray coverage (%)"
      ],
      bin_by: "location.selection.id",
      chart_type: "map",
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      property_layers: []
    }
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(irs_monitor_config, aggregations_config)


  t.is(result.length, 2)
  t.is(result[1].status, ECustomEdgeStatus.Red)
  t.is(result[1].message, "Aggregation room spray coverage (%) is required but is not available")

  t.is(result[0].status, ECustomEdgeStatus.Green)
  t.is(result[0].message, "Aggregation number of rooms sprayed is required and is available")
})
//
// test.skip('returns Yellow status if aggregation in table is not in aggregations', t => {
//   const config = {
//     aggregations: [{
//       "name": "number of rooms sprayed",
//       "numerator_expr": "number_sprayed"
//     }],
//     applets: {
//       irs_monitor: {
//         charts: [],
//         "map": {
//           "aggregation_names": []
//         },
//         table: {
//           "aggregation_names": [
//             "number of people in homestead (total)"
//           ],
//           "bin_by": "location.selection.id",
//           "chart_type": "table",
//           "property_layers": [
//             {
//               "label": "Name",
//               "property": "__disarm_geo_name",
//             },
//             {
//               "label": "Number of rooms",
//               "property": "Num_Rooms",
//             }
//           ],
//
//         }
//       }
//     }
//   }
//   // @ts-ignore
//   const result = irs_monitor_aggregations(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Red)
//   t.is(result[0].message.length, 1)
// })
//
// test.skip('returns Yellow status if aggregation in multiseries chart is not in aggregations', t => {
//   const config = {
//     aggregations: [{
//       "name": "number of rooms sprayed",
//       "numerator_expr": "number_sprayed"
//     }],
//     applets: {
//       irs_monitor: {
//         charts: [
//           {
//             "id": "room_coverage",
//             "options": {
//               "bin_by": "recorded_on",
//               "chart_type": "line",
//               "cumulative": true,
//               "geographic_level_refactor_this_key_name": "location.selection.id",
//               "layout": {
//                 "showlegend": true,
//                 "title": "Room coverage as % of target",
//                 "xaxis": {
//                   "title": "Period commencing"
//                 },
//                 "yaxis": {
//                   "title": "% coverage"
//                 },
//               },
//               "multi_series": [
//                 {
//                   "aggregation_name": "room spray coverage (%)"
//                 }
//               ],
//               "time_series": true
//             },
//             "style": {
//               "height_constraint": "none",
//               "width_constraint": "half"
//             }
//           }
//         ],
//         "map": {
//           "aggregation_names": []
//         },
//         table: {
//           "aggregation_names": []
//         },
//       }
//     }
//   }
//   // @ts-ignore
//   const result = irs_monitor_aggregations(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Red)
//   t.is(result[0].message.length, 1)
// })
//
// test.skip('returns Yellow status if aggregation in singleseries chart is not in aggregations', t => {
//   const config = {
//     aggregations: [{
//       "name": "number of rooms sprayed",
//       "numerator_expr": "number_sprayed"
//     }],
//     applets: {
//       irs_monitor: {
//         charts: [
//           {
//             "id": "spray_status_absolute",
//             "options": {
//               "bin_by": "_decorated.sprayed_status",
//               "chart_type": "bar",
//               "layout": {
//                 "showlegend": true,
//                 "title": "Spray status",
//                 "xaxis": {
//                   "title": "Spray status"
//                 },
//                 "yaxis": {
//                   "title": "# of households"
//                 }
//               },
//               "single_series": {
//                 "aggregation_name": "count"
//               }
//             },
//             "style": {
//               "height_constraint": "none",
//               "width_constraint": "half"
//             }
//           }
//         ],
//         "map": {
//           "aggregation_names": []
//         },
//         table: {
//           "aggregation_names": []
//         }
//       }
//     }
//   }
//   // @ts-ignore
//   const result = irs_monitor_aggregations(config)
//
//   t.is(result[0].status, ECustomEdgeStatus.Red)
//   t.is(result[0].message.length, 1)
// })
